import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { assertSafeDemoProductionTarget, DEMO_DATA_PREFIX } from "../lib/environment.mjs";
import { businessFixture, demoExpenseAccounts, demoPeriods, demoProjects, demoTaxAccounts, demoUsers } from "./fixtures/demo-data.mjs";
import { readEnvFile } from "./lib/env-files.mjs";

const { values } = await readEnvFile(".env.local");
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
if (values.CONFIRM_DEMO_CLEANUP_EXECUTE !== "DELETE_DEMO_ONLY") {
  throw new Error("CONFIRM_DEMO_CLEANUP_EXECUTE doit valoir DELETE_DEMO_ONLY.");
}
if (!values.FIREBASE_ADMIN_CLIENT_EMAIL || !values.FIREBASE_ADMIN_PRIVATE_KEY) {
  throw new Error("Les identifiants Firebase Admin production sont requis pour le nettoyage DEMO.");
}

const fixture = businessFixture({ WORKER: "DEMO-UID-WORKER", KIM: "DEMO-UID-KIM", ADMIN: "DEMO-UID-ADMIN" });
const demoIds = [
  ...demoUsers.map((row) => row.id), ...demoProjects.map((row) => row.id), ...demoPeriods.map((row) => row.id),
  ...fixture.cards.map((row) => row.id), ...fixture.transactions.map((row) => row.id), ...fixture.invoices.map((row) => row.id),
  ...fixture.invoicePhotos.map((row) => row.id), ...fixture.invoiceIntakes.map((row) => row.receiptId),
  ...demoExpenseAccounts.map((row) => row.code), ...demoTaxAccounts.map((row) => row.code),
  ...fixture.skuReferences.map((row) => row.sku),
];
if (demoIds.some((id) => !String(id).startsWith(DEMO_DATA_PREFIX))) throw new Error("Fixture de nettoyage non DEMO; arrêt sans écriture.");

console.log("TARGET PROJECT: facture-thibeault");
console.log("ENVIRONMENT: PRODUCTION");
console.log("DATA MODE: DEMO VALIDATION ONLY");
console.log(`Cibles DEMO vérifiées : ${demoIds.length} identifiants SQL, ${demoUsers.length} comptes Auth, fichiers Storage marqués demo=true.`);

Object.assign(process.env, values);
const [{ cert, deleteApp, initializeApp }, { getAuth }, { getDataConnect }, { getStorage }] = await Promise.all([
  import("firebase-admin/app"), import("firebase-admin/auth"), import("firebase-admin/data-connect"), import("firebase-admin/storage"),
]);
const app = initializeApp({
  credential: cert({ projectId: values.FIREBASE_ADMIN_PROJECT_ID, clientEmail: values.FIREBASE_ADMIN_CLIENT_EMAIL, privateKey: values.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n") }),
  projectId: values.FIREBASE_ADMIN_PROJECT_ID,
}, `demo-cleanup-${Date.now()}`);

async function remove(dataConnect, operation, variables) {
  await dataConnect.executeMutation(operation, variables);
}

try {
  const dataConnect = getDataConnect({
    serviceId: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID || "facture-thibeault-service",
    location: values.NEXT_PUBLIC_SQL_CONNECT_LOCATION || "northamerica-northeast1",
    connector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID || "accounting",
  }, app);
  const queryNames = [
    "ListUserProfiles", "ListCreditCards", "ListCardStatementPeriods", "ListExpenseAccounts",
    "ListProjects", "ListSkuReferences", "ListExpenseTransactions", "ListInvoiceIntakes", "AdminListInvoices",
  ];
  const queryResults = await Promise.all(queryNames.map((name) => dataConnect.executeQuery(name)));
  const known = new Set(demoIds);
  const observedDemo = [];
  for (const result of queryResults) {
    for (const rows of Object.values(result.data ?? {})) {
      if (!Array.isArray(rows)) continue;
      for (const row of rows) {
        const identifier = row.id ?? row.receiptId ?? row.code ?? row.sku;
        if (String(identifier ?? "").startsWith(DEMO_DATA_PREFIX)) {
          observedDemo.push(identifier);
          if (!known.has(identifier)) throw new Error(`Ressource DEMO hors fixture explicite : ${identifier}`);
        }
      }
    }
  }
  console.log(`Ressources DEMO SQL observées avant suppression : ${observedDemo.length}.`);
  for (const row of fixture.invoicePhotos) await remove(dataConnect, "AdminDeleteInvoicePhoto", { id: row.id });
  for (const row of fixture.invoices) await remove(dataConnect, "AdminDeleteInvoice", { id: row.id });
  for (const row of fixture.transactions) await remove(dataConnect, "AdminDeleteExpenseTransaction", { id: row.id });
  for (const row of fixture.invoiceIntakes) await remove(dataConnect, "AdminDeleteInvoiceIntake", { receiptId: row.receiptId });
  for (const row of fixture.cards) await remove(dataConnect, "AdminDeleteCreditCard", { id: row.id });
  for (const row of fixture.skuReferences) await remove(dataConnect, "AdminDeleteSkuReference", { merchant: row.merchant, sku: row.sku });
  for (const row of demoProjects) await remove(dataConnect, "AdminDeleteProject", { id: row.id });
  for (const row of demoExpenseAccounts) await remove(dataConnect, "AdminDeleteExpenseAccount", { code: row.code });
  for (const row of demoTaxAccounts) await remove(dataConnect, "AdminDeleteTaxAccount", { code: row.code });
  for (const row of demoPeriods) await remove(dataConnect, "AdminDeleteCardStatementPeriod", { id: row.id });
  for (const row of demoUsers) await remove(dataConnect, "AdminDeleteUserProfile", { id: row.id });

  const auth = getAuth(app);
  for (const user of demoUsers) {
    let record;
    try { record = await auth.getUserByEmail(user.email); } catch (error) {
      if (error?.code === "auth/user-not-found") continue;
      throw error;
    }
    if (record.customClaims?.demo !== true) throw new Error(`Compte Auth non-DEMO refusé : ${user.email}`);
    await auth.deleteUser(record.uid);
  }

  const bucket = getStorage(app).bucket(values.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
  const [files] = await bucket.getFiles({ prefix: "receipts/" });
  for (const file of files) {
    const [metadata] = await file.getMetadata();
    const path = file.name;
    if (path.includes(DEMO_DATA_PREFIX) && metadata.metadata?.demo === "true") await file.delete();
  }
  console.log("Nettoyage DEMO production terminé; aucune ressource non-DEMO n'a été touchée.");
} finally {
  await deleteApp(app);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  // Module execution is intentionally side-effectful only after both confirmations above.
}
