import assert from "node:assert/strict";
import test from "node:test";
import { applyCardholderRestaurantPolicy, classifyInvoice, classifyInvoiceLineItems, validateInvoiceLineItemsForCommit } from "../lib/invoice-processing.mjs";
import { decideInvoice, findPotentialDuplicates, resolveUploaderCards } from "../lib/invoice-decision-engine.mjs";

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

test("associe une carte active au profil réel de l’uploader", () => {
  const result = resolveUploaderCards({
    uploaderUid: "firebase-uploader-reel",
    uploaderUserId: "U-1",
    cards: [{ id: "CARD-1", lastFour: "0001", status: "ACTIVE", holderId: "U-1" }],
  });
  assert.equal(result.status, "RESOLVED");
  assert.equal(result.card?.id, "CARD-1");
});

test("ignore un doublon de carte identique pour résoudre automatiquement l’uploader", () => {
  const result = resolveUploaderCards({
    uploaderUserId: "U-1",
    cards: [
      { id: "CARD-1", lastFour: "1807", status: "ACTIVE", holderId: "U-1", holderStatus: "ACTIVE" },
      { id: "CARD-2", lastFour: "1807", status: "ACTIVE", holderId: "U-1", holderStatus: "ACTIVE" },
    ],
  });
  assert.equal(result.status, "RESOLVED");
  assert.equal(result.card?.id, "CARD-1");
  assert.equal(result.candidates.length, 1);
});

test("ne résout pas une carte rattachée à un titulaire inactif", () => {
  const result = resolveUploaderCards({
    uploaderUserId: "U-1",
    cards: [{ id: "CARD-1", lastFour: "1807", status: "ACTIVE", holderId: "U-1", holderStatus: "INACTIVE" }],
  });
  assert.equal(result.status, "UNKNOWN");
});

test("accepte temporairement une facture sans bloquer sur le projet", () => {
  const result = decision(
    { projectId: "P-INCONNU" },
    { context: { ...baseContext, requireProject: false } },
  );
  assert.equal(result.decision, "AUTO_APPROVED");
  assert.ok(!codes(result).includes("UNKNOWN_PROJECT"));
  assert.equal(result.resolutions.projectId, null);
});

