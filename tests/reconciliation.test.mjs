import test from "node:test";
import assert from "node:assert/strict";
import {
  RECONCILIATION_STATUSES,
  buildStatementImportBatch,
  confirmManualMatch,
  finalizeStatementImport,
  normalizeMerchant,
  matchStatementPdfCard,
  parseStatementImport,
  reconcileStatement,
  setLineReconciliationStatus,
  sha256Hex,
  splitStatementPdfExtractionByCard,
  statementSourceFromPdfExtraction,
  validateStatementPdfExtraction,
} from "../lib/reconciliation.mjs";
import { buildLargeReconciliationFixture } from "../lib/reconciliation-integration-fixtures.mjs";

function statement(overrides = {}) {
  return {
    id: "STATEMENT-1",
    cardId: "CARD-1",
    periodStart: "2026-08-10",
    periodEnd: "2026-09-09",
    originalFilename: "statement.json",
    statementHash: "hash-1",
    lines: [{ id: "LINE-1", sequence: 1, transactionDate: "2026-08-11", merchantRaw: "CDN TIRE STORE 174", amountCents: 9198 }],
    ...overrides,
  };
}

test("parse un JSON de relevé sans trier l’ordre des lignes", () => {
  const result = parseStatementImport(JSON.stringify({
    cardId: "CARD-1", periodStart: "2026-08-10", periodEnd: "2026-09-09",
    lines: [
      { transactionDate: "2026-08-12", merchantRaw: "Deuxième", amountCents: 2000 },
      { transactionDate: "2026-08-10", merchantRaw: "Première", amountCents: 1000 },
    ],
  }), { originalFilename: "statement.json" });
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.statement.lines.map((line) => [line.sequence, line.merchantRaw]), [[1, "Deuxième"], [2, "Première"]]);
});

test("parse le CSV structuré et refuse les lignes invalides", () => {
  const csv = "transactionDate,postedDate,merchantRaw,amountCents,externalReference\n2026-08-11,2026-08-12,Station Démo,91.98,REF-1\n2026-08-12,,Marchand,not-money,REF-2";
  const result = parseStatementImport(csv, { originalFilename: "statement.csv", cardId: "CARD-1", periodStart: "2026-08-10", periodEnd: "2026-09-09" });
  assert.equal(result.statement, null);
  assert.match(result.errors.join(" "), /montant valide/i);
});

test("valide l’extraction PDF, identifie la carte et produit un import comptable standard", () => {
  const validated = validateStatementPdfExtraction({
    cardLastFour: "•••• 4242",
    holderName: "Kim Thibeault",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-31",
    confidence: 0.96,
    notes: "",
    lines: [
      { sequence: 1, transactionDate: "2026-08-11", postedDate: "2026-08-12", merchantRaw: "Marchand A", amountCents: 12345, externalReference: "REF-1" },
      { sequence: 2, transactionDate: "2026-08-13", postedDate: null, merchantRaw: "Remboursement", amountCents: -500, externalReference: null },
    ],
  });
  assert.deepEqual(validated.errors, []);
  assert.equal(validated.extraction.cardLastFour, "4242");
  const matched = matchStatementPdfCard(validated.extraction, [
    { id: "CARD-1", lastFour: "4242", status: "Actif", holder: { displayName: "Kim Thibeault" } },
    { id: "CARD-2", lastFour: "9999", status: "Actif", holder: { displayName: "Alex" } },
  ]);
  assert.equal(matched.cardId, "CARD-1");
  const source = statementSourceFromPdfExtraction(validated.extraction, { cardId: matched.cardId });
  const parsed = parseStatementImport(source, { originalFilename: "releve.pdf" });
  assert.deepEqual(parsed.errors, []);
  assert.equal(parsed.statement.cardId, "CARD-1");
  assert.deepEqual(parsed.statement.lines.map((line) => [line.sequence, line.amountCents]), [[1, 12345], [2, -500]]);
});

test("refuse une extraction PDF ambiguë ou qui brise l’ordre des lignes", () => {
  const invalid = validateStatementPdfExtraction({
    cardLastFour: "4242",
    holderName: null,
    periodStart: "2026-08-31",
    periodEnd: "2026-08-01",
    confidence: 0.5,
    notes: "illisible",
    lines: [{ sequence: 2, transactionDate: "2026-08-11", merchantRaw: "Marchand", amountCents: 100 }],
  });
  assert.equal(invalid.extraction, null);
  assert.match(invalid.errors.join(" "), /période.*inversée/i);
  assert.match(invalid.errors.join(" "), /sequence doit être 1/i);
  const ambiguous = matchStatementPdfCard({ cardLastFour: "4242", holderName: null }, [
    { id: "CARD-1", lastFour: "4242", status: "Actif" },
    { id: "CARD-2", lastFour: "4242", status: "Actif" },
  ]);
  assert.equal(ambiguous.cardId, null);
  assert.match(ambiguous.error, /Plusieurs cartes actives/i);
});

