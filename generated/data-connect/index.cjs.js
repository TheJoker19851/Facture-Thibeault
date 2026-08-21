const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'accounting',
  service: 'facture-thibeault-service',
  location: 'northamerica-northeast1'
};
exports.connectorConfig = connectorConfig;

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

const adminListInvoicesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListInvoices');
}
adminListInvoicesRef.operationName = 'AdminListInvoices';
exports.adminListInvoicesRef = adminListInvoicesRef;

exports.adminListInvoices = function adminListInvoices(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(adminListInvoicesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminListInvoicePhotosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListInvoicePhotos');
}
adminListInvoicePhotosRef.operationName = 'AdminListInvoicePhotos';
exports.adminListInvoicePhotosRef = adminListInvoicePhotosRef;

exports.adminListInvoicePhotos = function adminListInvoicePhotos(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
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

const listUserProfilesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserProfiles');
}
listUserProfilesRef.operationName = 'ListUserProfiles';
exports.listUserProfilesRef = listUserProfilesRef;

exports.listUserProfiles = function listUserProfiles(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
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

const listCreditCardStatementsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCardStatements');
}
listCreditCardStatementsRef.operationName = 'ListCreditCardStatements';
exports.listCreditCardStatementsRef = listCreditCardStatementsRef;

exports.listCreditCardStatements = function listCreditCardStatements(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCreditCardStatementsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

const listExpenseTransactionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseTransactions');
}
listExpenseTransactionsRef.operationName = 'ListExpenseTransactions';
exports.listExpenseTransactionsRef = listExpenseTransactionsRef;

exports.listExpenseTransactions = function listExpenseTransactions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listExpenseTransactionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listInvoicesToReviewRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesToReview');
}
listInvoicesToReviewRef.operationName = 'ListInvoicesToReview';
exports.listInvoicesToReviewRef = listInvoicesToReviewRef;

exports.listInvoicesToReview = function listInvoicesToReview(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listInvoicesToReviewRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listInvoiceIntakesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoiceIntakes');
}
listInvoiceIntakesRef.operationName = 'ListInvoiceIntakes';
exports.listInvoiceIntakesRef = listInvoiceIntakesRef;

exports.listInvoiceIntakes = function listInvoiceIntakes(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listInvoiceIntakesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
