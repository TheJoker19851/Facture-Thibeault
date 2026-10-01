import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { requiresSinglePhotoReview } from "../lib/invoice-photo-policy.mjs";

test("one image can proceed; multi-image and invalid intakes require review", () => {
  assert.equal(requiresSinglePhotoReview(1), false);
  for (const count of [0, 2, 5, -1, 1.5, null]) {
    assert.equal(requiresSinglePhotoReview(count), true);
  }
});

test("manual posting also rejects a grouped intake before materialization", async () => {
  const route = await readFile(new URL("../app/api/invoices/commit-intake/route.ts", import.meta.url), "utf8");
  assert.match(route, /if \(requiresSinglePhotoReview\(intake\.photoCount\)\)/);
  assert.match(route, /code: "MULTI_PHOTO_INTAKE"/);
  assert.ok(route.indexOf("requiresSinglePhotoReview(intake.photoCount)") < route.indexOf("materializeInvoiceIntake(dataConnect"));
});
