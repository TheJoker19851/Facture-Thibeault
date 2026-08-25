import assert from "node:assert/strict";
import { demoUsers } from "./fixtures/demo-data.mjs";
import { LOCAL_FIREBASE_PROJECT_ID } from "../lib/environment.mjs";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";
import { buildAccountingTemplateReport } from "../lib/accounting-template-report.mjs";
import { DATA_CONNECT_PAGE_SIZE } from "./lib/data-connect-pages.mjs";
import { selectInvoiceIntakesForAutomaticProcessing } from "../lib/invoice-queue.mjs";

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
    extractedLineItems: JSON.stringify([{
      sequence: 1,
      description: "Article de démonstration",
      quantity: 1,
      unitPriceCents: 10000,
      amountCents: 10000,
      sku: "DEMO-SKU-001",
      category: "Matériaux Démo",
      accountCode: "DEMO-90001",
      classificationSource: "EMULATOR_TEST",
      classificationConfidence: 1,
      classificationStatus: "RESOLVED",
      classificationNote: "Ligne structurée de test.",
    }]),
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
    extractedLineItems: JSON.stringify([{
      sequence: 1,
      description: "Article corrigé par KIM",
      quantity: 1,
      unitPriceCents: 10000,
      amountCents: 10000,
      sku: "DEMO-SKU-001",
      category: "Matériaux Démo",
      accountCode: "DEMO-90001",
      classificationSource: "KIM_LINE_REVIEW",
      classificationConfidence: 1,
      classificationStatus: "CONFIRMED",
      classificationNote: "Ligne corrigée par KIM.",
    }]),
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
    expectedReviewRevision: 0,
    nextReviewRevision: 1,
  };
}

function photoVariables(receiptId, photoCount = 1) {
  const placeholder = {
    id: `UNUSED-${receiptId}`,
    storagePath: `receipts/demo/${receiptId}/unused.png`,
    contentType: "image/png",
  };
  const photo = (sequence) => sequence <= photoCount ? {
    id: `PHOTO-${receiptId}-${String(sequence).padStart(2, "0")}`,
    storagePath: `receipts/demo/${receiptId}/original-${String(sequence).padStart(2, "0")}.png`,
    contentType: "image/png",
  } : placeholder;
  const photo1 = photo(1);
  const photo2 = photo(2);
  const photo3 = photo(3);
  const photo4 = photo(4);
  const photo5 = photo(5);

  return {
    photoCount,
    photo1Id: photo1.id,
    photo1StoragePath: photo1.storagePath,
    photo1ContentType: photo1.contentType,
    hasPhoto2: photoCount >= 2,
    photo2Id: photo2.id,
    photo2StoragePath: photo2.storagePath,
    photo2ContentType: photo2.contentType,
    hasPhoto3: photoCount >= 3,
    photo3Id: photo3.id,
    photo3StoragePath: photo3.storagePath,
    photo3ContentType: photo3.contentType,
    hasPhoto4: photoCount >= 4,
    photo4Id: photo4.id,
    photo4StoragePath: photo4.storagePath,
    photo4ContentType: photo4.contentType,
    hasPhoto5: photoCount >= 5,
    photo5Id: photo5.id,
    photo5StoragePath: photo5.storagePath,
    photo5ContentType: photo5.contentType,
  };
}

function postingVariables(receiptId) {
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
    lineItems: JSON.stringify([{
      sequence: 1,
      description: "Article de démonstration",
      quantity: 1,
      unitPriceCents: 10000,
      amountCents: 10000,
      sku: "DEMO-SKU-001",
      category: "Matériaux Démo",
      accountCode: "DEMO-90001",
      classificationSource: "EMULATOR_TEST",
      classificationConfidence: 1,
      classificationStatus: "RESOLVED",
      classificationNote: "Ligne structurée de test.",
    }]),
    currency: "CAD",
    sku: "DEMO-SKU-001",
    category: "Matériaux Démo",
    account: { id: "DEMO-ACCOUNT-90001" },
    cardId: "DEMO-CARD-001",
    statementPeriodId: "DEMO-2026-08",
    storageFolder: `receipts/demo/${receiptId}`,
    classificationNote: "Test d’écriture atomique.",
  };
}

function autoPostingVariables(receiptId, photoCount = 1) {
  const { statementPeriodId, ...base } = postingVariables(receiptId);
  return {
    ...base,
    statementPeriod: { id: statementPeriodId },
    project: { id: "DEMO-PROJET-001" },
    expectedProcessingStatus: "AUTO_APPROVED",
    classificationSource: "AUTO_DECISION",
    classificationStatus: "RESOLVED",
    ...photoVariables(receiptId, photoCount),
  };
}

