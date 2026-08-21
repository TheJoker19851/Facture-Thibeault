import { AUDIT_ACTIONS } from "./audit-events.mjs";

export const RECONCILIATION_STATUSES = Object.freeze({
  MATCHED: "MATCHED",
  REVIEW: "REVIEW",
  MISSING_INVOICE: "MISSING_INVOICE",
  OUTSIDE_STATEMENT: "OUTSIDE_STATEMENT",
  IGNORED: "IGNORED",
  DUPLICATE: "DUPLICATE",
});

export const MATCH_METHODS = Object.freeze({ AUTO: "AUTO", MANUAL: "MANUAL" });

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_LINES_PER_STATEMENT = 10_000;

const DEFAULT_MERCHANT_ALIASES = Object.freeze([
  { normalized: "Canadian Tire", keys: ["cdn tire store 174", "canadian tire 174", "ct chicoutimi", "canadian tire chicoutimi"] },
  { normalized: "Station Démo", keys: ["station demo", "station démo", "shell demo"] },
  { normalized: "Auto Démo", keys: ["auto demo", "auto démo"] },
]);

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asText(value) {
  return String(value ?? "").trim();
}

function merchantKey(value) {
  return asText(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function normalizeMerchant(value, aliases = DEFAULT_MERCHANT_ALIASES) {
  const raw = asText(value).replace(/\s+/g, " ");
  if (!raw) return "";
  const key = merchantKey(raw);
  const alias = aliases.find((candidate) => candidate.keys.some((candidateKey) => merchantKey(candidateKey) === key));
  return alias?.normalized ?? raw;
}

export function merchantAliases() {
  return DEFAULT_MERCHANT_ALIASES.map((alias) => ({ normalized: alias.normalized, keys: [...alias.keys] }));
}

function isValidDate(value) {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function parseMoneyToCents(value) {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  const text = asText(value).replace(/\s/g, "").replace(/\$/g, "");
  if (/^-?\d+$/.test(text)) return Number(text);
  const normalized = text.includes(",") && text.includes(".")
    ? text.replace(/\./g, "").replace(",", ".")
    : text.replace(",", ".");
  const amount = Number(normalized);
  if (!Number.isFinite(amount)) return null;
  return Math.round(amount * 100);
}

function validateMetadata(metadata = {}) {
  const errors = [];
  const cardId = asText(metadata.cardId);
  const periodStart = asText(metadata.periodStart);
  const periodEnd = asText(metadata.periodEnd);
  if (!cardId) errors.push("cardId est requis.");
  if (!isValidDate(periodStart)) errors.push("periodStart doit être une date YYYY-MM-DD valide.");
  if (!isValidDate(periodEnd)) errors.push("periodEnd doit être une date YYYY-MM-DD valide.");
  if (periodStart && periodEnd && periodStart > periodEnd) errors.push("periodStart doit précéder periodEnd.");
  return { errors, cardId, periodStart, periodEnd };
}

function normalizeLine(value, index, errors) {
  if (!isObject(value)) {
    errors.push(`lines[${index}] doit être un objet.`);
    return null;
  }
  const transactionDate = asText(value.transactionDate ?? value.date);
  const postedDate = asText(value.postedDate);
  const merchantRaw = asText(value.merchantRaw ?? value.merchant ?? value.vendor);
  const amountCents = value.amountCents != null ? parseMoneyToCents(value.amountCents) : parseMoneyToCents(value.amount);
  if (!isValidDate(transactionDate)) errors.push(`lines[${index}].transactionDate doit être une date YYYY-MM-DD valide.`);
  if (postedDate && !isValidDate(postedDate)) errors.push(`lines[${index}].postedDate doit être une date YYYY-MM-DD valide.`);
  if (!merchantRaw) errors.push(`lines[${index}].merchantRaw est requis.`);
  if (amountCents == null || !Number.isInteger(amountCents)) errors.push(`lines[${index}].amountCents doit être un montant valide.`);
  if (amountCents != null && Math.abs(amountCents) > 100_000_000) errors.push(`lines[${index}].amountCents dépasse la limite autorisée.`);
  if (errors.some((message) => message.startsWith(`lines[${index}]`))) return null;
  return {
    id: asText(value.id) || undefined,
    sequence: index + 1,
    transactionDate,
    postedDate: postedDate || null,
    merchantRaw,
    merchantNormalized: normalizeMerchant(merchantRaw),
    amountCents,
    externalReference: asText(value.externalReference) || null,
    status: RECONCILIATION_STATUSES.REVIEW,
    rawData: isObject(value.rawData) ? JSON.stringify(value.rawData) : JSON.stringify(value),
  };
}

/**
 * Parses a generic JSON statement envelope or a CSV with the columns
 * transactionDate, postedDate, merchantRaw, amountCents, externalReference.
 * The parser never sorts rows: sequence is assigned from source order.
 */
export function parseStatementImport(value, metadata = {}) {
  const errors = [];
  const input = typeof value === "string" ? value : value;
  const isCsv = typeof input === "string" && (/\.csv$/i.test(metadata.originalFilename ?? "") || input.trimStart().startsWith("transactionDate,"));
  let parsed = input;
  if (!isCsv && typeof input === "string") {
    try {
      parsed = JSON.parse(input);
    } catch {
      return { statement: null, errors: ["Le fichier n’est pas un JSON valide."] };
    }
  }

  let statementMetadata = { ...metadata };
  let sourceLines = [];
  if (isCsv) {
    sourceLines = parseCsvLines(String(input), errors);
  } else if (isObject(parsed)) {
    statementMetadata = { ...parsed, ...metadata };
    sourceLines = Array.isArray(parsed.lines) ? parsed.lines : [];
    if (!Array.isArray(parsed.lines)) errors.push("La propriété lines doit être un tableau.");
  } else {
    errors.push("Le relevé doit contenir un objet JSON ou un CSV structuré.");
  }

  const metadataResult = validateMetadata(statementMetadata);
  errors.push(...metadataResult.errors);
  if (sourceLines.length === 0) errors.push("Le relevé doit contenir au moins une ligne.");
  if (sourceLines.length > MAX_LINES_PER_STATEMENT) errors.push(`Le relevé dépasse ${MAX_LINES_PER_STATEMENT} lignes.`);
  const lineErrors = [];
  const lines = sourceLines.slice(0, MAX_LINES_PER_STATEMENT).map((line, index) => normalizeLine(line, index, lineErrors)).filter(Boolean);
  errors.push(...lineErrors);
  if (errors.length) return { statement: null, errors };

  const totalAmountCents = lines.reduce((total, line) => total + line.amountCents, 0);
  return {
    statement: {
      id: asText(statementMetadata.id) || undefined,
      cardId: metadataResult.cardId,
      holderId: asText(statementMetadata.holderId) || null,
      holderNameSnapshot: asText(statementMetadata.holderNameSnapshot) || null,
      periodStart: metadataResult.periodStart,
      periodEnd: metadataResult.periodEnd,
      originalStoragePath: asText(statementMetadata.originalStoragePath) || null,
      originalFilename: asText(statementMetadata.originalFilename) || "releve-importe",
      importedAt: asText(statementMetadata.importedAt) || null,
      importedBy: asText(statementMetadata.importedBy) || null,
      statementHash: asText(statementMetadata.statementHash) || null,
      status: asText(statementMetadata.status) || "IMPORTED",
      lineCount: lines.length,
      totalAmountCents,
      lines,
    },
    errors: [],
  };
}

function parseCsvLines(input, errors) {
  const rows = [];
  let current = "";
  let quoted = false;
  let row = [];
  const flushCell = () => { row.push(current); current = ""; };
  const flushRow = () => { flushCell(); if (row.some((cell) => cell.trim() !== "")) rows.push(row); row = []; };
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];
    if (char === '"' && quoted && next === '"') { current += '"'; index += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (!quoted && char === ",") { flushCell(); continue; }
    if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      flushRow();
      continue;
    }
    current += char;
  }
  if (quoted) errors.push("Le CSV contient une chaîne entre guillemets non fermée.");
  if (current || row.length) flushRow();
  if (!rows.length) return [];
  const headers = rows.shift().map((header) => merchantKey(header));
  const required = ["transactiondate", "merchantraw", "amountcents"];
  const aliases = { date: "transactiondate", merchant: "merchantraw", amount: "amountcents", posted: "posteddate", referencenumber: "externalreference" };
  const mappedHeaders = headers.map((header) => aliases[header] ?? header);
  const missing = required.filter((header) => !mappedHeaders.includes(header));
  if (missing.length) { errors.push(`Le CSV doit contenir les colonnes : ${missing.join(", ")}.`); return []; }
  const outputNames = { transactiondate: "transactionDate", posteddate: "postedDate", merchantraw: "merchantRaw", amountcents: "amountCents", externalreference: "externalReference" };
  return rows.map((cells) => Object.fromEntries(mappedHeaders.map((header, index) => [outputNames[header] ?? header, cells[index] ?? ""])));
}

export async function sha256Hex(value) {
  if (!globalThis.crypto?.subtle) throw new Error("Le calcul SHA-256 n’est pas disponible dans cet environnement.");
  const digest = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value)));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function statementIdFromHash({ cardId, periodStart, periodEnd, statementHash }) {
  return `STATEMENT-${asText(cardId)}-${asText(periodStart)}-${asText(periodEnd)}-${asText(statementHash).slice(0, 24)}`.replace(/[^A-Za-z0-9._-]/g, "-").slice(0, 128);
}

