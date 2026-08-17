import { spawn } from "node:child_process";
import { resolve } from "node:path";

const vinextCli = resolve("node_modules/vinext/dist/cli.js");
const child = spawn(process.execPath, [vinextCli, "build"], {
  stdio: "inherit",
  env: { ...process.env, NITRO_PRESET: "vercel" },
});

child.on("error", (error) => {
  console.error("Le build Vinext n'a pas pu démarrer.", error);
  process.exit(1);
});
child.on("exit", (code) => process.exit(code ?? 1));
