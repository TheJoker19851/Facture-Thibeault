import {
  applyMerchantAliases,
  finalizeStatementImport,
  normalizeMerchantAliasRows,
  parseStatementImport,
  reconcileStatement,
  RECONCILIATION_STATUSES,
} from "./reconciliation.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "./audit-events.mjs";
import { collectPagedRows } from "./pagination.mjs";

const ROLE_ALLOWLIST = new Set(["KIM", "ADMIN"]);

function asId(value) {
  return String(value ?? "").trim();
}

function intValue(value) {
  const number = Number(value);
  return Number.isInteger(number) ? number : null;
}

async function runInBatches(items, size, operation) {
  for (let offset = 0; offset < items.length; offset += size) {
    await Promise.all(items.slice(offset, offset + size).map(operation));
  }
}

function identityQueryOptions(identity) {
  return identity ? { impersonate: { authClaims: { sub: identity.uid, uid: identity.uid, role: identity.role } } } : undefined;
}

async function readAllQuery(dataConnect, operation, field, identity) {
  const options = identityQueryOptions(identity);
  return collectPagedRows(async ({ limit, offset }) => {
    const page = await dataConnect.executeQuery(operation, { limit, offset }, options);
    const pageRows = page.data?.[field] ?? [];
    return pageRows;
  });
}

function profileForIdentity(profiles, identity) {
  return profiles.find((profile) => profile.firebaseUid === identity.uid || profile.id === identity.uid) ?? null;
}

function statementLinesByStatement(lines) {
  const grouped = new Map();
  for (const line of lines) {
    const statementId = asId(line.statement?.id);
    if (!statementId) continue;
    const current = grouped.get(statementId) ?? [];
    current.push(line);
    grouped.set(statementId, current);
  }
  for (const statementLines of grouped.values()) statementLines.sort((left, right) => Number(left.sequence) - Number(right.sequence));
  return grouped;
}

function cardIdOf(transaction) {
  return asId(transaction.cardId ?? transaction.card?.id);
}

function mapPersistedStatement(statement, linesById) {
  return {
    ...statement,
    cardId: statement.card?.id,
    importedBy: statement.importedBy?.id ?? statement.importedBy,
    lines: [...(linesById.get(statement.id) ?? [])].sort((left, right) => Number(left.sequence) - Number(right.sequence)).map((line) => ({
      ...line,
      cardId: statement.card?.id,
      amountCents: intValue(line.amountCents),
    })),
  };
}

export async function loadReconciliationContext(dataConnect, identity) {
  const [statements, lines, transactions, invoices, aliases, histories, matches, outsideControls, profilesResponse] = await Promise.all([
    readAllQuery(dataConnect, "ListCreditCardStatementsPage", "creditCardStatements", identity),
    readAllQuery(dataConnect, "ListAllCreditCardStatementLinesPage", "creditCardStatementLines", identity),
    readAllQuery(dataConnect, "ListExpenseTransactionsPage", "expenseTransactions", identity),
    readAllQuery(dataConnect, "ListInvoicesForReconciliationPage", "invoices", identity),
    readAllQuery(dataConnect, "ListMerchantAliasesPage", "merchantAliases", identity),
    readAllQuery(dataConnect, "ListCreditCardHolderHistories", "creditCardHolderHistories", identity),
    readAllQuery(dataConnect, "ListReconciliationMatchesPage", "reconciliationMatches", identity),
    readAllQuery(dataConnect, "ListReconciliationOutsideControlsPage", "reconciliationOutsideControls", identity),
    readAllQuery(dataConnect, "ListUserProfiles", "userProfiles", identity),
  ]);
  const linesById = statementLinesByStatement(lines);
  const mappedStatements = statements.map((statement) => mapPersistedStatement(statement, linesById));
  const invoiceByTransactionId = new Map(invoices.map((invoice) => [asId(invoice.transaction?.id), invoice]));
  const mappedTransactions = transactions.map((transaction) => ({
    ...transaction,
    cardId: cardIdOf(transaction),
    totalCents: intValue(transaction.totalCents) ?? 0,
    invoiceId: invoiceByTransactionId.get(asId(transaction.id))?.id ?? null,
  }));
  return {
    statements: mappedStatements,
    lines,
    transactions: mappedTransactions,
    invoices,
    aliases,
    aliasRules: normalizeMerchantAliasRows(aliases),
    histories,
    matches,
    outsideControls,
    profiles: profilesResponse ?? [],
  };
}

