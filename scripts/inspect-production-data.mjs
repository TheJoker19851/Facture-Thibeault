import { PRODUCTION_FIREBASE_PROJECT_ID, validateFirebaseEnvironment } from "../lib/environment.mjs";
import { isDemoIdentifier, isKnownE2EInvoiceIntake } from "../lib/demo-data-policy.mjs";
import { readEnvFile } from "./lib/env-files.mjs";

const QUERY_BY_TYPE = {
  UserProfile: "ListUserProfiles",
  CreditCard: "ListCreditCards",
  StatementPeriod: "ListCardStatementPeriods",
  ExpenseAccount: "ListExpenseAccounts",
  Project: "ListProjects",
  SkuReference: "ListSkuReferences",
  ExpenseTransaction: "ListExpenseTransactions",
  InvoiceIntake: "ListInvoiceIntakes",
  Invoice: "AdminListInvoices",
};

function rowsFromResult(result) {
  const rows = Object.values(result?.data ?? {}).find(Array.isArray);
  return rows ?? [];
}

function identifierFor(type, row) {
  if (type === "ExpenseAccount") return row.number;
  if (type === "SkuReference") return `${row.merchant ?? ""}::${row.sku ?? ""}`;
  if (type === "InvoiceIntake") return row.receiptId;
  if (type === "Invoice") return row.id;
  return row.id;
}

function demoClassification(type, row) {
  const identifier = identifierFor(type, row);
  if (type === "InvoiceIntake" && isKnownE2EInvoiceIntake(row)) return true;
  if (type === "SkuReference") return isDemoIdentifier(row.sku) || String(row.merchant ?? "").includes("Démo");
  return isDemoIdentifier(identifier);
}

function safeIntakeSummary(row) {
  const extractedFields = [
    "extractedVendor", "extractedInvoiceNumber", "extractedInvoiceDate", "extractedSubtotalCents",
    "extractedTpsCents", "extractedTvqCents", "extractedTotalCents", "extractedCurrency", "extractedSku",
    "extractedCategory", "extractedProjectId",
  ];
  return {
    receiptId: row.receiptId,
    status: row.status,
    processingStatus: row.processingStatus,
    accountingStatus: row.accountingStatus,
    photoCount: row.photoCount,
    storageFolder: row.storageFolder,
    classificationStatus: row.classificationStatus,
    classificationSource: row.classificationSource,
    hasLastError: Boolean(row.lastError),
    hasAiNotes: Boolean(row.aiNotes),
    extractedFieldsPresent: extractedFields.filter((field) => row[field] !== null && row[field] !== undefined && row[field] !== ""),
    updatedAt: row.updatedAt,
  };
}

const { values: fileValues } = await readEnvFile(".env.local");
const values = {
  ...fileValues,
  APP_ENV: fileValues.APP_ENV || "production",
  NEXT_PUBLIC_APP_ENV: fileValues.NEXT_PUBLIC_APP_ENV || "production",
  INVOICE_AI_MODE: fileValues.INVOICE_AI_MODE || "live",
};
const validation = validateFirebaseEnvironment({
  appEnvironment: values.APP_ENV,
  publicAppEnvironment: values.NEXT_PUBLIC_APP_ENV,
  projectId: values.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  adminProjectId: values.FIREBASE_ADMIN_PROJECT_ID,
  useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
  authEmulatorHost: values.FIREBASE_AUTH_EMULATOR_HOST,
  dataConnectEmulatorHost: values.DATA_CONNECT_EMULATOR_HOST,
  storageEmulatorHost: values.FIREBASE_STORAGE_EMULATOR_HOST,
  previewMode: values.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE,
  requireExplicit: true,
});
if (!validation.ok || values.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== PRODUCTION_FIREBASE_PROJECT_ID ||
  values.FIREBASE_ADMIN_PROJECT_ID !== PRODUCTION_FIREBASE_PROJECT_ID) {
  throw new Error(`Audit refusé : ${validation.issues.join(" ") || "cible Production exacte requise."}`);
}
if (!values.FIREBASE_ADMIN_CLIENT_EMAIL || !values.FIREBASE_ADMIN_PRIVATE_KEY) {
  throw new Error("Les identifiants Firebase Admin Production sont requis pour l'audit en lecture seule.");
}

delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
delete process.env.DATA_CONNECT_EMULATOR_HOST;
delete process.env.FIREBASE_STORAGE_EMULATOR_HOST;

const [{ cert, deleteApp, initializeApp }, { getDataConnect }] = await Promise.all([
  import("firebase-admin/app"),
  import("firebase-admin/data-connect"),
]);
const app = initializeApp({
  credential: cert({
    projectId: PRODUCTION_FIREBASE_PROJECT_ID,
    clientEmail: values.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: values.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
  projectId: PRODUCTION_FIREBASE_PROJECT_ID,
}, `production-data-readonly-${Date.now()}`);

try {
  const dataConnect = getDataConnect({
    serviceId: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID,
    location: values.NEXT_PUBLIC_SQL_CONNECT_LOCATION,
    connector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID,
  }, app);
  const results = await Promise.all(Object.entries(QUERY_BY_TYPE).map(async ([type, operation]) => {
    try {
      const result = await dataConnect.executeQuery(operation);
      return [type, { rows: rowsFromResult(result) }];
    } catch (error) {
      return [type, { error: error?.parsedData?.error?.message || error?.message || "erreur de lecture inconnue" }];
    }
  }));
  const report = {};
  for (const [type, result] of results) {
    if (result.error) {
      report[type] = { error: result.error };
      continue;
    }
    const rows = result.rows;
    const demoRows = rows.filter((row) => demoClassification(type, row));
    const nonDemoRows = rows.filter((row) => !demoClassification(type, row));
    report[type] = {
      total: rows.length,
      demo: demoRows.length,
      nonDemo: nonDemoRows.length,
      nonDemoIdentifiers: nonDemoRows.map((row) => identifierFor(type, row)).filter(Boolean),
    };
    if (type === "InvoiceIntake") report[type].nonDemoDetails = nonDemoRows.map(safeIntakeSummary);
  }
  console.log(JSON.stringify({
    target: PRODUCTION_FIREBASE_PROJECT_ID,
    mode: "READ_ONLY",
    generatedAt: new Date().toISOString(),
    resources: report,
  }, null, 2));
} finally {
  await deleteApp(app);
}
