"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  type AppCheck,
} from "firebase/app-check";
import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";
import { connectStorageEmulator, getStorage, type FirebaseStorage } from "firebase/storage";

export const FIREBASE_REGION = "northamerica-northeast1";
export const FIREBASE_REGION_LABEL = "Montréal, Canada";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

export const firebaseConfig = config;
export const firebaseConfigured = Boolean(
  config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.storageBucket &&
    config.appId,
);

function createFirebaseApp(): FirebaseApp | null {
  if (!firebaseConfigured) return null;
  return getApps().length > 0 ? getApp() : initializeApp(config);
}

export const firebaseApp = createFirebaseApp();
function createAppCheck(app: FirebaseApp): AppCheck | null {
  const siteKey = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_RECAPTCHA_ENTERPRISE_KEY;
  if (typeof window === "undefined" || !siteKey) return null;
  try {
    return initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch {
    // Keep local development usable when App Check is not yet registered.
    return null;
  }
}

export const firebaseAppCheck = firebaseApp ? createAppCheck(firebaseApp) : null;
export const firebaseAuth: Auth | null =
  firebaseApp && typeof window !== "undefined" ? getAuth(firebaseApp) : null;
export const firebaseStorage: FirebaseStorage | null = firebaseApp
  ? getStorage(firebaseApp)
  : null;

/**
 * Local development is opt-in. Keeping this disabled by default prevents a
 * local browser session from accidentally writing to a shared Firebase
 * project. The emulator connection calls are safe to repeat during HMR.
 */
if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true") {
  if (firebaseAuth) {
    try {
      connectAuthEmulator(firebaseAuth, "http://127.0.0.1:9099", {
        disableWarnings: true,
      });
    } catch {
      // The emulator may already be attached during hot module replacement.
    }
  }

  if (firebaseStorage) {
    try {
      connectStorageEmulator(firebaseStorage, "127.0.0.1", 9199);
    } catch {
      // The emulator may already be attached during hot module replacement.
    }
  }
}

/**
 * App Check is deliberately opt-in. Register the web app in Firebase App
 * Check first, then add NEXT_PUBLIC_FIREBASE_APPCHECK_RECAPTCHA_ENTERPRISE_KEY
 * to the environment before enabling enforcement in the Firebase console.
 */
export const appCheckConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_RECAPTCHA_ENTERPRISE_KEY,
);
