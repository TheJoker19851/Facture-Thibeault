import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import { listAllInvoiceIntakes } from "../../../../firebase/accounting-pagination.server";
import { clientUpdateRequiredResponse, isCurrentInvoiceClientVersion } from "../../../../lib/invoice-client-version.mjs";

export const runtime = "nodejs";

const receiptIdSchema = z.string().regex(/^[a-zA-Z0-9_-]{8,128}$/);
const ALLOWED_ROLES = new Set(["WORKER", "KIM", "ADMIN"]);

async function identity(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    if (typeof decoded.role !== "string" || !ALLOWED_ROLES.has(decoded.role)) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  if (!isCurrentInvoiceClientVersion(request.headers.get("x-invoice-client-version"))) {
    return clientUpdateRequiredResponse();
  }
  const decoded = await identity(request);
  if (!decoded) return Response.json({ error: "Une session Firebase valide est requise." }, { status: 403 });
  if (!firebaseAdminConfigured()) {
    return Response.json({ error: "Firebase Admin n'est pas configuré pour cet environnement." }, { status: 503 });
  }

  const receiptId = receiptIdSchema.safeParse(new URL(request.url).searchParams.get("receiptId"));
  if (!receiptId.success) return Response.json({ error: "Identifiant de dépôt invalide." }, { status: 400 });

  const dataConnect = await getFirebaseAdminDataConnect();
  const intake = (await listAllInvoiceIntakes(dataConnect)).find((item) => item.receiptId === receiptId.data) ?? null;
  if (!intake) return Response.json({ error: "Le dépôt de facture n'existe pas." }, { status: 404 });

  const isPrivileged = decoded.role === "KIM" || decoded.role === "ADMIN";
  if (!isPrivileged && decoded.uid !== intake.uploaderUid) {
    return Response.json({ error: "Ce dépôt n'est pas accessible par cette session." }, { status: 403 });
  }

  return Response.json({
    ok: true,
    receiptId: intake.receiptId,
    state: {
      processingStatus: intake.processingStatus ?? "PROCESSING",
      processingState: intake.processingState ?? "QUEUED",
      processingAttempts: Number(intake.processingAttempts ?? 0),
      lastAttemptAt: intake.lastAttemptAt ?? null,
      accountingStatus: intake.accountingStatus ?? "NOT_POSTED",
      lastError: intake.lastError ?? null,
      aiErrorCode: intake.aiErrorCode ?? null,
    },
  });
}
