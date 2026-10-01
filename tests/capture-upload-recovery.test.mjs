import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { verifyStoredCapturePhoto } from "../lib/capture-upload-recovery.server.mjs";

const bytes = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2]);
const intake = { receiptId: "receipt-0001", storageFolder: "receipts/2026/10/receipt-0001", uploaderUid: "worker1" };
const hash = createHash("sha256").update(bytes).digest("hex");
function bucket(ownerUid = "worker1", count = 1) {
  const object = {
    name: `${intake.storageFolder}/original-01.png`,
    getMetadata: async () => [{ size: bytes.length, contentType: "image/png", metadata: { ownerUid, receiptId: intake.receiptId, sequence: "1" } }],
    download: async () => [bytes],
  };
  // Intentionally no write/delete API: recovery only reads immutable evidence.
  return { getFiles: async () => [Array.from({ length: count }, () => object)] };
}
test("a lost upload response is recoverable only for the exact owned original", async () => {
  assert.equal(await verifyStoredCapturePhoto(bucket(), intake, hash), true);
  await assert.rejects(verifyStoredCapturePhoto(bucket("someone-else"), intake, hash));
  await assert.rejects(verifyStoredCapturePhoto(bucket(), intake, "0".repeat(64)));
  await assert.rejects(verifyStoredCapturePhoto(bucket("worker1", 2), intake, hash));
  await assert.rejects(verifyStoredCapturePhoto(bucket("worker1", 0), intake, hash));
});
