import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AdminDeleteCardStatementPeriodData {
  cardStatementPeriod_delete?: CardStatementPeriod_Key | null;
}

export interface AdminDeleteCardStatementPeriodVariables {
  id: string;
}

export interface AdminDeleteCreditCardData {
  creditCard_delete?: CreditCard_Key | null;
}

export interface AdminDeleteCreditCardVariables {
  id: string;
}

export interface AdminDeleteExpenseAccountData {
  expenseAccount_delete?: ExpenseAccount_Key | null;
}

export interface AdminDeleteExpenseAccountVariables {
  id: string;
}

export interface AdminDeleteExpenseTransactionData {
  expenseTransaction_delete?: ExpenseTransaction_Key | null;
}

export interface AdminDeleteExpenseTransactionVariables {
  id: string;
}

export interface AdminDeleteInvoiceData {
  invoice_delete?: Invoice_Key | null;
}

export interface AdminDeleteInvoiceIntakeData {
  invoiceIntake_delete?: InvoiceIntake_Key | null;
}

export interface AdminDeleteInvoiceIntakeVariables {
  receiptId: string;
}

export interface AdminDeleteInvoicePhotoData {
  invoicePhoto_delete?: InvoicePhoto_Key | null;
}

export interface AdminDeleteInvoicePhotoVariables {
  id: string;
}

export interface AdminDeleteInvoiceVariables {
  id: string;
}

export interface AdminDeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface AdminDeleteProjectVariables {
  id: string;
}

export interface AdminDeleteSkuReferenceData {
  skuReference_delete?: SkuReference_Key | null;
}

export interface AdminDeleteSkuReferenceVariables {
  merchant: string;
  sku: string;
}

export interface AdminDeleteUserProfileData {
  userProfile_delete?: UserProfile_Key | null;
}

export interface AdminDeleteUserProfileVariables {
  id: string;
}

export interface AdminListInvoicePhotosData {
  invoicePhotos: ({
    id: string;
    invoice: {
      id: string;
      storageFolder?: string | null;
    } & Invoice_Key;
    storagePath: string;
    contentType: string;
    sequence: number;
  } & InvoicePhoto_Key)[];
}

export interface AdminListInvoicesData {
  invoices: ({
    id: string;
    intake?: {
      receiptId: string;
    } & InvoiceIntake_Key;
    invoiceNumber?: string | null;
    processingStatus: string;
    accountingStatus: string;
    reviewStatus: string;
    storageFolder?: string | null;
    transaction: {
      id: string;
      vendor: string;
      invoiceNumber?: string | null;
    } & ExpenseTransaction_Key;
    createdBy?: {
      id: string;
      firebaseUid: string;
    } & UserProfile_Key;
    invoicePhotos_on_invoice: ({
      id: string;
      storagePath: string;
      contentType: string;
      sequence: number;
    } & InvoicePhoto_Key)[];
  } & Invoice_Key)[];
}

export interface AdminSeedCreditCardData {
  creditCard_upsert: CreditCard_Key;
}

export interface AdminSeedCreditCardVariables {
  id: string;
  lastFour: string;
  holderId: string;
  cardFunction?: string | null;
  status: string;
  activeFrom?: DateString | null;
}

export interface AdminSeedExpenseTransactionData {
  expenseTransaction_upsert: ExpenseTransaction_Key;
}

export interface AdminSeedExpenseTransactionVariables {
  id: string;
  transactionDate: DateString;
  vendor: string;
  cardId: string;
  statementPeriodId: string;
  projectId: string;
  accountId: string;
  categoryLabel?: string | null;
  sku?: string | null;
  amountBeforeTaxCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  status: string;
  processingStatus?: string | null;
  accountingStatus?: string | null;
  reconciliationStatus: string;
  classificationSource?: string | null;
  classificationConfidence?: number | null;
  classificationNote?: string | null;
  invoiceNumber?: string | null;
  issue?: string | null;
}

export interface AdminSeedInvoiceData {
  invoice_upsert: Invoice_Key;
}

export interface AdminSeedInvoicePhotoData {
  invoicePhoto_upsert: InvoicePhoto_Key;
}

export interface AdminSeedInvoicePhotoVariables {
  id: string;
  invoiceId: string;
  storagePath: string;
  contentType: string;
  sequence: number;
}

export interface AdminSeedInvoiceVariables {
  id: string;
  transactionId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate?: DateString | null;
  subtotalCents?: Int64String | null;
  tpsCents?: Int64String | null;
  tvqCents?: Int64String | null;
  totalCents?: Int64String | null;
  processingStatus?: string | null;
  accountingStatus?: string | null;
  reviewStatus: string;
  storageFolder?: string | null;
  createdById: string;
}

export interface AdminSeedSkuReferenceData {
  skuReference_upsert: SkuReference_Key;
}

export interface AdminSeedSkuReferenceVariables {
  merchant: string;
  sku: string;
  productLabel?: string | null;
  categoryLabel?: string | null;
  accountId: string;
  verificationStatus: string;
}

export interface AuditEvent_Key {
  id: string;
  __typename?: 'AuditEvent_Key';
}

export interface AutoCommitInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}

