"use client";

import {
  listCardStatementPeriods,
  listCreditCards,
  listExpenseAccounts,
  listExpenseTransactions,
  listInvoicesToReview,
  listProjects,
  listSkuReferences,
} from "../generated/data-connect/esm/index.esm.js";
import type {
  ListCardStatementPeriodsData,
  ListCreditCardsData,
  ListExpenseAccountsData,
  ListExpenseTransactionsData,
  ListInvoicesToReviewData,
  ListProjectsData,
  ListSkuReferencesData,
} from "../generated/data-connect";
import { firebaseDataConnect, sqlConnectConfigured } from "./data-connect";

export type AppAccountingData = {
  accounts: Array<{ code: string; label: string }>;
  cards: Array<{
    id: string;
    lastFour: string;
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
  }>;
  projects: string[];
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
    category: string;
    total: number;
    status: "À vérifier" | "À valider" | "Validée";
    reconciliation: "Non rapprochée" | "Rapprochée" | "Facture manquante";
    issue?: string;
    correction?: string;
    imageCount: number;
    invoiceNumber: string;
    note: string;
    sku?: string;
    correctionField?: "subtotal" | "account" | "attachment";
  }>;
};

export type AccountingSnapshot = {
  cards: ListCreditCardsData["creditCards"];
  periods: ListCardStatementPeriodsData["cardStatementPeriods"];
  accounts: ListExpenseAccountsData["expenseAccounts"];
  projects: ListProjectsData["projects"];
  skuReferences: ListSkuReferencesData["skuReferences"];
  transactions: ListExpenseTransactionsData["expenseTransactions"];
  invoices: ListInvoicesToReviewData["invoices"];
};

/**
 * SQL Connect is opt-in until the connector ID is present in the environment.
 * This keeps the local preview deterministic and prevents a half-configured
 * browser from making a network call to the production service.
 */
export const accountingReadSource = sqlConnectConfigured
  ? "firebase-sql-connect"
  : "demo";

export async function loadAccountingSnapshot(): Promise<AccountingSnapshot> {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error(
      "SQL Connect n'est pas configuré. Fournissez NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID avant de charger les données Firebase.",
    );
  }

  const [cards, periods, accounts, projects, skuReferences, transactions, invoices] =
    await Promise.all([
      listCreditCards(firebaseDataConnect),
      listCardStatementPeriods(firebaseDataConnect),
      listExpenseAccounts(firebaseDataConnect),
      listProjects(firebaseDataConnect),
      listSkuReferences(firebaseDataConnect),
      listExpenseTransactions(firebaseDataConnect),
      listInvoicesToReview(firebaseDataConnect),
    ]);

  return {
    cards: cards.data.creditCards,
    periods: periods.data.cardStatementPeriods,
    accounts: accounts.data.expenseAccounts,
    projects: projects.data.projects,
    skuReferences: skuReferences.data.skuReferences,
    transactions: transactions.data.expenseTransactions,
    invoices: invoices.data.invoices,
  };
}

export function centsToCad(cents: string | number | null | undefined) {
  return Number(cents ?? 0) / 100;
}

function transactionStatus(value: string): AppAccountingData["transactions"][number]["status"] {
  if (value === "VALIDATED") return "Validée";
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
    accounts: snapshot.accounts.map((account) => ({ code: account.code, label: account.label })),
    cards: snapshot.cards.map((card) => ({
      id: card.id,
      lastFour: card.lastFour,
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
    })),
    projects: snapshot.projects.map((project) => `${project.id} · ${project.name}`),
    skuReferences: snapshot.skuReferences.map((reference) => ({
      merchant: reference.merchant,
      sku: reference.sku,
      label: reference.productLabel ?? "Article à confirmer",
      category: reference.categoryLabel ?? "Divers",
      accountCode: reference.expenseAccount?.code ?? "—",
      status: reference.verificationStatus === "VALIDATED" ? "Validé" : "À confirmer",
    })),
    transactions: snapshot.transactions.map((transaction) => ({
      id: transaction.id,
      date: transaction.transactionDate,
      vendor: transaction.vendor,
      submittedBy: transaction.card.holder.displayName,
      person: transaction.card.holder.displayName,
      card: transaction.card.lastFour,
      project: transaction.project ? `${transaction.project.id} · ${transaction.project.name}` : "—",
      category: transaction.expenseAccount?.label ?? transaction.categoryLabel ?? "Divers",
      total: centsToCad(transaction.totalCents),
      status: transactionStatus(transaction.status),
      reconciliation: reconciliationStatus(transaction.reconciliationStatus),
      ...(transaction.issue ? { issue: transaction.issue } : {}),
      imageCount: 0,
      invoiceNumber: transaction.invoiceNumber ?? "—",
      note: transaction.classificationNote ?? "Classification issue de SQL Connect.",
      ...(transaction.sku ? { sku: transaction.sku } : {}),
    })),
  };
}