function applicableHolder(histories, cardId, periodEnd) {
  const candidates = histories.filter((history) => {
    if (asId(history.card?.id) !== cardId || history.status === "INACTIVE") return false;
    const validFrom = asId(history.validFrom);
    const validTo = asId(history.validTo);
    return validFrom <= periodEnd && (!validTo || periodEnd <= validTo);
  });
  if (candidates.length !== 1) {
    throw new Error(candidates.length === 0
      ? `Aucun titulaire historique ne couvre ${cardId} au ${periodEnd}.`
      : `Plusieurs titulaires historiques couvrent ${cardId} au ${periodEnd}.`);
  }
  return candidates[0];
}

function validateHistoryOverlap(histories, input) {
  const start = input.validFrom;
  const end = input.validTo || "9999-12-31";
  const overlap = histories.find((history) => {
    if (history.id === input.id || asId(history.card?.id) !== input.cardId || history.status === "INACTIVE") return false;
    const otherStart = asId(history.validFrom);
    const otherEnd = asId(history.validTo) || "9999-12-31";
    return start <= otherEnd && otherStart <= end;
  });
  if (overlap) throw new Error(`La période chevauche déjà l’historique ${overlap.id}.`);
}

function importedStatementPayload(statement, holder, profileId, aliasRules) {
  const normalized = applyMerchantAliases(statement, aliasRules);
  return {
    statement: normalized,
    holderIdSnapshot: holder.holder?.id ?? holder.holderId,
    holderNameSnapshot: holder.holder?.displayName ?? holder.holderNameSnapshot ?? holder.holder?.id,
    importedById: profileId,
    lines: normalized.lines.map((line) => ({
      id: line.id || `${normalized.id}-LINE-${String(line.sequence).padStart(5, "0")}`,
      statement: { id: normalized.id },
      sequence: line.sequence,
      transactionDate: line.transactionDate,
      postedDate: line.postedDate || null,
      merchantRaw: line.merchantRaw,
      merchantNormalized: line.merchantNormalized,
      amountCents: String(line.amountCents),
      externalReference: line.externalReference || null,
      status: RECONCILIATION_STATUSES.REVIEW,
      rawData: line.rawData,
    })),
  };
}

/**
 * @param {{
 *   dataConnect: any,
 *   imports: Array<Record<string, any>>,
 *   identity: { uid: string, role: string },
 *   context?: any,
 *   evidenceWriter?: (input: { sourceText: string, originalFilename: string, statementHash: string, statementId: string, identity: { uid: string, role: string } }) => Promise<string>
 * }} options
 */
