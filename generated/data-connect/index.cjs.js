const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'accounting',
  service: 'facture-thibeault-service',
  location: 'northamerica-northeast1'
};
exports.connectorConfig = connectorConfig;

const adminSeedUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedUserProfile', inputVars);
}
adminSeedUserProfileRef.operationName = 'AdminSeedUserProfile';
exports.adminSeedUserProfileRef = adminSeedUserProfileRef;

exports.adminSeedUserProfile = function adminSeedUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedUserProfileRef(dcInstance, inputVars));
}
;

const adminSeedProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedProject', inputVars);
}
adminSeedProjectRef.operationName = 'AdminSeedProject';
exports.adminSeedProjectRef = adminSeedProjectRef;

exports.adminSeedProject = function adminSeedProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedProjectRef(dcInstance, inputVars));
}
;

const adminSeedExpenseAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedExpenseAccount', inputVars);
}
adminSeedExpenseAccountRef.operationName = 'AdminSeedExpenseAccount';
exports.adminSeedExpenseAccountRef = adminSeedExpenseAccountRef;

exports.adminSeedExpenseAccount = function adminSeedExpenseAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedExpenseAccountRef(dcInstance, inputVars));
}
;

const adminSeedCardStatementPeriodRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCardStatementPeriod', inputVars);
}
adminSeedCardStatementPeriodRef.operationName = 'AdminSeedCardStatementPeriod';
exports.adminSeedCardStatementPeriodRef = adminSeedCardStatementPeriodRef;

exports.adminSeedCardStatementPeriod = function adminSeedCardStatementPeriod(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCardStatementPeriodRef(dcInstance, inputVars));
}
;

const adminSeedInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedInvoiceIntake', inputVars);
}
adminSeedInvoiceIntakeRef.operationName = 'AdminSeedInvoiceIntake';
exports.adminSeedInvoiceIntakeRef = adminSeedInvoiceIntakeRef;

exports.adminSeedInvoiceIntake = function adminSeedInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedInvoiceIntakeRef(dcInstance, inputVars));
}
;

const adminSeedCreditCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCreditCard', inputVars);
}
adminSeedCreditCardRef.operationName = 'AdminSeedCreditCard';
exports.adminSeedCreditCardRef = adminSeedCreditCardRef;

exports.adminSeedCreditCard = function adminSeedCreditCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCreditCardRef(dcInstance, inputVars));
}
;

const adminSeedCreditCardStatementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCreditCardStatement', inputVars);
}
adminSeedCreditCardStatementRef.operationName = 'AdminSeedCreditCardStatement';
exports.adminSeedCreditCardStatementRef = adminSeedCreditCardStatementRef;

exports.adminSeedCreditCardStatement = function adminSeedCreditCardStatement(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCreditCardStatementRef(dcInstance, inputVars));
}
;

const adminSeedCreditCardStatementLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCreditCardStatementLine', inputVars);
}
adminSeedCreditCardStatementLineRef.operationName = 'AdminSeedCreditCardStatementLine';
exports.adminSeedCreditCardStatementLineRef = adminSeedCreditCardStatementLineRef;

exports.adminSeedCreditCardStatementLine = function adminSeedCreditCardStatementLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCreditCardStatementLineRef(dcInstance, inputVars));
}
;

const adminSeedSkuReferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedSkuReference', inputVars);
}
adminSeedSkuReferenceRef.operationName = 'AdminSeedSkuReference';
exports.adminSeedSkuReferenceRef = adminSeedSkuReferenceRef;

exports.adminSeedSkuReference = function adminSeedSkuReference(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedSkuReferenceRef(dcInstance, inputVars));
}
;

const adminSeedExpenseTransactionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedExpenseTransaction', inputVars);
}
adminSeedExpenseTransactionRef.operationName = 'AdminSeedExpenseTransaction';
exports.adminSeedExpenseTransactionRef = adminSeedExpenseTransactionRef;

exports.adminSeedExpenseTransaction = function adminSeedExpenseTransaction(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedExpenseTransactionRef(dcInstance, inputVars));
}
;

const adminSeedInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedInvoice', inputVars);
}
adminSeedInvoiceRef.operationName = 'AdminSeedInvoice';
exports.adminSeedInvoiceRef = adminSeedInvoiceRef;

exports.adminSeedInvoice = function adminSeedInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedInvoiceRef(dcInstance, inputVars));
}
;

const adminSeedInvoicePhotoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedInvoicePhoto', inputVars);
}
adminSeedInvoicePhotoRef.operationName = 'AdminSeedInvoicePhoto';
exports.adminSeedInvoicePhotoRef = adminSeedInvoicePhotoRef;

