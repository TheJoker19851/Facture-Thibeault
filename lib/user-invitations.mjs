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
  PASSWORD_UPDATED: "PASSWORD_UPDATED",
  USER_ACTIVATED: "USER_ACTIVATED",
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

export function normalizePassword(value, { required = true } = {}) {
  const password = typeof value === "string" ? value : "";
  if (!password && !required) return null;
  if (password.length < 12 || password.length > 128) {
    throw new UserInvitationError("INVALID_PASSWORD", "Le mot de passe doit contenir entre 12 et 128 caractères.", { status: 400 });
  }
  return password;
}

export function profileIdForEmail(email) {
  const digest = createHash("sha256").update(normalizeEmail(email)).digest("hex").slice(0, 24).toUpperCase();
  return `USER-${digest}`;
}

export function isAdminRole(role) {
  return role === "ADMIN";
}

export function isAuthUserActive(user) {
  if (!user || user.disabled) return false;
  if (user.passwordHash) return true;
  if (Array.isArray(user.providerData) && user.providerData.some((provider) => provider?.providerId && provider.providerId !== "password")) return true;
  // Some Firebase Auth responses omit passwordHash even when the password
  // account has already signed in. The password provider plus a recorded
  // sign-in is sufficient evidence that the invitation was completed.
  return Boolean(
    user.metadata?.lastSignInTime &&
    Array.isArray(user.providerData) &&
    user.providerData.some((provider) => provider?.providerId === "password"),
  );
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
    if (code === "EMAIL_NOT_CONFIGURED") return "Le fournisseur email n’est pas configuré côté serveur.";
    if (code === "EMAIL_PROVIDER_REJECTED") return "Le fournisseur email a refusé l’envoi.";
    if (code === "EMAIL_TRANSPORT_FAILED") return "Le fournisseur email n’a pas pu être joint.";
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildUserEmail({ displayName, resetLink, baseUrl, kind }) {
  const appUrl = originBaseUrl(baseUrl);
  const installUrl = `${appUrl}/installer`;
  const isReset = kind === "password-reset";
  const subject = isReset ? "Réinitialiser votre mot de passe · Facture Thibeault" : "Votre accès · Facture Thibeault";
  const title = isReset ? "Réinitialisez votre mot de passe" : "Votre accès Facture Thibeault est prêt";
  const intro = isReset
    ? "Une demande de réinitialisation du mot de passe a été faite pour votre compte."
    : "Un accès à Facture Thibeault a été créé pour vous.";
  const button = isReset ? "Réinitialiser mon mot de passe" : "Créer mon mot de passe";
  const safeName = escapeHtml(displayName || "utilisateur");
  const safeResetLink = escapeHtml(resetLink);
  const safeInstallUrl = escapeHtml(installUrl);
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#f4f7f8;color:#173b55;font-family:Arial,sans-serif"><div style="max-width:560px;margin:0 auto;padding:32px 20px"><div style="background:#173b55;border-radius:14px 14px 0 0;padding:24px;color:#fff"><strong style="font-size:18px">Maçonnerie Thibeault</strong><div style="color:#cfe1e7;font-size:12px;margin-top:5px">Facture Thibeault</div></div><div style="background:#fff;padding:30px 24px;border:1px solid #dbe7ea;border-top:0;border-radius:0 0 14px 14px"><p style="color:#5d6163">Bonjour ${safeName},</p><h1 style="font-size:24px;margin:12px 0;color:#173b55">${title}</h1><p style="line-height:1.6;color:#4a6069">${intro}</p><p style="text-align:center;margin:28px 0"><a href="${safeResetLink}" style="display:inline-block;background:#de8d28;color:#fff;text-decoration:none;border-radius:8px;padding:13px 20px;font-weight:700">${button}</a></p><p style="line-height:1.6;color:#5d6163;font-size:13px">Ce lien personnel et temporaire ne doit pas être partagé. Si vous n’êtes pas à l’origine de cette demande, ignorez simplement ce message.</p><p style="margin-top:24px"><a href="${safeInstallUrl}" style="color:#007faf;font-weight:700">Installer Facture Thibeault</a></p></div><p style="font-size:11px;color:#7d8c91;text-align:center;margin-top:16px">Maçonnerie Thibeault · Facture Thibeault</p></div></body></html>`;
  const text = `Bonjour ${displayName || "utilisateur"},\n\n${intro}\n\n${button}: ${resetLink}\n\nInstaller Facture Thibeault: ${installUrl}\n\nCe lien personnel et temporaire ne doit pas être partagé.`;
  return { subject, html, text, installUrl };
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

async function applyRoleClaim({ user, role, auth }) {
  const previousClaims = user.customClaims && typeof user.customClaims === "object" ? user.customClaims : {};
  if (previousClaims.role !== role) {
    await auth.setCustomUserClaims(user.uid, { ...previousClaims, role });
  }
}

async function ensureDirectAuthAccount({ profile, profiles, auth, password }) {
  const email = normalizeEmail(profile.email);
  let user = await getAuthUserByUid(auth, profile.firebaseUid);
  if (user && !sameEmail(user.email, email)) {
    throw new UserInvitationError("AUTH_EMAIL_MISMATCH", "L’email du profil ne correspond pas au compte Firebase.", { status: 409 });
  }
  if (!user) user = await getAuthUserByEmail(auth, email);
  if (user) {
    const linkedProfile = otherProfileWithAuthUid(profiles, user.uid, profile.id);
    if (linkedProfile) {
      throw new UserInvitationError("AUTH_ALREADY_LINKED", "Ce compte Firebase est déjà associé à un autre profil.", { status: 409 });
    }
    user = await auth.updateUser(user.uid, {
      password,
      displayName: profile.displayName,
      disabled: profile.status === "INACTIVE",
    });
    await applyRoleClaim({ user, role: profile.role, auth });
    return { user, created: false };
  }

  user = await auth.createUser({
    email,
    password,
    displayName: profile.displayName,
    disabled: profile.status === "INACTIVE",
    emailVerified: false,
  });
  await applyRoleClaim({ user, role: profile.role, auth });
  return { user, created: true };
}

export async function createDirectUserProfile({ input, password = "", profiles, persistProfile, auth, actorUid, actorRole, now = () => new Date() }) {
  const email = normalizeEmail(input.email, { required: false });
  const normalizedPassword = normalizePassword(password, { required: false });
  if (normalizedPassword && !email) {
    throw new UserInvitationError("EMAIL_REQUIRED", "Un email est requis pour créer un compte avec mot de passe.", { status: 400 });
  }
  if (email && otherProfileWithEmail(profiles, email)) {
    throw new UserInvitationError("PROFILE_EMAIL_TAKEN", "Cette adresse email est déjà utilisée par un autre profil.", { status: 409 });
  }

  const baseProfile = {
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

  let account = null;
  if (normalizedPassword) {
    account = await ensureDirectAuthAccount({ profile: baseProfile, profiles, auth, password: normalizedPassword });
  }
  const profile = account
    ? { ...baseProfile, firebaseUid: account.user.uid, invitationStatus: INVITATION_STATUS.ACTIVE, activatedAt: now().toISOString() }
    : baseProfile;
  try {
    await persistProfile(profile, {
      action: USER_AUDIT_ACTION.USER_CREATED,
      details: { role: profile.role, accountCreated: Boolean(account), passwordProvided: Boolean(normalizedPassword), actorUid, actorRole },
    });
  } catch (error) {
    if (account?.created) await auth.deleteUser(account.user.uid).catch(() => undefined);
    throw error;
  }
  return { profile, user: account?.user ?? null };
}

export async function setUserPasswordForProfile({ profile, profiles, auth, persistProfile, nextPassword, actorUid, actorRole, now = () => new Date() }) {
  const email = normalizeEmail(profile.email);
  const password = normalizePassword(nextPassword);
  const userByUid = await getAuthUserByUid(auth, profile.firebaseUid);
  const userByEmail = await getAuthUserByEmail(auth, email);
  if (userByUid && !sameEmail(userByUid.email, email)) {
    throw new UserInvitationError("AUTH_EMAIL_MISMATCH", "L’email du profil ne correspond pas au compte Firebase.", { status: 409 });
  }
  if (userByUid && userByEmail && userByUid.uid !== userByEmail.uid) {
    throw new UserInvitationError("AUTH_EMAIL_TAKEN", "Cette adresse email est déjà utilisée par un autre compte Firebase.", { status: 409 });
  }
  let user = userByUid ?? userByEmail;
  let created = false;
  if (user) {
    const linkedProfile = otherProfileWithAuthUid(profiles, user.uid, profile.id);
    if (linkedProfile) {
      throw new UserInvitationError("AUTH_ALREADY_LINKED", "Ce compte Firebase est déjà associé à un autre profil.", { status: 409 });
    }
    user = await auth.updateUser(user.uid, {
      password,
      email,
      displayName: profile.displayName,
      disabled: profile.status === "INACTIVE",
    });
  } else {
    user = await auth.createUser({
      email,
      password,
      displayName: profile.displayName,
      disabled: profile.status === "INACTIVE",
      emailVerified: false,
    });
    created = true;
  }
  await applyRoleClaim({ user, role: profile.role, auth });
  const updated = {
    ...profile,
    firebaseUid: user.uid,
    invitationStatus: profile.status === "ACTIVE" ? INVITATION_STATUS.ACTIVE : profile.invitationStatus,
    activatedAt: profile.status === "ACTIVE" ? profile.activatedAt ?? now().toISOString() : profile.activatedAt,
    lastInvitationError: null,
  };
  await persistProfile(updated, {
    action: USER_AUDIT_ACTION.PASSWORD_UPDATED,
    details: { source: "admin_user_directory", actorUid, actorRole },
  });
  return { profile: updated, user, created };
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
    const resetLink = await auth.generatePasswordResetLink(email, { url: `${originBaseUrl(baseUrl)}/installer`, handleCodeInApp: false });
    const { subject, html, text } = buildUserEmail({ displayName: profile.displayName, resetLink, baseUrl, kind: "invitation" });
    await sendEmail({ to: email, subject, html, text, idempotencyKey: `user-invitation-${profile.id}-${now().getTime()}` });
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
    const resetLink = await auth.generatePasswordResetLink(email, { url: `${originBaseUrl(baseUrl)}/installer`, handleCodeInApp: false });
    const { subject, html, text } = buildUserEmail({ displayName: profile.displayName, resetLink, baseUrl, kind: "password-reset" });
    await sendEmail({ to: email, subject, html, text, idempotencyKey: `user-password-reset-${profile.id}-${now().getTime()}` });
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
