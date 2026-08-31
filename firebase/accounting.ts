"use client";

import {
  listCardStatementPeriodsPage,
  listCreditCardsPage,
  listExpenseAccountsPage,
  listExpenseTransactionsPage,
  listInvoiceIntakesPage,
  listInvoicesToReviewPage,
  listProjectsPage,
  listSkuReferencesPage,
  listUserProfiles,
  deleteExpenseAccount as deleteExpenseAccountMutation,
  deleteProject as deleteProjectMutation,
  upsertCardStatementPeriod,
  upsertCreditCard,
  upsertExpenseAccount,
  upsertProject,
  upsertUserProfile,
  updateInvoiceIntakeReview,
  listReportAdjustmentSets,
  upsertReportAdjustmentSet,
  correctPostedInvoice as correctPostedInvoiceMutation,
  listTransactionCorrections,
} from "../generated/data-connect/esm/index.esm.js";
import type {
  ListCardStatementPeriodsData,
  ListCreditCardsData,
  ListExpenseAccountsData,
  ListExpenseTransactionsData,
  ListInvoiceIntakesData,
  ListInvoicesToReviewData,
  ListReportAdjustmentSetsData,
  ListTransactionCorrectionsData,
  ListProjectsData,
  ListSkuReferencesData,
  ListUserProfilesData,
} from "../generated/data-connect";
import { executeMutation, mutationRef } from "firebase/data-connect";
import { firebaseAuth } from "./client";
import { firebaseDataConnect, sqlConnectConfigured } from "./data-connect";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";
import { isDemoIdentifier, isDemoOrE2EInvoiceIntake } from "../lib/demo-data-policy.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../lib/audit-events.mjs";
import { createClientId } from "../lib/client-id.mjs";
import { normalizeManualAdjustmentRows, parseManualAdjustmentRows, serializeManualAdjustmentRows } from "../lib/manual-adjustments.mjs";
import { collectPagedRows as collectPagedRowsUntyped } from "../lib/pagination.mjs";

export type AccountingLineItem = {
  sequence: number;
  description: string;
  quantity: number | null;
  unitPriceCents: number | null;
  amountCents: number | null;
  sku: string | null;
  category: string | null;
  accountCode: string | null;
  classificationSource: string | null;
  classificationConfidence: number | null;
  classificationStatus: string | null;
  classificationNote: string | null;
};

function parseInvoiceLineItems(value: string | null | undefined): AccountingLineItem[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => ({
      sequence: Number(item?.sequence) || index + 1,
      description: String(item?.description ?? ""),
      quantity: item?.quantity == null ? null : Number(item.quantity),
      unitPriceCents: item?.unitPriceCents == null ? null : Number(item.unitPriceCents),
      amountCents: item?.amountCents == null ? null : Number(item.amountCents),
      sku: item?.sku == null ? null : String(item.sku),
      category: item?.category == null ? null : String(item.category),
      accountCode: item?.accountCode == null ? null : String(item.accountCode),
      classificationSource: item?.classificationSource == null ? null : String(item.classificationSource),
      classificationConfidence: item?.classificationConfidence == null ? null : Number(item.classificationConfidence),
      classificationStatus: item?.classificationStatus == null ? null : String(item.classificationStatus),
      classificationNote: item?.classificationNote == null ? null : String(item.classificationNote),
    }));
  } catch {
    return [];
  }
}

