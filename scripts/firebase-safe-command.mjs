import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { PRODUCTION_FIREBASE_PROJECT_ID, validateFirebaseEnvironment } from "../lib/environment.mjs";
import { readEnvFile } from "./lib/env-files.mjs";

const target = process.argv[2];
const action = process.argv[3];
if (target !== "production" || !["plan", "deploy"].includes(action)) throw new Error("Usage : node scripts/firebase-safe-command.mjs production <plan|deploy>.");
const { values } = await readEnvFile(".env.local");
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
await run(["dataconnect:compile", "--project", projectId]);
await run(["dataconnect:sql:diff", "--project", projectId]);
if (action === "deploy") await run(["deploy", "--project", projectId, "--only", "storage,dataconnect"]);
else console.log("Plan production terminé en lecture seule; aucune migration appliquée.");
