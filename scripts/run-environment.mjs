import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { configurationFrom, readEnvFile, safeConfigurationSummary } from "./lib/env-files.mjs";

const target = process.argv[2] ?? "current";
const action = process.argv[3] ?? "check";
const file = target === "staging" ? ".env.staging.local" : ".env.local";

let loaded;
try {
  loaded = await readEnvFile(file);
} catch {
  throw new Error(`${file} est absent. Copiez d'abord le gabarit correspondant.`);
}

const requireExplicit = target === "staging";
const validation = configurationFrom(loaded.values, { requireExplicit });
if (!validation.ok) {
  throw new Error(`Configuration refusée dans ${file} :\n- ${validation.issues.join("\n- ")}`);
}

console.log("Configuration Firebase validée", safeConfigurationSummary(loaded.values, validation));
if (!loaded.values.APP_ENV || !loaded.values.NEXT_PUBLIC_APP_ENV) {
  console.warn(`Ajoutez APP_ENV=${validation.environment} et NEXT_PUBLIC_APP_ENV=${validation.environment} à ${file}.`);
}

if (action === "check") process.exit(0);
if (action !== "dev" || target !== "staging") throw new Error(`Action inconnue : ${target} ${action}.`);

const stagingEnvironment = { ...process.env, ...loaded.values };
delete stagingEnvironment.FIREBASE_AUTH_EMULATOR_HOST;
delete stagingEnvironment.DATA_CONNECT_EMULATOR_HOST;
const vinextCli = resolve("node_modules/vinext/dist/cli.js");
const child = spawn(process.execPath, [vinextCli, "dev"], {
  stdio: "inherit",
  env: stagingEnvironment,
});
child.on("exit", (code) => process.exit(code ?? 1));
