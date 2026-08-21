function toCents(value, centsValue) {
  if (centsValue != null && Number.isFinite(Number(centsValue))) return Math.round(Number(centsValue));
  return Math.round(Number(value ?? 0) * 100);
}

function emptyTotals() {
  return { subtotalCents: 0, tpsCents: 0, tvqCents: 0, totalCents: 0 };
}

function addTransactionTotals(current, transaction) {
  return {
    subtotalCents: current.subtotalCents + toCents(transaction.subtotal, transaction.subtotalCents),
    tpsCents: current.tpsCents + toCents(transaction.tps, transaction.tpsCents),
    tvqCents: current.tvqCents + toCents(transaction.tvq, transaction.tvqCents),
    totalCents: current.totalCents + toCents(transaction.total, transaction.totalCents),
  };
}

function withTaxes(totals) {
  return { ...totals, taxesCents: totals.tpsCents + totals.tvqCents };
}

/**
 * Builds the compact accounting table used for a selected cardholder.
 * Expense accounts without activity remain visible so the table can be copied
 * directly into the accounting entry, like the reference layout supplied by Kim.
 * @param {{ transactions?: any[], accounts?: any[] }} [input]
 */
export function buildAccountingCategorySummary({ transactions = [], accounts = [] } = {}) {
  const accountDefinitions = new Map();
  for (const account of accounts) {
    if (account.type !== "EXPENSE") continue;
    const accountNumber = String(account.number ?? account.code ?? "");
    if (!accountNumber) continue;
    accountDefinitions.set(accountNumber, {
      accountNumber,
      category: account.label ?? account.category ?? "Catégorie non nommée",
    });
  }

  const grouped = new Map();
  for (const transaction of transactions) {
    const accountNumber = String(transaction.accountNumber ?? transaction.accountCode ?? "—");
    const current = grouped.get(accountNumber) ?? emptyTotals();
    grouped.set(accountNumber, addTransactionTotals(current, transaction));
    if (!accountDefinitions.has(accountNumber)) {
      accountDefinitions.set(accountNumber, {
        accountNumber,
        category: transaction.accountLabel ?? transaction.category ?? "Compte non référencé",
        unreferenced: true,
      });
    }
  }

  const totalBeforeTaxCents = Array.from(grouped.values()).reduce((sum, totals) => sum + totals.subtotalCents, 0);
  const rows = Array.from(accountDefinitions.values()).map((definition) => {
    const totals = withTaxes(grouped.get(definition.accountNumber) ?? emptyTotals());
    return {
      ...definition,
      ...totals,
      percent: totalBeforeTaxCents > 0 ? Number(((totals.subtotalCents / totalBeforeTaxCents) * 100).toFixed(1)) : 0,
    };
  });
  const totals = withTaxes(Array.from(grouped.values()).reduce((sum, current) => addTransactionTotals(sum, {
    subtotalCents: current.subtotalCents,
    tpsCents: current.tpsCents,
    tvqCents: current.tvqCents,
    totalCents: current.totalCents,
  }), emptyTotals()));

  return { rows, totals, totalBeforeTaxCents };
}

/**
 * Builds tax totals by person, keeping card suffixes available for Kim's review.
 * @param {{ transactions?: any[] }} [input]
 */
export function buildTaxSummaryByHolder({ transactions = [] } = {}) {
  const grouped = new Map();
  for (const transaction of transactions) {
    const holder = String(transaction.person ?? "Titulaire non identifié");
    const current = grouped.get(holder) ?? { ...emptyTotals(), cards: new Set() };
    const next = addTransactionTotals(current, transaction);
    next.cards = current.cards;
    const card = transaction.card ?? transaction.cardLastFour;
    if (card) next.cards.add(String(card));
    grouped.set(holder, next);
  }

  const rows = Array.from(grouped.entries()).map(([holder, totals]) => ({
    holder,
    ...withTaxes(totals),
    cards: Array.from(totals.cards),
  }));
  const totals = withTaxes(Array.from(grouped.values()).reduce((sum, current) => addTransactionTotals(sum, {
    subtotalCents: current.subtotalCents,
    tpsCents: current.tpsCents,
    tvqCents: current.tvqCents,
    totalCents: current.totalCents,
  }), emptyTotals()));

  return { rows, totals };
}