export type AppAccountingData = {
  users: Array<{
    id: string;
    firebaseUid?: string | null;
    displayName: string;
    email?: string | null;
    jobTitle?: string | null;
    role: string;
    status: string;
    invitationStatus?: string | null;
    invitationSentAt?: string | null;
    invitationSentBy?: string | null;
    lastInvitationError?: string | null;
    activatedAt?: string | null;
  }>;
  accounts: Array<{ id: string; number: string; code: string; label: string; type: string; status?: string }>;
  cards: Array<{
    id: string;
    lastFour: string;
    holderId?: string;
    holder: string;
    function: string;
    startDate: string;
    endDate?: string;
    status: "Actif" | "Inactif";
  }>;
  periods: Array<{
    id: string;
    label: string;
    start: string;
    end: string;
    statementLabel: string;
    manualAdjustmentRows?: ManualAdjustmentRow[];
    status?: string;
  }>;
  projects: Array<{ id: string; number: string; name: string; status?: string }>;
  skuReferences: Array<{
    merchant: string;
    sku: string;
    label: string;
    category: string;
    accountCode: string;
    status: "Validé" | "À confirmer";
  }>;
  transactions: Array<{
    id: string;
    date: string;
    vendor: string;
    submittedBy: string;
    person: string;
    card: string;
    project: string;
    projectId?: string;
    projectNumber?: string;
    projectName?: string;
    category: string;
    accountId?: string;
    accountNumber?: string;
    accountLabel?: string;
    subtotal: number;
    tps: number;
    tvq: number;
    total: number;
    status: "À vérifier" | "À valider" | "Validée";
    processingStatus?: string;
    accountingStatus?: string;
    reconciliation: "Non rapprochée" | "Rapprochée" | "Facture manquante";
    issue?: string;
    correction?: string;
    imageCount: number;
    invoiceId?: string;
    receiptId?: string;
    storageFolder?: string;
    photoPaths?: Array<{ storagePath: string; contentType: string; sequence: number }>;
    invoiceNumber: string;
    note: string;
    sku?: string;
    lineItems?: AccountingLineItem[];
    correctionField?: "subtotal" | "account" | "attachment";
  }>;
  intakes: Array<{
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    status: string;
    processingStatus?: string;
    processingState?: string;
    processingAttempts?: number;
    reviewRevision?: number;
    lastAttemptAt?: string | null;
    accountingStatus?: string;
    lastError?: string;
    aiModel?: string;
    aiConfidence?: number;
    extractedVendor?: string;
    extractedInvoiceNumber?: string;
    extractedInvoiceDate?: string;
    extractedSubtotalCents?: string;
    extractedTpsCents?: string;
    extractedTvqCents?: string;
    extractedTotalCents?: string;
    extractedCurrency?: string;
    extractedSku?: string;
    extractedCategory?: string;
    extractedProjectId?: string;
    classificationAccountCode?: string;
    classificationCategory?: string;
    classificationSource?: string;
    classificationConfidence?: number;
    classificationStatus?: string;
    lineItems?: AccountingLineItem[];
    aiNotes?: string;
    decisionExceptions?: string;
    decisionChecks?: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type AccountingSnapshot = {
  users: ListUserProfilesData["userProfiles"];
  cards: ListCreditCardsData["creditCards"];
  periods: ListCardStatementPeriodsData["cardStatementPeriods"];
  accounts: ListExpenseAccountsData["expenseAccounts"];
  projects: ListProjectsData["projects"];
  skuReferences: ListSkuReferencesData["skuReferences"];
  transactions: ListExpenseTransactionsData["expenseTransactions"];
  invoices: ListInvoicesToReviewData["invoices"];
  intakes: ListInvoiceIntakesData["invoiceIntakes"];
};

/**
 * SQL Connect is opt-in until the connector ID is present in the environment.
 * This keeps the local preview deterministic and prevents a half-configured
 * browser from making a network call to the production service.
 */
export const accountingReadSource = sqlConnectConfigured
  ? "firebase-sql-connect"
  : "demo";

const DATA_CONNECT_PAGE_SIZE = 200;
const collectPagedRows = collectPagedRowsUntyped as <T>(
  readPage: (variables: { limit: number; offset: number }) => Promise<T[]>,
  options?: { pageSize?: number },
) => Promise<T[]>;

async function readAllPages<T>(readPage: (variables: { limit: number; offset: number }) => Promise<{ rows: T[] }>) {
  return collectPagedRows(async (variables) => (await readPage(variables)).rows, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

async function readAllExpenseTransactions(): Promise<ListExpenseTransactionsData["expenseTransactions"]> {
  return readAllPages(async (variables) => {
    const page = await listExpenseTransactionsPage(firebaseDataConnect!, variables);
    return { rows: page.data.expenseTransactions };
  });
}

async function readAllInvoicesToReview(): Promise<ListInvoicesToReviewData["invoices"]> {
  return readAllPages(async (variables) => {
    const page = await listInvoicesToReviewPage(firebaseDataConnect!, variables);
    return { rows: page.data.invoices };
  });
}

async function readAllInvoiceIntakes(): Promise<ListInvoiceIntakesData["invoiceIntakes"]> {
  return readAllPages(async (variables) => {
    const page = await listInvoiceIntakesPage(firebaseDataConnect!, variables);
    return { rows: page.data.invoiceIntakes };
  });
}

async function readAllUserProfiles(): Promise<ListUserProfilesData["userProfiles"]> {
  return readAllPages(async (variables) => {
    const page = await listUserProfiles(firebaseDataConnect!, variables);
    return { rows: page.data.userProfiles };
  });
}

async function readAllCreditCards(): Promise<ListCreditCardsData["creditCards"]> {
  return readAllPages(async (variables) => {
    const page = await listCreditCardsPage(firebaseDataConnect!, variables);
    return { rows: page.data.creditCards };
  });
}

async function readAllCardStatementPeriods(): Promise<ListCardStatementPeriodsData["cardStatementPeriods"]> {
  return readAllPages(async (variables) => {
    const page = await listCardStatementPeriodsPage(firebaseDataConnect!, variables);
    return { rows: page.data.cardStatementPeriods };
  });
}

async function readAllExpenseAccounts(): Promise<ListExpenseAccountsData["expenseAccounts"]> {
  return readAllPages(async (variables) => {
    const page = await listExpenseAccountsPage(firebaseDataConnect!, variables);
    return { rows: page.data.expenseAccounts };
  });
}

async function readAllProjects(): Promise<ListProjectsData["projects"]> {
  return readAllPages(async (variables) => {
    const page = await listProjectsPage(firebaseDataConnect!, variables);
    return { rows: page.data.projects };
  });
}

async function readAllSkuReferences(): Promise<ListSkuReferencesData["skuReferences"]> {
  return readAllPages(async (variables) => {
    const page = await listSkuReferencesPage(firebaseDataConnect!, variables);
    return { rows: page.data.skuReferences };
  });
}

export type InvoiceIntakeReviewInput = {
  receiptId: string;
  status: "NEEDS_REVIEW" | "VALIDATED";
  vendor: string;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  subtotalCents: number;
  tpsCents: number;
  tvqCents: number;
  totalCents: number;
  currency: string;
  sku: string | null;
  category: string | null;
  projectId: string | null;
  accountCode: string | null;
  classificationCategory: string | null;
  classificationSource: string;
  classificationConfidence: number;
  classificationStatus: string;
  aiNotes: string;
  lineItems: string;
  writeAudit?: boolean;
  decisionExceptions?: string;
  decisionChecks?: string;
  reviewRevision?: number;
  auditDetails?: string;
};

export type InvoiceIntakeCommitInput = {
  receiptId: string;
  vendor: string;
  invoiceNumber: string | null;
  invoiceDate: string;
  subtotalCents: number;
  tpsCents: number;
  tvqCents: number;
  totalCents: number;
  currency: string;
  sku: string | null;
  category: string;
  accountCode: string | null;
  cardId: string;
  statementPeriodId: string | null;
  projectId: string | null;
  classificationNote: string;
  lineItems: string;
};

export type ManualAdjustmentRow = {
  index: number;
  description: string;
  amountCents: number | null;
};

export type ReportAdjustmentScope = {
  periodKey: string;
  periodStart: string;
  periodEnd: string;
  projectId: string | null;
  holderId: string | null;
};

export type UserProfileInput = {
  id: string;
  firebaseUid: string | null;
  displayName: string;
  email: string | null;
  jobTitle: string | null;
  role: string;
  status: string;
};

export type CreditCardInput = {
  id: string;
  lastFour: string;
  holderId: string;
  cardFunction: string | null;
  status: string;
  activeFrom: string | null;
  inactiveFrom: string | null;
};

export type ProjectInput = { id: string; number: string; name: string; status: string; auditAction?: string; auditDetails?: string };
export type ExpenseAccountInput = { id: string; number: string; label: string; type: string; status: string; auditAction?: string; auditDetails?: string };
export type StatementPeriodInput = { id: string; label: string; startDate: string; endDate: string; statementLabel: string | null; status: string };

export async function saveUserProfile(input: UserProfileInput) {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("SQL Connect est requis pour enregistrer le profil.");
  }
  await upsertUserProfile(firebaseDataConnect, input);
}

export async function saveCreditCard(input: CreditCardInput) {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("SQL Connect est requis pour enregistrer la carte.");
  }
  await upsertCreditCard(firebaseDataConnect, input);
}

export async function saveProject(input: ProjectInput) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour enregistrer le projet.");
  await upsertProject(firebaseDataConnect, {
    ...input,
    auditAction: input.auditAction ?? AUDIT_ACTIONS.PROJECT_UPDATED,
    auditEventId: auditEventId(input.id, input.auditAction ?? AUDIT_ACTIONS.PROJECT_UPDATED, createClientId()),
    auditDetails: input.auditDetails ?? auditDetails({ number: input.number, name: input.name, status: input.status }),
  });
}

export async function saveExpenseAccount(input: ExpenseAccountInput) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour enregistrer le compte.");
  await upsertExpenseAccount(firebaseDataConnect, {
    ...input,
    auditAction: input.auditAction ?? AUDIT_ACTIONS.ACCOUNT_UPDATED,
    auditEventId: auditEventId(input.id, input.auditAction ?? AUDIT_ACTIONS.ACCOUNT_UPDATED, createClientId()),
    auditDetails: input.auditDetails ?? auditDetails({ number: input.number, label: input.label, type: input.type, status: input.status }),
  });
}

