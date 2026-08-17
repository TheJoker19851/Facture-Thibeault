import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { DataConnect } from "firebase-admin/data-connect";
import { validateFirebaseEnvironment } from "../lib/environment.mjs";

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDataConnect: DataConnect | null = null;

function serverEnvironmentValidation() {
  return validateFirebaseEnvironment({
    appEnvironment: process.env.APP_ENV,
    publicAppEnvironment: process.env.NEXT_PUBLIC_APP_ENV,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    adminProjectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    useEmulators: process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
    authEmulatorHost: process.env.FIREBASE_AUTH_EMULATOR_HOST,
    dataConnectEmulatorHost: process.env.DATA_CONNECT_EMULATOR_HOST,
    storageEmulatorHost: process.env.FIREBASE_STORAGE_EMULATOR_HOST,
    previewMode: process.env.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE,
  });
}

export function firebaseAdminConfigured() {
  const validation = serverEnvironmentValidation();
  if (!validation.ok) return false;
  if (validation.environment === "local") {
    return process.env.FIREBASE_AUTH_EMULATOR_HOST === "127.0.0.1:9099" &&
      process.env.DATA_CONNECT_EMULATOR_HOST === "127.0.0.1:9399";
  }
  return Boolean(process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY);
}

/**
 * Firebase Admin stays server-only. These credentials must never use a
 * NEXT_PUBLIC_ prefix and must only be configured in Vercel/Firebase secrets.
 */
async function getFirebaseAdminApp() {
  if (adminApp) return adminApp;
  const validation = serverEnvironmentValidation();
  if (!validation.ok) throw new Error(`Configuration Firebase refusée : ${validation.issues.join(" ")}`);
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId) {
    throw new Error("Firebase Admin n'est pas configuré côté serveur.");
  }

  const { cert, getApps, initializeApp } = await import("firebase-admin/app");
  const appName = `facture-thibeault-${validation.environment}`;
  const existing = getApps().find((app) => app.name === appName);
  if (existing) {
    adminApp = existing;
    return adminApp;
  }

  if (validation.environment === "local") {
    adminApp = initializeApp({ projectId }, appName);
    return adminApp;
  }
  if (!clientEmail || !privateKey) throw new Error("Les identifiants Firebase Admin serveur sont absents.");
  adminApp = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId }, appName);
  return adminApp;
}

export async function getFirebaseAdminAuth() {
  if (adminAuth) return adminAuth;
  const { getAuth } = await import("firebase-admin/auth");
  adminAuth = getAuth(await getFirebaseAdminApp());
  return adminAuth;
}

export async function getFirebaseAdminDataConnect() {
  if (adminDataConnect) return adminDataConnect;
  const { getDataConnect } = await import("firebase-admin/data-connect");
  adminDataConnect = getDataConnect({
    serviceId: process.env.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID ?? "facture-thibeault-service",
    location: process.env.NEXT_PUBLIC_SQL_CONNECT_LOCATION ?? "northamerica-northeast1",
    connector: process.env.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID ?? "accounting",
  }, await getFirebaseAdminApp());
  return adminDataConnect;
}
