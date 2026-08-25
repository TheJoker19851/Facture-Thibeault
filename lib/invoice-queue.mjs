export const INVOICE_CRON_BATCH_SIZE = 10;
export const INVOICE_CRON_STALE_AFTER_MS = 7 * 60 * 1000;

export function selectInvoiceIntakesForAutomaticProcessing(intakes, limit = INVOICE_CRON_BATCH_SIZE) {
  return intakes
    .filter((intake) =>
      intake.accountingStatus !== "POSTED" &&
      intake.processingStatus === "PROCESSING" &&
      (intake.processingState === "QUEUED" || intake.processingState === "RETRY"),
    )
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