export async function deleteProject(input: { id: string; auditDetails?: string }) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour supprimer le projet.");
  await deleteProjectMutation(firebaseDataConnect, {
    id: input.id,
    auditEventId: auditEventId(input.id, AUDIT_ACTIONS.PROJECT_DELETED, createClientId()),
    auditDetails: input.auditDetails ?? auditDetails({ action: AUDIT_ACTIONS.PROJECT_DELETED }),
  });
}

export async function deleteExpenseAccount(input: { id: string; auditDetails?: string }) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour supprimer le compte.");
  await deleteExpenseAccountMutation(firebaseDataConnect, {
    id: input.id,
    auditEventId: auditEventId(input.id, AUDIT_ACTIONS.EXPENSE_ACCOUNT_DELETED, createClientId()),
    auditDetails: input.auditDetails ?? auditDetails({ action: AUDIT_ACTIONS.EXPENSE_ACCOUNT_DELETED }),
  });
}

export async function saveStatementPeriod(input: StatementPeriodInput) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour enregistrer la période.");
  await upsertCardStatementPeriod(firebaseDataConnect, input);
}

export async function saveStatementManualAdjustments(input: { id: string; rows: ManualAdjustmentRow[]; auditDetails?: string }) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour enregistrer les ajustements de période.");
  const rows = normalizeManualAdjustmentRows(input.rows);
  await executeMutation(mutationRef(firebaseDataConnect, "SaveStatementManualAdjustments", {
    id: input.id,
    manualAdjustmentsJson: serializeManualAdjustmentRows(rows),
    auditEventId: auditEventId(input.id, AUDIT_ACTIONS.STATEMENT_ADJUSTMENTS_UPDATED, createClientId()),
    auditDetails: input.auditDetails ?? auditDetails({ after: rows }),
  }));
}

