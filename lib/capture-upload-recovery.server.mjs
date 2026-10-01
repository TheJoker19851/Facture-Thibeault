import { createHash } from "node:crypto";
import { loadStoredInvoicePhotos } from "./invoice-storage.mjs";

// Prove that the immutable original belongs to this uploader and is exactly
// the file still held in their draft. Never grant read access to its bytes.
export async function verifyStoredCapturePhoto(bucket, intake, expectedHash) {
  const [photo] = await loadStoredInvoicePhotos(bucket, { ...intake, photoCount: 1 });
  const hash = createHash("sha256").update(Buffer.from(await photo.file.arrayBuffer())).digest("hex");
  if (hash !== expectedHash) throw new Error("L’original déjà reçu ne correspond pas à cette photo.");
  return true;
}
