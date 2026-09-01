import assert from "node:assert/strict";
import { deleteApp, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDataConnect } from "firebase-admin/data-connect";
import { LOCAL_FIREBASE_PROJECT_ID } from "../lib/environment.mjs";
import {
  createDirectUserProfile,
  INVITATION_STATUS,
  setUserPasswordForProfile,
} from "../lib/user-invitations.mjs";

const serviceConfig = {
  serviceId: "facture-thibeault-service",
  location: "northamerica-northeast1",
  connector: "accounting",
};

export async function verifyUserAccessEmulator() {
  const app = initializeApp({ projectId: LOCAL_FIREBASE_PROJECT_ID }, `user-access-${Date.now()}`);
  const auth = getAuth(app);
  const dataConnect = getDataConnect(serviceConfig, app);
  const runTag = String(Date.now());
  const email = `direct-${runTag}@example.test`;
  const password = `Direct-Access-${runTag}!`;
  const rotatedPassword = `Rotated-Access-${runTag}!`;
  const profileIds = [];
  const actorUid = "DEMO-USER-ADMIN";
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

  try {
    const first = await createDirectUserProfile({
      input: {
        displayName: "Utilisateur direct émulateur",
        email,
        jobTitle: "Test local",
        role: "WORKER",
      },
      password,
      profiles: [],
      persistProfile,
      auth,
      actorUid,
      actorRole: "ADMIN",
    });
    const profile = first.profile;
    profileIds.push(profile.id);

    const createdUser = await auth.getUserByEmail(email);
    assert.equal(createdUser.email, email);
    assert.ok(createdUser.passwordHash);
    assert.equal(createdUser.customClaims?.role, "WORKER");
    assert.equal(profile.invitationStatus, INVITATION_STATUS.ACTIVE);

    const rotated = await setUserPasswordForProfile({
      profile,
      profiles: [profile],
      auth,
      persistProfile,
      nextPassword: rotatedPassword,
      actorUid,
      actorRole: "ADMIN",
    });
    const rotatedUser = await auth.getUser(createdUser.uid);
    assert.equal(rotated.user.uid, createdUser.uid);
    assert.ok(rotatedUser.passwordHash);
    assert.equal(rotated.profile.invitationStatus, INVITATION_STATUS.ACTIVE);

    const stored = await dataConnect.executeQuery("ListUserProfiles", { limit: 100, offset: 0 }, {
      impersonate: { authClaims: { sub: actorUid, role: "ADMIN" } },
    });
    const storedProfile = stored.data.userProfiles.find((row) => row.id === profile.id);
    assert.equal(storedProfile?.firebaseUid, createdUser.uid);
    assert.equal(storedProfile?.invitationStatus, INVITATION_STATUS.ACTIVE);
    console.log("Accès utilisateur direct Emulator validé : Auth, rôle, mot de passe et modification sans email sortant.");
  } finally {
    let cleanupError = null;
    try {
      await auth.deleteUser((await auth.getUserByEmail(email)).uid);
    } catch (error) {
      if (error?.code !== "auth/user-not-found") cleanupError = error;
    }
    for (const profileId of profileIds) {
      try {
        await dataConnect.executeMutation("AdminDeleteUserProfile", { id: profileId });
      } catch (error) {
        cleanupError ??= error;
      }
    }
    await deleteApp(app);
    if (cleanupError) console.error("Nettoyage du test d’accès utilisateur incomplet :", cleanupError.message ?? cleanupError);
  }
}
