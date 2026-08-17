export const LOCAL_FIREBASE_PROJECT_ID = "demo-facture-thibeault";
export const PRODUCTION_FIREBASE_PROJECT_ID = "facture-thibeault";
export const APP_ENVIRONMENTS = ["local", "production"];
export const DEMO_DATA_PREFIX = "DEMO-";
export const DEMO_PRODUCTION_CONFIRMATION = "facture-thibeault";

function booleanValue(value) {
  return String(value ?? "").trim().toLowerCase() === "true";
}

function normalizedEnvironment(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return APP_ENVIRONMENTS.includes(normalized) ? normalized : null;
}

/** @param {{appEnvironment?: string | null, projectId?: string | null, useEmulators?: string | boolean | null}} options */
export function inferApplicationEnvironment({ appEnvironment, projectId, useEmulators }) {
  const explicit = normalizedEnvironment(appEnvironment);
  if (explicit) return explicit;
  if (booleanValue(useEmulators) || projectId === LOCAL_FIREBASE_PROJECT_ID) return "local";
  if (projectId === PRODUCTION_FIREBASE_PROJECT_ID) return "production";
  return null;
}

/** @param {{appEnvironment?: string|null, publicAppEnvironment?: string|null, projectId?: string|null, adminProjectId?: string|null, useEmulators?: string|boolean|null, authEmulatorHost?: string|null, dataConnectEmulatorHost?: string|null, storageEmulatorHost?: string|null, previewMode?: string|boolean|null, requireExplicit?: boolean}} options */
export function validateFirebaseEnvironment({
  appEnvironment,
  publicAppEnvironment = undefined,
  projectId,
  adminProjectId = undefined,
  useEmulators,
  authEmulatorHost = undefined,
  dataConnectEmulatorHost = undefined,
  storageEmulatorHost = undefined,
  previewMode = undefined,
  requireExplicit = false,
}) {
  const serverEnvironment = normalizedEnvironment(appEnvironment);
  const clientEnvironment = normalizedEnvironment(publicAppEnvironment);
  const declaredEnvironment = serverEnvironment ?? clientEnvironment;
  const environment = inferApplicationEnvironment({ appEnvironment: declaredEnvironment, projectId, useEmulators });
  const emulatorEnabled = booleanValue(useEmulators);
  const issues = [];

  if (appEnvironment && !serverEnvironment) issues.push("APP_ENV doit déclarer local ou production.");
  if (publicAppEnvironment && !clientEnvironment) issues.push("NEXT_PUBLIC_APP_ENV doit déclarer local ou production.");
  if (serverEnvironment && clientEnvironment && serverEnvironment !== clientEnvironment) {
    issues.push("APP_ENV et NEXT_PUBLIC_APP_ENV doivent déclarer le même environnement.");
  }
  if (requireExplicit && !declaredEnvironment) issues.push("APP_ENV/NEXT_PUBLIC_APP_ENV doit déclarer local ou production.");
  if (!environment) issues.push("L'environnement applicatif ne peut pas être déterminé.");
  if (!projectId) issues.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID est requis.");
  if (adminProjectId && projectId && adminProjectId !== projectId) {
    issues.push("FIREBASE_ADMIN_PROJECT_ID doit correspondre au projet Firebase public.");
  }

  if (environment === "local") {
    if (!emulatorEnabled) issues.push("L'environnement local exige NEXT_PUBLIC_FIREBASE_USE_EMULATORS=true.");
    if (projectId !== LOCAL_FIREBASE_PROJECT_ID) issues.push(`L'environnement local exige le projet ${LOCAL_FIREBASE_PROJECT_ID}.`);
    if (authEmulatorHost && authEmulatorHost !== "127.0.0.1:9099") issues.push("FIREBASE_AUTH_EMULATOR_HOST doit être 127.0.0.1:9099 en local.");
    if (dataConnectEmulatorHost && dataConnectEmulatorHost !== "127.0.0.1:9399") issues.push("DATA_CONNECT_EMULATOR_HOST doit être 127.0.0.1:9399 en local.");
    if (storageEmulatorHost && storageEmulatorHost !== "127.0.0.1:9199") issues.push("FIREBASE_STORAGE_EMULATOR_HOST doit être 127.0.0.1:9199 en local.");
  }

  if (environment === "production") {
    if (emulatorEnabled) issues.push("La production ne doit jamais activer les émulateurs.");
    if (authEmulatorHost || dataConnectEmulatorHost || storageEmulatorHost) issues.push("La production refuse toute variable d'hôte d'émulateur.");
    if (projectId !== PRODUCTION_FIREBASE_PROJECT_ID) issues.push(`La production exige exactement le projet ${PRODUCTION_FIREBASE_PROJECT_ID}.`);
    if (previewMode === true || String(previewMode).toLowerCase() === "true") {
      issues.push("Une Preview Vercel ne peut pas utiliser des credentials Firebase production en écriture.");
    }
  }

  return { ok: issues.length === 0, environment, issues };
}

export function assertSafeSeedTarget({ target, projectId, useEmulators }) {
  if (target !== "local") throw new Error(`Cible de seed inconnue ou interdite : ${target || "vide"}.`);
  const validation = validateFirebaseEnvironment({
    appEnvironment: "local",
    publicAppEnvironment: "local",
    projectId,
    adminProjectId: projectId,
    useEmulators,
    authEmulatorHost: "127.0.0.1:9099",
    dataConnectEmulatorHost: "127.0.0.1:9399",
    storageEmulatorHost: "127.0.0.1:9199",
    requireExplicit: true,
  });
  if (!validation.ok) throw new Error(validation.issues.join(" "));
}

export function assertSafeDemoProductionTarget({
  projectId,
  adminProjectId,
  appEnvironment,
  publicAppEnvironment,
  useEmulators,
  authEmulatorHost,
  dataConnectEmulatorHost,
  storageEmulatorHost,
  previewMode,
  confirmation,
}) {
  if (projectId !== PRODUCTION_FIREBASE_PROJECT_ID || adminProjectId !== PRODUCTION_FIREBASE_PROJECT_ID) {
    throw new Error(`La cible DEMO production exige le projet public et Admin exact ${PRODUCTION_FIREBASE_PROJECT_ID}.`);
  }
  const validation = validateFirebaseEnvironment({
    appEnvironment,
    publicAppEnvironment,
    projectId,
    adminProjectId,
    useEmulators,
    authEmulatorHost,
    dataConnectEmulatorHost,
    storageEmulatorHost,
    previewMode,
    requireExplicit: true,
  });
  if (!validation.ok || validation.environment !== "production") {
    throw new Error(`Cible DEMO production refusée : ${validation.issues.join(" ")}`);
  }
  if (confirmation !== DEMO_PRODUCTION_CONFIRMATION) {
    throw new Error(`La confirmation doit valoir ${DEMO_PRODUCTION_CONFIRMATION}.`);
  }
}
