import assert from "node:assert/strict";
import test from "node:test";
import { isTransientGeminiCapacityRetry, transientGeminiErrorCode } from "../lib/gemini-retry.mjs";

function technicalIntake(overrides = {}) {
  return {
    processingStatus: "NEEDS_REVIEW",
    accountingStatus: "NOT_POSTED",
    aiErrorCode: "GEMINI_TRANSIENT",
    aiModel: null,
    decisionExceptions: JSON.stringify([{ code: "AI_PROCESSING_ERROR", message: "Gemini capacity temporarily unavailable (503)." }]),
    ...overrides,
  };
}

test("admet une erreur de capacité réellement issue de Gemini", () => {
  assert.equal(transientGeminiErrorCode("GEMINI", new Error("High demand, try again later (503)")), "GEMINI_TRANSIENT");
  assert.equal(isTransientGeminiCapacityRetry(technicalIntake()), true);
});

test("n'admet jamais UNKNOWN_PROJECT", () => {
  assert.equal(isTransientGeminiCapacityRetry(technicalIntake({
    aiErrorCode: null,
    aiModel: "gemini-2.5-flash",
    decisionExceptions: JSON.stringify([{ code: "UNKNOWN_PROJECT", message: "Projet inconnu." }]),
  })), false);
});

test("n'admet pas une erreur Storage ou Data Connect même si elle mentionne une indisponibilité", () => {
  assert.equal(transientGeminiErrorCode("STORAGE", new Error("Storage temporarily unavailable (503)")), null);
  assert.equal(transientGeminiErrorCode("DATA_CONNECT", Object.assign(new Error("Data Connect unavailable"), { isRetryable: true })), null);
});

test("refuse les états ou exceptions techniques incomplets", () => {
  assert.equal(isTransientGeminiCapacityRetry(technicalIntake({ accountingStatus: "POSTED" })), false);
  assert.equal(isTransientGeminiCapacityRetry(technicalIntake({ aiModel: "gemini-2.5-flash" })), false);
  assert.equal(isTransientGeminiCapacityRetry(technicalIntake({ decisionExceptions: "not-json" })), false);
});
