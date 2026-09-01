import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createDirectUserProfile,
  createUserProfile,
  effectiveInvitationStatus,
  isAdminRole,
  isAuthUserActive,
  sendInvitationForProfile,
  sendPasswordResetForProfile,
  setUserPasswordForProfile,
  updateUserEmail,
  UserInvitationError,
  USER_AUDIT_ACTION,
  INVITATION_STATUS,
} from "../lib/user-invitations.mjs";

function authNotFound() {
  const error = new Error("not found");
  error.code = "auth/user-not-found";
  return error;
}

function authEmailTaken() {
  const error = new Error("email taken");
  error.code = "auth/email-already-exists";
  return error;
}

function fakeAuth(initialUsers = []) {
  const users = new Map(initialUsers.map((user) => [user.uid, { ...user }]));
  let nextUid = users.size + 1;
  return {
    users,
    async getUser(uid) {
      const user = users.get(uid);
      if (!user) throw authNotFound();
      return { ...user };
    },
    async getUserByEmail(email) {
      const user = [...users.values()].find((candidate) => candidate.email === email);
      if (!user) throw authNotFound();
      return { ...user };
    },
    async createUser(input) {
      await Promise.resolve();
      if ([...users.values()].some((candidate) => candidate.email === input.email)) throw authEmailTaken();
      const user = { uid: `auth-${nextUid++}`, ...input, customClaims: {}, providerData: [] };
      users.set(user.uid, user);
      return { ...user };
    },
    async updateUser(uid, updates) {
      const user = users.get(uid);
      if (!user) throw authNotFound();
      Object.assign(user, updates);
      return { ...user };
    },
    async setCustomUserClaims(uid, customClaims) {
      const user = users.get(uid);
      if (!user) throw authNotFound();
      user.customClaims = customClaims;
    },
    async generatePasswordResetLink(email) {
      return `https://example.test/reset?email=${encodeURIComponent(email)}&token=one-time`;
    },
  };
}

function repository(initialProfiles = []) {
  const profiles = initialProfiles.map((profile) => ({ ...profile }));
  const audits = [];
  return {
    profiles,
    audits,
    async persistProfile(profile, audit) {
      const index = profiles.findIndex((candidate) => candidate.id === profile.id);
      if (index >= 0) profiles[index] = { ...profile };
      else profiles.push({ ...profile });
      audits.push({ action: audit.action, profileId: profile.id, details: audit.details });
    },
    async recordAudit(profile, action, details) {
      audits.push({ action, profileId: profile.id, details });
    },
  };
}

function mailer(sent, { fail = false } = {}) {
  return async (message) => {
    if (fail) {
      const error = new Error("provider rejected");
      error.code = "EMAIL_PROVIDER_REJECTED";
      throw error;
    }
    sent.push(message);
    return { id: `mail-${sent.length}` };
  };
}

const common = {
  baseUrl: "https://facture.example.test",
  actorUid: "admin-uid",
  actorRole: "ADMIN",
  now: () => new Date("2026-08-26T12:00:00.000Z"),
};

test("A: profil existant sans Auth reçoit une invitation et le rôle est appliqué", async () => {
  const profile = { id: "PROFILE-A", firebaseUid: null, displayName: "Alice", email: "alice@example.test", jobTitle: "Chantier", role: "WORKER", status: "ACTIVE", invitationStatus: INVITATION_STATUS.NOT_INVITED };
  const auth = fakeAuth();
  const store = repository([profile]);
  const sent = [];
  const result = await sendInvitationForProfile({ profile, profiles: store.profiles, auth, persistProfile: store.persistProfile, recordAudit: store.recordAudit, sendEmail: mailer(sent), ...common });
  assert.equal(auth.users.size, 1);
  assert.equal([...auth.users.values()][0].customClaims.role, "WORKER");
  assert.equal(result.profile.invitationStatus, INVITATION_STATUS.INVITED);
  assert.equal(sent.length, 1);
  assert.ok(store.audits.some((audit) => audit.action === USER_AUDIT_ACTION.INVITATION_SENT));
});

test("B: renvoi avec Auth existant ne crée aucun doublon", async () => {
  const authUser = { uid: "auth-existing", email: "bob@example.test", passwordHash: undefined, providerData: [], customClaims: { role: "WORKER" } };
  const profile = { id: "PROFILE-B", firebaseUid: authUser.uid, displayName: "Bob", email: authUser.email, role: "WORKER", status: "ACTIVE", invitationStatus: INVITATION_STATUS.INVITED };
  const auth = fakeAuth([authUser]);
  const store = repository([profile]);
  const sent = [];
  const result = await sendInvitationForProfile({ profile, profiles: store.profiles, auth, persistProfile: store.persistProfile, recordAudit: store.recordAudit, sendEmail: mailer(sent), ...common });
  assert.equal(auth.users.size, 1);
  assert.equal(result.profile.invitationStatus, INVITATION_STATUS.INVITED);
  assert.ok(store.audits.some((audit) => audit.action === USER_AUDIT_ACTION.INVITATION_RESENT));
});

