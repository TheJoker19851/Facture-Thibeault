function fixtureDate(offset) {
  return new Date(Date.UTC(2026, 7, 10 + offset)).toISOString().slice(0, 10);
}

function line(id, sequence, transactionDate, merchantRaw, amountCents) {
  return { id, sequence, transactionDate, merchantRaw, amountCents };
}

function transaction(id, date, vendor, totalCents) {
  return { id, cardId: "FIXTURE-CARD-001", date, vendor, totalCents };
}

/**
 * Deterministic volume fixture for local reconciliation performance and
 * concurrency checks. It contains 125 ordered statement lines: 110 clear
 * matches, 8 deliberately ambiguous pairs, and 7 missing-invoice cases.
 */
export function buildLargeReconciliationFixture() {
  const lines = [];
  const transactions = [];

  for (let index = 0; index < 110; index += 1) {
    const sequence = index + 1;
    const date = fixtureDate(index % 30);
    const amountCents = 10000 + index;
    const vendor = `Fournisseur volume ${String(index + 1).padStart(3, "0")}`;
    lines.push(line(`FIXTURE-LINE-${String(sequence).padStart(3, "0")}`, sequence, date, vendor, amountCents));
    transactions.push(transaction(`FIXTURE-TX-${String(sequence).padStart(3, "0")}`, date, vendor, amountCents));
  }

  for (let index = 0; index < 8; index += 1) {
    const sequence = 111 + index;
    const date = fixtureDate((index + 11) % 30);
    const amountCents = 20000 + index;
    const vendor = `Marchand ambigu ${String(index + 1).padStart(2, "0")}`;
    lines.push(line(`FIXTURE-LINE-${String(sequence).padStart(3, "0")}`, sequence, date, vendor, amountCents));
    transactions.push(transaction(`FIXTURE-REVIEW-${index + 1}-A`, date, vendor, amountCents));
    transactions.push(transaction(`FIXTURE-REVIEW-${index + 1}-B`, date, vendor, amountCents));
  }

  for (let index = 0; index < 7; index += 1) {
    const sequence = 119 + index;
    const date = fixtureDate((index + 21) % 30);
    lines.push(line(`FIXTURE-LINE-${String(sequence).padStart(3, "0")}`, sequence, date, `Marchand sans facture ${index + 1}`, 30000 + index));
  }

  for (let index = 0; index < 3; index += 1) {
    const date = fixtureDate(index + 4);
    transactions.push(transaction(`FIXTURE-OUTSIDE-${index + 1}`, date, `Transaction hors relevé ${index + 1}`, 40000 + index));
  }

  return {
    statement: {
      id: "FIXTURE-LARGE-STATEMENT",
      cardId: "FIXTURE-CARD-001",
      periodStart: "2026-08-10",
      periodEnd: "2026-09-09",
      originalFilename: "fixture-large-reconciliation.json",
      statementHash: "FIXTURE-LARGE-HASH",
      lines,
    },
    transactions,
    expected: { lines: 125, matched: 110, review: 8, missingInvoice: 7, outside: 3 },
  };
}
