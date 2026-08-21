import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import { importStatementBatch, loadReconciliationContext } from "../../../../lib/reconciliation-server.mjs";

export const runtime = "nodejs";

const importSchema = z.object({
  imports: z.array(z.object({
    sourceText: z.string().min(1).max(5_000_000),
    originalFilename: z.string().trim().min(1).max(255),
    originalStoragePath: z.string().trim().max(500).optional(),
  })).min(1).max(10),
});

async function authenticate(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "KIM" || decoded.role === "ADMIN" ? decoded : null;
  } catch {
    return null;
  }
}

function localOnly() {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "demo-facture-thibeault" && process.env.APP_ENV === "local" && process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true";
}

export async function GET(request: Request) {
  if (!localOnly() || !firebaseAdminConfigured()) return Response.json({ error: "Le workflow de rapprochement est disponible uniquement dans l’émulateur local." }, { status: 503 });
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
  if (!localOnly() || !firebaseAdminConfigured()) return Response.json({ error: "L’import est verrouillé hors de l’émulateur local." }, { status: 503 });
  const identity = await authenticate(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  const parsed = importSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Le batch doit contenir de 1 à 10 fichiers JSON/CSV valides." }, { status: 400 });
  try {
    const dataConnect = await getFirebaseAdminDataConnect();
    const result = await importStatementBatch({ dataConnect, imports: parsed.data.imports, identity });
    return Response.json(result, { status: result.rejected ? 207 : 200 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "L’import serveur a échoué." }, { status: 422 });
  }
}
