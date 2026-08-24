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
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
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
 * review until Kim validates it. When the AI cannot name a category, the
 * active Divers account is only a proposal; it must never auto-post without
 * Kim confirming it.
 *
 * @param {{vendor?: string, sku?: string, category?: string}} input
 * @param {Array<{merchant: string, sku: string, category?: string, accountCode?: string, status?: string}>} skuReferences
 * @param {Array<{number?: string, code?: string, label: string, type?: string, status?: string}>} accounts
 * @returns {{accountCode: string | null, category: string, source: string, confidence: number, status: "TO_VERIFY" | "TO_VALIDATE", note: string, resolution: "RESOLVED" | "PROPOSED" | "UNRESOLVED" | "AMBIGUOUS", skuState: "NOT_PRESENT" | "RESOLVED" | "UNKNOWN" | "AMBIGUOUS", candidates: string[]}}
 */
export function classifyInvoice(input, skuReferences = [], accounts = []) {
  const vendor = normalized(input?.vendor);
  const sku = normalizedSku(input?.sku);
  const suppliedCategory = typeof input?.category === "string" ? input.category.trim() : "";
  const category = suppliedCategory || "Divers";
  const skuMatches = sku && vendor
    ? skuReferences.filter((reference) => {
      const merchant = normalized(reference.merchant);
      return normalizedSku(reference.sku) === sku && Boolean(merchant) && (vendor === merchant || vendor.includes(merchant) || merchant.includes(vendor));
    })
    : [];
  const skuCandidates = [...new Set(skuMatches.map((reference) => reference.accountCode).filter(Boolean))];
  const skuState = !sku
    ? "NOT_PRESENT"
    : skuMatches.length === 0
      ? "UNKNOWN"
      : skuCandidates.length > 1
        ? "AMBIGUOUS"
        : "RESOLVED";

  if (sku && vendor) {
    if (skuCandidates.length > 1) {
      return {
        accountCode: null,
        category,
        source: "SKU_REFERENCE",
        confidence: 0,
        status: "TO_VERIFY",
        note: "Plusieurs comptes sont associés au même SKU et fournisseur.",
        resolution: "AMBIGUOUS",
        skuState,
        candidates: skuCandidates,
      };
    }
    const skuMatch = skuMatches[0];
    if (skuMatch?.accountCode) {
      const validated = skuMatch.status === "Validé" || skuMatch.status === "VALIDATED";
      return {
        accountCode: skuMatch.accountCode,
        category: skuMatch.category || category,
        source: "SKU_REFERENCE",
        confidence: validated ? 0.99 : 0.82,
        status: validated ? "TO_VALIDATE" : "TO_VERIFY",
        note: validated ? "SKU et fournisseur reconnus; une validation manuelle reste requise." : "SKU reconnu, mais la référence doit encore être confirmée.",
        resolution: validated ? "RESOLVED" : "UNRESOLVED",
        skuState,
        candidates: skuCandidates,
      };
    }
  }

  const accountMatches = accounts.filter((account) => {
    const active = !account.status || account.status === "ACTIVE" || account.status === "Actif";
    const expenseType = !account.type || account.type === "EXPENSE" || account.type === "Dépense";
    return active && expenseType && normalized(account.label) === normalized(category);
  });
  const accountCandidates = [...new Set(accountMatches.map((account) => account.number ?? account.code).filter(Boolean))];
  if (accountCandidates.length > 1) {
    return {
      accountCode: null,
      category,
      source: "CATEGORY_MATCH",
      confidence: 0,
      status: "TO_VERIFY",
      note: "Plusieurs comptes correspondent exactement à la catégorie.",
      resolution: "AMBIGUOUS",
      skuState,
      candidates: accountCandidates,
    };
  }
  const accountMatch = accountMatches[0];
  if (accountMatch) {
    return {
      accountCode: accountMatch.number ?? accountMatch.code,
      category: accountMatch.label,
      source: suppliedCategory ? "CATEGORY_MATCH" : "DEFAULT_CATEGORY",
      confidence: suppliedCategory ? 0.7 : 0.35,
      status: "TO_VERIFY",
      note: suppliedCategory
        ? "Catégorie rapprochée du référentiel; une validation manuelle reste requise."
        : "Aucune catégorie précise n’a été extraite; le compte Divers est proposé pour validation manuelle.",
      resolution: suppliedCategory ? "RESOLVED" : "PROPOSED",
      skuState,
      candidates: accountCandidates,
    };
  }

  return {
    accountCode: null,
    category,
    source: "UNCLASSIFIED",
    confidence: 0,
    status: "TO_VERIFY",
    note: "Aucune correspondance fiable; le compte comptable doit être confirmé avant la création de l’écriture.",
    resolution: "UNRESOLVED",
    skuState,
    candidates: [],
  };
}