export interface AutoCommitInvoiceIntakeVariables {
  receiptId: string;
  transactionId: string;
  invoiceId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  sku?: string | null;
  category: string;
  accountId: string;
  cardId: string;
  statementPeriodId: string;
  projectId: string;
  storageFolder: string;
  classificationNote: string;
}

export interface CardStatementPeriod_Key {
  id: string;
  __typename?: 'CardStatementPeriod_Key';
}

export interface CommitInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}

export interface CommitInvoiceIntakeVariables {
  receiptId: string;
  transactionId: string;
  invoiceId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  sku?: string | null;
  category: string;
  accountId: string;
  cardId: string;
  statementPeriodId: string;
  projectId: string;
  storageFolder: string;
  classificationNote: string;
}

export interface CommitInvoiceIntakeWithoutProjectData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}

export interface CommitInvoiceIntakeWithoutProjectVariables {
  receiptId: string;
  transactionId: string;
  invoiceId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  sku?: string | null;
  category: string;
  accountId: string;
  cardId: string;
  statementPeriodId: string;
  storageFolder: string;
  classificationNote: string;
}

export interface CreateInvoiceIntakeData {
  invoiceIntake_upsert: InvoiceIntake_Key;
}

export interface CreateInvoiceIntakeV2Data {
  invoiceIntake_upsert: InvoiceIntake_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface CreateInvoiceIntakeV2Variables {
  receiptId: string;
  storageFolder: string;
  photoCount: number;
  clientVersion: string;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}

export interface CreateInvoiceIntakeVariables {
  receiptId: string;
  storageFolder: string;
  photoCount: number;
}

export interface CreditCardStatementLine_Key {
  id: string;
  __typename?: 'CreditCardStatementLine_Key';
}

export interface CreditCardStatement_Key {
  id: string;
  __typename?: 'CreditCardStatement_Key';
}

export interface CreditCard_Key {
  id: string;
  __typename?: 'CreditCard_Key';
}

export interface DeleteExpenseAccountData {
  expenseAccount_delete?: ExpenseAccount_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface DeleteExpenseAccountVariables {
  id: string;
  auditEventId: string;
  auditDetails: string;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface DeleteProjectVariables {
  id: string;
  auditEventId: string;
  auditDetails: string;
}

export interface ExpenseAccount_Key {
  id: string;
  __typename?: 'ExpenseAccount_Key';
}

export interface ExpenseTransaction_Key {
  id: string;
  __typename?: 'ExpenseTransaction_Key';
}

export interface InvoiceIntake_Key {
  receiptId: string;
  __typename?: 'InvoiceIntake_Key';
}

export interface InvoicePhoto_Key {
  id: string;
  __typename?: 'InvoicePhoto_Key';
}

export interface Invoice_Key {
  id: string;
  __typename?: 'Invoice_Key';
}

export interface ListAuditEventsData {
  auditEvents: ({
    id: string;
    actorUid?: string | null;
    actorRole?: string | null;
    actor?: {
      displayName: string;
      role: string;
    };
    action: string;
    entityType: string;
    entityId: string;
    details?: string | null;
    createdAt: TimestampString;
  } & AuditEvent_Key)[];
}

export interface ListAuditEventsVariables {
  entityType: string;
  entityId: string;
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

export interface ListCreditCardStatementLinesData {
  creditCardStatementLines: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    sequence: number;
    transactionDate: DateString;
    postedDate?: DateString | null;
    merchantRaw: string;
    merchantNormalized: string;
    amountCents: Int64String;
    externalReference?: string | null;
    status: string;
    rawData?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardStatementLine_Key)[];
}

export interface ListCreditCardStatementLinesVariables {
  statementId: string;
}

export interface ListCreditCardStatementsData {
  creditCardStatements: ({
    id: string;
    card: {
      id: string;
      lastFour: string;
      holder: {
        id: string;
        displayName: string;
      } & UserProfile_Key;
    } & CreditCard_Key;
    holderIdSnapshot: string;
    holderNameSnapshot: string;
    periodStart: DateString;
    periodEnd: DateString;
    originalStoragePath: string;
    originalFilename: string;
    importedAt: TimestampString;
    importedBy: {
      id: string;
      displayName: string;
    } & UserProfile_Key;
    statementHash: string;
    status: string;
    lineCount: number;
    totalAmountCents: Int64String;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardStatement_Key)[];
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
    id: string;
    number: string;
    label: string;
    type: string;
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
    statementPeriod?: {
      id: string;
      label: string;
      startDate: DateString;
      endDate: DateString;
    } & CardStatementPeriod_Key;
    project?: {
      id: string;
      number: string;
      name: string;
    } & Project_Key;
    expenseAccount?: {
      id: string;
      number: string;
      label: string;
      type: string;
    } & ExpenseAccount_Key;
    categoryLabel?: string | null;
    sku?: string | null;
    amountBeforeTaxCents: Int64String;
    tpsCents: Int64String;
    tvqCents: Int64String;
    totalCents: Int64String;
    currency: string;
    status: string;
    processingStatus: string;
    accountingStatus: string;
    reconciliationStatus: string;
    classificationSource?: string | null;
    classificationConfidence?: number | null;
    classificationNote?: string | null;
    invoiceNumber?: string | null;
    issue?: string | null;
  } & ExpenseTransaction_Key)[];
}

export interface ListInvoiceIntakesData {
  invoiceIntakes: ({
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    status: string;
    processingStatus: string;
    accountingStatus: string;
    lastError?: string | null;
    aiErrorCode?: string | null;
    aiModel?: string | null;
    aiConfidence?: number | null;
    extractedVendor?: string | null;
    extractedInvoiceNumber?: string | null;
    extractedInvoiceDate?: DateString | null;
    extractedSubtotalCents?: Int64String | null;
    extractedTpsCents?: Int64String | null;
    extractedTvqCents?: Int64String | null;
    extractedTotalCents?: Int64String | null;
    extractedCurrency?: string | null;
    extractedSku?: string | null;
    extractedCategory?: string | null;
    extractedProjectId?: string | null;
    classificationAccountCode?: string | null;
    classificationCategory?: string | null;
    classificationSource?: string | null;
    classificationConfidence?: number | null;
    classificationStatus?: string | null;
    aiNotes?: string | null;
    decisionExceptions?: string | null;
    decisionChecks?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & InvoiceIntake_Key)[];
}

export interface ListInvoicesToReviewData {
  invoices: ({
    id: string;
    intake?: {
      receiptId: string;
      uploaderUid: string;
      storageFolder: string;
      photoCount: number;
    } & InvoiceIntake_Key;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    subtotalCents?: Int64String | null;
    tpsCents?: Int64String | null;
    tvqCents?: Int64String | null;
    totalCents?: Int64String | null;
    processingStatus: string;
    accountingStatus: string;
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
    number: string;
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
      id: string;
      number: string;
      label: string;
      type: string;
    } & ExpenseAccount_Key;
    sourceUrl?: string | null;
    verificationStatus: string;
    verifiedAt?: TimestampString | null;
  } & SkuReference_Key)[];
}

export interface ListUserProfilesData {
  userProfiles: ({
    id: string;
    firebaseUid: string;
    displayName: string;
    email?: string | null;
    jobTitle?: string | null;
    role: string;
    status: string;
  } & UserProfile_Key)[];
}

export interface MarkInvoiceIntakeAiErrorData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface MarkInvoiceIntakeAiErrorVariables {
  receiptId: string;
  error: string;
  aiErrorCode?: string | null;
  accountingStatus?: string | null;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}

export interface MarkInvoiceIntakeAutoPostingErrorData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface MarkInvoiceIntakeAutoPostingErrorVariables {
  receiptId: string;
  error: string;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}

export interface MarkInvoiceIntakePostingErrorData {
  invoiceIntake_updateMany: number;
}

export interface MarkInvoiceIntakePostingErrorVariables {
  receiptId: string;
}

export interface MaterializeInvoiceIntakeV2Data {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoicePhoto1: InvoicePhoto_Key;
  invoicePhoto2: InvoicePhoto_Key;
  invoicePhoto3: InvoicePhoto_Key;
  invoicePhoto4: InvoicePhoto_Key;
  invoicePhoto5: InvoicePhoto_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface MaterializeInvoiceIntakeV2Variables {
  receiptId: string;
  transactionId: string;
  invoiceId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  sku?: string | null;
  category: string;
  accountId: string;
  cardId: string;
  statementPeriod?: CardStatementPeriod_Key | null;
  project: Project_Key;
  storageFolder: string;
  classificationNote: string;
  expectedProcessingStatus: string;
  classificationSource: string;
  classificationStatus: string;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
  photoCount: number;
  photo1Id: string;
  photo1StoragePath: string;
  photo1ContentType: string;
  hasPhoto2: boolean;
  photo2Id: string;
  photo2StoragePath: string;
  photo2ContentType: string;
  hasPhoto3: boolean;
  photo3Id: string;
  photo3StoragePath: string;
  photo3ContentType: string;
  hasPhoto4: boolean;
  photo4Id: string;
  photo4StoragePath: string;
  photo4ContentType: string;
  hasPhoto5: boolean;
  photo5Id: string;
  photo5StoragePath: string;
  photo5ContentType: string;
}

export interface MerchantAlias_Key {
  id: string;
  __typename?: 'MerchantAlias_Key';
}

export interface Project_Key {
  id: string;
  __typename?: 'Project_Key';
}

export interface ReconciliationMatch_Key {
  id: string;
  __typename?: 'ReconciliationMatch_Key';
}

export interface RetryInvoiceIntakeAiData {
  invoiceIntake_updateMany: number;
}

export interface RetryInvoiceIntakeAiTransientData {
  invoiceIntake_updateMany: number;
}

export interface RetryInvoiceIntakeAiTransientV2Data {
  invoiceIntake_updateMany: number;
}

export interface RetryInvoiceIntakeAiTransientV2Variables {
  receiptId: string;
  invoiceId: string;
  storageFolder: string;
}

export interface RetryInvoiceIntakeAiTransientVariables {
  receiptId: string;
}

export interface RetryInvoiceIntakeAiVariables {
  receiptId: string;
}

export interface SkuReference_Key {
  merchant: string;
  sku: string;
  __typename?: 'SkuReference_Key';
}

export interface TransactionCorrection_Key {
  id: string;
  __typename?: 'TransactionCorrection_Key';
}

export interface UpdateInvoiceIntakeAiResultData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpdateInvoiceIntakeAiResultVariables {
  receiptId: string;
  aiModel: string;
  aiConfidence: number;
  extractedVendor: string;
  extractedInvoiceNumber?: string | null;
  extractedInvoiceDate?: DateString | null;
  extractedSubtotalCents: Int64String;
  extractedTpsCents: Int64String;
  extractedTvqCents: Int64String;
  extractedTotalCents: Int64String;
  extractedCurrency: string;
  extractedSku?: string | null;
  extractedCategory?: string | null;
  extractedProjectId?: string | null;
  classificationAccountCode?: string | null;
  classificationCategory?: string | null;
  classificationSource: string;
  classificationConfidence: number;
  classificationStatus: string;
  aiNotes: string;
  processingStatus?: string | null;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}

export interface UpdateInvoiceIntakeReviewData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpdateInvoiceIntakeReviewVariables {
  receiptId: string;
  status: string;
  extractedVendor: string;
  extractedInvoiceNumber?: string | null;
  extractedInvoiceDate?: DateString | null;
  extractedSubtotalCents: Int64String;
  extractedTpsCents: Int64String;
  extractedTvqCents: Int64String;
  extractedTotalCents: Int64String;
  extractedCurrency: string;
  extractedSku?: string | null;
  extractedCategory?: string | null;
  extractedProjectId?: string | null;
  classificationAccountCode?: string | null;
  classificationCategory?: string | null;
  classificationSource: string;
  classificationConfidence: number;
  classificationStatus: string;
  aiNotes: string;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}

export interface UpsertCardStatementPeriodData {
  cardStatementPeriod_upsert: CardStatementPeriod_Key;
}

export interface UpsertCardStatementPeriodVariables {
  id: string;
  label: string;
  startDate: DateString;
  endDate: DateString;
  statementLabel?: string | null;
  status: string;
}

export interface UpsertCreditCardData {
  creditCard_upsert: CreditCard_Key;
}

export interface UpsertCreditCardStatementData {
  creditCardStatement_upsert: CreditCardStatement_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpsertCreditCardStatementLineData {
  creditCardStatementLine_upsert: CreditCardStatementLine_Key;
}

export interface UpsertCreditCardStatementLineVariables {
  id: string;
  statementId: string;
  sequence: number;
  transactionDate: DateString;
  postedDate?: DateString | null;
  merchantRaw: string;
  merchantNormalized: string;
  amountCents: Int64String;
  externalReference?: string | null;
  status: string;
  rawData?: string | null;
}

export interface UpsertCreditCardStatementVariables {
  id: string;
  cardId: string;
  holderIdSnapshot: string;
  holderNameSnapshot: string;
  periodStart: DateString;
  periodEnd: DateString;
  originalStoragePath: string;
  originalFilename: string;
  importedById: string;
  statementHash: string;
  status: string;
  lineCount: number;
  totalAmountCents: Int64String;
  auditEventId: string;
  auditDetails: string;
}

export interface UpsertCreditCardVariables {
  id: string;
  lastFour: string;
  holderId: string;
  cardFunction?: string | null;
  status: string;
  activeFrom?: DateString | null;
  inactiveFrom?: DateString | null;
}

export interface UpsertExpenseAccountData {
  expenseAccount_upsert: ExpenseAccount_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpsertExpenseAccountVariables {
  id: string;
  number: string;
  type: string;
  label: string;
  status: string;
  auditAction: string;
  auditEventId: string;
  auditDetails: string;
}

export interface UpsertProjectData {
  project_upsert: Project_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpsertProjectVariables {
  id: string;
  number: string;
  name: string;
  status: string;
  auditAction: string;
  auditEventId: string;
  auditDetails: string;
}

export interface UpsertUserProfileData {
  userProfile_upsert: UserProfile_Key;
}

export interface UpsertUserProfileVariables {
  id: string;
  firebaseUid: string;
  displayName: string;
  email?: string | null;
  jobTitle?: string | null;
  role: string;
  status: string;
}

export interface UserProfile_Key {
  id: string;
  __typename?: 'UserProfile_Key';
}

interface AdminSeedCreditCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCreditCardVariables): MutationRef<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedCreditCardVariables): MutationRef<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;
  operationName: string;
}
export const adminSeedCreditCardRef: AdminSeedCreditCardRef;

export function adminSeedCreditCard(vars: AdminSeedCreditCardVariables): MutationPromise<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;
export function adminSeedCreditCard(dc: DataConnect, vars: AdminSeedCreditCardVariables): MutationPromise<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;

interface AdminSeedSkuReferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedSkuReferenceVariables): MutationRef<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedSkuReferenceVariables): MutationRef<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;
  operationName: string;
}
export const adminSeedSkuReferenceRef: AdminSeedSkuReferenceRef;

