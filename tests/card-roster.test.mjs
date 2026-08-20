import assert from "node:assert/strict";
import test from "node:test";
import { normalizeCardRoster } from "../lib/card-roster.mjs";

const validRoster = Array.from({ length: 10 }, (_, index) => ({ lastFour: String(1000 + index), displayName: `Titulaire ${index + 1}` }));

test("normalizes the ten-card production roster without accepting full card numbers", () => {
  assert.equal(normalizeCardRoster(validRoster).length, 10);
  assert.throws(() => normalizeCardRoster([{ lastFour: "1234567890123456", displayName: "Titulaire" }, ...validRoster.slice(1)]), /quatre chiffres/i);
});

test("rejects duplicate, missing and wrong-sized card rosters", () => {
  assert.throws(() => normalizeCardRoster(validRoster.slice(0, 9)), /exactement 10/i);
  assert.throws(() => normalizeCardRoster([{ lastFour: "1000", displayName: "Un" }, { lastFour: "1000", displayName: "Deux" }, ...validRoster.slice(2)]), /dupliquées/i);
  assert.throws(() => normalizeCardRoster([{ lastFour: "1000", displayName: "" }, ...validRoster.slice(1)]), /titulaire/i);
});
