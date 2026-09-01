import { localEmulatorEnvironment } from "./lib/env-files.mjs";
import { seedDemo } from "./seed-demo.mjs";
import { verifyInvoiceIdempotence } from "./verify-invoice-idempotence.mjs";
import { verifyEmulatorPermissions } from "./verify-emulator.mjs";
import { verifyReconciliationEmulator } from "./verify-reconciliation-emulator.mjs";
import { verifyUserAccessEmulator } from "./verify-user-invitations-emulator.mjs";
import { verifyCardHolderDeletionEmulator } from "./verify-card-holder-deletion-emulator.mjs";

Object.assign(process.env, localEmulatorEnvironment(process.env));
await seedDemo("local");
await verifyEmulatorPermissions();
await verifyCardHolderDeletionEmulator();
await verifyInvoiceIdempotence();
await verifyReconciliationEmulator();
await verifyUserAccessEmulator();
