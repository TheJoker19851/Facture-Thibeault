import test from "node:test";
import assert from "node:assert/strict";
import { accountingReportFileName, buildAccountingReportExcelXml } from "../lib/report-export.mjs";

test("l’export comptable conserve les cents et les regroupements", () => {
  const xml = buildAccountingReportExcelXml({
    period: { label: "Démo", start: "2026-08-10", end: "2026-09-09" },
    accounts: [{ number: "33557", label: "Réparation Équipement" }],
    transactions: [
      { date: "2026-08-11", vendor: "Station Démo", subtotal: 80, tps: 12, tvq: 0, total: 91.98, accountNumber: "33557", person: "Alice Démo", card: "9001", projectNumber: "21", reconciliationStatus: "MATCHED", invoiceNumber: "DEMO-FACT-002" },
      { date: "2026-08-10", vendor: "Quincaillerie Démo", subtotal: 100, tps: 0, tvq: 14.98, total: 114.98, accountNumber: "33557", person: "Alice Démo", card: "9001", projectNumber: "125", reconciliationStatus: "OUTSIDE_STATEMENT", invoiceNumber: "DEMO-FACT-001" },
    ],
  });
  assert.ok(xml.indexOf("Station Démo") < xml.indexOf("Quincaillerie Démo"));
  assert.match(xml, /91\.98/);
  assert.match(xml, /114\.98/);
  assert.match(xml, /TABLEAU_COMPTABLE/);
  assert.match(xml, /PAR_COMPTE/);
  assert.match(xml, /Taxes cumulées/);
  assert.equal(accountingReportFileName({ start: "2026-08-10", end: "2026-09-09" }), "Rapport-comptable-2026-08-10-2026-09-09.xls");
});
