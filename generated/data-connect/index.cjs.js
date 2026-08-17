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