exports.adminSeedInvoicePhoto = function adminSeedInvoicePhoto(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedInvoicePhotoRef(dcInstance, inputVars));
}
;

const adminDeleteInvoicePhotoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteInvoicePhoto', inputVars);
}
adminDeleteInvoicePhotoRef.operationName = 'AdminDeleteInvoicePhoto';
exports.adminDeleteInvoicePhotoRef = adminDeleteInvoicePhotoRef;

exports.adminDeleteInvoicePhoto = function adminDeleteInvoicePhoto(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteInvoicePhotoRef(dcInstance, inputVars));
}
;

const adminDeleteInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteInvoice', inputVars);
}
adminDeleteInvoiceRef.operationName = 'AdminDeleteInvoice';
exports.adminDeleteInvoiceRef = adminDeleteInvoiceRef;

exports.adminDeleteInvoice = function adminDeleteInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteInvoiceRef(dcInstance, inputVars));
}
;

const adminDeleteExpenseTransactionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteExpenseTransaction', inputVars);
}
adminDeleteExpenseTransactionRef.operationName = 'AdminDeleteExpenseTransaction';
exports.adminDeleteExpenseTransactionRef = adminDeleteExpenseTransactionRef;

exports.adminDeleteExpenseTransaction = function adminDeleteExpenseTransaction(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteExpenseTransactionRef(dcInstance, inputVars));
}
;

const adminDeleteInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteInvoiceIntake', inputVars);
}
adminDeleteInvoiceIntakeRef.operationName = 'AdminDeleteInvoiceIntake';
exports.adminDeleteInvoiceIntakeRef = adminDeleteInvoiceIntakeRef;

exports.adminDeleteInvoiceIntake = function adminDeleteInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteInvoiceIntakeRef(dcInstance, inputVars));
}
;

const adminDeleteCreditCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteCreditCard', inputVars);
}
adminDeleteCreditCardRef.operationName = 'AdminDeleteCreditCard';
exports.adminDeleteCreditCardRef = adminDeleteCreditCardRef;

exports.adminDeleteCreditCard = function adminDeleteCreditCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteCreditCardRef(dcInstance, inputVars));
}
;

const adminDeleteSkuReferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteSkuReference', inputVars);
}
adminDeleteSkuReferenceRef.operationName = 'AdminDeleteSkuReference';
exports.adminDeleteSkuReferenceRef = adminDeleteSkuReferenceRef;

exports.adminDeleteSkuReference = function adminDeleteSkuReference(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteSkuReferenceRef(dcInstance, inputVars));
}
;

const adminDeleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteProject', inputVars);
}
adminDeleteProjectRef.operationName = 'AdminDeleteProject';
exports.adminDeleteProjectRef = adminDeleteProjectRef;

exports.adminDeleteProject = function adminDeleteProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteProjectRef(dcInstance, inputVars));
}
;

const adminDeleteExpenseAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteExpenseAccount', inputVars);
}
adminDeleteExpenseAccountRef.operationName = 'AdminDeleteExpenseAccount';
exports.adminDeleteExpenseAccountRef = adminDeleteExpenseAccountRef;

exports.adminDeleteExpenseAccount = function adminDeleteExpenseAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteExpenseAccountRef(dcInstance, inputVars));
}
;

const adminSeedCreditCardHolderHistoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedCreditCardHolderHistory', inputVars);
}
adminSeedCreditCardHolderHistoryRef.operationName = 'AdminSeedCreditCardHolderHistory';
exports.adminSeedCreditCardHolderHistoryRef = adminSeedCreditCardHolderHistoryRef;

exports.adminSeedCreditCardHolderHistory = function adminSeedCreditCardHolderHistory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedCreditCardHolderHistoryRef(dcInstance, inputVars));
}
;

const adminSeedMerchantAliasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSeedMerchantAlias', inputVars);
}
adminSeedMerchantAliasRef.operationName = 'AdminSeedMerchantAlias';
exports.adminSeedMerchantAliasRef = adminSeedMerchantAliasRef;

exports.adminSeedMerchantAlias = function adminSeedMerchantAlias(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSeedMerchantAliasRef(dcInstance, inputVars));
}
;

const adminDeleteCardStatementPeriodRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteCardStatementPeriod', inputVars);
}
adminDeleteCardStatementPeriodRef.operationName = 'AdminDeleteCardStatementPeriod';
exports.adminDeleteCardStatementPeriodRef = adminDeleteCardStatementPeriodRef;

exports.adminDeleteCardStatementPeriod = function adminDeleteCardStatementPeriod(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteCardStatementPeriodRef(dcInstance, inputVars));
}
;

const adminDeleteUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteUserProfile', inputVars);
}
adminDeleteUserProfileRef.operationName = 'AdminDeleteUserProfile';
exports.adminDeleteUserProfileRef = adminDeleteUserProfileRef;

