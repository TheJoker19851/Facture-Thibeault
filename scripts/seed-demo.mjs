import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { assertSafeDemoProductionTarget, assertSafeSeedTarget } from "../lib/environment.mjs";
import { businessFixture, demoExpenseAccounts, demoPeriods, demoProjects, demoTaxAccounts, demoUsers, LOCAL_DEMO_PASSWORD } from "./fixtures/demo-data.mjs";
import { localEmulatorEnvironment, readEnvFile } from "./lib/env-files.mjs";

async function createOrUpdateDemoUsers(auth, password, { production = false } = {}) {
  const uids = {};
  for (const user of demoUsers) {
    let record;
    try {
      record = await auth.getUserByEmail(user.email);
      if (production && record.customClaims?.demo !== true) {
        throw new Error(`Le compte ${user.email} existe mais n'est pas explicitement DEMO; aucune modification production.`);
      }
      record = production ? record : await auth.updateUser(record.uid, {
        displayName: user.displayName, password, disabled: false, emailVerified: true,
      });
    } catch (error) {
      if (error?.code !== "auth/user-not-found") throw error;
      record = await auth.createUser({
        email: user.email,
        password,
        displayName: user.displayName,
        disabled: false,
        emailVerified: true,
      });
    }
    await auth.setCustomUserClaims(record.uid, { role: user.role, demo: true });
    uids[user.role] = record.uid;
  }
  return uids;
}

async function seedDataConnect(dataConnect, firebaseUids) {
  const profiles = demoUsers.map((user) => ({
    id: user.id,
    firebaseUid: firebaseUids[user.role],
    displayName: user.displayName,
    email: user.email,
    jobTitle: user.jobTitle,
    role: user.role,
    status: "ACTIVE",
  }));
  const fixture = businessFixture(firebaseUids);
  const batches = [
    ["UserProfile", profiles],
    ["Project", demoProjects],
    ["ExpenseAccount", demoExpenseAccounts],
    ["TaxAccount", demoTaxAccounts],
    ["CardStatementPeriod", demoPeriods],
    ["InvoiceIntake", fixture.invoiceIntakes],
  ];

  for (const [table, rows] of batches) await dataConnect.upsertMany(table, rows);
  for (const card of fixture.cards) {
    await dataConnect.executeMutation("AdminSeedCreditCard", {
      ...card,
      holderId: card.holder.id,
      holder: undefined,
    });
  }
  for (const reference of fixture.skuReferences) {
    await dataConnect.executeMutation("AdminSeedSkuReference", {
      ...reference,
      accountCode: reference.expenseAccount.code,
      expenseAccount: undefined,
    });
  }
  for (const transaction of fixture.transactions) {
    await dataConnect.executeMutation("AdminSeedExpenseTransaction", {
      ...transaction,
      cardId: transaction.card.id,
      statementPeriodId: transaction.statementPeriod.id,
      projectId: transaction.project.id,
      accountCode: transaction.expenseAccount.code,
      card: undefined,
      statementPeriod: undefined,
      project: undefined,
      expenseAccount: undefined,
    });
  }
  for (const invoice of fixture.invoices) {
    await dataConnect.executeMutation("AdminSeedInvoice", {
      ...invoice,
      transactionId: invoice.transaction.id,
      createdById: invoice.createdBy.id,
      transaction: undefined,
      createdBy: undefined,
    });
  }
  for (const photo of fixture.invoicePhotos) {
    await dataConnect.executeMutation("AdminSeedInvoicePhoto", {
      ...photo,
      invoiceId: photo.invoice.id,
      invoice: undefined,
    });
  }
}

function assertDemoFixture() {
  const fixture = businessFixture({ WORKER: "DEMO-UID-WORKER", KIM: "DEMO-UID-KIM", ADMIN: "DEMO-UID-ADMIN" });
  const keyedValues = [
    ...demoUsers.map((row) => row.id), ...demoProjects.map((row) => row.id), ...demoExpenseAccounts.map((row) => row.code),
    ...demoTaxAccounts.map((row) => row.code), ...demoPeriods.map((row) => row.id),
    ...fixture.cards.map((row) => row.id), ...fixture.skuReferences.map((row) => row.sku),
    ...fixture.transactions.map((row) => row.id), ...fixture.invoices.map((row) => row.id),
    ...fixture.invoicePhotos.map((row) => row.id), ...fixture.invoiceIntakes.map((row) => row.receiptId),
  ];
  if (keyedValues.some((value) => !String(value).startsWith("DEMO-"))) throw new Error("Fixture de seed non-DEMO détectée; arrêt sans écriture.");
}

