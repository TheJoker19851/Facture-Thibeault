import assert from "node:assert/strict";
import test from "node:test";
import { filterTransactionsByStatus, transactionStatusFilterCounts } from "../lib/transaction-filters.mjs";

const transactions = [
  { id: "review", status: "À vérifier", reconciliation: "Non rapprochée" },
  { id: "validate", status: "À valider", reconciliation: "Facture manquante" },
  { id: "validated-matched", status: "Validée", reconciliation: "Rapprochée" },
  { id: "validated-open", status: "Validée", reconciliation: "Non rapprochée" },
];

test("les filtres de statut retournent le bon sous-ensemble", () => {
  assert.deepEqual(filterTransactionsByStatus(transactions, "Toutes").map((row) => row.id), ["review", "validate", "validated-matched", "validated-open"]);
  assert.deepEqual(filterTransactionsByStatus(transactions, "À vérifier").map((row) => row.id), ["review"]);
  assert.deepEqual(filterTransactionsByStatus(transactions, "À valider").map((row) => row.id), ["validate"]);
  assert.deepEqual(filterTransactionsByStatus(transactions, "Validées").map((row) => row.id), ["validated-matched", "validated-open"]);
  assert.deepEqual(filterTransactionsByStatus(transactions, "Non rapprochées").map((row) => row.id), ["review", "validate", "validated-open"]);
});

test("les compteurs partagent le même univers et le filtre non rapproché est transversal", () => {
  assert.deepEqual(transactionStatusFilterCounts(transactions), {
    Toutes: 4,
    "À vérifier": 1,
    "À valider": 1,
    Validées: 2,
    "Non rapprochées": 3,
  });
});
