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

function lineItemAmount(value) {
  const amount = Number(value);
  // Discounts, coupons, credits and returns are valid negative lines.
  return Number.isSafeInteger(amount) ? amount : null;
}

function lineItemQuantity(value) {
  const quantity = Number(value);
  return Number.isFinite(quantity) && quantity > 0 ? Number(quantity.toFixed(4)) : null;
}

/**
 * Normalize line items at the boundary shared by OCR, review and posting.
 * Signed amounts preserve discounts, coupons, credits and returns.
 * Classification fields are optional here because the OCR only extracts the
 * evidence; the deterministic classifier fills them afterwards.
 */
export function normalizeInvoiceLineItems(input) {
  if (!Array.isArray(input)) return [];
  return input.map((item, index) => ({
    sequence: index + 1,
    description: String(item?.description ?? "").trim(),
    quantity: lineItemQuantity(item?.quantity),
    unitPriceCents: item?.unitPriceCents == null ? null : lineItemAmount(item.unitPriceCents),
    amountCents: lineItemAmount(item?.amountCents),
    sku: typeof item?.sku === "string" && item.sku.trim() ? item.sku.trim() : null,
    category: typeof item?.category === "string" && item.category.trim() ? item.category.trim() : null,
    accountCode: typeof item?.accountCode === "string" && item.accountCode.trim() ? item.accountCode.trim() : null,
    classificationSource: typeof item?.classificationSource === "string" ? item.classificationSource : null,
    classificationConfidence: Number.isFinite(Number(item?.classificationConfidence)) ? Number(item.classificationConfidence) : null,
    classificationStatus: typeof item?.classificationStatus === "string" ? item.classificationStatus : null,
    classificationNote: typeof item?.classificationNote === "string" ? item.classificationNote.trim() : null,
  }));
}

export function invoiceLineItemsSubtotalCents(lineItems) {
  return normalizeInvoiceLineItems(lineItems).reduce((sum, item) => sum + (item.amountCents ?? 0), 0);
}

/**
 * Repair only penny-level OCR drift when a Quebec invoice contains both TPS
 * and TVQ and the four extracted amounts already add up. Larger or unusual tax
 * treatments remain untouched for review instead of being guessed.
 */
export function reconcileQuebecSalesTaxes(subtotalCents, tpsCents, tvqCents, totalCents) {
  const current = {
    subtotalCents: Number(subtotalCents),
    tpsCents: Number(tpsCents),
    tvqCents: Number(tvqCents),
    totalCents: Number(totalCents),
  };
  const valid = Object.values(current).every((amount) => Number.isSafeInteger(amount) && amount >= 0);
  const addsUp = valid && Math.abs(current.subtotalCents + current.tpsCents + current.tvqCents - current.totalCents) <= 1;
  if (!addsUp || current.tpsCents === 0 || current.tvqCents === 0) return { ...current, reconciled: false };

  const approximateSubtotal = Math.round(current.totalCents / 1.14975);
  const candidates = [];
  for (let subtotal = Math.max(0, approximateSubtotal - 10); subtotal <= approximateSubtotal + 10; subtotal += 1) {
    const tps = Math.round(subtotal * 0.05);
    const roundedTvq = Math.round(subtotal * 0.09975);
    const roundingRemainder = current.totalCents - subtotal - tps - roundedTvq;
    if (Math.abs(roundingRemainder) > 1) continue;
    const tvq = roundedTvq + roundingRemainder;
    if (tvq < 0) continue;
    candidates.push({
      subtotalCents: subtotal,
      tpsCents: tps,
      tvqCents: tvq,
      totalCents: current.totalCents,
      drift: Math.abs(subtotal - current.subtotalCents) + Math.abs(tps - current.tpsCents) + Math.abs(tvq - current.tvqCents),
    });
  }
  candidates.sort((left, right) => left.drift - right.drift);
  const best = candidates[0];
  if (!best || best.drift === 0 || best.drift > 6) return { ...current, reconciled: false };
  return {
    subtotalCents: best.subtotalCents,
    tpsCents: best.tpsCents,
    tvqCents: best.tvqCents,
    totalCents: best.totalCents,
    reconciled: true,
  };
}

/**
 * Some receipts (notably fuel receipts) print each visible line tax-included
 * even though the document also supplies a coherent pre-tax subtotal and tax
 * split. Convert those gross lines deterministically to net accounting lines
 * so the category table still reconciles to the invoice subtotal.
 */