async function withRetries(task, attempts = 20) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      await new Promise((resolve) => setTimeout(resolve, 750));
    }
  }
  throw lastError;
}

export async function seedDemo(target) {
  assertDemoFixture();
  let values;
  if (target === "local") {
    values = localEmulatorEnvironment(process.env);
  } else if (target === "demo-production") {
    values = (await readEnvFile(".env.local")).values;
  } else {
    throw new Error("Le seed accepte uniquement local ou demo-production.");
  }

  const projectId = values.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (target === "local") {
    assertSafeSeedTarget({ target, projectId, useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS });
  } else {
    assertSafeDemoProductionTarget({
      projectId, adminProjectId: values.FIREBASE_ADMIN_PROJECT_ID,
      appEnvironment: values.APP_ENV, publicAppEnvironment: values.NEXT_PUBLIC_APP_ENV,
      useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
      authEmulatorHost: values.FIREBASE_AUTH_EMULATOR_HOST,
      dataConnectEmulatorHost: values.DATA_CONNECT_EMULATOR_HOST,
      storageEmulatorHost: values.FIREBASE_STORAGE_EMULATOR_HOST,
      previewMode: values.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE,
      confirmation: values.CONFIRM_DEMO_PRODUCTION,
    });
    if (values.INVOICE_AI_MODE !== "live") throw new Error("Le seed DEMO production exige INVOICE_AI_MODE=live.");
    console.log("TARGET PROJECT: facture-thibeault");
    console.log("ENVIRONMENT: PRODUCTION");
    console.log("DATA MODE: DEMO VALIDATION ONLY");
  }

  const password = target === "local" ? LOCAL_DEMO_PASSWORD : values.DEMO_USER_PASSWORD;
  if (!password || password.length < 14) throw new Error("DEMO_USER_PASSWORD doit contenir au moins 14 caractères.");
  if (target === "demo-production" && (!values.FIREBASE_ADMIN_CLIENT_EMAIL || !values.FIREBASE_ADMIN_PRIVATE_KEY)) {
    throw new Error("Les identifiants Firebase Admin production sont requis pour le seed DEMO.");
  }

  if (target === "demo-production") {
    delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
    delete process.env.DATA_CONNECT_EMULATOR_HOST;
    delete process.env.FIREBASE_STORAGE_EMULATOR_HOST;
  }
  Object.assign(process.env, values);
  const [{ cert, deleteApp, initializeApp }, { getAuth }, { getDataConnect }] = await Promise.all([
    import("firebase-admin/app"),
    import("firebase-admin/auth"),
    import("firebase-admin/data-connect"),
  ]);
  const app = initializeApp(
    target === "local"
      ? { projectId }
      : { credential: cert({ projectId, clientEmail: values.FIREBASE_ADMIN_CLIENT_EMAIL, privateKey: values.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n") }), projectId },
    `demo-seed-${target}-${Date.now()}`,
  );

  try {
    const firebaseUids = await withRetries(() => createOrUpdateDemoUsers(getAuth(app), password, { production: target === "demo-production" }));
    const dataConnect = getDataConnect({
      serviceId: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID || "facture-thibeault-service",
      location: values.NEXT_PUBLIC_SQL_CONNECT_LOCATION || "northamerica-northeast1",
      connector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID || "accounting",
    }, app);
    await withRetries(() => seedDataConnect(dataConnect, firebaseUids));
    console.log(`Seed ${target} terminé : ${demoUsers.length} utilisateurs et données DEMO-* uniquement.`);
    if (target === "local") {
      console.log(`Comptes : ${demoUsers.map((user) => user.email).join(", ")}`);
      console.log(`Mot de passe local : ${LOCAL_DEMO_PASSWORD}`);
    }
    return { firebaseUids };
  } finally {
    await deleteApp(app);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await seedDemo(process.argv[2]);
}
