import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { assertSafeDemoProductionTarget } from "../lib/environment.mjs";
import { businessFixture, demoExpenseAccounts, demoPeriods, demoProjects, demoTaxAccounts, demoUsers } from "./fixtures/demo-data.mjs";
import {
  buildDeletionPlan,
  buildFixtureIndex,
  buildPreflightReport,
  formatPreflightReport,
  postCleanupBlockingReasons,
  resourceRowsFromResults,
} from "./lib/demo-cleanup.mjs";
import { readEnvFile } from "./lib/env-files.mjs";

const DESTRUCTIVE_CONFIRMATION = "DELETE_DEMO_ONLY";
const QUERY_BY_TYPE = {
  UserProfile: "ListUserProfiles",
  CreditCard: "ListCreditCards",
  StatementPeriod: "ListCardStatementPeriods",
  ExpenseAccount: "ListExpenseAccounts",
  TaxAccount: "ListTaxAccounts",
  Project: "ListProjects",
  SkuReference: "ListSkuReferences",
  ExpenseTransaction: "ListExpenseTransactions",
  InvoiceIntake: "ListInvoiceIntakes",
  Invoice: "AdminListInvoices",
};

function requireAdminCredentials(values) {
  if (!values.FIREBASE_ADMIN_CLIENT_EMAIL || !values.FIREBASE_ADMIN_PRIVATE_KEY) {
    throw new Error("Les identifiants Firebase Admin production sont requis pour le preflight DEMO.");
  }
}

function assertTarget(values) {
  assertSafeDemoProductionTarget({
    projectId: values.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    adminProjectId: values.FIREBASE_ADMIN_PROJECT_ID,
    appEnvironment: values.APP_ENV,
    publicAppEnvironment: values.NEXT_PUBLIC_APP_ENV,
    useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
    authEmulatorHost: values.FIREBASE_AUTH_EMULATOR_HOST,
    dataConnectEmulatorHost: values.DATA_CONNECT_EMULATOR_HOST,
    storageEmulatorHost: values.FIREBASE_STORAGE_EMULATOR_HOST,
    previewMode: values.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE,
    confirmation: values.CONFIRM_DEMO_CLEANUP,
  });
}

function assertDestructiveConfirmations(values) {
  if (values.CONFIRM_DEMO_CLEANUP_EXECUTE !== DESTRUCTIVE_CONFIRMATION) {
    throw new Error(`CONFIRM_DEMO_CLEANUP_EXECUTE doit valoir ${DESTRUCTIVE_CONFIRMATION}.`);
  }
}

async function listAuthUsers(auth) {
  const users = [];
  let pageToken;
  do {
    const page = await auth.listUsers(1000, pageToken);
    users.push(...page.users);
    pageToken = page.pageToken;
  } while (pageToken);
  return users;
}

async function listStorageFiles(bucket) {
  const [files] = await bucket.getFiles({ prefix: "receipts/" });
  return Promise.all(files.map(async (file) => {
    const [metadata] = await file.getMetadata();
    return { name: file.name, metadata };
  }));
}

