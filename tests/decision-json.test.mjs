import assert from "node:assert/strict";
import test from "node:test";
import {
  DecisionJsonError,
  parseDecisionChecks,
  parseDecisionExceptions,
  serializeDecisionChecks,
  serializeDecisionExceptions,
} from "../lib/decision-json.mjs";

test("les tableaux de décision vides sont sérialisés en []", () => {
  assert.equal(serializeDecisionExceptions(), "[]");
  assert.equal(serializeDecisionChecks(null), "[]");
  assert.deepEqual(parseDecisionExceptions(null), []);
  assert.deepEqual(parseDecisionChecks(""), []);
});

test("les exceptions et vérifications sont validées après JSON.parse", () => {
  const exceptions = [{ code: "LOW_CONFIDENCE", message: "Confiance insuffisante.", status: "OPEN" }];
  const checks = [{ code: "AI_CONFIDENCE", passed: false, message: "Seuil non atteint." }];
  assert.deepEqual(parseDecisionExceptions(serializeDecisionExceptions(exceptions))[0], {
    code: "LOW_CONFIDENCE", message: "Confiance insuffisante.", status: "OPEN",
  });
  assert.deepEqual(parseDecisionChecks(serializeDecisionChecks(checks))[0], checks[0]);
});

test("un JSON invalide devient une anomalie technique explicite", () => {
  assert.throws(() => parseDecisionExceptions("{"), (error) => error instanceof DecisionJsonError && error.fieldName === "decisionExceptions");
  assert.throws(() => parseDecisionChecks(JSON.stringify([{ code: "BROKEN", passed: "false", message: "x" }])), /decisionChecks/);
  assert.throws(() => serializeDecisionExceptions([{ code: "BROKEN" }]), /decisionExceptions/);
});