test("scinde un relevé maître par carte à partir de chaque transaction", () => {
  const validated = validateStatementPdfExtraction({
    cardLastFour: "9290",
    holderName: "Compte maître",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-31",
    confidence: 0.98,
    notes: "",
    lines: [
      { sequence: 1, cardLastFour: "9291", holderName: "Kim", transactionDate: "2026-08-11", postedDate: null, merchantRaw: "Marchand A", amountCents: 1000, externalReference: null },
      { sequence: 2, cardLastFour: "9294", holderName: "Alex", transactionDate: "2026-08-12", postedDate: null, merchantRaw: "Marchand B", amountCents: 2000, externalReference: null },
      { sequence: 3, cardLastFour: "9291", holderName: "Kim", transactionDate: "2026-08-13", postedDate: null, merchantRaw: "Marchand C", amountCents: 3000, externalReference: null },
    ],
  });
  assert.deepEqual(validated.errors, []);
  const split = splitStatementPdfExtractionByCard(validated.extraction, [
    { id: "CARD-1", lastFour: "9291", status: "Actif", holder: { displayName: "Kim" } },
    { id: "CARD-2", lastFour: "9294", status: "Actif", holder: { displayName: "Alex" } },
  ]);
  assert.deepEqual(split.errors, []);
  assert.deepEqual(split.statements.map((item) => [item.cardId, item.extraction.lines.map((line) => [line.sequence, line.merchantRaw])]), [
    ["CARD-1", [[1, "Marchand A"], [2, "Marchand C"]]],
    ["CARD-2", [[1, "Marchand B"]]],
  ]);
});

test("ne transforme pas un numéro de compte complet en suffixe de carte", () => {
  const validated = validateStatementPdfExtraction({
    cardLastFour: "5258 819200 339290",
    holderName: "Keven Tremblay",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-31",
    confidence: 0.98,
    notes: "",
    lines: [
      { sequence: 1, cardLastFour: null, holderName: "Keven Tremblay", transactionDate: "2026-08-11", postedDate: null, merchantRaw: "BUREAU EN GROS", amountCents: 45413, externalReference: "U726021898" },
    ],
  });
  assert.deepEqual(validated.errors, []);
  assert.equal(validated.extraction.cardLastFour, "");
  assert.equal(validated.extraction.lines[0].cardLastFour, "");
});

test("utilise le titulaire actif unique quand le compte maître 9290 est pris pour une carte", () => {
  const match = matchStatementPdfCard({ cardLastFour: "9290", holderName: "Keven Tremblay" }, [
    { id: "CARD-KEVEN", lastFour: "2481", status: "Actif", holder: { displayName: "Keven Tremblay" } },
    { id: "CARD-KIM", lastFour: "7310", status: "Actif", holder: { displayName: "Kim Thibeault" } },
  ]);
  assert.equal(match.cardId, "CARD-KEVEN");
  assert.equal(match.card.lastFour, "2481");
});

test("refuse le faux suffixe 9290 lorsque le titulaire ne permet pas une association sûre", () => {
  const match = matchStatementPdfCard({ cardLastFour: "9290", holderName: null }, [
    { id: "CARD-KEVEN", lastFour: "2481", status: "Actif", holder: { displayName: "Keven Tremblay" } },
  ]);
  assert.equal(match.cardId, null);
  assert.match(match.error, /9290.*n’est pas active/i);
});

test("normalise seulement les alias marchands explicitement configurés", () => {
  assert.equal(normalizeMerchant("CDN TIRE STORE 174"), "Canadian Tire");
  assert.equal(normalizeMerchant("Marchand jamais configuré"), "Marchand jamais configuré");
});

test("hash, identifiant déterministe et batch de dix relevés sont idempotents", async () => {
  const hash = await sha256Hex("fixture-1");
  const finalized = await finalizeStatementImport(statement({ id: null, statementHash: null }), "fixture-1");
  assert.equal(finalized.statementHash, hash);
  assert.match(finalized.id, /^STATEMENT-CARD-1-2026-08-10-2026-09-09-/);
  const incoming = Array.from({ length: 10 }, (_, index) => ({ ...statement({ id: undefined, statementHash: `hash-${index}` }), originalFilename: `statement-${index}.json` }));
  const batch = buildStatementImportBatch([statement()], incoming);
  assert.equal(batch.additions.length, 9);
  assert.equal(batch.duplicates.length, 1);
  assert.equal(batch.errors.length, 0);
});

