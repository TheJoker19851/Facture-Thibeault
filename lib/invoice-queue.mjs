import {
  DEFAULT_INVOICE_AI_MAX_ATTEMPTS,
  hasReachedInvoiceAiMaxAttempts,
  isTransientGeminiCapacityRetry,
} from "./gemini-retry.mjs";

export const INVOICE_CRON_BATCH_SIZE = 10;
export const INVOICE_CRON_STALE_AFTER_MS = 7 * 60 * 1000;

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
      return queued || transientReview;
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
