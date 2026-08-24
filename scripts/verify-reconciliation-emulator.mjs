import assert from "node:assert/strict";
import { initializeApp, deleteApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDataConnect } from "firebase-admin/data-connect";
import { localEmulatorEnvironment } from "./lib/env-files.mjs";
import {
  buildPersistedReconciliation,
  importStatementBatch,
  loadReconciliationContext,
  persistLineStatus,
  persistManualMatch,
  persistOutsideControls,
} from "../lib/reconciliation-server.mjs";
import { RECONCILIATION_STATUSES } from "../lib/reconciliation.mjs";

function sourceFor(id, lines, cardId = "DEMO-CARD-001") {
  return JSON.stringify({
    id,
    cardId,
    periodStart: "2026-08-10",
    periodEnd: "2026-09-09",
    lines,
  });
}

export async function verifyReconciliationEmulator() {
  Object.assign(process.env, localEmulatorEnvironment(process.env));
  const app = initializeApp({ projectId: "demo-facture-thibeault" }, `reconciliation-test-${Date.now()}`);
  try {
    const auth = getAuth(app);
    const kim = await auth.getUserByEmail("kim.demo@example.test");
    const identity = { uid: kim.uid, role: "KIM" };
    const dataConnect = getDataConnect({ serviceId: "facture-thibeault-service", location: "northamerica-northeast1", connector: "accounting" }, app);
    const runTag = String(Date.now());
    // Keep repeated emulator runs independent even when Data Connect keeps its
    // local database between invocations. Matching is intentionally exact on
    // amount/date/card, so the synthetic amounts must not be reused.
    const runSeed = Number(runTag.slice(-7));
    const testAmounts = {
      first: 10_000_000 + runSeed * 3,
      second: 10_000_001 + runSeed * 3,
      review: 10_000_002 + runSeed * 3,
    };

    const seedTransaction = async ({ suffix, cardId, date, vendor, totalCents, invoiceNumber }) => {
      const transactionId = `RECON-${runTag}-TX-${suffix}`;
      await dataConnect.executeMutation("AdminSeedExpenseTransaction", {
        id: transactionId,
        transactionDate: date,
        vendor,
        cardId,
        statementPeriodId: "DEMO-2026-08",
        projectId: "DEMO-PROJET-001",
        accountId: "DEMO-ACCOUNT-90001",
        categoryLabel: "Rapprochement synthétique",
        sku: null,
        amountBeforeTaxCents: String(totalCents - 500 - 1845),
        tpsCents: "500",
        tvqCents: "1845",
        totalCents: String(totalCents),
        currency: "CAD",
        status: "VALIDATED",
        processingStatus: "VALIDATED",
        accountingStatus: "POSTED",
        reconciliationStatus: "UNMATCHED",
        classificationSource: "RECONCILIATION_TEST",
        classificationConfidence: 1,
        classificationNote: "Fixture synthétique de test local.",
        invoiceNumber,
        issue: null,
      });
      await dataConnect.executeMutation("AdminSeedInvoice", {
        id: `RECON-${runTag}-INV-${suffix}`,
        transactionId,
        vendor,
        invoiceNumber,
        invoiceDate: date,
        subtotalCents: String(totalCents - 500 - 1845),
        tpsCents: "500",
        tvqCents: "1845",
        totalCents: String(totalCents),
        processingStatus: "VALIDATED",
        accountingStatus: "POSTED",
        reviewStatus: "VALIDATED",
        storageFolder: `receipts/demo/RECON-${runTag}-${suffix}`,
        createdById: "DEMO-USER-KIM",
      });
      return transactionId;
    };
    await seedTransaction({ suffix: "A", cardId: "DEMO-CARD-001", date: "2026-08-11", vendor: "Station Démo", totalCents: testAmounts.first, invoiceNumber: `RECON-${runTag}-FACT-A` });
    await seedTransaction({ suffix: "B", cardId: "DEMO-CARD-001", date: "2026-08-10", vendor: "Quincaillerie Démo", totalCents: testAmounts.second, invoiceNumber: `RECON-${runTag}-FACT-B` });
    await seedTransaction({ suffix: "C", cardId: "DEMO-CARD-002", date: "2026-08-15", vendor: "Marchand Candidate Seed", totalCents: testAmounts.review, invoiceNumber: `RECON-${runTag}-FACT-C` });

    const source = sourceFor(`SERVER-STATEMENT-001-${runTag}`, [
      { sequence: 1, transactionDate: "2026-08-11", merchantRaw: "STATION DEMO", amountCents: testAmounts.first },
      { sequence: 2, transactionDate: "2026-08-10", merchantRaw: "Quincaillerie Démo", amountCents: testAmounts.second },
    ]);
    const imported = await importStatementBatch({ dataConnect, identity, imports: [{ sourceText: source, originalFilename: "server-statement-001.json", originalStoragePath: "local://server-statement-001.json" }] });
    assert.equal(imported.imported, 1);
    assert.equal(imported.rejected, 0);
    const statementId = imported.results[0].statementId;
    const afterImport = await loadReconciliationContext(dataConnect, identity);
    const statement = afterImport.statements.find((row) => row.id === statementId);
    assert.ok(statement);
    assert.equal(statement.holderNameSnapshot, "Alice Démo");
    assert.deepEqual(statement.lines.map((line) => line.sequence), [1, 2]);
    assert.deepEqual(statement.lines.map((line) => line.merchantNormalized), ["Station Démo", "Quincaillerie Démo"]);

    const replay = await importStatementBatch({ dataConnect, identity, imports: [{ sourceText: source, originalFilename: "server-statement-001-copy.json" }] });
    assert.equal(replay.idempotent, 1);
    assert.equal(replay.results[0].statementId, statementId);
    const concurrentSource = sourceFor(`SERVER-CONCURRENT-${runTag}`, [{ sequence: 1, transactionDate: "2026-08-16", merchantRaw: "CONCURRENT DEMO", amountCents: 7777 }]);
    const concurrentImports = await Promise.all([
      importStatementBatch({ dataConnect, identity, imports: [{ sourceText: concurrentSource, originalFilename: "concurrent-a.json" }] }),
      importStatementBatch({ dataConnect, identity, imports: [{ sourceText: concurrentSource, originalFilename: "concurrent-b.json" }] }),
    ]);
    assert.equal(concurrentImports.reduce((total, result) => total + result.imported, 0), 1);
    assert.equal(concurrentImports.reduce((total, result) => total + result.idempotent, 0), 1);
    assert.equal(concurrentImports.reduce((total, result) => total + result.rejected, 0), 0);
    assert.equal(new Set(concurrentImports.flatMap((result) => result.results.map((item) => item.statementId))).size, 1);
    const invalid = await importStatementBatch({ dataConnect, identity, imports: [{ sourceText: sourceFor("SERVER-STATEMENT-BAD", [{ sequence: 2, transactionDate: "2026-08-11", merchantRaw: "Erreur Démo", amountCents: 100 }]), originalFilename: "invalid-sequence.json" }] });
    assert.equal(invalid.rejected, 1);
    const afterInvalid = await loadReconciliationContext(dataConnect, identity);
    assert.equal(afterInvalid.statements.length, afterImport.statements.length + 1);

    const reconciliation = buildPersistedReconciliation(afterImport, statementId);
    assert.equal(reconciliation.lineResults.filter((row) => row.status === RECONCILIATION_STATUSES.MATCHED).length, 2);
    for (const result of reconciliation.lineResults.filter((row) => row.match)) {
      const transaction = afterImport.transactions.find((row) => row.id === result.match.expenseTransactionId);
      await persistManualMatch({
        dataConnect,
        identity,
        context: afterImport,
        statementId,
        lineId: result.line.id,
        transactionId: transaction.id,
        invoiceId: result.match.invoiceId,
        matchScore: result.candidates[0]?.score.score ?? 100,
        matchMethod: "AUTO",
        reason: result.reason,
        action: "RECONCILIATION_AUTO_MATCHED",
      });
    }
    const matchedContext = await loadReconciliationContext(dataConnect, identity);
    const matched = buildPersistedReconciliation(matchedContext, statementId);
    assert.equal(matched.lineResults.filter((row) => row.status === RECONCILIATION_STATUSES.MATCHED).length, 2);
    const outsideIds = await persistOutsideControls({ dataConnect, identity, reconciliation: matched });
    assert.ok(outsideIds.length >= 1);
    await persistOutsideControls({ dataConnect, identity, reconciliation: matched });
    const withOutside = await loadReconciliationContext(dataConnect, identity);
    assert.equal(new Set(withOutside.outsideControls.filter((row) => row.statement?.id === statementId).map((row) => row.id)).size, outsideIds.length);

    const reviewSource = sourceFor(`SERVER-STATEMENT-002-${runTag}`, [{ sequence: 1, transactionDate: "2026-08-15", merchantRaw: "MARCHAND AMBIGU DEMO", amountCents: testAmounts.review }], "DEMO-CARD-002");
    const reviewImport = await importStatementBatch({ dataConnect, identity, imports: [{ sourceText: reviewSource, originalFilename: "server-statement-002.json" }] });
    const reviewStatementId = reviewImport.results[0].statementId;
    const reviewContext = await loadReconciliationContext(dataConnect, identity);
    const review = buildPersistedReconciliation(reviewContext, reviewStatementId);
    const reviewResult = review.lineResults[0];
    assert.equal(reviewResult.status, RECONCILIATION_STATUSES.REVIEW);
    const candidate = reviewResult.candidates[0];
    const concurrent = await Promise.allSettled([
      persistManualMatch({ dataConnect, identity, context: reviewContext, statementId: reviewStatementId, lineId: reviewResult.line.id, transactionId: candidate.transaction.id, invoiceId: candidate.transaction.invoiceId, previousMatch: null, action: "STATEMENT_MATCH_CONFIRMED", matchScore: candidate.score.score, matchMethod: "MANUAL", reason: "Confirmation concurrentuelle démo." }),
      persistManualMatch({ dataConnect, identity, context: reviewContext, statementId: reviewStatementId, lineId: reviewResult.line.id, transactionId: candidate.transaction.id, invoiceId: candidate.transaction.invoiceId, previousMatch: null, action: "STATEMENT_MATCH_CONFIRMED", matchScore: candidate.score.score, matchMethod: "MANUAL", reason: "Confirmation concurrentuelle démo." }),
    ]);
    assert.equal(concurrent.filter((result) => result.status === "fulfilled").length, 1);

    const finalContext = await loadReconciliationContext(dataConnect, identity);
    const finalReview = buildPersistedReconciliation(finalContext, reviewStatementId);
    assert.equal(finalReview.lineResults[0].status, RECONCILIATION_STATUSES.MATCHED);
    await persistLineStatus({ dataConnect, identity, statementId: reviewStatementId, lineId: finalReview.lineResults[0].line.id, status: RECONCILIATION_STATUSES.MISSING_INVOICE, previousResult: finalReview.lineResults[0] });
    const finalStatusContext = await loadReconciliationContext(dataConnect, identity);
    const finalStatus = buildPersistedReconciliation(finalStatusContext, reviewStatementId);
    assert.equal(finalStatus.lineResults[0].status, RECONCILIATION_STATUSES.MISSING_INVOICE);
    console.log(`Rapprochement Emulator validé : imports=${imported.imported}, idempotent=${replay.idempotent}, import-concurrent=1 gagnant, rejected=${invalid.rejected}, outside=${outsideIds.length}, match-concurrent=1 gagnant.`);
  } finally {
    await deleteApp(app);
  }
}

if (import.meta.url === `file://${process.argv[1]?.replaceAll("\\", "/")}`) await verifyReconciliationEmulator();
