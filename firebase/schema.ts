/**
 * Firestore collection contract.
 *
 * Firestore is schemaless, so this registry documents the collections that
 * replace the former backend tables. Security rules are the runtime boundary;
 * Cloud Functions will own writes that require cross-document invariants.
 */
export const firestoreCollections = [
  "users",
  "people",
  "cards",
  "personCardAssociations",
  "projects",
  "projectVersions",
  "accountCategories",
  "accountCategoryVersions",
  "vendors",
  "skuCatalog",
  "cardPeriods",
  "submissions",
  "documents",
  "images",
  "transactions",
  "transactionLines",
  "statementTransactions",
  "reconciliationMatches",
  "aiRuns",
  "auditLogs",
  "settings",
  "archiveJobs",
] as const;

export const firebaseDataRegion = "northamerica-northeast1";