export function adminSeedSkuReference(vars: AdminSeedSkuReferenceVariables): MutationPromise<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;
export function adminSeedSkuReference(dc: DataConnect, vars: AdminSeedSkuReferenceVariables): MutationPromise<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;

interface AdminSeedExpenseTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedExpenseTransactionVariables): MutationRef<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedExpenseTransactionVariables): MutationRef<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;
  operationName: string;
}
export const adminSeedExpenseTransactionRef: AdminSeedExpenseTransactionRef;

export function adminSeedExpenseTransaction(vars: AdminSeedExpenseTransactionVariables): MutationPromise<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;
export function adminSeedExpenseTransaction(dc: DataConnect, vars: AdminSeedExpenseTransactionVariables): MutationPromise<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;

interface AdminSeedInvoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedInvoiceVariables): MutationRef<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedInvoiceVariables): MutationRef<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;
  operationName: string;
}
export const adminSeedInvoiceRef: AdminSeedInvoiceRef;

export function adminSeedInvoice(vars: AdminSeedInvoiceVariables): MutationPromise<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;
export function adminSeedInvoice(dc: DataConnect, vars: AdminSeedInvoiceVariables): MutationPromise<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;

interface AdminSeedInvoicePhotoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedInvoicePhotoVariables): MutationRef<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedInvoicePhotoVariables): MutationRef<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;
  operationName: string;
}
export const adminSeedInvoicePhotoRef: AdminSeedInvoicePhotoRef;

