import assert from "node:assert/strict";
import test from "node:test";
import { selectInvoiceIntakesForAutomaticProcessing, selectStaleInvoiceIntakes } from "../lib/invoice-queue.mjs";

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
