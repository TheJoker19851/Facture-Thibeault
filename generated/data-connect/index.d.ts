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

export interface AdminListInvoicePhotosVariables {
  limit: number;
  offset: number;
}

export interface AdminListInvoicesData {
  invoices: ({
    id: string;
    intake?: {
      receiptId: string;
      storageFolder: string;
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
      firebaseUid?: string | null;
    } & UserProfile_Key;
    invoicePhotos_on_invoice: ({
      id: string;
      storagePath: string;
      contentType: string;
      sequence: number;
    } & InvoicePhoto_Key)[];
  } & Invoice_Key)[];
}

export interface AdminListInvoicesVariables {
  limit: number;
  offset: number;
}

export interface AdminRecordArchivePurgeData {
  auditEvent_upsert: AuditEvent_Key;
}

export interface AdminRecordArchivePurgeVariables {
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  archiveId: string;
  auditDetails: string;
}

export interface AdminRecordUserAuditData {
  auditEvent_upsert: AuditEvent_Key;
}

export interface AdminRecordUserAuditVariables {
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  entityId: string;
  auditDetails: string;
}

export interface AdminSeedCardStatementPeriodData {
  cardStatementPeriod_upsert: CardStatementPeriod_Key;
}

export interface AdminSeedCardStatementPeriodVariables {
  id: string;
  label: string;
  startDate: DateString;
  endDate: DateString;
  statementLabel?: string | null;
  status: string;
}

export interface AdminSeedCreditCardData {
  creditCard_upsert: CreditCard_Key;
}

export interface AdminSeedCreditCardHolderHistoryData {
  creditCardHolderHistory_upsert: CreditCardHolderHistory_Key;
}

export interface AdminSeedCreditCardHolderHistoryVariables {
  id: string;
  cardId: string;
  holderId: string;
  validFrom: DateString;
  validTo?: DateString | null;
  isCurrent: boolean;
  status: string;
}

export interface AdminSeedCreditCardStatementData {
  creditCardStatement_upsert: CreditCardStatement_Key;
}

export interface AdminSeedCreditCardStatementLineData {
  creditCardStatementLine_upsert: CreditCardStatementLine_Key;
}

