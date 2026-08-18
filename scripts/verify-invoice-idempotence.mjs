import assert from "node:assert/strict";
import { demoUsers } from "./fixtures/demo-data.mjs";
import { LOCAL_FIREBASE_PROJECT_ID } from "../lib/environment.mjs";

function aiVariables(receiptId, processingStatus, vendor = "Idempotence Démo") {
  return {
    receiptId,
    aiModel: "emulator-idempotence",
    aiConfidence: 1,
    extractedVendor: vendor,
    extractedInvoiceNumber: `${receiptId}-FACTURE`,
    extractedInvoiceDate: "2026-08-17",
    extractedSubtotalCents: "10000",
    extractedTpsCents: "500",
    extractedTvqCents: "998",
    extractedTotalCents: "11498",
    extractedCurrency: "CAD",
    extractedSku: "DEMO-SKU-001",
    extractedCategory: "Matériaux Démo",
    extractedProjectId: "DEMO-PROJET-001",
    classificationAccountCode: "DEMO-90001",
    classificationCategory: "Matériaux Démo",
    classificationSource: "EMULATOR_TEST",
    classificationConfidence: 1,
    classificationStatus: "RESOLVED",
    aiNotes: "Test d’idempotence local.",
    processingStatus,
    decisionExceptions: "[]",
    decisionChecks: "[]",
  };
}

function reviewVariables(receiptId, vendor = "Correction KIM Démo") {
  return {
    receiptId,
    status: "VALIDATED",
    extractedVendor: vendor,
    extractedInvoiceNumber: `${receiptId}-FACTURE-KIM`,
    extractedInvoiceDate: "2026-08-17",
    extractedSubtotalCents: "10000",
    extractedTpsCents: "500",
    extractedTvqCents: "998",
    extractedTotalCents: "11498",
    extractedCurrency: "CAD",
    extractedSku: "DEMO-SKU-001",
    extractedCategory: "Matériaux Démo",
    extractedProjectId: "DEMO-PROJET-001",
    classificationAccountCode: "DEMO-90001",
    classificationCategory: "Matériaux Démo",
    classificationSource: "KIM_REVIEW",
    classificationConfidence: 1,
    classificationStatus: "RESOLVED",
    aiNotes: "Correction KIM locale.",
    decisionExceptions: "[]",
    decisionChecks: JSON.stringify([{ code: "KIM_REVIEW", passed: true, message: "Correction validée." }]),
  };
}

function postingVariables(receiptId, withoutProject = false) {
  return {
    receiptId,
    transactionId: `TX-${receiptId}`,
    invoiceId: `INV-${receiptId}`,
    vendor: "Correction KIM Démo",
    invoiceNumber: `${receiptId}-FACTURE-KIM`,
    invoiceDate: "2026-08-17",
    subtotalCents: "10000",
    tpsCents: "500",
    tvqCents: "998",
    totalCents: "11498",
    currency: "CAD",
    sku: "DEMO-SKU-001",
    category: "Matériaux Démo",
    accountCode: "DEMO-90001",
    cardId: "DEMO-CARD-001",
    statementPeriodId: "DEMO-2026-08",
    ...(withoutProject ? {} : { projectId: "DEMO-PROJET-001" }),
    storageFolder: `receipts/demo/${receiptId}`,
    classificationNote: "Test d’écriture atomique.",
  };
}

async function readIntake(dataConnect, receiptId) {
  const result = await dataConnect.executeQuery("ListInvoiceIntakes");
  return result.data.invoiceIntakes.find((intake) => intake.receiptId === receiptId);
}

async function createIntake(dataConnect, workerClaims, receiptId) {
  await dataConnect.executeMutation("CreateInvoiceIntake", {
    receiptId,
    storageFolder: `receipts/demo/${receiptId}`,
    photoCount: 1,
  }, { impersonate: { authClaims: workerClaims } });
}

