import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { PRODUCTION_FIREBASE_PROJECT_ID, validateFirebaseEnvironment } from "../lib/environment.mjs";
import { readEnvFile } from "./lib/env-files.mjs";

const target = process.argv[2];
const action = process.argv[3];
if (!['staging', 'production'].includes(target) || !['plan', 'deploy'].includes(action)) {
  throw new Error("Usage : node scripts/firebase-safe-command.mjs <staging|production> <plan|deploy>.");
}

const envFile = target === "staging" ? ".env.staging.local" : ".env.local";
const { values } = await readEnvFile(envFile);
const projectId = values.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
if (!/^[a-z][a-z0-9-]{5,29}$/.test(projectId ?? "")) throw new Error("Identifiant de projet Firebase invalide.");

const validation = validateFirebaseEnvironment({
  appEnvironment: target,
  projectId,
  adminProjectId: values.FIREBASE_ADMIN_PROJECT_ID,
  useEmulators: values.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
  requireExplicit: true,
});
if (!validation.ok) throw new Error(validation.issues.join(" "));

if (target === "staging" && action === "deploy" && values.CONFIRM_STAGING_DEPLOY !== "DEPLOY_FACTURE_THIBEAULT_STAGING") {
  throw new Error("CONFIRM_STAGING_DEPLOY doit valoir DEPLOY_FACTURE_THIBEAULT_STAGING.");
}
if (target === "production" && action === "deploy") {
  if (projectId !== PRODUCTION_FIREBASE_PROJECT_ID) throw new Error("Projet de production inattendu.");
  if (values.CONFIRM_PRODUCTION_DEPLOY !== "DEPLOY_FACTURE_THIBEAULT_PRODUCTION" ||
      values.CONFIRM_PRODUCTION_SCHEMA_MIGRATION !== "REVIEWED_PRODUCTION_SQL_DIFF") {
    throw new Error("Le déploiement production exige les deux confirmations explicites documentées.");
  }
}

const firebaseCli = resolve("node_modules/firebase-tools/lib/bin/firebase.js");
async function run(args) {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [firebaseCli, ...args], { stdio: "inherit", shell: false });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`firebase ${args.join(" ")} a échoué (${code}).`)));
  });
}

await run(["dataconnect:compile", "--project", projectId]);
await run(["dataconnect:sql:diff", "--project", projectId]);
if (action === "plan") {
  console.log(`Plan ${target} terminé en lecture seule pour ${projectId}.`);
} else {
  await run(["deploy", "--project", projectId, "--only", "storage,dataconnect"]);
}
