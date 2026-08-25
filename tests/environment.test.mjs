import assert from "node:assert/strict";
import test from "node:test";
import {
  assertSafeDemoProductionSeedExecution, assertSafeDemoProductionTarget, assertSafeSeedTarget, inferApplicationEnvironment,
  LOCAL_FIREBASE_PROJECT_ID, PRODUCTION_FIREBASE_PROJECT_ID, PRODUCTION_CARD_ROSTER_CONFIRMATION, PRODUCTION_ACCOUNT_IMPORT_CONFIRMATION, validateFirebaseEnvironment,
  assertSafeProductionCardRoster, assertSafeProductionAccountImport,
} from "../lib/environment.mjs";
import { configurationFrom, localEmulatorEnvironment } from "../scripts/lib/env-files.mjs";

test("accepts only the demo project for LOCAL emulators", () => {
  const safe = validateFirebaseEnvironment({ appEnvironment: "local", publicAppEnvironment: "local", projectId: LOCAL_FIREBASE_PROJECT_ID, adminProjectId: LOCAL_FIREBASE_PROJECT_ID, useEmulators: "true", authEmulatorHost: "127.0.0.1:9099", dataConnectEmulatorHost: "127.0.0.1:9399", storageEmulatorHost: "127.0.0.1:9199", requireExplicit: true });
  assert.equal(safe.ok, true);
  const unsafe = validateFirebaseEnvironment({ appEnvironment: "local", projectId: PRODUCTION_FIREBASE_PROJECT_ID, useEmulators: "true", requireExplicit: true });
  assert.equal(unsafe.ok, false);
  const forcedLocal = localEmulatorEnvironment({ NEXT_PUBLIC_FIREBASE_PROJECT_ID: PRODUCTION_FIREBASE_PROJECT_ID, FIREBASE_ADMIN_PROJECT_ID: PRODUCTION_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_USE_EMULATORS: "false" });
  assert.equal(forcedLocal.NEXT_PUBLIC_FIREBASE_PROJECT_ID, LOCAL_FIREBASE_PROJECT_ID);
});

test("generic seed is LOCAL-only", () => {
  assert.doesNotThrow(() => assertSafeSeedTarget({ target: "local", projectId: LOCAL_FIREBASE_PROJECT_ID, useEmulators: "true" }));
  assert.throws(() => assertSafeSeedTarget({ target: "production", projectId: PRODUCTION_FIREBASE_PROJECT_ID, useEmulators: "false" }), /interdite|inconnue/i);
  assert.throws(() => assertSafeSeedTarget({ target: "unknown", projectId: "unexpected-project", useEmulators: "false" }), /interdite|inconnue/i);
});

test("production refuses emulators, hosts and Preview mode", () => {
  const unsafeFlag = validateFirebaseEnvironment({ appEnvironment: "production", publicAppEnvironment: "production", projectId: PRODUCTION_FIREBASE_PROJECT_ID, adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID, useEmulators: "true", requireExplicit: true });
  assert.equal(unsafeFlag.ok, false);
  const unsafeHost = validateFirebaseEnvironment({ appEnvironment: "production", publicAppEnvironment: "production", projectId: PRODUCTION_FIREBASE_PROJECT_ID, adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID, useEmulators: "false", authEmulatorHost: "127.0.0.1:9099", requireExplicit: true });
  assert.equal(unsafeHost.ok, false);
  const unsafePreview = validateFirebaseEnvironment({ appEnvironment: "production", publicAppEnvironment: "production", projectId: PRODUCTION_FIREBASE_PROJECT_ID, adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID, useEmulators: "false", previewMode: "true", requireExplicit: true });
  assert.equal(unsafePreview.ok, false);
});

test("server and browser environments must match and unknown projects are rejected", () => {
  const mismatch = validateFirebaseEnvironment({ appEnvironment: "local", publicAppEnvironment: "production", projectId: PRODUCTION_FIREBASE_PROJECT_ID, useEmulators: "false", requireExplicit: true });
  assert.equal(mismatch.ok, false);
  assert.equal(inferApplicationEnvironment({ projectId: "unexpected-project", useEmulators: "false" }), null);
});

