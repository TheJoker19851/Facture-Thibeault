import { ref, uploadBytes } from "firebase/storage";
import { createInvoiceIntake } from "../generated/data-connect/esm/index.esm.js";
import { firebaseAuth, firebaseStorage } from "./client";
import { firebaseDataConnect, sqlConnectConfigured } from "./data-connect";

export type InvoicePhotoUpload = {
  file: File;
  sequence: number;
};

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

  if (!/^[a-zA-Z0-9_-]{8,128}$/.test(receiptId)) {
    throw new Error("Identifiant de facture invalide.");
  }
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const storageFolder = `receipts/${year}/${month}/${receiptId}`;
  const paths: string[] = [];

  for (const photo of photos) {
    const extensionByType: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/heic": "heic",
    };
    const extension = extensionByType[photo.file.type];
    if (!extension) throw new Error("Seules les images JPEG, PNG, WebP ou HEIC sont acceptees.");

    const path = `${storageFolder}/original-${String(photo.sequence).padStart(2, "0")}.${extension}`;
    await uploadBytes(ref(firebaseStorage, path), photo.file, {
      contentType: photo.file.type || "application/octet-stream",
      customMetadata: {
        receiptId,
        ownerUid: user.uid,
        sequence: String(photo.sequence),
        ...(receiptId.startsWith("DEMO-") ? { demo: "true" } : {}),
      },
    });
    paths.push(path);
  }

  // Acknowledging the upload is idempotent on receiptId. If the network drops
  // after Storage succeeds, the server-side processing worker can safely pick
  // up this intake without requiring the browser to create accounting rows.
  await createInvoiceIntake(firebaseDataConnect, {
    receiptId,
    storageFolder,
    photoCount: photos.length,
  });

  return { receiptId, paths };
}
