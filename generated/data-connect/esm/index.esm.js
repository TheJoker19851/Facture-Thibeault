import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'accounting',
  service: 'facture-thibeault-service',
  location: 'northamerica-northeast1'
};
export const adminSeedUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedUserProfile', inputVars);
}
adminSeedUserProfileRef.operationName = 'AdminSeedUserProfile';

export function adminSeedUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedUserProfileRef(dcInstance, inputVars));
}

export const adminSeedProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedProject', inputVars);
}
adminSeedProjectRef.operationName = 'AdminSeedProject';

export function adminSeedProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedProjectRef(dcInstance, inputVars));
}

export const adminSeedExpenseAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedExpenseAccount', inputVars);
}
adminSeedExpenseAccountRef.operationName = 'AdminSeedExpenseAccount';

export function adminSeedExpenseAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedExpenseAccountRef(dcInstance, inputVars));
}

export const adminSeedCardStatementPeriodRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCardStatementPeriod', inputVars);
}
adminSeedCardStatementPeriodRef.operationName = 'AdminSeedCardStatementPeriod';

export function adminSeedCardStatementPeriod(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCardStatementPeriodRef(dcInstance, inputVars));
}

export const adminSeedInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedInvoiceIntake', inputVars);
}
adminSeedInvoiceIntakeRef.operationName = 'AdminSeedInvoiceIntake';

export function adminSeedInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedInvoiceIntakeRef(dcInstance, inputVars));
}

export const adminSeedCreditCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCreditCard', inputVars);
}
adminSeedCreditCardRef.operationName = 'AdminSeedCreditCard';

export function adminSeedCreditCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCreditCardRef(dcInstance, inputVars));
}

export const adminSeedCreditCardStatementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCreditCardStatement', inputVars);
}
adminSeedCreditCardStatementRef.operationName = 'AdminSeedCreditCardStatement';

export function adminSeedCreditCardStatement(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCreditCardStatementRef(dcInstance, inputVars));
}

export const adminSeedCreditCardStatementLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCreditCardStatementLine', inputVars);
}
adminSeedCreditCardStatementLineRef.operationName = 'AdminSeedCreditCardStatementLine';

export function adminSeedCreditCardStatementLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCreditCardStatementLineRef(dcInstance, inputVars));
}

export const adminSeedSkuReferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedSkuReference', inputVars);
}
adminSeedSkuReferenceRef.operationName = 'AdminSeedSkuReference';

export function adminSeedSkuReference(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedSkuReferenceRef(dcInstance, inputVars));
}

export const adminSeedExpenseTransactionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedExpenseTransaction', inputVars);
}
adminSeedExpenseTransactionRef.operationName = 'AdminSeedExpenseTransaction';

export function adminSeedExpenseTransaction(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedExpenseTransactionRef(dcInstance, inputVars));
}

export const adminSeedInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedInvoice', inputVars);
}
adminSeedInvoiceRef.operationName = 'AdminSeedInvoice';

export function adminSeedInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedInvoiceRef(dcInstance, inputVars));
}

export const adminSeedInvoicePhotoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedInvoicePhoto', inputVars);
}
adminSeedInvoicePhotoRef.operationName = 'AdminSeedInvoicePhoto';

export function adminSeedInvoicePhoto(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedInvoicePhotoRef(dcInstance, inputVars));
}

export const adminDeleteInvoicePhotoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteInvoicePhoto', inputVars);
}
adminDeleteInvoicePhotoRef.operationName = 'AdminDeleteInvoicePhoto';

export function adminDeleteInvoicePhoto(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteInvoicePhotoRef(dcInstance, inputVars));
}

export const adminDeleteInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteInvoice', inputVars);
}
adminDeleteInvoiceRef.operationName = 'AdminDeleteInvoice';

export function adminDeleteInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteInvoiceRef(dcInstance, inputVars));
}

export const adminDeleteExpenseTransactionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteExpenseTransaction', inputVars);
}
adminDeleteExpenseTransactionRef.operationName = 'AdminDeleteExpenseTransaction';

export function adminDeleteExpenseTransaction(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteExpenseTransactionRef(dcInstance, inputVars));
}

export const adminDeleteInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteInvoiceIntake', inputVars);
}
adminDeleteInvoiceIntakeRef.operationName = 'AdminDeleteInvoiceIntake';

export function adminDeleteInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteInvoiceIntakeRef(dcInstance, inputVars));
}

