import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AuditEvent_Key {
  id: string;
  __typename?: 'AuditEvent_Key';
}

export interface CardStatementPeriod_Key {
  id: string;
  __typename?: 'CardStatementPeriod_Key';
}

export interface CreditCard_Key {
  id: string;
  __typename?: 'CreditCard_Key';
}

export interface ExpenseAccount_Key {
  code: string;
  __typename?: 'ExpenseAccount_Key';
}

export interface ExpenseTransaction_Key {
  id: string;
  __typename?: 'ExpenseTransaction_Key';
}

export interface InvoicePhoto_Key {
  id: string;
  __typename?: 'InvoicePhoto_Key';
}

export interface Invoice_Key {
  id: string;
  __typename?: 'Invoice_Key';
}

export interface ListCardStatementPeriodsData {
  cardStatementPeriods: ({
    id: string;
    label: string;
    startDate: DateString;
    endDate: DateString;
    statementLabel?: string | null;
    status: string;
  } & CardStatementPeriod_Key)[];
}

export interface ListCreditCardsData {
  creditCards: ({
    id: string;
    lastFour: string;
    holder: {
      id: string;
      displayName: string;
      role: string;
      status: string;
    } & UserProfile_Key;
    cardFunction?: string | null;
    activeFrom?: DateString | null;
    inactiveFrom?: DateString | null;
    status: string;
  } & CreditCard_Key)[];
}

export interface ListExpenseAccountsData {
  expenseAccounts: ({
    code: string;
    label: string;
    status: string;
  } & ExpenseAccount_Key)[];
}

export interface ListExpenseTransactionsData {
  expenseTransactions: ({
    id: string;
    transactionDate: DateString;
    vendor: string;
    card: {
      id: string;
      lastFour: string;
      holder: {
        id: string;
        displayName: string;
      } & UserProfile_Key;
    } & CreditCard_Key;
    statementPeriod: {
      id: string;
      label: string;
      startDate: DateString;
      endDate: DateString;
    } & CardStatementPeriod_Key;
    project?: {
      id: string;
      name: string;
    } & Project_Key;
    expenseAccount?: {
      code: string;
      label: string;
    } & ExpenseAccount_Key;
    categoryLabel?: string | null;
    sku?: string | null;
    amountBeforeTaxCents: Int64String;
    tpsCents: Int64String;
    tvqCents: Int64String;
    totalCents: Int64String;
    currency: string;
    status: string;
    reconciliationStatus: string;
    classificationSource?: string | null;
    classificationConfidence?: number | null;
    classificationNote?: string | null;
    invoiceNumber?: string | null;
    issue?: string | null;
  } & ExpenseTransaction_Key)[];
}

export interface ListInvoicesToReviewData {
  invoices: ({
    id: string;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    subtotalCents?: Int64String | null;
    tpsCents?: Int64String | null;
    tvqCents?: Int64String | null;
    totalCents?: Int64String | null;
    reviewStatus: string;
    storageFolder?: string | null;
    transaction: {
      id: string;
      vendor: string;
      issue?: string | null;
    } & ExpenseTransaction_Key;
    invoicePhotos_on_invoice: ({
      id: string;
      storagePath: string;
      contentType: string;
      sequence: number;
    } & InvoicePhoto_Key)[];
  } & Invoice_Key)[];
}

export interface ListProjectsData {
  projects: ({
    id: string;
    name: string;
    status: string;
  } & Project_Key)[];
}

export interface ListSkuReferencesData {
  skuReferences: ({
    merchant: string;
    sku: string;
    productLabel?: string | null;
    categoryLabel?: string | null;
    expenseAccount?: {
      code: string;
      label: string;
    } & ExpenseAccount_Key;
    sourceUrl?: string | null;
    verificationStatus: string;
    verifiedAt?: TimestampString | null;
  } & SkuReference_Key)[];
}

export interface Project_Key {
  id: string;
  __typename?: 'Project_Key';
}

export interface SkuReference_Key {
  merchant: string;
  sku: string;
  __typename?: 'SkuReference_Key';
}

export interface TaxAccount_Key {
  code: string;
  __typename?: 'TaxAccount_Key';
}

export interface TransactionCorrection_Key {
  id: string;
  __typename?: 'TransactionCorrection_Key';
}

export interface UserProfile_Key {
  id: string;
  __typename?: 'UserProfile_Key';
}

interface ListCreditCardsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCreditCardsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCreditCardsData, undefined>;
  operationName: string;
}
export const listCreditCardsRef: ListCreditCardsRef;

export function listCreditCards(options?: ExecuteQueryOptions): QueryPromise<ListCreditCardsData, undefined>;
export function listCreditCards(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardsData, undefined>;

interface ListCardStatementPeriodsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCardStatementPeriodsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCardStatementPeriodsData, undefined>;
  operationName: string;
}
export const listCardStatementPeriodsRef: ListCardStatementPeriodsRef;

export function listCardStatementPeriods(options?: ExecuteQueryOptions): QueryPromise<ListCardStatementPeriodsData, undefined>;
export function listCardStatementPeriods(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCardStatementPeriodsData, undefined>;

interface ListExpenseAccountsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListExpenseAccountsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListExpenseAccountsData, undefined>;
  operationName: string;
}
export const listExpenseAccountsRef: ListExpenseAccountsRef;

export function listExpenseAccounts(options?: ExecuteQueryOptions): QueryPromise<ListExpenseAccountsData, undefined>;
export function listExpenseAccounts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListExpenseAccountsData, undefined>;

interface ListProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
  operationName: string;
}
export const listProjectsRef: ListProjectsRef;

export function listProjects(options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;
export function listProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface ListSkuReferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSkuReferencesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSkuReferencesData, undefined>;
  operationName: string;
}
export const listSkuReferencesRef: ListSkuReferencesRef;

export function listSkuReferences(options?: ExecuteQueryOptions): QueryPromise<ListSkuReferencesData, undefined>;
export function listSkuReferences(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSkuReferencesData, undefined>;

interface ListExpenseTransactionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListExpenseTransactionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListExpenseTransactionsData, undefined>;
  operationName: string;
}
export const listExpenseTransactionsRef: ListExpenseTransactionsRef;

export function listExpenseTransactions(options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsData, undefined>;
export function listExpenseTransactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsData, undefined>;

interface ListInvoicesToReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInvoicesToReviewData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListInvoicesToReviewData, undefined>;
  operationName: string;
}
export const listInvoicesToReviewRef: ListInvoicesToReviewRef;

export function listInvoicesToReview(options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewData, undefined>;
export function listInvoicesToReview(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewData, undefined>;