exports.adminDeleteUserProfile = function adminDeleteUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteUserProfileRef(dcInstance, inputVars));
}
;

const adminListInvoicesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListInvoices', inputVars);
}
adminListInvoicesRef.operationName = 'AdminListInvoices';
exports.adminListInvoicesRef = adminListInvoicesRef;

exports.adminListInvoices = function adminListInvoices(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(adminListInvoicesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminListInvoicePhotosRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListInvoicePhotos', inputVars);
}
adminListInvoicePhotosRef.operationName = 'AdminListInvoicePhotos';
exports.adminListInvoicePhotosRef = adminListInvoicePhotosRef;

exports.adminListInvoicePhotos = function adminListInvoicePhotos(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(adminListInvoicePhotosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const upsertUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUserProfile', inputVars);
}
upsertUserProfileRef.operationName = 'UpsertUserProfile';
exports.upsertUserProfileRef = upsertUserProfileRef;

exports.upsertUserProfile = function upsertUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertUserProfileRef(dcInstance, inputVars));
}
;

const upsertCreditCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCard', inputVars);
}
upsertCreditCardRef.operationName = 'UpsertCreditCard';
exports.upsertCreditCardRef = upsertCreditCardRef;

exports.upsertCreditCard = function upsertCreditCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCreditCardRef(dcInstance, inputVars));
}
;

const upsertProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertProject', inputVars);
}
upsertProjectRef.operationName = 'UpsertProject';
exports.upsertProjectRef = upsertProjectRef;

exports.upsertProject = function upsertProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertProjectRef(dcInstance, inputVars));
}
;

const upsertExpenseAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertExpenseAccount', inputVars);
}
upsertExpenseAccountRef.operationName = 'UpsertExpenseAccount';
exports.upsertExpenseAccountRef = upsertExpenseAccountRef;

exports.upsertExpenseAccount = function upsertExpenseAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertExpenseAccountRef(dcInstance, inputVars));
}
;

const deleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject', inputVars);
}
deleteProjectRef.operationName = 'DeleteProject';
exports.deleteProjectRef = deleteProjectRef;

exports.deleteProject = function deleteProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteProjectRef(dcInstance, inputVars));
}
;

const deleteExpenseAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteExpenseAccount', inputVars);
}
deleteExpenseAccountRef.operationName = 'DeleteExpenseAccount';
exports.deleteExpenseAccountRef = deleteExpenseAccountRef;

exports.deleteExpenseAccount = function deleteExpenseAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteExpenseAccountRef(dcInstance, inputVars));
}
;

const upsertCardStatementPeriodRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCardStatementPeriod', inputVars);
}
upsertCardStatementPeriodRef.operationName = 'UpsertCardStatementPeriod';
exports.upsertCardStatementPeriodRef = upsertCardStatementPeriodRef;

exports.upsertCardStatementPeriod = function upsertCardStatementPeriod(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCardStatementPeriodRef(dcInstance, inputVars));
}
;

const saveStatementManualAdjustmentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SaveStatementManualAdjustments', inputVars);
}
saveStatementManualAdjustmentsRef.operationName = 'SaveStatementManualAdjustments';
exports.saveStatementManualAdjustmentsRef = saveStatementManualAdjustmentsRef;

exports.saveStatementManualAdjustments = function saveStatementManualAdjustments(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(saveStatementManualAdjustmentsRef(dcInstance, inputVars));
}
;

const upsertReportAdjustmentSetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportAdjustmentSet', inputVars);
}
upsertReportAdjustmentSetRef.operationName = 'UpsertReportAdjustmentSet';
exports.upsertReportAdjustmentSetRef = upsertReportAdjustmentSetRef;

exports.upsertReportAdjustmentSet = function upsertReportAdjustmentSet(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertReportAdjustmentSetRef(dcInstance, inputVars));
}
;

const upsertCreditCardStatementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCardStatement', inputVars);
}
upsertCreditCardStatementRef.operationName = 'UpsertCreditCardStatement';
exports.upsertCreditCardStatementRef = upsertCreditCardStatementRef;

exports.upsertCreditCardStatement = function upsertCreditCardStatement(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCreditCardStatementRef(dcInstance, inputVars));
}
;

const upsertCreditCardStatementLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCardStatementLine', inputVars);
}
upsertCreditCardStatementLineRef.operationName = 'UpsertCreditCardStatementLine';
exports.upsertCreditCardStatementLineRef = upsertCreditCardStatementLineRef;

exports.upsertCreditCardStatementLine = function upsertCreditCardStatementLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCreditCardStatementLineRef(dcInstance, inputVars));
}
;

const upsertCreditCardHolderHistoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCardHolderHistory', inputVars);
}
upsertCreditCardHolderHistoryRef.operationName = 'UpsertCreditCardHolderHistory';
exports.upsertCreditCardHolderHistoryRef = upsertCreditCardHolderHistoryRef;

exports.upsertCreditCardHolderHistory = function upsertCreditCardHolderHistory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCreditCardHolderHistoryRef(dcInstance, inputVars));
}
;

const upsertMerchantAliasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMerchantAlias', inputVars);
}
upsertMerchantAliasRef.operationName = 'UpsertMerchantAlias';
exports.upsertMerchantAliasRef = upsertMerchantAliasRef;

exports.upsertMerchantAlias = function upsertMerchantAlias(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMerchantAliasRef(dcInstance, inputVars));
}
;

const persistReconciliationMatchRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PersistReconciliationMatch', inputVars);
}
persistReconciliationMatchRef.operationName = 'PersistReconciliationMatch';
exports.persistReconciliationMatchRef = persistReconciliationMatchRef;

exports.persistReconciliationMatch = function persistReconciliationMatch(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(persistReconciliationMatchRef(dcInstance, inputVars));
}
;

const clearReconciliationMatchRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearReconciliationMatch', inputVars);
}
clearReconciliationMatchRef.operationName = 'ClearReconciliationMatch';
exports.clearReconciliationMatchRef = clearReconciliationMatchRef;

exports.clearReconciliationMatch = function clearReconciliationMatch(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(clearReconciliationMatchRef(dcInstance, inputVars));
}
;

const persistReconciliationMatchWithoutInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PersistReconciliationMatchWithoutInvoice', inputVars);
}
persistReconciliationMatchWithoutInvoiceRef.operationName = 'PersistReconciliationMatchWithoutInvoice';
exports.persistReconciliationMatchWithoutInvoiceRef = persistReconciliationMatchWithoutInvoiceRef;

exports.persistReconciliationMatchWithoutInvoice = function persistReconciliationMatchWithoutInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(persistReconciliationMatchWithoutInvoiceRef(dcInstance, inputVars));
}
;

const persistReconciliationLineStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PersistReconciliationLineStatus', inputVars);
}
persistReconciliationLineStatusRef.operationName = 'PersistReconciliationLineStatus';
exports.persistReconciliationLineStatusRef = persistReconciliationLineStatusRef;

exports.persistReconciliationLineStatus = function persistReconciliationLineStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(persistReconciliationLineStatusRef(dcInstance, inputVars));
}
;

const upsertReconciliationOutsideControlRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReconciliationOutsideControl', inputVars);
}
upsertReconciliationOutsideControlRef.operationName = 'UpsertReconciliationOutsideControl';
exports.upsertReconciliationOutsideControlRef = upsertReconciliationOutsideControlRef;

exports.upsertReconciliationOutsideControl = function upsertReconciliationOutsideControl(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertReconciliationOutsideControlRef(dcInstance, inputVars));
}
;

const resolveReconciliationOutsideControlRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ResolveReconciliationOutsideControl', inputVars);
}
resolveReconciliationOutsideControlRef.operationName = 'ResolveReconciliationOutsideControl';
exports.resolveReconciliationOutsideControlRef = resolveReconciliationOutsideControlRef;

exports.resolveReconciliationOutsideControl = function resolveReconciliationOutsideControl(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(resolveReconciliationOutsideControlRef(dcInstance, inputVars));
}
;

const createInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvoiceIntake', inputVars);
}
createInvoiceIntakeRef.operationName = 'CreateInvoiceIntake';
exports.createInvoiceIntakeRef = createInvoiceIntakeRef;

exports.createInvoiceIntake = function createInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInvoiceIntakeRef(dcInstance, inputVars));
}
;

const createInvoiceIntakeV2Ref = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvoiceIntakeV2', inputVars);
}
createInvoiceIntakeV2Ref.operationName = 'CreateInvoiceIntakeV2';
exports.createInvoiceIntakeV2Ref = createInvoiceIntakeV2Ref;

exports.createInvoiceIntakeV2 = function createInvoiceIntakeV2(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInvoiceIntakeV2Ref(dcInstance, inputVars));
}
;

const claimInvoiceIntakeProcessingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClaimInvoiceIntakeProcessing', inputVars);
}
claimInvoiceIntakeProcessingRef.operationName = 'ClaimInvoiceIntakeProcessing';
exports.claimInvoiceIntakeProcessingRef = claimInvoiceIntakeProcessingRef;

exports.claimInvoiceIntakeProcessing = function claimInvoiceIntakeProcessing(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(claimInvoiceIntakeProcessingRef(dcInstance, inputVars));
}
;

const requeueStaleInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequeueStaleInvoiceIntake', inputVars);
}
requeueStaleInvoiceIntakeRef.operationName = 'RequeueStaleInvoiceIntake';
exports.requeueStaleInvoiceIntakeRef = requeueStaleInvoiceIntakeRef;

exports.requeueStaleInvoiceIntake = function requeueStaleInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(requeueStaleInvoiceIntakeRef(dcInstance, inputVars));
}
;

const updateInvoiceIntakeAiResultRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInvoiceIntakeAiResult', inputVars);
}
updateInvoiceIntakeAiResultRef.operationName = 'UpdateInvoiceIntakeAiResult';
exports.updateInvoiceIntakeAiResultRef = updateInvoiceIntakeAiResultRef;

exports.updateInvoiceIntakeAiResult = function updateInvoiceIntakeAiResult(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateInvoiceIntakeAiResultRef(dcInstance, inputVars));
}
;

const markInvoiceIntakeAiErrorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakeAiError', inputVars);
}
markInvoiceIntakeAiErrorRef.operationName = 'MarkInvoiceIntakeAiError';
exports.markInvoiceIntakeAiErrorRef = markInvoiceIntakeAiErrorRef;

exports.markInvoiceIntakeAiError = function markInvoiceIntakeAiError(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markInvoiceIntakeAiErrorRef(dcInstance, inputVars));
}
;

const markInvoiceIntakeAiMaxAttemptsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakeAiMaxAttempts', inputVars);
}
markInvoiceIntakeAiMaxAttemptsRef.operationName = 'MarkInvoiceIntakeAiMaxAttempts';
exports.markInvoiceIntakeAiMaxAttemptsRef = markInvoiceIntakeAiMaxAttemptsRef;

exports.markInvoiceIntakeAiMaxAttempts = function markInvoiceIntakeAiMaxAttempts(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markInvoiceIntakeAiMaxAttemptsRef(dcInstance, inputVars));
}
;

const markInvoiceIntakeAutoPostingErrorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakeAutoPostingError', inputVars);
}
markInvoiceIntakeAutoPostingErrorRef.operationName = 'MarkInvoiceIntakeAutoPostingError';
exports.markInvoiceIntakeAutoPostingErrorRef = markInvoiceIntakeAutoPostingErrorRef;

exports.markInvoiceIntakeAutoPostingError = function markInvoiceIntakeAutoPostingError(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markInvoiceIntakeAutoPostingErrorRef(dcInstance, inputVars));
}
;

const updateInvoiceIntakeReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInvoiceIntakeReview', inputVars);
}
updateInvoiceIntakeReviewRef.operationName = 'UpdateInvoiceIntakeReview';
exports.updateInvoiceIntakeReviewRef = updateInvoiceIntakeReviewRef;

exports.updateInvoiceIntakeReview = function updateInvoiceIntakeReview(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateInvoiceIntakeReviewRef(dcInstance, inputVars));
}
;

const discardInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DiscardInvoiceIntake', inputVars);
}
discardInvoiceIntakeRef.operationName = 'DiscardInvoiceIntake';
exports.discardInvoiceIntakeRef = discardInvoiceIntakeRef;

exports.discardInvoiceIntake = function discardInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(discardInvoiceIntakeRef(dcInstance, inputVars));
}
;

const deletePostedInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePostedInvoice', inputVars);
}
deletePostedInvoiceRef.operationName = 'DeletePostedInvoice';
exports.deletePostedInvoiceRef = deletePostedInvoiceRef;

exports.deletePostedInvoice = function deletePostedInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePostedInvoiceRef(dcInstance, inputVars));
}
;

const markInvoiceIntakePostingErrorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakePostingError', inputVars);
}
markInvoiceIntakePostingErrorRef.operationName = 'MarkInvoiceIntakePostingError';
exports.markInvoiceIntakePostingErrorRef = markInvoiceIntakePostingErrorRef;

exports.markInvoiceIntakePostingError = function markInvoiceIntakePostingError(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markInvoiceIntakePostingErrorRef(dcInstance, inputVars));
}
;

const retryInvoiceIntakeAiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RetryInvoiceIntakeAi', inputVars);
}
retryInvoiceIntakeAiRef.operationName = 'RetryInvoiceIntakeAi';
exports.retryInvoiceIntakeAiRef = retryInvoiceIntakeAiRef;

exports.retryInvoiceIntakeAi = function retryInvoiceIntakeAi(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(retryInvoiceIntakeAiRef(dcInstance, inputVars));
}
;

const retryInvoiceIntakeAiTransientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RetryInvoiceIntakeAiTransient', inputVars);
}
retryInvoiceIntakeAiTransientRef.operationName = 'RetryInvoiceIntakeAiTransient';
exports.retryInvoiceIntakeAiTransientRef = retryInvoiceIntakeAiTransientRef;

