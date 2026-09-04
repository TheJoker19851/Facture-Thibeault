import test from "node:test";
import assert from "node:assert/strict";
import { accountingReportFileName, buildAccountingReportExcelXml, buildAccountingReportXlsx } from "../lib/report-export.mjs";
import { buildAccountingTemplateReport } from "../lib/accounting-template-report.mjs";

test("l’export comptable reprend le template par carte et trie les transactions par date", () => {
  const xml = buildAccountingReportExcelXml({
    period: { label: "Démo", start: "2026-08-10", end: "2026-09-09" },
    accounts: [{ number: "33557", label: "Réparation Équipement" }],
    cards: [{ holder: "Alice Démo", lastFour: "9001" }],
    transactions: [
      { id: "TX-2", date: "2026-08-11", vendor: "Station Démo", subtotal: 80, tps: 12, tvq: 0, total: 91.98, accountNumber: "33557", category: "Réparation équipement", person: "Alice Démo", card: "9001", projectNumber: "21", imageCount: 1, reconciliationStatus: "MATCHED", invoiceNumber: "DEMO-FACT-002" },
      { id: "TX-1", date: "2026-08-10", vendor: "Quincaillerie Démo", subtotal: 100, tps: 0, tvq: 14.98, total: 114.98, accountNumber: "33557", category: "Réparation équipement", person: "Alice Démo", card: "9001", projectNumber: "125", imageCount: 0, reconciliationStatus: "OUTSIDE_STATEMENT", invoiceNumber: "DEMO-FACT-001" },
    ],
  });
  assert.ok(xml.indexOf("Quincaillerie Démo") < xml.indexOf("Station Démo"));
  assert.match(xml, /91\.98/);
  assert.match(xml, /114\.98/);
  assert.match(xml, /GRAND TOTAL/);
  assert.match(xml, /33557/);
  assert.match(xml, />O<\/Data>/);
  assert.match(xml, />N<\/Data>/);
  assert.match(xml, /<Data ss:Type="Number">21340<\/Data>/);
  assert.match(xml, /<Data ss:Type="Number">21370<\/Data>/);
  assert.match(xml, /<Data ss:Type="String">TPS<\/Data>/);
  assert.match(xml, /<Data ss:Type="String">TVQ<\/Data>/);
  assert.match(xml, /<Row ss:Height="36" ss:AutoFitHeight="0">/);
  assert.match(xml, /ss:Hidden="1"/);
  assert.match(xml, /ss:Format="m\/d\/yy"/);
  assert.match(xml, /&quot;\$&quot;/);
  assert.match(xml, /Montant à payer/);
  assert.equal((xml.match(/ss:StyleID="ManualInput"/g) ?? []).length, 5);
  assert.doesNotMatch(xml, /AJUSTEMENTS MANUELS|Description à saisir|Montant à payer après ajustements/);
  assert.doesNotMatch(xml, /Crédit recompenses/);
  assert.match(xml, /SUM\(R\[/);
  assert.doesNotMatch(xml, /#REF!/);
  assert.equal(accountingReportFileName({ start: "2026-08-10", end: "2026-09-09" }), "Rapport-comptable-2026-08-10-2026-09-09.xlsx");
});

test("le modèle conserve les cartes sans transaction et laisse le projet vide", () => {
  const report = buildAccountingTemplateReport({
    period: { label: "Démo", start: "2026-08-10", end: "2026-09-09" },
    cards: [{ holder: "Alice", lastFour: "0001" }, { holder: "Bob", lastFour: "0002" }],
    transactions: [{ id: "TX-1", date: "2026-08-10", vendor: "Fournisseur", person: "Alice", card: "0001", subtotal: 10, tps: 0.5, tvq: 1, total: 11.5, accountNumber: "33544", accountLabel: "Essence", imageCount: 0 }],
  });
  assert.deepEqual(report.sections.map((section) => [section.person, section.rows.length]), [["Alice", 1], ["Bob", 0]]);
  assert.equal(report.sections[0].rows[0].attachment, "N");
  assert.equal(report.sections[0].rows[0].project, "");
  assert.equal(report.sections[0].rows[0].accountCents["33544"], 1000);
  assert.equal(report.manualAdjustmentRows.length, 5);
  assert.equal(report.cardTotals[0].accountCents["33544"], 1000);
});

test("les lignes manuelles sont reprises dans le total de période et dans Excel", () => {
  const input = {
    period: { label: "Démo", start: "2026-08-10", end: "2026-09-09" },
    cards: [{ holder: "Alice", lastFour: "0001" }],
    transactions: [{ id: "TX-1", date: "2026-08-10", vendor: "Fournisseur", person: "Alice", card: "0001", subtotal: 100, total: 100 }],
    manualAdjustmentRows: [{ description: "Paiement carte", amountCents: -600000 }, { description: "Crédit récompenses", amountCents: -1250 }],
  };
  const report = buildAccountingTemplateReport(input);
  assert.deepEqual(report.manualAdjustmentRows.slice(0, 2), [
    { index: 1, description: "Paiement carte", amountCents: -600000 },
    { index: 2, description: "Crédit récompenses", amountCents: -1250 },
  ]);
  assert.equal(report.manualAdjustmentsTotalCents, -601250);
  assert.equal(report.payableAfterAdjustmentsCents, -591250);
  const xml = buildAccountingReportExcelXml(input);
  assert.match(xml, /Paiement carte/);
  assert.match(xml, /Crédit récompenses/);
  assert.match(xml, />-6000<\/Data>/);
  assert.match(xml, />-12\.5<\/Data>/);
});

test("sépare les totaux de deux cartes appartenant au même titulaire", () => {
  const report = buildAccountingTemplateReport({
    period: { label: "Démo", start: "2026-08-10", end: "2026-09-09" },
    cards: [{ id: "CARD-1", holder: "Alice", lastFour: "0001" }, { id: "CARD-2", holder: "Alice", lastFour: "0002" }],
    transactions: [
      { id: "TX-1", date: "2026-08-10", vendor: "Essence", person: "Alice", card: "0001", subtotal: 10, total: 10, accountNumber: "33544" },
      { id: "TX-2", date: "2026-08-11", vendor: "Bureau", person: "Alice", card: "0002", subtotal: 20, total: 20, accountNumber: "42112" },
    ],
  });
  assert.deepEqual(report.sections.map((section) => section.cardLastFour), ["0001", "0002"]);
  assert.equal(report.sections[0].totals.accountCents["33544"], 1000);
  assert.equal(report.sections[1].totals.accountCents["42112"], 2000);
});

test("l’export final est un conteneur OOXML .xlsx typé et conserve les 37 colonnes", () => {
  const bytes = buildAccountingReportXlsx({
    period: { label: "Démo Électricité", start: "2026-08-10", end: "2026-09-09" },
    accounts: [{ number: "33557", label: "Réparation équipement" }],
    cards: [{ holder: "Alice", lastFour: "0001" }],
    transactions: [{ id: "TX-1", date: "2026-08-10", vendor: "Fournisseur É", person: "Alice", card: "0001", subtotal: 100, tps: 5, tvq: 9.98, total: 114.98, accountNumber: "33557", imageCount: 1 }],
  });
  assert.ok(bytes instanceof Uint8Array);
  assert.deepEqual(Array.from(bytes.slice(0, 4)), [0x50, 0x4b, 0x03, 0x04]);
  const packageText = new TextDecoder().decode(bytes);
  assert.match(packageText, /xl\/worksheets\/sheet1\.xml/);
  assert.match(packageText, /application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet\.main\+xml/);
  assert.match(packageText, /A1:AK/);
  assert.match(packageText, /21340/);
  assert.match(packageText, /21370/);
  assert.match(packageText, /autoFilter ref="A3:AK3"/);
  assert.match(packageText, /<row r="4" ht="36" customHeight="1">/);
  assert.match(packageText, /hidden="1"/);
  assert.match(packageText, /Fournisseur É/);
});
