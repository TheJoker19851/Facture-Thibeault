/**
 * Shared, deterministic invoice-processing contracts.
 *
 * Gemini will eventually produce the extraction payload consumed here. The
 * classifier intentionally remains deterministic so an AI suggestion cannot
 * silently become an accounting entry.
 */

function normalized(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

function normalizedSku(value) {
  return String(value ?? "").replace(/[^0-9a-z]/gi, "").toUpperCase();
}

function isIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/**
 * Validate and normalize the structured output expected from OCR/Gemini.
 * Amounts are integers in CAD cents and totals must reconcile within one cent.
 *
 * @param {unknown} candidate
 * @returns {{ok: true, value: object, errors: []} | {ok: false, value: null, errors: string[]}}
 */
export function validateInvoiceExtraction(candidate) {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { ok: false, value: null, errors: ["La réponse OCR n'est pas un objet."] };
  }

  const input = /** @type {Record<string, unknown>} */ (candidate);
  const errors = [];
  const vendor = typeof input.vendor === "string" ? input.vendor.trim() : "";
  const invoiceNumber = typeof input.invoiceNumber === "string" ? input.invoiceNumber.trim() : null;
  const invoiceDate = input.invoiceDate == null ? null : String(input.invoiceDate);
  const subtotalCents = Number(input.subtotalCents);
  const tpsCents = Number(input.tpsCents ?? 0);
  const tvqCents = Number(input.tvqCents ?? 0);
  const totalCents = Number(input.totalCents);

  if (!vendor) errors.push("Le fournisseur est manquant.");
  if (invoiceDate !== null && !isIsoDate(invoiceDate)) errors.push("La date de facture doit être AAAA-MM-JJ.");
  for (const [label, amount] of [["subtotalCents", subtotalCents], ["tpsCents", tpsCents], ["tvqCents", tvqCents], ["totalCents", totalCents]]) {
    if (!Number.isSafeInteger(amount) || amount < 0) errors.push(`${label} doit être un nombre entier positif en cents.`);
  }
  if (Number.isSafeInteger(subtotalCents) && Number.isSafeInteger(tpsCents) && Number.isSafeInteger(tvqCents) && Number.isSafeInteger(totalCents)) {
    if (Math.abs(subtotalCents + tpsCents + tvqCents - totalCents) > 1) {
      errors.push("Le total ne correspond pas au sous-total et aux taxes.");
    }
  }

  if (errors.length) return { ok: false, value: null, errors };
  return {
    ok: true,
    errors: [],
    value: {
      vendor,
      invoiceNumber,
      invoiceDate,
      subtotalCents,
      tpsCents,
      tvqCents,
      totalCents,
      currency: typeof input.currency === "string" && input.currency.trim() ? input.currency.trim().toUpperCase() : "CAD",
      sku: typeof input.sku === "string" && input.sku.trim() ? input.sku.trim() : null,
      projectId: typeof input.projectId === "string" && input.projectId.trim() ? input.projectId.trim() : null,
    },
  };
}

/**
 * Apply the accounting rule order. A SKU reference wins only when both SKU and
 * merchant match. A category match is useful as a proposal, but remains in
 * review until Kim validates it. Unknown values never receive an account code.
 *
 * @param {{vendor?: string, sku?: string, category?: string}} input
 * @param {Array<{merchant: string, sku: string, category?: string, accountCode?: string, status?: string}>} skuReferences
 * @param {Array<{code: string, label: string}>} accounts
 * @returns {{accountCode: string | null, category: string, source: string, confidence: number, status: "TO_VERIFY" | "TO_VALIDATE", note: string}}
 */
export function classifyInvoice(input, skuReferences = [], accounts = []) {
  const vendor = normalized(input?.vendor);
  const sku = normalizedSku(input?.sku);
  const category = typeof input?.category === "string" ? input.category.trim() : "";

  if (sku && vendor) {
    const skuMatch = skuReferences.find((reference) => {
      const merchant = normalized(reference.merchant);
      return normalizedSku(reference.sku) === sku && Boolean(merchant) && (vendor === merchant || vendor.includes(merchant) || merchant.includes(vendor));
    });
    if (skuMatch?.accountCode) {
      const validated = skuMatch.status === "Validé" || skuMatch.status === "VALIDATED";
      return {
        accountCode: skuMatch.accountCode,
        category: skuMatch.category || category || "Divers",
        source: "SKU_REFERENCE",
        confidence: validated ? 0.99 : 0.82,
        status: validated ? "TO_VALIDATE" : "TO_VERIFY",
        note: validated ? "SKU et fournisseur reconnus; validation de Kim requise." : "SKU reconnu, mais la référence doit encore être confirmée.",
      };
    }
  }

  const accountMatch = accounts.find((account) => normalized(account.label) === normalized(category));
  if (accountMatch) {
    return {
      accountCode: accountMatch.code,
      category: accountMatch.label,
      source: "CATEGORY_MATCH",
      confidence: 0.7,
      status: "TO_VERIFY",
      note: "Catégorie rapprochée du référentiel; validation de Kim requise.",
    };
  }

  return {
    accountCode: null,
    category: category || "Divers",
    source: "UNCLASSIFIED",
    confidence: 0,
    status: "TO_VERIFY",
    note: "Aucune règle fiable; le compte comptable doit être choisi manuellement.",
  };
}

