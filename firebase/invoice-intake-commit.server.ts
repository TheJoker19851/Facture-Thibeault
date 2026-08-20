import type { DataConnect } from "firebase-admin/data-connect";
import { getFirebaseAdminStorage } from "./admin";
import { invoicePhotoMutationVariables, loadStoredInvoicePhotos } from "../lib/invoice-storage.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../lib/audit-events.mjs";

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
  statementPeriodId: string | null;
  projectId: string | null;
  classificationNote: string;
  actorUid?: string;
  actorRole?: string;
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
    statementPeriod: values.statementPeriodId ? { id: values.statementPeriodId } : null,
    project: values.projectId ? { id: values.projectId } : null,
    storageFolder: intake.storageFolder,
    classificationNote: values.classificationNote,
    expectedProcessingStatus,
    classificationSource,
    classificationStatus,
    actorUid: values.actorUid ?? intake.uploaderUid,
    actorRole: values.actorRole ?? "UNKNOWN",
    writeAudit: true,
    auditEventId: auditEventId(intake.receiptId, AUDIT_ACTIONS.TRANSACTION_CREATED),
    auditDetails: auditDetails({
      transactionId: `TX-${intake.receiptId}`,
      invoiceId: `INV-${intake.receiptId}`,
      decision,
      validation: decision === "HUMAN" ? "HUMAN_VALIDATION" : "AUTO_VALIDATION",
    }),
    ...invoicePhotoMutationVariables(intake.receiptId, intake.storageFolder, photos),
  });
}