async function createProductionContext(values, app) {
  const [{ getAuth }, { getDataConnect }, { getStorage }] = await Promise.all([
    import("firebase-admin/auth"), import("firebase-admin/data-connect"), import("firebase-admin/storage"),
  ]);
  const dataConnect = getDataConnect({
    serviceId: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID || "facture-thibeault-service",
    location: values.NEXT_PUBLIC_SQL_CONNECT_LOCATION || "northamerica-northeast1",
    connector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID || "accounting",
  }, app);
  const queryResults = {};
  const queryErrors = [];
  await Promise.all(Object.entries(QUERY_BY_TYPE).map(async ([type, operation]) => {
    try {
      queryResults[type] = await dataConnect.executeQuery(operation);
    } catch (error) {
      queryErrors.push({ type, operation, message: error?.parsedData?.error?.message || error?.message || "erreur de lecture inconnue" });
      queryResults[type] = { data: {} };
    }
  }));
  let invoicePhotos = [];
  try {
    const invoicePhotosResult = await dataConnect.executeQuery("AdminListInvoicePhotos");
    invoicePhotos = Object.values(invoicePhotosResult.data ?? {}).find(Array.isArray) ?? [];
  } catch (error) {
    queryErrors.push({ type: "InvoicePhoto", operation: "AdminListInvoicePhotos", message: error?.parsedData?.error?.message || error?.message || "erreur de lecture inconnue" });
  }
  const auth = getAuth(app);
  const bucket = getStorage(app).bucket(values.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
  const [authRecords, storageFiles] = await Promise.all([listAuthUsers(auth), listStorageFiles(bucket)]);
  return {
    auth,
    bucket,
    dataConnect,
    rowsByType: resourceRowsFromResults(queryResults),
    invoicePhotos,
    authRecords,
    storageFiles,
    queryErrors,
  };
}

function createReport(context, fixture) {
  const fixtureIndex = buildFixtureIndex({ demoUsers, demoProjects, demoPeriods, demoExpenseAccounts, demoTaxAccounts, fixture });
  return buildPreflightReport({ ...context, fixtureIndex });
}

function printDeletionPlan(plan) {
  console.log("\nPLAN DE SUPPRESSION QUI SERA UTILISÉ APRÈS VALIDATION :");
  for (const [type, entries] of Object.entries(plan)) {
    console.log(`${type}: ${entries.length}`);
    for (const entry of entries) console.log(`  - ${entry.identifier}`);
  }
}

async function remove(dataConnect, operation, variables) {
  await dataConnect.executeMutation(operation, variables);
}

async function executeDeletion(context, plan) {
  const { auth, bucket, dataConnect } = context;
  for (const entry of plan.InvoicePhoto) await remove(dataConnect, "AdminDeleteInvoicePhoto", { id: entry.row.id });
  for (const entry of plan.Invoice) await remove(dataConnect, "AdminDeleteInvoice", { id: entry.row.id });
  for (const entry of plan.ExpenseTransaction) await remove(dataConnect, "AdminDeleteExpenseTransaction", { id: entry.row.id });
  for (const entry of plan.InvoiceIntake) await remove(dataConnect, "AdminDeleteInvoiceIntake", { receiptId: entry.row.receiptId });
  for (const entry of plan.CreditCard) await remove(dataConnect, "AdminDeleteCreditCard", { id: entry.row.id });
  for (const entry of plan.SkuReference) await remove(dataConnect, "AdminDeleteSkuReference", { merchant: entry.row.merchant, sku: entry.row.sku });
  for (const entry of plan.Project) await remove(dataConnect, "AdminDeleteProject", { id: entry.row.id });
  for (const entry of plan.ExpenseAccount) await remove(dataConnect, "AdminDeleteExpenseAccount", { code: entry.row.code });
  for (const entry of plan.TaxAccount) await remove(dataConnect, "AdminDeleteTaxAccount", { code: entry.row.code });
  for (const entry of plan.StatementPeriod) await remove(dataConnect, "AdminDeleteCardStatementPeriod", { id: entry.row.id });
  for (const entry of plan.UserProfile) await remove(dataConnect, "AdminDeleteUserProfile", { id: entry.row.id });
  for (const entry of plan.FirebaseAuth) await auth.deleteUser(entry.row.uid);
  for (const entry of plan.Storage) await bucket.file(entry.identifier).delete();
}

export async function runDemoCleanup({ preflightOnly = process.argv.includes("--preflight-only"), envValues = {} } = {}) {
  const { values: fileValues } = await readEnvFile(".env.local");
  const runtimeConfirmations = Object.fromEntries(
    ["CONFIRM_DEMO_CLEANUP", "CONFIRM_DEMO_CLEANUP_EXECUTE"]
      .filter((key) => process.env[key])
      .map((key) => [key, process.env[key]]),
  );
  const values = { ...fileValues, ...runtimeConfirmations, ...envValues };
  assertTarget(values);
  requireAdminCredentials(values);
  if (!preflightOnly) assertDestructiveConfirmations(values);

  const fixture = businessFixture({ WORKER: "DEMO-UID-WORKER", KIM: "DEMO-UID-KIM", ADMIN: "DEMO-UID-ADMIN" });
  const { cert, deleteApp, initializeApp } = await import("firebase-admin/app");
  Object.assign(process.env, values);
  const app = initializeApp({
    credential: cert({
      projectId: values.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: values.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: values.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    projectId: values.FIREBASE_ADMIN_PROJECT_ID,
  }, `demo-cleanup-${Date.now()}`);

  try {
    const context = await createProductionContext(values, app);
    const report = createReport(context, fixture);
    console.log("TARGET PROJECT: facture-thibeault");
    console.log("ENVIRONMENT: PRODUCTION");
    console.log(`DATA MODE: ${preflightOnly ? "DEMO PRE-FLIGHT READ ONLY" : "DEMO VALIDATION THEN DELETE"}`);
    console.log(`\n${formatPreflightReport(report)}`);
    const plan = buildDeletionPlan(report);
    printDeletionPlan(plan);
    if (preflightOnly) return { report, plan };

    await executeDeletion(context, plan);
    const remainingContext = await createProductionContext(values, app);
    const remainingReport = createReport(remainingContext, fixture);
    const postCleanupReasons = postCleanupBlockingReasons(remainingReport);
    if (postCleanupReasons.length) throw new Error(`VALIDATION POST-CLEANUP ÉCHOUÉE:\n- ${postCleanupReasons.join("\n- ")}`);
    console.log("Validation post-cleanup réussie; aucune ressource DEMO restante et le compte Auth non-DEMO est conservé.");
    return { report, plan, remainingReport };
  } finally {
    await deleteApp(app);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await runDemoCleanup();
}
