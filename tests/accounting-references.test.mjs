import test from "node:test";
import assert from "node:assert/strict";
import {
  ACCOUNT_TYPES,
  PRODUCTION_ACCOUNT_DEFINITIONS,
  aggregateTransactionAmounts,
  canEditReference,
  canHardDeleteReference,
  hasDuplicateReferenceNumber,
  isSelectableExpenseAccount,
  isValidReferenceNumber,
} from "../lib/accounting-references.mjs";

test("la liste Production contient 27 comptes et un seul 33557 exact", () => {
  assert.equal(PRODUCTION_ACCOUNT_DEFINITIONS.length, 27);
  assert.equal(PRODUCTION_ACCOUNT_DEFINITIONS.filter((account) => account.number === "33557").length, 1);
  assert.deepEqual(PRODUCTION_ACCOUNT_DEFINITIONS.find((account) => account.number === "33557"), {
    number: "33557",
    label: "Réparation Équipement",
    type: ACCOUNT_TYPES.EXPENSE,
  });
  assert.equal(PRODUCTION_ACCOUNT_DEFINITIONS.filter((account) => account.type === ACCOUNT_TYPES.TAX).length, 2);
});

test("les numéros de compte et projet sont numériques et uniques", () => {
  assert.equal(isValidReferenceNumber("33557"), true);
  assert.equal(isValidReferenceNumber("33557A"), false);
  const references = [{ id: "ACCOUNT-1", number: "33557" }];
  assert.equal(hasDuplicateReferenceNumber(references, "33557"), true);
  assert.equal(hasDuplicateReferenceNumber(references, "33557", "ACCOUNT-1"), false);
  assert.equal(hasDuplicateReferenceNumber(references, "33556"), false);
});

test("un compte EXPENSE actif est sélectionnable, une taxe ou un compte inactif ne l'est pas", () => {
  assert.equal(isSelectableExpenseAccount({ type: "EXPENSE", status: "ACTIVE" }), true);
  assert.equal(isSelectableExpenseAccount({ type: "TAX", status: "ACTIVE" }), false);
  assert.equal(isSelectableExpenseAccount({ type: "EXPENSE", status: "INACTIVE" }), false);
});

test("la suppression physique est permise uniquement sans historique ni référence SKU", () => {
  assert.equal(canHardDeleteReference({ transactionCount: 0, skuReferenceCount: 0 }), true);
  assert.equal(canHardDeleteReference({ transactionCount: 1, skuReferenceCount: 0 }), false);
  assert.equal(canHardDeleteReference({ transactionCount: 0, skuReferenceCount: 1 }), false);
  assert.equal(canEditReference("ADMIN"), true);
  assert.equal(canEditReference("KIM"), false);
});

test("les totaux restent séparés en cents", () => {
  assert.deepEqual(aggregateTransactionAmounts([
    { subtotal: 10000, tps: 500, tvq: 998, total: 11498 },
    { subtotal: 2000, tps: 100, tvq: 199, total: 2299 },
  ]), { subtotal: 12000, tps: 600, tvq: 1197, total: 13797 });
});
