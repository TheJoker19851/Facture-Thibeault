import { ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "./client";

export type InvoicePhotoUpload = {
  file: File;
  sequence: number;
};

/**
 * Uploads evidence to a private, non-guessable submission path. Creating the
 * Firestore submission record and starting Gemini analysis remains a
 * privileged Cloud Function workflow; this client step only sends the bytes.
 */
export async function uploadInvoicePhotos(
  photos: InvoicePhotoUpload[],
): Promise<{ submissionId: string; paths: string[] }> {
  if (!firebaseStorage) throw new Error("Firebase Storage n’est pas configuré.");

  const submissionId = crypto.randomUUID();
  const paths: string[] = [];

  for (const photo of photos) {
    const extension = photo.file.type.split("/")[1]?.replace(/[^a-z0-9]/gi, "") || "bin";
    const path = `submissions/${submissionId}/${String(photo.sequence).padStart(3, "0")}.${extension}`;
    await uploadBytes(ref(firebaseStorage, path), photo.file, {
      contentType: photo.file.type || "application/octet-stream",
      customMetadata: {
        submissionId,
        sequence: String(photo.sequence),
      },
    });
    paths.push(path);
  }

  return { submissionId, paths };
}
