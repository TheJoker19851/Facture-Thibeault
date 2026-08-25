import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect, getFirebaseAdminStorage } from "../../../../firebase/admin";
import { clientUpdateRequiredResponse, isCurrentInvoiceClientVersion } from "../../../../lib/invoice-client-version.mjs";
import { listAllAdminInvoices } from "../../../../firebase/accounting-pagination.server";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import { createClientId } from "../../../../lib/client-id.mjs";

export const runtime = "nodejs";

const deletePostedSchema = z.object({
  invoiceId: z.string().regex(/^[a-zA-Z0-9_-]{8,128}$/),
  transactionId: z.string().regex(/^[a-zA-Z0-9_-]{8,128}$/),
  receiptId: z.string().regex(/^[a-zA-Z0-9_-]{8,128}$/).optional(),
  reason: z.string().trim().min(1).max(500),
});

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

function storagePrefixFor(folder: string | null | undefined, receiptId?: string) {
  if (!folder) return null;
  const prefix = folder.replace(/^\/+|\/+$/g, "");
  if (!prefix.startsWith("receipts/") || prefix.includes("..") || (receiptId && !prefix.endsWith(`/${receiptId}`))) {
    throw new Error("Le dossier Storage de la facture est invalide; aucun fichier n’a été supprimé.");
  }
  return `${prefix}/`;
}

async function cleanupStorage(storagePrefix: string | null) {
  if (!storagePrefix) return "not_applicable" as const;
  const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucketName) throw new Error("Le bucket Firebase Storage n'est pas configuré.");
  const [files] = await (await getFirebaseAdminStorage()).bucket(bucketName).getFiles({ prefix: storagePrefix });
  await Promise.all(files.map((file) => file.delete()));
  return "completed" as const;
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

  const parsed = deletePostedSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "La demande de suppression est invalide." }, { status: 400 });

  const dataConnect = await getFirebaseAdminDataConnect();
  const invoice = (await listAllAdminInvoices(dataConnect)).find((candidate) => candidate.id === parsed.data.invoiceId) ?? null;
  if (!invoice) return Response.json({ error: "La facture n'existe pas." }, { status: 404 });
  if (invoice.transaction?.id !== parsed.data.transactionId) {
    return Response.json({ error: "La facture et la transaction ne correspondent pas." }, { status: 409 });
  }
  if (invoice.processingStatus === "DELETED" && invoice.accountingStatus === "DELETED") {
    const receiptId = invoice.intake?.receiptId ?? parsed.data.receiptId;
    const storagePrefix = storagePrefixFor(invoice.storageFolder ?? invoice.intake?.storageFolder, receiptId);
    let storageCleanup: "completed" | "not_applicable" | "failed" = "not_applicable";
    try {
      storageCleanup = await cleanupStorage(storagePrefix);
    } catch (error) {
      console.error("[invoice-delete-posted] Storage cleanup retry failed", {
        invoiceId: invoice.id,
        message: error instanceof Error ? error.message : "unknown error",
      });
      storageCleanup = "failed";
    }
    return Response.json({ ok: true, idempotent: true, invoiceId: invoice.id, storageCleanup });
  }
  if (invoice.accountingStatus !== "POSTED" || !["VALIDATED", "AUTO_APPROVED"].includes(invoice.processingStatus ?? "")) {
    return Response.json({ error: "Seule une écriture publiée peut être supprimée depuis Transactions." }, { status: 409 });
  }

  const receiptId = invoice.intake?.receiptId ?? parsed.data.receiptId ?? "";
  if (parsed.data.receiptId && invoice.intake?.receiptId && parsed.data.receiptId !== invoice.intake.receiptId) {
    return Response.json({ error: "La facture et le dépôt ne correspondent pas." }, { status: 409 });
  }
  const storagePrefix = storagePrefixFor(invoice.storageFolder ?? invoice.intake?.storageFolder, receiptId || undefined);
  await dataConnect.executeMutation("DeletePostedInvoice", {
    invoiceId: invoice.id,
    transactionId: parsed.data.transactionId,
    receiptId,
    writeIntake: Boolean(receiptId),
    reason: parsed.data.reason,
    actorUid: identity.uid,
    actorRole: identity.role,
    auditEventId: auditEventId(invoice.id, AUDIT_ACTIONS.POSTED_INVOICE_DELETED, createClientId()),
    auditDetails: auditDetails({
      source: "USER_POSTED_DELETE",
      reason: parsed.data.reason,
      invoiceId: invoice.id,
      transactionId: parsed.data.transactionId,
      receiptId: receiptId || null,
    }),
  });

  let storageCleanup: "completed" | "not_applicable" | "failed" = "not_applicable";
  try {
    storageCleanup = await cleanupStorage(storagePrefix);
  } catch (error) {
    storageCleanup = "failed";
    console.error("[invoice-delete-posted] Storage cleanup failed", {
      invoiceId: invoice.id,
      message: error instanceof Error ? error.message : "unknown error",
    });
  }

  return Response.json({ ok: true, idempotent: false, invoiceId: invoice.id, transactionId: parsed.data.transactionId, storageCleanup });
}