test("C: nouveau profil avec invitation crée le profil, Auth et l’email", async () => {
  const auth = fakeAuth();
  const store = repository();
  const sent = [];
  const result = await createUserProfile({ input: { displayName: "Carole", email: "carole@example.test", jobTitle: "Administration", role: "KIM" }, profiles: store.profiles, persistProfile: store.persistProfile, sendInvitation: true, auth, recordAudit: store.recordAudit, sendEmail: mailer(sent), ...common });
  assert.equal(auth.users.size, 1);
  assert.equal([...auth.users.values()][0].customClaims.role, "KIM");
  assert.equal(result.profile.invitationStatus, INVITATION_STATUS.INVITED);
  assert.equal(store.audits.filter((audit) => audit.action === USER_AUDIT_ACTION.USER_CREATED).length, 1);
  assert.equal(sent.length, 1);
});

test("création directe avec email et mot de passe crée le compte sans email sortant", async () => {
  const auth = fakeAuth();
  const store = repository();
  const result = await createDirectUserProfile({
    input: { displayName: "Caroline", email: "caroline@example.test", jobTitle: "Chantier", role: "WORKER" },
    password: "Caroline-Acces-2026!",
    profiles: store.profiles,
    persistProfile: store.persistProfile,
    auth,
    ...common,
  });
  const created = [...auth.users.values()][0];
  assert.equal(auth.users.size, 1);
  assert.equal(created.email, "caroline@example.test");
  assert.equal(created.password, "Caroline-Acces-2026!");
  assert.equal(created.customClaims.role, "WORKER");
  assert.equal(result.profile.firebaseUid, created.uid);
  assert.equal(result.profile.invitationStatus, INVITATION_STATUS.ACTIVE);
  assert.equal(store.audits[0].action, USER_AUDIT_ACTION.USER_CREATED);
});

test("un profil peut recevoir email et mot de passe plus tard", async () => {
  const auth = fakeAuth();
  const store = repository();
  const created = await createDirectUserProfile({
    input: { displayName: "Daniel", email: "", jobTitle: "Atelier", role: "KIM" },
    profiles: store.profiles,
    persistProfile: store.persistProfile,
    auth,
    ...common,
  });
  assert.equal(auth.users.size, 0);
  const withEmail = await updateUserEmail({
    profile: created.profile,
    profiles: store.profiles,
    auth,
    persistProfile: store.persistProfile,
    nextEmail: "daniel@example.test",
    ...common,
  });
  const withPassword = await setUserPasswordForProfile({
    profile: withEmail.profile,
    profiles: store.profiles,
    auth,
    persistProfile: store.persistProfile,
    nextPassword: "Daniel-Acces-2026!",
    ...common,
  });
  assert.equal(auth.users.size, 1);
  assert.equal(withPassword.profile.email, "daniel@example.test");
  assert.equal(withPassword.profile.invitationStatus, INVITATION_STATUS.ACTIVE);
  assert.equal([...auth.users.values()][0].password, "Daniel-Acces-2026!");
  assert.equal([...auth.users.values()][0].customClaims.role, "KIM");
});

test("un mot de passe ne peut pas être créé sans email", async () => {
  const auth = fakeAuth();
  const store = repository();
  await assert.rejects(
    () => createDirectUserProfile({ input: { displayName: "Éric", email: "", jobTitle: "", role: "WORKER" }, password: "Eric-Acces-2026!", profiles: store.profiles, persistProfile: store.persistProfile, auth, ...common }),
    (error) => error instanceof UserInvitationError && error.code === "EMAIL_REQUIRED",
  );
  assert.equal(store.profiles.length, 0);
  assert.equal(auth.users.size, 0);
});

test("D: email invalide ne crée et ne modifie aucun profil", async () => {
  const store = repository();
  await assert.rejects(() => createUserProfile({ input: { displayName: "Diane", email: "pas-un-email", jobTitle: "", role: "WORKER" }, profiles: store.profiles, persistProfile: store.persistProfile, sendInvitation: true }), (error) => error instanceof UserInvitationError && error.code === "INVALID_EMAIL");
  assert.equal(store.profiles.length, 0);
  assert.equal(store.audits.length, 0);
});

