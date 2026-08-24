"use client";

import {
  listCardStatementPeriods,
  listCreditCards,
  listExpenseAccounts,
  listExpenseTransactions,
  listInvoiceIntakes,
  listInvoicesToReview,
  listProjects,
  listSkuReferences,
  listUserProfiles,
  deleteExpenseAccount as deleteExpenseAccountMutation,
  deleteProject as deleteProjectMutation,
  upsertCardStatementPeriod,
  upsertCreditCard,
  upsertExpenseAccount,
  upsertProject,
  upsertUserProfile,
  updateInvoiceIntakeReview,
} from "../generated/data-connect/esm/index.esm.js";
import type {
  ListCardStatementPeriodsData,
  ListCreditCardsData,
  ListExpenseAccountsData,
  ListExpenseTransactionsData,
  ListInvoiceIntakesData,
  ListInvoicesToReviewData,
  ListProjectsData,
  ListSkuReferencesData,
  ListUserProfilesData,
} from "../generated/data-connect";
import { firebaseAuth } from "./client";
import { firebaseDataConnect, sqlConnectConfigured } from "./data-connect";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";
import { isDemoIdentifier, isDemoOrE2EInvoiceIntake } from "../lib/demo-data-policy.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../lib/audit-events.mjs";
import { createClientId } from "../lib/client-id.mjs";

export type AppAccountingData = {
  users: Array<{
    id: string;
    firebaseUid: string;
    displayName: string;
    email?: string;
    jobTitle?: string;
    role: string;
    status: string;
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
    invoiceNumber: string;
    note: string;
    sku?: string;
    correctionField?: "subtotal" | "account" | "attachment";
  }>;
  intakes: Array<{
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    status: string;
    processingStatus?: string;
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
  writeAudit?: boolean;
  decisionExceptions?: string;
  decisionChecks?: string;
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
  accountCode: string;
  cardId: string;
  statementPeriodId: string | null;
  projectId: string;
  classificationNote: string;
};

export type UserProfileInput = {
  id: string;
  firebaseUid: string;
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

export async function createFirebaseUser(input: { displayName: string; email: string; password: string; jobTitle: string; role: string }, idToken: string) {
  const response = await fetch("/api/admin/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(input),
  });
  const body = await response.json().catch(() => ({})) as { error?: string; uid?: string; role?: string };
  if (!response.ok || !body.uid) {
    throw new Error(body.error ?? "Le compte Firebase n'a pas pu être créé.");
  }
  return { uid: body.uid, role: body.role ?? input.role };
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
    decisionExceptions: input.decisionExceptions ?? "[]",
    decisionChecks: input.decisionChecks ?? "[]",
    writeAudit: input.writeAudit ?? true,
    auditEventId: auditEventId(input.receiptId, AUDIT_ACTIONS.HUMAN_CORRECTION, createClientId()),
    auditDetails: input.auditDetails ?? auditDetails({ status: input.status }),
  });

  if (result.data.invoiceIntake_updateMany === 0) {
    const current = (await listInvoiceIntakes(firebaseDataConnect)).data.invoiceIntakes.find(
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
      authorization: `Bearer ${await user.getIdToken()}`,
      "x-invoice-client-version": INVOICE_CLIENT_VERSION,
    },
    body: JSON.stringify(input),
  });
  const payload = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error ?? "La création de l'écriture comptable a échoué.");
  }
}

export async function loadAccountingSnapshot(): Promise<AccountingSnapshot> {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error(
      "SQL Connect n'est pas configuré. Fournissez NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID avant de charger les données Firebase.",
    );
  }

  const [users, cards, periods, accounts, projects, skuReferences, transactions, invoices, intakes] =
    await Promise.all([
      listUserProfiles(firebaseDataConnect),
      listCreditCards(firebaseDataConnect),
      listCardStatementPeriods(firebaseDataConnect),
      listExpenseAccounts(firebaseDataConnect),
      listProjects(firebaseDataConnect),
      listSkuReferences(firebaseDataConnect),
      listExpenseTransactions(firebaseDataConnect),
      listInvoicesToReview(firebaseDataConnect),
      listInvoiceIntakes(firebaseDataConnect),
    ]);

  return {
    users: users.data.userProfiles,
    cards: cards.data.creditCards,
    periods: periods.data.cardStatementPeriods,
    accounts: accounts.data.expenseAccounts,
    projects: projects.data.projects,
    skuReferences: skuReferences.data.skuReferences,
    transactions: transactions.data.expenseTransactions,
    invoices: invoices.data.invoices,
    intakes: intakes.data.invoiceIntakes,
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
  return {
    users: snapshot.users.map((user) => ({
      id: user.id,
      firebaseUid: user.firebaseUid,
      displayName: user.displayName,
      ...(user.email ? { email: user.email } : {}),
      ...(user.jobTitle ? { jobTitle: user.jobTitle } : {}),
      role: user.role,
      status: user.status,
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
    transactions: snapshot.transactions.map((transaction) => ({
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
      imageCount: 0,
      invoiceNumber: transaction.invoiceNumber ?? "—",
      note: transaction.classificationNote ?? "Classification issue de SQL Connect.",
      ...(transaction.sku ? { sku: transaction.sku } : {}),
    })),
    intakes: snapshot.intakes.map((intake) => ({
      receiptId: intake.receiptId,
      uploaderUid: intake.uploaderUid,
      storageFolder: intake.storageFolder,
      photoCount: intake.photoCount,
      status: intake.status,
      processingStatus: intake.processingStatus,
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
