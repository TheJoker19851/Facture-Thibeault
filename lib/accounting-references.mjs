export const ACCOUNT_TYPES = Object.freeze({
  EXPENSE: "EXPENSE",
  TAX: "TAX",
});

export const PRODUCTION_ACCOUNT_DEFINITIONS = Object.freeze([
  { number: "21340", label: "TPS TAX", type: ACCOUNT_TYPES.TAX },
  { number: "21370", label: "TVQ TAX", type: ACCOUNT_TYPES.TAX },
  { number: "33544", label: "Essence EXPENSE", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33556", label: "Entretien roulant", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33557", label: "Réparation Équipement", type: ACCOUNT_TYPES.EXPENSE },
  { number: "43400", label: "CCQ", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33500", label: "Matériaux divers", type: ACCOUNT_TYPES.EXPENSE },
  { number: "42112", label: "Frais bureau", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33552", label: "Frais de soumission", type: ACCOUNT_TYPES.EXPENSE },
  { number: "42104", label: "Pénalité/amende", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33537", label: "Chauffage des travaux", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33539", label: "Rebus", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33526", label: "Divers", type: ACCOUNT_TYPES.EXPENSE },
  { number: "34019", label: "Équipement de sécurité", type: ACCOUNT_TYPES.EXPENSE },
  { number: "42102", label: "Taxes licence permis", type: ACCOUNT_TYPES.EXPENSE },
  { number: "34016", label: "Voyage et pension", type: ACCOUNT_TYPES.EXPENSE },
  { number: "11155", label: "Avance à l'administrateur", type: ACCOUNT_TYPES.EXPENSE },
  { number: "45670", label: "Promotion", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33558", label: "Immatriculation", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33536", label: "Location équipement", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33555", label: "Entretien camion lourd", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33554", label: "Location camion", type: ACCOUNT_TYPES.EXPENSE },
  { number: "34014", label: "Formation", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33540", label: "Transport matériel", type: ACCOUNT_TYPES.EXPENSE },
  { number: "33518", label: "Maçonnerie", type: ACCOUNT_TYPES.EXPENSE },
  { number: "15250", label: "Mise de fonds achat tracteur", type: ACCOUNT_TYPES.EXPENSE },
  { number: "11160", label: "Dépôt garantie", type: ACCOUNT_TYPES.EXPENSE },
]);

export function isSelectableExpenseAccount(account) {
  return Boolean(account) && (account.type === ACCOUNT_TYPES.EXPENSE || account.type === "Dépense") && (account.status === "ACTIVE" || account.status === "Actif");
}

export function isValidReferenceNumber(value) {
  return /^\d{1,20}$/.test(String(value ?? "").trim());
}

export function hasDuplicateReferenceNumber(references, number, id = null) {
  const normalized = String(number ?? "").trim();
  return references.some((reference) => String(reference.number ?? reference.code ?? "").trim() === normalized && (!id || reference.id !== id));
}

export function canHardDeleteReference({ transactionCount = 0, skuReferenceCount = 0 } = {}) {
  return Number(transactionCount) === 0 && Number(skuReferenceCount) === 0;
}

export function aggregateTransactionAmounts(transactions) {
  return transactions.reduce((totals, transaction) => ({
    subtotal: totals.subtotal + Number(transaction.subtotal ?? 0),
    tps: totals.tps + Number(transaction.tps ?? 0),
    tvq: totals.tvq + Number(transaction.tvq ?? 0),
    total: totals.total + Number(transaction.total ?? 0),
  }), { subtotal: 0, tps: 0, tvq: 0, total: 0 });
}

export function canEditReference(role) {
  return role === "ADMIN";
}
