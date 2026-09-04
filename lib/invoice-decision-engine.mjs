import { validateInvoiceExtraction } from "./invoice-processing.mjs";
import { uniqueCreditCards } from "./credit-card-selection.mjs";
export {
  DecisionJsonError,
  parseDecisionChecks,
  parseDecisionExceptions,
  serializeDecision,
  serializeDecisionChecks,
  serializeDecisionExceptions,
} from "./decision-json.mjs";

export const DEFAULT_INVOICE_AI_MIN_CONFIDENCE = 0.95;

const PROCESSING_STATUS = {
  AUTO_APPROVED: "AUTO_APPROVED",
  NEEDS_REVIEW: "NEEDS_REVIEW",
};

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function safeCents(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function exceptionKey(exception) {
  return `${exception.code}:${exception.fieldName ?? ""}`;
}

function addException(exceptions, exception) {
  if (!exceptions.some((current) => exceptionKey(current) === exceptionKey(exception))) {
    exceptions.push({
      code: exception.code,
      fieldName: exception.fieldName ?? null,
      message: exception.message,
      aiValue: exception.aiValue ?? null,
      suggestedValue: exception.suggestedValue ?? null,
      status: exception.status ?? "OPEN",
    });
  }
}

function addCheck(checks, exceptions, { code, passed, message, exceptionCode, fieldName, aiValue, suggestedValue }) {
  checks.push({ code, passed, message });
  if (!passed && exceptionCode) {
    addException(exceptions, { code: exceptionCode, fieldName, message, aiValue, suggestedValue });
  }
}

function validCalendarDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

/** @param {{ cards?: Array<Record<string, any>>, uploaderUid?: string, uploaderUserId?: string }} options */
export function resolveUploaderCards({ cards = [], uploaderUid, uploaderUserId }) {
  const matches = uniqueCreditCards(cards.filter((card) => {
    if (card.status && card.status !== "ACTIVE" && card.status !== "Actif") return false;
    const holderStatus = card.holderStatus ?? card.holder?.status;
    if (holderStatus && holderStatus !== "ACTIVE" && holderStatus !== "Actif") return false;
    return Boolean(
      (uploaderUserId && card.holderId === uploaderUserId) ||
      (uploaderUid && card.holderFirebaseUid === uploaderUid),
    );
  }));
  if (matches.length === 1) return { status: "RESOLVED", card: matches[0], candidates: matches };
  if (matches.length > 1) return { status: "AMBIGUOUS", card: null, candidates: matches };
  return { status: "UNKNOWN", card: null, candidates: [] };
}

export function findPotentialDuplicates(extraction, transactions = [], resolvedCardId = null) {
  const vendor = String(extraction?.vendor ?? "").trim().toLocaleLowerCase();
  const date = extraction?.invoiceDate ?? null;
  const total = Number(extraction?.totalCents);
  const invoiceNumber = String(extraction?.invoiceNumber ?? "").trim().toLocaleLowerCase();
  if (!vendor || !date || !safeCents(total)) return [];

  return transactions.filter((transaction) => {
    if (resolvedCardId && transaction.card?.id && transaction.card.id !== resolvedCardId) return false;
    const sameInvoiceNumber = invoiceNumber && String(transaction.invoiceNumber ?? "").trim().toLocaleLowerCase() === invoiceNumber;
    const sameBusinessKey =
      String(transaction.vendor ?? "").trim().toLocaleLowerCase() === vendor &&
      transaction.transactionDate === date &&
      Number(transaction.totalCents) === total;
    return Boolean(sameInvoiceNumber || sameBusinessKey);
  });
}

/**
 * Decide an invoice using only deterministic evidence. This module has no
 * Firebase, browser, or Gemini dependency and is therefore safe to unit test.
 * @param {{
 *   extraction?: Record<string, any> | null,
 *   extractionValidation?: Record<string, any> | null,
 *   classification?: Record<string, any> | null,
 *   context?: {
 *     uploaderUid?: string,
 *     uploaderUserId?: string,
 *     cards?: Array<Record<string, any>>,
 *     cardResolution?: Record<string, any> | null,
 *     statementPeriodId?: string | null,
 *     requireStatementPeriod?: boolean,
 *   },
 *   duplicateCandidates?: Array<Record<string, any>>,
 *   lineItemClassifications?: Array<Record<string, any>>,
 *   confidenceThreshold?: number,
 * }} options
 */
export function decideInvoice({
  extraction,
  extractionValidation = null,
  classification,
  context = {},
  duplicateCandidates = [],
  lineItemClassifications = [],
  confidenceThreshold = DEFAULT_INVOICE_AI_MIN_CONFIDENCE,
} = {}) {
  const checks = [];
  const exceptions = [];
  const value = extraction && typeof extraction === "object" ? extraction : {};
  const validation = extractionValidation ?? validateInvoiceExtraction(value);
  const threshold = Number.isFinite(Number(confidenceThreshold))
    ? Math.min(1, Math.max(0, Number(confidenceThreshold)))
    : DEFAULT_INVOICE_AI_MIN_CONFIDENCE;

  if (!validation.ok) {
    addCheck(checks, exceptions, {
      code: "AI_OUTPUT_VALIDITY",
      passed: false,
      message: "Le résultat IA ne respecte pas le contrat d’extraction.",
      exceptionCode: "MISSING_REQUIRED_FIELD",
      fieldName: null,
      aiValue: validation.errors?.join(" | ") ?? null,
    });
  } else {
    addCheck(checks, exceptions, {
      code: "AI_OUTPUT_VALIDITY",
      passed: true,
      message: "Le résultat IA respecte le contrat d’extraction.",
    });
  }

  const vendor = String(value.vendor ?? "").trim();
  addCheck(checks, exceptions, {
    code: "VENDOR_PRESENCE",
    passed: Boolean(vendor),
    message: vendor ? "Le fournisseur est présent." : "Le fournisseur est absent ou inutilisable.",
    exceptionCode: "MISSING_REQUIRED_FIELD",
    fieldName: "vendor",
    aiValue: vendor || null,
  });

  const date = value.invoiceDate == null ? "" : String(value.invoiceDate);
  addCheck(checks, exceptions, {
    code: "DATE_VALIDITY",
    passed: Boolean(date) && validCalendarDate(date),
    message: !date ? "La date de facture est absente." : validCalendarDate(date) ? "La date est valide." : "La date n’est pas une vraie date calendrier.",
    exceptionCode: date ? "INVALID_DATE" : "MISSING_REQUIRED_FIELD",
    fieldName: "invoiceDate",
    aiValue: date || null,
  });

  const subtotal = Number(value.subtotalCents);
  const tps = Number(value.tpsCents ?? 0);
  const tvq = Number(value.tvqCents ?? 0);
  const total = Number(value.totalCents);
  const amountsAreValid = [subtotal, tps, tvq, total].every(safeCents);
  const totalConsistent = amountsAreValid && Math.abs(subtotal + tps + tvq - total) <= 1;
  addCheck(checks, exceptions, {
    code: "TOTAL_CONSISTENCY",
    passed: totalConsistent,
    message: totalConsistent ? "Le total correspond au sous-total et aux taxes." : "Le total ne correspond pas au sous-total et aux taxes.",
    exceptionCode: amountsAreValid ? "TOTAL_MISMATCH" : "MISSING_REQUIRED_FIELD",
    fieldName: "totalCents",
    aiValue: Number.isFinite(total) ? String(total) : null,
  });

  const taxValuesAreValid = safeCents(tps) && safeCents(tvq);
  const taxMismatch = !taxValuesAreValid || (!totalConsistent && (tps > 0 || tvq > 0));
  addCheck(checks, exceptions, {
    code: "TAX_CONSISTENCY",
    passed: !taxMismatch,
    message: taxMismatch ? "Les montants de taxes sont incohérents avec le total." : "Les taxes sont absentes ou cohérentes.",
    exceptionCode: "TAX_MISMATCH",
    fieldName: "tpsCents/tvqCents",
    aiValue: `${Number.isFinite(tps) ? tps : "?"}/${Number.isFinite(tvq) ? tvq : "?"}`,
  });

  // Only the current OCR contract carries lineItems. Keeping this guarded
  // preserves compatibility for old callers and legacy rows while ensuring
  // new AI results cannot be auto-posted without a reconciled line detail.
  if (Object.prototype.hasOwnProperty.call(value, "lineItems")) {
    const lineItems = Array.isArray(value.lineItems) ? value.lineItems : [];
    const linesSubtotalCents = lineItems.reduce((sum, item) => sum + Number(item?.amountCents ?? 0), 0);
    const subtotalCents = Number(value.subtotalCents);
    addCheck(checks, exceptions, {
      code: "LINE_ITEMS_PRESENCE",
      passed: lineItems.length > 0,
      message: lineItems.length > 0 ? "Les articles visibles sont structurés." : "Aucune ligne d’article n’a été extraite.",
      exceptionCode: "MISSING_LINE_ITEMS",
      fieldName: "lineItems",
    });
    const linesMatchSubtotal = lineItems.length > 0 && Number.isSafeInteger(subtotalCents) && Math.abs(linesSubtotalCents - subtotalCents) <= 1;
    addCheck(checks, exceptions, {
      code: "LINE_ITEMS_TOTAL",
      passed: linesMatchSubtotal,
      message: linesMatchSubtotal ? "La somme des lignes correspond au sous-total." : "La somme des lignes ne correspond pas au sous-total.",
      exceptionCode: "LINE_ITEMS_TOTAL_MISMATCH",
      fieldName: "lineItems",
      aiValue: String(linesSubtotalCents),
      suggestedValue: Number.isSafeInteger(subtotalCents) ? String(subtotalCents) : null,
    });
    const classifiedLines = lineItemClassifications.length ? lineItemClassifications : lineItems;
    const unresolvedLines = classifiedLines.filter((item) => !item?.accountCode || !["RESOLVED", "CONFIRMED"].includes(item?.classificationStatus));
    addCheck(checks, exceptions, {
      code: "LINE_ITEM_CLASSIFICATION",
      passed: lineItems.length > 0 && unresolvedLines.length === 0,
      message: unresolvedLines.length === 0 && lineItems.length > 0 ? "Chaque ligne possède une classification comptable résolue." : "Au moins une ligne doit être classifiée manuellement.",
      exceptionCode: "LINE_ITEM_CLASSIFICATION_REVIEW",
      fieldName: "lineItems",
      aiValue: unresolvedLines.length ? String(unresolvedLines.length) : null,
    });
    const lineItemAccounts = [...new Set(classifiedLines.map((item) => item?.accountCode).filter(Boolean))];
    addCheck(checks, exceptions, {
      code: "LINE_ITEM_ACCOUNT_SPLIT",
      passed: lineItemAccounts.length <= 1,
      message: lineItemAccounts.length <= 1 ? "Les lignes utilisent un compte principal unique." : "Les lignes utilisent plusieurs comptes; une validation de la répartition est requise.",
      exceptionCode: "LINE_ITEM_SPLIT_REVIEW",
      fieldName: "lineItems",
      aiValue: lineItemAccounts.join(", ") || null,
    });
  }

  const classificationValue = classification ?? {
    accountCode: null,
    category: String(value.category ?? "").trim() || "Divers",
    resolution: "UNRESOLVED",
    skuState: value.sku ? "UNKNOWN" : "NOT_PRESENT",
    candidates: [],
  };
  const sku = String(value.sku ?? "").trim();
  if (sku && classificationValue.skuState === "UNKNOWN") {
    addCheck(checks, exceptions, {
      code: "SKU_RESOLUTION",
      passed: false,
      message: "Le SKU extrait n’existe pas dans le référentiel fournisseur.",
      exceptionCode: "UNKNOWN_SKU",
      fieldName: "sku",
      aiValue: sku,
    });
  } else if (sku && classificationValue.skuState === "AMBIGUOUS") {
    addCheck(checks, exceptions, {
      code: "SKU_RESOLUTION",
      passed: false,
      message: "Le SKU correspond à plusieurs classifications.",
      exceptionCode: "AMBIGUOUS_ACCOUNT",
      fieldName: "accountCode",
      aiValue: sku,
      suggestedValue: unique(classificationValue.candidates).join(", "),
    });
  } else {
    addCheck(checks, exceptions, {
      code: "SKU_RESOLUTION",
      passed: true,
      message: sku ? "Le SKU est résolu." : "Aucun SKU n’est requis par défaut pour cette V1.",
    });
  }

  const accountResolved = classificationValue.resolution === "RESOLVED" && Boolean(classificationValue.accountCode);
  const accountProposed = classificationValue.resolution === "PROPOSED" && Boolean(classificationValue.accountCode);
  const accountAmbiguous = classificationValue.resolution === "AMBIGUOUS";
  addCheck(checks, exceptions, {
    code: "ACCOUNT_RESOLUTION",
    passed: accountResolved,
    message: accountResolved
      ? "Un compte comptable unique est résolu."
      : accountProposed
        ? "Un compte comptable est proposé, mais doit être confirmé manuellement."
        : accountAmbiguous
          ? "Plusieurs comptes comptables sont plausibles."
          : "Aucun compte comptable unique n’est résolu.",
    exceptionCode: accountAmbiguous ? "AMBIGUOUS_ACCOUNT" : accountProposed ? "ACCOUNT_SUGGESTION_REVIEW" : "MISSING_ACCOUNT",
    fieldName: "accountCode",
    aiValue: classificationValue.accountCode,
    suggestedValue: unique(classificationValue.candidates).join(", ") || null,
  });

  const cardResolution = context.cardResolution ?? resolveUploaderCards({
    cards: context.cards ?? [],
    uploaderUid: context.uploaderUid,
    uploaderUserId: context.uploaderUserId,
  });
  const cardResolved = cardResolution.status === "RESOLVED" && Boolean(cardResolution.card?.id);
  addCheck(checks, exceptions, {
    code: "CARD_RESOLUTION",
    passed: cardResolved,
    message: cardResolved ? "Une carte active unique est associée à l’uploader." : cardResolution.status === "AMBIGUOUS" ? "Plusieurs cartes actives sont associées à l’uploader." : "Aucune carte active n’est associée à l’uploader.",
    exceptionCode: cardResolution.status === "AMBIGUOUS" ? "AMBIGUOUS_CARD" : "UNKNOWN_CARD",
    fieldName: "cardId",
    aiValue: cardResolution.card?.lastFour ?? null,
  });

  const confidence = Number(value.confidence);
  addCheck(checks, exceptions, {
    code: "AI_CONFIDENCE",
    passed: Number.isFinite(confidence) && confidence >= threshold,
    message: Number.isFinite(confidence) && confidence >= threshold ? `La confiance IA atteint le seuil configuré (${threshold}).` : `La confiance IA est inférieure au seuil configuré (${threshold}).`,
    exceptionCode: "LOW_CONFIDENCE",
    fieldName: "confidence",
    aiValue: Number.isFinite(confidence) ? String(confidence) : null,
    suggestedValue: String(threshold),
  });

  addCheck(checks, exceptions, {
    code: "DUPLICATE_CHECK",
    passed: duplicateCandidates.length === 0,
    message: duplicateCandidates.length === 0 ? "Aucun doublon potentiel n’a été trouvé." : "Une ou plusieurs écritures ressemblent à cette facture.",
    exceptionCode: "POSSIBLE_DUPLICATE",
    fieldName: "invoiceNumber",
    aiValue: duplicateCandidates.map((candidate) => candidate.id).join(", ") || null,
  });

  if (context.requireStatementPeriod && !context.statementPeriodId) {
    addCheck(checks, exceptions, {
      code: "STATEMENT_PERIOD_RESOLUTION",
      passed: false,
      message: "Aucune période de relevé ouverte ne correspond à la date de facture.",
      exceptionCode: "MISSING_REQUIRED_FIELD",
      fieldName: "statementPeriodId",
    });
  }

  return {
    decision: exceptions.length ? PROCESSING_STATUS.NEEDS_REVIEW : PROCESSING_STATUS.AUTO_APPROVED,
    exceptions,
    checks,
    confidenceThreshold: threshold,
    resolutions: {
      accountCode: accountResolved ? classificationValue.accountCode : null,
      cardId: cardResolved ? cardResolution.card.id : null,
      projectId: null,
      statementPeriodId: context.statementPeriodId ?? null,
    },
  };
}
