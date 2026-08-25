import { PRODUCTION_FIREBASE_PROJECT_ID, validateFirebaseEnvironment } from "../lib/environment.mjs";
import { readEnvFile } from "./lib/env-files.mjs";
import { executeAllQueryPages } from "./lib/data-connect-pages.mjs";

function duplicates(rows, keyOf) {
  const counts = new Map();
  for (const row of rows) {
    const key = keyOf(row);
    if (key == null) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1).map(([key, count]) => ({ key, count }));
}

const { values } = await readEnvFile(".env.local");
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

const [{ cert, deleteApp, initializeApp }, { getDataConnect }, { getStorage }] = await Promise.all([
  import("firebase-admin/app"),
  import("firebase-admin/data-connect"),
  import("firebase-admin/storage"),
]);
const app = initializeApp({
  credential: cert({
    projectId: PRODUCTION_FIREBASE_PROJECT_ID,
    clientEmail: values.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: values.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
  projectId: PRODUCTION_FIREBASE_PROJECT_ID,
}, `invoice-constraint-readonly-audit-${Date.now()}`);

try {
  const dataConnect = getDataConnect({
    serviceId: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID,
    location: values.NEXT_PUBLIC_SQL_CONNECT_LOCATION,
    connector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID,
  }, app);
  // Read-only allowlist. This script intentionally contains no executeMutation
  // call and performs no Storage or Auth write.
  const [invoices, photos, intakes, transactions, storageFilesResult] = await Promise.all([
    executeAllQueryPages(dataConnect, "AdminListInvoices", "invoices"),
    executeAllQueryPages(dataConnect, "AdminListInvoicePhotos", "invoicePhotos"),
    executeAllQueryPages(dataConnect, "ListInvoiceIntakes", "invoiceIntakes"),
    executeAllQueryPages(dataConnect, "ListExpenseTransactions", "expenseTransactions"),
    getStorage(app).bucket(values.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET).getFiles({ prefix: "receipts/" }),
  ]);
  const storageObjects = await Promise.all(storageFilesResult[0].map(async (file) => {
    const [metadata] = await file.getMetadata();
    return { name: file.name, contentType: metadata.contentType ?? "" };
  }));
  const duplicateStoragePaths = duplicates(photos, (photo) => photo.storagePath);
  const duplicateInvoiceSequences = duplicates(photos, (photo) => `${photo.invoice?.id ?? "<null>"}::${photo.sequence}`);
  const explicitInvoiceIntakes = invoices.filter((invoice) => invoice.intake?.receiptId);
  const duplicateExplicitIntakes = duplicates(explicitInvoiceIntakes, (invoice) => invoice.intake.receiptId);
  const inferredIntakeCollisions = intakes.flatMap((intake) => {
    const matches = invoices.filter((invoice) => invoice.id === `INV-${intake.receiptId}` ||
      (invoice.storageFolder && invoice.storageFolder === intake.storageFolder));
    return new Set(matches.map((invoice) => invoice.id)).size > 1
      ? [{ receiptId: intake.receiptId, invoiceIds: [...new Set(matches.map((invoice) => invoice.id))] }]
      : [];
  });
  const heicObjects = storageObjects.filter((object) => /\.heic$/i.test(object.name) || object.contentType === "image/heic");
  const unsupportedStorageObjects = storageObjects.filter((object) =>
    !/\.(jpg|png|webp)$/i.test(object.name) || !["image/jpeg", "image/png", "image/webp"].includes(object.contentType));
  const extensionMimeMismatches = storageObjects.filter((object) => !(
    (/\.jpg$/i.test(object.name) && object.contentType === "image/jpeg") ||
    (/\.png$/i.test(object.name) && object.contentType === "image/png") ||
    (/\.webp$/i.test(object.name) && object.contentType === "image/webp")
  ));
  const report = {
    target: PRODUCTION_FIREBASE_PROJECT_ID,
    mode: "READ_ONLY",
    counts: {
      invoiceIntakes: intakes.length,
      invoices: invoices.length,
      invoicePhotos: photos.length,
      expenseTransactions: transactions.length,
      explicitInvoiceIntakeLinks: explicitInvoiceIntakes.length,
      storageReceiptObjects: storageObjects.length,
    },
    duplicates: {
      invoiceIntake: duplicateExplicitIntakes,
      inferredInvoiceIntakeCollisions: inferredIntakeCollisions,
      invoicePhotoStoragePath: duplicateStoragePaths,
      invoicePhotoInvoiceSequence: duplicateInvoiceSequences,
    },
    storageFormats: {
      heicCount: heicObjects.length,
      unsupportedCount: unsupportedStorageObjects.length,
      extensionMimeMismatchCount: extensionMimeMismatches.length,
    },
    safeForUniqueConstraints: duplicateExplicitIntakes.length === 0 && inferredIntakeCollisions.length === 0 &&
      duplicateStoragePaths.length === 0 && duplicateInvoiceSequences.length === 0,
    safeForV1FormatRules: heicObjects.length === 0 && unsupportedStorageObjects.length === 0 && extensionMimeMismatches.length === 0,
  };
  console.log(JSON.stringify(report, null, 2));
} finally {
  await deleteApp(app);
}
