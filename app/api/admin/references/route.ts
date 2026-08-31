import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getFirebaseAdminAuth, getFirebaseAdminDataConnect, firebaseAdminConfigured } from "../../../../firebase/admin";
import { listAllUserProfiles } from "../../../../firebase/accounting-pagination.server";
import { auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import { isAdminRole } from "../../../../lib/user-invitations.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const deleteCardAndHolderSchema = z.object({
  cardId: z.string().trim().min(1).max(128),
  holderId: z.string().trim().min(1).max(128),
});

type AdminIdentity = { uid: string; role: "ADMIN" };

async function authenticateAdmin(request: Request): Promise<AdminIdentity | null> {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return isAdminRole(decoded.role) ? { uid: decoded.uid, role: "ADMIN" } : null;
  } catch {
    return null;
  }
}

function errorCode(error: unknown) {
  return error && typeof error === "object" && "code" in error ? String(error.code) : "";
}

export async function POST(request: Request) {
  const identity = await authenticateAdmin(request);
  if (!identity) return Response.json({ error: "Le rôle ADMIN est requis." }, { status: 403 });
  if (!firebaseAdminConfigured()) return Response.json({ error: "Firebase Admin et SQL Connect doivent être configurés côté serveur." }, { status: 503 });

  let input: z.infer<typeof deleteCardAndHolderSchema>;
  try {
    input = deleteCardAndHolderSchema.parse(await request.json());
  } catch {
    return Response.json({ error: "Les paramètres de suppression sont invalides." }, { status: 400 });
  }

  try {
    const [dataConnect, auth] = await Promise.all([getFirebaseAdminDataConnect(), getFirebaseAdminAuth()]);
    const profiles = await listAllUserProfiles(dataConnect);
    const holder = profiles.find((profile) => profile.id === input.holderId);
    if (!holder) return Response.json({ error: "Le titulaire demandé est introuvable." }, { status: 404 });
    if (holder.role === "ADMIN") return Response.json({ error: "Un profil ADMIN ne peut pas être supprimé depuis une carte. Supprimez seulement la carte." }, { status: 409 });
    if (holder.firebaseUid === identity.uid) return Response.json({ error: "Le profil de la session courante ne peut pas être supprimé." }, { status: 409 });

    await dataConnect.executeMutation("DeleteCreditCardAndHolder", {
      cardId: input.cardId,
      holderId: input.holderId,
      auditEventId: auditEventId(input.cardId, "CARD_AND_HOLDER_DELETED", randomUUID()),
      auditDetails: auditDetails({ source: "admin_card_directory", cardId: input.cardId, holderId: input.holderId, holderName: holder.displayName }),
    }, { impersonate: { authClaims: { sub: identity.uid, role: identity.role } } });

    let warning: string | null = null;
    if (holder.firebaseUid) {
      try {
        await auth.deleteUser(holder.firebaseUid);
      } catch (error) {
        if (errorCode(error) !== "auth/user-not-found") {
          await auth.updateUser(holder.firebaseUid, { disabled: true }).catch(() => undefined);
          warning = "La carte et le profil ont été supprimés; le compte d’accès Firebase a été désactivé, mais n’a pas pu être supprimé automatiquement.";
        }
      }
    }

    return Response.json({ ok: true, warning });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/historique|autre association|ne peut pas être supprim/i.test(message)) {
      return Response.json({ error: "Cette carte ou ce titulaire possède un historique ou une autre association et ne peut pas être supprimé. Désactivez la carte plutôt." }, { status: 409 });
    }
    console.error("[admin-references] card-holder deletion failed", { code: errorCode(error) });
    return Response.json({ error: "La carte et le titulaire n’ont pas pu être supprimés." }, { status: 500 });
  }
}
