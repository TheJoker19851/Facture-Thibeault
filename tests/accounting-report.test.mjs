import test from "node:test";
import assert from "node:assert/strict";
import { buildAccountingCategorySummary, buildTaxSummaryByHolder } from "../lib/accounting-report.mjs";

const accounts = [
  { number: "33544", label: "Essence", type: "EXPENSE" },
  { number: "33557", label: "Réparation équipement", type: "EXPENSE" },
  { number: "TPS", label: "TPS", type: "TAX" },
];

const transactions = [
  { accountNumber: "33544", category: "Essence", person: "Alice", card: "9001", subtotal: 160.24, tps: 8.01, tvq: 15.98, total: 184.23 },
  { accountNumber: "33557", category: "Réparation équipement", person: "Alice", card: "9001", subtotal: 150, tps: 7.5, tvq: 14.96, total: 172.46 },
  { accountNumber: "33557", category: "Réparation équipement", person: "Benoît", card: "9002", subtotal: 50, tps: 2.5, tvq: 4.99, total: 57.49 },
];

test("le résumé par compte conserve les cents et calcule le pourcentage catégorisé", () => {
  const summary = buildAccountingCategorySummary({ transactions, accounts });
  assert.deepEqual(summary.rows.map((row) => [row.accountNumber, row.subtotalCents, row.percent]), [
    ["33544", 16024, 44.5],
    ["33557", 20000, 55.5],
  ]);
  assert.equal(summary.totals.subtotalCents, 36024);
  assert.equal(summary.totalBeforeTaxCents, 36024);
});

test("le sommaire des taxes regroupe chaque titulaire et le total de période", () => {
  const summary = buildTaxSummaryByHolder({ transactions });
  assert.deepEqual(summary.rows.map((row) => [row.holder, row.tpsCents, row.tvqCents, row.taxesCents]), [
    ["Alice", 1551, 3094, 4645],
    ["Benoît", 250, 499, 749],
  ]);
  assert.equal(summary.totals.taxesCents, 5394);
  assert.equal(summary.totals.totalCents, 41418);
});