function reportAdjustmentSetId(scope: ReportAdjustmentScope) {
  return `ADJ-${scope.periodKey}-${scope.projectId ?? "ALL"}-${scope.holderId ?? "ALL"}`.replace(/[^A-Za-z0-9_-]/g, "_");
}

export async function loadReportAdjustments(scope: ReportAdjustmentScope) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour charger les ajustements.");
  const rows = await readAllPages<ListReportAdjustmentSetsData["reportAdjustmentSets"][number]>(async (variables) => {
    const result = await listReportAdjustmentSets(firebaseDataConnect!, { periodKey: scope.periodKey, ...variables });
    return { rows: result.data.reportAdjustmentSets };
  });
  const match = rows.find((row: ListReportAdjustmentSetsData["reportAdjustmentSets"][number]) =>
    row.projectId === scope.projectId && row.holderId === scope.holderId &&
    row.periodStart === scope.periodStart && row.periodEnd === scope.periodEnd,
  );
  return parseManualAdjustmentRows(match?.rowsJson);
}

export async function saveReportAdjustments(input: { scope: ReportAdjustmentScope; rows: ManualAdjustmentRow[]; auditDetails?: string }) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour enregistrer les ajustements.");
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour enregistrer les ajustements.");
  const rows = normalizeManualAdjustmentRows(input.rows);
  await upsertReportAdjustmentSet(firebaseDataConnect, {
    id: reportAdjustmentSetId(input.scope),
    periodKey: input.scope.periodKey,
    periodStart: input.scope.periodStart,
    periodEnd: input.scope.periodEnd,
    projectId: input.scope.projectId,
    holderId: input.scope.holderId,
    rowsJson: serializeManualAdjustmentRows(rows),
    actorUid: user.uid,
    auditEventId: auditEventId(reportAdjustmentSetId(input.scope), AUDIT_ACTIONS.REPORT_ADJUSTMENTS_UPDATED, createClientId()),
    auditDetails: input.auditDetails ?? auditDetails({ scope: input.scope, after: rows }),
  });
}

export type PostedInvoiceCorrectionInput = {
  invoiceId: string;
  transactionId: string;
  fieldName: string;
  previousValue: string | null;
  correctedValue: string;
  note: string;
  vendor: string;
  invoiceNumber: string | null;
  invoiceDate: string;
  subtotalCents: number;
  tpsCents: number;
  tvqCents: number;
  totalCents: number;
  lineItems: string;
  category: string;
  accountId: string | null;
};