export async function finalizeStatementImport(statement, sourceText) {
  const statementHash = statement.statementHash || await sha256Hex(sourceText);
  return { ...statement, statementHash, id: statement.id || statementIdFromHash({ ...statement, statementHash }) };
}

export function buildStatementImportBatch(existingStatements = [], incomingStatements = []) {
  const existingHashes = new Set(existingStatements.map((statement) => statement.statementHash).filter(Boolean));
  const existingPeriods = new Set(existingStatements.map((statement) => `${statement.cardId}|${statement.periodStart}|${statement.periodEnd}`));
  const incomingHashes = new Set();
  const additions = [];
  const duplicates = [];
  const warnings = [];
  const errors = [];
  for (const statement of incomingStatements) {
    if (!statement.statementHash) { errors.push(`${statement.originalFilename ?? "relevé"} n’a pas de hash.`); continue; }
    if (existingHashes.has(statement.statementHash) || incomingHashes.has(statement.statementHash)) {
      duplicates.push(statement);
      continue;
    }
    const periodKey = `${statement.cardId}|${statement.periodStart}|${statement.periodEnd}`;
    if (existingPeriods.has(periodKey)) warnings.push(`Un relevé existe déjà pour ${periodKey}; le hash diffère et doit être confirmé.`);
    incomingHashes.add(statement.statementHash);
    additions.push(statement);
  }
  return { additions, duplicates, warnings, errors };
}

