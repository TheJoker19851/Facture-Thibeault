import assert from "node:assert/strict";
import test from "node:test";
import {
  canAdminReprocessInvoiceIntake,
  isAutomaticPostingSettled,
  isRetryableUnextractedAiFailure,
  selectInvoiceIntakesForAutomaticProcessing,
  selectOrphanedAutoApprovedIntakes,
  selectStaleInvoiceIntakes,
} from "../lib/invoice-queue.mjs";

test("le cron limite à deux intakes pour respecter le budget de temps", () => {
  const eligible = Array.from({ length: 11 }, (_, index) => ({
    receiptId: `QUEUED-${index}`,
    processingStatus: "PROCESSING",
    processingState: index === 3 ? "RETRY" : "QUEUED",
    accountingStatus: "NOT_POSTED",
  }));
  const maxed = {
    receiptId: "MAXED-001",
    processingStatus: "NEEDS_REVIEW",
    processingState: "FAILED",
    processingAttempts: 5,
    aiErrorCode: "AI_MAX_ATTEMPTS_REACHED",
    accountingStatus: "NOT_POSTED",
  };

  const selected = selectInvoiceIntakesForAutomaticProcessing([...eligible, maxed]);
  assert.equal(selected.length, 2);
  assert.equal(selected.some((intake) => intake.receiptId === maxed.receiptId), false);
  assert.equal(selectInvoiceIntakesForAutomaticProcessing([]).length, 0);
});

test("le cron reprend une revue bloquée par un délai Gemini", () => {
  const transientReview = {
    receiptId: "TRANSIENT-001",
    processingStatus: "NEEDS_REVIEW",
    processingState: "FAILED",
    processingAttempts: 1,
    aiErrorCode: "GEMINI_TRANSIENT",
    aiModel: null,
    accountingStatus: "NOT_POSTED",
    decisionExceptions: JSON.stringify([{
      code: "AI_PROCESSING_ERROR",
      message: "Gemini n’a pas répondu dans le délai de 90 secondes.",
    }]),
  };
  const maxedReview = { ...transientReview, receiptId: "TRANSIENT-MAXED", processingAttempts: 5 };

  assert.deepEqual(
    selectInvoiceIntakesForAutomaticProcessing([transientReview, maxedReview], 10, 5)
      .map((intake) => intake.receiptId),
    ["TRANSIENT-001"],
  );
});

test("le cron repère un traitement RUNNING expiré sans reprendre une tentative récente ou maximale", () => {
  const now = Date.parse("2026-08-25T13:00:00.000Z");
  const stale = {
    receiptId: "STALE-001",
    processingStatus: "PROCESSING",
    processingState: "RUNNING",
    processingAttempts: 1,
    lastAttemptAt: "2026-08-25T12:50:00.000Z",
    accountingStatus: "NOT_POSTED",
  };
  const recent = { ...stale, receiptId: "RECENT-001", lastAttemptAt: "2026-08-25T12:56:00.000Z" };
  const maxed = { ...stale, receiptId: "MAXED-001", processingAttempts: 5 };
  const selected = selectStaleInvoiceIntakes([stale, recent, maxed], now, 7 * 60 * 1000, 5);
  assert.deepEqual(selected.map((intake) => intake.receiptId), ["STALE-001"]);
});

test("le cron reprend une erreur technique sans extraction avant la limite", () => {
  const technicalFailure = {
    receiptId: "TECHNICAL-001",
    processingStatus: "NEEDS_REVIEW",
    processingState: "FAILED",
    processingAttempts: 2,
    accountingStatus: "NOT_POSTED",
    lastError: "Le traitement IA a échoué; la facture doit être vérifiée manuellement.",
    aiModel: null,
    aiErrorCode: null,
    decisionExceptions: JSON.stringify([{
      code: "AI_PROCESSING_ERROR",
      message: "L’empreinte commerciale ne correspond plus au dépôt déjà enregistré.",
    }]),
  };

  assert.equal(isRetryableUnextractedAiFailure(technicalFailure, 5), true);
  assert.equal(isRetryableUnextractedAiFailure({ ...technicalFailure, processingAttempts: 5 }, 5), false);
  assert.deepEqual(
    selectInvoiceIntakesForAutomaticProcessing([technicalFailure], 2, 5).map((intake) => intake.receiptId),
    ["TECHNICAL-001"],
  );
});

