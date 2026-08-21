import test from "node:test";
import assert from "node:assert/strict";
import { buildReconciliationExcelXml, reconciliationExportFileName } from "../lib/reconciliation-export.mjs";

test("l’export Excel conserve l’ordre sequence et les totaux au cent", () => {
  const xml = buildReconciliationExcelXml({
    statement: { id: "S-1", cardId: "CARD-1", periodStart: "2026-08-10", periodEnd: "2026-09-09", originalFilename: "releve.json" },
    lineResults: [
      { line: { sequence: 1, transactionDate: "2026-08-12", merchantRaw: "Deuxième", amountCents: 22995 }, status: "MISSING_INVOICE", match: null, reason: "Manquante" },
      { line: { sequence: 2, transactionDate: "2026-08-10", merchantRaw: "Première", amountCents: 9198 }, status: "MATCHED", match: { expenseTransactionId: "TX-1" }, reason: "Exact" },
    ],
    outsideTransactions: [{ transaction: { id: "TX-OUT", date: "2026-08-15", vendor: "Hors", totalCents: 100 }, reason: "Hors relevé" }],
    transactions: [{ id: "TX-1", invoiceNumber: "FACT-1", projectName: "Projet A", accountNumber: "33557", person: "Kim", card: "9001" }],
  });
  assert.ok(xml.indexOf("Deuxième") < xml.indexOf("Première"));
  assert.match(xml, /229\.95/);
  assert.match(xml, /FACTURES_MANQUANTES/);
  assert.match(xml, /HORS_RELEVE/);
  assert.equal(reconciliationExportFileName({ cardId: "CARD/1", periodStart: "2026-08-10", periodEnd: "2026-09-09" }), "Rapprochement-CARD-1-2026-08-10-2026-09-09.xls");
});