function dateDifferenceDays(left, right) {
  const leftDate = new Date(`${left}T12:00:00Z`);
  const rightDate = new Date(`${right}T12:00:00Z`);
  return Math.round(Math.abs(leftDate.valueOf() - rightDate.valueOf()) / DAY_MS);
}

function transactionDate(transaction) {
  return asText(transaction.transactionDate ?? transaction.date);
}

function transactionAmountCents(transaction) {
  if (transaction.totalCents != null) return Number(transaction.totalCents);
  return parseMoneyToCents(transaction.total);
}

function transactionCardId(transaction) {
  return asText(transaction.cardId ?? transaction.card?.id);
}

function transactionVendor(transaction) {
  return asText(transaction.vendor ?? transaction.merchant);
}

export function scoreReconciliationCandidate(line, transaction, aliases = DEFAULT_MERCHANT_ALIASES) {
  const reasons = [];
  const amount = transactionAmountCents(transaction);
  const cardMatches = !line.cardId || !transactionCardId(transaction) || line.cardId === transactionCardId(transaction);
  if (!cardMatches) return { eligible: false, score: 0, reasons: ["Carte différente"], amountMatches: false, merchantMatches: false, dateDifferenceDays: null };
  const amountMatches = amount === line.amountCents;
  if (!amountMatches) return { eligible: false, score: 0, reasons: ["Montant différent"], amountMatches: false, merchantMatches: false, dateDifferenceDays: null };
  const difference = dateDifferenceDays(line.transactionDate, transactionDate(transaction));
  if (difference > 2) return { eligible: false, score: 0, reasons: ["Date hors tolérance de 2 jours"], amountMatches: true, merchantMatches: false, dateDifferenceDays: difference };
  let score = 50;
  reasons.push("Montant exact au cent");
  if (difference === 0) { score += 30; reasons.push("Date exacte"); }
  else { score += difference === 1 ? 22 : 15; reasons.push(`Date décalée de ${difference} jour${difference > 1 ? "s" : ""}`); }
  const merchantMatches = normalizeMerchant(line.merchantRaw, aliases) === normalizeMerchant(transactionVendor(transaction), aliases);
  if (merchantMatches) { score += 20; reasons.push("Marchand normalisé concordant"); }
  else reasons.push("Marchand à confirmer");
  const externalReference = asText(transaction.externalReference);
  if (line.externalReference && externalReference && line.externalReference === externalReference) { score += 15; reasons.push("Référence externe concordante"); }
  return { eligible: true, score, reasons, amountMatches: true, merchantMatches, dateDifferenceDays: difference };
}