function humanPostingVariables(receiptId, photoCount = 1, projectId = "DEMO-PROJET-001") {
  const { statementPeriodId, ...base } = postingVariables(receiptId);
  return {
    ...base,
    statementPeriod: { id: statementPeriodId },
    project: projectId ? { id: projectId } : null,
    expectedProcessingStatus: "VALIDATED",
    classificationSource: "KIM_COMMIT",
    classificationStatus: "COMMITTED",
    ...photoVariables(receiptId, photoCount),
  };
}

function legacyPostingVariables(receiptId, withProject = true) {
  return {
    ...postingVariables(receiptId),
    ...(withProject ? { projectId: "DEMO-PROJET-001" } : {}),
  };
}

async function queryAllData(dataConnect, operation, field, variables = {}) {
  const rows = [];
  for (let offset = 0; ; offset += DATA_CONNECT_PAGE_SIZE) {
    const result = await dataConnect.executeQuery(operation, { ...variables, limit: DATA_CONNECT_PAGE_SIZE, offset });
    const page = result.data?.[field] ?? [];
    rows.push(...page);
    if (page.length < DATA_CONNECT_PAGE_SIZE) return { data: { [field]: rows } };
  }
}

async function readIntake(dataConnect, receiptId) {
  const result = await queryAllData(dataConnect, "ListInvoiceIntakes", "invoiceIntakes");
  return result.data.invoiceIntakes.find((intake) => intake.receiptId === receiptId);
}

