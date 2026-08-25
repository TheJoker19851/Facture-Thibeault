import type { DataConnect } from "firebase-admin/data-connect";
import { collectPagedRows as collectPagedRowsUntyped } from "../lib/pagination.mjs";

export const DATA_CONNECT_PAGE_SIZE = 200;
const collectPagedRows = collectPagedRowsUntyped as <T>(
  readPage: (variables: { limit: number; offset: number }) => Promise<T[]>,
  options?: { pageSize?: number },
) => Promise<T[]>;

export type ServerInvoiceIntake = {
  receiptId: string;
  uploaderUid: string;
  storageFolder: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  photoCount: number;
  status?: string | null;
  processingStatus?: string | null;
  processingState?: string | null;
  processingAttempts?: number | null;
  lastAttemptAt?: string | null;
  accountingStatus?: string | null;
  lastError?: string | null;
  aiErrorCode?: string | null;
  aiModel?: string | null;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  [key: string]: unknown;
};

export type ServerExpenseTransaction = {
  id: string;
  transactionDate: string;
  vendor: string;
  invoiceNumber?: string | null;
  totalCents: string | number;
  card?: { id: string } | null;
  [key: string]: unknown;
};

export type ServerInvoice = {
  id: string;
  updatedAt?: string | null;
  createdAt?: string | null;
  processingStatus?: string | null;
  accountingStatus?: string | null;
  [key: string]: unknown;
};

export type ServerExpenseAccount = {
  id: string;
  number: string;
  label: string;
  type: string;
  status: string;
};

export type ServerSkuReference = {
  merchant: string;
  sku: string;
  productLabel?: string | null;
  categoryLabel?: string | null;
  verificationStatus: string;
  expenseAccount?: { id: string; number: string; label: string; type: string } | null;
};

export type ServerCreditCard = {
  id: string;
  lastFour: string;
  status: string;
  holder: { id: string; displayName: string; role?: string; status?: string };
};

export type ServerUserProfile = {
  id: string;
  firebaseUid: string;
  displayName: string;
};

export type ServerProject = { id: string; number: string; name: string; status: string };
export type ServerStatementPeriod = { id: string; startDate: string; endDate: string; status: string };

export async function listAllInvoiceIntakes(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ invoiceIntakes: ServerInvoiceIntake[] }, { limit: number; offset: number }>("ListInvoiceIntakesPage", variables);
    return result.data.invoiceIntakes;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

export async function listAllExpenseTransactions(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ expenseTransactions: ServerExpenseTransaction[] }, { limit: number; offset: number }>("ListExpenseTransactionsPage", variables);
    return result.data.expenseTransactions;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

export async function listAllInvoicesToReview(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ invoices: ServerInvoice[] }, { limit: number; offset: number }>("ListInvoicesToReviewPage", variables);
    return result.data.invoices;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

export async function listAllExpenseAccounts(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ expenseAccounts: ServerExpenseAccount[] }, { limit: number; offset: number }>("ListExpenseAccountsPage", variables);
    return result.data.expenseAccounts;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

export async function listAllSkuReferences(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ skuReferences: ServerSkuReference[] }, { limit: number; offset: number }>("ListSkuReferencesPage", variables);
    return result.data.skuReferences;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

export async function listAllCreditCards(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ creditCards: ServerCreditCard[] }, { limit: number; offset: number }>("ListCreditCardsPage", variables);
    return result.data.creditCards;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

export async function listAllUserProfiles(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ userProfiles: ServerUserProfile[] }, { limit: number; offset: number }>("ListUserProfiles", variables);
    return result.data.userProfiles;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

export async function listAllProjects(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ projects: ServerProject[] }, { limit: number; offset: number }>("ListProjectsPage", variables);
    return result.data.projects;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}

export async function listAllStatementPeriods(dataConnect: DataConnect) {
  return collectPagedRows(async (variables) => {
    const result = await dataConnect.executeQuery<{ cardStatementPeriods: ServerStatementPeriod[] }, { limit: number; offset: number }>("ListCardStatementPeriodsPage", variables);
    return result.data.cardStatementPeriods;
  }, { pageSize: DATA_CONNECT_PAGE_SIZE });
}
