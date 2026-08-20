import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'accounting',
  service: 'facture-thibeault-service',
  location: 'northamerica-northeast1'
};
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

export const adminListInvoicesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListInvoices');
}
adminListInvoicesRef.operationName = 'AdminListInvoices';

export function adminListInvoices(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(adminListInvoicesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const adminListInvoicePhotosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListInvoicePhotos');
}
adminListInvoicePhotosRef.operationName = 'AdminListInvoicePhotos';

export function adminListInvoicePhotos(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(adminListInvoicePhotosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

export const listUserProfilesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserProfiles');
}
listUserProfilesRef.operationName = 'ListUserProfiles';

export function listUserProfiles(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
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

export const listExpenseTransactionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseTransactions');
}
listExpenseTransactionsRef.operationName = 'ListExpenseTransactions';

export function listExpenseTransactions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listExpenseTransactionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listInvoicesToReviewRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesToReview');
}
listInvoicesToReviewRef.operationName = 'ListInvoicesToReview';

export function listInvoicesToReview(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listInvoicesToReviewRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listInvoiceIntakesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoiceIntakes');
}
listInvoiceIntakesRef.operationName = 'ListInvoiceIntakes';

export function listInvoiceIntakes(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listInvoiceIntakesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