export interface AdminSeedCreditCardStatementLineVariables {
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

export interface AdminSeedCreditCardStatementVariables {
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
}

export interface AdminSeedCreditCardVariables {
  id: string;
  lastFour: string;
  holderId: string;
  cardFunction?: string | null;
  status: string;
  activeFrom?: DateString | null;
}

export interface AdminSeedExpenseAccountData {
  expenseAccount_upsert: ExpenseAccount_Key;
}

export interface AdminSeedExpenseAccountVariables {
  id: string;
  number: string;
  label: string;
  type: string;
  status: string;
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

export interface AdminSeedInvoiceIntakeData {
  invoiceIntake_upsert: InvoiceIntake_Key;
}

export interface AdminSeedInvoiceIntakeVariables {
  receiptId: string;
  uploaderUid: string;
  storageFolder: string;
  photoCount: number;
  status: string;
  processingStatus: string;
  accountingStatus: string;
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
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  aiNotes?: string | null;
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

export interface AdminSeedMerchantAliasData {
  merchantAlias_upsert: MerchantAlias_Key;
}

export interface AdminSeedMerchantAliasVariables {
  id: string;
  merchantRawKey: string;
  merchantNormalized: string;
  merchantCanonical?: string | null;
  active: boolean;
  status: string;
  source: string;
  confidence?: number | null;
  method?: string | null;
}

export interface AdminSeedProjectData {
  project_upsert: Project_Key;
}

export interface AdminSeedProjectVariables {
  id: string;
  number: string;
  name: string;
  status: string;
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

export interface AdminSeedUserProfileData {
  userProfile_upsert: UserProfile_Key;
}

export interface AdminSeedUserProfileVariables {
  id: string;
  firebaseUid: string;
  displayName: string;
  email?: string | null;
  jobTitle?: string | null;
  role: string;
  status: string;
}

export interface AdminUpsertUserProfileWithAuditData {
  userProfile_upsert: UserProfile_Key;
  creditCard_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface AdminUpsertUserProfileWithAuditVariables {
  id: string;
  firebaseUid?: string | null;
  displayName: string;
  email?: string | null;
  jobTitle?: string | null;
  role: string;
  status: string;
  invitationStatus: string;
  invitationSentAt?: TimestampString | null;
  invitationSentBy?: string | null;
  lastInvitationError?: string | null;
  activatedAt?: TimestampString | null;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
  deactivateCards?: boolean;
  inactiveFrom?: DateString | null;
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

export interface CacheCanadianTireSkuReferenceData {
  skuReference_upsert: SkuReference_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface CacheCanadianTireSkuReferenceVariables {
  sku: string;
  productLabel: string;
  categoryLabel: string;
  expenseAccountId: string;
  sourceUrl: string;
  auditEventId: string;
  entityId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}

export interface CardStatementPeriod_Key {
  id: string;
  __typename?: 'CardStatementPeriod_Key';
}

export interface ClaimInvoiceIntakeProcessingData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface ClaimInvoiceIntakeProcessingVariables {
  receiptId: string;
  processingAttempts: number;
  maxAttempts?: number;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}

export interface ClearReconciliationMatchData {
  reconciliationMatch_update?: ReconciliationMatch_Key | null;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface ClearReconciliationMatchVariables {
  id: string;
  statementLineId: string;
  previousExpenseTransactionId: string;
  lineStatus: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
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

export interface CorrectPostedInvoiceData {
  transactionCorrection_upsert: TransactionCorrection_Key;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  invoice_update?: Invoice_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface CorrectPostedInvoiceVariables {
  correctionId: string;
  invoiceId: string;
  transactionId: string;
  actorUserId: string;
  fieldName: string;
  previousValue?: string | null;
  correctedValue: string;
  note: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  lineItems: string;
  category: string;
  account?: ExpenseAccount_Key | null;
  auditEventId: string;
  auditDetails: string;
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

export interface CreditCardHolderHistory_Key {
  id: string;
  __typename?: 'CreditCardHolderHistory_Key';
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

export interface DeleteCreditCardAndHolderData {
  creditCard_delete?: CreditCard_Key | null;
  userProfile_delete?: UserProfile_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface DeleteCreditCardAndHolderVariables {
  cardId: string;
  holderId: string;
  auditEventId: string;
  auditDetails: string;
}

export interface DeleteCreditCardData {
  creditCard_delete?: CreditCard_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface DeleteCreditCardVariables {
  id: string;
  auditEventId: string;
  auditDetails: string;
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

export interface DeletePostedInvoiceData {
  invoice_updateMany: number;
  expenseTransaction_updateMany: number;
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface DeletePostedInvoiceVariables {
  invoiceId: string;
  transactionId: string;
  receiptId: string;
  writeIntake: boolean;
  reason: string;
  actorUid: string;
  actorRole: string;
  auditEventId: string;
  auditDetails: string;
}

export interface DeleteSkuReferenceData {
  skuReference_delete?: SkuReference_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface DeleteSkuReferenceVariables {
  merchant: string;
  sku: string;
  auditEventId: string;
  entityId: string;
  auditDetails: string;
}

export interface DeleteUserProfileData {
  userProfile_delete?: UserProfile_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface DeleteUserProfileVariables {
  id: string;
  firebaseUid: string;
  auditEventId: string;
  auditDetails: string;
}

export interface DiscardInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface DiscardInvoiceIntakeVariables {
  receiptId: string;
  actorUid: string;
  actorRole: string;
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

export interface ListAllCreditCardStatementLinesData {
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

export interface ListAllCreditCardStatementLinesPageData {
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

export interface ListAllCreditCardStatementLinesPageVariables {
  limit: number;
  offset: number;
}

export interface ListAllCreditCardStatementLinesVariables {
  limit: number;
  offset: number;
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
  limit: number;
  offset: number;
}

export interface ListCardStatementPeriodsData {
  cardStatementPeriods: ({
    id: string;
    label: string;
    startDate: DateString;
    endDate: DateString;
    statementLabel?: string | null;
    manualAdjustmentsJson?: string | null;
    status: string;
  } & CardStatementPeriod_Key)[];
}

export interface ListCardStatementPeriodsPageData {
  cardStatementPeriods: ({
    id: string;
    label: string;
    startDate: DateString;
    endDate: DateString;
    statementLabel?: string | null;
    manualAdjustmentsJson?: string | null;
    status: string;
  } & CardStatementPeriod_Key)[];
}

export interface ListCardStatementPeriodsPageVariables {
  limit: number;
  offset: number;
}

export interface ListCreditCardHolderHistoriesData {
  creditCardHolderHistories: ({
    id: string;
    card: {
      id: string;
      lastFour: string;
    } & CreditCard_Key;
    holder: {
      id: string;
      displayName: string;
      role: string;
      status: string;
    } & UserProfile_Key;
    validFrom: DateString;
    validTo?: DateString | null;
    isCurrent: boolean;
    status: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardHolderHistory_Key)[];
}

export interface ListCreditCardHolderHistoriesVariables {
  limit: number;
  offset: number;
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

export interface ListCreditCardStatementLinesPageData {
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

export interface ListCreditCardStatementLinesPageVariables {
  statementId: string;
  limit: number;
  offset: number;
}

export interface ListCreditCardStatementLinesVariables {
  statementId: string;
  limit: number;
  offset: number;
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

export interface ListCreditCardStatementsPageData {
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

export interface ListCreditCardStatementsPageVariables {
  limit: number;
  offset: number;
}

export interface ListCreditCardStatementsVariables {
  limit: number;
  offset: number;
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

export interface ListCreditCardsPageData {
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

export interface ListCreditCardsPageVariables {
  limit: number;
  offset: number;
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

export interface ListExpenseAccountsPageData {
  expenseAccounts: ({
    id: string;
    number: string;
    label: string;
    type: string;
    status: string;
  } & ExpenseAccount_Key)[];
}

export interface ListExpenseAccountsPageVariables {
  limit: number;
  offset: number;
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
    projectNumber?: string | null;
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

export interface ListExpenseTransactionsPageData {
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
    projectNumber?: string | null;
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

export interface ListExpenseTransactionsPageVariables {
  limit: number;
  offset: number;
}

export interface ListExpenseTransactionsVariables {
  limit: number;
  offset: number;
}

export interface ListInvoiceIntakesData {
  invoiceIntakes: ({
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    status: string;
    processingStatus: string;
    processingState: string;
    processingAttempts: number;
    reviewRevision: number;
    lastAttemptAt?: TimestampString | null;
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
    extractedLineItems?: string | null;
    extractedCurrency?: string | null;
    extractedSku?: string | null;
    extractedCategory?: string | null;
    extractedProjectNumber?: string | null;
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

export interface ListInvoiceIntakesPageData {
  invoiceIntakes: ({
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    status: string;
    processingStatus: string;
    processingState: string;
    processingAttempts: number;
    reviewRevision: number;
    lastAttemptAt?: TimestampString | null;
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
    extractedLineItems?: string | null;
    extractedCurrency?: string | null;
    extractedSku?: string | null;
    extractedCategory?: string | null;
    extractedProjectNumber?: string | null;
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

export interface ListInvoiceIntakesPageVariables {
  limit: number;
  offset: number;
}

export interface ListInvoiceIntakesVariables {
  limit: number;
  offset: number;
}

export interface ListInvoicesForReconciliationData {
  invoices: ({
    id: string;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    totalCents?: Int64String | null;
    processingStatus: string;
    accountingStatus: string;
    reviewStatus: string;
    transaction: {
      id: string;
    } & ExpenseTransaction_Key;
  } & Invoice_Key)[];
}

export interface ListInvoicesForReconciliationPageData {
  invoices: ({
    id: string;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    totalCents?: Int64String | null;
    processingStatus: string;
    accountingStatus: string;
    reviewStatus: string;
    transaction: {
      id: string;
    } & ExpenseTransaction_Key;
  } & Invoice_Key)[];
}

export interface ListInvoicesForReconciliationPageVariables {
  limit: number;
  offset: number;
}

export interface ListInvoicesForReconciliationVariables {
  limit: number;
  offset: number;
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
    lineItems?: string | null;
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

export interface ListInvoicesToReviewPageData {
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
    lineItems?: string | null;
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

export interface ListInvoicesToReviewPageVariables {
  limit: number;
  offset: number;
}

export interface ListInvoicesToReviewVariables {
  limit: number;
  offset: number;
}

export interface ListMerchantAliasesData {
  merchantAliases: ({
    id: string;
    merchantRawKey: string;
    merchantNormalized: string;
    merchantCanonical?: string | null;
    active: boolean;
    status: string;
    source: string;
    confidence?: number | null;
    method?: string | null;
    createdBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & MerchantAlias_Key)[];
}

export interface ListMerchantAliasesPageData {
  merchantAliases: ({
    id: string;
    merchantRawKey: string;
    merchantNormalized: string;
    merchantCanonical?: string | null;
    active: boolean;
    status: string;
    source: string;
    confidence?: number | null;
    method?: string | null;
    createdBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & MerchantAlias_Key)[];
}

export interface ListMerchantAliasesPageVariables {
  limit: number;
  offset: number;
}

export interface ListMerchantAliasesVariables {
  limit: number;
  offset: number;
}

export interface ListProjectsData {
  projects: ({
    id: string;
    number: string;
    name: string;
    status: string;
  } & Project_Key)[];
}

export interface ListProjectsPageData {
  projects: ({
    id: string;
    number: string;
    name: string;
    status: string;
  } & Project_Key)[];
}

export interface ListProjectsPageVariables {
  limit: number;
  offset: number;
}

export interface ListReconciliationMatchesData {
  reconciliationMatches: ({
    id: string;
    statementLine: {
      id: string;
      statement: {
        id: string;
      } & CreditCardStatement_Key;
      sequence: number;
    } & CreditCardStatementLine_Key;
    expenseTransaction?: {
      id: string;
    } & ExpenseTransaction_Key;
    invoice?: {
      id: string;
    } & Invoice_Key;
    matchScore?: number | null;
    matchMethod: string;
    status: string;
    confirmedBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    confirmedAt?: TimestampString | null;
    reason?: string | null;
    details?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReconciliationMatch_Key)[];
}

export interface ListReconciliationMatchesPageData {
  reconciliationMatches: ({
    id: string;
    statementLine: {
      id: string;
      statement: {
        id: string;
      } & CreditCardStatement_Key;
      sequence: number;
    } & CreditCardStatementLine_Key;
    expenseTransaction?: {
      id: string;
    } & ExpenseTransaction_Key;
    invoice?: {
      id: string;
    } & Invoice_Key;
    matchScore?: number | null;
    matchMethod: string;
    status: string;
    confirmedBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    confirmedAt?: TimestampString | null;
    reason?: string | null;
    details?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReconciliationMatch_Key)[];
}

export interface ListReconciliationMatchesPageVariables {
  limit: number;
  offset: number;
}

export interface ListReconciliationMatchesVariables {
  limit: number;
  offset: number;
}

export interface ListReconciliationOutsideControlsData {
  reconciliationOutsideControls: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    expenseTransaction: {
      id: string;
      transactionDate: DateString;
      vendor: string;
      totalCents: Int64String;
      card: {
        id: string;
      } & CreditCard_Key;
    } & ExpenseTransaction_Key;
    status: string;
    reason: string;
    resolvedBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    resolvedAt?: TimestampString | null;
    resolutionNote?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReconciliationOutsideControl_Key)[];
}

export interface ListReconciliationOutsideControlsPageData {
  reconciliationOutsideControls: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    expenseTransaction: {
      id: string;
      transactionDate: DateString;
      vendor: string;
      totalCents: Int64String;
      card: {
        id: string;
      } & CreditCard_Key;
    } & ExpenseTransaction_Key;
    status: string;
    reason: string;
    resolvedBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    resolvedAt?: TimestampString | null;
    resolutionNote?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReconciliationOutsideControl_Key)[];
}

export interface ListReconciliationOutsideControlsPageVariables {
  limit: number;
  offset: number;
}

export interface ListReconciliationOutsideControlsVariables {
  limit: number;
  offset: number;
}

export interface ListReportAdjustmentSetsData {
  reportAdjustmentSets: ({
    id: string;
    periodKey: string;
    periodStart: DateString;
    periodEnd: DateString;
    projectId?: string | null;
    holderId?: string | null;
    rowsJson: string;
    createdByUid: string;
    updatedByUid: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReportAdjustmentSet_Key)[];
}

export interface ListReportAdjustmentSetsVariables {
  periodKey: string;
  limit: number;
  offset: number;
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

export interface ListSkuReferencesPageData {
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

export interface ListSkuReferencesPageVariables {
  limit: number;
  offset: number;
}

export interface ListTransactionCorrectionsData {
  transactionCorrections: ({
    id: string;
    invoice?: {
      id: string;
    } & Invoice_Key;
    transaction: {
      id: string;
    } & ExpenseTransaction_Key;
    fieldName: string;
    previousValue?: string | null;
    correctedValue: string;
    correctedBy: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    note?: string | null;
    createdAt: TimestampString;
  } & TransactionCorrection_Key)[];
}

export interface ListTransactionCorrectionsVariables {
  transactionId: string;
  limit: number;
  offset: number;
}

export interface ListUserProfilesData {
  userProfiles: ({
    id: string;
    firebaseUid?: string | null;
    displayName: string;
    email?: string | null;
    jobTitle?: string | null;
    role: string;
    status: string;
    invitationStatus: string;
    invitationSentAt?: TimestampString | null;
    invitationSentBy?: string | null;
    lastInvitationError?: string | null;
    activatedAt?: TimestampString | null;
  } & UserProfile_Key)[];
}

export interface ListUserProfilesVariables {
  limit: number;
  offset: number;
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

export interface MarkInvoiceIntakeAiMaxAttemptsData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface MarkInvoiceIntakeAiMaxAttemptsVariables {
  receiptId: string;
  currentAttempts: number;
  decisionExceptions: string;
  decisionChecks: string;
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
  lineItems: string;
  currency: string;
  sku?: string | null;
  category: string;
  account?: ExpenseAccount_Key | null;
  cardId: string;
  statementPeriod?: CardStatementPeriod_Key | null;
  project?: Project_Key | null;
  projectNumber?: string | null;
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

export interface PersistReconciliationLineStatusData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface PersistReconciliationLineStatusVariables {
  id: string;
  statementLineId: string;
  status: string;
  reason: string;
  details?: string | null;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
  expectedMatchId?: string | null;
  expectedExpenseTransactionId?: string | null;
}

export interface PersistReconciliationMatchData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface PersistReconciliationMatchVariables {
  id: string;
  statementLineId: string;
  expenseTransactionId: string;
  invoiceId: string;
  matchScore?: number | null;
  matchMethod: string;
  status: string;
  confirmedById: string;
  confirmedAt?: TimestampString | null;
  reason?: string | null;
  details?: string | null;
  lineStatus: string;
  transactionReconciliationStatus: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
  expectedMatchId?: string | null;
  expectedExpenseTransactionId?: string | null;
}

export interface PersistReconciliationMatchWithoutInvoiceData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface PersistReconciliationMatchWithoutInvoiceVariables {
  id: string;
  statementLineId: string;
  expenseTransactionId: string;
  matchScore?: number | null;
  matchMethod: string;
  status: string;
  confirmedById: string;
  confirmedAt?: TimestampString | null;
  reason?: string | null;
  details?: string | null;
  lineStatus: string;
  transactionReconciliationStatus: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
  expectedMatchId?: string | null;
  expectedExpenseTransactionId?: string | null;
}

export interface Project_Key {
  id: string;
  __typename?: 'Project_Key';
}

export interface ReconciliationMatch_Key {
  id: string;
  __typename?: 'ReconciliationMatch_Key';
}

export interface ReconciliationOutsideControl_Key {
  id: string;
  __typename?: 'ReconciliationOutsideControl_Key';
}

export interface ReportAdjustmentSet_Key {
  id: string;
  __typename?: 'ReportAdjustmentSet_Key';
}

export interface RequeueStaleInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}

export interface RequeueStaleInvoiceIntakeVariables {
  receiptId: string;
  staleBefore: TimestampString;
  maxAttempts: number;
  actorUid: string;
  actorRole: string;
  auditEventId: string;
  auditDetails: string;
}

export interface ResolveReconciliationOutsideControlData {
  reconciliationOutsideControl_update?: ReconciliationOutsideControl_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface ResolveReconciliationOutsideControlVariables {
  id: string;
  status: string;
  resolvedById: string;
  resolutionNote: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}

export interface RetryInvoiceIntakeAiData {
  invoiceIntake_updateMany: number;
}

export interface RetryInvoiceIntakeAiReviewV2Data {
  invoiceIntake_updateMany: number;
}

export interface RetryInvoiceIntakeAiReviewV2Variables {
  receiptId: string;
  currentAttempts: number;
  maxAttempts: number;
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

export interface SaveStatementManualAdjustmentsData {
  cardStatementPeriod_update?: CardStatementPeriod_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}

export interface SaveStatementManualAdjustmentsVariables {
  id: string;
  manualAdjustmentsJson: string;
  auditEventId: string;
  auditDetails: string;
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
  extractedLineItems: string;
  extractedCurrency: string;
  extractedSku?: string | null;
  extractedCategory?: string | null;
  extractedProjectNumber?: string | null;
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
  extractedLineItems: string;
  extractedCurrency: string;
  extractedSku?: string | null;
  extractedCategory?: string | null;
  extractedProjectNumber?: string | null;
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
  expectedReviewRevision?: number;
  nextReviewRevision: number;
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

export interface UpsertCreditCardHolderHistoryData {
  creditCardHolderHistory_upsert: CreditCardHolderHistory_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpsertCreditCardHolderHistoryVariables {
  id: string;
  cardId: string;
  holderId: string;
  validFrom: DateString;
  validTo?: DateString | null;
  isCurrent: boolean;
  status: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}

export interface UpsertCreditCardStatementData {
  creditCardStatement_insert: CreditCardStatement_Key;
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
  actorUid: string;
  actorRole: string;
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

export interface UpsertMerchantAliasData {
  merchantAlias_upsert: MerchantAlias_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpsertMerchantAliasVariables {
  id: string;
  merchantRawKey: string;
  merchantNormalized: string;
  merchantCanonical?: string | null;
  active: boolean;
  status: string;
  source: string;
  confidence?: number | null;
  method?: string | null;
  createdById: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}

export interface UpsertReconciliationOutsideControlData {
  reconciliationOutsideControl_upsert: ReconciliationOutsideControl_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpsertReconciliationOutsideControlVariables {
  id: string;
  statementId: string;
  expenseTransactionId: string;
  status: string;
  reason: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}

export interface UpsertReportAdjustmentSetData {
  reportAdjustmentSet_upsert: ReportAdjustmentSet_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpsertReportAdjustmentSetVariables {
  id: string;
  periodKey: string;
  periodStart: DateString;
  periodEnd: DateString;
  projectId?: string | null;
  holderId?: string | null;
  rowsJson: string;
  actorUid: string;
  auditEventId: string;
  auditDetails: string;
}

export interface UpsertSkuReferenceData {
  skuReference_upsert: SkuReference_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface UpsertSkuReferenceVariables {
  merchant: string;
  sku: string;
  productLabel: string;
  categoryLabel: string;
  expenseAccountId: string;
  sourceUrl?: string | null;
  auditAction: string;
  auditEventId: string;
  entityId: string;
  auditDetails: string;
}

export interface UpsertUserProfileData {
  userProfile_upsert: UserProfile_Key;
}

export interface UpsertUserProfileVariables {
  id: string;
  firebaseUid?: string | null;
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

interface AdminSeedUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedUserProfileVariables): MutationRef<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedUserProfileVariables): MutationRef<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;
  operationName: string;
}
export const adminSeedUserProfileRef: AdminSeedUserProfileRef;

export function adminSeedUserProfile(vars: AdminSeedUserProfileVariables): MutationPromise<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;
export function adminSeedUserProfile(dc: DataConnect, vars: AdminSeedUserProfileVariables): MutationPromise<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;

interface AdminSeedProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedProjectVariables): MutationRef<AdminSeedProjectData, AdminSeedProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedProjectVariables): MutationRef<AdminSeedProjectData, AdminSeedProjectVariables>;
  operationName: string;
}
export const adminSeedProjectRef: AdminSeedProjectRef;

export function adminSeedProject(vars: AdminSeedProjectVariables): MutationPromise<AdminSeedProjectData, AdminSeedProjectVariables>;
export function adminSeedProject(dc: DataConnect, vars: AdminSeedProjectVariables): MutationPromise<AdminSeedProjectData, AdminSeedProjectVariables>;

interface AdminSeedExpenseAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedExpenseAccountVariables): MutationRef<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedExpenseAccountVariables): MutationRef<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;
  operationName: string;
}
export const adminSeedExpenseAccountRef: AdminSeedExpenseAccountRef;

export function adminSeedExpenseAccount(vars: AdminSeedExpenseAccountVariables): MutationPromise<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;
export function adminSeedExpenseAccount(dc: DataConnect, vars: AdminSeedExpenseAccountVariables): MutationPromise<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;

interface AdminSeedCardStatementPeriodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCardStatementPeriodVariables): MutationRef<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedCardStatementPeriodVariables): MutationRef<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;
  operationName: string;
}
export const adminSeedCardStatementPeriodRef: AdminSeedCardStatementPeriodRef;

export function adminSeedCardStatementPeriod(vars: AdminSeedCardStatementPeriodVariables): MutationPromise<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;
export function adminSeedCardStatementPeriod(dc: DataConnect, vars: AdminSeedCardStatementPeriodVariables): MutationPromise<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;

interface AdminSeedInvoiceIntakeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedInvoiceIntakeVariables): MutationRef<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedInvoiceIntakeVariables): MutationRef<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;
  operationName: string;
}
export const adminSeedInvoiceIntakeRef: AdminSeedInvoiceIntakeRef;

export function adminSeedInvoiceIntake(vars: AdminSeedInvoiceIntakeVariables): MutationPromise<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;
export function adminSeedInvoiceIntake(dc: DataConnect, vars: AdminSeedInvoiceIntakeVariables): MutationPromise<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;

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

interface AdminSeedCreditCardStatementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCreditCardStatementVariables): MutationRef<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedCreditCardStatementVariables): MutationRef<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;
  operationName: string;
}
export const adminSeedCreditCardStatementRef: AdminSeedCreditCardStatementRef;

export function adminSeedCreditCardStatement(vars: AdminSeedCreditCardStatementVariables): MutationPromise<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;
export function adminSeedCreditCardStatement(dc: DataConnect, vars: AdminSeedCreditCardStatementVariables): MutationPromise<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;

interface AdminSeedCreditCardStatementLineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCreditCardStatementLineVariables): MutationRef<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedCreditCardStatementLineVariables): MutationRef<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;
  operationName: string;
}
export const adminSeedCreditCardStatementLineRef: AdminSeedCreditCardStatementLineRef;

export function adminSeedCreditCardStatementLine(vars: AdminSeedCreditCardStatementLineVariables): MutationPromise<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;
export function adminSeedCreditCardStatementLine(dc: DataConnect, vars: AdminSeedCreditCardStatementLineVariables): MutationPromise<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;

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

interface AdminSeedCreditCardHolderHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCreditCardHolderHistoryVariables): MutationRef<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedCreditCardHolderHistoryVariables): MutationRef<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;
  operationName: string;
}
export const adminSeedCreditCardHolderHistoryRef: AdminSeedCreditCardHolderHistoryRef;

export function adminSeedCreditCardHolderHistory(vars: AdminSeedCreditCardHolderHistoryVariables): MutationPromise<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;
export function adminSeedCreditCardHolderHistory(dc: DataConnect, vars: AdminSeedCreditCardHolderHistoryVariables): MutationPromise<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;

interface AdminSeedMerchantAliasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedMerchantAliasVariables): MutationRef<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSeedMerchantAliasVariables): MutationRef<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;
  operationName: string;
}
export const adminSeedMerchantAliasRef: AdminSeedMerchantAliasRef;

export function adminSeedMerchantAlias(vars: AdminSeedMerchantAliasVariables): MutationPromise<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;
export function adminSeedMerchantAlias(dc: DataConnect, vars: AdminSeedMerchantAliasVariables): MutationPromise<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;

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
  (vars: AdminListInvoicesVariables): QueryRef<AdminListInvoicesData, AdminListInvoicesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminListInvoicesVariables): QueryRef<AdminListInvoicesData, AdminListInvoicesVariables>;
  operationName: string;
}
export const adminListInvoicesRef: AdminListInvoicesRef;

export function adminListInvoices(vars: AdminListInvoicesVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicesData, AdminListInvoicesVariables>;
export function adminListInvoices(dc: DataConnect, vars: AdminListInvoicesVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicesData, AdminListInvoicesVariables>;

interface AdminListInvoicePhotosRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminListInvoicePhotosVariables): QueryRef<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminListInvoicePhotosVariables): QueryRef<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;
  operationName: string;
}
export const adminListInvoicePhotosRef: AdminListInvoicePhotosRef;

export function adminListInvoicePhotos(vars: AdminListInvoicePhotosVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;
export function adminListInvoicePhotos(dc: DataConnect, vars: AdminListInvoicePhotosVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;

interface AdminRecordArchivePurgeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminRecordArchivePurgeVariables): MutationRef<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminRecordArchivePurgeVariables): MutationRef<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;
  operationName: string;
}
export const adminRecordArchivePurgeRef: AdminRecordArchivePurgeRef;

export function adminRecordArchivePurge(vars: AdminRecordArchivePurgeVariables): MutationPromise<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;
export function adminRecordArchivePurge(dc: DataConnect, vars: AdminRecordArchivePurgeVariables): MutationPromise<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;

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

interface AdminUpsertUserProfileWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpsertUserProfileWithAuditVariables): MutationRef<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpsertUserProfileWithAuditVariables): MutationRef<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;
  operationName: string;
}
export const adminUpsertUserProfileWithAuditRef: AdminUpsertUserProfileWithAuditRef;

export function adminUpsertUserProfileWithAudit(vars: AdminUpsertUserProfileWithAuditVariables): MutationPromise<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;
export function adminUpsertUserProfileWithAudit(dc: DataConnect, vars: AdminUpsertUserProfileWithAuditVariables): MutationPromise<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;

interface AdminRecordUserAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminRecordUserAuditVariables): MutationRef<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminRecordUserAuditVariables): MutationRef<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;
  operationName: string;
}
export const adminRecordUserAuditRef: AdminRecordUserAuditRef;

export function adminRecordUserAudit(vars: AdminRecordUserAuditVariables): MutationPromise<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;
export function adminRecordUserAudit(dc: DataConnect, vars: AdminRecordUserAuditVariables): MutationPromise<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;

interface DeleteUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserProfileVariables): MutationRef<DeleteUserProfileData, DeleteUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteUserProfileVariables): MutationRef<DeleteUserProfileData, DeleteUserProfileVariables>;
  operationName: string;
}
export const deleteUserProfileRef: DeleteUserProfileRef;

export function deleteUserProfile(vars: DeleteUserProfileVariables): MutationPromise<DeleteUserProfileData, DeleteUserProfileVariables>;
export function deleteUserProfile(dc: DataConnect, vars: DeleteUserProfileVariables): MutationPromise<DeleteUserProfileData, DeleteUserProfileVariables>;

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

interface UpsertSkuReferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSkuReferenceVariables): MutationRef<UpsertSkuReferenceData, UpsertSkuReferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertSkuReferenceVariables): MutationRef<UpsertSkuReferenceData, UpsertSkuReferenceVariables>;
  operationName: string;
}
export const upsertSkuReferenceRef: UpsertSkuReferenceRef;

export function upsertSkuReference(vars: UpsertSkuReferenceVariables): MutationPromise<UpsertSkuReferenceData, UpsertSkuReferenceVariables>;
export function upsertSkuReference(dc: DataConnect, vars: UpsertSkuReferenceVariables): MutationPromise<UpsertSkuReferenceData, UpsertSkuReferenceVariables>;

interface DeleteSkuReferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSkuReferenceVariables): MutationRef<DeleteSkuReferenceData, DeleteSkuReferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSkuReferenceVariables): MutationRef<DeleteSkuReferenceData, DeleteSkuReferenceVariables>;
  operationName: string;
}
export const deleteSkuReferenceRef: DeleteSkuReferenceRef;

export function deleteSkuReference(vars: DeleteSkuReferenceVariables): MutationPromise<DeleteSkuReferenceData, DeleteSkuReferenceVariables>;
export function deleteSkuReference(dc: DataConnect, vars: DeleteSkuReferenceVariables): MutationPromise<DeleteSkuReferenceData, DeleteSkuReferenceVariables>;

interface DeleteCreditCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCreditCardVariables): MutationRef<DeleteCreditCardData, DeleteCreditCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCreditCardVariables): MutationRef<DeleteCreditCardData, DeleteCreditCardVariables>;
  operationName: string;
}
export const deleteCreditCardRef: DeleteCreditCardRef;

export function deleteCreditCard(vars: DeleteCreditCardVariables): MutationPromise<DeleteCreditCardData, DeleteCreditCardVariables>;
export function deleteCreditCard(dc: DataConnect, vars: DeleteCreditCardVariables): MutationPromise<DeleteCreditCardData, DeleteCreditCardVariables>;

interface DeleteCreditCardAndHolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCreditCardAndHolderVariables): MutationRef<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCreditCardAndHolderVariables): MutationRef<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;
  operationName: string;
}
export const deleteCreditCardAndHolderRef: DeleteCreditCardAndHolderRef;

export function deleteCreditCardAndHolder(vars: DeleteCreditCardAndHolderVariables): MutationPromise<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;
export function deleteCreditCardAndHolder(dc: DataConnect, vars: DeleteCreditCardAndHolderVariables): MutationPromise<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;

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

interface SaveStatementManualAdjustmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SaveStatementManualAdjustmentsVariables): MutationRef<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SaveStatementManualAdjustmentsVariables): MutationRef<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;
  operationName: string;
}
export const saveStatementManualAdjustmentsRef: SaveStatementManualAdjustmentsRef;

