import { createHash, randomUUID } from "node:crypto";

export const INVITATION_STATUS = Object.freeze({
  NOT_INVITED: "NOT_INVITED",
  INVITED: "INVITED",
  ACTIVE: "ACTIVE",
  INVITATION_FAILED: "INVITATION_FAILED",
});

export const USER_AUDIT_ACTION = Object.freeze({
  USER_CREATED: "USER_CREATED",
  ROLE_ASSIGNED: "ROLE_ASSIGNED",
  INVITATION_SENT: "INVITATION_SENT",
  INVITATION_RESENT: "INVITATION_RESENT",
  INVITATION_FAILED: "INVITATION_FAILED",
  PASSWORD_RESET_REQUESTED: "PASSWORD_RESET_REQUESTED",
  PASSWORD_RESET_FAILED: "PASSWORD_RESET_FAILED",
  USER_EMAIL_UPDATED: "USER_EMAIL_UPDATED",
  USER_ACTIVATED: "USER_ACTIVATED",
  USER_DELETED: "USER_DELETED",
  ACCOUNT_DEACTIVATED: "ACCOUNT_DEACTIVATED",
});

export class UserInvitationError extends Error {
  constructor(code, message, { status = 400, profile = null } = {}) {
    super(message);
    this.name = "UserInvitationError";
    this.code = code;
    this.status = status;
    this.profile = profile;
  }
}

export function normalizeEmail(value, { required = true } = {}) {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!email && !required) return null;
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new UserInvitationError("INVALID_EMAIL", "Une adresse email valide est requise.", { status: 400 });
  }
  return email;
}

export function profileIdForEmail(email) {
  const digest = createHash("sha256").update(normalizeEmail(email)).digest("hex").slice(0, 24).toUpperCase();
  return `USER-${digest}`;
}

export function isAdminRole(role) {
  return role === "ADMIN";
}

export function isAuthUserActive(user) {
  if (!user) return false;
  if (user.passwordHash) return true;
  return Array.isArray(user.providerData) && user.providerData.some((provider) => provider?.providerId && provider.providerId !== "password");
}

export function effectiveInvitationStatus(profile, authUser) {
  if (isAuthUserActive(authUser)) return INVITATION_STATUS.ACTIVE;
  return profile?.invitationStatus || INVITATION_STATUS.NOT_INVITED;
}

function errorCode(error) {
  return error && typeof error === "object" && "code" in error ? String(error.code) : "";
}

function isAuthNotFound(error) {
  return errorCode(error) === "auth/user-not-found";
}

function isAuthEmailTaken(error) {
  return errorCode(error) === "auth/email-already-exists";
}

function sameEmail(left, right) {
  return Boolean(left && right && normalizeEmail(left) === normalizeEmail(right));
}

function otherProfileWithEmail(profiles, email, profileId = "") {
  return profiles.find((profile) => profile.id !== profileId && sameEmail(profile.email, email)) ?? null;
}

function otherProfileWithAuthUid(profiles, uid, profileId = "") {
  return profiles.find((profile) => profile.id !== profileId && profile.firebaseUid === uid) ?? null;
}

function safeDeliveryError(error) {
  if (error && typeof error === "object" && "code" in error) {
    const code = String(error.code);
    if (code === "EMAIL_NOT_CONFIGURED") return "Firebase Authentication n’est pas configuré côté serveur.";
    if (code === "EMAIL_PROVIDER_REJECTED") return "Firebase Authentication a refusé l’envoi.";
    if (code === "EMAIL_TRANSPORT_FAILED") return "Firebase Authentication n’a pas pu être joint.";
    if (code === "EMAIL_TRANSPORT_UNAVAILABLE") return "Le transport Firebase n’est pas disponible côté serveur.";
  }
  return "L’envoi de l’email a échoué.";
}

function originBaseUrl(baseUrl) {
  const value = String(baseUrl ?? "").trim().replace(/\/$/, "");
  if (!/^https?:\/\/[^\s/]+(?:\/[^\s]*)?$/i.test(value)) {
    throw new UserInvitationError("INVALID_APP_URL", "L’adresse publique de l’application n’est pas configurée.", { status: 503 });
  }
  return value;
}

function passwordSetupContinueUrl(baseUrl) {
  return `${originBaseUrl(baseUrl)}/installer`;
}

async function getAuthUserByEmail(auth, email) {
  try {
    return await auth.getUserByEmail(email);
  } catch (error) {
    if (isAuthNotFound(error)) return null;
    throw error;
  }
}

async function getAuthUserByUid(auth, uid) {
  if (!uid) return null;
  try {
    return await auth.getUser(uid);
  } catch (error) {
    if (isAuthNotFound(error)) return null;
    throw error;
  }
}

