import {
  LOCAL_FIREBASE_PROJECT_ID,
  PRODUCTION_FIREBASE_PROJECT_ID,
  validateFirebaseEnvironment,
} from "./environment.mjs";

/**
 * The reconciliation API is allowed only against the isolated local emulator
 * or the exact production project. Preview deployments and mixed emulator /
 * production configurations fail closed before Firebase Admin is initialized.
 */
export function reconciliationServerAvailable(environment = process.env) {
  const validation = validateFirebaseEnvironment({
    appEnvironment: environment.APP_ENV,
    publicAppEnvironment: environment.NEXT_PUBLIC_APP_ENV,
    projectId: environment.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    adminProjectId: environment.FIREBASE_ADMIN_PROJECT_ID,
    useEmulators: environment.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
    authEmulatorHost: environment.FIREBASE_AUTH_EMULATOR_HOST,
    dataConnectEmulatorHost: environment.DATA_CONNECT_EMULATOR_HOST,
    storageEmulatorHost: environment.FIREBASE_STORAGE_EMULATOR_HOST,
    previewMode: environment.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE,
    requireExplicit: true,
  });
  if (!validation.ok) return false;
  if (validation.environment === "local") {
    return environment.NEXT_PUBLIC_FIREBASE_PROJECT_ID === LOCAL_FIREBASE_PROJECT_ID;
  }
  return validation.environment === "production" &&
    environment.NEXT_PUBLIC_FIREBASE_PROJECT_ID === PRODUCTION_FIREBASE_PROJECT_ID &&
    environment.FIREBASE_ADMIN_PROJECT_ID === PRODUCTION_FIREBASE_PROJECT_ID;
}