export async function correctPostedInvoice(input: PostedInvoiceCorrectionInput) {
  if (!firebaseDataConnect || !sqlConnectConfigured) throw new Error("SQL Connect est requis pour corriger la facture.");
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour corriger la facture.");
  const result = await correctPostedInvoiceMutation(firebaseDataConnect, {
    correctionId: `CORR-${input.invoiceId}-${createClientId()}`,
    invoiceId: input.invoiceId,
    transactionId: input.transactionId,
    actorUserId: (await readAllUserProfiles()).find((profile: ListUserProfilesData["userProfiles"][number]) => profile.firebaseUid === user.uid)?.id ?? user.uid,
    fieldName: input.fieldName,
    previousValue: input.previousValue,
    correctedValue: input.correctedValue,
    note: input.note,
    vendor: input.vendor,
    invoiceNumber: input.invoiceNumber,
    invoiceDate: input.invoiceDate,
    subtotalCents: String(input.subtotalCents),
    tpsCents: String(input.tpsCents),
    tvqCents: String(input.tvqCents),
    totalCents: String(input.totalCents),
    lineItems: input.lineItems,
    category: input.category,
    account: input.accountId ? { id: input.accountId } : null,
    auditEventId: auditEventId(input.invoiceId, AUDIT_ACTIONS.POSTED_INVOICE_CORRECTED, createClientId()),
    auditDetails: auditDetails({ fieldName: input.fieldName, previousValue: input.previousValue, correctedValue: input.correctedValue, note: input.note }),
  });
  return result.data;
}

export async function loadTransactionCorrections(transactionId: string) {
  if (!firebaseDataConnect || !sqlConnectConfigured) return [];
  return readAllPages<ListTransactionCorrectionsData["transactionCorrections"][number]>(async (variables) => {
    const result = await listTransactionCorrections(firebaseDataConnect!, { transactionId, ...variables });
    return { rows: result.data.transactionCorrections };
  });
}

export type AdminUserAction =
  | { action: "create"; displayName: string; email: string; jobTitle: string; role: string; sendInvitation: boolean }
  | { action: "invite" | "reset"; profileId: string }
  | { action: "status"; profileId: string; status: "ACTIVE" | "INACTIVE" }
  | { action: "update-email"; profileId: string; email: string };

export type AdminUserActionProfile = AppAccountingData["users"][number] & {
  invitationStatus?: string | null;
  invitationSentAt?: string | null;
  invitationSentBy?: string | null;
  lastInvitationError?: string | null;
  activatedAt?: string | null;
  authAccount?: boolean;
  authState?: string;
};

export class AdminUserActionError extends Error {
  profile?: AdminUserActionProfile;

  constructor(message: string, profile?: AdminUserActionProfile) {
    super(message);
    this.name = "AdminUserActionError";
    this.profile = profile;
  }
}

export async function runAdminUserAction(input: AdminUserAction, idToken: string) {
  const response = await fetch("/api/admin/invitations", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(input),
  });
  const body = await response.json().catch(() => ({})) as { error?: string; profile?: AdminUserActionProfile };
  if (!response.ok || !body.profile) {
    throw new AdminUserActionError(body.error ?? "L’opération d’accès utilisateur a échoué.", body.profile);
  }
  return body.profile;
}

export async function loadAdminUserAccess(idToken: string) {
  const response = await fetch("/api/admin/invitations", {
    headers: { authorization: `Bearer ${idToken}` },
    cache: "no-store",
  });
  const body = await response.json().catch(() => ({})) as { error?: string; users?: AdminUserActionProfile[] };
  if (!response.ok || !body.users) throw new Error(body.error ?? "La liste des accès utilisateur est indisponible.");
  return body.users;
}

export async function setFirebaseUserDisabled(uid: string, disabled: boolean, idToken: string) {
  const response = await fetch("/api/admin/users", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ uid, disabled }),
  });
  const body = await response.json().catch(() => ({})) as { error?: string };
  if (!response.ok) throw new Error(body.error ?? "Le statut du compte Firebase n'a pas pu être modifié.");
}