test("le cron retente une seule fois une sortie IA entièrement invalide, y compris l'ancien état sans code", () => {
  const invalidOutput = {
    receiptId: "INVALID-OUTPUT-001",
    processingStatus: "NEEDS_REVIEW",
    processingState: "FAILED",
    processingAttempts: 1,
    accountingStatus: "NOT_POSTED",
    lastError: "La lecture IA doit être vérifiée manuellement.",
    aiModel: null,
    aiErrorCode: "AI_OUTPUT_REQUIRES_REVIEW",
    decisionExceptions: JSON.stringify([{
      code: "MISSING_REQUIRED_FIELD",
      fieldName: "vendor",
      message: "Le fournisseur est requis.",
    }]),
  };

  assert.equal(isRetryableUnextractedAiFailure(invalidOutput, 12), true);
  assert.equal(isRetryableUnextractedAiFailure({ ...invalidOutput, aiErrorCode: null }, 12), true);
  assert.equal(isRetryableUnextractedAiFailure({ ...invalidOutput, processingAttempts: 2 }, 12), false);
  assert.equal(isRetryableUnextractedAiFailure({ ...invalidOutput, aiModel: "gemini-result" }, 12), false);
  assert.deepEqual(
    selectInvoiceIntakesForAutomaticProcessing([invalidOutput], 2, 12).map((intake) => intake.receiptId),
    ["INVALID-OUTPUT-001"],
  );
});

test("le cron reprend une approbation automatique orpheline avant la limite de tentatives", () => {
  const orphaned = {
    receiptId: "AUTO-ORPHANED",
    processingStatus: "AUTO_APPROVED",
    processingState: "COMPLETED",
    processingAttempts: 1,
    accountingStatus: "NOT_POSTED",
  };
  const posted = { ...orphaned, receiptId: "AUTO-POSTED", accountingStatus: "POSTED" };
  const maxed = { ...orphaned, receiptId: "AUTO-MAXED", processingAttempts: 5 };

  assert.deepEqual(
    selectOrphanedAutoApprovedIntakes([orphaned, posted, maxed], 10, 5).map((intake) => intake.receiptId),
    ["AUTO-ORPHANED"],
  );
});

test("une approbation automatique non comptabilisée n'est pas un résultat de posting stable", () => {
  assert.equal(isAutomaticPostingSettled({ processingStatus: "AUTO_APPROVED", accountingStatus: "NOT_POSTED" }), false);
  assert.equal(isAutomaticPostingSettled({ processingStatus: "AUTO_APPROVED", accountingStatus: "POSTED" }), true);
  assert.equal(isAutomaticPostingSettled({ processingStatus: "NEEDS_REVIEW", accountingStatus: "POSTING_ERROR" }), true);
});

test("la relance ADMIN accepte une facture orpheline et attend l'expiration d'un traitement actif", () => {
  const now = Date.parse("2026-09-16T13:00:00.000Z");
  const orphaned = {
    processingStatus: "AUTO_APPROVED",
    processingState: "COMPLETED",
    accountingStatus: "NOT_POSTED",
  };
  const stale = {
    ...orphaned,
    processingStatus: "PROCESSING",
    processingState: "RUNNING",
    lastAttemptAt: "2026-09-16T12:50:00.000Z",
  };
  const recent = { ...stale, lastAttemptAt: "2026-09-16T12:56:00.000Z" };

  assert.equal(canAdminReprocessInvoiceIntake(orphaned, now), true);
  assert.equal(canAdminReprocessInvoiceIntake(stale, now), true);
  assert.equal(canAdminReprocessInvoiceIntake(recent, now), false);
  assert.equal(canAdminReprocessInvoiceIntake({ ...stale, lastAttemptAt: null }, now), true);
  assert.equal(canAdminReprocessInvoiceIntake({ ...orphaned, accountingStatus: "POSTED" }, now), false);
  assert.equal(canAdminReprocessInvoiceIntake({ ...orphaned, processingStatus: "DUPLICATE" }, now), false);
});
