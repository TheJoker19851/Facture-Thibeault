import { randomUUID } from "node:crypto";
import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import { listAllUserProfiles } from "../../../../firebase/accounting-pagination.server";
import { auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import { sendFirebasePasswordSetupEmail } from "../../../../lib/firebase-auth-email.mjs";
import {
  createUserProfile,
  effectiveInvitationStatus,
  isAdminRole,
  isAuthUserActive,
  normalizeEmail,
  sendInvitationForProfile,
  sendPasswordResetForProfile,
  updateUserEmail,
  UserInvitationError,
  USER_AUDIT_ACTION,
  INVITATION_STATUS,
} from "../../../../lib/user-invitations.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const roles = ["WORKER", "KIM", "ADMIN"] as const;
const createAction = z.object({
  action: z.literal("create"),
  displayName: z.string().trim().min(2).max(120),
  email: z.string().trim().max(254).optional().default(""),
  jobTitle: z.string().trim().max(80).optional().default(""),
  role: z.enum(roles),
  sendInvitation: z.boolean().default(true),
});
const profileAction = z.object({
  action: z.enum(["invite", "reset", "update-email", "status", "delete"]),
  profileId: z.string().trim().min(1).max(128),
  email: z.string().trim().max(254).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});
const actionSchema = z.discriminatedUnion("action", [createAction, profileAction]);

type UserProfileRow = {
  id: string;
  firebaseUid?: string | null;
  displayName: string;
  email?: string | null;
  jobTitle?: string | null;
  role: string;
  status: string;
  invitationStatus?: string | null;
  invitationSentAt?: string | null;
  invitationSentBy?: string | null;
  lastInvitationError?: string | null;
  activatedAt?: string | null;
};

type AuthUserRecord = {
  uid: string;
  email?: string;
  displayName?: string;
  disabled?: boolean;
  passwordHash?: string;
  providerData?: Array<{ providerId?: string }>;
  customClaims?: Record<string, unknown>;
};

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

async function readProfiles(dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>>) {
  return await listAllUserProfiles(dataConnect) as unknown as UserProfileRow[];
}

async function readAuthUsers(auth: Awaited<ReturnType<typeof getFirebaseAdminAuth>>) {
  const users: AuthUserRecord[] = [];
  let pageToken: string | undefined;
  do {
    const page = await auth.listUsers(1000, pageToken);
    users.push(...page.users as unknown as AuthUserRecord[]);
    pageToken = page.pageToken;
  } while (pageToken);
  return users;
}

function baseUrlForRequest(request: Request) {
  return process.env.APP_BASE_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim() || new URL(request.url).origin;
}

function asProfileRecord(profile: UserProfileRow) {
  return {
    id: profile.id,
    firebaseUid: profile.firebaseUid ?? null,
    displayName: profile.displayName,
    email: profile.email ?? null,
    jobTitle: profile.jobTitle ?? null,
    role: profile.role,
    status: profile.status,
    invitationStatus: profile.invitationStatus ?? INVITATION_STATUS.NOT_INVITED,
    invitationSentAt: profile.invitationSentAt ?? null,
    invitationSentBy: profile.invitationSentBy ?? null,
    lastInvitationError: profile.lastInvitationError ?? null,
    activatedAt: profile.activatedAt ?? null,
  };
}

function authState(user: AuthUserRecord | null) {
  if (!user) return "MISSING";
  return isAuthUserActive(user) ? "ACTIVE" : "INVITED";
}

function emailLookupKey(value: string | null | undefined) {
  if (!value) return "";
  try {
    return normalizeEmail(value, { required: false }) ?? "";
  } catch {
    return "";
  }
}

function publicUser(profile: UserProfileRow, user: AuthUserRecord | null) {
  const record = asProfileRecord(profile);
  return {
    ...record,
    authAccount: Boolean(user),
    authState: authState(user),
    invitationStatus: effectiveInvitationStatus(profile, user),
  };
}

async function persistProfile(
  dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>>,
  identity: AdminIdentity,
  profile: UserProfileRow,
  auditAction: string,
  details: Record<string, unknown>,
) {
  await dataConnect.executeMutation("AdminUpsertUserProfileWithAudit", {
    id: profile.id,
    firebaseUid: profile.firebaseUid ?? null,
    displayName: profile.displayName,
    email: profile.email ?? null,
    jobTitle: profile.jobTitle ?? null,
    role: profile.role,
    status: profile.status,
    invitationStatus: profile.invitationStatus ?? INVITATION_STATUS.NOT_INVITED,
    invitationSentAt: profile.invitationSentAt ?? null,
    invitationSentBy: profile.invitationSentBy ?? null,
    lastInvitationError: profile.lastInvitationError ?? null,
    activatedAt: profile.activatedAt ?? null,
    auditEventId: auditEventId(profile.id, auditAction, randomUUID()),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditAction,
    auditDetails: auditDetails(details),
  });
  return profile;
}

async function recordAudit(
  dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>>,
  identity: AdminIdentity,
  profile: UserProfileRow,
  auditAction: string,
  details: Record<string, unknown>,
) {
  await dataConnect.executeMutation("AdminRecordUserAudit", {
    auditEventId: auditEventId(profile.id, auditAction, randomUUID()),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditAction,
    entityId: profile.id,
    auditDetails: auditDetails(details),
  });
}

async function deleteAuthAccountForProfile(auth: Awaited<ReturnType<typeof getFirebaseAdminAuth>>, profile: UserProfileRow) {
  let authUser: AuthUserRecord | null = null;
  if (profile.firebaseUid) {
    try {
      authUser = await auth.getUser(profile.firebaseUid) as unknown as AuthUserRecord;
    } catch (error) {
      if (errorCode(error) !== "auth/user-not-found") throw error;
    }
  } else if (profile.email) {
    const email = normalizeEmail(profile.email, { required: false });
    if (!email) return;
    try {
      authUser = await auth.getUserByEmail(email) as unknown as AuthUserRecord;
    } catch (error) {
      if (errorCode(error) !== "auth/user-not-found") throw error;
    }
  }
  if (!authUser) return;
  try {
    await auth.deleteUser(authUser.uid);
  } catch (error) {
    if (errorCode(error) !== "auth/user-not-found") throw error;
  }
}

function errorCode(error: unknown) {
  return error && typeof error === "object" && "code" in error ? String(error.code) : "";
}

function errorResponse(error: unknown) {
  if (error instanceof UserInvitationError) {
    return Response.json({
      error: error.message,
      code: error.code,
      ...(error.profile ? { profile: error.profile } : {}),
    }, { status: error.status });
  }
  const code = errorCode(error);
  if (code === "auth/email-already-exists") {
    return Response.json({ error: "Cette adresse email est déjà utilisée par un compte Firebase.", code: "AUTH_EMAIL_TAKEN" }, { status: 409 });
  }
  console.error("[admin-invitations] operation failed", { code });
  return Response.json({ error: "L’opération d’accès utilisateur n’a pas pu être terminée." }, { status: 500 });
}

export async function GET(request: Request) {
  const identity = await authenticateAdmin(request);
  if (!identity) return Response.json({ error: "Le rôle ADMIN est requis." }, { status: 403 });
  if (!firebaseAdminConfigured()) return Response.json({ error: "Firebase Admin et SQL Connect doivent être configurés côté serveur." }, { status: 503 });

  try {
    const [dataConnect, auth] = await Promise.all([getFirebaseAdminDataConnect(), getFirebaseAdminAuth()]);
    const [profiles, authUsers] = await Promise.all([readProfiles(dataConnect), readAuthUsers(auth)]);
    const byUid = new Map(authUsers.map((user) => [user.uid, user]));
    const byEmail = new Map(authUsers.filter((user) => user.email).map((user) => [emailLookupKey(user.email), user]));
    const users = profiles.map((profile) => publicUser(profile, byUid.get(profile.firebaseUid ?? "") ?? byEmail.get(emailLookupKey(profile.email)) ?? null));
    return Response.json({ users }, { headers: { "cache-control": "no-store" } });
  } catch {
    return Response.json({ error: "La liste des accès utilisateur n’est pas disponible." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const identity = await authenticateAdmin(request);
  if (!identity) return Response.json({ error: "Le rôle ADMIN est requis." }, { status: 403 });
  if (!firebaseAdminConfigured()) return Response.json({ error: "Firebase Admin et SQL Connect doivent être configurés côté serveur." }, { status: 503 });

  let input: z.infer<typeof actionSchema>;
  try {
    input = actionSchema.parse(await request.json());
  } catch {
    return Response.json({ error: "Les paramètres de l’opération utilisateur sont invalides." }, { status: 400 });
  }

  try {
    const [dataConnect, auth] = await Promise.all([getFirebaseAdminDataConnect(), getFirebaseAdminAuth()]);
    const profiles = await readProfiles(dataConnect);
    const persist = (profile: UserProfileRow, audit: { action: string; details: Record<string, unknown> }) => persistProfile(dataConnect, identity, profile, audit.action, audit.details);
    const audit = (profile: UserProfileRow, action: string, details: Record<string, unknown>) => recordAudit(dataConnect, identity, profile, action, details);
    const common = {
      profiles,
      auth,
      persistProfile: persist,
      recordAudit: audit,
      sendEmail: sendFirebasePasswordSetupEmail,
      baseUrl: baseUrlForRequest(request),
      actorUid: identity.uid,
      actorRole: identity.role,
    };

    if (input.action === "create") {
      const result = await createUserProfile({
        input,
        ...common,
        sendInvitation: input.sendInvitation,
      });
      return Response.json({ ok: true, profile: result.profile, invitationSent: input.sendInvitation && result.profile.invitationStatus === INVITATION_STATUS.INVITED }, { status: 201 });
    }

    const profile = profiles.find((candidate) => candidate.id === input.profileId);
    if (!profile) throw new UserInvitationError("PROFILE_NOT_FOUND", "Le profil utilisateur demandé est introuvable.", { status: 404 });

    if (input.action === "invite") {
      const result = await sendInvitationForProfile({ profile, ...common });
      return Response.json({ ok: true, profile: result.profile, invitationSent: true });
    }
    if (input.action === "delete") {
      if (profile.firebaseUid === identity.uid) {
        throw new UserInvitationError("SELF_DELETE_FORBIDDEN", "Vous ne pouvez pas supprimer votre propre compte administrateur.", { status: 409 });
      }
      await dataConnect.executeMutation("AdminHardDeleteUserProfile", {
        id: profile.id,
        auditEventId: auditEventId(profile.id, USER_AUDIT_ACTION.USER_DELETED, randomUUID()),
        actorUid: identity.uid,
        actorRole: identity.role,
        auditDetails: auditDetails({ before: profile, source: "admin_user_directory" }),
      });
      await deleteAuthAccountForProfile(auth, profile);
      return Response.json({ ok: true, deletedProfileId: profile.id });
    }
    if (input.action === "reset") {
      const result = await sendPasswordResetForProfile({ profile, ...common });
      return Response.json({ ok: true, profile: result.profile, passwordResetSent: true });
    }

    if (input.action === "status") {
      if (!input.status) throw new UserInvitationError("INVALID_STATUS", "Le statut demandé est invalide.", { status: 400 });
      if (profile.firebaseUid) {
        await auth.updateUser(profile.firebaseUid, { disabled: input.status === "INACTIVE" });
      }
      const updated = { ...profile, status: input.status };
      await persist(updated, {
        action: input.status === "ACTIVE" ? USER_AUDIT_ACTION.USER_ACTIVATED : USER_AUDIT_ACTION.ACCOUNT_DEACTIVATED,
        details: { source: "admin_user_directory", status: input.status },
      });
      return Response.json({ ok: true, profile: updated });
    }

    const result = await updateUserEmail({ profile, profiles, auth, persistProfile: persist, nextEmail: input.email, actorUid: identity.uid, actorRole: identity.role });
    return Response.json({ ok: true, profile: result.profile });
  } catch (error) {
    return errorResponse(error);
  }
}
