import { createHash } from "node:crypto";

export const ARCHIVE_SCHEMA_VERSION = 1;
export const ARCHIVE_STORAGE_PREFIX = "receipts/";
export const ARCHIVE_PURGE_CONFIRMATION = "ARCHIVE_PURGE";

export const ARCHIVE_CRITERIA = Object.freeze({
  storagePrefix: ARCHIVE_STORAGE_PREFIX,
  accountingStatus: "POSTED",
  relation: "InvoicePhoto.storagePath",
  dataPolicy: "Photos only; Invoice, InvoicePhoto and accounting rows are retained.",
});

export function normalizeArchiveStoragePath(value) {
  if (typeof value !== "string") return null;
  const path = value.trim().replace(/^\/+/, "");
  if (!path.startsWith(ARCHIVE_STORAGE_PREFIX) || path.endsWith("/")) return null;
  const segments = path.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) return null;
  return path;
}

export function sortArchiveFiles(files) {
  return [...files].sort((left, right) => String(left.storagePath).localeCompare(String(right.storagePath)));
}

export function buildArchiveManifestHash({ bucket, summary, files }) {
  const canonical = {
    schemaVersion: ARCHIVE_SCHEMA_VERSION,
    bucket,
    criteria: ARCHIVE_CRITERIA,
    summary,
    files: sortArchiveFiles(files),
  };
  return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}

export function buildArchiveId(manifestHash) {
  return `ARCHIVE-${String(manifestHash).slice(0, 24)}`;
}