export function saveStatementManualAdjustments(vars: SaveStatementManualAdjustmentsVariables): MutationPromise<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;
export function saveStatementManualAdjustments(dc: DataConnect, vars: SaveStatementManualAdjustmentsVariables): MutationPromise<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;

interface UpsertReportAdjustmentSetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportAdjustmentSetVariables): MutationRef<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertReportAdjustmentSetVariables): MutationRef<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;
  operationName: string;
}
export const upsertReportAdjustmentSetRef: UpsertReportAdjustmentSetRef;

export function upsertReportAdjustmentSet(vars: UpsertReportAdjustmentSetVariables): MutationPromise<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;
export function upsertReportAdjustmentSet(dc: DataConnect, vars: UpsertReportAdjustmentSetVariables): MutationPromise<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;

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

interface UpsertCreditCardHolderHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCreditCardHolderHistoryVariables): MutationRef<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertCreditCardHolderHistoryVariables): MutationRef<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;
  operationName: string;
}
export const upsertCreditCardHolderHistoryRef: UpsertCreditCardHolderHistoryRef;

export function upsertCreditCardHolderHistory(vars: UpsertCreditCardHolderHistoryVariables): MutationPromise<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;
export function upsertCreditCardHolderHistory(dc: DataConnect, vars: UpsertCreditCardHolderHistoryVariables): MutationPromise<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;

