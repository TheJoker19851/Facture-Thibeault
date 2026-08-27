import test from "node:test";
import assert from "node:assert/strict";
import { ARCHIVE_CAPACITY_STATUS, ARCHIVE_RECOMMENDATION_STATUS, ARCHIVE_STORAGE_TARGET_BYTES, archiveCapacityBand, buildArchiveRecommendation } from "../lib/archive-policy.mjs";

test("archive capacity uses a four gigabyte operational target", () => {
  assert.equal(ARCHIVE_STORAGE_TARGET_BYTES, 4 * 1024 * 1024 * 1024);
  assert.equal(archiveCapacityBand(1 * 1024 * 1024 * 1024).status, ARCHIVE_CAPACITY_STATUS.NORMAL);
  assert.equal(archiveCapacityBand(2 * 1024 * 1024 * 1024).status, ARCHIVE_CAPACITY_STATUS.PLAN);
  assert.equal(archiveCapacityBand(3 * 1024 * 1024 * 1024).status, ARCHIVE_CAPACITY_STATUS.RECOMMENDED);
  assert.equal(archiveCapacityBand(4 * 1024 * 1024 * 1024).status, ARCHIVE_CAPACITY_STATUS.PRIORITY);
});

test("archive policy reports no action when no photo is eligible", () => {
  const result = buildArchiveRecommendation({ eligiblePhotos: 0, eligibleBytes: 0 });
  assert.equal(result.status, ARCHIVE_RECOMMENDATION_STATUS.NONE);
  assert.equal(result.verificationItems, 0);
});

test("archive policy recommends planning a manual archive for eligible photos", () => {
  const result = buildArchiveRecommendation({ eligiblePhotos: 3, eligibleBytes: 4096 });
  assert.equal(result.status, ARCHIVE_RECOMMENDATION_STATUS.PLAN);
  assert.equal(result.eligiblePhotos, 3);
  assert.equal(result.eligibleBytes, 4096);
});

test("archive policy asks for verification when Storage links have anomalies", () => {
  const result = buildArchiveRecommendation({ eligiblePhotos: 3, unlinkedStorageObjects: 1, duplicateLinkedPaths: 1 });
  assert.equal(result.status, ARCHIVE_RECOMMENDATION_STATUS.REVIEW);
  assert.equal(result.verificationItems, 2);
});