exports.retryInvoiceIntakeAiTransient = function retryInvoiceIntakeAiTransient(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(retryInvoiceIntakeAiTransientRef(dcInstance, inputVars));
}
;

const retryInvoiceIntakeAiTransientV2Ref = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RetryInvoiceIntakeAiTransientV2', inputVars);
}
retryInvoiceIntakeAiTransientV2Ref.operationName = 'RetryInvoiceIntakeAiTransientV2';
exports.retryInvoiceIntakeAiTransientV2Ref = retryInvoiceIntakeAiTransientV2Ref;

exports.retryInvoiceIntakeAiTransientV2 = function retryInvoiceIntakeAiTransientV2(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(retryInvoiceIntakeAiTransientV2Ref(dcInstance, inputVars));
}
;

const materializeInvoiceIntakeV2Ref = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MaterializeInvoiceIntakeV2', inputVars);
}
materializeInvoiceIntakeV2Ref.operationName = 'MaterializeInvoiceIntakeV2';
exports.materializeInvoiceIntakeV2Ref = materializeInvoiceIntakeV2Ref;

exports.materializeInvoiceIntakeV2 = function materializeInvoiceIntakeV2(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(materializeInvoiceIntakeV2Ref(dcInstance, inputVars));
}
;

const correctPostedInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CorrectPostedInvoice', inputVars);
}
correctPostedInvoiceRef.operationName = 'CorrectPostedInvoice';
exports.correctPostedInvoiceRef = correctPostedInvoiceRef;

exports.correctPostedInvoice = function correctPostedInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(correctPostedInvoiceRef(dcInstance, inputVars));
}
;

const commitInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CommitInvoiceIntake', inputVars);
}
commitInvoiceIntakeRef.operationName = 'CommitInvoiceIntake';
exports.commitInvoiceIntakeRef = commitInvoiceIntakeRef;

exports.commitInvoiceIntake = function commitInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(commitInvoiceIntakeRef(dcInstance, inputVars));
}
;

const commitInvoiceIntakeWithoutProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CommitInvoiceIntakeWithoutProject', inputVars);
}
commitInvoiceIntakeWithoutProjectRef.operationName = 'CommitInvoiceIntakeWithoutProject';
exports.commitInvoiceIntakeWithoutProjectRef = commitInvoiceIntakeWithoutProjectRef;

exports.commitInvoiceIntakeWithoutProject = function commitInvoiceIntakeWithoutProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(commitInvoiceIntakeWithoutProjectRef(dcInstance, inputVars));
}
;

const autoCommitInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AutoCommitInvoiceIntake', inputVars);
}
autoCommitInvoiceIntakeRef.operationName = 'AutoCommitInvoiceIntake';
exports.autoCommitInvoiceIntakeRef = autoCommitInvoiceIntakeRef;

exports.autoCommitInvoiceIntake = function autoCommitInvoiceIntake(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(autoCommitInvoiceIntakeRef(dcInstance, inputVars));
}
;

const listUserProfilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserProfiles', inputVars);
}
listUserProfilesRef.operationName = 'ListUserProfiles';
exports.listUserProfilesRef = listUserProfilesRef;

exports.listUserProfiles = function listUserProfiles(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUserProfilesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCreditCardsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCards');
}
listCreditCardsRef.operationName = 'ListCreditCards';
exports.listCreditCardsRef = listCreditCardsRef;

exports.listCreditCards = function listCreditCards(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCreditCardsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCardStatementPeriodsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCardStatementPeriods');
}
listCardStatementPeriodsRef.operationName = 'ListCardStatementPeriods';
exports.listCardStatementPeriodsRef = listCardStatementPeriodsRef;

exports.listCardStatementPeriods = function listCardStatementPeriods(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCardStatementPeriodsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listExpenseAccountsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseAccounts');
}
listExpenseAccountsRef.operationName = 'ListExpenseAccounts';
exports.listExpenseAccountsRef = listExpenseAccountsRef;

exports.listExpenseAccounts = function listExpenseAccounts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listExpenseAccountsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCreditCardHolderHistoriesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardHolderHistories', inputVars);
}
listCreditCardHolderHistoriesRef.operationName = 'ListCreditCardHolderHistories';
exports.listCreditCardHolderHistoriesRef = listCreditCardHolderHistoriesRef;

exports.listCreditCardHolderHistories = function listCreditCardHolderHistories(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardHolderHistoriesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCreditCardStatementsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatements', inputVars);
}
listCreditCardStatementsRef.operationName = 'ListCreditCardStatements';
exports.listCreditCardStatementsRef = listCreditCardStatementsRef;