export function adminSeedInvoicePhoto(vars: AdminSeedInvoicePhotoVariables): MutationPromise<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;
export function adminSeedInvoicePhoto(dc: DataConnect, vars: AdminSeedInvoicePhotoVariables): MutationPromise<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;

interface AdminDeleteInvoicePhotoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteInvoicePhotoVariables): MutationRef<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteInvoicePhotoVariables): MutationRef<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;
  operationName: string;
}
export const adminDeleteInvoicePhotoRef: AdminDeleteInvoicePhotoRef;

export function adminDeleteInvoicePhoto(vars: AdminDeleteInvoicePhotoVariables): MutationPromise<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;
export function adminDeleteInvoicePhoto(dc: DataConnect, vars: AdminDeleteInvoicePhotoVariables): MutationPromise<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;

interface AdminDeleteInvoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteInvoiceVariables): MutationRef<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteInvoiceVariables): MutationRef<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;
  operationName: string;
}
export const adminDeleteInvoiceRef: AdminDeleteInvoiceRef;

export function adminDeleteInvoice(vars: AdminDeleteInvoiceVariables): MutationPromise<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;
export function adminDeleteInvoice(dc: DataConnect, vars: AdminDeleteInvoiceVariables): MutationPromise<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;

interface AdminDeleteExpenseTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteExpenseTransactionVariables): MutationRef<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteExpenseTransactionVariables): MutationRef<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;
  operationName: string;
}
export const adminDeleteExpenseTransactionRef: AdminDeleteExpenseTransactionRef;