export const adminDeleteCreditCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteCreditCard', inputVars);
}
adminDeleteCreditCardRef.operationName = 'AdminDeleteCreditCard';

export function adminDeleteCreditCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteCreditCardRef(dcInstance, inputVars));
}

export const adminDeleteSkuReferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteSkuReference', inputVars);
}
adminDeleteSkuReferenceRef.operationName = 'AdminDeleteSkuReference';

export function adminDeleteSkuReference(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteSkuReferenceRef(dcInstance, inputVars));
}

export const adminDeleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteProject', inputVars);
}
adminDeleteProjectRef.operationName = 'AdminDeleteProject';

export function adminDeleteProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteProjectRef(dcInstance, inputVars));
}

export const adminDeleteExpenseAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteExpenseAccount', inputVars);
}
adminDeleteExpenseAccountRef.operationName = 'AdminDeleteExpenseAccount';

export function adminDeleteExpenseAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteExpenseAccountRef(dcInstance, inputVars));
}

export const adminSeedCreditCardHolderHistoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCreditCardHolderHistory', inputVars);
}
adminSeedCreditCardHolderHistoryRef.operationName = 'AdminSeedCreditCardHolderHistory';

export function adminSeedCreditCardHolderHistory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCreditCardHolderHistoryRef(dcInstance, inputVars));
}

export const adminSeedMerchantAliasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedMerchantAlias', inputVars);
}
adminSeedMerchantAliasRef.operationName = 'AdminSeedMerchantAlias';

export function adminSeedMerchantAlias(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedMerchantAliasRef(dcInstance, inputVars));
}

export const adminDeleteCardStatementPeriodRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteCardStatementPeriod', inputVars);
}
adminDeleteCardStatementPeriodRef.operationName = 'AdminDeleteCardStatementPeriod';

export function adminDeleteCardStatementPeriod(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteCardStatementPeriodRef(dcInstance, inputVars));
}

export const adminDeleteUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteUserProfile', inputVars);
}
adminDeleteUserProfileRef.operationName = 'AdminDeleteUserProfile';

export function adminDeleteUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteUserProfileRef(dcInstance, inputVars));
}

export const adminListInvoicesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListInvoices', inputVars);
}
adminListInvoicesRef.operationName = 'AdminListInvoices';

export function adminListInvoices(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(adminListInvoicesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const adminListInvoicePhotosRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListInvoicePhotos', inputVars);
}
adminListInvoicePhotosRef.operationName = 'AdminListInvoicePhotos';

export function adminListInvoicePhotos(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(adminListInvoicePhotosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const adminRecordArchivePurgeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminRecordArchivePurge', inputVars);
}
adminRecordArchivePurgeRef.operationName = 'AdminRecordArchivePurge';

export function adminRecordArchivePurge(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminRecordArchivePurgeRef(dcInstance, inputVars));
}

export const upsertUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUserProfile', inputVars);
}
upsertUserProfileRef.operationName = 'UpsertUserProfile';

export function upsertUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertUserProfileRef(dcInstance, inputVars));
}

export const upsertCreditCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCard', inputVars);
}
upsertCreditCardRef.operationName = 'UpsertCreditCard';

export function upsertCreditCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCreditCardRef(dcInstance, inputVars));
}

export const adminUpsertUserProfileWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpsertUserProfileWithAudit', inputVars);
}
adminUpsertUserProfileWithAuditRef.operationName = 'AdminUpsertUserProfileWithAudit';

export function adminUpsertUserProfileWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpsertUserProfileWithAuditRef(dcInstance, inputVars));
}

export const adminRecordUserAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminRecordUserAudit', inputVars);
}
adminRecordUserAuditRef.operationName = 'AdminRecordUserAudit';

export function adminRecordUserAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminRecordUserAuditRef(dcInstance, inputVars));
}

export const adminHardDeleteUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminHardDeleteUserProfile', inputVars);
}
adminHardDeleteUserProfileRef.operationName = 'AdminHardDeleteUserProfile';

export function adminHardDeleteUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminHardDeleteUserProfileRef(dcInstance, inputVars));
}

export const adminHardDeleteCreditCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminHardDeleteCreditCard', inputVars);
}
adminHardDeleteCreditCardRef.operationName = 'AdminHardDeleteCreditCard';

export function adminHardDeleteCreditCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminHardDeleteCreditCardRef(dcInstance, inputVars));
}

export const upsertProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertProject', inputVars);
}
upsertProjectRef.operationName = 'UpsertProject';

