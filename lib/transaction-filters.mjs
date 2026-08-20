export const TRANSACTION_STATUS_FILTERS = Object.freeze([
  "Toutes",
  "À vérifier",
  "À valider",
  "Validées",
  "Non rapprochées",
]);

export function matchesTransactionStatusFilter(transaction, filter) {
  switch (filter) {
    case "À vérifier":
      return transaction.status === "À vérifier";
    case "À valider":
      return transaction.status === "À valider";
    case "Validées":
      return transaction.status === "Validée";
    case "Non rapprochées":
      return transaction.reconciliation !== "Rapprochée";
    case "Toutes":
    default:
      return true;
  }
}

export function filterTransactionsByStatus(transactions, filter) {
  return transactions.filter((transaction) => matchesTransactionStatusFilter(transaction, filter));
}

export function transactionStatusFilterCounts(transactions) {
  return Object.fromEntries(TRANSACTION_STATUS_FILTERS.map((filter) => [
    filter,
    filterTransactionsByStatus(transactions, filter).length,
  ]));
}