async function createIntake(
  dataConnect,
  workerClaims,
  receiptId,
  photoCount = 1,
  storageFolder = `receipts/demo/${receiptId}`,
) {
  await dataConnect.executeMutation("CreateInvoiceIntakeV2", {
    receiptId,
    storageFolder,
    photoCount,
    clientVersion: INVOICE_CLIENT_VERSION,
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
  const [{ initializeApp, deleteApp }, { getAuth }, { getDataConnect }, { getStorage: getAdminStorage }] = await Promise.all([
    import("firebase-admin/app"),
    import("firebase-admin/auth"),
    import("firebase-admin/data-connect"),
    import("firebase-admin/storage"),
  ]);
  const app = initializeApp({ projectId: LOCAL_FIREBASE_PROJECT_ID }, `idempotence-${Date.now()}`);

  try {
    const auth = getAuth(app);
    const worker = await auth.getUserByEmail(demoUsers.find((user) => user.role === "WORKER").email);
    const kim = await auth.getUserByEmail(demoUsers.find((user) => user.role === "KIM").email);
    const kimProfileId = demoUsers.find((user) => user.role === "KIM").id;
    const workerClaims = { sub: worker.uid, role: "WORKER" };
    const kimClaims = { sub: kim.uid, role: "KIM" };
    const dataConnect = getDataConnect({
      serviceId: "facture-thibeault-service",
      location: "northamerica-northeast1",
      connector: "accounting",
    }, app);
    const bucket = getAdminStorage(app).bucket(`${LOCAL_FIREBASE_PROJECT_ID}.appspot.com`);

    // Full local E2E: a real private Storage object is acknowledged into an
    // intake, processed through the guarded AI/review states, posted once with
    // its structured line and photo, then corrected with an auditable snapshot.
    const completeE2eId = "IDEMP-E2E-COMPLETE-001";
    const completeE2ePath = `receipts/demo/${completeE2eId}/original-01.png`;
    const completeE2eFile = bucket.file(completeE2ePath);
    await completeE2eFile.save(Buffer.from("PNG-DEMO-E2E"), {
      contentType: "image/png",
      metadata: { metadata: { receiptId: completeE2eId, ownerUid: worker.uid, sequence: "1", invoiceClientVersion: INVOICE_CLIENT_VERSION } },
    });
    await createIntake(dataConnect, workerClaims, completeE2eId, 1);
    const claim = await dataConnect.executeMutation("ClaimInvoiceIntakeProcessing", { receiptId: completeE2eId, processingAttempts: 1 });
    assert.equal(claim.data.invoiceIntake_updateMany, 1);
    const claimedIntake = await readIntake(dataConnect, completeE2eId);
    assert.equal(claimedIntake.processingState, "RUNNING");
    assert.equal(claimedIntake.processingAttempts, 1);
    assert.ok(claimedIntake.lastAttemptAt);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(completeE2eId, "NEEDS_REVIEW"))).data.invoiceIntake_updateMany, 1);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeReview", reviewVariables(completeE2eId), { impersonate: { authClaims: kimClaims } })).data.invoiceIntake_updateMany, 1);
    const completePosting = humanPostingVariables(completeE2eId, 1);
    await dataConnect.executeMutation("MaterializeInvoiceIntakeV2", completePosting);
    const completeInvoiceResult = await queryAllData(dataConnect, "ListInvoicesToReview", "invoices");
    const completeTransactionResult = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    const completePhotoResult = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    const completeInvoice = completeInvoiceResult.data.invoices.find((invoice) => invoice.id === `INV-${completeE2eId}`);
    const completeTransaction = completeTransactionResult.data.expenseTransactions.find((transaction) => transaction.id === `TX-${completeE2eId}`);
    const completePhotos = completePhotoResult.data.invoicePhotos.filter((photo) => photo.invoice.id === `INV-${completeE2eId}`);
    assert.equal(completeInvoice?.accountingStatus, "POSTED");
    assert.equal(completeTransaction?.accountingStatus, "POSTED");
    assert.equal(completePhotos.length, 1);
    assert.equal(completePhotos[0].storagePath, completeE2ePath);
    assert.equal(JSON.parse(completeInvoice.lineItems).length, 1);
    await dataConnect.executeMutation("CorrectPostedInvoice", {
      correctionId: `CORR-${completeE2eId}-TPS`,
      invoiceId: `INV-${completeE2eId}`,
      transactionId: `TX-${completeE2eId}`,
      actorUserId: kimProfileId,
      fieldName: "tpsCents",
      previousValue: "500",
      correctedValue: "600",
      note: "Correction E2E: TPS relue sur la photo originale.",
      vendor: completeInvoice.vendor,
      invoiceNumber: completeInvoice.invoiceNumber,
      invoiceDate: completeInvoice.invoiceDate,
      subtotalCents: "10000",
      tpsCents: "600",
      tvqCents: "998",
      totalCents: "11598",
      lineItems: completeInvoice.lineItems,
      category: "Matériaux Démo",
      account: { id: "DEMO-ACCOUNT-90001" },
      auditEventId: `AUDIT-${completeE2eId}-TPS`,
      auditDetails: JSON.stringify({ source: "E2E", field: "tpsCents", previous: 500, corrected: 600 }),
    }, { impersonate: { authClaims: kimClaims } });
    const corrections = await dataConnect.executeQuery("ListTransactionCorrections", { transactionId: `TX-${completeE2eId}`, limit: 200, offset: 0 });
    assert.equal(corrections.data.transactionCorrections.length, 1);
    assert.equal(corrections.data.transactionCorrections[0].previousValue, "500");
    const correctionAudits = await dataConnect.executeQuery("ListAuditEvents", { entityType: "Invoice", entityId: `INV-${completeE2eId}`, limit: 200, offset: 0 });
    assert.ok(correctionAudits.data.auditEvents.some((event) => event.action === "POSTED_INVOICE_CORRECTED"));
    const correctedTransaction = (await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions")).data.expenseTransactions.find((transaction) => transaction.id === `TX-${completeE2eId}`);
    const report = buildAccountingTemplateReport({
      period: { label: "E2E", start: "2026-08-17", end: "2026-08-17" },
      cards: [{ holder: "Alice Démo", lastFour: "9001" }],
      transactions: [{ id: correctedTransaction.id, date: correctedTransaction.transactionDate, vendor: correctedTransaction.vendor, person: "Alice Démo", card: "9001", subtotalCents: Number(correctedTransaction.amountBeforeTaxCents), tpsCents: Number(correctedTransaction.tpsCents), tvqCents: Number(correctedTransaction.tvqCents), totalCents: Number(correctedTransaction.totalCents), accountNumber: "DEMO-90001", imageCount: 1 }],
    });
    assert.equal(report.totals.totalCents, 11598);
    const adjustmentId = `ADJ-E2E-${completeE2eId}`;
    await dataConnect.executeMutation("UpsertReportAdjustmentSet", {
      id: adjustmentId,
      periodKey: "E2E-2026-08",
      periodStart: "2026-08-10",
      periodEnd: "2026-09-09",
      projectId: null,
      holderId: null,
      rowsJson: JSON.stringify([{ index: 1, description: "Paiement E2E", amountCents: -1250 }]),
      actorUid: kim.uid,
      auditEventId: `AUDIT-${adjustmentId}`,
      auditDetails: JSON.stringify({ source: "E2E", amountCents: -1250 }),
    }, { impersonate: { authClaims: kimClaims } });
    const persistedAdjustment = await dataConnect.executeQuery("ListReportAdjustmentSets", { periodKey: "E2E-2026-08", limit: 200, offset: 0 }, { impersonate: { authClaims: kimClaims } });
    assert.equal(persistedAdjustment.data.reportAdjustmentSets.find((row) => row.id === adjustmentId)?.rowsJson, JSON.stringify([{ index: 1, description: "Paiement E2E", amountCents: -1250 }]));
    assert.equal(persistedAdjustment.data.reportAdjustmentSets.find((row) => row.id === adjustmentId)?.createdByUid, kim.uid);
    const adjustmentAudits = await dataConnect.executeQuery("ListAuditEvents", { entityType: "ReportAdjustmentSet", entityId: adjustmentId, limit: 200, offset: 0 }, { impersonate: { authClaims: kimClaims } });
    assert.ok(adjustmentAudits.data.auditEvents.some((event) => event.action === "REPORT_ADJUSTMENTS_UPDATED"));
    await completeE2eFile.delete().catch(() => undefined);

    // Simulate a client that disappears immediately after upload. The queued
    // intake is selected and completed by the server-owned worker path; no
    // browser AI call is made in this scenario.
    const lostClientId = "IDEMP-E2E-CLIENT-LOST-001";
    const lostClientPath = `receipts/demo/${lostClientId}/original-01.png`;
    const lostClientFile = bucket.file(lostClientPath);
    await lostClientFile.save(Buffer.from("PNG-DEMO-CLIENT-LOST"), {
      contentType: "image/png",
      metadata: { metadata: { receiptId: lostClientId, ownerUid: worker.uid, sequence: "1", invoiceClientVersion: INVOICE_CLIENT_VERSION } },
    });
    await createIntake(dataConnect, workerClaims, lostClientId, 1);
    const queuedAfterUpload = await readIntake(dataConnect, lostClientId);
    assert.equal(queuedAfterUpload.processingState, "QUEUED");
    assert.deepEqual(selectInvoiceIntakesForAutomaticProcessing([queuedAfterUpload]).map((intake) => intake.receiptId), [lostClientId]);
    assert.equal((await dataConnect.executeMutation("ClaimInvoiceIntakeProcessing", { receiptId: lostClientId, processingAttempts: 1 })).data.invoiceIntake_updateMany, 1);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(lostClientId, "AUTO_APPROVED"))).data.invoiceIntake_updateMany, 1);
    await dataConnect.executeMutation("MaterializeInvoiceIntakeV2", autoPostingVariables(lostClientId));
    const completedAfterClientLoss = await readIntake(dataConnect, lostClientId);
    assert.equal(completedAfterClientLoss.accountingStatus, "POSTED");
    assert.equal((await queryAllData(dataConnect, "AdminListInvoices", "invoices")).data.invoices.filter((invoice) => invoice.id === `INV-${lostClientId}`).length, 1);
    await lostClientFile.delete().catch(() => undefined);

    const sequentialId = "IDEMP-SEQUENTIAL-001";
    await createIntake(dataConnect, workerClaims, sequentialId);
    const sequentialFirst = await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(sequentialId, "NEEDS_REVIEW"));
    assert.equal(sequentialFirst.data.invoiceIntake_updateMany, 1);
    await assert.rejects(
      dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(sequentialId, "AUTO_APPROVED", "Ecrasement Interdit")),
    );
    assert.equal((await readIntake(dataConnect, sequentialId)).processingStatus, "NEEDS_REVIEW");
    await assert.rejects(() => dataConnect.executeMutation("MaterializeInvoiceIntakeV2", autoPostingVariables(sequentialId)));
    assert.equal((await readIntake(dataConnect, sequentialId)).accountingStatus, "NOT_POSTED");

    const concurrentId = "IDEMP-CONCURRENT-001";
    await createIntake(dataConnect, workerClaims, concurrentId);
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(concurrentId, "NEEDS_REVIEW", "Premier traitement")),
      dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(concurrentId, "NEEDS_REVIEW", "Second traitement")),
    ]);
    assert.equal((await readIntake(dataConnect, concurrentId)).processingStatus, "NEEDS_REVIEW");

    const autoId = "IDEMP-AUTO-001";
    await createIntake(dataConnect, workerClaims, autoId, 5);
    const autoResult = await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(autoId, "AUTO_APPROVED"));
    assert.equal(autoResult.data.invoiceIntake_updateMany, 1);
    await assert.rejects(() => dataConnect.executeMutation("AutoCommitInvoiceIntake", legacyPostingVariables(autoId)));
    assert.equal((await readIntake(dataConnect, autoId)).accountingStatus, "NOT_POSTED");
    const autoPosting = autoPostingVariables(autoId, 5);
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("MaterializeInvoiceIntakeV2", autoPosting),
      dataConnect.executeMutation("MaterializeInvoiceIntakeV2", autoPosting),
    ]);
    const autoIntake = await readIntake(dataConnect, autoId);
    assert.equal(autoIntake.processingStatus, "AUTO_APPROVED");
    assert.equal(autoIntake.accountingStatus, "POSTED");
    const invoicesAfterAuto = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    const transactionsAfterAuto = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    const autoInvoices = invoicesAfterAuto.data.invoices.filter((invoice) => invoice.id === `INV-${autoId}`);
    assert.equal(autoInvoices.length, 1);
    assert.equal(autoInvoices[0].intake?.receiptId, autoId);
    assert.equal(transactionsAfterAuto.data.expenseTransactions.filter((transaction) => transaction.id === `TX-${autoId}`).length, 1);
    const photosAfterAuto = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    const autoPhotos = photosAfterAuto.data.invoicePhotos
      .filter((photo) => photo.invoice.id === `INV-${autoId}`)
      .sort((left, right) => left.sequence - right.sequence);
    assert.equal(autoPhotos.length, 5);
    assert.deepEqual(autoPhotos.map((photo) => photo.sequence), [1, 2, 3, 4, 5]);
    assert.equal(new Set(autoPhotos.map((photo) => photo.storagePath)).size, 5);
    await assert.rejects(() => dataConnect.executeMutation("MaterializeInvoiceIntakeV2", autoPosting));
    const invoicesAfterRetry = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    assert.equal(invoicesAfterRetry.data.invoices.filter((invoice) => invoice.id === `INV-${autoId}`).length, 1);
    const photosAfterRetry = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    assert.equal(photosAfterRetry.data.invoicePhotos.filter((photo) => photo.invoice.id === `INV-${autoId}`).length, 5);
    await assert.rejects(() => dataConnect.executeMutation("AdminSeedInvoicePhoto", {
      id: `PHOTO-${autoId}-DUPLICATE-PATH`,
      invoiceId: `INV-${autoId}`,
      storagePath: autoPhotos[0].storagePath,
      contentType: "image/png",
      sequence: 3,
    }));
    await assert.rejects(() => dataConnect.executeMutation("AdminSeedInvoicePhoto", {
      id: `PHOTO-${autoId}-DUPLICATE-SEQUENCE`,
      invoiceId: `INV-${autoId}`,
      storagePath: `receipts/demo/${autoId}/different-object.png`,
      contentType: "image/png",
      sequence: 1,
    }));

    const photoMismatchId = "IDEMP-PHOTO-MISMATCH-001";
    await createIntake(dataConnect, workerClaims, photoMismatchId, 2);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(photoMismatchId, "AUTO_APPROVED"))).data.invoiceIntake_updateMany, 1);
    await assert.rejects(() => dataConnect.executeMutation("MaterializeInvoiceIntakeV2", autoPostingVariables(photoMismatchId, 1)));
    const photoMismatchIntake = await readIntake(dataConnect, photoMismatchId);
    assert.equal(photoMismatchIntake.processingStatus, "AUTO_APPROVED");
    assert.equal(photoMismatchIntake.accountingStatus, "NOT_POSTED");
    const invoicesAfterMismatch = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    const transactionsAfterMismatch = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    const photosAfterMismatch = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    assert.equal(invoicesAfterMismatch.data.invoices.some((invoice) => invoice.id === `INV-${photoMismatchId}`), false);
    assert.equal(transactionsAfterMismatch.data.expenseTransactions.some((transaction) => transaction.id === `TX-${photoMismatchId}`), false);
    assert.equal(photosAfterMismatch.data.invoicePhotos.some((photo) => photo.invoice.id === `INV-${photoMismatchId}`), false);

    const transientRetryId = "IDEMP-TRANSIENT-RETRY-001";
    await createIntake(dataConnect, workerClaims, transientRetryId);
    await dataConnect.executeMutation("MarkInvoiceIntakeAiError", {
      receiptId: transientRetryId,
      error: "Le traitement IA a échoué; la facture doit être vérifiée manuellement.",
      aiErrorCode: "GEMINI_TRANSIENT",
      decisionExceptions: JSON.stringify([{ code: "AI_PROCESSING_ERROR", message: "Gemini capacity temporarily unavailable." }]),
      decisionChecks: "[]",
    });
    await assert.rejects(() => dataConnect.executeMutation("RetryInvoiceIntakeAiTransient", { receiptId: transientRetryId }));
    assert.equal((await readIntake(dataConnect, transientRetryId)).processingStatus, "NEEDS_REVIEW");
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("RetryInvoiceIntakeAiTransientV2", {
        receiptId: transientRetryId,
        invoiceId: `INV-${transientRetryId}`,
        storageFolder: `receipts/demo/${transientRetryId}`,
      }),
      dataConnect.executeMutation("RetryInvoiceIntakeAiTransientV2", {
        receiptId: transientRetryId,
        invoiceId: `INV-${transientRetryId}`,
        storageFolder: `receipts/demo/${transientRetryId}`,
      }),
    ]);
    const transientRetried = await readIntake(dataConnect, transientRetryId);
    assert.equal(transientRetried.processingStatus, "PROCESSING");
    assert.equal(transientRetried.accountingStatus, "NOT_POSTED");
    assert.equal(transientRetried.aiErrorCode, null);

    const maxAttemptsId = "IDEMP-MAX-ATTEMPTS-001";
    const maxAttempts = 5;
    const transientError = {
      error: "Le traitement IA a échoué; la facture doit être vérifiée manuellement.",
      aiErrorCode: "GEMINI_TRANSIENT",
      decisionExceptions: JSON.stringify([{ code: "AI_PROCESSING_ERROR", message: "Gemini capacity temporarily unavailable." }]),
      decisionChecks: "[]",
    };
    await createIntake(dataConnect, workerClaims, maxAttemptsId);
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      if (attempt > 1) {
        const retryTasks = [dataConnect.executeMutation("RetryInvoiceIntakeAiTransientV2", {
          receiptId: maxAttemptsId,
          invoiceId: `INV-${maxAttemptsId}`,
          storageFolder: `receipts/demo/${maxAttemptsId}`,
        })];
        if (attempt === 2) retryTasks.push(dataConnect.executeMutation("RetryInvoiceIntakeAiTransientV2", {
          receiptId: maxAttemptsId,
          invoiceId: `INV-${maxAttemptsId}`,
          storageFolder: `receipts/demo/${maxAttemptsId}`,
        }));
        if (retryTasks.length === 2) await assertOneConcurrentWinner(retryTasks);
        else await retryTasks[0];
      }
      assert.equal((await dataConnect.executeMutation("ClaimInvoiceIntakeProcessing", {
        receiptId: maxAttemptsId,
        processingAttempts: attempt,
        maxAttempts,
      })).data.invoiceIntake_updateMany, 1);
      await dataConnect.executeMutation("MarkInvoiceIntakeAiError", { receiptId: maxAttemptsId, ...transientError });
    }
    const maxAttemptException = JSON.stringify([{
      code: "AI_PROCESSING_ERROR",
      message: "Gemini capacity temporarily unavailable.",
    }, {
      code: "AI_MAX_ATTEMPTS_REACHED",
      fieldName: null,
      message: "Le traitement IA a atteint la limite de 5 tentatives; intervention humaine requise.",
      aiValue: "5",
      suggestedValue: null,
      status: "OPEN",
    }]);
    const maxAttemptCheck = JSON.stringify([{
      code: "AI_MAX_ATTEMPTS_REACHED",
      passed: false,
      message: "Le traitement IA a atteint la limite de 5 tentatives.",
    }]);
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("MarkInvoiceIntakeAiMaxAttempts", {
        receiptId: maxAttemptsId,
        currentAttempts: maxAttempts,
        decisionExceptions: maxAttemptException,
        decisionChecks: maxAttemptCheck,
        actorUid: worker.uid,
        actorRole: "WORKER",
        writeAudit: true,
        auditEventId: `AUDIT-${maxAttemptsId}-AI_MAX_ATTEMPTS_REACHED`,
        auditDetails: JSON.stringify({ reason: "AI_MAX_ATTEMPTS_REACHED", maxAttempts }),
      }),
      dataConnect.executeMutation("MarkInvoiceIntakeAiMaxAttempts", {
        receiptId: maxAttemptsId,
        currentAttempts: maxAttempts,
        decisionExceptions: maxAttemptException,
        decisionChecks: maxAttemptCheck,
        actorUid: worker.uid,
        actorRole: "WORKER",
        writeAudit: true,
        auditEventId: `AUDIT-${maxAttemptsId}-AI_MAX_ATTEMPTS_REACHED`,
        auditDetails: JSON.stringify({ reason: "AI_MAX_ATTEMPTS_REACHED", maxAttempts }),
      }),
    ]);
    const maxedIntake = await readIntake(dataConnect, maxAttemptsId);
    assert.equal(maxedIntake.processingAttempts, maxAttempts);
    assert.equal(maxedIntake.processingStatus, "NEEDS_REVIEW");
    assert.equal(maxedIntake.processingState, "FAILED");
    assert.equal(maxedIntake.aiErrorCode, "AI_MAX_ATTEMPTS_REACHED");
    assert.equal(maxedIntake.lastError, transientError.error);
    assert.equal(JSON.parse(maxedIntake.decisionExceptions).some((exception) => exception.code === "AI_MAX_ATTEMPTS_REACHED"), true);
    await assert.rejects(() => dataConnect.executeMutation("RetryInvoiceIntakeAiTransientV2", {
      receiptId: maxAttemptsId,
      invoiceId: `INV-${maxAttemptsId}`,
      storageFolder: `receipts/demo/${maxAttemptsId}`,
    }));
    const maxAudit = await dataConnect.executeQuery("ListAuditEvents", {
      entityType: "InvoiceIntake",
      entityId: maxAttemptsId,
      limit: 200,
      offset: 0,
    });
    assert.equal(maxAudit.data.auditEvents.some((event) => event.action === "AI_MAX_ATTEMPTS_REACHED"), true);
    const maxInvoices = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    const maxTransactions = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    assert.equal(maxInvoices.data.invoices.some((invoice) => invoice.intake?.receiptId === maxAttemptsId), false);
    assert.equal(maxTransactions.data.expenseTransactions.some((transaction) => transaction.id === `TX-${maxAttemptsId}`), false);

    const existingInvoiceRetryId = "IDEMP-EXISTING-INVOICE-001";
    await createIntake(dataConnect, workerClaims, existingInvoiceRetryId, 1, `receipts/demo/${autoId}`);
    await dataConnect.executeMutation("MarkInvoiceIntakeAiError", {
      receiptId: existingInvoiceRetryId,
      error: "Le traitement IA a échoué; la facture doit être vérifiée manuellement.",
      aiErrorCode: "GEMINI_TRANSIENT",
      decisionExceptions: JSON.stringify([{ code: "AI_PROCESSING_ERROR", message: "Gemini capacity temporarily unavailable." }]),
      decisionChecks: "[]",
    });
    await assert.rejects(() => dataConnect.executeMutation("RetryInvoiceIntakeAiTransientV2", {
      receiptId: existingInvoiceRetryId,
      invoiceId: `INV-${existingInvoiceRetryId}`,
      storageFolder: `receipts/demo/${autoId}`,
    }));
    const existingInvoiceRetry = await readIntake(dataConnect, existingInvoiceRetryId);
    assert.equal(existingInvoiceRetry.processingStatus, "NEEDS_REVIEW");
    assert.equal(existingInvoiceRetry.accountingStatus, "NOT_POSTED");
    assert.equal(existingInvoiceRetry.aiErrorCode, "GEMINI_TRANSIENT");

    const businessExceptionId = "IDEMP-BUSINESS-EXCEPTION-001";
    await createIntake(dataConnect, workerClaims, businessExceptionId);
    await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", {
      ...aiVariables(businessExceptionId, "NEEDS_REVIEW"),
      extractedProjectId: null,
      classificationStatus: "NEEDS_REVIEW",
      decisionExceptions: JSON.stringify([{ code: "UNKNOWN_PROJECT", message: "Projet introuvable." }]),
    });
    await assert.rejects(() => dataConnect.executeMutation("RetryInvoiceIntakeAiTransientV2", {
      receiptId: businessExceptionId,
      invoiceId: `INV-${businessExceptionId}`,
      storageFolder: `receipts/demo/${businessExceptionId}`,
    }));
    const businessException = await readIntake(dataConnect, businessExceptionId);
    assert.equal(businessException.processingStatus, "NEEDS_REVIEW");
    assert.equal(businessException.accountingStatus, "NOT_POSTED");
    assert.equal(businessException.aiErrorCode, null);

    const kimId = "IDEMP-KIM-001";
    await createIntake(dataConnect, workerClaims, kimId, 5);
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

    const kimPosting = humanPostingVariables(kimId, 5);
    await assert.rejects(() => dataConnect.executeMutation("CommitInvoiceIntake", legacyPostingVariables(kimId)));
    assert.equal((await readIntake(dataConnect, kimId)).accountingStatus, "NOT_POSTED");
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("MaterializeInvoiceIntakeV2", kimPosting),
      dataConnect.executeMutation("MaterializeInvoiceIntakeV2", kimPosting),
    ]);
    const kimInvoices = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    const kimTransactions = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    assert.equal(kimInvoices.data.invoices.filter((invoice) => invoice.id === `INV-${kimId}`).length, 1);
    assert.equal(kimTransactions.data.expenseTransactions.filter((transaction) => transaction.id === `TX-${kimId}`).length, 1);
    const kimPhotos = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    assert.equal(kimPhotos.data.invoicePhotos.filter((photo) => photo.invoice.id === `INV-${kimId}`).length, 5);
    await assert.rejects(() => dataConnect.executeMutation("MaterializeInvoiceIntakeV2", kimPosting));
    const kimPhotosAfterReplay = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    assert.equal(kimPhotosAfterReplay.data.invoicePhotos.filter((photo) => photo.invoice.id === `INV-${kimId}`).length, 5);

    const humanMismatchId = "IDEMP-HUMAN-PHOTO-MISMATCH-001";
    await createIntake(dataConnect, workerClaims, humanMismatchId, 2);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(humanMismatchId, "NEEDS_REVIEW"))).data.invoiceIntake_updateMany, 1);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeReview", reviewVariables(humanMismatchId), { impersonate: { authClaims: kimClaims } })).data.invoiceIntake_updateMany, 1);
    await assert.rejects(() => dataConnect.executeMutation("MaterializeInvoiceIntakeV2", humanPostingVariables(humanMismatchId, 1)));
    const humanMismatchIntake = await readIntake(dataConnect, humanMismatchId);
    assert.equal(humanMismatchIntake.processingStatus, "VALIDATED");
    assert.equal(humanMismatchIntake.accountingStatus, "NOT_POSTED");
    const humanMismatchInvoices = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    const humanMismatchTransactions = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    const humanMismatchPhotos = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    assert.equal(humanMismatchInvoices.data.invoices.some((invoice) => invoice.intake?.receiptId === humanMismatchId), false);
    assert.equal(humanMismatchTransactions.data.expenseTransactions.some((transaction) => transaction.id === `TX-${humanMismatchId}`), false);
    assert.equal(humanMismatchPhotos.data.invoicePhotos.some((photo) => photo.invoice.id === `INV-${humanMismatchId}`), false);

    const humanWithoutProjectId = "IDEMP-HUMAN-NO-PROJECT-001";
    await createIntake(dataConnect, workerClaims, humanWithoutProjectId);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(humanWithoutProjectId, "NEEDS_REVIEW"))).data.invoiceIntake_updateMany, 1);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeReview", { ...reviewVariables(humanWithoutProjectId), extractedProjectId: null }, { impersonate: { authClaims: kimClaims } })).data.invoiceIntake_updateMany, 1);
    await assert.rejects(() => dataConnect.executeMutation("MaterializeInvoiceIntakeV2", humanPostingVariables(humanWithoutProjectId, 1, null)));
    assert.equal((await readIntake(dataConnect, humanWithoutProjectId)).accountingStatus, "NOT_POSTED");

    const humanVsAutoId = "IDEMP-HUMAN-VS-AUTO-001";
    await createIntake(dataConnect, workerClaims, humanVsAutoId);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(humanVsAutoId, "AUTO_APPROVED"))).data.invoiceIntake_updateMany, 1);
    await assertOneConcurrentWinner([
      dataConnect.executeMutation("MaterializeInvoiceIntakeV2", autoPostingVariables(humanVsAutoId)),
      dataConnect.executeMutation("MaterializeInvoiceIntakeV2", humanPostingVariables(humanVsAutoId)),
    ]);
    const humanVsAutoInvoices = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    const humanVsAutoTransactions = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    const humanVsAutoPhotos = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    assert.equal(humanVsAutoInvoices.data.invoices.filter((invoice) => invoice.intake?.receiptId === humanVsAutoId).length, 1);
    assert.equal(humanVsAutoTransactions.data.expenseTransactions.filter((transaction) => transaction.id === `TX-${humanVsAutoId}`).length, 1);
    assert.equal(humanVsAutoPhotos.data.invoicePhotos.filter((photo) => photo.invoice.id === `INV-${humanVsAutoId}`).length, 1);

    const errorId = "IDEMP-ERROR-001";
    await createIntake(dataConnect, workerClaims, errorId);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(errorId, "AUTO_APPROVED"))).data.invoiceIntake_updateMany, 1);
    await assert.rejects(() => dataConnect.executeMutation("MaterializeInvoiceIntakeV2", { ...autoPostingVariables(errorId), account: { id: "DOES-NOT-EXIST" } }));
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
    assert.equal((await dataConnect.executeMutation("ClaimInvoiceIntakeProcessing", { receiptId: errorId, processingAttempts: Number(retriedIntake.processingAttempts ?? 0) + 1 })).data.invoiceIntake_updateMany, 1);
    assert.equal((await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", aiVariables(errorId, "AUTO_APPROVED"))).data.invoiceIntake_updateMany, 1);
    await dataConnect.executeMutation("MaterializeInvoiceIntakeV2", autoPostingVariables(errorId));
    const completedRetry = await readIntake(dataConnect, errorId);
    assert.equal(completedRetry.processingStatus, "AUTO_APPROVED");
    assert.equal(completedRetry.accountingStatus, "POSTED");
    const retriedInvoices = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    const retriedTransactions = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    assert.equal(retriedInvoices.data.invoices.filter((invoice) => invoice.id === `INV-${errorId}`).length, 1);
    assert.equal(retriedTransactions.data.expenseTransactions.filter((transaction) => transaction.id === `TX-${errorId}`).length, 1);

    const finalIntakes = await queryAllData(dataConnect, "ListInvoiceIntakes", "invoiceIntakes");
    const finalInvoices = await queryAllData(dataConnect, "AdminListInvoices", "invoices");
    const finalPhotos = await queryAllData(dataConnect, "AdminListInvoicePhotos", "invoicePhotos");
    const finalTransactions = await queryAllData(dataConnect, "ListExpenseTransactions", "expenseTransactions");
    const counters = {
      intakes: finalIntakes.data.invoiceIntakes.filter((intake) => intake.receiptId.startsWith("IDEMP-")).length,
      invoices: finalInvoices.data.invoices.filter((invoice) => invoice.id.startsWith("INV-IDEMP-")).length,
      invoicePhotos: finalPhotos.data.invoicePhotos.filter((photo) => photo.id.startsWith("PHOTO-IDEMP-")).length,
      expenseTransactions: finalTransactions.data.expenseTransactions.filter((transaction) => transaction.id.startsWith("TX-IDEMP-")).length,
    };
    console.log(`Idempotence Data Connect validée : ${JSON.stringify(counters)}; CAS, photos, contraintes, retry technique, KIM et posting error.`);
  } finally {
    await deleteApp(app);
  }
}
