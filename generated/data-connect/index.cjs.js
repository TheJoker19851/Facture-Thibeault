const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'accounting',
  service: 'facture-thibeault-service',
  location: 'northamerica-northeast1'
};
exports.connectorConfig = connectorConfig;

const upsertUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUserProfile', inputVars);
}
upsertUserProfileRef.operationName = 'UpsertUserProfile';
exports.upsertUserProfileRef = upsertUserProfileRef;

exports.upsertUserProfile = function upsertUserProfile(dcOrVars, vars) {
  return executeMutation(upsertUserProfileRef(dcOrVars, vars));
};

const upsertCreditCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCreditCard', inputVars);
}
upsertCreditCardRef.operationName = 'UpsertCreditCard';
exports.upsertCreditCardRef = upsertCreditCardRef;

exports.upsertCreditCard = function upsertCreditCard(dcOrVars, vars) {
  return executeMutation(upsertCreditCardRef(dcOrVars, vars));
};

const createInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvoiceIntake', inputVars);
}
createInvoiceIntakeRef.operationName = 'CreateInvoiceIntake';
exports.createInvoiceIntakeRef = createInvoiceIntakeRef;

exports.createInvoiceIntake = function createInvoiceIntake(dcOrVars, vars) {
  return executeMutation(createInvoiceIntakeRef(dcOrVars, vars));
};

const updateInvoiceIntakeAiResultRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInvoiceIntakeAiResult', inputVars);
}
updateInvoiceIntakeAiResultRef.operationName = 'UpdateInvoiceIntakeAiResult';
exports.updateInvoiceIntakeAiResultRef = updateInvoiceIntakeAiResultRef;

exports.updateInvoiceIntakeAiResult = function updateInvoiceIntakeAiResult(dcOrVars, vars) {
  return executeMutation(updateInvoiceIntakeAiResultRef(dcOrVars, vars));
};

const markInvoiceIntakeAiErrorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkInvoiceIntakeAiError', inputVars);
}
markInvoiceIntakeAiErrorRef.operationName = 'MarkInvoiceIntakeAiError';
exports.markInvoiceIntakeAiErrorRef = markInvoiceIntakeAiErrorRef;

exports.markInvoiceIntakeAiError = function markInvoiceIntakeAiError(dcOrVars, vars) {
  return executeMutation(markInvoiceIntakeAiErrorRef(dcOrVars, vars));
};

const updateInvoiceIntakeReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInvoiceIntakeReview', inputVars);
}
updateInvoiceIntakeReviewRef.operationName = 'UpdateInvoiceIntakeReview';
exports.updateInvoiceIntakeReviewRef = updateInvoiceIntakeReviewRef;

exports.updateInvoiceIntakeReview = function updateInvoiceIntakeReview(dcOrVars, vars) {
  return executeMutation(updateInvoiceIntakeReviewRef(dcOrVars, vars));
};

const commitInvoiceIntakeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CommitInvoiceIntake', inputVars);
}
commitInvoiceIntakeRef.operationName = 'CommitInvoiceIntake';
exports.commitInvoiceIntakeRef = commitInvoiceIntakeRef;

exports.commitInvoiceIntake = function commitInvoiceIntake(dcOrVars, vars) {
  return executeMutation(commitInvoiceIntakeRef(dcOrVars, vars));
};

const commitInvoiceIntakeWithoutProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CommitInvoiceIntakeWithoutProject', inputVars);
}
commitInvoiceIntakeWithoutProjectRef.operationName = 'CommitInvoiceIntakeWithoutProject';
exports.commitInvoiceIntakeWithoutProjectRef = commitInvoiceIntakeWithoutProjectRef;

exports.commitInvoiceIntakeWithoutProject = function commitInvoiceIntakeWithoutProject(dcOrVars, vars) {
  return executeMutation(commitInvoiceIntakeWithoutProjectRef(dcOrVars, vars));
};

const listUserProfilesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserProfiles');
}
listUserProfilesRef.operationName = 'ListUserProfiles';
exports.listUserProfilesRef = listUserProfilesRef;

exports.listUserProfiles = function listUserProfiles(dc) {
  return executeQuery(listUserProfilesRef(dc));
};

const listCreditCardsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCreditCards');
}
listCreditCardsRef.operationName = 'ListCreditCards';
exports.listCreditCardsRef = listCreditCardsRef;

exports.listCreditCards = function listCreditCards(dc) {
  return executeQuery(listCreditCardsRef(dc));
};

const listCardStatementPeriodsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCardStatementPeriods');
}
listCardStatementPeriodsRef.operationName = 'ListCardStatementPeriods';
exports.listCardStatementPeriodsRef = listCardStatementPeriodsRef;

exports.listCardStatementPeriods = function listCardStatementPeriods(dc) {
  return executeQuery(listCardStatementPeriodsRef(dc));
};

const listExpenseAccountsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseAccounts');
}
listExpenseAccountsRef.operationName = 'ListExpenseAccounts';
exports.listExpenseAccountsRef = listExpenseAccountsRef;

exports.listExpenseAccounts = function listExpenseAccounts(dc) {
  return executeQuery(listExpenseAccountsRef(dc));
};

const listProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjects');
}
listProjectsRef.operationName = 'ListProjects';
exports.listProjectsRef = listProjectsRef;

exports.listProjects = function listProjects(dc) {
  return executeQuery(listProjectsRef(dc));
};

const listSkuReferencesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSkuReferences');
}
listSkuReferencesRef.operationName = 'ListSkuReferences';
exports.listSkuReferencesRef = listSkuReferencesRef;

exports.listSkuReferences = function listSkuReferences(dc) {
  return executeQuery(listSkuReferencesRef(dc));
};

const listExpenseTransactionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExpenseTransactions');
}
listExpenseTransactionsRef.operationName = 'ListExpenseTransactions';
exports.listExpenseTransactionsRef = listExpenseTransactionsRef;

exports.listExpenseTransactions = function listExpenseTransactions(dc) {
  return executeQuery(listExpenseTransactionsRef(dc));
};

const listInvoicesToReviewRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoicesToReview');
}
listInvoicesToReviewRef.operationName = 'ListInvoicesToReview';
exports.listInvoicesToReviewRef = listInvoicesToReviewRef;

exports.listInvoicesToReview = function listInvoicesToReview(dc) {
  return executeQuery(listInvoicesToReviewRef(dc));
};

const listInvoiceIntakesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInvoiceIntakes');
}
listInvoiceIntakesRef.operationName = 'ListInvoiceIntakes';
exports.listInvoiceIntakesRef = listInvoiceIntakesRef;

exports.listInvoiceIntakes = function listInvoiceIntakes(dc) {
  return executeQuery(listInvoiceIntakesRef(dc));
};
