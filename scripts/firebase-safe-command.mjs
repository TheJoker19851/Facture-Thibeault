import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { PRODUCTION_FIREBASE_PROJECT_ID, validateFirebaseEnvironment } from "../lib/environment.mjs";
import { readEnvFile } from "./lib/env-files.mjs";

const target = process.argv[2];
const action = process.argv[3];
if (target !== "production" || !["plan", "deploy"].includes(action)) throw new Error("Usage : node scripts/firebase-safe-command.mjs production <plan|deploy>.");
const { values: fileValues } = await readEnvFile(".env.local");
const runtimeKeys = [
  "APP_ENV", "NEXT_PUBLIC_APP_ENV", "CONFIRM_PRODUCTION_DEPLOY", "CONFIRM_PRODUCTION_SCHEMA_MIGRATION",
];
const runtimeValues = Object.fromEntries(runtimeKeys.filter((key) => process.env[key]).map((key) => [key, process.env[key]]));
const values = { ...fileValues, ...runtimeValues };
const projectId = values.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
if (projectId !== PRODUCTION_FIREBASE_PROJECT_ID) throw new Error(`Projet inattendu : la commande exige ${PRODUCTION_FIREBASE_PROJECT_ID}.`);
if (values.FIREBASE_ADMIN_PROJECT_ID !== PRODUCTION_FIREBASE_PROJECT_ID) throw new Error(`Projet Admin inattendu : la commande exige ${PRODUCTION_FIREBASE_PROJECT_ID}.`);
const validation = validateFirebaseEnvironment({
  appEnvironment: values.APP_ENV, publicAppEnvironment: values.NEXT_PUBLIC_APP_ENV,
  projectId, adminProjectId: values.FIREBASE_ADMIN_PROJECT_ID,
  useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
  authEmulatorHost: values.FIREBASE_AUTH_EMULATOR_HOST,
  dataConnectEmulatorHost: values.DATA_CONNECT_EMULATOR_HOST,
  storageEmulatorHost: values.FIREBASE_STORAGE_EMULATOR_HOST,
  previewMode: values.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE, requireExplicit: true,
});
if (!validation.ok) throw new Error(validation.issues.join(" "));
if (action === "deploy" && (values.CONFIRM_PRODUCTION_DEPLOY !== "DEPLOY_FACTURE_THIBEAULT_PRODUCTION" || values.CONFIRM_PRODUCTION_SCHEMA_MIGRATION !== "REVIEWED_PRODUCTION_SQL_DIFF")) {
  throw new Error("Le déploiement production exige les deux confirmations explicites documentées.");
}

console.log("TARGET PROJECT: facture-thibeault");
console.log("ENVIRONMENT: PRODUCTION");
console.log(`DATA MODE: ${action === "plan" ? "SCHEMA PLAN ONLY" : "SCHEMA DEPLOY ONLY"}`);
const firebaseCli = resolve("node_modules/firebase-tools/lib/bin/firebase.js");
async function run(args) {
  await new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, [firebaseCli, ...args], { stdio: "inherit", shell: false });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolvePromise() : reject(new Error(`firebase ${args.join(" ")} a échoué (${code}).`)));
  });
}

let temporaryAdcDirectory;
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && values.FIREBASE_ADMIN_CLIENT_EMAIL && values.FIREBASE_ADMIN_PRIVATE_KEY) {
  temporaryAdcDirectory = await mkdtemp(join(tmpdir(), "facture-thibeault-adc-"));
  const temporaryAdcPath = join(temporaryAdcDirectory, "application-default.json");
  await writeFile(temporaryAdcPath, JSON.stringify({
    type: "service_account",
    project_id: projectId,
    client_email: values.FIREBASE_ADMIN_CLIENT_EMAIL,
    private_key: values.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    token_uri: "https://oauth2.googleapis.com/token",
  }), { encoding: "utf8", mode: 0o600 });
  process.env.GOOGLE_APPLICATION_CREDENTIALS = temporaryAdcPath;
}

try {
  await run(["dataconnect:compile", "--project", projectId]);
  await run(["dataconnect:sql:diff", "--project", projectId]);
  if (action === "deploy") await run(["deploy", "--project", projectId, "--only", "storage,dataconnect"]);
  else console.log("Plan production terminé en lecture seule; aucune migration appliquée.");
} finally {
  if (temporaryAdcDirectory) await rm(temporaryAdcDirectory, { recursive: true, force: true });
}