export function upsertProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertProjectRef(dcInstance, inputVars));
}

export const upsertExpenseAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertExpenseAccount', inputVars);
}
upsertExpenseAccountRef.operationName = 'UpsertExpenseAccount';

export function upsertExpenseAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertExpenseAccountRef(dcInstance, inputVars));
}

export const deleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject', inputVars);
}
deleteProjectRef.operationName = 'DeleteProject';

export function deleteProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteProjectRef(dcInstance, inputVars));
}

export const deleteExpenseAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteExpenseAccount', inputVars);
}
deleteExpenseAccountRef.operationName = 'DeleteExpenseAccount';

export function deleteExpenseAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteExpenseAccountRef(dcInstance, inputVars));
}

export const upsertCardStatementPeriodRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCardStatementPeriod', inputVars);
}
upsertCardStatementPeriodRef.operationName = 'UpsertCardStatementPeriod';

export function upsertCardStatementPeriod(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCardStatementPeriodRef(dcInstance, inputVars));
}

export const saveStatementManualAdjustmentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SaveStatementManualAdjustments', inputVars);
}
saveStatementManualAdjustmentsRef.operationName = 'SaveStatementManualAdjustments';

export function saveStatementManualAdjustments(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(saveStatementManualAdjustmentsRef(dcInstance, inputVars));
}

export const upsertReportAdjustmentSetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportAdjustmentSet', inputVars);
}
upsertReportAdjustmentSetRef.operationName = 'UpsertReportAdjustmentSet';

export function upsertReportAdjustmentSet(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertReportAdjustmentSetRef(dcInstance, inputVars));
}

export const upsertCreditCardStatementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCardStatement', inputVars);
}
upsertCreditCardStatementRef.operationName = 'UpsertCreditCardStatement';

export function upsertCreditCardStatement(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCreditCardStatementRef(dcInstance, inputVars));
}

export const upsertCreditCardStatementLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCardStatementLine', inputVars);
}
upsertCreditCardStatementLineRef.operationName = 'UpsertCreditCardStatementLine';

export function upsertCreditCardStatementLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCreditCardStatementLineRef(dcInstance, inputVars));
}

export const upsertCreditCardHolderHistoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCardHolderHistory', inputVars);
}
upsertCreditCardHolderHistoryRef.operationName = 'UpsertCreditCardHolderHistory';

export function upsertCreditCardHolderHistory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCreditCardHolderHistoryRef(dcInstance, inputVars));
}

export const upsertMerchantAliasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMerchantAlias', inputVars);
}
upsertMerchantAliasRef.operationName = 'UpsertMerchantAlias';

export function upsertMerchantAlias(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMerchantAliasRef(dcInstance, inputVars));
}

export const persistReconciliationMatchRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PersistReconciliationMatch', inputVars);
}
persistReconciliationMatchRef.operationName = 'PersistReconciliationMatch';

export function persistReconciliationMatch(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(persistReconciliationMatchRef(dcInstance, inputVars));
}

export const clearReconciliationMatchRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearReconciliationMatch', inputVars);
}
clearReconciliationMatchRef.operationName = 'ClearReconciliationMatch';

export function clearReconciliationMatch(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(clearReconciliationMatchRef(dcInstance, inputVars));
}

export const persistReconciliationMatchWithoutInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PersistReconciliationMatchWithoutInvoice', inputVars);
}
persistReconciliationMatchWithoutInvoiceRef.operationName = 'PersistReconciliationMatchWithoutInvoice';

export function persistReconciliationMatchWithoutInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(persistReconciliationMatchWithoutInvoiceRef(dcInstance, inputVars));
}

export const persistReconciliationLineStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PersistReconciliationLineStatus', inputVars);
}
persistReconciliationLineStatusRef.operationName = 'PersistReconciliationLineStatus';

export function persistReconciliationLineStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(persistReconciliationLineStatusRef(dcInstance, inputVars));
}

export const upsertReconciliationOutsideControlRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReconciliationOutsideControl', inputVars);
}
upsertReconciliationOutsideControlRef.operationName = 'UpsertReconciliationOutsideControl';

export function upsertReconciliationOutsideControl(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertReconciliationOutsideControlRef(dcInstance, inputVars));
}

export const resolveReconciliationOutsideControlRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ResolveReconciliationOutsideControl', inputVars);
}
resolveReconciliationOutsideControlRef.operationName = 'ResolveReconciliationOutsideControl';