async function assertOneConcurrentWinner(tasks) {
  const results = await Promise.allSettled(tasks);
  const winners = results.filter((result) => result.status === "fulfilled" && result.value.data?.invoiceIntake_updateMany === 1);
  assert.equal(winners.length, 1, "Une seule transition CAS doit gagner la concurrence.");
  return results;
}

export async function verifyInvoiceIdempotence() {
  process.env.DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399";
  const [{ initializeApp, deleteApp }, { getAuth }, { getDataConnect }] = await Promise.all([
    import("firebase-admin/app"),
    import("firebase-admin/auth"),
    import("firebase-admin/data-connect"),
  ]);
  const app = initializeApp({ projectId: LOCAL_FIREBASE_PROJECT_ID }, `idempotence-${Date.now()}`);

  try {
    const auth = getAuth(app);
    const worker = await auth.getUserByEmail(demoUsers.find((user) => user.role === "WORKER").email);
    const kim = await auth.getUserByEmail(demoUsers.find((user) => user.role === "KIM").email);
    const workerClaims = { sub: worker.uid, role: "WORKER" };
    const kimClaims = { sub: kim.uid, role: "KIM" };
    const dataConnect = getDataConnect({
      serviceId: "facture-thibeault-service",
      location: "northamerica-northeast1",
      connector: "accounting",
    }, app);

    const sequentialId = "IDEMP-SEQUENTIAL-001";
    await createIntake(dataConnect, workerClaims, sequentialId);
    const sequentialFirst = await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(sequentialId, "NEEDS_REVIEW"));
    assert.equal(sequentialFirst.data.invoiceIntake_updateMany, 1);
    await assert.rejects(
      dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(sequentialId, "AUTO_APPROVED", "Ecrasement Interdit")),
    );
    assert.equal((await readIntake(dataConnect, sequentialId)).processingStatus, "NEEDS_REVIEW");
    await assert.rejects(() => dataConnect.executeMutation("AutoCommitInvoiceIntake", postingVariables(sequentialId)));
    assert.equal((await readIntake(dataConnect, sequentialId)).accountingStatus, "NOT_POSTED");

    const concurrentId = "IDEMP-CONCURRENT-001";
    await createIntake(dataConnect, workerClaims, concurrentId);
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(concurrentId, "NEEDS_REVIEW", "Premier traitement")),
      dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(concurrentId, "NEEDS_REVIEW", "Second traitement")),
    ]);
    assert.equal((await readIntake(dataConnect, concurrentId)).processingStatus, "NEEDS_REVIEW");

    const autoId = "IDEMP-AUTO-001";
    await createIntake(dataConnect, workerClaims, autoId);
    const autoResult = await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(autoId, "AUTO_APPROVED"));
    assert.equal(autoResult.data.invoiceIntake_updateMany, 1);
    const autoPosting = postingVariables(autoId);
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("AutoCommitInvoiceIntake", autoPosting),
      dataConnect.executeMutation("AutoCommitInvoiceIntake", autoPosting),
    ]);
    const autoIntake = await readIntake(dataConnect, autoId);
    assert.equal(autoIntake.processingStatus, "AUTO_APPROVED");
    assert.equal(autoIntake.accountingStatus, "POSTED");
    const invoicesAfterAuto = await dataConnect.executeQuery("AdminListInvoices");
    const transactionsAfterAuto = await dataConnect.executeQuery("ListExpenseTransactions");
    assert.equal(invoicesAfterAuto.data.invoices.filter((invoice) => invoice.id === `INV-${autoId}`).length, 1);
    assert.equal(transactionsAfterAuto.data.expenseTransactions.filter((transaction) => transaction.id === `TX-${autoId}`).length, 1);
    await assert.rejects(() => dataConnect.executeMutation("AutoCommitInvoiceIntake", autoPosting));
    const invoicesAfterRetry = await dataConnect.executeQuery("AdminListInvoices");
    assert.equal(invoicesAfterRetry.data.invoices.filter((invoice) => invoice.id === `INV-${autoId}`).length, 1);

    const kimId = "IDEMP-KIM-001";
    await createIntake(dataConnect, workerClaims, kimId);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(kimId, "NEEDS_REVIEW", "Ancienne IA"))).data.invoiceIntake_updateMany, 1);
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("UpdateInvoiceIntakeReview", reviewVariables(kimId), { impersonate: { authClaims: kimClaims } }),
      dataConnect.executeMutation("UpdateInvoiceIntakeReview", reviewVariables(kimId), { impersonate: { authClaims: kimClaims } }),
    ]);
    await assert.rejects(
      dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(kimId, "AUTO_APPROVED", "Ancienne IA retardée")),
    );
    const kimIntake = await readIntake(dataConnect, kimId);
    assert.equal(kimIntake.processingStatus, "VALIDATED");
    assert.equal(kimIntake.extractedVendor, "Correction KIM Démo");

    const kimPosting = postingVariables(kimId);
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("CommitInvoiceIntake", kimPosting, { impersonate: { authClaims: kimClaims } }),
      dataConnect.executeMutation("CommitInvoiceIntake", kimPosting, { impersonate: { authClaims: kimClaims } }),
    ]);
    const kimInvoices = await dataConnect.executeQuery("AdminListInvoices");
    const kimTransactions = await dataConnect.executeQuery("ListExpenseTransactions");
    assert.equal(kimInvoices.data.invoices.filter((invoice) => invoice.id === `INV-${kimId}`).length, 1);
    assert.equal(kimTransactions.data.expenseTransactions.filter((transaction) => transaction.id === `TX-${kimId}`).length, 1);

    const errorId = "IDEMP-ERROR-001";
    await createIntake(dataConnect, workerClaims, errorId);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(errorId, "AUTO_APPROVED"))).data.invoiceIntake_updateMany, 1);
    await assert.rejects(() => dataConnect.executeMutation("AutoCommitInvoiceIntake", { ...postingVariables(errorId), accountCode: "DOES-NOT-EXIST" }));
    await dataConnect.executeMutation("MarkInvoiceIntakeAutoPostingError", {
      receiptId: errorId,
      error: "Échec de posting simulé.",
      decisionExceptions: "[]",
      decisionChecks: "[]",
    });
    const errorIntake = await readIntake(dataConnect, errorId);
    assert.equal(errorIntake.accountingStatus, "POSTING_ERROR");
    assert.equal(errorIntake.processingStatus, "NEEDS_REVIEW");
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("RetryInvoiceIntakeAi", { receiptId: errorId }),
      dataConnect.executeMutation("RetryInvoiceIntakeAi", { receiptId: errorId }),
    ]);
    const retriedIntake = await readIntake(dataConnect, errorId);
    assert.equal(retriedIntake.processingStatus, "PROCESSING");
    assert.equal(retriedIntake.accountingStatus, "NOT_POSTED");
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(errorId, "AUTO_APPROVED"))).data.invoiceIntake_updateMany, 1);
    await dataConnect.executeMutation("AutoCommitInvoiceIntake", postingVariables(errorId));
    const completedRetry = await readIntake(dataConnect, errorId);
    assert.equal(completedRetry.processingStatus, "AUTO_APPROVED");
    assert.equal(completedRetry.accountingStatus, "POSTED");
    const retriedInvoices = await dataConnect.executeQuery("AdminListInvoices");
    const retriedTransactions = await dataConnect.executeQuery("ListExpenseTransactions");
    assert.equal(retriedInvoices.data.invoices.filter((invoice) => invoice.id === `INV-${errorId}`).length, 1);
    assert.equal(retriedTransactions.data.expenseTransactions.filter((transaction) => transaction.id === `TX-${errorId}`).length, 1);

    console.log("Idempotence Data Connect validée : CAS, transaction, retry, KIM et posting error.");
  } finally {
    await deleteApp(app);
  }
}