export function reconcileStatement(statement, transactions, aliases = DEFAULT_MERCHANT_ALIASES) {
  const usedTransactionIds = new Set();
  const lineResults = statement.lines.map((line) => {
    const lineWithCard = { ...line, cardId: statement.cardId };
    const candidates = transactions
      .map((transaction) => ({ transaction, score: scoreReconciliationCandidate(lineWithCard, transaction, aliases) }))
      .filter((candidate) => candidate.score.eligible)
      .sort((left, right) => right.score.score - left.score.score);
    if (!candidates.length) {
      return { line, status: RECONCILIATION_STATUSES.MISSING_INVOICE, match: null, candidates: [], reason: "Aucune facture candidate avec le même montant et une date compatible." };
    }
    const best = candidates[0];
    const tied = candidates.filter((candidate) => candidate.score.score === best.score.score);
    if (tied.length > 1) {
      return { line, status: RECONCILIATION_STATUSES.REVIEW, match: null, candidates, reason: "Plusieurs factures candidates ont un score équivalent; aucun jumelage automatique." };
    }
    const transactionId = asText(best.transaction.id);
    if (usedTransactionIds.has(transactionId)) {
      return { line, status: RECONCILIATION_STATUSES.DUPLICATE, match: null, candidates, reason: "La facture candidate est déjà jumelée à une autre ligne du relevé." };
    }
    const canAutoMatch = best.score.score >= 80 && best.score.merchantMatches;
    if (!canAutoMatch) {
      return { line, status: RECONCILIATION_STATUSES.REVIEW, match: null, candidates, reason: "Une candidate existe, mais la concordance du marchand ne suffit pas pour un jumelage automatique." };
    }
    usedTransactionIds.add(transactionId);
    return {
      line,
      status: RECONCILIATION_STATUSES.MATCHED,
      match: { expenseTransactionId: transactionId, invoiceId: best.transaction.invoiceId ?? null, matchScore: best.score.score, matchMethod: MATCH_METHODS.AUTO },
      candidates,
      reason: best.score.reasons.join(" · "),
    };
  });

  const periodTransactions = transactions.filter((transaction) => {
    const cardMatches = !transactionCardId(transaction) || transactionCardId(transaction) === statement.cardId;
    const date = transactionDate(transaction);
    return cardMatches && date >= statement.periodStart && date <= statement.periodEnd;
  });
  const matchedIds = new Set(lineResults.map((result) => result.match?.expenseTransactionId).filter(Boolean));
  const outsideTransactions = periodTransactions
    .filter((transaction) => !matchedIds.has(transaction.id))
    .map((transaction) => ({ transaction, status: RECONCILIATION_STATUSES.OUTSIDE_STATEMENT, reason: "La transaction existe pour cette carte et cette période, mais aucune ligne du relevé ne lui correspond." }));
  return { statement, lineResults, outsideTransactions, matchedTransactionIds: matchedIds, summary: reconciliationSummary(lineResults, outsideTransactions) };
}

