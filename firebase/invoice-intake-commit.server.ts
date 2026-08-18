import type { DataConnect } from "firebase-admin/data-connect";
import { getFirebaseAdminStorage } from "./admin";
import { invoicePhotoMutationVariables, loadStoredInvoicePhotos } from "../lib/invoice-storage.mjs";

export type InvoiceIntakeStorageIdentity = {
  receiptId: string;
  uploaderUid: string;
  storageFolder: string;
  photoCount: number;
};

export type InvoiceCommitValues = {
  vendor: string;
  invoiceNumber: string | null;
  invoiceDate: string;
  subtotalCents: number;
  tpsCents: number;
  tvqCents: number;
  totalCents: number;
  currency: string;
  sku: string | null;
  category: string;
  accountCode: string;
  cardId: string;
  statementPeriodId: string;
  projectId: string | null;
  classificationNote: string;
};

export async function readInvoiceIntakeStoragePhotos(intake: InvoiceIntakeStorageIdentity) {
  const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucketName) throw new Error("Le bucket Firebase Storage n'est pas configuré.");
  return loadStoredInvoicePhotos((await getFirebaseAdminStorage()).bucket(bucketName), intake);
}

export async function materializeInvoiceIntake(
  dataConnect: DataConnect,
  intake: InvoiceIntakeStorageIdentity,
  photos: Awaited<ReturnType<typeof readInvoiceIntakeStoragePhotos>>,
  values: InvoiceCommitValues,
  decision: "AUTO" | "HUMAN",
) {
  const expectedProcessingStatus = decision === "AUTO" ? "AUTO_APPROVED" : "VALIDATED";
  const classificationSource = decision === "AUTO" ? "AUTO_DECISION" : "KIM_COMMIT";
  const classificationStatus = decision === "AUTO" ? "RESOLVED" : "COMMITTED";
  return dataConnect.executeMutation("MaterializeInvoiceIntakeV2", {
    receiptId: intake.receiptId,
    transactionId: `TX-${intake.receiptId}`,
    invoiceId: `INV-${intake.receiptId}`,
    vendor: values.vendor,
    invoiceNumber: values.invoiceNumber,
    invoiceDate: values.invoiceDate,
    subtotalCents: String(values.subtotalCents),
    tpsCents: String(values.tpsCents),
    tvqCents: String(values.tvqCents),
    totalCents: String(values.totalCents),
    currency: values.currency,
    sku: values.sku,
    category: values.category,
    accountCode: values.accountCode,
    cardId: values.cardId,
    statementPeriodId: values.statementPeriodId,
    project: values.projectId ? { id: values.projectId } : null,
    storageFolder: intake.storageFolder,
    classificationNote: values.classificationNote,
    expectedProcessingStatus,
    classificationSource,
    classificationStatus,
    ...invoicePhotoMutationVariables(intake.receiptId, intake.storageFolder, photos),
  });
}
