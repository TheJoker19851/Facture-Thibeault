const DATABASE_NAME = "facture-thibeault-capture";
const STORE_NAME = "drafts";
const DRAFT_KEY = "current";

function openDatabase() {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB indisponible."));
  });
}

export async function saveCaptureDraft(receiptId, photos) {
  const database = await openDatabase().catch(() => null);
  if (!database) return false;
  return new Promise((resolve) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put({ receiptId, photos }, DRAFT_KEY);
    transaction.oncomplete = () => { database.close(); resolve(true); };
    transaction.onerror = () => { database.close(); resolve(false); };
  });
}

export async function loadCaptureDraft() {
  const database = await openDatabase().catch(() => null);
  if (!database) return null;
  return new Promise((resolve) => {
    const request = database.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(DRAFT_KEY);
    request.onsuccess = () => { database.close(); resolve(request.result ?? null); };
    request.onerror = () => { database.close(); resolve(null); };
  });
}

export async function clearCaptureDraft() {
  const database = await openDatabase().catch(() => null);
  if (!database) return false;
  return new Promise((resolve) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).delete(DRAFT_KEY);
    transaction.oncomplete = () => { database.close(); resolve(true); };
    transaction.onerror = () => { database.close(); resolve(false); };
  });
}