export function adminDeleteExpenseTransaction(vars: AdminDeleteExpenseTransactionVariables): MutationPromise<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;
export function adminDeleteExpenseTransaction(dc: DataConnect, vars: AdminDeleteExpenseTransactionVariables): MutationPromise<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;

interface AdminDeleteInvoiceIntakeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteInvoiceIntakeVariables): MutationRef<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteInvoiceIntakeVariables): MutationRef<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;
  operationName: string;
}
export const adminDeleteInvoiceIntakeRef: AdminDeleteInvoiceIntakeRef;

export function adminDeleteInvoiceIntake(vars: AdminDeleteInvoiceIntakeVariables): MutationPromise<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;
export function adminDeleteInvoiceIntake(dc: DataConnect, vars: AdminDeleteInvoiceIntakeVariables): MutationPromise<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;

interface AdminDeleteCreditCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteCreditCardVariables): MutationRef<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteCreditCardVariables): MutationRef<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;
  operationName: string;
}
export const adminDeleteCreditCardRef: AdminDeleteCreditCardRef;

export function adminDeleteCreditCard(vars: AdminDeleteCreditCardVariables): MutationPromise<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;
export function adminDeleteCreditCard(dc: DataConnect, vars: AdminDeleteCreditCardVariables): MutationPromise<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;

interface AdminDeleteSkuReferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteSkuReferenceVariables): MutationRef<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteSkuReferenceVariables): MutationRef<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;
  operationName: string;
}
export const adminDeleteSkuReferenceRef: AdminDeleteSkuReferenceRef;

export function adminDeleteSkuReference(vars: AdminDeleteSkuReferenceVariables): MutationPromise<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;
export function adminDeleteSkuReference(dc: DataConnect, vars: AdminDeleteSkuReferenceVariables): MutationPromise<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;

interface AdminDeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteProjectVariables): MutationRef<AdminDeleteProjectData, AdminDeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteProjectVariables): MutationRef<AdminDeleteProjectData, AdminDeleteProjectVariables>;
  operationName: string;
}
export const adminDeleteProjectRef: AdminDeleteProjectRef;

export function adminDeleteProject(vars: AdminDeleteProjectVariables): MutationPromise<AdminDeleteProjectData, AdminDeleteProjectVariables>;
export function adminDeleteProject(dc: DataConnect, vars: AdminDeleteProjectVariables): MutationPromise<AdminDeleteProjectData, AdminDeleteProjectVariables>;

interface AdminDeleteExpenseAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteExpenseAccountVariables): MutationRef<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteExpenseAccountVariables): MutationRef<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;
  operationName: string;
}
export const adminDeleteExpenseAccountRef: AdminDeleteExpenseAccountRef;

export function adminDeleteExpenseAccount(vars: AdminDeleteExpenseAccountVariables): MutationPromise<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;
export function adminDeleteExpenseAccount(dc: DataConnect, vars: AdminDeleteExpenseAccountVariables): MutationPromise<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;

interface AdminDeleteCardStatementPeriodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteCardStatementPeriodVariables): MutationRef<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteCardStatementPeriodVariables): MutationRef<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;
  operationName: string;
}
export const adminDeleteCardStatementPeriodRef: AdminDeleteCardStatementPeriodRef;

export function adminDeleteCardStatementPeriod(vars: AdminDeleteCardStatementPeriodVariables): MutationPromise<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;
export function adminDeleteCardStatementPeriod(dc: DataConnect, vars: AdminDeleteCardStatementPeriodVariables): MutationPromise<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;

interface AdminDeleteUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteUserProfileVariables): MutationRef<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteUserProfileVariables): MutationRef<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;
  operationName: string;
}
export const adminDeleteUserProfileRef: AdminDeleteUserProfileRef;

export function adminDeleteUserProfile(vars: AdminDeleteUserProfileVariables): MutationPromise<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;
export function adminDeleteUserProfile(dc: DataConnect, vars: AdminDeleteUserProfileVariables): MutationPromise<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;

interface AdminListInvoicesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListInvoicesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListInvoicesData, undefined>;
  operationName: string;
}
export const adminListInvoicesRef: AdminListInvoicesRef;

export function adminListInvoices(options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicesData, undefined>;
export function adminListInvoices(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicesData, undefined>;

interface AdminListInvoicePhotosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListInvoicePhotosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListInvoicePhotosData, undefined>;
  operationName: string;
}
export const adminListInvoicePhotosRef: AdminListInvoicePhotosRef;

export function adminListInvoicePhotos(options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicePhotosData, undefined>;
export function adminListInvoicePhotos(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicePhotosData, undefined>;

interface UpsertUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserProfileVariables): MutationRef<UpsertUserProfileData, UpsertUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserProfileVariables): MutationRef<UpsertUserProfileData, UpsertUserProfileVariables>;
  operationName: string;
}
export const upsertUserProfileRef: UpsertUserProfileRef;

export function upsertUserProfile(vars: UpsertUserProfileVariables): MutationPromise<UpsertUserProfileData, UpsertUserProfileVariables>;
export function upsertUserProfile(dc: DataConnect, vars: UpsertUserProfileVariables): MutationPromise<UpsertUserProfileData, UpsertUserProfileVariables>;

interface UpsertCreditCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCreditCardVariables): MutationRef<UpsertCreditCardData, UpsertCreditCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertCreditCardVariables): MutationRef<UpsertCreditCardData, UpsertCreditCardVariables>;
  operationName: string;
}
export const upsertCreditCardRef: UpsertCreditCardRef;

export function upsertCreditCard(vars: UpsertCreditCardVariables): MutationPromise<UpsertCreditCardData, UpsertCreditCardVariables>;
export function upsertCreditCard(dc: DataConnect, vars: UpsertCreditCardVariables): MutationPromise<UpsertCreditCardData, UpsertCreditCardVariables>;

interface UpsertProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertProjectVariables): MutationRef<UpsertProjectData, UpsertProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertProjectVariables): MutationRef<UpsertProjectData, UpsertProjectVariables>;
  operationName: string;
}
export const upsertProjectRef: UpsertProjectRef;

export function upsertProject(vars: UpsertProjectVariables): MutationPromise<UpsertProjectData, UpsertProjectVariables>;
export function upsertProject(dc: DataConnect, vars: UpsertProjectVariables): MutationPromise<UpsertProjectData, UpsertProjectVariables>;

interface UpsertExpenseAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertExpenseAccountVariables): MutationRef<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertExpenseAccountVariables): MutationRef<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;
  operationName: string;
}
export const upsertExpenseAccountRef: UpsertExpenseAccountRef;

export function upsertExpenseAccount(vars: UpsertExpenseAccountVariables): MutationPromise<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;
export function upsertExpenseAccount(dc: DataConnect, vars: UpsertExpenseAccountVariables): MutationPromise<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteExpenseAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExpenseAccountVariables): MutationRef<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteExpenseAccountVariables): MutationRef<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;
  operationName: string;
}
export const deleteExpenseAccountRef: DeleteExpenseAccountRef;

export function deleteExpenseAccount(vars: DeleteExpenseAccountVariables): MutationPromise<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;
export function deleteExpenseAccount(dc: DataConnect, vars: DeleteExpenseAccountVariables): MutationPromise<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;

interface UpsertCardStatementPeriodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCardStatementPeriodVariables): MutationRef<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertCardStatementPeriodVariables): MutationRef<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;
  operationName: string;
}
export const upsertCardStatementPeriodRef: UpsertCardStatementPeriodRef;

export function upsertCardStatementPeriod(vars: UpsertCardStatementPeriodVariables): MutationPromise<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;
export function upsertCardStatementPeriod(dc: DataConnect, vars: UpsertCardStatementPeriodVariables): MutationPromise<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;

interface UpsertCreditCardStatementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCreditCardStatementVariables): MutationRef<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertCreditCardStatementVariables): MutationRef<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;
  operationName: string;
}
export const upsertCreditCardStatementRef: UpsertCreditCardStatementRef;

export function upsertCreditCardStatement(vars: UpsertCreditCardStatementVariables): MutationPromise<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;
export function upsertCreditCardStatement(dc: DataConnect, vars: UpsertCreditCardStatementVariables): MutationPromise<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;

interface UpsertCreditCardStatementLineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCreditCardStatementLineVariables): MutationRef<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertCreditCardStatementLineVariables): MutationRef<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;
  operationName: string;
}
export const upsertCreditCardStatementLineRef: UpsertCreditCardStatementLineRef;

export function upsertCreditCardStatementLine(vars: UpsertCreditCardStatementLineVariables): MutationPromise<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;
export function upsertCreditCardStatementLine(dc: DataConnect, vars: UpsertCreditCardStatementLineVariables): MutationPromise<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;

interface CreateInvoiceIntakeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvoiceIntakeVariables): MutationRef<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInvoiceIntakeVariables): MutationRef<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;
  operationName: string;
}
export const createInvoiceIntakeRef: CreateInvoiceIntakeRef;

export function createInvoiceIntake(vars: CreateInvoiceIntakeVariables): MutationPromise<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;
export function createInvoiceIntake(dc: DataConnect, vars: CreateInvoiceIntakeVariables): MutationPromise<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;

interface CreateInvoiceIntakeV2Ref {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvoiceIntakeV2Variables): MutationRef<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInvoiceIntakeV2Variables): MutationRef<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;
  operationName: string;
}
export const createInvoiceIntakeV2Ref: CreateInvoiceIntakeV2Ref;

export function createInvoiceIntakeV2(vars: CreateInvoiceIntakeV2Variables): MutationPromise<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;
export function createInvoiceIntakeV2(dc: DataConnect, vars: CreateInvoiceIntakeV2Variables): MutationPromise<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;

interface UpdateInvoiceIntakeAiResultRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInvoiceIntakeAiResultVariables): MutationRef<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInvoiceIntakeAiResultVariables): MutationRef<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;
  operationName: string;
}
export const updateInvoiceIntakeAiResultRef: UpdateInvoiceIntakeAiResultRef;

export function updateInvoiceIntakeAiResult(vars: UpdateInvoiceIntakeAiResultVariables): MutationPromise<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;
export function updateInvoiceIntakeAiResult(dc: DataConnect, vars: UpdateInvoiceIntakeAiResultVariables): MutationPromise<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;

interface MarkInvoiceIntakeAiErrorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvoiceIntakeAiErrorVariables): MutationRef<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MarkInvoiceIntakeAiErrorVariables): MutationRef<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;
  operationName: string;
}
export const markInvoiceIntakeAiErrorRef: MarkInvoiceIntakeAiErrorRef;

export function markInvoiceIntakeAiError(vars: MarkInvoiceIntakeAiErrorVariables): MutationPromise<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;
export function markInvoiceIntakeAiError(dc: DataConnect, vars: MarkInvoiceIntakeAiErrorVariables): MutationPromise<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;

interface MarkInvoiceIntakeAutoPostingErrorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvoiceIntakeAutoPostingErrorVariables): MutationRef<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MarkInvoiceIntakeAutoPostingErrorVariables): MutationRef<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;
  operationName: string;
}
export const markInvoiceIntakeAutoPostingErrorRef: MarkInvoiceIntakeAutoPostingErrorRef;

export function markInvoiceIntakeAutoPostingError(vars: MarkInvoiceIntakeAutoPostingErrorVariables): MutationPromise<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;
export function markInvoiceIntakeAutoPostingError(dc: DataConnect, vars: MarkInvoiceIntakeAutoPostingErrorVariables): MutationPromise<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;

interface UpdateInvoiceIntakeReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInvoiceIntakeReviewVariables): MutationRef<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInvoiceIntakeReviewVariables): MutationRef<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;
  operationName: string;
}
export const updateInvoiceIntakeReviewRef: UpdateInvoiceIntakeReviewRef;

export function updateInvoiceIntakeReview(vars: UpdateInvoiceIntakeReviewVariables): MutationPromise<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;
export function updateInvoiceIntakeReview(dc: DataConnect, vars: UpdateInvoiceIntakeReviewVariables): MutationPromise<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;

interface MarkInvoiceIntakePostingErrorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvoiceIntakePostingErrorVariables): MutationRef<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MarkInvoiceIntakePostingErrorVariables): MutationRef<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;
  operationName: string;
}
export const markInvoiceIntakePostingErrorRef: MarkInvoiceIntakePostingErrorRef;

export function markInvoiceIntakePostingError(vars: MarkInvoiceIntakePostingErrorVariables): MutationPromise<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;
export function markInvoiceIntakePostingError(dc: DataConnect, vars: MarkInvoiceIntakePostingErrorVariables): MutationPromise<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;

interface RetryInvoiceIntakeAiRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RetryInvoiceIntakeAiVariables): MutationRef<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RetryInvoiceIntakeAiVariables): MutationRef<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;
  operationName: string;
}
export const retryInvoiceIntakeAiRef: RetryInvoiceIntakeAiRef;

export function retryInvoiceIntakeAi(vars: RetryInvoiceIntakeAiVariables): MutationPromise<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;
export function retryInvoiceIntakeAi(dc: DataConnect, vars: RetryInvoiceIntakeAiVariables): MutationPromise<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;

interface RetryInvoiceIntakeAiTransientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RetryInvoiceIntakeAiTransientVariables): MutationRef<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RetryInvoiceIntakeAiTransientVariables): MutationRef<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;
  operationName: string;
}
export const retryInvoiceIntakeAiTransientRef: RetryInvoiceIntakeAiTransientRef;

