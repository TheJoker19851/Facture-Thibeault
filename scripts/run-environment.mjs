import { configurationFrom, readEnvFile, safeConfigurationSummary } from "./lib/env-files.mjs";

const target = process.argv[2] ?? "current";
const action = process.argv[3] ?? "check";
if (target !== "current" || action !== "check") throw new Error("Seule la vérification de .env.local est disponible.");

let loaded;
try {
  loaded = await readEnvFile(".env.local");
} catch {
  throw new Error(".env.local est absent. Copiez .env.emulator.example (LOCAL) ou .env.production.example (PRODUCTION) hors de Git.");
}
const validation = configurationFrom(loaded.values, { requireExplicit: true });
if (!validation.ok) throw new Error(`Configuration refusée dans .env.local :\n- ${validation.issues.join("\n- ")}`);
console.log("Configuration Firebase validée", safeConfigurationSummary(loaded.values, validation));