interface UpsertMerchantAliasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMerchantAliasVariables): MutationRef<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertMerchantAliasVariables): MutationRef<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;
  operationName: string;
}
export const upsertMerchantAliasRef: UpsertMerchantAliasRef;

export function upsertMerchantAlias(vars: UpsertMerchantAliasVariables): MutationPromise<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;
export function upsertMerchantAlias(dc: DataConnect, vars: UpsertMerchantAliasVariables): MutationPromise<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;

interface PersistReconciliationMatchRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PersistReconciliationMatchVariables): MutationRef<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PersistReconciliationMatchVariables): MutationRef<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;
  operationName: string;
}
export const persistReconciliationMatchRef: PersistReconciliationMatchRef;

export function persistReconciliationMatch(vars: PersistReconciliationMatchVariables): MutationPromise<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;
export function persistReconciliationMatch(dc: DataConnect, vars: PersistReconciliationMatchVariables): MutationPromise<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;

interface ClearReconciliationMatchRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearReconciliationMatchVariables): MutationRef<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClearReconciliationMatchVariables): MutationRef<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;
  operationName: string;
}
export const clearReconciliationMatchRef: ClearReconciliationMatchRef;

export function clearReconciliationMatch(vars: ClearReconciliationMatchVariables): MutationPromise<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;
export function clearReconciliationMatch(dc: DataConnect, vars: ClearReconciliationMatchVariables): MutationPromise<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;

interface PersistReconciliationMatchWithoutInvoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PersistReconciliationMatchWithoutInvoiceVariables): MutationRef<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PersistReconciliationMatchWithoutInvoiceVariables): MutationRef<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;
  operationName: string;
}
export const persistReconciliationMatchWithoutInvoiceRef: PersistReconciliationMatchWithoutInvoiceRef;

export function persistReconciliationMatchWithoutInvoice(vars: PersistReconciliationMatchWithoutInvoiceVariables): MutationPromise<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;
export function persistReconciliationMatchWithoutInvoice(dc: DataConnect, vars: PersistReconciliationMatchWithoutInvoiceVariables): MutationPromise<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;

interface PersistReconciliationLineStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PersistReconciliationLineStatusVariables): MutationRef<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PersistReconciliationLineStatusVariables): MutationRef<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;
  operationName: string;
}
export const persistReconciliationLineStatusRef: PersistReconciliationLineStatusRef;

export function persistReconciliationLineStatus(vars: PersistReconciliationLineStatusVariables): MutationPromise<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;
export function persistReconciliationLineStatus(dc: DataConnect, vars: PersistReconciliationLineStatusVariables): MutationPromise<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;

interface UpsertReconciliationOutsideControlRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReconciliationOutsideControlVariables): MutationRef<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertReconciliationOutsideControlVariables): MutationRef<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;
  operationName: string;
}
export const upsertReconciliationOutsideControlRef: UpsertReconciliationOutsideControlRef;

