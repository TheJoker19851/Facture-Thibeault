import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { INVOICE_CLIENT_VERSION, isCurrentInvoiceClientVersion } from "../lib/invoice-client-version.mjs";

test("accepts only the release invoice client version", () => {
  assert.equal(isCurrentInvoiceClientVersion(INVOICE_CLIENT_VERSION), true);
  assert.equal(isCurrentInvoiceClientVersion("invoice-photo-v1"), false);
  assert.equal(isCurrentInvoiceClientVersion(null), false);
});

test("keeps the PWA, Storage and upload gates on the same release version", async () => {
  const [serviceWorker, storageRules, uploads, component] = await Promise.all([
    readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
    readFile(new URL("../storage.rules", import.meta.url), "utf8"),
    readFile(new URL("../firebase/uploads.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ThibeaultApp.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(serviceWorker, new RegExp(INVOICE_CLIENT_VERSION));
  assert.match(serviceWorker, /client\.navigate\(client\.url\)/);
  assert.match(storageRules, new RegExp(`invoiceClientVersion == '${INVOICE_CLIENT_VERSION}'`));
  assert.match(uploads, /invoiceClientVersion: INVOICE_CLIENT_VERSION/);
  assert.match(component, /CLIENT_VERSION|ClientVersionGate/);
});
