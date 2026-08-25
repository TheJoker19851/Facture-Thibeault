import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { assertSafeProductionCardRoster, PRODUCTION_FIREBASE_PROJECT_ID } from "../lib/environment.mjs";
import { normalizeCardRoster } from "../lib/card-roster.mjs";
import { readEnvFile } from "./lib/env-files.mjs";
import { executeAllQueryPages } from "./lib/data-connect-pages.mjs";

function requireAdminCredentials(values) {
  if (!values.FIREBASE_ADMIN_CLIENT_EMAIL || !values.FIREBASE_ADMIN_PRIVATE_KEY) {
    throw new Error("Les identifiants Firebase Admin Production sont requis pour configurer les cartes.");
  }
}

function parseRoster(values) {
  const raw = process.env.CARD_ROSTER_JSON || values.CARD_ROSTER_JSON;
  if (!raw) throw new Error("CARD_ROSTER_JSON est requis; il ne doit pas être enregistré dans le dépôt.");
  return normalizeCardRoster(JSON.parse(raw));
}

export async function configureProductionCardRoster({ envValues = {} } = {}) {
  const { values: fileValues } = await readEnvFile(".env.local");
  const runtimeKeys = [
    "APP_ENV", "NEXT_PUBLIC_APP_ENV", "NEXT_PUBLIC_FIREBASE_PROJECT_ID", "FIREBASE_ADMIN_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_USE_EMULATORS", "FIREBASE_AUTH_EMULATOR_HOST", "DATA_CONNECT_EMULATOR_HOST",
    "FIREBASE_STORAGE_EMULATOR_HOST", "NEXT_PUBLIC_FIREBASE_PREVIEW_MODE", "CONFIRM_PRODUCTION_CARD_ROSTER",
  ];
  const runtimeValues = Object.fromEntries(runtimeKeys.filter((key) => process.env[key]).map((key) => [key, process.env[key]]));
  const values = { ...fileValues, ...runtimeValues, ...envValues };
  assertSafeProductionCardRoster({
    projectId: values.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    adminProjectId: values.FIREBASE_ADMIN_PROJECT_ID,
    appEnvironment: values.APP_ENV,
    publicAppEnvironment: values.NEXT_PUBLIC_APP_ENV,
    useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
    authEmulatorHost: values.FIREBASE_AUTH_EMULATOR_HOST,
    dataConnectEmulatorHost: values.DATA_CONNECT_EMULATOR_HOST,
    storageEmulatorHost: values.FIREBASE_STORAGE_EMULATOR_HOST,
    previewMode: values.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE,
    confirmation: process.env.CONFIRM_PRODUCTION_CARD_ROSTER || values.CONFIRM_PRODUCTION_CARD_ROSTER,
  });
  requireAdminCredentials(values);
  const roster = parseRoster(values);

  delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
  delete process.env.DATA_CONNECT_EMULATOR_HOST;
  delete process.env.FIREBASE_STORAGE_EMULATOR_HOST;
  const [{ cert, deleteApp, initializeApp }, { getDataConnect }] = await Promise.all([
    import("firebase-admin/app"),
    import("firebase-admin/data-connect"),
  ]);
  const app = initializeApp({
    credential: cert({
      projectId: PRODUCTION_FIREBASE_PROJECT_ID,
      clientEmail: values.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: values.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    projectId: PRODUCTION_FIREBASE_PROJECT_ID,
  }, `production-card-roster-${Date.now()}`);

  try {
    const dataConnect = getDataConnect({
      serviceId: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID,
      location: values.NEXT_PUBLIC_SQL_CONNECT_LOCATION,
      connector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID,
    }, app);
    const [profiles, cards] = await Promise.all([
      executeAllQueryPages(dataConnect, "ListUserProfiles", "userProfiles"),
      executeAllQueryPages(dataConnect, "ListCreditCardsPage", "creditCards"),
    ]);
    const admin = profiles.find((profile) => profile.role === "ADMIN" && profile.status === "ACTIVE" && profile.firebaseUid);
    if (!admin) throw new Error("Aucun profil ADMIN actif n'a été trouvé; aucune carte n'a été modifiée.");
    const existingCardIds = new Set(cards.map((card) => card.id));
    const existingProfileIds = new Set(profiles.map((profile) => profile.id));
    const createdProfiles = [];
    const createdCards = [];
    for (const entry of roster) {
      const profileId = `CARD-HOLDER-${entry.lastFour}`;
      const cardId = `CARD-${entry.lastFour}`;
      if (!existingProfileIds.has(profileId)) {
        await dataConnect.executeMutation("UpsertUserProfile", {
          id: profileId,
          firebaseUid: profileId,
          displayName: entry.displayName,
          email: null,
          jobTitle: "Titulaire de carte · aucun accès",
          role: "WORKER",
          status: "ACTIVE",
        }, { impersonate: { authClaims: { sub: admin.firebaseUid, role: "ADMIN" } } });
        existingProfileIds.add(profileId);
        createdProfiles.push(profileId);
      }
      if (!existingCardIds.has(cardId)) {
        await dataConnect.executeMutation("UpsertCreditCard", {
          id: cardId,
          lastFour: entry.lastFour,
          holderId: profileId,
          cardFunction: "Carte corporative",
          status: "ACTIVE",
          activeFrom: new Date().toISOString().slice(0, 10),
          inactiveFrom: null,
        }, { impersonate: { authClaims: { sub: admin.firebaseUid, role: "ADMIN" } } });
        existingCardIds.add(cardId);
        createdCards.push(cardId);
      }
    }
    const result = { profiles: profiles.length + createdProfiles.length, cards: cards.length + createdCards.length, createdProfiles: createdProfiles.length, createdCards: createdCards.length };
    console.log(JSON.stringify({ target: PRODUCTION_FIREBASE_PROJECT_ID, mode: "REAL_CARD_CONFIGURATION_ONLY", ...result }, null, 2));
    return result;
  } finally {
    await deleteApp(app);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await configureProductionCardRoster();
}