export function resolveReconciliationOutsideControl(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(resolveReconciliationOutsideControlRef(dcInstance, inputVars));
}

export const createInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvoiceIntake', inputVars);
}
createInvoiceIntakeRef.operationName = 'CreateInvoiceIntake';

export function createInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInvoiceIntakeRef(dcInstance, inputVars));
}

export const createInvoiceIntakeV2Ref = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvoiceIntakeV2', inputVars);
}
createInvoiceIntakeV2Ref.operationName = 'CreateInvoiceIntakeV2';

export function createInvoiceIntakeV2(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInvoiceIntakeV2Ref(dcInstance, inputVars));
}

export const claimInvoiceIntakeProcessingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClaimInvoiceIntakeProcessing', inputVars);
}
claimInvoiceIntakeProcessingRef.operationName = 'ClaimInvoiceIntakeProcessing';

export function claimInvoiceIntakeProcessing(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(claimInvoiceIntakeProcessingRef(dcInstance, inputVars));
}

export const requeueStaleInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequeueStaleInvoiceIntake', inputVars);
}
requeueStaleInvoiceIntakeRef.operationName = 'RequeueStaleInvoiceIntake';

export function requeueStaleInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(requeueStaleInvoiceIntakeRef(dcInstance, inputVars));
}

export const updateInvoiceIntakeAiResultRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInvoiceIntakeAiResult', inputVars);
}
updateInvoiceIntakeAiResultRef.operationName = 'UpdateInvoiceIntakeAiResult';

export function updateInvoiceIntakeAiResult(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateInvoiceIntakeAiResultRef(dcInstance, inputVars));
}

export const markInvoiceIntakeAiErrorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakeAiError', inputVars);
}
markInvoiceIntakeAiErrorRef.operationName = 'MarkInvoiceIntakeAiError';

export function markInvoiceIntakeAiError(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markInvoiceIntakeAiErrorRef(dcInstance, inputVars));
}

export const markInvoiceIntakeAiMaxAttemptsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakeAiMaxAttempts', inputVars);
}
markInvoiceIntakeAiMaxAttemptsRef.operationName = 'MarkInvoiceIntakeAiMaxAttempts';

export function markInvoiceIntakeAiMaxAttempts(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markInvoiceIntakeAiMaxAttemptsRef(dcInstance, inputVars));
}

export const markInvoiceIntakeAutoPostingErrorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakeAutoPostingError', inputVars);
}
markInvoiceIntakeAutoPostingErrorRef.operationName = 'MarkInvoiceIntakeAutoPostingError';

export function markInvoiceIntakeAutoPostingError(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markInvoiceIntakeAutoPostingErrorRef(dcInstance, inputVars));
}

export const updateInvoiceIntakeReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInvoiceIntakeReview', inputVars);
}
updateInvoiceIntakeReviewRef.operationName = 'UpdateInvoiceIntakeReview';

export function updateInvoiceIntakeReview(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateInvoiceIntakeReviewRef(dcInstance, inputVars));
}

export const discardInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DiscardInvoiceIntake', inputVars);
}
discardInvoiceIntakeRef.operationName = 'DiscardInvoiceIntake';

export function discardInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(discardInvoiceIntakeRef(dcInstance, inputVars));
}

export const deletePostedInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePostedInvoice', inputVars);
}
deletePostedInvoiceRef.operationName = 'DeletePostedInvoice';

export function deletePostedInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePostedInvoiceRef(dcInstance, inputVars));
}

export const markInvoiceIntakePostingErrorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakePostingError', inputVars);
}
markInvoiceIntakePostingErrorRef.operationName = 'MarkInvoiceIntakePostingError';

export function markInvoiceIntakePostingError(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markInvoiceIntakePostingErrorRef(dcInstance, inputVars));
}

export const retryInvoiceIntakeAiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RetryInvoiceIntakeAi', inputVars);
}
retryInvoiceIntakeAiRef.operationName = 'RetryInvoiceIntakeAi';

export function retryInvoiceIntakeAi(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(retryInvoiceIntakeAiRef(dcInstance, inputVars));
}

export const retryInvoiceIntakeAiTransientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RetryInvoiceIntakeAiTransient', inputVars);
}
retryInvoiceIntakeAiTransientRef.operationName = 'RetryInvoiceIntakeAiTransient';

export function retryInvoiceIntakeAiTransient(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(retryInvoiceIntakeAiTransientRef(dcInstance, inputVars));
}

