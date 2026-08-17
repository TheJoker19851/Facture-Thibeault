import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateFirebaseEnvironment } from "../../lib/environment.mjs";

export async function readEnvFile(path) {
  const absolutePath = resolve(path);
  const text = await readFile(absolutePath, "utf8");
  const values = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const separator = line.indexOf("=");
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }

  return { absolutePath, values };
}

export function configurationFrom(values, { requireExplicit = false } = {}) {
  const appEnvironment = values.APP_ENV || values.NEXT_PUBLIC_APP_ENV;
  return validateFirebaseEnvironment({
    appEnvironment,
    projectId: values.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    adminProjectId: values.FIREBASE_ADMIN_PROJECT_ID,
    useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
    authEmulatorHost: values.FIREBASE_AUTH_EMULATOR_HOST,
    dataConnectEmulatorHost: values.DATA_CONNECT_EMULATOR_HOST,
    requireExplicit,
  });
}

export function localEmulatorEnvironment(base = process.env) {
  return {
    ...base,
    APP_ENV: "local",
    NEXT_PUBLIC_APP_ENV: "local",
    NEXT_PUBLIC_FIREBASE_API_KEY: "demo-api-key",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "demo-facture-thibeault.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "demo-facture-thibeault",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "demo-facture-thibeault.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "000000000000",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:000000000000:web:demo",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "",
    NEXT_PUBLIC_FIREBASE_USE_EMULATORS: "true",
    NEXT_PUBLIC_FIREBASE_ANALYTICS_ENABLED: "false",
    NEXT_PUBLIC_FIREBASE_PREVIEW_MODE: "false",
    NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID: "facture-thibeault-service",
    NEXT_PUBLIC_SQL_CONNECT_LOCATION: "northamerica-northeast1",
    NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID: "accounting",
    NEXT_PUBLIC_FIREBASE_APPCHECK_RECAPTCHA_ENTERPRISE_KEY: "",
    FIREBASE_ADMIN_PROJECT_ID: "demo-facture-thibeault",
    FIREBASE_ADMIN_CLIENT_EMAIL: "",
    FIREBASE_ADMIN_PRIVATE_KEY: "",
    FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
    DATA_CONNECT_EMULATOR_HOST: "127.0.0.1:9399",
    INVOICE_AI_MODE: "mock",
    GOOGLE_GENERATIVE_AI_API_KEY: "",
    GCLOUD_PROJECT: "demo-facture-thibeault",
  };
}

export function safeConfigurationSummary(values, validation) {
  return {
    environment: validation.environment ?? "indéterminé",
    projectId: values.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "manquant",
    adminProjectMatches: Boolean(
      values.FIREBASE_ADMIN_PROJECT_ID &&
      values.FIREBASE_ADMIN_PROJECT_ID === values.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    ),
    emulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true",
    dataConnectService: values.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID || "manquant",
    dataConnectConnector: values.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID || "manquant",
    aiMode: values.INVOICE_AI_MODE || "live (valeur implicite)",
  };
}
