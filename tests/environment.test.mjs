import assert from "node:assert/strict";
import test from "node:test";
import {
  assertSafeSeedTarget,
  LOCAL_FIREBASE_PROJECT_ID,
  PRODUCTION_FIREBASE_PROJECT_ID,
  validateFirebaseEnvironment,
} from "../lib/environment.mjs";
import { localEmulatorEnvironment } from "../scripts/lib/env-files.mjs";

test("accepts only the demo project for the local emulator", () => {
  const safe = validateFirebaseEnvironment({
    appEnvironment: "local",
    projectId: LOCAL_FIREBASE_PROJECT_ID,
    adminProjectId: LOCAL_FIREBASE_PROJECT_ID,
    useEmulators: "true",
    requireExplicit: true,
  });
  assert.equal(safe.ok, true);

  const unsafe = validateFirebaseEnvironment({
    appEnvironment: "local",
    projectId: PRODUCTION_FIREBASE_PROJECT_ID,
    adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID,
    useEmulators: "true",
    requireExplicit: true,
  });
  assert.equal(unsafe.ok, false);

  const forcedLocal = localEmulatorEnvironment({
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: PRODUCTION_FIREBASE_PROJECT_ID,
    FIREBASE_ADMIN_PROJECT_ID: PRODUCTION_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_USE_EMULATORS: "false",
  });
  assert.equal(forcedLocal.NEXT_PUBLIC_FIREBASE_PROJECT_ID, LOCAL_FIREBASE_PROJECT_ID);
  assert.equal(forcedLocal.FIREBASE_ADMIN_PROJECT_ID, LOCAL_FIREBASE_PROJECT_ID);
  assert.equal(forcedLocal.NEXT_PUBLIC_FIREBASE_USE_EMULATORS, "true");
});

test("refuses every production seed, even with a confirmation string", () => {
  assert.throws(() => assertSafeSeedTarget({
    target: "production",
    projectId: PRODUCTION_FIREBASE_PROJECT_ID,
    useEmulators: "false",
    confirmation: "anything",
  }), /aucun seed ou reset/i);
});

test("requires a distinct staging project and an exact seed confirmation", () => {
  assert.throws(() => assertSafeSeedTarget({
    target: "staging",
    projectId: PRODUCTION_FIREBASE_PROJECT_ID,
    useEmulators: "false",
    confirmation: "SEED_FACTURE_THIBEAULT_STAGING_DEMO_ONLY",
  }), /production/i);
  assert.throws(() => assertSafeSeedTarget({
    target: "staging",
    projectId: LOCAL_FIREBASE_PROJECT_ID,
    useEmulators: "false",
    confirmation: "SEED_FACTURE_THIBEAULT_STAGING_DEMO_ONLY",
  }), /demo-/i);
  assert.throws(() => assertSafeSeedTarget({
    target: "staging",
    projectId: "facture-thibeault-staging",
    useEmulators: "false",
    confirmation: "",
  }), /CONFIRM_STAGING_SEED/);
  assert.doesNotThrow(() => assertSafeSeedTarget({
    target: "staging",
    projectId: "facture-thibeault-staging",
    useEmulators: "false",
    confirmation: "SEED_FACTURE_THIBEAULT_STAGING_DEMO_ONLY",
  }));
});

test("production refuses emulator variables", () => {
  const unsafe = validateFirebaseEnvironment({
    appEnvironment: "production",
    projectId: PRODUCTION_FIREBASE_PROJECT_ID,
    adminProjectId: PRODUCTION_FIREBASE_PROJECT_ID,
    useEmulators: "true",
    requireExplicit: true,
  });
  assert.equal(unsafe.ok, false);
  assert.match(unsafe.issues.join(" "), /production.*émulateurs/i);
});
