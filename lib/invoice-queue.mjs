import {
  DEFAULT_INVOICE_AI_MAX_ATTEMPTS,
  hasReachedInvoiceAiMaxAttempts,
  isTransientGeminiCapacityRetry,
} from "./gemini-retry.mjs";

// Processing is intentionally sequential. Two worst-case 90-second AI calls
// stay below both the 240-second GitHub caller timeout and the 300-second
// worker limit, leaving enough time for queue recovery and deduplication.
export const INVOICE_CRON_BATCH_SIZE = 2;
export const INVOICE_CRON_STALE_AFTER_MS = 7 * 60 * 1000;

const ADMIN_REPROCESS_BLOCKED_STATUSES = new Set(["DELETED", "DUPLICATE"]);
const AI_PROCESSING_ERROR_MESSAGE = "Le traitement IA a échoué; la facture doit être vérifiée manuellement.";
const AI_OUTPUT_REQUIRES_REVIEW_MESSAGE = "La lecture IA doit être vérifiée manuellement.";
const AI_OUTPUT_REQUIRES_REVIEW_CODE = "AI_OUTPUT_REQUIRES_REVIEW";
// A completely unusable structured response is usually model variance, not a
// business exception. Give it one automatic second attempt, then leave it to
// ADMIN so a poor photo cannot consume the daily worker indefinitely.
export const AI_OUTPUT_AUTOMATIC_MAX_ATTEMPTS = 2;

export function isRetryableUnextractedAiFailure(
  intake,
  maxAttempts = DEFAULT_INVOICE_AI_MAX_ATTEMPTS,
) {
  if (
    !intake ||
    intake.processingStatus !== "NEEDS_REVIEW" ||
    intake.processingState !== "FAILED" ||
    intake.accountingStatus !== "NOT_POSTED" ||
    intake.aiModel ||
    Number(intake.processingAttempts ?? 0) >= maxAttempts
  ) return false;

  const attempts = Number(intake.processingAttempts ?? 0);
  const invalidAiOutput = intake.lastError === AI_OUTPUT_REQUIRES_REVIEW_MESSAGE &&
    (intake.aiErrorCode === AI_OUTPUT_REQUIRES_REVIEW_CODE || !intake.aiErrorCode) &&
    attempts < Math.min(maxAttempts, AI_OUTPUT_AUTOMATIC_MAX_ATTEMPTS);
  if (invalidAiOutput) return true;
  if (intake.lastError !== AI_PROCESSING_ERROR_MESSAGE) return false;

  try {
    const exceptions = JSON.parse(intake.decisionExceptions ?? "[]");
    return Array.isArray(exceptions) && exceptions.some((exception) => exception?.code === "AI_PROCESSING_ERROR");
  } catch {
    return false;
  }
}

export function canAdminReprocessInvoiceIntake(
  intake,
  now = Date.now(),
  staleAfterMs = INVOICE_CRON_STALE_AFTER_MS,
) {
  if (!intake || intake.accountingStatus !== "NOT_POSTED" || ADMIN_REPROCESS_BLOCKED_STATUSES.has(intake.processingStatus)) {
    return false;
  }
  if (intake.processingState !== "RUNNING") return true;
  const lastAttemptAt = Date.parse(intake.lastAttemptAt ?? "");
  // A proper RUNNING claim always writes lastAttemptAt atomically. A missing
  // timestamp therefore indicates an orphaned legacy/corrupt claim and is
  // safe for an explicit ADMIN recovery.
  return !Number.isFinite(lastAttemptAt) || now - lastAttemptAt >= staleAfterMs;
}

export function isAutomaticPostingSettled(intake) {
  return intake?.accountingStatus === "POSTED" || intake?.accountingStatus === "POSTING_ERROR";
}

export function selectOrphanedAutoApprovedIntakes(
  intakes,
  limit = INVOICE_CRON_BATCH_SIZE,
  maxAttempts = DEFAULT_INVOICE_AI_MAX_ATTEMPTS,
) {
  return intakes
    .filter((intake) => (
      intake.processingStatus === "AUTO_APPROVED" &&
      intake.accountingStatus === "NOT_POSTED" &&
      Number(intake.processingAttempts ?? 0) < maxAttempts
    ))
    .slice(0, limit);
}

export function selectInvoiceIntakesForAutomaticProcessing(
  intakes,
  limit = INVOICE_CRON_BATCH_SIZE,
  maxAttempts = DEFAULT_INVOICE_AI_MAX_ATTEMPTS,
) {
  return intakes
    .filter((intake) => {
      if (intake.accountingStatus === "POSTED") return false;
      const queued = intake.processingStatus === "PROCESSING" &&
        (intake.processingState === "QUEUED" || intake.processingState === "RETRY");
      const transientReview = isTransientGeminiCapacityRetry(intake) &&
        !hasReachedInvoiceAiMaxAttempts(intake, maxAttempts);
      const technicalReview = isRetryableUnextractedAiFailure(intake, maxAttempts);
      return queued || transientReview || technicalReview;
    })
    .slice(0, limit);
}

export function selectStaleInvoiceIntakes(intakes, now = Date.now(), staleAfterMs = INVOICE_CRON_STALE_AFTER_MS, maxAttempts = Number.POSITIVE_INFINITY) {
  return intakes.filter((intake) => {
    if (intake.accountingStatus === "POSTED" || intake.processingStatus !== "PROCESSING" ||
      intake.processingState !== "RUNNING" || Number(intake.processingAttempts ?? 0) >= maxAttempts) return false;
    const lastAttemptAt = Date.parse(intake.lastAttemptAt ?? "");
    return Number.isFinite(lastAttemptAt) && now - lastAttemptAt >= staleAfterMs;
  });
}