export function retryInvoiceIntakeAiTransient(vars: RetryInvoiceIntakeAiTransientVariables): MutationPromise<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;
export function retryInvoiceIntakeAiTransient(dc: DataConnect, vars: RetryInvoiceIntakeAiTransientVariables): MutationPromise<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;

interface RetryInvoiceIntakeAiTransientV2Ref {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RetryInvoiceIntakeAiTransientV2Variables): MutationRef<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RetryInvoiceIntakeAiTransientV2Variables): MutationRef<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;
  operationName: string;
}
export const retryInvoiceIntakeAiTransientV2Ref: RetryInvoiceIntakeAiTransientV2Ref;

export function retryInvoiceIntakeAiTransientV2(vars: RetryInvoiceIntakeAiTransientV2Variables): MutationPromise<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;
export function retryInvoiceIntakeAiTransientV2(dc: DataConnect, vars: RetryInvoiceIntakeAiTransientV2Variables): MutationPromise<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;

interface MaterializeInvoiceIntakeV2Ref {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MaterializeInvoiceIntakeV2Variables): MutationRef<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MaterializeInvoiceIntakeV2Variables): MutationRef<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;
  operationName: string;
}
export const materializeInvoiceIntakeV2Ref: MaterializeInvoiceIntakeV2Ref;

export function materializeInvoiceIntakeV2(vars: MaterializeInvoiceIntakeV2Variables): MutationPromise<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;
export function materializeInvoiceIntakeV2(dc: DataConnect, vars: MaterializeInvoiceIntakeV2Variables): MutationPromise<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;

interface CommitInvoiceIntakeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CommitInvoiceIntakeVariables): MutationRef<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CommitInvoiceIntakeVariables): MutationRef<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;
  operationName: string;
}
export const commitInvoiceIntakeRef: CommitInvoiceIntakeRef;

export function commitInvoiceIntake(vars: CommitInvoiceIntakeVariables): MutationPromise<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;
export function commitInvoiceIntake(dc: DataConnect, vars: CommitInvoiceIntakeVariables): MutationPromise<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;

interface CommitInvoiceIntakeWithoutProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CommitInvoiceIntakeWithoutProjectVariables): MutationRef<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CommitInvoiceIntakeWithoutProjectVariables): MutationRef<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;
  operationName: string;
}
export const commitInvoiceIntakeWithoutProjectRef: CommitInvoiceIntakeWithoutProjectRef;

export function commitInvoiceIntakeWithoutProject(vars: CommitInvoiceIntakeWithoutProjectVariables): MutationPromise<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;
export function commitInvoiceIntakeWithoutProject(dc: DataConnect, vars: CommitInvoiceIntakeWithoutProjectVariables): MutationPromise<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;

interface AutoCommitInvoiceIntakeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AutoCommitInvoiceIntakeVariables): MutationRef<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AutoCommitInvoiceIntakeVariables): MutationRef<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;
  operationName: string;
}
export const autoCommitInvoiceIntakeRef: AutoCommitInvoiceIntakeRef;

export function autoCommitInvoiceIntake(vars: AutoCommitInvoiceIntakeVariables): MutationPromise<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;
export function autoCommitInvoiceIntake(dc: DataConnect, vars: AutoCommitInvoiceIntakeVariables): MutationPromise<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;

interface ListUserProfilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserProfilesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserProfilesData, undefined>;
  operationName: string;
}
export const listUserProfilesRef: ListUserProfilesRef;

export function listUserProfiles(options?: ExecuteQueryOptions): QueryPromise<ListUserProfilesData, undefined>;
export function listUserProfiles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserProfilesData, undefined>;

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

interface ListCreditCardStatementsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCreditCardStatementsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCreditCardStatementsData, undefined>;
  operationName: string;
}
export const listCreditCardStatementsRef: ListCreditCardStatementsRef;

export function listCreditCardStatements(options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsData, undefined>;
export function listCreditCardStatements(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsData, undefined>;

interface ListCreditCardStatementLinesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardStatementLinesVariables): QueryRef<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCreditCardStatementLinesVariables): QueryRef<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;
  operationName: string;
}
export const listCreditCardStatementLinesRef: ListCreditCardStatementLinesRef;

export function listCreditCardStatementLines(vars: ListCreditCardStatementLinesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;
export function listCreditCardStatementLines(dc: DataConnect, vars: ListCreditCardStatementLinesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;

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

interface ListInvoiceIntakesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInvoiceIntakesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListInvoiceIntakesData, undefined>;
  operationName: string;
}
export const listInvoiceIntakesRef: ListInvoiceIntakesRef;

export function listInvoiceIntakes(options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesData, undefined>;
export function listInvoiceIntakes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesData, undefined>;

interface ListAuditEventsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAuditEventsVariables): QueryRef<ListAuditEventsData, ListAuditEventsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAuditEventsVariables): QueryRef<ListAuditEventsData, ListAuditEventsVariables>;
  operationName: string;
}
export const listAuditEventsRef: ListAuditEventsRef;

export function listAuditEvents(vars: ListAuditEventsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditEventsData, ListAuditEventsVariables>;
export function listAuditEvents(dc: DataConnect, vars: ListAuditEventsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditEventsData, ListAuditEventsVariables>;