export function upsertReconciliationOutsideControl(vars: UpsertReconciliationOutsideControlVariables): MutationPromise<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;
export function upsertReconciliationOutsideControl(dc: DataConnect, vars: UpsertReconciliationOutsideControlVariables): MutationPromise<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;

interface ResolveReconciliationOutsideControlRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveReconciliationOutsideControlVariables): MutationRef<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ResolveReconciliationOutsideControlVariables): MutationRef<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;
  operationName: string;
}
export const resolveReconciliationOutsideControlRef: ResolveReconciliationOutsideControlRef;

export function resolveReconciliationOutsideControl(vars: ResolveReconciliationOutsideControlVariables): MutationPromise<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;
export function resolveReconciliationOutsideControl(dc: DataConnect, vars: ResolveReconciliationOutsideControlVariables): MutationPromise<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;

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

interface ClaimInvoiceIntakeProcessingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClaimInvoiceIntakeProcessingVariables): MutationRef<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClaimInvoiceIntakeProcessingVariables): MutationRef<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;
  operationName: string;
}
export const claimInvoiceIntakeProcessingRef: ClaimInvoiceIntakeProcessingRef;

export function claimInvoiceIntakeProcessing(vars: ClaimInvoiceIntakeProcessingVariables): MutationPromise<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;
export function claimInvoiceIntakeProcessing(dc: DataConnect, vars: ClaimInvoiceIntakeProcessingVariables): MutationPromise<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;

interface RequeueStaleInvoiceIntakeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequeueStaleInvoiceIntakeVariables): MutationRef<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RequeueStaleInvoiceIntakeVariables): MutationRef<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;
  operationName: string;
}
export const requeueStaleInvoiceIntakeRef: RequeueStaleInvoiceIntakeRef;

export function requeueStaleInvoiceIntake(vars: RequeueStaleInvoiceIntakeVariables): MutationPromise<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;
export function requeueStaleInvoiceIntake(dc: DataConnect, vars: RequeueStaleInvoiceIntakeVariables): MutationPromise<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;

interface CacheCanadianTireSkuReferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CacheCanadianTireSkuReferenceVariables): MutationRef<CacheCanadianTireSkuReferenceData, CacheCanadianTireSkuReferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CacheCanadianTireSkuReferenceVariables): MutationRef<CacheCanadianTireSkuReferenceData, CacheCanadianTireSkuReferenceVariables>;
  operationName: string;
}
export const cacheCanadianTireSkuReferenceRef: CacheCanadianTireSkuReferenceRef;

export function cacheCanadianTireSkuReference(vars: CacheCanadianTireSkuReferenceVariables): MutationPromise<CacheCanadianTireSkuReferenceData, CacheCanadianTireSkuReferenceVariables>;
export function cacheCanadianTireSkuReference(dc: DataConnect, vars: CacheCanadianTireSkuReferenceVariables): MutationPromise<CacheCanadianTireSkuReferenceData, CacheCanadianTireSkuReferenceVariables>;

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

interface MarkInvoiceIntakeAiMaxAttemptsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvoiceIntakeAiMaxAttemptsVariables): MutationRef<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MarkInvoiceIntakeAiMaxAttemptsVariables): MutationRef<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;
  operationName: string;
}
export const markInvoiceIntakeAiMaxAttemptsRef: MarkInvoiceIntakeAiMaxAttemptsRef;

export function markInvoiceIntakeAiMaxAttempts(vars: MarkInvoiceIntakeAiMaxAttemptsVariables): MutationPromise<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;
export function markInvoiceIntakeAiMaxAttempts(dc: DataConnect, vars: MarkInvoiceIntakeAiMaxAttemptsVariables): MutationPromise<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;

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

interface DiscardInvoiceIntakeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DiscardInvoiceIntakeVariables): MutationRef<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DiscardInvoiceIntakeVariables): MutationRef<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;
  operationName: string;
}
export const discardInvoiceIntakeRef: DiscardInvoiceIntakeRef;

export function discardInvoiceIntake(vars: DiscardInvoiceIntakeVariables): MutationPromise<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;
export function discardInvoiceIntake(dc: DataConnect, vars: DiscardInvoiceIntakeVariables): MutationPromise<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;

interface DeletePostedInvoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePostedInvoiceVariables): MutationRef<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePostedInvoiceVariables): MutationRef<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;
  operationName: string;
}
export const deletePostedInvoiceRef: DeletePostedInvoiceRef;