test("accepte automatiquement une facture sans période de relevé", () => {
  const result = decision(
    {},
    { context: { ...baseContext, statementPeriodId: null, requireStatementPeriod: false } },
  );
  assert.equal(result.decision, "AUTO_APPROVED");
  assert.ok(!codes(result).includes("MISSING_REQUIRED_FIELD"));
  assert.equal(result.resolutions.statementPeriodId, null);
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

test("classifie les lignes et bloque un sous-total non concordant", () => {
  const lineItems = [{ description: "Bloc", quantity: 1, unitPriceCents: 10000, amountCents: 10000, sku: "SKU-1", category: "Matériaux" }];
  const classified = classifyInvoiceLineItems({ vendor: "Quincaillerie", lineItems, skuReferences, accounts });
  assert.equal(classified[0].accountCode, "90001");
  assert.equal(classified[0].classificationStatus, "RESOLVED");

  const extraction = { ...baseExtraction, lineItems: classified };
  const result = decideInvoice({
    extraction,
    classification: classifyInvoice(extraction, skuReferences, accounts),
    lineItemClassifications: classified,
    context: baseContext,
  });
  assert.equal(result.decision, "AUTO_APPROVED");

  const mismatch = decideInvoice({
    extraction: { ...extraction, lineItems: [{ ...classified[0], amountCents: 9000 }] },
    classification: classifyInvoice(extraction, skuReferences, accounts),
    lineItemClassifications: classified,
    context: baseContext,
  });
  assert.equal(mismatch.decision, "NEEDS_REVIEW");
  assert.ok(codes(mismatch).includes("LINE_ITEMS_TOTAL_MISMATCH"));
  assert.equal(validateInvoiceLineItemsForCommit(classified, 10000).ok, true);
  assert.equal(validateInvoiceLineItemsForCommit([{ ...classified[0], amountCents: 9000 }], 10000).ok, false);
});

test("approuve automatiquement une ventilation complète sur plusieurs comptes", () => {
  const lineItems = [
    { description: "Boisson", quantity: 1, amountCents: 399, accountCode: "33526", classificationStatus: "RESOLVED" },
    { description: "Diesel", quantity: 1, amountCents: 9601, accountCode: "33544", classificationStatus: "RESOLVED" },
  ];
  const extraction = { ...baseExtraction, lineItems };
  const result = decideInvoice({
    extraction,
    classification: { ...classifyInvoice(extraction, skuReferences, accounts), resolution: "PROPOSED" },
    lineItemClassifications: lineItems,
    context: baseContext,
  });

  assert.equal(result.decision, "AUTO_APPROVED");
  assert.equal(result.resolutions.accountCode, null);
  assert.ok(result.checks.some((check) => check.code === "LINE_ITEM_ACCOUNT_SPLIT" && check.passed));
  assert.ok(!codes(result).includes("LINE_ITEM_SPLIT_REVIEW"));
  assert.ok(!codes(result).includes("ACCOUNT_SUGGESTION_REVIEW"));
});

test("bloque une ventilation multicomptes lorsqu’une ligne n’est pas résolue", () => {
  const lineItems = [
    { description: "Boisson", quantity: 1, amountCents: 399, accountCode: "33526", classificationStatus: "RESOLVED" },
    { description: "Article inconnu", quantity: 1, amountCents: 9601, accountCode: null, classificationStatus: "UNRESOLVED" },
  ];
  const extraction = { ...baseExtraction, lineItems };
  const result = decideInvoice({ extraction, classification: classifyInvoice(extraction, skuReferences, accounts), lineItemClassifications: lineItems, context: baseContext });

  assert.equal(result.decision, "NEEDS_REVIEW");
  assert.ok(codes(result).includes("LINE_ITEM_CLASSIFICATION_REVIEW"));
});

const restaurantAccounts = [
  { number: "33526", label: "Divers", type: "EXPENSE", status: "ACTIVE" },
  { number: "34016", label: "Voyage et pension", type: "EXPENSE", status: "ACTIVE" },
];
const restaurantLines = [
  { description: "Repas", quantity: 1, amountCents: 2500, category: "Voyage et pension" },
  { description: "Boisson", quantity: 1, amountCents: 500, category: "Divers" },
];

test("classe toutes les lignes de restaurant de Keven Tremblay dans Divers", () => {
  const result = applyCardholderRestaurantPolicy({
    holderName: "Keven Tremblay",
    isRestaurant: true,
    invoiceCategory: "Voyage et pension",
    lineItems: restaurantLines,
    accounts: restaurantAccounts,
  });

  assert.equal(result.applied, true);
  assert.equal(result.accountCode, "33526");
  assert.ok(result.lineItems.every((item) => item.accountCode === "33526" && item.category === "Divers" && item.classificationStatus === "RESOLVED"));
});

test("la règle restaurant remplace un SKU inconnu sans forcer une validation humaine", () => {
  const lineItems = applyCardholderRestaurantPolicy({
    holderName: "Keven Tremblay",
    isRestaurant: true,
    invoiceCategory: "Voyage et pension",
    lineItems: restaurantLines,
    accounts: restaurantAccounts,
  }).lineItems;
  const extraction = {
    ...baseExtraction,
    sku: "SKU-RESTAURANT-INCONNU",
    category: "Voyage et pension",
    subtotalCents: 3000,
    tpsCents: 150,
    tvqCents: 299,
    totalCents: 3449,
    lineItems,
  };
  const result = decideInvoice({
    extraction,
    classification: {
      accountCode: "33526",
      category: "Divers",
      resolution: "RESOLVED",
      skuState: "POLICY_OVERRIDDEN",
      candidates: ["33526"],
    },
    lineItemClassifications: lineItems,
    context: baseContext,
  });

  assert.equal(result.decision, "AUTO_APPROVED");
  assert.ok(!codes(result).includes("UNKNOWN_SKU"));
});

test("classe toutes les lignes de restaurant des autres détenteurs dans Voyage et pension", () => {
  const result = applyCardholderRestaurantPolicy({
    holderName: "Michel Fortier",
    isRestaurant: true,
    invoiceCategory: "Voyage et pension",
    lineItems: restaurantLines,
    accounts: restaurantAccounts,
  });

  assert.equal(result.applied, true);
  assert.equal(result.accountCode, "34016");
  assert.ok(result.lineItems.every((item) => item.accountCode === "34016" && item.category === "Voyage et pension"));
});

test("n’applique pas la règle restaurant si le compte cible est inactif", () => {
  const result = applyCardholderRestaurantPolicy({
    holderName: "Michel Fortier",
    isRestaurant: true,
    invoiceCategory: "Voyage et pension",
    lineItems: restaurantLines,
    accounts: restaurantAccounts.map((account) => account.number === "34016" ? { ...account, status: "INACTIVE" } : account),
  });

  assert.equal(result.applied, false);
  assert.deepEqual(result.lineItems.map((item) => item.accountCode), [null, null]);
});

test("ne confond pas une autre dépense Voyage et pension avec un restaurant", () => {
  const result = applyCardholderRestaurantPolicy({
    holderName: "Keven Tremblay",
    isRestaurant: false,
    invoiceCategory: "Voyage et pension",
    lineItems: restaurantLines,
    accounts: restaurantAccounts,
  });

  assert.equal(result.applied, false);
});
