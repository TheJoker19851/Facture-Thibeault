import assert from "node:assert/strict";
import { test } from "node:test";
import { capturePhotoIdentity, restoreCapturePhotos, runCaptureBatch, createCaptureProcessor } from "../lib/invoice-capture-batch.mjs";

test("each selected photo has an independent stable identity, including across months", () => {
  const identities = Array.from({ length: 10 }, () => capturePhotoIdentity());
  assert.equal(new Set(identities.map((photo) => photo.receiptId)).size, 10);
  const original = { ...capturePhotoIdentity("receipt-0001", new Date(2026, 8, 30)), id: "photo1", file: {} };
  const restored = restoreCapturePhotos({ receiptId: "batch-old", photos: [original] });
  assert.deepEqual(restored, [original]);
  assert.equal(restored[0].storageFolder, "receipts/2026/09/receipt-0001");
});

test("legacy multi-photo drafts are split, single-photo retries retain their ID", () => {
  let counter = 0;
  const identity = (id) => capturePhotoIdentity(id ?? `receipt-${++counter}`);
  const split = restoreCapturePhotos({ receiptId: "legacy-id", photos: [{ id: "a" }, { id: "b" }] }, identity);
  assert.notEqual(split[0].receiptId, split[1].receiptId);
  assert.notEqual(split[0].receiptId, "legacy-id");
  assert.equal(restoreCapturePhotos({ receiptId: "legacy-id", photos: [{ id: "a" }] }, identity)[0].receiptId, "legacy-id");
});

test("uploads are sequential; failed originals are retained and later photos still send", async () => {
  const photos = ["first", "failed", "last"].map((receiptId) => ({ receiptId, sequence: 1 }));
  let active = 0;
  let maximum = 0;
  let remaining = [...photos];
  const calls = [];
  const results = await runCaptureBatch(photos, async (photo) => {
    active++;
    maximum = Math.max(maximum, active);
    calls.push(photo.receiptId);
    await Promise.resolve();
    active--;
    if (photo.receiptId === "failed") throw new Error("Network lost");
    return photo.receiptId;
  }, (result) => {
    if (result.ok) remaining = remaining.filter((photo) => photo.receiptId !== result.item.receiptId);
  });
  assert.equal(maximum, 1);
  assert.deepEqual(calls, ["first", "failed", "last"]);
  assert.deepEqual(results.map((result) => result.ok), [true, false, true]);
  assert.deepEqual(remaining, [photos[1]]);
  const retry = await runCaptureBatch(remaining, async (photo) => photo.receiptId);
  assert.equal(retry[0].value, "failed");
});

test("AI processing serializes successive batches and survives one analysis error", async () => {
  const calls = [];
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const enqueue = createCaptureProcessor(async (id) => {
    calls.push(id);
    if (id === "first") await gate;
    if (id === "bad") throw new Error("AI failed");
    return id;
  });
  const first = enqueue(["first", "bad", "third"]);
  const second = enqueue(["next-batch"]);
  await Promise.resolve();
  assert.deepEqual(calls, ["first"]);
  release();
  const results = await first;
  await second;
  assert.deepEqual(calls, ["first", "bad", "third", "next-batch"]);
  assert.deepEqual(results.map((result) => result.ok), [true, false, true]);
});
