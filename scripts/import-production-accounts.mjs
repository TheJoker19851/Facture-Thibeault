import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import {
  assertSafeProductionAccountImport,
  PRODUCTION_ACCOUNT_IMPORT_CONFIRMATION,
  PRODUCTION_FIREBASE_PROJECT_ID,
} from "../lib/environment.mjs";
import { PRODUCTION_ACCOUNT_DEFINITIONS } from "../lib/accounting-references.mjs";
import { readEnvFile } from "./lib/env-files.mjs";

function rowsFromResult(result) {
  return Array.isArray(result?.data?.expenseAccounts) ? result.data.expenseAccounts : [];
}

function expectedRows() {
  return PRODUCTION_ACCOUNT_DEFINITIONS.map((account) => ({
    id: `ACCOUNT-${account.number}`,
    ...account,
    status: "ACTIVE",
  }));
}

function assertExpectedDefinitions() {
  const rows = expectedRows();
  const numbers = rows.map((row) => row.number);
  if (new Set(numbers).size !== numbers.length) throw new Error("La liste des comptes réels contient un numéro dupliqué.");
  if (rows.filter((row) => row.number === "33557" && row.label === "Réparation Équipement").length !== 1) {
    throw new Error("Le compte 33557 doit être exactement « Réparation Équipement ».");
  }
  if (rows.some((row) => row.number.startsWith("DEMO-") || row.id.startsWith("DEMO-"))) {
    throw new Error("Une donnée DEMO est présente dans l'import Production; arrêt sans écriture.");
  }
  return rows;
}

function assertNoIdentifierConflicts(existingRows, desiredRows) {
  const desiredByNumber = new Map(desiredRows.map((row) => [row.number, row]));
  for (const existing of existingRows) {
    const desired = desiredByNumber.get(existing.number);
    if (!desired) throw new Error(`Le compte Production existant ${existing.number || existing.id} n'est pas dans la liste autorisée; import interrompu.`);
    if (existing.id && existing.id !== desired.id) {
      throw new Error(`Conflit d'identifiant interne pour le compte ${existing.number}: ${existing.id} != ${desired.id}.`);
    }
  }
}

const { values } = await readEnvFile(".env.local");
assertSafeProductionAccountImport({
  projectId: values.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  adminProjectId: values.FIREBASE_ADMIN_PROJECT_ID,
  appEnvironment: values.APP_ENV || "production",
  publicAppEnvironment: values.NEXT_PUBLIC_APP_ENV || "production",
  useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
  authEmulatorHost: values.FIREBASE_AUTH_EMULATOR_HOST,
  dataConnectEmulatorHost: values.DATA_CONNECT_EMULATOR_HOST,
  storageEmulatorHost: values.FIREBASE_STORAGE_EMULATOR_HOST,
  previewMode: values.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE,
  confirmation: process.env.CONFIRM_PRODUCTION_ACCOUNT_IMPORT || values.CONFIRM_PRODUCTION_ACCOUNT_IMPORT,
});
if (!values.FIREBASE_ADMIN_CLIENT_EMAIL || !values.FIREBASE_ADMIN_PRIVATE_KEY) {
  throw new Error("Les identifiants Firebase Admin Production sont requis pour l'import des comptes.");
}

const desiredRows = assertExpectedDefinitions();
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
}, `production-account-import-${Date.now()}`);

try {
  const dataConnect = getDataConnect({
    serviceId: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID,
    location: values.NEXT_PUBLIC_SQL_CONNECT_LOCATION,
    connector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID,
  }, app);
  const current = rowsFromResult(await dataConnect.executeQuery("ListExpenseAccounts"));
  assertNoIdentifierConflicts(current, desiredRows);
  console.log(`TARGET PROJECT: ${PRODUCTION_FIREBASE_PROJECT_ID}`);
  console.log("ENVIRONMENT: PRODUCTION");
  console.log(`DATA MODE: REAL ACCOUNT REFERENCE IMPORT (${desiredRows.length} comptes)`);
  console.log(`CONFIRMATION: ${PRODUCTION_ACCOUNT_IMPORT_CONFIRMATION}`);
  await dataConnect.upsertMany("ExpenseAccount", desiredRows);
  const verified = rowsFromResult(await dataConnect.executeQuery("ListExpenseAccounts"));
  const verifiedByNumber = new Map(verified.map((row) => [row.number, row]));
  for (const desired of desiredRows) {
    const actual = verifiedByNumber.get(desired.number);
    if (!actual || actual.id !== desired.id || actual.label !== desired.label || actual.type !== desired.type || actual.status !== desired.status) {
      throw new Error(`Vérification post-import échouée pour le compte ${desired.number}.`);
    }
  }
  if (verified.length !== desiredRows.length) throw new Error(`Vérification post-import échouée: ${verified.length} comptes au lieu de ${desiredRows.length}.`);
  console.log(`Import vérifié: ${verified.length} comptes, 0 projet créé, 0 transaction créée.`);
} finally {
  await deleteApp(app);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  // Le module est exécuté directement; le corps principal ci-dessus réalise l'import.
}