export function deletePostedInvoice(vars: DeletePostedInvoiceVariables): MutationPromise<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;
export function deletePostedInvoice(dc: DataConnect, vars: DeletePostedInvoiceVariables): MutationPromise<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;

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

interface RetryInvoiceIntakeAiReviewV2Ref {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RetryInvoiceIntakeAiReviewV2Variables): MutationRef<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RetryInvoiceIntakeAiReviewV2Variables): MutationRef<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;
  operationName: string;
}
export const retryInvoiceIntakeAiReviewV2Ref: RetryInvoiceIntakeAiReviewV2Ref;

export function retryInvoiceIntakeAiReviewV2(vars: RetryInvoiceIntakeAiReviewV2Variables): MutationPromise<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;
export function retryInvoiceIntakeAiReviewV2(dc: DataConnect, vars: RetryInvoiceIntakeAiReviewV2Variables): MutationPromise<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;

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

interface CorrectPostedInvoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CorrectPostedInvoiceVariables): MutationRef<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CorrectPostedInvoiceVariables): MutationRef<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;
  operationName: string;
}
export const correctPostedInvoiceRef: CorrectPostedInvoiceRef;

export function correctPostedInvoice(vars: CorrectPostedInvoiceVariables): MutationPromise<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;
export function correctPostedInvoice(dc: DataConnect, vars: CorrectPostedInvoiceVariables): MutationPromise<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;

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
  (vars: ListUserProfilesVariables): QueryRef<ListUserProfilesData, ListUserProfilesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUserProfilesVariables): QueryRef<ListUserProfilesData, ListUserProfilesVariables>;
  operationName: string;
}
export const listUserProfilesRef: ListUserProfilesRef;

export function listUserProfiles(vars: ListUserProfilesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserProfilesData, ListUserProfilesVariables>;
export function listUserProfiles(dc: DataConnect, vars: ListUserProfilesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserProfilesData, ListUserProfilesVariables>;

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

interface ListCreditCardHolderHistoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardHolderHistoriesVariables): QueryRef<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCreditCardHolderHistoriesVariables): QueryRef<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;
  operationName: string;
}
export const listCreditCardHolderHistoriesRef: ListCreditCardHolderHistoriesRef;

export function listCreditCardHolderHistories(vars: ListCreditCardHolderHistoriesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;
export function listCreditCardHolderHistories(dc: DataConnect, vars: ListCreditCardHolderHistoriesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;

interface ListCreditCardStatementsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardStatementsVariables): QueryRef<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCreditCardStatementsVariables): QueryRef<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;
  operationName: string;
}
export const listCreditCardStatementsRef: ListCreditCardStatementsRef;

export function listCreditCardStatements(vars: ListCreditCardStatementsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;
export function listCreditCardStatements(dc: DataConnect, vars: ListCreditCardStatementsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;

interface ListCreditCardStatementsPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardStatementsPageVariables): QueryRef<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCreditCardStatementsPageVariables): QueryRef<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;
  operationName: string;
}
export const listCreditCardStatementsPageRef: ListCreditCardStatementsPageRef;

export function listCreditCardStatementsPage(vars: ListCreditCardStatementsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;
export function listCreditCardStatementsPage(dc: DataConnect, vars: ListCreditCardStatementsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;

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

interface ListCreditCardStatementLinesPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardStatementLinesPageVariables): QueryRef<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCreditCardStatementLinesPageVariables): QueryRef<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;
  operationName: string;
}
export const listCreditCardStatementLinesPageRef: ListCreditCardStatementLinesPageRef;

export function listCreditCardStatementLinesPage(vars: ListCreditCardStatementLinesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;
export function listCreditCardStatementLinesPage(dc: DataConnect, vars: ListCreditCardStatementLinesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;

interface ListAllCreditCardStatementLinesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAllCreditCardStatementLinesVariables): QueryRef<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAllCreditCardStatementLinesVariables): QueryRef<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;
  operationName: string;
}
export const listAllCreditCardStatementLinesRef: ListAllCreditCardStatementLinesRef;

export function listAllCreditCardStatementLines(vars: ListAllCreditCardStatementLinesVariables, options?: ExecuteQueryOptions): QueryPromise<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;
export function listAllCreditCardStatementLines(dc: DataConnect, vars: ListAllCreditCardStatementLinesVariables, options?: ExecuteQueryOptions): QueryPromise<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;

interface ListAllCreditCardStatementLinesPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAllCreditCardStatementLinesPageVariables): QueryRef<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAllCreditCardStatementLinesPageVariables): QueryRef<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;
  operationName: string;
}
export const listAllCreditCardStatementLinesPageRef: ListAllCreditCardStatementLinesPageRef;

export function listAllCreditCardStatementLinesPage(vars: ListAllCreditCardStatementLinesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;
export function listAllCreditCardStatementLinesPage(dc: DataConnect, vars: ListAllCreditCardStatementLinesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;

interface ListMerchantAliasesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMerchantAliasesVariables): QueryRef<ListMerchantAliasesData, ListMerchantAliasesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMerchantAliasesVariables): QueryRef<ListMerchantAliasesData, ListMerchantAliasesVariables>;
  operationName: string;
}
export const listMerchantAliasesRef: ListMerchantAliasesRef;

export function listMerchantAliases(vars: ListMerchantAliasesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMerchantAliasesData, ListMerchantAliasesVariables>;
export function listMerchantAliases(dc: DataConnect, vars: ListMerchantAliasesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMerchantAliasesData, ListMerchantAliasesVariables>;

interface ListMerchantAliasesPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMerchantAliasesPageVariables): QueryRef<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMerchantAliasesPageVariables): QueryRef<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;
  operationName: string;
}
export const listMerchantAliasesPageRef: ListMerchantAliasesPageRef;

export function listMerchantAliasesPage(vars: ListMerchantAliasesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;
export function listMerchantAliasesPage(dc: DataConnect, vars: ListMerchantAliasesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;

interface ListReconciliationMatchesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReconciliationMatchesVariables): QueryRef<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListReconciliationMatchesVariables): QueryRef<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;
  operationName: string;
}
export const listReconciliationMatchesRef: ListReconciliationMatchesRef;

export function listReconciliationMatches(vars: ListReconciliationMatchesVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;
export function listReconciliationMatches(dc: DataConnect, vars: ListReconciliationMatchesVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;

interface ListReconciliationMatchesPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReconciliationMatchesPageVariables): QueryRef<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListReconciliationMatchesPageVariables): QueryRef<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;
  operationName: string;
}
export const listReconciliationMatchesPageRef: ListReconciliationMatchesPageRef;

export function listReconciliationMatchesPage(vars: ListReconciliationMatchesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;
export function listReconciliationMatchesPage(dc: DataConnect, vars: ListReconciliationMatchesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;

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
  (vars: ListExpenseTransactionsVariables): QueryRef<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListExpenseTransactionsVariables): QueryRef<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;
  operationName: string;
}
export const listExpenseTransactionsRef: ListExpenseTransactionsRef;

export function listExpenseTransactions(vars: ListExpenseTransactionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;
export function listExpenseTransactions(dc: DataConnect, vars: ListExpenseTransactionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;

interface ListExpenseTransactionsPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExpenseTransactionsPageVariables): QueryRef<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListExpenseTransactionsPageVariables): QueryRef<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;
  operationName: string;
}
export const listExpenseTransactionsPageRef: ListExpenseTransactionsPageRef;

