import { createHash } from "node:crypto";
import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect, getFirebaseAdminStorage } from "../../../../firebase/admin";
import { parseStatementImport } from "../../../../lib/reconciliation.mjs";
import { importStatementBatch, loadReconciliationContext } from "../../../../lib/reconciliation-server.mjs";
import { reconciliationServerAvailable } from "../../../../lib/reconciliation-access.mjs";

export const runtime = "nodejs";
export const maxDuration = 300;

const importSchema = z.object({
  imports: z.array(z.object({
    sourceText: z.string().max(5_000_000).optional(),
    analysisId: z.string().regex(/^[a-f0-9]{64}$/).optional(),
    originalFilename: z.string().trim().min(1).max(255),
    cardId: z.string().trim().min(1).max(128).optional(),
    periodStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    periodEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }).refine((item) => Boolean(item.analysisId || item.sourceText?.length), { message: "sourceText ou analysisId est requis." })).min(1).max(10),
});

async function authenticate(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "KIM" || decoded.role === "ADMIN" ? { uid: decoded.uid, role: decoded.role } : null;
  } catch {
    return null;
  }
}

function safeStatementExtension(filename: string) {
  return filename.toLowerCase().endsWith(".csv") ? "csv" : "json";
}

function isStoragePreconditionConflict(error: unknown) {
  const candidate = error as { code?: number | string; statusCode?: number } | null;
  return candidate?.code === 409 || candidate?.code === 412 || candidate?.code === "409" || candidate?.code === "412" || candidate?.statusCode === 409 || candidate?.statusCode === 412;
}

async function persistStatementEvidence({ sourceText, originalFilename, statementHash, identity }: {
  sourceText: string;
  originalFilename: string;
  statementHash: string;
  identity: { uid: string };
}) {
  if (process.env.APP_ENV === "local") return `local://${originalFilename}`;
  const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucketName) throw new Error("Le bucket Storage des relevés n’est pas configuré.");
  const extension = safeStatementExtension(originalFilename);
  const storagePath = `statements/${statementHash.slice(0, 2)}/${statementHash}.${extension}`;
  const file = (await getFirebaseAdminStorage()).bucket(bucketName).file(storagePath);
  try {
    await file.save(Buffer.from(sourceText, "utf8"), {
      resumable: false,
      validation: "crc32c",
      preconditionOpts: { ifGenerationMatch: 0 },
      metadata: {
        contentType: extension === "csv" ? "text/csv; charset=utf-8" : "application/json; charset=utf-8",
        metadata: {
          ownerUid: identity.uid,
          statementHash,
          originalFilename,
        },
      },
    });
  } catch (error) {
    // The object path is content-addressed. A concurrent/replayed import of the
    // same bytes is therefore already durable and can safely continue.
    if (!isStoragePreconditionConflict(error)) throw error;
  }
  return storagePath;
}

async function prepareStatementImport(item: z.infer<typeof importSchema>["imports"][number]) {
  if (!item.analysisId) return { ...item, sourceText: item.sourceText ?? "" };
  const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucketName) throw new Error("Le bucket Storage des relevés n’est pas configuré.");
  const cachePath = `statement-analysis-cache/${item.analysisId.slice(0, 2)}/${item.analysisId}.json`;
  const [bytes] = await (await getFirebaseAdminStorage()).bucket(bucketName).file(cachePath).download();
  const artifact = JSON.parse(bytes.toString("utf8")) as Record<string, unknown>;
  const sourceText = typeof artifact.sourceText === "string" ? artifact.sourceText : "";
  const fileHash = typeof artifact.fileHash === "string" ? artifact.fileHash : "";
  const statementHash = typeof artifact.statementHash === "string" ? artifact.statementHash : "";
  const cardId = typeof artifact.cardId === "string" ? artifact.cardId : "";
  const periodStart = typeof artifact.periodStart === "string" ? artifact.periodStart : "";
  const periodEnd = typeof artifact.periodEnd === "string" ? artifact.periodEnd : "";
  const originalFilename = typeof artifact.originalFilename === "string" ? artifact.originalFilename : item.originalFilename;
  const originalStoragePath = typeof artifact.originalStoragePath === "string" ? artifact.originalStoragePath : "";
  const expectedStoragePath = `statements/original/${fileHash.slice(0, 2)}/${fileHash}.pdf`;
  const expectedStatementHash = createHash("sha256").update(`${fileHash}|${cardId}`).digest("hex");
  if (artifact.status !== "COMPLETE" || artifact.analysisId !== item.analysisId || !/^[a-f0-9]{64}$/.test(fileHash) || statementHash !== expectedStatementHash || originalStoragePath !== expectedStoragePath) {
    throw new Error("L’analyse PDF persistée est absente ou invalide; relancez l’import du relevé.");
  }
  const parsed = parseStatementImport(sourceText, { originalFilename, originalStoragePath, cardId, periodStart, periodEnd });
  if (parsed.errors.length || !parsed.statement) throw new Error(parsed.errors.join(" ") || "Le relevé PDF analysé est invalide.");
  return { sourceText, originalFilename, originalStoragePath, cardId, periodStart, periodEnd, trustedStatementHash: statementHash };
}

export async function GET(request: Request) {
  if (!reconciliationServerAvailable() || !firebaseAdminConfigured()) return Response.json({ error: "Le service de rapprochement n’est pas configuré pour cet environnement." }, { status: 503 });
  const identity = await authenticate(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  const context = await loadReconciliationContext(await getFirebaseAdminDataConnect(), identity);
  return Response.json({
    statements: context.statements,
    matches: context.matches,
    outsideControls: context.outsideControls,
    aliases: context.aliases,
    histories: context.histories,
    transactions: context.transactions,
    invoices: context.invoices,
  });
}

export async function POST(request: Request) {
  if (!reconciliationServerAvailable() || !firebaseAdminConfigured()) return Response.json({ error: "Le service de rapprochement n’est pas configuré pour cet environnement." }, { status: 503 });
  const identity = await authenticate(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  const parsed = importSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Le batch doit contenir de 1 à 10 relevés PDF analysés ou fichiers JSON/CSV valides." }, { status: 400 });
  try {
    const dataConnect = await getFirebaseAdminDataConnect();
    const preparedImports = await Promise.all(parsed.data.imports.map(prepareStatementImport));
    const analyzedEvidencePaths = new Map(preparedImports
      .filter((item) => item.trustedStatementHash && item.originalStoragePath)
      .map((item) => [item.trustedStatementHash, item.originalStoragePath]));
    const result = await importStatementBatch({
      dataConnect,
      imports: preparedImports,
      identity,
      evidenceWriter: async (input) => analyzedEvidencePaths.get(input.statementHash) ?? persistStatementEvidence(input),
    });
    return Response.json(result, { status: result.rejected ? 207 : 200 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "L’import serveur a échoué." }, { status: 422 });
  }
}