export const retryInvoiceIntakeAiTransientV2Ref = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RetryInvoiceIntakeAiTransientV2', inputVars);
}
retryInvoiceIntakeAiTransientV2Ref.operationName = 'RetryInvoiceIntakeAiTransientV2';

export function retryInvoiceIntakeAiTransientV2(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(retryInvoiceIntakeAiTransientV2Ref(dcInstance, inputVars));
}

export const materializeInvoiceIntakeV2Ref = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MaterializeInvoiceIntakeV2', inputVars);
}
materializeInvoiceIntakeV2Ref.operationName = 'MaterializeInvoiceIntakeV2';

export function materializeInvoiceIntakeV2(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(materializeInvoiceIntakeV2Ref(dcInstance, inputVars));
}

export const correctPostedInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CorrectPostedInvoice', inputVars);
}
correctPostedInvoiceRef.operationName = 'CorrectPostedInvoice';

export function correctPostedInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(correctPostedInvoiceRef(dcInstance, inputVars));
}

export const commitInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CommitInvoiceIntake', inputVars);
}
commitInvoiceIntakeRef.operationName = 'CommitInvoiceIntake';

export function commitInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(commitInvoiceIntakeRef(dcInstance, inputVars));
}

export const commitInvoiceIntakeWithoutProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CommitInvoiceIntakeWithoutProject', inputVars);
}
commitInvoiceIntakeWithoutProjectRef.operationName = 'CommitInvoiceIntakeWithoutProject';

export function commitInvoiceIntakeWithoutProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(commitInvoiceIntakeWithoutProjectRef(dcInstance, inputVars));
}

export const autoCommitInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AutoCommitInvoiceIntake', inputVars);
}
autoCommitInvoiceIntakeRef.operationName = 'AutoCommitInvoiceIntake';

export function autoCommitInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(autoCommitInvoiceIntakeRef(dcInstance, inputVars));
}

export const listUserProfilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserProfiles', inputVars);
}
listUserProfilesRef.operationName = 'ListUserProfiles';

export function listUserProfiles(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUserProfilesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCreditCardsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCards');
}
listCreditCardsRef.operationName = 'ListCreditCards';

export function listCreditCards(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCreditCardsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCardStatementPeriodsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCardStatementPeriods');
}
listCardStatementPeriodsRef.operationName = 'ListCardStatementPeriods';

export function listCardStatementPeriods(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCardStatementPeriodsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listExpenseAccountsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseAccounts');
}
listExpenseAccountsRef.operationName = 'ListExpenseAccounts';

export function listExpenseAccounts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listExpenseAccountsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCreditCardHolderHistoriesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardHolderHistories', inputVars);
}
listCreditCardHolderHistoriesRef.operationName = 'ListCreditCardHolderHistories';

export function listCreditCardHolderHistories(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardHolderHistoriesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCreditCardStatementsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatements', inputVars);
}
listCreditCardStatementsRef.operationName = 'ListCreditCardStatements';

export function listCreditCardStatements(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardStatementsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCreditCardStatementsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatementsPage', inputVars);
}
listCreditCardStatementsPageRef.operationName = 'ListCreditCardStatementsPage';

export function listCreditCardStatementsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardStatementsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCreditCardStatementLinesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatementLines', inputVars);
}
listCreditCardStatementLinesRef.operationName = 'ListCreditCardStatementLines';

export function listCreditCardStatementLines(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardStatementLinesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCreditCardStatementLinesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatementLinesPage', inputVars);
}
listCreditCardStatementLinesPageRef.operationName = 'ListCreditCardStatementLinesPage';

export function listCreditCardStatementLinesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardStatementLinesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listAllCreditCardStatementLinesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCreditCardStatementLines', inputVars);
}
listAllCreditCardStatementLinesRef.operationName = 'ListAllCreditCardStatementLines';

export function listAllCreditCardStatementLines(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAllCreditCardStatementLinesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listAllCreditCardStatementLinesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCreditCardStatementLinesPage', inputVars);
}
listAllCreditCardStatementLinesPageRef.operationName = 'ListAllCreditCardStatementLinesPage';

export function listAllCreditCardStatementLinesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAllCreditCardStatementLinesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listMerchantAliasesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMerchantAliases', inputVars);
}
listMerchantAliasesRef.operationName = 'ListMerchantAliases';

export function listMerchantAliases(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMerchantAliasesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listMerchantAliasesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMerchantAliasesPage', inputVars);
}
listMerchantAliasesPageRef.operationName = 'ListMerchantAliasesPage';

