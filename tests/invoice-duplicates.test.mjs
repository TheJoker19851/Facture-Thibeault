import assert from "node:assert/strict";
import test from "node:test";
import {
  buildInvoiceBusinessFingerprint,
  buildInvoiceSourceHash,
  exactDuplicateDecision,
  findDefiniteTransactionDuplicate,
} from "../lib/invoice-duplicates.mjs";

const extraction = {
  vendor: "Le Relais du Parc Inc.",
  invoiceNumber: "010282",
  invoiceDate: "2026-09-08",
  totalCents: 19277,
  lineItems: [{ description: "Essence", quantity: 1, amountCents: 16766, sku: null }],
};

test("produit la même empreinte pour les mêmes photos et une différente si les octets changent", async () => {
  const first = [new File([Uint8Array.from([1, 2, 3])], "first.jpg")];
  const same = [new File([Uint8Array.from([1, 2, 3])], "renamed.jpg")];
  const different = [new File([Uint8Array.from([1, 2, 4])], "first.jpg")];
  assert.equal(await buildInvoiceSourceHash(first), await buildInvoiceSourceHash(same));
  assert.notEqual(await buildInvoiceSourceHash(first), await buildInvoiceSourceHash(different));
});

test("normalise les accents et la ponctuation dans l’empreinte commerciale", () => {
  const first = buildInvoiceBusinessFingerprint(extraction, "CARD-2481");
  const same = buildInvoiceBusinessFingerprint({ ...extraction, vendor: "LE RELAIS DU PARC INC" }, "CARD-2481");
  assert.equal(first, same);
  assert.notEqual(first, buildInvoiceBusinessFingerprint({ ...extraction, totalCents: 19278 }, "CARD-2481"));
});

test("refuse une empreinte faible fondée seulement sur commerce, date et montant", () => {
  assert.equal(buildInvoiceBusinessFingerprint({ ...extraction, invoiceNumber: null, lineItems: [] }, "CARD-2481"), null);
  assert.equal(buildInvoiceBusinessFingerprint(extraction, null), null);
});

test("utilise les articles lorsque le numéro de facture est absent", () => {
  const first = buildInvoiceBusinessFingerprint({ ...extraction, invoiceNumber: null }, "CARD-2481");
  const same = buildInvoiceBusinessFingerprint({ ...extraction, invoiceNumber: null, lineItems: [{ description: "ESSÉNCE", quantity: 1, amountCents: 16766 }] }, "CARD-2481");
  assert.equal(first, same);
  assert.ok(first);
});

test("reconnaît un doublon comptabilisé seulement avec le numéro et toute la clé commerciale", () => {
  const transactions = [{
    id: "TX-ORIGINAL",
    transactionDate: "2026-09-08",
    vendor: "Le Relais du Parc Inc",
    invoiceNumber: "010282",
    totalCents: "19277",
    card: { id: "CARD-2481" },
  }];
  assert.equal(findDefiniteTransactionDuplicate(extraction, transactions, "CARD-2481")?.id, "TX-ORIGINAL");
  assert.equal(findDefiniteTransactionDuplicate({ ...extraction, invoiceNumber: null }, transactions, "CARD-2481"), null);
});

test("classe un doublon exact hors de la file de vérification", () => {
  const decision = exactDuplicateDecision("RECEIPT-ORIGINAL", "SOURCE_HASH");
  assert.equal(decision.decision, "DUPLICATE");
  assert.equal(decision.exceptions[0].code, "EXACT_DUPLICATE");
  assert.equal(decision.exceptions[0].status, "RESOLVED");
});