export async function importStatementBatch({ dataConnect, imports, identity, context: suppliedContext = undefined, evidenceWriter = undefined }) {
  if (!ROLE_ALLOWLIST.has(identity?.role)) throw new Error("Le rôle KIM ou ADMIN est requis.");
  const context = suppliedContext ?? await loadReconciliationContext(dataConnect, identity);
  const profile = profileForIdentity(context.profiles, identity);
  if (!profile) throw new Error("Le profil comptable de l’utilisateur authentifié est introuvable.");
  const existingByHash = new Map(context.statements.map((statement) => [asId(statement.statementHash), statement]));
  const results = [];
  const batchHashes = new Map();

  for (const item of imports) {
    const filename = asId(item.originalFilename) || "releve-importe";
    let finalizedHash = null;
    try {
      const parsed = parseStatementImport(item.sourceText, {
        originalFilename: filename,
        originalStoragePath: asId(item.originalStoragePath) || `pending://${filename}`,
        importedBy: identity.uid,
        ...(asId(item.cardId) ? { cardId: asId(item.cardId) } : {}),
        ...(asId(item.periodStart) ? { periodStart: asId(item.periodStart) } : {}),
        ...(asId(item.periodEnd) ? { periodEnd: asId(item.periodEnd) } : {}),
        // A client-supplied hash/id is deliberately ignored. The server hashes
        // the exact uploaded source and derives the id from that hash.
        statementHash: null,
        id: null,
      });
      if (parsed.errors.length || !parsed.statement) {
        results.push({ filename, status: "REJECTED", errors: parsed.errors });
        continue;
      }
      const finalized = await finalizeStatementImport({ ...parsed.statement, id: null, statementHash: null }, item.sourceText);
      finalizedHash = finalized.statementHash;
      const duplicate = existingByHash.get(finalized.statementHash) ?? batchHashes.get(finalized.statementHash);
      const duplicateIsComplete = duplicate && duplicate.status === "IMPORTED" && Number(duplicate.lineCount ?? 0) === Number(duplicate.lines?.length ?? 0);
      if (duplicateIsComplete) {
        results.push({ filename, status: "IDEMPOTENT", statementId: duplicate.id, statementHash: finalized.statementHash });
        continue;
      }
      const resumable = duplicate ? { ...finalized, id: duplicate.id } : finalized;
      const evidencePath = evidenceWriter
        ? await evidenceWriter({ sourceText: item.sourceText, originalFilename: filename, statementHash: resumable.statementHash, statementId: resumable.id, identity })
        : asId(item.originalStoragePath) || `local://${filename}`;
      const durableStatement = { ...resumable, originalStoragePath: evidencePath };
      const holder = applicableHolder(context.histories, durableStatement.cardId, durableStatement.periodEnd);
      const payload = importedStatementPayload(durableStatement, holder, profile.id, context.aliasRules);
      const auditId = auditEventId(payload.statement.id, AUDIT_ACTIONS.STATEMENT_IMPORTED);
      await dataConnect.executeMutation("UpsertCreditCardStatement", {
        id: payload.statement.id,
        cardId: payload.statement.cardId,
        holderIdSnapshot: payload.holderIdSnapshot,
        holderNameSnapshot: payload.holderNameSnapshot,
        periodStart: payload.statement.periodStart,
        periodEnd: payload.statement.periodEnd,
        originalStoragePath: payload.statement.originalStoragePath,
        originalFilename: payload.statement.originalFilename,
        importedById: payload.importedById,
        statementHash: payload.statement.statementHash,
        status: "IMPORTING",
        lineCount: payload.lines.length,
        totalAmountCents: String(payload.statement.totalAmountCents),
      });
      await runInBatches(payload.lines, 25, (line) => dataConnect.executeMutation("UpsertCreditCardStatementLine", {
        id: line.id,
        statementId: payload.statement.id,
        sequence: line.sequence,
        transactionDate: line.transactionDate,
        postedDate: line.postedDate,
        merchantRaw: line.merchantRaw,
        merchantNormalized: line.merchantNormalized,
        amountCents: line.amountCents,
        externalReference: line.externalReference,
        status: line.status,
        rawData: line.rawData,
      }));
      await dataConnect.executeMutation("FinalizeCreditCardStatementImport", {
        id: payload.statement.id,
        statementHash: payload.statement.statementHash,
        actorUid: identity.uid,
        actorRole: identity.role,
        auditEventId: auditId,
        auditDetails: auditDetails({ statementHash: payload.statement.statementHash, lineCount: payload.lines.length, source: evidenceWriter ? "SERVER_DURABLE_STORAGE" : "SERVER_LOCAL", originalStoragePath: evidencePath }),
      });
      const persisted = { ...payload.statement, status: "IMPORTED", holderId: payload.holderIdSnapshot, holderNameSnapshot: payload.holderNameSnapshot, importedBy: profile.id, lines: payload.lines };
      existingByHash.set(persisted.statementHash, persisted);
      batchHashes.set(persisted.statementHash, persisted);
      results.push({ filename, status: "IMPORTED", statementId: persisted.id, lineCount: payload.lines.length, statementHash: persisted.statementHash });
    } catch (error) {
      // A concurrent request may have won the unique statement-hash write
      // after this request read the context. Re-read before reporting a hard
      // rejection so the losing request remains idempotent to the caller.
      if (finalizedHash) {
        try {
          const concurrent = (await loadReconciliationContext(dataConnect, identity)).statements.find((statement) => statement.statementHash === finalizedHash);
          if (concurrent?.status === "IMPORTED" && Number(concurrent.lineCount ?? 0) === Number(concurrent.lines?.length ?? 0)) {
            results.push({ filename, status: "IDEMPOTENT", statementId: concurrent.id, statementHash: finalizedHash });
            continue;
          }
        } catch {
          // Preserve the original import error when the retry read is unavailable.
        }
      }
      results.push({ filename, status: "REJECTED", errors: [error instanceof Error ? error.message : "Import refusé."] });
    }
  }
  return { results, imported: results.filter((result) => result.status === "IMPORTED").length, idempotent: results.filter((result) => result.status === "IDEMPOTENT").length, rejected: results.filter((result) => result.status === "REJECTED").length };
}

