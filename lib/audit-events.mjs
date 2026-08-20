export const AUDIT_ENTITY_INTAKE = "InvoiceIntake";

export const AUDIT_ACTIONS = Object.freeze({
  DEPOSIT_CREATED: "DEPOSIT_CREATED",
  AI_EXTRACTION_COMPLETED: "AI_EXTRACTION_COMPLETED",
  AI_PROCESSING_FAILED: "AI_PROCESSING_FAILED",
  HUMAN_CORRECTION: "HUMAN_CORRECTION",
  HUMAN_VALIDATION: "HUMAN_VALIDATION",
  TRANSACTION_CREATED: "TRANSACTION_CREATED",
  RECONCILIATION_UPDATED: "RECONCILIATION_UPDATED",
});

export function auditEventId(receiptId, action, suffix = "") {
  const safeReceiptId = String(receiptId).replace(/[^a-zA-Z0-9_-]/g, "-");
  const safeAction = String(action).replace(/[^a-zA-Z0-9_-]/g, "-");
  const safeSuffix = suffix ? `-${String(suffix).replace(/[^a-zA-Z0-9_-]/g, "-")}` : "";
  return `AUDIT-${safeReceiptId}-${safeAction}${safeSuffix}`.slice(0, 128);
}

export function auditDetails(value) {
  return JSON.stringify(value ?? {});
}

export function parseAuditDetails(value) {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return { message: value };
  }
}