exports.listCreditCardStatements = function listCreditCardStatements(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardStatementsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCreditCardStatementsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatementsPage', inputVars);
}
listCreditCardStatementsPageRef.operationName = 'ListCreditCardStatementsPage';
exports.listCreditCardStatementsPageRef = listCreditCardStatementsPageRef;

exports.listCreditCardStatementsPage = function listCreditCardStatementsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardStatementsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCreditCardStatementLinesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatementLines', inputVars);
}
listCreditCardStatementLinesRef.operationName = 'ListCreditCardStatementLines';
exports.listCreditCardStatementLinesRef = listCreditCardStatementLinesRef;

exports.listCreditCardStatementLines = function listCreditCardStatementLines(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardStatementLinesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCreditCardStatementLinesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatementLinesPage', inputVars);
}
listCreditCardStatementLinesPageRef.operationName = 'ListCreditCardStatementLinesPage';
exports.listCreditCardStatementLinesPageRef = listCreditCardStatementLinesPageRef;

exports.listCreditCardStatementLinesPage = function listCreditCardStatementLinesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardStatementLinesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllCreditCardStatementLinesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCreditCardStatementLines', inputVars);
}
listAllCreditCardStatementLinesRef.operationName = 'ListAllCreditCardStatementLines';
exports.listAllCreditCardStatementLinesRef = listAllCreditCardStatementLinesRef;

exports.listAllCreditCardStatementLines = function listAllCreditCardStatementLines(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAllCreditCardStatementLinesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllCreditCardStatementLinesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCreditCardStatementLinesPage', inputVars);
}
listAllCreditCardStatementLinesPageRef.operationName = 'ListAllCreditCardStatementLinesPage';
exports.listAllCreditCardStatementLinesPageRef = listAllCreditCardStatementLinesPageRef;

exports.listAllCreditCardStatementLinesPage = function listAllCreditCardStatementLinesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAllCreditCardStatementLinesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listMerchantAliasesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMerchantAliases', inputVars);
}
listMerchantAliasesRef.operationName = 'ListMerchantAliases';
exports.listMerchantAliasesRef = listMerchantAliasesRef;

exports.listMerchantAliases = function listMerchantAliases(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMerchantAliasesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listMerchantAliasesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMerchantAliasesPage', inputVars);
}
listMerchantAliasesPageRef.operationName = 'ListMerchantAliasesPage';
exports.listMerchantAliasesPageRef = listMerchantAliasesPageRef;

exports.listMerchantAliasesPage = function listMerchantAliasesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMerchantAliasesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listReconciliationMatchesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReconciliationMatches', inputVars);
}
listReconciliationMatchesRef.operationName = 'ListReconciliationMatches';
exports.listReconciliationMatchesRef = listReconciliationMatchesRef;

exports.listReconciliationMatches = function listReconciliationMatches(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReconciliationMatchesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listReconciliationMatchesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReconciliationMatchesPage', inputVars);
}
listReconciliationMatchesPageRef.operationName = 'ListReconciliationMatchesPage';
exports.listReconciliationMatchesPageRef = listReconciliationMatchesPageRef;

exports.listReconciliationMatchesPage = function listReconciliationMatchesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReconciliationMatchesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjects');
}
listProjectsRef.operationName = 'ListProjects';
exports.listProjectsRef = listProjectsRef;

exports.listProjects = function listProjects(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listProjectsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listSkuReferencesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSkuReferences');
}
listSkuReferencesRef.operationName = 'ListSkuReferences';
exports.listSkuReferencesRef = listSkuReferencesRef;

exports.listSkuReferences = function listSkuReferences(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSkuReferencesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listExpenseTransactionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseTransactions', inputVars);
}
listExpenseTransactionsRef.operationName = 'ListExpenseTransactions';
exports.listExpenseTransactionsRef = listExpenseTransactionsRef;

exports.listExpenseTransactions = function listExpenseTransactions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listExpenseTransactionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listExpenseTransactionsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseTransactionsPage', inputVars);
}
listExpenseTransactionsPageRef.operationName = 'ListExpenseTransactionsPage';
exports.listExpenseTransactionsPageRef = listExpenseTransactionsPageRef;

exports.listExpenseTransactionsPage = function listExpenseTransactionsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listExpenseTransactionsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listInvoicesToReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesToReview', inputVars);
}
listInvoicesToReviewRef.operationName = 'ListInvoicesToReview';
exports.listInvoicesToReviewRef = listInvoicesToReviewRef;

exports.listInvoicesToReview = function listInvoicesToReview(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoicesToReviewRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listInvoicesToReviewPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesToReviewPage', inputVars);
}
listInvoicesToReviewPageRef.operationName = 'ListInvoicesToReviewPage';
exports.listInvoicesToReviewPageRef = listInvoicesToReviewPageRef;