export async function saveInvoiceIntakeReview(input: InvoiceIntakeReviewInput) {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("SQL Connect est requis pour enregistrer la revue.");
  }

  const result = await updateInvoiceIntakeReview(firebaseDataConnect, {
    receiptId: input.receiptId,
    status: input.status,
    extractedVendor: input.vendor,
    extractedInvoiceNumber: input.invoiceNumber,
    extractedInvoiceDate: input.invoiceDate,
    extractedSubtotalCents: String(input.subtotalCents),
    extractedTpsCents: String(input.tpsCents),
    extractedTvqCents: String(input.tvqCents),
    extractedTotalCents: String(input.totalCents),
    extractedCurrency: input.currency,
    extractedSku: input.sku,
    extractedCategory: input.category,
    extractedProjectId: input.projectId,
    classificationAccountCode: input.accountCode,
    classificationCategory: input.classificationCategory,
    classificationSource: input.classificationSource,
    classificationConfidence: input.classificationConfidence,
    classificationStatus: input.classificationStatus,
    aiNotes: input.aiNotes,
    extractedLineItems: input.lineItems,
    decisionExceptions: input.decisionExceptions ?? "[]",
    decisionChecks: input.decisionChecks ?? "[]",
    expectedReviewRevision: input.reviewRevision ?? 0,
    nextReviewRevision: (input.reviewRevision ?? 0) + 1,
    writeAudit: input.writeAudit ?? true,
    auditEventId: auditEventId(input.receiptId, AUDIT_ACTIONS.HUMAN_CORRECTION, createClientId()),
    auditDetails: input.auditDetails ?? auditDetails({ status: input.status }),
  });

  if (result.data.invoiceIntake_updateMany === 0) {
    const current = (await readAllInvoiceIntakes()).find(
      (intake: ListInvoiceIntakesData["invoiceIntakes"][number]) => intake.receiptId === input.receiptId,
    );
    if (current?.accountingStatus === "POSTED") {
      throw new Error("Cette facture est déjà comptabilisée; la correction n’a pas été réappliquée.");
    }
    throw new Error("La facture n’est plus dans un état révisable.");
  }
}

export async function commitInvoiceIntake(input: InvoiceIntakeCommitInput) {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("SQL Connect est requis pour créer l'écriture comptable.");
  }
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour comptabiliser la facture.");
  const response = await fetch("/api/invoices/commit-intake", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // Commit is privileged; refresh custom claims after a role change.
      authorization: `Bearer ${await user.getIdToken(true)}`,
      "x-invoice-client-version": INVOICE_CLIENT_VERSION,
    },
    body: JSON.stringify(input),
  });
  const payload = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error ?? "La création de l'écriture comptable a échoué.");
  }
}

export async function discardInvoiceIntake(input: { receiptId: string; reason: string }) {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("SQL Connect est requis pour supprimer la facture.");
  }
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour supprimer la facture.");
  const response = await fetch("/api/invoices/discard-intake", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${await user.getIdToken()}`,
      "x-invoice-client-version": INVOICE_CLIENT_VERSION,
    },
    body: JSON.stringify(input),
  });
  const payload = await response.json().catch(() => null) as { ok?: boolean; error?: string; storageCleanup?: string } | null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error ?? "La facture n'a pas pu être supprimée.");
  }
  return { storageCleanup: payload.storageCleanup ?? "completed" };
}

export async function deletePostedInvoice(input: { invoiceId: string; transactionId: string; receiptId?: string; reason: string }) {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("SQL Connect est requis pour supprimer la facture publiée.");
  }
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour supprimer la facture publiée.");
  const response = await fetch("/api/invoices/delete-posted", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${await user.getIdToken()}`,
      "x-invoice-client-version": INVOICE_CLIENT_VERSION,
    },
    body: JSON.stringify(input),
  });
  const payload = await response.json().catch(() => null) as { ok?: boolean; error?: string; storageCleanup?: string } | null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error ?? "La facture publiée n'a pas pu être supprimée.");
  }
  return { storageCleanup: payload.storageCleanup ?? "not_applicable" };
}

export async function loadAccountingSnapshot(): Promise<AccountingSnapshot> {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error(
      "SQL Connect n'est pas configuré. Fournissez NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID avant de charger les données Firebase.",
    );
  }

  const [users, cards, periods, accounts, projects, skuReferences, transactions, invoices, intakes] =
    await Promise.all([
      readAllUserProfiles(),
      readAllCreditCards(),
      readAllCardStatementPeriods(),
      readAllExpenseAccounts(),
      readAllProjects(),
      readAllSkuReferences(),
      readAllExpenseTransactions(),
      readAllInvoicesToReview(),
      readAllInvoiceIntakes(),
    ]);

  return {
    users,
    cards,
    periods,
    accounts,
    projects,
    skuReferences,
    transactions,
    invoices,
    intakes,
  };
}

export function centsToCad(cents: string | number | null | undefined) {
  return Number(cents ?? 0) / 100;
}

function transactionStatus(value: string): AppAccountingData["transactions"][number]["status"] {
  if (value === "VALIDATED" || value === "AUTO_APPROVED") return "Validée";
  if (value === "TO_VALIDATE") return "À valider";
  return "À vérifier";
}

function reconciliationStatus(value: string): AppAccountingData["transactions"][number]["reconciliation"] {
  if (value === "MATCHED") return "Rapprochée";
  if (value === "MISSING_INVOICE") return "Facture manquante";
  return "Non rapprochée";
}

