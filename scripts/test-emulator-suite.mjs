import { localEmulatorEnvironment } from "./lib/env-files.mjs";
import { seedDemo } from "./seed-demo.mjs";
import { verifyInvoiceIdempotence } from "./verify-invoice-idempotence.mjs";
import { verifyEmulatorPermissions } from "./verify-emulator.mjs";
import { verifyReconciliationEmulator } from "./verify-reconciliation-emulator.mjs";
import { verifyUserInvitationsEmulator } from "./verify-user-invitations-emulator.mjs";

Object.assign(process.env, localEmulatorEnvironment(process.env));
await seedDemo("local");
await verifyEmulatorPermissions();
await verifyInvoiceIdempotence();
await verifyReconciliationEmulator();
await verifyUserInvitationsEmulator();
