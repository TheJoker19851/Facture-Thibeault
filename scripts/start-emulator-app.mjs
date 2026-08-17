import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { localEmulatorEnvironment } from "./lib/env-files.mjs";
import { seedDemo } from "./seed-demo.mjs";

const environment = localEmulatorEnvironment(process.env);
Object.assign(process.env, environment);
await seedDemo("local");

const vinextCli = resolve("node_modules/vinext/dist/cli.js");
const child = spawn(process.execPath, [vinextCli, "dev"], {
  stdio: "inherit",
  env: environment,
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code) => process.exit(code ?? 1));
