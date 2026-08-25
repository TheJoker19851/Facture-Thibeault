import test from "node:test";
import assert from "node:assert/strict";
import { manualAdjustmentsTotalCents, normalizeManualAdjustmentRows, parseManualAdjustmentRows, serializeManualAdjustmentRows } from "../lib/manual-adjustments.mjs";

test("les ajustements manuels sont bornés à cinq lignes et restent en cents", () => {
  const rows = normalizeManualAdjustmentRows([
    { description: "  Paiement 6000  ", amountCents: -600000 },
    { description: "Description trop longue".repeat(20), amountCents: "1250" },
    { description: "Ignorée", amountCents: Number.NaN },
    { description: "Sixième", amountCents: 10 },
    { description: "Septième", amountCents: 20 },
    { description: "Hors limite", amountCents: 30 },
  ]);
  assert.equal(rows.length, 5);
  assert.equal(rows[0].description, "Paiement 6000");
  assert.equal(rows[0].amountCents, -600000);
  assert.equal(rows[2].amountCents, null);
  assert.equal(manualAdjustmentsTotalCents(rows), -598720);
});

test("les ajustements se sérialisent et se relisent avec des lignes vides", () => {
  const value = serializeManualAdjustmentRows([{ description: "Crédit", amountCents: -1250 }]);
  assert.deepEqual(parseManualAdjustmentRows(value).slice(0, 2), [
    { index: 1, description: "Crédit", amountCents: -1250 },
    { index: 2, description: "", amountCents: null },
  ]);
});
