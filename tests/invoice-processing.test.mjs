import assert from "node:assert/strict";
import test from "node:test";
import {
  invoiceLineItemsSubtotalCents,
  reconcileInvoiceLineItemsToSubtotal,
  reconcileQuebecSalesTaxes,
  validateInvoiceExtraction,
  validateInvoiceLineItemsForCommit,
} from "../lib/invoice-processing.mjs";
import { transactionAccountAllocations } from "../lib/accounting-report.mjs";

const receiptLineItems = [
  { description: "SQUARE TERMINAL", quantity: 1, unitPriceCents: 39999, amountCents: 39999, accountCode: "33526" },
  { description: "Stop standard app 2a", quantity: 1, unitPriceCents: 6999, amountCents: 6999, accountCode: "33526" },
  { description: "Coupon BEG 87405", quantity: 1, unitPriceCents: -7500, amountCents: -7500, accountCode: "33526" },
];

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
    projectId: null,
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

test("normalise une ligne de carburant taxes incluses vers le sous-total comptable", () => {
  const grossLines = [
    { description: "DIESEL", quantity: 34.272, unitPriceCents: 270, amountCents: 9250, accountCode: "33544" },
  ];
  const reconciliation = reconcileInvoiceLineItemsToSubtotal(grossLines, 8045, 9250);
  assert.equal(reconciliation.reconciled, true);
  assert.equal(reconciliation.basis, "TOTAL_TAX_INCLUDED");
  assert.equal(reconciliation.lineItems[0].amountCents, 8045);
  assert.equal(reconciliation.lineItems[0].unitPriceCents, null);

  const extraction = validateInvoiceExtraction({
    vendor: "ULTRAMAR",
    invoiceNumber: "004036",
    invoiceDate: "2026-09-04",
    subtotalCents: 8043,
    tpsCents: 402,
    tvqCents: 805,
    totalCents: 9250,
    currency: "CAD",
    lineItems: grossLines,
  });
  assert.equal(extraction.ok, true);
  assert.deepEqual(reconcileQuebecSalesTaxes(8043, 402, 805, 9250), {
    subtotalCents: 8045,
    tpsCents: 402,
    tvqCents: 803,
    totalCents: 9250,
    reconciled: true,
  });
  assert.equal(extraction.value.subtotalCents, 8045);
  assert.equal(extraction.value.tpsCents, 402);
  assert.equal(extraction.value.tvqCents, 803);
  assert.equal(extraction.value.lineItemsMatchSubtotal, true);
  assert.equal(extraction.value.lineItems[0].amountCents, 8045);

  const commit = validateInvoiceLineItemsForCommit(grossLines, 8045, 9250);
  assert.equal(commit.ok, true);
  assert.equal(commit.linesSubtotalCents, 8045);

  const allocations = transactionAccountAllocations({
    lineItems: grossLines,
    subtotalCents: 8045,
    tpsCents: 402,
    tvqCents: 803,
    totalCents: 9250,
  });
  assert.deepEqual(allocations[0], {
    accountNumber: "33544",
    accountLabel: "Compte non référencé",
    subtotalCents: 8045,
    tpsCents: 402,
    tvqCents: 803,
    totalCents: 9250,
  });
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