exports.listInvoicesToReviewPage = function listInvoicesToReviewPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoicesToReviewPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listInvoiceIntakesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoiceIntakes', inputVars);
}
listInvoiceIntakesRef.operationName = 'ListInvoiceIntakes';
exports.listInvoiceIntakesRef = listInvoiceIntakesRef;

exports.listInvoiceIntakes = function listInvoiceIntakes(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoiceIntakesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listInvoiceIntakesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoiceIntakesPage', inputVars);
}
listInvoiceIntakesPageRef.operationName = 'ListInvoiceIntakesPage';
exports.listInvoiceIntakesPageRef = listInvoiceIntakesPageRef;

exports.listInvoiceIntakesPage = function listInvoiceIntakesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoiceIntakesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listInvoicesForReconciliationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesForReconciliation', inputVars);
}
listInvoicesForReconciliationRef.operationName = 'ListInvoicesForReconciliation';
exports.listInvoicesForReconciliationRef = listInvoicesForReconciliationRef;

exports.listInvoicesForReconciliation = function listInvoicesForReconciliation(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoicesForReconciliationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listInvoicesForReconciliationPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesForReconciliationPage', inputVars);
}
listInvoicesForReconciliationPageRef.operationName = 'ListInvoicesForReconciliationPage';
exports.listInvoicesForReconciliationPageRef = listInvoicesForReconciliationPageRef;

exports.listInvoicesForReconciliationPage = function listInvoicesForReconciliationPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listInvoicesForReconciliationPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTransactionCorrectionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTransactionCorrections', inputVars);
}
listTransactionCorrectionsRef.operationName = 'ListTransactionCorrections';
exports.listTransactionCorrectionsRef = listTransactionCorrectionsRef;

exports.listTransactionCorrections = function listTransactionCorrections(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTransactionCorrectionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listReportAdjustmentSetsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReportAdjustmentSets', inputVars);
}
listReportAdjustmentSetsRef.operationName = 'ListReportAdjustmentSets';
exports.listReportAdjustmentSetsRef = listReportAdjustmentSetsRef;

exports.listReportAdjustmentSets = function listReportAdjustmentSets(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReportAdjustmentSetsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAuditEventsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAuditEvents', inputVars);
}
listAuditEventsRef.operationName = 'ListAuditEvents';
exports.listAuditEventsRef = listAuditEventsRef;

exports.listAuditEvents = function listAuditEvents(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAuditEventsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listReconciliationOutsideControlsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReconciliationOutsideControls', inputVars);
}
listReconciliationOutsideControlsRef.operationName = 'ListReconciliationOutsideControls';
exports.listReconciliationOutsideControlsRef = listReconciliationOutsideControlsRef;

exports.listReconciliationOutsideControls = function listReconciliationOutsideControls(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReconciliationOutsideControlsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listReconciliationOutsideControlsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReconciliationOutsideControlsPage', inputVars);
}
listReconciliationOutsideControlsPageRef.operationName = 'ListReconciliationOutsideControlsPage';
exports.listReconciliationOutsideControlsPageRef = listReconciliationOutsideControlsPageRef;

exports.listReconciliationOutsideControlsPage = function listReconciliationOutsideControlsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listReconciliationOutsideControlsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCreditCardsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardsPage', inputVars);
}
listCreditCardsPageRef.operationName = 'ListCreditCardsPage';
exports.listCreditCardsPageRef = listCreditCardsPageRef;

exports.listCreditCardsPage = function listCreditCardsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCreditCardsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCardStatementPeriodsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCardStatementPeriodsPage', inputVars);
}
listCardStatementPeriodsPageRef.operationName = 'ListCardStatementPeriodsPage';
exports.listCardStatementPeriodsPageRef = listCardStatementPeriodsPageRef;

exports.listCardStatementPeriodsPage = function listCardStatementPeriodsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCardStatementPeriodsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listExpenseAccountsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseAccountsPage', inputVars);
}
listExpenseAccountsPageRef.operationName = 'ListExpenseAccountsPage';
exports.listExpenseAccountsPageRef = listExpenseAccountsPageRef;

exports.listExpenseAccountsPage = function listExpenseAccountsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listExpenseAccountsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listProjectsPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectsPage', inputVars);
}
listProjectsPageRef.operationName = 'ListProjectsPage';
exports.listProjectsPageRef = listProjectsPageRef;

exports.listProjectsPage = function listProjectsPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listProjectsPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listSkuReferencesPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSkuReferencesPage', inputVars);
}
listSkuReferencesPageRef.operationName = 'ListSkuReferencesPage';
exports.listSkuReferencesPageRef = listSkuReferencesPageRef;

exports.listSkuReferencesPage = function listSkuReferencesPage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listSkuReferencesPageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
