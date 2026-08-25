import test from "node:test";
import assert from "node:assert/strict";
import { ARCHIVE_CRITERIA, buildArchiveId, buildArchiveManifestHash, normalizeArchiveStoragePath, sortArchiveFiles } from "../lib/archive-manifest.mjs";

test("archive storage paths stay inside the receipts prefix", () => {
  assert.equal(normalizeArchiveStoragePath("receipts/2026/08/abc/original-01.jpg"), "receipts/2026/08/abc/original-01.jpg");
  assert.equal(normalizeArchiveStoragePath("/receipts/2026/08/abc/original-01.jpg"), "receipts/2026/08/abc/original-01.jpg");
  assert.equal(normalizeArchiveStoragePath("other/file.jpg"), null);
  assert.equal(normalizeArchiveStoragePath("receipts/../outside.jpg"), null);
  assert.equal(normalizeArchiveStoragePath("receipts/2026/08/abc/"), null);
});

test("archive manifest hash is deterministic and order independent", () => {
  const files = [
    { storagePath: "receipts/2026/08/b/original-01.jpg", sizeBytes: 20 },
    { storagePath: "receipts/2026/08/a/original-01.jpg", sizeBytes: 10 },
  ];
  const summary = { eligiblePhotos: 2, eligibleBytes: 30 };
  const first = buildArchiveManifestHash({ bucket: "bucket", summary, files });
  const second = buildArchiveManifestHash({ bucket: "bucket", summary, files: [...files].reverse() });
  assert.equal(first, second);
  assert.equal(first.length, 64);
  assert.equal(buildArchiveId(first), `ARCHIVE-${first.slice(0, 24)}`);
  assert.equal(ARCHIVE_CRITERIA.accountingStatus, "POSTED");
  assert.deepEqual(sortArchiveFiles(files).map((file) => file.storagePath), [files[1].storagePath, files[0].storagePath]);
});
