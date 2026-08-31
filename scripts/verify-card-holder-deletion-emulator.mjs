import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { getApps, initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";

export async function verifyCardHolderDeletionEmulator() {
  if (getApps().length === 0) initializeApp({ projectId: process.env.GCLOUD_PROJECT ?? "demo-facture-thibeault" });
  const dataConnect = getDataConnect({
    serviceId: process.env.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID ?? "facture-thibeault-service",
    location: process.env.NEXT_PUBLIC_SQL_CONNECT_LOCATION ?? "northamerica-northeast1",
    connector: process.env.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID ?? "accounting",
  });
  const actorClaims = { sub: `E2E-ADMIN-${randomUUID()}`, role: "ADMIN" };
  const holderId = `E2E-HOLDER-${randomUUID()}`;
  const cardId = `E2E-CARD-${randomUUID()}`;

  await dataConnect.executeMutation("UpsertUserProfile", {
    id: holderId,
    firebaseUid: null,
    displayName: "Titulaire suppression E2E",
    email: null,
    jobTitle: "Test",
    role: "WORKER",
    status: "ACTIVE",
  }, { impersonate: { authClaims: actorClaims } });
  await dataConnect.executeMutation("UpsertCreditCard", {
    id: cardId,
    lastFour: "9998",
    holderId,
    cardFunction: "Test suppression",
    status: "ACTIVE",
    activeFrom: "2026-08-31",
    inactiveFrom: null,
  }, { impersonate: { authClaims: actorClaims } });

  await dataConnect.executeMutation("DeleteCreditCardAndHolder", {
    cardId,
    holderId,
    auditEventId: `AUDIT-${cardId}-${randomUUID()}`,
    auditDetails: JSON.stringify({ source: "E2E" }),
  }, { impersonate: { authClaims: actorClaims } });

  const [users, cards, audits] = await Promise.all([
    dataConnect.executeQuery("ListUserProfiles", { limit: 200, offset: 0 }, { impersonate: { authClaims: actorClaims } }),
    dataConnect.executeQuery("ListCreditCardsPage", { limit: 200, offset: 0 }, { impersonate: { authClaims: actorClaims } }),
    dataConnect.executeQuery("ListAuditEvents", { entityType: "CreditCard", entityId: cardId, limit: 200, offset: 0 }, { impersonate: { authClaims: actorClaims } }),
  ]);

  assert.equal(users.data.userProfiles.some((profile) => profile.id === holderId), false);
  assert.equal(cards.data.creditCards.some((card) => card.id === cardId), false);
  assert.ok(audits.data.auditEvents.some((event) => event.action === "CARD_AND_HOLDER_DELETED"));
  console.log("Suppression carte + titulaire validée par l’émulateur.");
}

if (process.argv[1]?.endsWith("verify-card-holder-deletion-emulator.mjs")) {
  const { localEmulatorEnvironment } = await import("./lib/env-files.mjs");
  Object.assign(process.env, localEmulatorEnvironment(process.env));
  await verifyCardHolderDeletionEmulator();
}