async function ensureAuthAccount({ profile, profiles, auth }) {
  const email = normalizeEmail(profile.email);
  let user = await getAuthUserByUid(auth, profile.firebaseUid);
  if (user && !sameEmail(user.email, email)) {
    throw new UserInvitationError("AUTH_EMAIL_MISMATCH", "L’email du profil ne correspond pas au compte Firebase. Synchronisez l’email avant d’inviter.", { status: 409 });
  }
  if (!user) user = await getAuthUserByEmail(auth, email);
  if (user) {
    const linkedProfile = otherProfileWithAuthUid(profiles, user.uid, profile.id);
    if (linkedProfile) {
      throw new UserInvitationError("AUTH_ALREADY_LINKED", "Ce compte Firebase est déjà associé à un autre profil.", { status: 409 });
    }
    if (user.disabled) user = await auth.updateUser(user.uid, { disabled: false, displayName: profile.displayName });
  } else {
    try {
      user = await auth.createUser({ email, displayName: profile.displayName, disabled: false });
    } catch (error) {
      if (!isAuthEmailTaken(error)) throw error;
      user = await getAuthUserByEmail(auth, email);
      if (!user) throw error;
    }
  }
  const previousClaims = user.customClaims && typeof user.customClaims === "object" ? user.customClaims : {};
  const roleChanged = previousClaims.role !== profile.role;
  if (roleChanged) await auth.setCustomUserClaims(user.uid, { ...previousClaims, role: profile.role });
  return { user, roleChanged };
}

async function getExistingAuthAccount({ profile, profiles, auth }) {
  const email = normalizeEmail(profile.email);
  const user = await getAuthUserByUid(auth, profile.firebaseUid) ?? await getAuthUserByEmail(auth, email);
  if (!user) {
    throw new UserInvitationError("AUTH_ACCOUNT_MISSING", "Aucun compte Firebase ne correspond à ce profil. Envoyez d’abord une invitation.", { status: 409 });
  }
  if (!sameEmail(user.email, email)) {
    throw new UserInvitationError("AUTH_EMAIL_MISMATCH", "L’email du profil ne correspond pas au compte Firebase.", { status: 409 });
  }
  const linkedProfile = otherProfileWithAuthUid(profiles, user.uid, profile.id);
  if (linkedProfile) {
    throw new UserInvitationError("AUTH_ALREADY_LINKED", "Ce compte Firebase est déjà associé à un autre profil.", { status: 409 });
  }
  return user;
}

export async function sendInvitationForProfile({ profile, profiles, auth, persistProfile, recordAudit, sendEmail, baseUrl, actorUid, actorRole, now = () => new Date() }) {
  if (profile.status === "INACTIVE") {
    throw new UserInvitationError("PROFILE_INACTIVE", "Réactivez le profil avant d’envoyer une invitation.", { status: 409 });
  }
  const email = normalizeEmail(profile.email);
  const { user, roleChanged } = await ensureAuthAccount({ profile, profiles, auth });
  if (isAuthUserActive(user)) {
    const activated = {
      ...profile,
      firebaseUid: user.uid,
      invitationStatus: INVITATION_STATUS.ACTIVE,
      activatedAt: profile.activatedAt ?? now().toISOString(),
      lastInvitationError: null,
    };
    if (profile.invitationStatus !== INVITATION_STATUS.ACTIVE || !profile.activatedAt) {
      await persistProfile(activated, {
        action: USER_AUDIT_ACTION.USER_ACTIVATED,
        details: { source: "auth_state_check" },
      });
    }
    throw new UserInvitationError("ACCOUNT_ALREADY_ACTIVE", "Ce compte est déjà actif. Utilisez l’action de réinitialisation du mot de passe.", { status: 409, profile: activated });
  }

  if (roleChanged) {
    await recordAudit(profile, USER_AUDIT_ACTION.ROLE_ASSIGNED, { role: profile.role, source: "invitation" });
  }
  try {
    await sendEmail({ to: email, continueUrl: passwordSetupContinueUrl(baseUrl), kind: "invitation", idempotencyKey: `user-invitation-${profile.id}-${now().getTime()}` });
  } catch (error) {
    const failed = {
      ...profile,
      firebaseUid: user.uid,
      invitationStatus: INVITATION_STATUS.INVITATION_FAILED,
      invitationSentAt: profile.invitationSentAt ?? null,
      invitationSentBy: profile.invitationSentBy ?? null,
      lastInvitationError: safeDeliveryError(error),
    };
    await persistProfile(failed, {
      action: USER_AUDIT_ACTION.INVITATION_FAILED,
      details: { code: error?.code ?? "EMAIL_FAILED" },
    });
    throw new UserInvitationError("INVITATION_FAILED", failed.lastInvitationError, { status: 502, profile: failed });
  }
  const invited = {
    ...profile,
    firebaseUid: user.uid,
    email,
    invitationStatus: INVITATION_STATUS.INVITED,
    invitationSentAt: now().toISOString(),
    invitationSentBy: actorUid,
    lastInvitationError: null,
  };
  await persistProfile(invited, {
    action: profile.invitationStatus === INVITATION_STATUS.INVITED ? USER_AUDIT_ACTION.INVITATION_RESENT : USER_AUDIT_ACTION.INVITATION_SENT,
    details: { role: profile.role, actorRole },
  });
  return { profile: invited, user };
}

