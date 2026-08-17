export const LOCAL_FIREBASE_PROJECT_ID = "demo-facture-thibeault";
export const PRODUCTION_FIREBASE_PROJECT_ID = "facture-thibeault";
export const APP_ENVIRONMENTS = ["local", "staging", "production"];

function booleanValue(value) {
  return String(value ?? "").trim().toLowerCase() === "true";
}

function normalizedEnvironment(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return APP_ENVIRONMENTS.includes(normalized) ? normalized : null;
}

/**
 * @param {{appEnvironment?: string | null, projectId?: string | null, useEmulators?: string | boolean | null}} options
 */
export function inferApplicationEnvironment({ appEnvironment, projectId, useEmulators }) {
  const explicit = normalizedEnvironment(appEnvironment);
  if (explicit) return explicit;
  if (booleanValue(useEmulators)) return "local";
  if (projectId === PRODUCTION_FIREBASE_PROJECT_ID) return "production";
  if (projectId) return "staging";
  return null;
}

/**
 * @param {{
 *   appEnvironment?: string | null,
 *   projectId?: string | null,
 *   adminProjectId?: string | null,
 *   useEmulators?: string | boolean | null,
 *   authEmulatorHost?: string | null,
 *   dataConnectEmulatorHost?: string | null,
 *   requireExplicit?: boolean
 * }} options
 */
export function validateFirebaseEnvironment({
  appEnvironment,
  projectId,
  adminProjectId = undefined,
  useEmulators,
  authEmulatorHost = undefined,
  dataConnectEmulatorHost = undefined,
  requireExplicit = false,
}) {
  const environment = inferApplicationEnvironment({ appEnvironment, projectId, useEmulators });
  const emulatorEnabled = booleanValue(useEmulators);
  const issues = [];

  if (requireExplicit && !normalizedEnvironment(appEnvironment)) {
    issues.push("APP_ENV/NEXT_PUBLIC_APP_ENV doit déclarer local, staging ou production.");
  }
  if (!environment) issues.push("L'environnement applicatif ne peut pas être déterminé.");
  if (!projectId) issues.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID est requis.");
  if (adminProjectId && projectId && adminProjectId !== projectId) {
    issues.push("FIREBASE_ADMIN_PROJECT_ID doit correspondre au projet Firebase public.");
  }

  if (environment === "local") {
    if (!emulatorEnabled) issues.push("L'environnement local exige NEXT_PUBLIC_FIREBASE_USE_EMULATORS=true.");
    if (projectId !== LOCAL_FIREBASE_PROJECT_ID) {
      issues.push(`L'environnement local exige le projet sans ressources ${LOCAL_FIREBASE_PROJECT_ID}.`);
    }
    if (authEmulatorHost && authEmulatorHost !== "127.0.0.1:9099") {
      issues.push("FIREBASE_AUTH_EMULATOR_HOST doit être 127.0.0.1:9099 en local.");
    }
    if (dataConnectEmulatorHost && dataConnectEmulatorHost !== "127.0.0.1:9399") {
      issues.push("DATA_CONNECT_EMULATOR_HOST doit être 127.0.0.1:9399 en local.");
    }
  }

  if (environment === "staging") {
    if (emulatorEnabled) issues.push("Le staging réel ne doit pas activer les émulateurs.");
    if (projectId === PRODUCTION_FIREBASE_PROJECT_ID) {
      issues.push("Le staging refuse explicitement le projet Firebase de production.");
    }
    if (projectId?.startsWith("demo-")) {
      issues.push("Le staging doit utiliser un vrai projet Firebase distinct, pas un projet demo-*.");
    }
    if (projectId?.includes("replace-with")) {
      issues.push("L'identifiant de projet staging est encore un gabarit.");
    }
  }

  if (environment === "production") {
    if (emulatorEnabled) issues.push("La production ne doit jamais activer les émulateurs.");
    if (projectId !== PRODUCTION_FIREBASE_PROJECT_ID) {
      issues.push(`La production exige exactement le projet ${PRODUCTION_FIREBASE_PROJECT_ID}.`);
    }
  }

  return { ok: issues.length === 0, environment, issues };
}

/**
 * @param {{target?: string | null, projectId?: string | null, useEmulators?: string | boolean | null, confirmation?: string | null}} options
 */
export function assertSafeSeedTarget({ target, projectId, useEmulators, confirmation }) {
  if (target === "production" || projectId === PRODUCTION_FIREBASE_PROJECT_ID) {
    throw new Error("Refus de sécurité : aucun seed ou reset n'est permis sur la production.");
  }

  if (target === "local") {
    const validation = validateFirebaseEnvironment({
      appEnvironment: "local",
      projectId,
      adminProjectId: projectId,
      useEmulators,
      authEmulatorHost: "127.0.0.1:9099",
      dataConnectEmulatorHost: "127.0.0.1:9399",
      requireExplicit: true,
    });
    if (!validation.ok) throw new Error(validation.issues.join(" "));
    return;
  }

  if (target === "staging") {
    const validation = validateFirebaseEnvironment({
      appEnvironment: "staging",
      projectId,
      adminProjectId: projectId,
      useEmulators,
      requireExplicit: true,
    });
    if (!validation.ok) throw new Error(validation.issues.join(" "));
    if (confirmation !== "SEED_FACTURE_THIBEAULT_STAGING_DEMO_ONLY") {
      throw new Error("CONFIRM_STAGING_SEED doit valoir SEED_FACTURE_THIBEAULT_STAGING_DEMO_ONLY.");
    }
    return;
  }

  throw new Error(`Cible de seed inconnue : ${target || "vide"}.`);
}