export function listMerchantAliasesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMerchantAliasesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listReconciliationMatchesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReconciliationMatches', inputVars);
}
listReconciliationMatchesRef.operationName = 'ListReconciliationMatches';

export function listReconciliationMatches(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReconciliationMatchesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listReconciliationMatchesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReconciliationMatchesPage', inputVars);
}
listReconciliationMatchesPageRef.operationName = 'ListReconciliationMatchesPage';

export function listReconciliationMatchesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReconciliationMatchesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjects');
}
listProjectsRef.operationName = 'ListProjects';

export function listProjects(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listProjectsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listSkuReferencesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSkuReferences');
}
listSkuReferencesRef.operationName = 'ListSkuReferences';

export function listSkuReferences(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSkuReferencesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listExpenseTransactionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseTransactions', inputVars);
}
listExpenseTransactionsRef.operationName = 'ListExpenseTransactions';

export function listExpenseTransactions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listExpenseTransactionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listExpenseTransactionsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseTransactionsPage', inputVars);
}
listExpenseTransactionsPageRef.operationName = 'ListExpenseTransactionsPage';

export function listExpenseTransactionsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listExpenseTransactionsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listInvoicesToReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesToReview', inputVars);
}
listInvoicesToReviewRef.operationName = 'ListInvoicesToReview';

export function listInvoicesToReview(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoicesToReviewRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listInvoicesToReviewPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesToReviewPage', inputVars);
}
listInvoicesToReviewPageRef.operationName = 'ListInvoicesToReviewPage';

export function listInvoicesToReviewPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoicesToReviewPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listInvoiceIntakesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoiceIntakes', inputVars);
}
listInvoiceIntakesRef.operationName = 'ListInvoiceIntakes';

export function listInvoiceIntakes(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoiceIntakesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listInvoiceIntakesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoiceIntakesPage', inputVars);
}
listInvoiceIntakesPageRef.operationName = 'ListInvoiceIntakesPage';

export function listInvoiceIntakesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoiceIntakesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listInvoicesForReconciliationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesForReconciliation', inputVars);
}
listInvoicesForReconciliationRef.operationName = 'ListInvoicesForReconciliation';

export function listInvoicesForReconciliation(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoicesForReconciliationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listInvoicesForReconciliationPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesForReconciliationPage', inputVars);
}
listInvoicesForReconciliationPageRef.operationName = 'ListInvoicesForReconciliationPage';

export function listInvoicesForReconciliationPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoicesForReconciliationPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTransactionCorrectionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTransactionCorrections', inputVars);
}
listTransactionCorrectionsRef.operationName = 'ListTransactionCorrections';

export function listTransactionCorrections(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTransactionCorrectionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listReportAdjustmentSetsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReportAdjustmentSets', inputVars);
}
listReportAdjustmentSetsRef.operationName = 'ListReportAdjustmentSets';

export function listReportAdjustmentSets(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReportAdjustmentSetsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listAuditEventsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAuditEvents', inputVars);
}
listAuditEventsRef.operationName = 'ListAuditEvents';

export function listAuditEvents(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAuditEventsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listReconciliationOutsideControlsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReconciliationOutsideControls', inputVars);
}
listReconciliationOutsideControlsRef.operationName = 'ListReconciliationOutsideControls';

export function listReconciliationOutsideControls(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReconciliationOutsideControlsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listReconciliationOutsideControlsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReconciliationOutsideControlsPage', inputVars);
}
listReconciliationOutsideControlsPageRef.operationName = 'ListReconciliationOutsideControlsPage';

export function listReconciliationOutsideControlsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReconciliationOutsideControlsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCreditCardsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardsPage', inputVars);
}
listCreditCardsPageRef.operationName = 'ListCreditCardsPage';

export function listCreditCardsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listCardStatementPeriodsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCardStatementPeriodsPage', inputVars);
}
listCardStatementPeriodsPageRef.operationName = 'ListCardStatementPeriodsPage';

export function listCardStatementPeriodsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCardStatementPeriodsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listExpenseAccountsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseAccountsPage', inputVars);
}
listExpenseAccountsPageRef.operationName = 'ListExpenseAccountsPage';

export function listExpenseAccountsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listExpenseAccountsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listProjectsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectsPage', inputVars);
}
listProjectsPageRef.operationName = 'ListProjectsPage';

export function listProjectsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listProjectsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listSkuReferencesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSkuReferencesPage', inputVars);
}
listSkuReferencesPageRef.operationName = 'ListSkuReferencesPage';

export function listSkuReferencesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listSkuReferencesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

