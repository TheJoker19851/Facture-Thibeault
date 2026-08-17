import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { assertSafeSeedTarget } from "../lib/environment.mjs";
import { businessFixture, demoExpenseAccounts, demoPeriods, demoProjects, demoTaxAccounts, demoUsers, LOCAL_DEMO_PASSWORD } from "./fixtures/demo-data.mjs";
import { localEmulatorEnvironment, readEnvFile } from "./lib/env-files.mjs";

async function createOrUpdateDemoUsers(auth, password) {
  const uids = {};
  for (const user of demoUsers) {
    let record;
    try {
      record = await auth.getUserByEmail(user.email);
      record = await auth.updateUser(record.uid, {
        displayName: user.displayName,
        password,
        disabled: false,
        emailVerified: true,
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
  let values;
  if (target === "local") {
    values = localEmulatorEnvironment(process.env);
  } else if (target === "staging") {
    values = (await readEnvFile(".env.staging.local")).values;
  } else {
    throw new Error("Le seed accepte uniquement local ou staging.");
  }

  const projectId = values.FIREBASE_ADMIN_PROJECT_ID || values.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  assertSafeSeedTarget({
    target,
    projectId,
    useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
    confirmation: values.CONFIRM_STAGING_SEED,
  });

  const password = target === "local" ? LOCAL_DEMO_PASSWORD : values.DEMO_USER_PASSWORD;
  if (!password || password.length < 14) throw new Error("DEMO_USER_PASSWORD doit contenir au moins 14 caractères en staging.");
  if (target === "staging" && (!values.FIREBASE_ADMIN_CLIENT_EMAIL || !values.FIREBASE_ADMIN_PRIVATE_KEY)) {
    throw new Error("Les identifiants Firebase Admin du staging sont requis pour le seed.");
  }

  if (target === "staging") {
    delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
    delete process.env.DATA_CONNECT_EMULATOR_HOST;
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
    const firebaseUids = await withRetries(() => createOrUpdateDemoUsers(getAuth(app), password));
    const dataConnect = getDataConnect({
      serviceId: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID || "facture-thibeault-service",
      location: values.NEXT_PUBLIC_SQL_CONNECT_LOCATION || "northamerica-northeast1",
      connector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID || "accounting",
    }, app);
    await withRetries(() => seedDataConnect(dataConnect, firebaseUids));
    console.log(`Seed ${target} terminé : 4 utilisateurs et données DEMO-* uniquement.`);
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
