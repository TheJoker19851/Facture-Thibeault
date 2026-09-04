import { firebaseAdminConfigured, getFirebaseAdminAuth } from "../../../../firebase/admin";
import { GET as getUserDirectory, POST as manageUserDirectory } from "../invitations/route";
import { DELETE as deleteUserDirectory } from "../invitations/route";

export const runtime = "nodejs";

export const GET = getUserDirectory;
export const POST = manageUserDirectory;
export const DELETE = deleteUserDirectory;

async function isAuthorizedAdmin(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return false;

  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "ADMIN";
  } catch {
    return false;
  }
}

export async function PATCH(request: Request) {
  if (!(await isAuthorizedAdmin(request))) {
    return Response.json({ error: "Accès administrateur requis." }, { status: 403 });
  }
  if (!firebaseAdminConfigured()) {
    return Response.json({ error: "Firebase Admin doit être configuré côté serveur avant de modifier un compte." }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as { uid?: unknown; disabled?: unknown } | null;
  if (typeof body?.uid !== "string" || !body.uid || typeof body.disabled !== "boolean") {
    return Response.json({ error: "Identifiant et statut utilisateur valides sont requis." }, { status: 400 });
  }
  const input = { uid: body.uid, disabled: body.disabled };

  try {
    await (await getFirebaseAdminAuth()).updateUser(input.uid, { disabled: input.disabled });
    return Response.json({ ok: true, uid: input.uid, disabled: input.disabled });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    console.error("[admin-users] account status update failed", { code });
    return Response.json({ error: "Le statut du compte Firebase n'a pas pu être modifié." }, { status: 500 });
  }
}
