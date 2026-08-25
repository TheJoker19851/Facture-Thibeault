import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect, getFirebaseAdminStorage } from "../../../../firebase/admin";
import { clientUpdateRequiredResponse, isCurrentInvoiceClientVersion } from "../../../../lib/invoice-client-version.mjs";
import { listAllInvoiceIntakes } from "../../../../firebase/accounting-pagination.server";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import { createClientId } from "../../../../lib/client-id.mjs";

export const runtime = "nodejs";

const discardSchema = z.object({
  receiptId: z.string().regex(/^[a-zA-Z0-9_-]{8,128}$/),
  reason: z.string().trim().min(1).max(500),
});

type IntakeData = {
  invoiceIntakes: Array<{
    receiptId: string;
    storageFolder: string;
    photoCount: number;
    processingStatus?: string | null;
    accountingStatus?: string | null;
  }>;
};

async function privilegedIdentity(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "KIM" || decoded.role === "ADMIN" ? decoded : null;
  } catch {
    return null;
  }
}

function storagePrefixFor(intake: IntakeData["invoiceIntakes"][number]) {
  const prefix = intake.storageFolder.replace(/^\/+|\/+$/g, "");
  if (!prefix.startsWith("receipts/") || !prefix.endsWith(`/${intake.receiptId}`)) {
    throw new Error("Le dossier Storage de la facture est invalide; aucun fichier n’a été supprimé.");
  }
  return `${prefix}/`;
}

async function cleanupStorage(storagePrefix: string) {
  const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucketName) throw new Error("Le bucket Firebase Storage n'est pas configuré.");
  const [files] = await (await getFirebaseAdminStorage()).bucket(bucketName).getFiles({ prefix: storagePrefix });
  await Promise.all(files.map((file) => file.delete()));
}

export async function POST(request: Request) {
  if (!isCurrentInvoiceClientVersion(request.headers.get("x-invoice-client-version"))) {
    return clientUpdateRequiredResponse();
  }
  const identity = await privilegedIdentity(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  if (!firebaseAdminConfigured()) {
    return Response.json({ error: "Firebase Admin n'est pas configuré pour cet environnement." }, { status: 503 });
  }

  const parsed = discardSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "La demande de suppression est invalide." }, { status: 400 });

  const dataConnect = await getFirebaseAdminDataConnect();
  const intakes = await listAllInvoiceIntakes(dataConnect);
  const intake = intakes.find((item) => item.receiptId === parsed.data.receiptId) ?? null;
  if (!intake) return Response.json({ error: "Le dépôt de facture n'existe pas." }, { status: 404 });
  if (intake.accountingStatus === "POSTED") {
    return Response.json({ error: "Une facture comptabilisée ne peut pas être supprimée depuis cette file." }, { status: 409 });
  }
  const storagePrefix = storagePrefixFor(intake);
  if (intake.processingStatus === "DELETED") {
    try {
      await cleanupStorage(storagePrefix);
      return Response.json({ ok: true, idempotent: true, receiptId: intake.receiptId, storageCleanup: "completed" });
    } catch (error) {
      console.error("[invoice-discard] Storage cleanup retry failed", {
        receiptId: intake.receiptId,
        message: error instanceof Error ? error.message : "unknown error",
      });
      return Response.json({ ok: true, idempotent: true, receiptId: intake.receiptId, storageCleanup: "failed" });
    }
  }

  await dataConnect.executeMutation("DiscardInvoiceIntake", {
    receiptId: intake.receiptId,
    auditEventId: auditEventId(intake.receiptId, AUDIT_ACTIONS.INVOICE_DISCARDED, createClientId()),
    auditDetails: auditDetails({
      source: "USER_DISCARD",
      reason: parsed.data.reason,
      photoCount: intake.photoCount,
      storageFolder: intake.storageFolder,
    }),
  });

  let storageCleanup: "completed" | "failed" = "completed";
  try {
    await cleanupStorage(storagePrefix);
  } catch (error) {
    storageCleanup = "failed";
    console.error("[invoice-discard] Storage cleanup failed", {
      receiptId: intake.receiptId,
      message: error instanceof Error ? error.message : "unknown error",
    });
  }

  return Response.json({ ok: true, idempotent: false, receiptId: intake.receiptId, storageCleanup });
}