function matchRowForLine(matches, lineId) {
  return matches.find((match) => asId(match.statementLine?.id) === lineId) ?? null;
}

export function buildPersistedReconciliation(context, statementId) {
  const statement = context.statements.find((candidate) => candidate.id === statementId);
  if (!statement) throw new Error("Relevé introuvable.");
  const statementLineIds = new Set(statement.lines.map((line) => asId(line.id)));
  const matchedElsewhere = new Set(context.matches
    .filter((match) => match.status === RECONCILIATION_STATUSES.MATCHED && match.expenseTransaction?.id && !statementLineIds.has(asId(match.statementLine?.id)))
    .map((match) => asId(match.expenseTransaction.id)));
  const availableTransactions = context.transactions.filter((transaction) => !matchedElsewhere.has(asId(transaction.id)));
  const base = reconcileStatement(statement, availableTransactions, context.aliasRules);
  const lineResults = base.lineResults.map((result) => {
    const persisted = matchRowForLine(context.matches, result.line.id);
    if (!persisted) return result;
    const status = persisted.status === "UNLINKED" ? RECONCILIATION_STATUSES.REVIEW : persisted.status;
    return {
      ...result,
      status,
      match: persisted.expenseTransaction?.id ? {
        expenseTransactionId: persisted.expenseTransaction.id,
        invoiceId: persisted.invoice?.id ?? null,
        matchScore: persisted.matchScore,
        matchMethod: persisted.matchMethod,
      } : null,
      reason: persisted.reason ?? result.reason,
      persistedMatchId: persisted.id,
      persistedDetails: persisted.details,
    };
  });
  const outsideTransactions = base.outsideTransactions.map((outside) => {
    const control = context.outsideControls.find((candidate) => candidate.statement?.id === statement.id && candidate.expenseTransaction?.id === outside.transaction.id);
    return control ? { ...outside, controlId: control.id, status: control.status } : outside;
  });
  return { ...base, lineResults, outsideTransactions };
}

/** @param {{ dataConnect: any, identity: { uid: string, role: string }, matchId: string, lineId: string, expenseTransactionId: string, suffix: string }} options */
async function clearReconciliationAssociation({ dataConnect, identity, matchId, lineId, expenseTransactionId, suffix }) {
  await dataConnect.executeMutation("ClearReconciliationMatch", {
    id: matchId,
    statementLineId: lineId,
    previousExpenseTransactionId: expenseTransactionId,
    lineStatus: RECONCILIATION_STATUSES.REVIEW,
    auditEventId: auditEventId(lineId, AUDIT_ACTIONS.STATEMENT_MATCH_UNLINKED, suffix),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditAction: AUDIT_ACTIONS.STATEMENT_MATCH_UNLINKED,
    auditDetails: auditDetails({ before: { matchId, expenseTransactionId }, after: { status: RECONCILIATION_STATUSES.REVIEW, expenseTransactionId: null } }),
  });
}

