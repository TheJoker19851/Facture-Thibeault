export const INVOICE_CRON_BATCH_SIZE = 10;

export function selectInvoiceIntakesForAutomaticProcessing(intakes, limit = INVOICE_CRON_BATCH_SIZE) {
  return intakes
    .filter((intake) =>
      intake.accountingStatus !== "POSTED" &&
      intake.processingStatus === "PROCESSING" &&
      (intake.processingState === "QUEUED" || intake.processingState === "RETRY"),
    )
    .slice(0, limit);
}
