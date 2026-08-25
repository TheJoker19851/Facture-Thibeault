import assert from "node:assert/strict";
import test from "node:test";
import { selectInvoiceIntakesForAutomaticProcessing } from "../lib/invoice-queue.mjs";

test("le cron limite à dix intakes et exclut le maximum atteint", () => {
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
  assert.equal(selected.length, 10);
  assert.equal(selected.some((intake) => intake.receiptId === maxed.receiptId), false);
  assert.equal(selectInvoiceIntakesForAutomaticProcessing([]).length, 0);
});
