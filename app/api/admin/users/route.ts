import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth } from "../../../../firebase/admin";

export const runtime = "nodejs";

const allowedRoles = new Set(["WORKER", "KIM", "ADMIN"]);
const createUserSchema = z.object({
  displayName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  password: z.string().min(12).max(128),
  jobTitle: z.string().trim().max(80).optional().default(""),
  role: z.string().refine((value) => allowedRoles.has(value), "Rôle invalide."),
});
const updateUserSchema = z.object({
  uid: z.string().min(1).max(128),
  disabled: z.boolean(),
});

async function isAuthorizedAdmin(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return false;

  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "ADMIN" || decoded.role === "SUPER_ADMIN";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!firebaseAdminConfigured()) {
    return Response.json({ error: "Firebase Admin doit être configuré côté serveur avant de créer un compte." }, { status: 503 });
  }
  if (!(await isAuthorizedAdmin(request))) {
    return Response.json({ error: "Accès administrateur requis." }, { status: 403 });
  }

  let input: z.infer<typeof createUserSchema>;
  try {
    input = createUserSchema.parse(await request.json());
  } catch {
    return Response.json({ error: "Nom, courriel, rôle et mot de passe temporaire valides sont requis." }, { status: 400 });
  }

  let uid = "";
  try {
    const auth = await getFirebaseAdminAuth();
    const user = await auth.createUser({
      email: input.email,
      password: input.password,
      displayName: input.displayName,
      disabled: false,
    });
    uid = user.uid;
    await auth.setCustomUserClaims(uid, { role: input.role });
    return Response.json({ ok: true, uid, role: input.role });
  } catch (error) {
    if (uid) {
      await (await getFirebaseAdminAuth()).deleteUser(uid).catch(() => undefined);
    }
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    if (code === "auth/email-already-exists") {
      return Response.json({ error: "Ce courriel possède déjà un compte Firebase." }, { status: 409 });
    }
    if (code === "auth/invalid-password") {
      return Response.json({ error: "Le mot de passe temporaire doit respecter les exigences Firebase." }, { status: 400 });
    }
    console.error("[admin-users] account creation failed", { code });
    return Response.json({ error: "Le compte Firebase n'a pas pu être créé." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!firebaseAdminConfigured()) {
    return Response.json({ error: "Firebase Admin doit être configuré côté serveur avant de modifier un compte." }, { status: 503 });
  }
  if (!(await isAuthorizedAdmin(request))) {
    return Response.json({ error: "Accès administrateur requis." }, { status: 403 });
  }

  let input: z.infer<typeof updateUserSchema>;
  try {
    input = updateUserSchema.parse(await request.json());
  } catch {
    return Response.json({ error: "Identifiant et statut utilisateur valides sont requis." }, { status: 400 });
  }

  try {
    await (await getFirebaseAdminAuth()).updateUser(input.uid, { disabled: input.disabled });
    return Response.json({ ok: true, uid: input.uid, disabled: input.disabled });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    console.error("[admin-users] account status update failed", { code });
    return Response.json({ error: "Le statut du compte Firebase n'a pas pu être modifié." }, { status: 500 });
  }
}
