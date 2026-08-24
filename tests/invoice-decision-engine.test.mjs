import assert from "node:assert/strict";
import test from "node:test";
import { classifyInvoice } from "../lib/invoice-processing.mjs";
import { decideInvoice, findPotentialDuplicates } from "../lib/invoice-decision-engine.mjs";

const accounts = [{ code: "90001", label: "Matériaux" }];
const skuReferences = [{ merchant: "Quincaillerie", sku: "SKU-1", category: "Matériaux", accountCode: "90001", status: "VALIDATED" }];
const baseExtraction = {
  vendor: "Quincaillerie",
  invoiceNumber: "F-1",
  invoiceDate: "2026-08-17",
  subtotalCents: 10000,
  tpsCents: 500,
  tvqCents: 998,
  totalCents: 11498,
  currency: "CAD",
  sku: "SKU-1",
  category: "Matériaux",
  projectId: "P-1",
  confidence: 0.99,
};
const baseContext = {
  uploaderUid: "firebase-worker",
  uploaderUserId: "U-1",
  cards: [{ id: "CARD-1", lastFour: "0001", status: "ACTIVE", holderId: "U-1" }],
  projects: [{ id: "P-1", name: "Chantier", status: "ACTIVE" }],
  statementPeriodId: "PERIOD-1",
  requireStatementPeriod: true,
};

function decision(overrides = {}, options = {}) {
  const extraction = { ...baseExtraction, ...overrides };
  const classification = classifyInvoice(extraction, skuReferences, accounts);
  return decideInvoice({ extraction, classification, context: baseContext, confidenceThreshold: 0.95, ...options });
}

function codes(result) {
  return result.exceptions.map((exception) => exception.code);
}

test("approuve automatiquement une facture entièrement résolue", () => {
  const result = decision();
  assert.equal(result.decision, "AUTO_APPROVED");
  assert.deepEqual(result.exceptions, []);
  assert.deepEqual(result.resolutions, { accountCode: "90001", cardId: "CARD-1", projectId: "P-1", statementPeriodId: "PERIOD-1" });
});

test("bloque un SKU inconnu et conserve les exceptions structurées", () => {
  const result = decision({ sku: "SKU-INCONNU" });
  assert.equal(result.decision, "NEEDS_REVIEW");
  assert.ok(codes(result).includes("UNKNOWN_SKU"));
  assert.ok(result.checks.some((check) => check.code === "SKU_RESOLUTION" && !check.passed));
});

test("bloque une classification comptable ambiguë", () => {
  const extraction = { ...baseExtraction, sku: null };
  const classification = classifyInvoice(extraction, skuReferences, [...accounts, { code: "90002", label: "Matériaux" }]);
  const result = decideInvoice({ extraction, classification, context: baseContext });
  assert.equal(result.decision, "NEEDS_REVIEW");
  assert.ok(codes(result).includes("AMBIGUOUS_ACCOUNT"));
});

test("propose Divers quand la catégorie IA est absente, sans comptabiliser automatiquement", () => {
  const extraction = { ...baseExtraction, sku: null, category: null };
  const classification = classifyInvoice(extraction, [], [
    ...accounts,
    { code: "33526", label: "Divers", type: "EXPENSE", status: "ACTIVE" },
  ]);
  assert.equal(classification.accountCode, "33526");
  assert.equal(classification.source, "DEFAULT_CATEGORY");
  assert.equal(classification.resolution, "PROPOSED");

  const result = decideInvoice({ extraction, classification, context: baseContext });
  assert.equal(result.decision, "NEEDS_REVIEW");
  assert.ok(codes(result).includes("ACCOUNT_SUGGESTION_REVIEW"));
  assert.equal(result.resolutions.accountCode, null);
});

test("conserve plusieurs exceptions sur la même facture", () => {
  const extraction = { ...baseExtraction, sku: "SKU-INCONNU", confidence: 0.8 };
  const classification = classifyInvoice(extraction, skuReferences, [...accounts, { code: "90002", label: "Matériaux" }]);
  const result = decideInvoice({ extraction, classification, context: baseContext });
  assert.equal(result.decision, "NEEDS_REVIEW");
  assert.deepEqual(new Set(codes(result)), new Set(["UNKNOWN_SKU", "AMBIGUOUS_ACCOUNT", "LOW_CONFIDENCE"]));
});

test("distingue incohérence de total et incohérence de taxes", () => {
  const totalResult = decision({ tpsCents: 0, tvqCents: 0, totalCents: 11000 });
  assert.ok(codes(totalResult).includes("TOTAL_MISMATCH"));
  assert.ok(!codes(totalResult).includes("TAX_MISMATCH"));

  const taxResult = decision({ totalCents: 11500 });
  assert.ok(codes(taxResult).includes("TOTAL_MISMATCH"));
  assert.ok(codes(taxResult).includes("TAX_MISMATCH"));
});

test("bloque carte ambiguë, projet inconnu et confiance insuffisante", () => {
  const result = decision(
    { projectId: "P-INCONNU", confidence: 0.8 },
    { context: { ...baseContext, cards: [...baseContext.cards, { id: "CARD-2", lastFour: "0002", status: "ACTIVE", holderId: "U-1" }] } },
  );
  assert.equal(result.decision, "NEEDS_REVIEW");
  assert.ok(codes(result).includes("AMBIGUOUS_CARD"));
  assert.ok(codes(result).includes("UNKNOWN_PROJECT"));
  assert.ok(codes(result).includes("LOW_CONFIDENCE"));
});

test("signale un doublon potentiel sans confondre fournisseur et montant seuls", () => {
  const duplicate = [{ id: "TX-1", transactionDate: "2026-08-17", vendor: "Quincaillerie", invoiceNumber: "F-1", totalCents: "11498", card: { id: "CARD-1" } }];
  assert.equal(findPotentialDuplicates(baseExtraction, duplicate, "CARD-1").length, 1);
  assert.equal(findPotentialDuplicates(baseExtraction, [{ ...duplicate[0], transactionDate: "2026-08-16", invoiceNumber: "F-AUTRE" }], "CARD-1").length, 0);
  const result = decision({}, { duplicateCandidates: duplicate });
  assert.equal(result.decision, "NEEDS_REVIEW");
  assert.ok(codes(result).includes("POSSIBLE_DUPLICATE"));
});

test("rejette une date calendrier impossible", () => {
  const result = decision({ invoiceDate: "2026-02-30" });
  assert.equal(result.decision, "NEEDS_REVIEW");
  assert.ok(codes(result).includes("INVALID_DATE"));
});