test("match parfait, date décalée et marchand normalisé sont explicables", () => {
  const result = reconcileStatement(statement(), [
    { id: "TX-1", cardId: "CARD-1", date: "2026-08-11", vendor: "Canadian Tire Chicoutimi", totalCents: 9198 },
  ]);
  assert.equal(result.lineResults[0].status, RECONCILIATION_STATUSES.MATCHED);
  assert.equal(result.lineResults[0].match.matchScore, 100);
  assert.match(result.lineResults[0].reason, /Montant exact.*Marchand normalisé/i);
});

test("deux candidats au même score restent à vérifier", () => {
  const result = reconcileStatement(statement(), [
    { id: "TX-1", cardId: "CARD-1", date: "2026-08-11", vendor: "Canadian Tire Chicoutimi", totalCents: 9198 },
    { id: "TX-2", cardId: "CARD-1", date: "2026-08-11", vendor: "Canadian Tire Chicoutimi", totalCents: 9198 },
  ]);
  assert.equal(result.lineResults[0].status, RECONCILIATION_STATUSES.REVIEW);
  assert.equal(result.lineResults[0].match, null);
});

test("facture manquante, hors relevé et double jumelage sont distingués", () => {
  const result = reconcileStatement(statement({ lines: [
    { id: "LINE-1", sequence: 1, transactionDate: "2026-08-11", merchantRaw: "Canadian Tire 174", amountCents: 9198 },
    { id: "LINE-2", sequence: 2, transactionDate: "2026-08-12", merchantRaw: "Canadian Tire 174", amountCents: 9198 },
    { id: "LINE-3", sequence: 3, transactionDate: "2026-08-13", merchantRaw: "Aucun reçu", amountCents: 12345 },
  ]}), [
    { id: "TX-1", cardId: "CARD-1", date: "2026-08-11", vendor: "Canadian Tire Chicoutimi", totalCents: 9198 },
    { id: "TX-OUT", cardId: "CARD-1", date: "2026-08-14", vendor: "Transaction hors relevé", totalCents: 5000 },
  ]);
  assert.equal(result.lineResults[0].status, RECONCILIATION_STATUSES.MATCHED);
  assert.equal(result.lineResults[1].status, RECONCILIATION_STATUSES.DUPLICATE);
  assert.equal(result.lineResults[2].status, RECONCILIATION_STATUSES.MISSING_INVOICE);
  assert.equal(result.outsideTransactions[0].transaction.id, "TX-OUT");
});

test("les actions manuelles sont contrôlées et auditées", () => {
  const initial = reconcileStatement(statement(), [{ id: "TX-1", cardId: "CARD-1", date: "2026-08-11", vendor: "Canadian Tire Chicoutimi", totalCents: 9198 }]);
  const manual = confirmManualMatch(initial, "LINE-1", "TX-1", { uid: "KIM-1", confirmedAt: "2026-08-20T12:00:00.000Z" });
  assert.equal(manual.lineResults[0].match.matchMethod, "MANUAL");
  assert.equal(manual.audit.action, "RECONCILIATION_MANUAL_MATCH");
  const ignored = setLineReconciliationStatus(manual, "LINE-1", RECONCILIATION_STATUSES.IGNORED, { uid: "KIM-1" });
  assert.equal(ignored.lineResults[0].status, RECONCILIATION_STATUSES.IGNORED);
  assert.equal(ignored.audit.entityId, "LINE-1");
});

test("la fixture de volume conserve 125 séquences et distingue les exceptions", () => {
  const fixture = buildLargeReconciliationFixture();
  const result = reconcileStatement(fixture.statement, fixture.transactions);
  const counts = Object.fromEntries(Object.values(RECONCILIATION_STATUSES).map((status) => [status, 0]));
  for (const lineResult of result.lineResults) counts[lineResult.status] += 1;
  assert.equal(result.lineResults.length, fixture.expected.lines);
  assert.deepEqual(result.lineResults.map((lineResult) => lineResult.line.sequence), Array.from({ length: 125 }, (_, index) => index + 1));
  assert.equal(counts[RECONCILIATION_STATUSES.MATCHED], fixture.expected.matched);
  assert.equal(counts[RECONCILIATION_STATUSES.REVIEW], fixture.expected.review);
  assert.equal(counts[RECONCILIATION_STATUSES.MISSING_INVOICE], fixture.expected.missingInvoice);
  assert.equal(result.outsideTransactions.length, fixture.expected.outside);
});
