import { createClientId } from "./client-id.mjs";

export const MAX_CAPTURE_PHOTOS = 10;
export const MAX_CAPTURE_TOTAL_BYTES = 40 * 1024 * 1024;

// Persist this identity before uploading: retries must address the same original,
// including when an offline draft is resumed in a different month.
export function capturePhotoIdentity(receiptId = createClientId(), now = new Date()) {
  return {
    receiptId,
    storageFolder: `receipts/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${receiptId}`,
  };
}

export function restoreCapturePhotos(draft, newIdentity = capturePhotoIdentity) {
  return (draft?.photos ?? []).map((photo) => ({
    ...photo,
    // A legacy single-photo draft can safely retain its original intake ID.
    // Legacy multi-photo drafts must never share that ID.
    ...(photo.receiptId && photo.storageFolder
      ? { receiptId: photo.receiptId, storageFolder: photo.storageFolder }
      : newIdentity(draft.photos.length === 1 ? draft.receiptId : undefined)),
  }));
}

/** Failure isolation, ordered execution and completion notifications per photo. */
export async function runCaptureBatch(items, operation, onResult = (result) => { void result; }) {
  const results = [];
  for (const [index, item] of items.entries()) {
    let result;
    try {
      result = { item, index, ok: true, value: await operation(item, index) };
    } catch (error) {
      result = { item, index, ok: false, error: error instanceof Error ? error.message : "Le traitement a échoué." };
    }
    results.push(result);
    await onResult(result);
  }
  return results;
}

// A shared chain also serializes successive sends from the same browser session.
export function createCaptureProcessor(operation) {
  let pending = Promise.resolve();
  return (items) => {
    const batch = pending.then(() => runCaptureBatch(items, operation));
    pending = batch.then(() => undefined, () => undefined);
    return batch;
  };
}
