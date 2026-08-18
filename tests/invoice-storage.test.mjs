import assert from "node:assert/strict";
import test from "node:test";
import {
  detectInvoiceImageMediaType,
  InvoiceStorageValidationError,
  loadStoredInvoicePhotos,
} from "../lib/invoice-storage.mjs";

const bytesByType = {
  "image/jpeg": Uint8Array.from([0xff, 0xd8, 0xff, 0xdb, 0x00]),
  "image/png": Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]),
  "image/webp": Uint8Array.from([0x52, 0x49, 0x46, 0x46, 0x04, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]),
};

const extensionByType = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

function intake(receiptId = "FORMAT-TEST-001") {
  return { receiptId, uploaderUid: "worker-1", storageFolder: `receipts/demo/${receiptId}`, photoCount: 1 };
}

function storedObject(intakeValue, { contentType = "image/png", bytes = bytesByType[contentType], name, metadata = {} } = {}) {
  const extension = extensionByType[contentType] ?? "heic";
  return {
    name: name ?? `${intakeValue.storageFolder}/original-01.${extension}`,
    async getMetadata() {
      return [{
        contentType,
        size: String(bytes.length),
        metadata: { receiptId: intakeValue.receiptId, ownerUid: intakeValue.uploaderUid, sequence: "1", ...metadata },
      }];
    },
    async download() { return [Buffer.from(bytes)]; },
  };
}

function bucket(objects) {
  return { async getFiles() { return [objects]; } };
}

for (const contentType of Object.keys(bytesByType)) {
  test(`accepte ${contentType} lorsque MIME, extension, signature et métadonnées concordent`, async () => {
    const value = intake(`FORMAT-${contentType.split("/")[1].toUpperCase()}-001`);
    const photos = await loadStoredInvoicePhotos(bucket([storedObject(value, { contentType })]), value);
    assert.equal(photos.length, 1);
    assert.equal(photos[0].contentType, contentType);
    assert.equal(detectInvoiceImageMediaType(bytesByType[contentType]), contentType);
  });
}

test("refuse HEIC en V1", async () => {
  const value = intake("FORMAT-HEIC-001");
  await assert.rejects(
    () => loadStoredInvoicePhotos(bucket([storedObject(value, {
      contentType: "image/heic",
      bytes: Uint8Array.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63]),
    })]), value),
    InvoiceStorageValidationError,
  );
});

test("refuse un type MIME mensonger", async () => {
  const value = intake("FORMAT-LYING-MIME-001");
  await assert.rejects(
    () => loadStoredInvoicePhotos(bucket([storedObject(value, { contentType: "image/png", bytes: bytesByType["image/jpeg"] })]), value),
    /contenu réel/i,
  );
});

test("refuse une extension incohérente avec le MIME", async () => {
  const value = intake("FORMAT-WRONG-EXT-001");
  await assert.rejects(
    () => loadStoredInvoicePhotos(bucket([storedObject(value, {
      contentType: "image/png",
      name: `${value.storageFolder}/original-01.jpg`,
    })]), value),
    /métadonnées ou l'extension/i,
  );
});

test("refuse les métadonnées d'association incohérentes", async () => {
  const value = intake("FORMAT-WRONG-METADATA-001");
  await assert.rejects(
    () => loadStoredInvoicePhotos(bucket([storedObject(value, { metadata: { receiptId: "OTHER-RECEIPT" } })]), value),
    /métadonnées ou l'extension/i,
  );
});
