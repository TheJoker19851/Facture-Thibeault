import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import { materializeInvoiceIntake, readInvoiceIntakeStoragePhotos } from "../../../../firebase/invoice-intake-commit.server";
import { InvoiceStorageValidationError } from "../../../../lib/invoice-storage.mjs";
import { clientUpdateRequiredResponse, isCurrentInvoiceClientVersion } from "../../../../lib/invoice-client-version.mjs";

export const runtime = "nodejs";

const commitSchema = z.object({
  receiptId: z.string().regex(/^[a-zA-Z0-9_-]{8,128}$/),
  vendor: z.string().trim().min(1),
  invoiceNumber: z.string().nullable(),
  invoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  subtotalCents: z.number().int().nonnegative(),
  tpsCents: z.number().int().nonnegative(),
  tvqCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
  currency: z.string().trim().length(3),
  sku: z.string().nullable(),
  category: z.string().trim().min(1),
  accountCode: z.string().trim().min(1),
  cardId: z.string().trim().min(1),
  statementPeriodId: z.string().trim().min(1).nullable(),
  projectId: z.string().trim().min(1).nullable(),
  classificationNote: z.string().trim().min(1),
});

type IntakeData = {
  invoiceIntakes: Array<{
    receiptId: string;
    uploaderUid: string;
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

export async function POST(request: Request) {
  if (!isCurrentInvoiceClientVersion(request.headers.get("x-invoice-client-version"))) {
    return clientUpdateRequiredResponse();
  }
  if (!firebaseAdminConfigured()) {
    return Response.json({ error: "Firebase Admin n'est pas configuré pour cet environnement." }, { status: 503 });
  }
  if (!await privilegedIdentity(request)) {
    return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  }
  const parsed = commitSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Données de comptabilisation invalides." }, { status: 400 });

  const dataConnect = await getFirebaseAdminDataConnect();
  const readIntake = async () => {
    const response = await dataConnect.executeQuery<IntakeData>("ListInvoiceIntakes");
    return response.data.invoiceIntakes.find((item) => item.receiptId === parsed.data.receiptId) ?? null;
  };
  const intake = await readIntake();
  if (!intake) return Response.json({ error: "Le dépôt de facture n'existe pas." }, { status: 404 });
  if (intake.accountingStatus === "POSTED") {
    return Response.json({ ok: true, idempotent: true, receiptId: intake.receiptId });
  }
  if (intake.processingStatus !== "VALIDATED" || intake.accountingStatus !== "NOT_POSTED") {
    return Response.json({ error: "L'intake n'est pas validée ou est déjà en cours de comptabilisation." }, { status: 409 });
  }

  try {
    const photos = await readInvoiceIntakeStoragePhotos(intake);
    await materializeInvoiceIntake(dataConnect, intake, photos, parsed.data, "HUMAN");
    return Response.json({ ok: true, idempotent: false, receiptId: intake.receiptId, photoCount: photos.length });
  } catch (error) {
    const latest = await readIntake().catch(() => null);
    if (latest?.accountingStatus === "POSTED") {
      return Response.json({ ok: true, idempotent: true, receiptId: intake.receiptId });
    }
    if (!(error instanceof InvoiceStorageValidationError)) {
      await dataConnect.executeMutation("MarkInvoiceIntakePostingError", { receiptId: intake.receiptId }).catch(() => undefined);
    }
    console.error("[invoice-commit] request failed", {
      receiptId: intake.receiptId,
      message: error instanceof Error ? error.message : "unknown error",
    });
    return Response.json({
      error: error instanceof InvoiceStorageValidationError
        ? error.message
        : "La création atomique de la facture a échoué; aucune écriture partielle n'a été conservée.",
    }, { status: 422 });
  }
}