export function listExpenseTransactionsPage(vars: ListExpenseTransactionsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;
export function listExpenseTransactionsPage(dc: DataConnect, vars: ListExpenseTransactionsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;

interface ListInvoicesToReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoicesToReviewVariables): QueryRef<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListInvoicesToReviewVariables): QueryRef<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;
  operationName: string;
}
export const listInvoicesToReviewRef: ListInvoicesToReviewRef;

export function listInvoicesToReview(vars: ListInvoicesToReviewVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;
export function listInvoicesToReview(dc: DataConnect, vars: ListInvoicesToReviewVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;

interface ListInvoicesToReviewPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoicesToReviewPageVariables): QueryRef<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListInvoicesToReviewPageVariables): QueryRef<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;
  operationName: string;
}
export const listInvoicesToReviewPageRef: ListInvoicesToReviewPageRef;

export function listInvoicesToReviewPage(vars: ListInvoicesToReviewPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;
export function listInvoicesToReviewPage(dc: DataConnect, vars: ListInvoicesToReviewPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;

interface ListInvoiceIntakesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoiceIntakesVariables): QueryRef<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListInvoiceIntakesVariables): QueryRef<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;
  operationName: string;
}
export const listInvoiceIntakesRef: ListInvoiceIntakesRef;

export function listInvoiceIntakes(vars: ListInvoiceIntakesVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;
export function listInvoiceIntakes(dc: DataConnect, vars: ListInvoiceIntakesVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;

interface ListInvoiceIntakesPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoiceIntakesPageVariables): QueryRef<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListInvoiceIntakesPageVariables): QueryRef<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;
  operationName: string;
}
export const listInvoiceIntakesPageRef: ListInvoiceIntakesPageRef;

export function listInvoiceIntakesPage(vars: ListInvoiceIntakesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;
export function listInvoiceIntakesPage(dc: DataConnect, vars: ListInvoiceIntakesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;

interface ListInvoicesForReconciliationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoicesForReconciliationVariables): QueryRef<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListInvoicesForReconciliationVariables): QueryRef<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;
  operationName: string;
}
export const listInvoicesForReconciliationRef: ListInvoicesForReconciliationRef;

export function listInvoicesForReconciliation(vars: ListInvoicesForReconciliationVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;
export function listInvoicesForReconciliation(dc: DataConnect, vars: ListInvoicesForReconciliationVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;

interface ListInvoicesForReconciliationPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoicesForReconciliationPageVariables): QueryRef<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListInvoicesForReconciliationPageVariables): QueryRef<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;
  operationName: string;
}
export const listInvoicesForReconciliationPageRef: ListInvoicesForReconciliationPageRef;

export function listInvoicesForReconciliationPage(vars: ListInvoicesForReconciliationPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;
export function listInvoicesForReconciliationPage(dc: DataConnect, vars: ListInvoicesForReconciliationPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;

interface ListTransactionCorrectionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTransactionCorrectionsVariables): QueryRef<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTransactionCorrectionsVariables): QueryRef<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;
  operationName: string;
}
export const listTransactionCorrectionsRef: ListTransactionCorrectionsRef;

export function listTransactionCorrections(vars: ListTransactionCorrectionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;
export function listTransactionCorrections(dc: DataConnect, vars: ListTransactionCorrectionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;

interface ListReportAdjustmentSetsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReportAdjustmentSetsVariables): QueryRef<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListReportAdjustmentSetsVariables): QueryRef<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;
  operationName: string;
}
export const listReportAdjustmentSetsRef: ListReportAdjustmentSetsRef;

export function listReportAdjustmentSets(vars: ListReportAdjustmentSetsVariables, options?: ExecuteQueryOptions): QueryPromise<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;
export function listReportAdjustmentSets(dc: DataConnect, vars: ListReportAdjustmentSetsVariables, options?: ExecuteQueryOptions): QueryPromise<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;

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

interface ListReconciliationOutsideControlsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReconciliationOutsideControlsVariables): QueryRef<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListReconciliationOutsideControlsVariables): QueryRef<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;
  operationName: string;
}
export const listReconciliationOutsideControlsRef: ListReconciliationOutsideControlsRef;

export function listReconciliationOutsideControls(vars: ListReconciliationOutsideControlsVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;
export function listReconciliationOutsideControls(dc: DataConnect, vars: ListReconciliationOutsideControlsVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;

interface ListReconciliationOutsideControlsPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReconciliationOutsideControlsPageVariables): QueryRef<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListReconciliationOutsideControlsPageVariables): QueryRef<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;
  operationName: string;
}
export const listReconciliationOutsideControlsPageRef: ListReconciliationOutsideControlsPageRef;

export function listReconciliationOutsideControlsPage(vars: ListReconciliationOutsideControlsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;
export function listReconciliationOutsideControlsPage(dc: DataConnect, vars: ListReconciliationOutsideControlsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;

interface ListCreditCardsPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardsPageVariables): QueryRef<ListCreditCardsPageData, ListCreditCardsPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCreditCardsPageVariables): QueryRef<ListCreditCardsPageData, ListCreditCardsPageVariables>;
  operationName: string;
}
export const listCreditCardsPageRef: ListCreditCardsPageRef;

export function listCreditCardsPage(vars: ListCreditCardsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardsPageData, ListCreditCardsPageVariables>;
export function listCreditCardsPage(dc: DataConnect, vars: ListCreditCardsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardsPageData, ListCreditCardsPageVariables>;

interface ListCardStatementPeriodsPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCardStatementPeriodsPageVariables): QueryRef<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCardStatementPeriodsPageVariables): QueryRef<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;
  operationName: string;
}
export const listCardStatementPeriodsPageRef: ListCardStatementPeriodsPageRef;

export function listCardStatementPeriodsPage(vars: ListCardStatementPeriodsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;
export function listCardStatementPeriodsPage(dc: DataConnect, vars: ListCardStatementPeriodsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;

interface ListExpenseAccountsPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExpenseAccountsPageVariables): QueryRef<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListExpenseAccountsPageVariables): QueryRef<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;
  operationName: string;
}
export const listExpenseAccountsPageRef: ListExpenseAccountsPageRef;

export function listExpenseAccountsPage(vars: ListExpenseAccountsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;
export function listExpenseAccountsPage(dc: DataConnect, vars: ListExpenseAccountsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;

interface ListProjectsPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsPageVariables): QueryRef<ListProjectsPageData, ListProjectsPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectsPageVariables): QueryRef<ListProjectsPageData, ListProjectsPageVariables>;
  operationName: string;
}
export const listProjectsPageRef: ListProjectsPageRef;

export function listProjectsPage(vars: ListProjectsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsPageData, ListProjectsPageVariables>;
export function listProjectsPage(dc: DataConnect, vars: ListProjectsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsPageData, ListProjectsPageVariables>;

interface ListSkuReferencesPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSkuReferencesPageVariables): QueryRef<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListSkuReferencesPageVariables): QueryRef<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;
  operationName: string;
}
export const listSkuReferencesPageRef: ListSkuReferencesPageRef;

export function listSkuReferencesPage(vars: ListSkuReferencesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;
export function listSkuReferencesPage(dc: DataConnect, vars: ListSkuReferencesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;

