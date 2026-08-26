import assert from "node:assert/strict";
import { deleteApp, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDataConnect } from "firebase-admin/data-connect";
import { LOCAL_FIREBASE_PROJECT_ID } from "../lib/environment.mjs";
import {
  createUserProfile,
  INVITATION_STATUS,
  sendInvitationForProfile,
} from "../lib/user-invitations.mjs";

const serviceConfig = {
  serviceId: "facture-thibeault-service",
  location: "northamerica-northeast1",
  connector: "accounting",
};

export async function verifyUserInvitationsEmulator() {
  const app = initializeApp({ projectId: LOCAL_FIREBASE_PROJECT_ID }, `user-invitations-${Date.now()}`);
  const auth = getAuth(app);
  const dataConnect = getDataConnect(serviceConfig, app);
  const runTag = String(Date.now());
  const email = `invitation-${runTag}@example.test`;
  let profileId = null;
  const actorUid = "DEMO-USER-ADMIN";
  const sentEmails = [];
  const auditEvents = [];
  let auditSequence = 0;

  const persistProfile = async (profile, audit) => {
    await dataConnect.executeMutation("AdminUpsertUserProfileWithAudit", {
      id: profile.id,
      firebaseUid: profile.firebaseUid ?? null,
      displayName: profile.displayName,
      email: profile.email ?? null,
      jobTitle: profile.jobTitle ?? null,
      role: profile.role,
      status: profile.status,
      invitationStatus: profile.invitationStatus,
      invitationSentAt: profile.invitationSentAt ?? null,
      invitationSentBy: profile.invitationSentBy ?? null,
      lastInvitationError: profile.lastInvitationError ?? null,
      activatedAt: profile.activatedAt ?? null,
      auditEventId: `AUDIT-${runTag}-${++auditSequence}`,
      actorUid: audit.actorUid ?? actorUid,
      actorRole: "ADMIN",
      auditAction: audit.action,
      auditDetails: JSON.stringify(audit.details ?? {}),
    });
  };

  const recordAudit = async (profile, action, details) => {
    auditEvents.push({ profileId: profile.id, action, details });
    await dataConnect.executeMutation("AdminRecordUserAudit", {
      auditEventId: `AUDIT-${runTag}-${++auditSequence}`,
      actorUid,
      actorRole: "ADMIN",
      auditAction: action,
      entityId: profile.id,
      auditDetails: JSON.stringify(details ?? {}),
    });
  };

  let profile;
  try {
    const first = await createUserProfile({
      input: {
        displayName: "Utilisateur invitation émulateur",
        email,
        jobTitle: "Test local",
        role: "WORKER",
      },
      profiles: [],
      persistProfile,
      sendInvitation: true,
      auth,
      recordAudit,
      sendEmail: async (message) => { sentEmails.push(message); },
      baseUrl: "http://127.0.0.1:3000",
      actorUid,
      actorRole: "ADMIN",
    });
    profile = first.profile;
    profileId = profile.id;

    const createdUser = await auth.getUserByEmail(email);
    assert.equal(createdUser.email, email);
    assert.equal(createdUser.passwordHash, undefined);
    assert.equal(createdUser.customClaims?.role, "WORKER");
    assert.equal(profile.invitationStatus, INVITATION_STATUS.INVITED);
    assert.equal(sentEmails.length, 1);
    assert.equal(sentEmails[0].to, email);
    assert.equal(sentEmails[0].continueUrl, "http://127.0.0.1:3000/installer");
    assert.equal(sentEmails[0].kind, "invitation");

    const resentInvitation = await sendInvitationForProfile({
      profile,
      profiles: [profile],
      auth,
      persistProfile,
      recordAudit,
      sendEmail: async (message) => { sentEmails.push(message); },
      baseUrl: "http://127.0.0.1:3000",
      actorUid,
      actorRole: "ADMIN",
    });
    const resentUser = await auth.getUserByEmail(email);
    assert.equal(resentUser.uid, createdUser.uid);
    assert.equal(resentInvitation.user.uid, createdUser.uid);
    assert.equal(sentEmails.length, 2);
    assert.equal(sentEmails[1].kind, "invitation");
    assert.equal(resentInvitation.profile.invitationStatus, INVITATION_STATUS.INVITED);

    const stored = await dataConnect.executeQuery("ListUserProfiles", { limit: 100, offset: 0 }, {
      impersonate: { authClaims: { sub: actorUid, role: "ADMIN" } },
    });
    const storedProfile = stored.data.userProfiles.find((row) => row.id === profileId);
    assert.equal(storedProfile?.firebaseUid, createdUser.uid);
    assert.equal(storedProfile?.invitationStatus, INVITATION_STATUS.INVITED);
    console.log("Invitations utilisateur Emulator validées : Auth, rôle, email sans mot de passe et ré-envoi idempotent.");
  } finally {
    let cleanupError = null;
    try {
      await auth.deleteUser((await auth.getUserByEmail(email)).uid);
    } catch (error) {
      if (error?.code !== "auth/user-not-found") cleanupError = error;
    }
    try {
      if (profileId) await dataConnect.executeMutation("AdminDeleteUserProfile", { id: profileId });
    } catch (error) {
      cleanupError ??= error;
    }
    await deleteApp(app);
    if (cleanupError) console.error("Nettoyage du test d’invitation incomplet :", cleanupError.message ?? cleanupError);
  }
}