export function reconcileInvoiceLineItemsToSubtotal(lineItems, subtotalCents, totalCents = subtotalCents) {
  const normalized = normalizeInvoiceLineItems(lineItems);
  const subtotal = Number(subtotalCents);
  const total = Number(totalCents);
  const linesTotalCents = invoiceLineItemsSubtotalCents(normalized);
  const validAmounts = Number.isSafeInteger(subtotal) && subtotal >= 0 && Number.isSafeInteger(total) && total >= 0;
  const matchesSubtotal = normalized.length > 0 && validAmounts && Math.abs(linesTotalCents - subtotal) <= 1;
  const matchesTaxIncludedTotal = normalized.length > 0 && validAmounts && total > 0 && Math.abs(linesTotalCents - total) <= 1;

  if (matchesSubtotal || !matchesTaxIncludedTotal) {
    return { lineItems: normalized, reconciled: false, basis: matchesSubtotal ? "SUBTOTAL" : "UNMATCHED", linesTotalCents };
  }

  let allocatedSubtotalCents = 0;
  const reconciled = normalized.map((item, index) => {
    const isLast = index === normalized.length - 1;
    const amountCents = isLast
      ? subtotal - allocatedSubtotalCents
      : Math.round(subtotal * Number(item.amountCents ?? 0) / linesTotalCents);
    allocatedSubtotalCents += amountCents;
    return {
      ...item,
      // A printed unit price that reconciles to a gross amount must not be
      // presented as the computed pre-tax unit price.
      unitPriceCents: null,
      amountCents,
    };
  });

  return { lineItems: reconciled, reconciled: true, basis: "TOTAL_TAX_INCLUDED", linesTotalCents };
}

/**
 * Validate the lines that are about to become part of an accounting entry.
 * A posting must contain at least one line and its net signed line total must
 * reconcile to the invoice subtotal within one cent. Tax-included receipt
 * lines are first normalized against the coherent invoice total.
 */
export function validateInvoiceLineItemsForCommit(lineItems, subtotalCents, totalCents = subtotalCents) {
  const reconciliation = reconcileInvoiceLineItemsToSubtotal(lineItems, subtotalCents, totalCents);
  const normalized = reconciliation.lineItems;
  const errors = [];
  if (!normalized.length) errors.push("Au moins une ligne d’article est requise avant la comptabilisation.");
  normalized.forEach((item, index) => {
    const label = `Ligne ${index + 1}`;
    if (!item.description) errors.push(`${label} : la description est manquante.`);
    if (item.quantity == null) errors.push(`${label} : la quantité doit être positive.`);
    if (item.amountCents == null) errors.push(`${label} : le montant est requis.`);
    if (item.quantity != null && item.unitPriceCents != null && item.amountCents != null && Math.abs(Math.round(item.quantity * item.unitPriceCents) - item.amountCents) > 1) {
      errors.push(`${label} : quantité × prix unitaire ne correspond pas au montant.`);
    }
    if (!item.accountCode) errors.push(`${label} : le compte comptable doit être confirmé.`);
  });
  const subtotal = Number(subtotalCents);
  const linesSubtotalCents = invoiceLineItemsSubtotalCents(normalized);
  if (!Number.isSafeInteger(subtotal) || subtotal < 0) {
    errors.push("Le sous-total de la facture est invalide.");
  } else if (Math.abs(linesSubtotalCents - subtotal) > 1) {
    errors.push(`Les lignes totalisent ${linesSubtotalCents} cents, mais le sous-total est de ${subtotal} cents.`);
  }
  return {
    ok: errors.length === 0,
    errors,
    lineItems: normalized,
    linesSubtotalCents,
    differenceCents: linesSubtotalCents - subtotal,
  };
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
  let subtotalCents = Number(input.subtotalCents);
  let tpsCents = Number(input.tpsCents ?? 0);
  let tvqCents = Number(input.tvqCents ?? 0);
  const totalCents = Number(input.totalCents);
  const taxReconciliation = reconcileQuebecSalesTaxes(subtotalCents, tpsCents, tvqCents, totalCents);
  subtotalCents = taxReconciliation.subtotalCents;
  tpsCents = taxReconciliation.tpsCents;
  tvqCents = taxReconciliation.tvqCents;
  const rawLineItems = Array.isArray(input.lineItems) ? input.lineItems : [];
  const lineItems = reconcileInvoiceLineItemsToSubtotal(rawLineItems, subtotalCents, totalCents).lineItems;

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

  lineItems.forEach((item, index) => {
    if (!item.description) errors.push(`Ligne ${index + 1} : la description est manquante.`);
    if (item.quantity == null) errors.push(`Ligne ${index + 1} : la quantité doit être positive.`);
    if (item.amountCents == null) errors.push(`Ligne ${index + 1} : le montant est requis.`);
  });

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
      lineItems,
      lineItemsSubtotalCents: invoiceLineItemsSubtotalCents(lineItems),
      lineItemsMatchSubtotal: lineItems.length > 0 && Math.abs(invoiceLineItemsSubtotalCents(lineItems) - subtotalCents) <= 1,
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

/**
 * Classify every extracted line independently using the existing references.
 * @param {{vendor?: string, lineItems?: Array<Record<string, any>>, skuReferences?: Array<Record<string, any>>, accounts?: Array<Record<string, any>>}} options
 */
export function classifyInvoiceLineItems({ vendor, lineItems = [], skuReferences = [], accounts = [] } = {}) {
  return normalizeInvoiceLineItems(lineItems).map((item) => {
    const classification = classifyInvoice({
      vendor,
      sku: item.sku,
      category: item.category,
    }, skuReferences, accounts);
    return {
      ...item,
      category: classification.category,
      accountCode: classification.accountCode,
      classificationSource: classification.source,
      classificationConfidence: classification.confidence,
      classificationStatus: classification.resolution,
      classificationNote: classification.note,
    };
  });
}