test("E: utilisateur actif reçoit un lien de reset sans mot de passe exposé", async () => {
  const authUser = { uid: "auth-active", email: "eve@example.test", passwordHash: "hash", providerData: [], customClaims: { role: "WORKER" } };
  const profile = { id: "PROFILE-E", firebaseUid: authUser.uid, displayName: "Eve", email: authUser.email, role: "WORKER", status: "ACTIVE", invitationStatus: INVITATION_STATUS.ACTIVE };
  const auth = fakeAuth([authUser]);
  const store = repository([profile]);
  const sent = [];
  await sendPasswordResetForProfile({ profile, profiles: store.profiles, auth, persistProfile: store.persistProfile, recordAudit: store.recordAudit, sendEmail: mailer(sent), ...common });
  assert.equal(sent.length, 1);
  assert.match(sent[0].subject, /Réinitialiser/);
  assert.doesNotMatch(sent[0].html, /mot de passe temporaire/i);
  assert.ok(store.audits.some((audit) => audit.action === USER_AUDIT_ACTION.PASSWORD_RESET_REQUESTED));
});

test("F: un WORKER n’est pas administrateur", () => {
  assert.equal(isAdminRole("WORKER"), false);
  assert.equal(isAdminRole("KIM"), false);
  assert.equal(isAdminRole("ADMIN"), true);
});

test("un compte password connecté reste actif si Firebase omet passwordHash", () => {
  const authUser = { uid: "auth-password", email: "password@example.test", providerData: [{ providerId: "password" }], metadata: { lastSignInTime: "2026-08-27T15:07:05.000Z" } };
  const profile = { id: "PROFILE-PASSWORD", invitationStatus: INVITATION_STATUS.INVITED };
  assert.equal(isAuthUserActive(authUser), true);
  assert.equal(effectiveInvitationStatus(profile, authUser), INVITATION_STATUS.ACTIVE);
});

test("G: deux invitations simultanées réutilisent le même compte Auth", async () => {
  const profile = { id: "PROFILE-G", firebaseUid: null, displayName: "Gaston", email: "gaston@example.test", role: "WORKER", status: "ACTIVE", invitationStatus: INVITATION_STATUS.NOT_INVITED };
  const auth = fakeAuth();
  const store = repository([profile]);
  const sent = [];
  await Promise.all([
    sendInvitationForProfile({ profile, profiles: store.profiles, auth, persistProfile: store.persistProfile, recordAudit: store.recordAudit, sendEmail: mailer(sent), ...common }),
    sendInvitationForProfile({ profile, profiles: store.profiles, auth, persistProfile: store.persistProfile, recordAudit: store.recordAudit, sendEmail: mailer(sent), ...common }),
  ]);
  assert.equal(auth.users.size, 1);
  assert.equal(sent.length, 2);
});

test("H: email déjà utilisé par un autre profil est refusé", async () => {
  const existing = { id: "PROFILE-H-EXISTING", firebaseUid: null, displayName: "Hélène", email: "helene@example.test", role: "WORKER", status: "ACTIVE", invitationStatus: INVITATION_STATUS.NOT_INVITED };
  const store = repository([existing]);
  await assert.rejects(() => createUserProfile({ input: { displayName: "Henri", email: "HELENE@example.test", jobTitle: "", role: "WORKER" }, profiles: store.profiles, persistProfile: store.persistProfile, sendInvitation: true }), (error) => error instanceof UserInvitationError && error.code === "PROFILE_EMAIL_TAKEN");
  assert.equal(store.profiles.length, 1);
});

test("un échec d’envoi conserve le profil dans l’état INVITATION_FAILED", async () => {
  const profile = { id: "PROFILE-FAIL", firebaseUid: null, displayName: "Iris", email: "iris@example.test", role: "WORKER", status: "ACTIVE", invitationStatus: INVITATION_STATUS.NOT_INVITED };
  const auth = fakeAuth();
  const store = repository([profile]);
  await assert.rejects(() => sendInvitationForProfile({ profile, profiles: store.profiles, auth, persistProfile: store.persistProfile, recordAudit: store.recordAudit, sendEmail: mailer([], { fail: true }), ...common }), (error) => error instanceof UserInvitationError && error.code === "INVITATION_FAILED" && error.profile?.invitationStatus === INVITATION_STATUS.INVITATION_FAILED);
  assert.equal(store.profiles[0].invitationStatus, INVITATION_STATUS.INVITATION_FAILED);
  assert.ok(store.profiles[0].firebaseUid);
});
