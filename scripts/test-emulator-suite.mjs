import { localEmulatorEnvironment } from "./lib/env-files.mjs";
import { seedDemo } from "./seed-demo.mjs";
import { verifyInvoiceIdempotence } from "./verify-invoice-idempotence.mjs";
import { verifyEmulatorPermissions } from "./verify-emulator.mjs";

Object.assign(process.env, localEmulatorEnvironment(process.env));
await seedDemo("local");
await verifyEmulatorPermissions();
await verifyInvoiceIdempotence();
