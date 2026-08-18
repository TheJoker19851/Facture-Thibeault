import { ref, uploadBytes } from "firebase/storage";
import { createInvoiceIntakeV2 } from "../generated/data-connect/esm/index.esm.js";
import { firebaseAuth, firebaseStorage } from "./client";
import { firebaseDataConnect, sqlConnectConfigured } from "./data-connect";
import { SUPPORTED_INVOICE_MEDIA_TYPES } from "../lib/invoice-storage.mjs";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";

export type InvoicePhotoUpload = {
  file: File;
  sequence: number;
};

const MAX_PHOTOS = 5;
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
 * Uploads evidence to a private, non-guessable Storage path. The SQL Connect
 * The browser sends only original image bytes and an idempotent intake
 * acknowledgement. Invoice extraction, SQL transaction creation and Gemini
 * analysis remain privileged server workflows.
 */
export async function uploadInvoicePhotos(
  photos: InvoicePhotoUpload[],
  receiptId = crypto.randomUUID(),
): Promise<{ receiptId: string; paths: string[] }> {
  if (!firebaseStorage) throw new Error("Firebase Storage n'est pas configure.");
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("Le connecteur SQL Connect est requis pour enregistrer le depot.");
  }
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise.");
  if (!photos.length) throw new Error("Ajoutez au moins une photo avant l'envoi.");
  if (photos.length > MAX_PHOTOS) throw new Error(`Une facture accepte au maximum ${MAX_PHOTOS} photos.`);

  if (!/^[a-zA-Z0-9_-]{8,128}$/.test(receiptId)) {
    throw new Error("Identifiant de facture invalide.");
  }
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const storageFolder = `receipts/${year}/${month}/${receiptId}`;
  const paths: string[] = [];

  let totalBytes = 0;
  for (const [index, photo] of photos.entries()) {
    const validationError = invoicePhotoFileError(photo.file);
    if (validationError) throw new Error(validationError);
    if (photo.sequence !== index + 1) throw new Error("Les photos doivent former une séquence continue commençant à 1.");
    totalBytes += photo.file.size;
  }
  if (totalBytes > MAX_TOTAL_BYTES) throw new Error("La facture complète doit faire au maximum 40 Mo.");

  for (const photo of photos) {
    const extension = SUPPORTED_INVOICE_MEDIA_TYPES[photo.file.type as keyof typeof SUPPORTED_INVOICE_MEDIA_TYPES];

    const path = `${storageFolder}/original-${String(photo.sequence).padStart(2, "0")}.${extension}`;
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
  });

  return { receiptId, paths };
}
