import { ref, uploadBytes } from "firebase/storage";
import { createInvoiceIntakeV2 } from "../generated/data-connect/esm/index.esm.js";
import { firebaseAuth, firebaseStorage } from "./client";
import { firebaseDataConnect, sqlConnectConfigured } from "./data-connect";
import { SUPPORTED_INVOICE_MEDIA_TYPES } from "../lib/invoice-storage.mjs";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../lib/audit-events.mjs";
import { createClientId } from "../lib/client-id.mjs";
import { capturePhotoIdentity } from "../lib/invoice-capture-batch.mjs";
import { findInvoiceIntakeStatus, type InvoiceIntakeStatus } from "./ai";

export type InvoicePhotoUpload = {
  file: File;
  sequence: number;
};

const MAX_PHOTO_BYTES = 12 * 1024 * 1024;
const MAX_TOTAL_BYTES = 40 * 1024 * 1024;

export function invoicePhotoFileError(file: File) {
  if (!(file.type in SUPPORTED_INVOICE_MEDIA_TYPES)) {
    return "Format non pris en charge. Utilisez une image JPEG, PNG ou WebP; HEIC n’est pas accepté.";
  }
  if (!file.size || file.size > MAX_PHOTO_BYTES) return "Chaque photo doit faire au maximum 12 Mo.";
  return null;
}

/**
 * Uploads evidence to a private, non-guessable Storage path. The browser
 * sends only original image bytes and an idempotent intake
 * acknowledgement. Invoice extraction, SQL transaction creation and Gemini
 * analysis remain privileged server workflows.
 */
export async function uploadInvoicePhotos(
  photos: InvoicePhotoUpload[],
  receiptId = createClientId(),
  storageFolder = capturePhotoIdentity(receiptId).storageFolder,
): Promise<{ receiptId: string; paths: string[]; status?: InvoiceIntakeStatus }> {
  if (!firebaseStorage) throw new Error("Firebase Storage n'est pas configure.");
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("Le connecteur SQL Connect est requis pour enregistrer le depot.");
  }
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise.");
  if (!photos.length) throw new Error("Ajoutez au moins une photo avant l'envoi.");
  if (photos.length !== 1) throw new Error("Chaque photo doit être envoyée dans un dépôt distinct.");

  if (!/^[a-zA-Z0-9_-]{8,128}$/.test(receiptId)) {
    throw new Error("Identifiant de facture invalide.");
  }
  if (!/^receipts\/\d{4}\/\d{2}\/[a-zA-Z0-9_-]{8,128}$/.test(storageFolder) || !storageFolder.endsWith(`/${receiptId}`)) {
    throw new Error("Dossier de dépôt invalide.");
  }
  const paths: string[] = [];

  let totalBytes = 0;
  for (const [index, photo] of photos.entries()) {
    const validationError = invoicePhotoFileError(photo.file);
    if (validationError) throw new Error(validationError);
    if (photo.sequence !== index + 1) throw new Error("Les photos doivent former une séquence continue commençant à 1.");
    totalBytes += photo.file.size;
  }
  if (totalBytes > MAX_TOTAL_BYTES) throw new Error("La facture complète doit faire au maximum 40 Mo.");

  const existing = await findInvoiceIntakeStatus(receiptId);
  if (existing) {
    if (existing.photoCount !== 1 || existing.storageFolder !== storageFolder) throw new Error("Ce dépôt existe avec un autre original.");
    return { receiptId, paths: [], status: existing };
  }

  for (const photo of photos) {
    const extension = SUPPORTED_INVOICE_MEDIA_TYPES[photo.file.type as keyof typeof SUPPORTED_INVOICE_MEDIA_TYPES];

    const path = `${storageFolder}/original-${String(photo.sequence).padStart(2, "0")}.${extension}`;
    try {
      await uploadBytes(ref(firebaseStorage, path), photo.file, {
      contentType: photo.file.type || "application/octet-stream",
      customMetadata: {
        receiptId,
        ownerUid: user.uid,
        sequence: String(photo.sequence),
        invoiceClientVersion: INVOICE_CLIENT_VERSION,
        ...(receiptId.startsWith("DEMO-") ? { demo: "true" } : {}),
      },
      });
    } catch (uploadError) {
      // A successful immutable upload can outlive a lost client response.
      // Recovery acknowledges the identical file; it never replaces it.
      const digest = await crypto.subtle.digest("SHA-256", await photo.file.arrayBuffer());
      const sha256 = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
      const proof = await fetch("/api/invoices/verify-upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${await user.getIdToken()}`, "x-invoice-client-version": INVOICE_CLIENT_VERSION, "content-type": "application/json" },
        body: JSON.stringify({ receiptId, storageFolder, sha256 }),
      });
      if (!proof.ok || !(await proof.json().catch(() => null))?.ok) throw uploadError;
    }
    paths.push(path);
  }

  // Acknowledging the upload is idempotent on receiptId. If the network drops
  // after Storage succeeds, the server-side processing worker can safely pick
  // up this intake without requiring the browser to create accounting rows.
  await createInvoiceIntakeV2(firebaseDataConnect, {
    receiptId,
    storageFolder,
    photoCount: photos.length,
    clientVersion: INVOICE_CLIENT_VERSION,
    writeAudit: true,
    auditEventId: auditEventId(receiptId, AUDIT_ACTIONS.DEPOSIT_CREATED),
    auditDetails: auditDetails({ photoCount: photos.length, storageFolder }),
  });

  return { receiptId, paths };
}
