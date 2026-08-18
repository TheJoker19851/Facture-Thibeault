const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 12 * 1024 * 1024;
const MAX_TOTAL_BYTES = 40 * 1024 * 1024;

export const SUPPORTED_INVOICE_MEDIA_TYPES = Object.freeze({
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
});

export class InvoiceStorageValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvoiceStorageValidationError";
  }
}

export function detectInvoiceImageMediaType(bytes) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a) return "image/png";
  if (bytes.length >= 12 && String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP") return "image/webp";
  return null;
}

export function invoicePhotoMutationVariables(receiptId, storageFolder, photos) {
  const slot = (sequence) => photos[sequence - 1] ?? {
    id: `UNUSED-PHOTO-${receiptId}-${String(sequence).padStart(2, "0")}`,
    storagePath: `${storageFolder}/unused-${String(sequence).padStart(2, "0")}.png`,
    contentType: "image/png",
  };
  const [photo1, photo2, photo3, photo4, photo5] = [1, 2, 3, 4, 5].map(slot);
  return {
    photoCount: photos.length,
    photo1Id: photo1.id, photo1StoragePath: photo1.storagePath, photo1ContentType: photo1.contentType,
    hasPhoto2: photos.length >= 2,
    photo2Id: photo2.id, photo2StoragePath: photo2.storagePath, photo2ContentType: photo2.contentType,
    hasPhoto3: photos.length >= 3,
    photo3Id: photo3.id, photo3StoragePath: photo3.storagePath, photo3ContentType: photo3.contentType,
    hasPhoto4: photos.length >= 4,
    photo4Id: photo4.id, photo4StoragePath: photo4.storagePath, photo4ContentType: photo4.contentType,
    hasPhoto5: photos.length >= 5,
    photo5Id: photo5.id, photo5StoragePath: photo5.storagePath, photo5ContentType: photo5.contentType,
  };
}

export async function loadStoredInvoicePhotos(bucket, intake) {
  const prefix = `${intake.storageFolder}/`;
  const [objects] = await bucket.getFiles({ prefix });
  const directObjects = objects.filter((object) => object.name.startsWith(prefix) &&
    !object.name.slice(prefix.length).includes("/") && object.name.length > prefix.length);
  if (directObjects.length !== intake.photoCount || !directObjects.length || directObjects.length > MAX_PHOTOS) {
    throw new InvoiceStorageValidationError("Le nombre de fichiers Storage ne correspond pas à l'intake.");
  }

  const photos = await Promise.all(directObjects.map(async (object) => {
    const [metadata] = await object.getMetadata();
    const sequence = Number(metadata.metadata?.sequence);
    const contentType = metadata.contentType ?? "";
    const extension = SUPPORTED_INVOICE_MEDIA_TYPES[contentType];
    const expectedName = extension && `original-${String(sequence).padStart(2, "0")}.${extension}`;
    if (!Number.isInteger(sequence) || sequence < 1 || sequence > intake.photoCount ||
      metadata.metadata?.receiptId !== intake.receiptId || metadata.metadata?.ownerUid !== intake.uploaderUid ||
      !extension || object.name !== `${prefix}${expectedName}`) {
      throw new InvoiceStorageValidationError("Les métadonnées ou l'extension du fichier Storage ne correspondent pas à l'intake.");
    }
    const size = Number(metadata.size ?? 0);
    if (!size || size > MAX_PHOTO_BYTES) {
      throw new InvoiceStorageValidationError("Un fichier Storage dépasse la taille autorisée.");
    }
    const [bytes] = await object.download();
    if (bytes.length !== size) throw new InvoiceStorageValidationError("Un fichier Storage est incomplet.");
    if (detectInvoiceImageMediaType(bytes) !== contentType) {
      throw new InvoiceStorageValidationError("Le contenu réel du fichier Storage ne correspond pas à son type MIME.");
    }
    return {
      id: `PHOTO-${intake.receiptId}-${String(sequence).padStart(2, "0")}`,
      storagePath: object.name,
      contentType,
      sequence,
      file: new File([Uint8Array.from(bytes)], expectedName, { type: contentType }),
    };
  }));
  photos.sort((left, right) => left.sequence - right.sequence);
  if (new Set(photos.map((photo) => photo.sequence)).size !== photos.length ||
    photos.some((photo, index) => photo.sequence !== index + 1) ||
    photos.reduce((total, photo) => total + photo.file.size, 0) > MAX_TOTAL_BYTES) {
    throw new InvoiceStorageValidationError("La séquence ou la taille totale des fichiers Storage est invalide.");
  }
  return photos;
}
