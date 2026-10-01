import assert from "node:assert/strict";
import test from "node:test";
import { requiresSinglePhotoReview } from "../lib/invoice-photo-policy.mjs";

test("one image can proceed; multi-image and invalid intakes require review", () => {
  assert.equal(requiresSinglePhotoReview(1), false);
  for (const count of [0, 2, 5, -1, 1.5, null]) {
    assert.equal(requiresSinglePhotoReview(count), true);
  }
});