export async function createUserProfile({ input, profiles, persistProfile, sendInvitation = true, ...invitationOptions }) {
  const email = normalizeEmail(input.email, { required: sendInvitation });
  if (email && otherProfileWithEmail(profiles, email)) {
    throw new UserInvitationError("PROFILE_EMAIL_TAKEN", "Cette adresse email est déjà utilisée par un autre profil.", { status: 409 });
  }
  const profile = {
    id: email ? profileIdForEmail(email) : `USER-${randomUUID().replaceAll("-", "").slice(0, 24).toUpperCase()}`,
    firebaseUid: null,
    displayName: input.displayName.trim(),
    email,
    jobTitle: input.jobTitle?.trim() || null,
    role: input.role,
    status: "ACTIVE",
    invitationStatus: INVITATION_STATUS.NOT_INVITED,
    invitationSentAt: null,
    invitationSentBy: null,
    lastInvitationError: null,
    activatedAt: null,
  };
  await persistProfile(profile, {
    action: USER_AUDIT_ACTION.USER_CREATED,
    details: { role: profile.role, invitationRequested: sendInvitation },
  });
  if (!sendInvitation) return { profile };
  return sendInvitationForProfile({ profile, profiles: [...profiles, profile], persistProfile, ...invitationOptions });
}

export async function sendPasswordResetForProfile({ profile, profiles, auth, persistProfile, recordAudit, sendEmail, baseUrl, actorRole, now = () => new Date() }) {
  const email = normalizeEmail(profile.email);
  const user = await getExistingAuthAccount({ profile, profiles, auth });
  const activated = isAuthUserActive(user) && profile.invitationStatus !== INVITATION_STATUS.ACTIVE
    ? { ...profile, firebaseUid: user.uid, invitationStatus: INVITATION_STATUS.ACTIVE, activatedAt: profile.activatedAt ?? now().toISOString(), lastInvitationError: null }
    : { ...profile, firebaseUid: user.uid };
  if (activated.invitationStatus === INVITATION_STATUS.ACTIVE && profile.invitationStatus !== INVITATION_STATUS.ACTIVE) {
    await persistProfile(activated, { action: USER_AUDIT_ACTION.USER_ACTIVATED, details: { source: "password_reset_request" } });
  }
  try {
    await sendEmail({ to: email, continueUrl: passwordSetupContinueUrl(baseUrl), kind: "password-reset", idempotencyKey: `user-password-reset-${profile.id}-${now().getTime()}` });
  } catch (error) {
    await recordAudit(profile, USER_AUDIT_ACTION.PASSWORD_RESET_FAILED, { code: error?.code ?? "EMAIL_FAILED" });
    throw new UserInvitationError("PASSWORD_RESET_FAILED", safeDeliveryError(error), { status: 502, profile: activated });
  }
  await recordAudit(activated, USER_AUDIT_ACTION.PASSWORD_RESET_REQUESTED, { actorRole });
  return { profile: activated, user };
}

export async function updateUserEmail({ profile, profiles, auth, persistProfile, nextEmail: requestedEmail, actorUid, actorRole }) {
  const email = normalizeEmail(profile.email, { required: false });
  const nextEmail = normalizeEmail(requestedEmail);
  if (sameEmail(email, nextEmail)) return { profile };
  if (otherProfileWithEmail(profiles, nextEmail)) {
    throw new UserInvitationError("PROFILE_EMAIL_TAKEN", "Cette adresse email est déjà utilisée par un autre profil.", { status: 409 });
  }
  let authUser = await getAuthUserByUid(auth, profile.firebaseUid);
  const conflictingAuthUser = await getAuthUserByEmail(auth, nextEmail);
  if (conflictingAuthUser && (!authUser || conflictingAuthUser.uid !== authUser.uid)) {
    throw new UserInvitationError("AUTH_EMAIL_TAKEN", "Cette adresse email est déjà utilisée par un autre compte Firebase.", { status: 409 });
  }
  const previousEmail = authUser?.email ?? email;
  if (authUser) await auth.updateUser(authUser.uid, { email: nextEmail, emailVerified: false });
  const updated = { ...profile, email: nextEmail, firebaseUid: authUser?.uid ?? null };
  try {
    await persistProfile(updated, { action: USER_AUDIT_ACTION.USER_EMAIL_UPDATED, details: { previousEmail, email: nextEmail, actorUid, actorRole } });
  } catch (error) {
    if (authUser && previousEmail) await auth.updateUser(authUser.uid, { email: previousEmail }).catch(() => undefined);
    throw error;
  }
  return { profile: updated, user: authUser };
}
