import assert from "node:assert/strict";
import test from "node:test";
import {
  classificationNoteForDisplay,
  classifyInvoice,
  invoiceLineItemsSubtotalCents,
  validateInvoiceExtraction,
  validateInvoiceLineItemsForCommit,
} from "../lib/invoice-processing.mjs";
import { transactionAccountAllocations } from "../lib/accounting-report.mjs";

const receiptLineItems = [
  { description: "SQUARE TERMINAL", quantity: 1, unitPriceCents: 39999, amountCents: 39999, accountCode: "33526" },
  { description: "Stop standard app 2a", quantity: 1, unitPriceCents: 6999, amountCents: 6999, accountCode: "33526" },
  { description: "Coupon BEG 87405", quantity: 1, unitPriceCents: -7500, amountCents: -7500, accountCode: "33526" },
];

test("les classifications résolues ne réclament pas une validation manuelle", () => {
  const accounts = [{ number: "33544", label: "Essence EXPENSE", type: "EXPENSE", status: "ACTIVE" }];
  const categoryMatch = classifyInvoice({ category: "Essence EXPENSE" }, [], accounts);
  assert.equal(categoryMatch.resolution, "RESOLVED");
  assert.equal(categoryMatch.note, "Compte 33544 attribué automatiquement par correspondance exacte avec la catégorie Essence EXPENSE.");
  assert.doesNotMatch(categoryMatch.note, /validation manuelle/i);

  const skuMatch = classifyInvoice({ vendor: "Shell Canada", sku: "DIESEL" }, [{ merchant: "Shell Canada", sku: "DIESEL", category: "Essence EXPENSE", accountCode: "33544", status: "VALIDATED" }], accounts);
  assert.equal(skuMatch.resolution, "RESOLVED");
  assert.equal(skuMatch.note, "Compte 33544 attribué automatiquement à partir d’une référence SKU validée.");
  assert.doesNotMatch(skuMatch.note, /validation manuelle/i);
});

test("rapproche les variantes de marchand et de SKU Canadian Tire", () => {
  const accounts = [{ number: "33500", label: "Matériaux divers", type: "EXPENSE", status: "ACTIVE" }];
  const result = classifyInvoice(
    { vendor: "CDN TIRE STORE 174", sku: "0287932" },
    [{ merchant: "Canadian Tire", sku: "028-7932-6", productLabel: "Produit Canadian Tire", category: "Matériaux divers", accountCode: "33500", status: "VALIDATED" }],
    accounts,
  );
  assert.equal(result.source, "SKU_REFERENCE");
  assert.equal(result.skuState, "RESOLVED");
  assert.equal(result.accountCode, "33500");
  assert.match(result.note, /Produit Canadian Tire/);
});

test("corrige à l’affichage les anciennes notes trompeuses déjà comptabilisées", () => {
  const displayed = classificationNoteForDisplay({
    note: "Catégorie rapprochée du référentiel; une validation manuelle reste requise.",
    accountCode: "33544",
    category: "Essence EXPENSE",
    accountingStatus: "POSTED",
  });
  assert.equal(displayed, "Compte 33544 attribué automatiquement par correspondance exacte avec la catégorie Essence EXPENSE.");
  assert.doesNotMatch(displayed, /validation manuelle/i);

  const pending = classificationNoteForDisplay({
    note: "Catégorie rapprochée du référentiel; une validation manuelle reste requise.",
    accountCode: "33544",
    category: "Essence EXPENSE",
    accountingStatus: "NOT_POSTED",
  });
  assert.match(pending, /validation manuelle/i);
});

test("préserve un coupon négatif dans le sous-total net et la comptabilisation", () => {
  assert.equal(invoiceLineItemsSubtotalCents(receiptLineItems), 39498);

  const extraction = validateInvoiceExtraction({
    vendor: "BUREAU EN GROS",
    invoiceNumber: null,
    invoiceDate: "2026-08-12",
    subtotalCents: 39498,
    tpsCents: 1975,
    tvqCents: 3940,
    totalCents: 45413,
    currency: "CAD",
    sku: null,
    category: "Divers",
    lineItems: receiptLineItems,
    confidence: 0.98,
    notes: "Le coupon est appliqué au sous-total.",
  });

  assert.equal(extraction.ok, true);
  assert.equal(extraction.value.lineItemsMatchSubtotal, true);

  const commit = validateInvoiceLineItemsForCommit(receiptLineItems, 39498);
  assert.equal(commit.ok, true);
  assert.equal(commit.linesSubtotalCents, 39498);
});

test("conserve une ligne négative dans la ventilation du rapport", () => {
  const allocations = transactionAccountAllocations({
    lineItems: receiptLineItems,
    subtotalCents: 39498,
    tpsCents: 1975,
    tvqCents: 3940,
    totalCents: 45413,
  });

  assert.equal(allocations.length, 3);
  assert.equal(allocations.find((line) => line.subtotalCents === -7500)?.subtotalCents, -7500);
  assert.equal(allocations.reduce((sum, line) => sum + line.subtotalCents, 0), 39498);
  assert.equal(allocations.reduce((sum, line) => sum + line.tpsCents, 0), 1975);
  assert.equal(allocations.reduce((sum, line) => sum + line.tvqCents, 0), 3940);
  assert.equal(allocations.reduce((sum, line) => sum + line.totalCents, 0), 45413);
});
