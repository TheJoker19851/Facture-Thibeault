import type { Auth } from "firebase-admin/auth";

let adminAuth: Auth | null = null;

export function firebaseAdminConfigured() {
  return Boolean(
    (process.env.FIREBASE_ADMIN_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  );
}

/**
 * Firebase Admin stays server-only. These credentials must never use a
 * NEXT_PUBLIC_ prefix and must only be configured in Vercel/Firebase secrets.
 */
export async function getFirebaseAdminAuth() {
  if (adminAuth) return adminAuth;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin n'est pas configuré côté serveur.");
  }

  const [{ cert, getApps, initializeApp }, { getAuth }] = await Promise.all([
    import("firebase-admin/app"),
    import("firebase-admin/auth"),
  ]);
  const app = getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
  adminAuth = getAuth(app);
  return adminAuth;
}
