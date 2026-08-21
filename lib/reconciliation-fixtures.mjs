const basePeriod = { periodStart: "2026-08-10", periodEnd: "2026-09-09" };

function statement(id, cardId, holderId, lines, index) {
  return {
    id,
    cardId,
    holderId,
    holderNameSnapshot: holderId === "DEMO-USER-WORKER" ? "Alice Démo" : "Benoît Démo",
    ...basePeriod,
    originalStoragePath: `demo/statements/${id}.json`,
    originalFilename: `${id}.json`,
    importedAt: "2026-08-20T14:00:00.000Z",
    importedBy: "DEMO-USER-KIM",
    statementHash: `DEMO-HASH-${index}`,
    status: "IMPORTED",
    lineCount: lines.length,
    totalAmountCents: lines.reduce((total, line) => total + line.amountCents, 0),
    lines: lines.map((line, lineIndex) => ({
      id: `${id}-LINE-${String(lineIndex + 1).padStart(2, "0")}`,
      sequence: lineIndex + 1,
      postedDate: null,
      merchantNormalized: line.merchantRaw,
      externalReference: null,
      status: "REVIEW",
      rawData: JSON.stringify(line),
      ...line,
    })),
  };
}

export const DEMO_STATEMENT_IMPORTS = Object.freeze([
  statement("DEMO-STATEMENT-001", "DEMO-CARD-001", "DEMO-USER-WORKER", [
    { transactionDate: "2026-08-11", merchantRaw: "STATION DEMO", amountCents: 9198 },
    { transactionDate: "2026-08-10", merchantRaw: "CDN TIRE STORE 174", amountCents: 11498 },
  ], 1),
  statement("DEMO-STATEMENT-002", "DEMO-CARD-002", "DEMO-USER-KIM", [
    { transactionDate: "2026-08-12", merchantRaw: "Équipement Démo", amountCents: 22995 },
    { transactionDate: "2026-08-15", merchantRaw: "MARCHAND INCONNU", amountCents: 6899 },
  ], 2),
  statement("DEMO-STATEMENT-003", "DEMO-CARD-001", "DEMO-USER-WORKER", [{ transactionDate: "2026-07-11", merchantRaw: "Station Démo", amountCents: 5749 }], 3),
  statement("DEMO-STATEMENT-004", "DEMO-CARD-002", "DEMO-USER-KIM", [{ transactionDate: "2026-07-12", merchantRaw: "Équipement Démo", amountCents: 22995 }], 4),
  statement("DEMO-STATEMENT-005", "DEMO-CARD-001", "DEMO-USER-WORKER", [{ transactionDate: "2026-06-11", merchantRaw: "Station Démo", amountCents: 9198 }], 5),
  statement("DEMO-STATEMENT-006", "DEMO-CARD-002", "DEMO-USER-KIM", [{ transactionDate: "2026-06-13", merchantRaw: "Canadian Tire 174", amountCents: 11498 }], 6),
  statement("DEMO-STATEMENT-007", "DEMO-CARD-001", "DEMO-USER-WORKER", [{ transactionDate: "2026-05-14", merchantRaw: "Station Démo", amountCents: 6899 }], 7),
  statement("DEMO-STATEMENT-008", "DEMO-CARD-002", "DEMO-USER-KIM", [{ transactionDate: "2026-05-15", merchantRaw: "Marchand Démo", amountCents: 8049 }], 8),
  statement("DEMO-STATEMENT-009", "DEMO-CARD-001", "DEMO-USER-WORKER", [{ transactionDate: "2026-04-18", merchantRaw: "Station Démo", amountCents: 9198 }], 9),
  statement("DEMO-STATEMENT-010", "DEMO-CARD-002", "DEMO-USER-KIM", [{ transactionDate: "2026-04-20", merchantRaw: "Canadian Tire 174", amountCents: 22995 }], 10),
]);