/** Convert the generated SDK shape into the shape already used by the demo UI. */
export function mapAccountingSnapshot(snapshot: AccountingSnapshot): AppAccountingData {
  const invoicesByTransactionId = new Map(snapshot.invoices.map((invoice) => [invoice.transaction.id, invoice]));

  return {
    users: snapshot.users.map((user) => ({
      id: user.id,
      firebaseUid: user.firebaseUid ?? null,
      displayName: user.displayName,
      ...(user.email ? { email: user.email } : {}),
      ...(user.jobTitle ? { jobTitle: user.jobTitle } : {}),
      role: user.role,
      status: user.status,
      invitationStatus: user.invitationStatus ?? "NOT_INVITED",
      invitationSentAt: user.invitationSentAt ?? null,
      invitationSentBy: user.invitationSentBy ?? null,
      lastInvitationError: user.lastInvitationError ?? null,
      activatedAt: user.activatedAt ?? null,
    })),
    accounts: snapshot.accounts.map((account) => ({ id: account.id, number: account.number, code: account.number, label: account.label, type: account.type, status: account.status })),
    cards: snapshot.cards.map((card) => ({
      id: card.id,
      lastFour: card.lastFour,
      holderId: card.holder.id,
      holder: card.holder.displayName,
      function: card.cardFunction ?? "—",
      startDate: card.activeFrom ?? "",
      ...(card.inactiveFrom ? { endDate: card.inactiveFrom } : {}),
      status: card.status === "ACTIVE" ? "Actif" : "Inactif",
    })),
    periods: snapshot.periods.map((period) => ({
      id: period.id,
      label: period.label,
      start: period.startDate,
      end: period.endDate,
      statementLabel: period.statementLabel ?? "Relevé Mastercard",
      manualAdjustmentRows: parseManualAdjustmentRows(period.manualAdjustmentsJson),
      status: period.status,
    })),
    projects: snapshot.projects.map((project) => ({ id: project.id, number: project.number, name: project.name, status: project.status })),
    skuReferences: snapshot.skuReferences.map((reference) => ({
      merchant: reference.merchant,
      sku: reference.sku,
      label: reference.productLabel ?? "Article à confirmer",
      category: reference.categoryLabel ?? "Divers",
      accountCode: reference.expenseAccount?.number ?? "—",
      status: reference.verificationStatus === "VALIDATED" ? "Validé" : "À confirmer",
    })),
    transactions: snapshot.transactions.map((transaction) => {
      const invoice = invoicesByTransactionId.get(transaction.id);
      const photoPaths = invoice?.invoicePhotos_on_invoice ?? [];
      return {
        id: transaction.id,
        date: transaction.transactionDate,
        vendor: transaction.vendor,
        submittedBy: transaction.card.holder.displayName,
        person: transaction.card.holder.displayName,
        card: transaction.card.lastFour,
        ...(transaction.statementPeriod?.id ? { periodId: transaction.statementPeriod.id } : {}),
        ...(transaction.project ? { projectId: transaction.project.id, projectNumber: transaction.project.number, projectName: transaction.project.name } : {}),
        project: transaction.project ? `${transaction.project.number} · ${transaction.project.name}` : "—",
        category: transaction.expenseAccount?.label ?? transaction.categoryLabel ?? "Divers",
        ...(transaction.expenseAccount ? { accountId: transaction.expenseAccount.id, accountNumber: transaction.expenseAccount.number, accountLabel: transaction.expenseAccount.label } : {}),
        subtotal: centsToCad(transaction.amountBeforeTaxCents),
        tps: centsToCad(transaction.tpsCents),
        tvq: centsToCad(transaction.tvqCents),
        total: centsToCad(transaction.totalCents),
        status: transactionStatus(transaction.processingStatus),
        processingStatus: transaction.processingStatus,
        accountingStatus: transaction.accountingStatus,
        reconciliation: reconciliationStatus(transaction.reconciliationStatus),
        ...(transaction.issue ? { issue: transaction.issue } : {}),
        imageCount: photoPaths.length || invoice?.intake?.photoCount || 0,
        ...(invoice?.id ? { invoiceId: invoice.id } : {}),
        ...(invoice?.intake?.receiptId ? { receiptId: invoice.intake.receiptId } : {}),
        ...((invoice?.storageFolder ?? invoice?.intake?.storageFolder) ? { storageFolder: invoice.storageFolder ?? invoice.intake?.storageFolder ?? undefined } : {}),
        ...(photoPaths.length ? { photoPaths: photoPaths.map((photo) => ({ storagePath: photo.storagePath, contentType: photo.contentType, sequence: photo.sequence })) } : {}),
        ...(invoice?.lineItems ? { lineItems: parseInvoiceLineItems(invoice.lineItems) } : {}),
        invoiceNumber: transaction.invoiceNumber ?? invoice?.invoiceNumber ?? "—",
        note: transaction.classificationNote ?? "Classification issue de SQL Connect.",
        ...(transaction.sku ? { sku: transaction.sku } : {}),
      };
    }),
    intakes: snapshot.intakes.map((intake) => ({
      receiptId: intake.receiptId,
      uploaderUid: intake.uploaderUid,
      storageFolder: intake.storageFolder,
      photoCount: intake.photoCount,
      status: intake.status,
      processingStatus: intake.processingStatus,
      processingState: intake.processingState,
      processingAttempts: intake.processingAttempts,
      reviewRevision: intake.reviewRevision,
      lastAttemptAt: intake.lastAttemptAt,
      accountingStatus: intake.accountingStatus,
      ...(intake.lastError ? { lastError: intake.lastError } : {}),
      ...(intake.aiModel ? { aiModel: intake.aiModel } : {}),
      ...(intake.aiConfidence != null ? { aiConfidence: intake.aiConfidence } : {}),
      ...(intake.extractedVendor ? { extractedVendor: intake.extractedVendor } : {}),
      ...(intake.extractedInvoiceNumber ? { extractedInvoiceNumber: intake.extractedInvoiceNumber } : {}),
      ...(intake.extractedInvoiceDate ? { extractedInvoiceDate: intake.extractedInvoiceDate } : {}),
      ...(intake.extractedSubtotalCents != null ? { extractedSubtotalCents: intake.extractedSubtotalCents } : {}),
      ...(intake.extractedTpsCents != null ? { extractedTpsCents: intake.extractedTpsCents } : {}),
      ...(intake.extractedTvqCents != null ? { extractedTvqCents: intake.extractedTvqCents } : {}),
      ...(intake.extractedTotalCents != null ? { extractedTotalCents: intake.extractedTotalCents } : {}),
      ...(intake.extractedCurrency ? { extractedCurrency: intake.extractedCurrency } : {}),
      ...(intake.extractedSku ? { extractedSku: intake.extractedSku } : {}),
      ...(intake.extractedCategory ? { extractedCategory: intake.extractedCategory } : {}),
      ...(intake.extractedProjectId ? { extractedProjectId: intake.extractedProjectId } : {}),
      ...(intake.classificationAccountCode ? { classificationAccountCode: intake.classificationAccountCode } : {}),
      ...(intake.classificationCategory ? { classificationCategory: intake.classificationCategory } : {}),
      ...(intake.classificationSource ? { classificationSource: intake.classificationSource } : {}),
      ...(intake.classificationConfidence != null ? { classificationConfidence: intake.classificationConfidence } : {}),
      ...(intake.classificationStatus ? { classificationStatus: intake.classificationStatus } : {}),
      ...(intake.extractedLineItems ? { lineItems: parseInvoiceLineItems(intake.extractedLineItems) } : {}),
      ...(intake.aiNotes ? { aiNotes: intake.aiNotes } : {}),
      ...(intake.decisionExceptions ? { decisionExceptions: intake.decisionExceptions } : {}),
      ...(intake.decisionChecks ? { decisionChecks: intake.decisionChecks } : {}),
      createdAt: intake.createdAt,
      updatedAt: intake.updatedAt,
    })),
  };
}

/**
 * Production must never render the controlled DEMO seed beside operational data.
 * The seed remains available in Firebase for validation, but the live UI only
 * exposes rows that can be tied to a real company reference.
 */
export function removeDemoAccountingData(data: AppAccountingData): AppAccountingData {
  return {
    ...data,
    users: data.users.filter((user) => !isDemoIdentifier(user.id) && !isDemoIdentifier(user.firebaseUid) && !user.email?.endsWith("@example.test")),
    accounts: data.accounts.filter((account) => !isDemoIdentifier(account.number)),
    cards: data.cards.filter((card) => !isDemoIdentifier(card.id)),
    periods: data.periods.filter((period) => !isDemoIdentifier(period.id)),
    projects: data.projects.filter((project) => !isDemoIdentifier(project.id)),
    skuReferences: data.skuReferences.filter((reference) => !isDemoIdentifier(reference.sku) && !reference.merchant.includes("Démo")),
    transactions: data.transactions.filter((transaction) => !isDemoIdentifier(transaction.id)),
    intakes: data.intakes.filter((intake) => !isDemoOrE2EInvoiceIntake(intake)),
  };
}
