import { ref, uploadBytes } from "firebase/storage";
import { firebaseAuth, firebaseStorage } from "./client";

export type InvoicePhotoUpload = {
  file: File;
  sequence: number;
};

/**
 * Uploads evidence to a private, non-guessable Storage path. The SQL Connect
 * receipt record and any Gemini analysis remain privileged workflows; this
 * client step only sends the original image bytes.
 */
export async function uploadInvoicePhotos(
  photos: InvoicePhotoUpload[],
): Promise<{ receiptId: string; paths: string[] }> {
  if (!firebaseStorage) throw new Error("Firebase Storage n'est pas configure.");
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise.");

  const receiptId = crypto.randomUUID();
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
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

    const path = `receipts/${year}/${month}/${receiptId}/original-${String(photo.sequence).padStart(2, "0")}.${extension}`;
    await uploadBytes(ref(firebaseStorage, path), photo.file, {
      contentType: photo.file.type || "application/octet-stream",
      customMetadata: {
        receiptId,
        ownerUid: user.uid,
        sequence: String(photo.sequence),
      },
    });
    paths.push(path);
  }

  return { receiptId, paths };
}