test("dedicated DEMO production guard requires exact project and confirmation", () => {
  const args = { projectId: PRODUCTION_FIREBASE_PROJECT_ID, adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID, appEnvironment: "production", publicAppEnvironment: "production", useEmulators: "false", confirmation: PRODUCTION_FIREBASE_PROJECT_ID };
  assert.doesNotThrow(() => assertSafeDemoProductionTarget(args));
  assert.throws(() => assertSafeDemoProductionTarget({ ...args, projectId: "other-project" }), /refusée|exige/i);
  assert.throws(() => assertSafeDemoProductionTarget({ ...args, confirmation: "wrong" }), /confirmation/i);
  assert.throws(() => assertSafeDemoProductionTarget({ ...args, adminProjectId: undefined }), /Admin exact/i);
});

test("DEMO production seed requires a second explicit execution confirmation", () => {
  const args = { projectId: PRODUCTION_FIREBASE_PROJECT_ID, adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID, appEnvironment: "production", publicAppEnvironment: "production", useEmulators: "false", confirmation: PRODUCTION_FIREBASE_PROJECT_ID };
  assert.throws(() => assertSafeDemoProductionSeedExecution(args), /SEED_DEMO_ONLY/);
  assert.doesNotThrow(() => assertSafeDemoProductionSeedExecution({ ...args, executionConfirmation: "SEED_DEMO_ONLY" }));
});

test("real production card roster requires a dedicated confirmation", () => {
  const args = { projectId: PRODUCTION_FIREBASE_PROJECT_ID, adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID, appEnvironment: "production", publicAppEnvironment: "production", useEmulators: "false", confirmation: PRODUCTION_CARD_ROSTER_CONFIRMATION };
  assert.throws(() => assertSafeProductionCardRoster({ ...args, confirmation: "wrong" }), /registre de cartes|confirmation/i);
  assert.doesNotThrow(() => assertSafeProductionCardRoster(args));
});

test("real production account import requires a dedicated confirmation", () => {
  const args = { projectId: PRODUCTION_FIREBASE_PROJECT_ID, adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID, appEnvironment: "production", publicAppEnvironment: "production", useEmulators: "false", confirmation: PRODUCTION_ACCOUNT_IMPORT_CONFIRMATION };
  assert.throws(() => assertSafeProductionAccountImport({ ...args, confirmation: "wrong" }), /comptes réels|confirmation/i);
  assert.doesNotThrow(() => assertSafeProductionAccountImport(args));
});

test("production configuration requires live credentials", () => {
  const complete = {
    APP_ENV: "production", NEXT_PUBLIC_APP_ENV: "production", NEXT_PUBLIC_FIREBASE_API_KEY: "demo-api-key",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "facture-thibeault.firebaseapp.com", NEXT_PUBLIC_FIREBASE_PROJECT_ID: "facture-thibeault",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "facture-thibeault.firebasestorage.app", NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "000000000001",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:000000000001:web:demo", NEXT_PUBLIC_FIREBASE_USE_EMULATORS: "false",
    NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID: "facture-thibeault-service", NEXT_PUBLIC_SQL_CONNECT_LOCATION: "northamerica-northeast1", NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID: "accounting",
    FIREBASE_ADMIN_PROJECT_ID: "facture-thibeault", FIREBASE_ADMIN_CLIENT_EMAIL: "runtime@facture-thibeault.iam.gserviceaccount.com", FIREBASE_ADMIN_PRIVATE_KEY: "DEMO-PRIVATE-KEY-NOT-A-SECRET",
    GOOGLE_GENERATIVE_AI_API_KEY: "demo-gemini-key-not-a-secret", GEMINI_MODEL: "gemini-3.6-flash", INVOICE_AI_MODE: "live",
  };
  assert.equal(configurationFrom(complete, { requireExplicit: true }).ok, true);
  const incomplete = configurationFrom({ ...complete, GOOGLE_GENERATIVE_AI_API_KEY: "" }, { requireExplicit: true });
  assert.equal(incomplete.ok, false);
  assert.match(incomplete.issues.join(" "), /GOOGLE_GENERATIVE_AI_API_KEY/);
});
