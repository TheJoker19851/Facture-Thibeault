import { createHash } from "node:crypto";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizedText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("fr-CA")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

function normalizedSku(value) {
  return String(value ?? "").replace(/[^0-9a-z]/gi, "").toUpperCase();
}

function normalizedQuantity(value) {
  const quantity = Number(value);
  return Number.isFinite(quantity) && quantity > 0 ? Number(quantity.toFixed(4)) : null;
}

function normalizedLineItems(lineItems) {
  if (!Array.isArray(lineItems)) return [];
  return lineItems.map((item) => ({
    description: normalizedText(item?.description),
    sku: normalizedSku(item?.sku),
    quantity: normalizedQuantity(item?.quantity),
    amountCents: Number.isSafeInteger(Number(item?.amountCents)) ? Number(item.amountCents) : null,
  })).filter((item) => item.description && item.quantity !== null && item.amountCents !== null);
}

/**
 * Hashes the immutable bytes of every uploaded page in sequence. Two uploads
 * of the exact same files therefore collide before a second accounting row can
 * be created, without relying on OCR or a vendor name.
 */
export async function buildInvoiceSourceHash(files = []) {
  const hash = createHash("sha256");
  for (const [index, file] of files.entries()) {
    const bytes = Buffer.from(await file.arrayBuffer());
    hash.update(`${index + 1}:${bytes.length}:`);
    hash.update(bytes);
  }
  return hash.digest("hex");
}

/**
 * Builds a conservative business fingerprint. A merchant/date/amount match by
 * itself is deliberately insufficient: an invoice number or a complete item
 * signature is required in addition to the resolved card.
 */
export function buildInvoiceBusinessFingerprint(extraction, resolvedCardId) {
  const vendor = normalizedText(extraction?.vendor);
  const invoiceDate = String(extraction?.invoiceDate ?? "").trim();
  const totalCents = Number(extraction?.totalCents);
  const invoiceNumber = normalizedText(extraction?.invoiceNumber);
  const lineItems = normalizedLineItems(extraction?.lineItems);
  const cardId = String(resolvedCardId ?? "").trim();
  if (!vendor || !/^\d{4}-\d{2}-\d{2}$/.test(invoiceDate) || !Number.isSafeInteger(totalCents) || totalCents < 0 || !cardId) {
    return null;
  }
  if (!invoiceNumber && !lineItems.length) return null;
  return sha256(JSON.stringify({
    version: 1,
    cardId,
    vendor,
    invoiceDate,
    totalCents,
    evidence: invoiceNumber ? { invoiceNumber } : { lineItems },
  }));
}

/** A posted transaction is definite only when its non-empty invoice number and
 * full business key match. We keep weaker matches in manual review.
 */
export function findDefiniteTransactionDuplicate(extraction, transactions = [], resolvedCardId = null) {
  const vendor = normalizedText(extraction?.vendor);
  const invoiceDate = String(extraction?.invoiceDate ?? "").trim();
  const totalCents = Number(extraction?.totalCents);
  const invoiceNumber = normalizedText(extraction?.invoiceNumber);
  if (!vendor || !invoiceDate || !Number.isSafeInteger(totalCents) || !invoiceNumber || !resolvedCardId) return null;
  return transactions.find((transaction) => (
    transaction.card?.id === resolvedCardId &&
    normalizedText(transaction.vendor) === vendor &&
    transaction.transactionDate === invoiceDate &&
    Number(transaction.totalCents) === totalCents &&
    normalizedText(transaction.invoiceNumber) === invoiceNumber
  )) ?? null;
}

export function exactDuplicateDecision(duplicateOfReceiptId, reason) {
  const message = reason === "SOURCE_HASH"
    ? "La même photo de facture a déjà été reçue; ce second dépôt a été écarté automatiquement."
    : "La même facture a déjà été reçue; ce second dépôt a été écarté automatiquement.";
  return {
    decision: "DUPLICATE",
    exceptions: [{
      code: "EXACT_DUPLICATE",
      fieldName: "invoiceNumber",
      message,
      aiValue: duplicateOfReceiptId,
      suggestedValue: null,
      status: "RESOLVED",
    }],
    checks: [{ code: "DUPLICATE_CHECK", passed: false, message }],
    confidenceThreshold: null,
    resolutions: { accountCode: null, cardId: null, projectId: null, statementPeriodId: null },
  };
}