export async function persistManualMatch({ dataConnect, identity, context, statementId, lineId, transactionId, invoiceId, previousMatch, action = AUDIT_ACTIONS.STATEMENT_MATCH_CONFIRMED, matchScore = 100, matchMethod = "MANUAL", reason = "Jumelage manuel confirmé." }) {
  if (!ROLE_ALLOWLIST.has(identity?.role)) throw new Error("Le rôle KIM ou ADMIN est requis.");
  const line = context.lines.find((candidate) => candidate.id === lineId && candidate.statement?.id === statementId);
  const transaction = context.transactions.find((candidate) => candidate.id === transactionId);
  if (!line || !transaction) throw new Error("Ligne ou transaction introuvable.");
  const profile = profileForIdentity(context.profiles, identity);
  if (!profile) throw new Error("Profil comptable introuvable.");
  const matchId = previousMatch?.id ?? `MATCH-${lineId}`;
  const previousExpenseTransactionId = previousMatch?.expenseTransaction?.id ?? null;
  const details = { before: previousMatch ? { expenseTransactionId: previousMatch.expenseTransaction?.id ?? null, invoiceId: previousMatch.invoice?.id ?? null, status: previousMatch.status } : null, after: { expenseTransactionId: transactionId, invoiceId: invoiceId ?? null, status: RECONCILIATION_STATUSES.MATCHED } };
  if (previousExpenseTransactionId && previousExpenseTransactionId !== transactionId) {
    await clearReconciliationAssociation({ dataConnect, identity, matchId, lineId, expenseTransactionId: previousExpenseTransactionId, suffix: "before-change" });
  }
  const variables = {
    id: matchId,
    statementLineId: lineId,
    expenseTransactionId: transactionId,
    matchScore,
    matchMethod,
    status: RECONCILIATION_STATUSES.MATCHED,
    confirmedById: profile.id,
    confirmedAt: new Date().toISOString(),
    reason,
    details: auditDetails(details),
    lineStatus: RECONCILIATION_STATUSES.MATCHED,
    transactionReconciliationStatus: RECONCILIATION_STATUSES.MATCHED,
    auditEventId: auditEventId(lineId, action),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditAction: action,
    auditDetails: auditDetails(details),
    expectedMatchId: previousMatch?.id ?? null,
    expectedExpenseTransactionId: previousExpenseTransactionId === transactionId ? previousExpenseTransactionId : null,
    expectedMatchStatus: previousMatch?.id ? (previousExpenseTransactionId && previousExpenseTransactionId !== transactionId ? "UNLINKED" : previousMatch.status) : null,
  };
  await dataConnect.executeMutation(invoiceId ? "PersistReconciliationMatch" : "PersistReconciliationMatchWithoutInvoice", invoiceId ? { ...variables, invoiceId } : variables);
  return { ...variables, statementId, lineId, transactionId, invoiceId: invoiceId ?? null };
}

export async function resolveOutsideControl({ dataConnect, identity, context, controlId, resolutionNote }) {
  if (!ROLE_ALLOWLIST.has(identity?.role)) throw new Error("Le rôle KIM ou ADMIN est requis.");
  const control = context.outsideControls.find((candidate) => candidate.id === controlId);
  if (!control) throw new Error("Contrôle OUTSIDE_STATEMENT introuvable.");
  const profile = profileForIdentity(context.profiles, identity);
  if (!profile) throw new Error("Profil comptable introuvable.");
  await dataConnect.executeMutation("ResolveReconciliationOutsideControl", {
    id: controlId,
    status: "RESOLVED",
    resolvedById: profile.id,
    resolutionNote: resolutionNote || "Cas hors relevé résolu manuellement.",
    auditEventId: auditEventId(controlId, AUDIT_ACTIONS.STATEMENT_OUTSIDE_RESOLVED),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditDetails: auditDetails({ before: control, after: { status: "RESOLVED", resolutionNote } }),
  });
  return { controlId, status: "RESOLVED" };
}