export function reconciliationSummary(lineResults, outsideTransactions = []) {
  const counts = Object.fromEntries(Object.values(RECONCILIATION_STATUSES).map((status) => [status, 0]));
  for (const result of lineResults) counts[result.status] = (counts[result.status] ?? 0) + 1;
  counts.OUTSIDE_STATEMENT += outsideTransactions.length;
  return counts;
}

export function confirmManualMatch(reconciliation, lineId, transactionId, actor = {}) {
  const result = reconciliation.lineResults.find((candidate) => candidate.line.id === lineId);
  if (!result) throw new Error("Ligne de relevé introuvable.");
  if (reconciliation.lineResults.some((candidate) => candidate.match?.expenseTransactionId === transactionId && candidate.line.id !== lineId)) throw new Error("Cette transaction est déjà jumelée à une autre ligne.");
  const candidate = result.candidates.find((item) => item.transaction.id === transactionId);
  if (!candidate) throw new Error("La transaction choisie n’est pas une candidate valide pour cette ligne.");
  const updated = {
    ...result,
    status: RECONCILIATION_STATUSES.MATCHED,
    match: { expenseTransactionId: transactionId, invoiceId: candidate.transaction.invoiceId ?? null, matchScore: candidate.score.score, matchMethod: MATCH_METHODS.MANUAL, confirmedBy: actor.uid ?? null, confirmedAt: actor.confirmedAt ?? null },
    reason: `Jumelage manuel confirmé · ${candidate.score.reasons.join(" · ")}`,
  };
  return { ...reconciliation, lineResults: reconciliation.lineResults.map((item) => item.line.id === lineId ? updated : item), audit: { action: AUDIT_ACTIONS.RECONCILIATION_MANUAL_MATCH, entityType: "CreditCardStatementLine", entityId: lineId, actorUid: actor.uid ?? null, details: JSON.stringify({ before: result, after: updated }) } };
}

export function setLineReconciliationStatus(reconciliation, lineId, status, actor = {}) {
  if (![RECONCILIATION_STATUSES.MISSING_INVOICE, RECONCILIATION_STATUSES.IGNORED, RECONCILIATION_STATUSES.REVIEW].includes(status)) throw new Error("Statut de rapprochement manuel invalide.");
  const result = reconciliation.lineResults.find((candidate) => candidate.line.id === lineId);
  if (!result) throw new Error("Ligne de relevé introuvable.");
  const updated = { ...result, status, match: null, reason: status === RECONCILIATION_STATUSES.IGNORED ? "Ligne ignorée manuellement par Kim." : status === RECONCILIATION_STATUSES.MISSING_INVOICE ? "Facture manquante confirmée manuellement." : "Ligne rouverte pour vérification." };
  return { ...reconciliation, lineResults: reconciliation.lineResults.map((item) => item.line.id === lineId ? updated : item), audit: { action: AUDIT_ACTIONS.RECONCILIATION_STATUS_UPDATED, entityType: "CreditCardStatementLine", entityId: lineId, actorUid: actor.uid ?? null, details: JSON.stringify({ before: result, after: updated }) } };
}