export async function persistLineStatus({ dataConnect, identity, statementId, lineId, status, previousResult }) {
  if (!ROLE_ALLOWLIST.has(identity?.role)) throw new Error("Le rôle KIM ou ADMIN est requis.");
  const allowed = new Set([RECONCILIATION_STATUSES.MISSING_INVOICE, RECONCILIATION_STATUSES.IGNORED, RECONCILIATION_STATUSES.REVIEW]);
  if (!allowed.has(status)) throw new Error("Statut manuel invalide.");
  const details = { before: { status: previousResult?.status ?? null, match: previousResult?.match ?? null }, after: { status, match: null } };
  const action = status === RECONCILIATION_STATUSES.IGNORED ? AUDIT_ACTIONS.STATEMENT_LINE_IGNORED : status === RECONCILIATION_STATUSES.MISSING_INVOICE ? AUDIT_ACTIONS.STATEMENT_MISSING_INVOICE_CONFIRMED : AUDIT_ACTIONS.RECONCILIATION_STATUS_UPDATED;
  const previousExpenseTransactionId = previousResult?.match?.expenseTransactionId ?? null;
  if (previousResult?.persistedMatchId && previousExpenseTransactionId) {
    await clearReconciliationAssociation({ dataConnect, identity, matchId: previousResult.persistedMatchId, lineId, expenseTransactionId: previousExpenseTransactionId, suffix: "before-status" });
  }
  await dataConnect.executeMutation("PersistReconciliationLineStatus", {
    id: `MATCH-${lineId}`,
    statementLineId: lineId,
    status,
    reason: status === RECONCILIATION_STATUSES.IGNORED ? "Ligne ignorée manuellement." : status === RECONCILIATION_STATUSES.MISSING_INVOICE ? "Facture manquante confirmée manuellement." : "Ligne rouverte pour vérification.",
    details: auditDetails(details),
    auditEventId: auditEventId(lineId, action),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditAction: action,
    auditDetails: auditDetails(details),
    expectedMatchId: previousResult?.persistedMatchId ?? null,
    expectedExpenseTransactionId: null,
    expectedMatchStatus: previousResult?.persistedMatchId ? (previousExpenseTransactionId ? "UNLINKED" : previousResult.status) : null,
  });
  return { statementId, lineId, status, action };
}

export async function persistOutsideControls({ dataConnect, identity, reconciliation }) {
  if (!ROLE_ALLOWLIST.has(identity?.role)) throw new Error("Le rôle KIM ou ADMIN est requis.");
  const results = [];
  for (const outside of reconciliation.outsideTransactions) {
    const id = `OUTSIDE-${reconciliation.statement.id}-${outside.transaction.id}`.slice(0, 128);
    await dataConnect.executeMutation("UpsertReconciliationOutsideControl", {
      id,
      statementId: reconciliation.statement.id,
      expenseTransactionId: outside.transaction.id,
      status: RECONCILIATION_STATUSES.OUTSIDE_STATEMENT,
      reason: outside.reason,
      auditEventId: auditEventId(id, "RECONCILIATION_OUTSIDE_DETECTED"),
      actorUid: identity.uid,
      actorRole: identity.role,
      auditDetails: auditDetails({ statementId: reconciliation.statement.id, expenseTransactionId: outside.transaction.id }),
    });
    results.push(id);
  }
  return results;
}

export async function upsertHolderHistory({ dataConnect, identity, context, input }) {
  if (identity?.role !== "ADMIN") throw new Error("Le rôle ADMIN est requis pour modifier l’historique des titulaires.");
  validateHistoryOverlap(context.histories, input);
  const profile = profileForIdentity(context.profiles, identity);
  if (!profile) throw new Error("Profil ADMIN introuvable.");
  await dataConnect.executeMutation("UpsertCreditCardHolderHistory", {
    ...input,
    auditEventId: auditEventId(input.id, AUDIT_ACTIONS.CARD_HOLDER_HISTORY_UPDATED),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditDetails: auditDetails({ before: context.histories.find((row) => row.id === input.id) ?? null, after: input }),
  });
}

export async function upsertMerchantAlias({ dataConnect, identity, context, input }) {
  if (identity?.role !== "ADMIN") throw new Error("Le rôle ADMIN est requis pour modifier les alias marchands.");
  if (!input.merchantRawKey || !input.merchantCanonical) throw new Error("Alias marchand incomplet.");
  const profile = profileForIdentity(context.profiles, identity);
  if (!profile) throw new Error("Profil ADMIN introuvable.");
  await dataConnect.executeMutation("UpsertMerchantAlias", {
    ...input,
    merchantNormalized: input.merchantNormalized ?? input.merchantCanonical,
    createdById: profile.id,
    auditEventId: auditEventId(input.id, AUDIT_ACTIONS.MERCHANT_ALIAS_UPDATED),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditDetails: auditDetails({ before: context.aliases.find((row) => row.id === input.id) ?? null, after: input }),
  });
}
