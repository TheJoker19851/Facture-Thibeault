import assert from "node:assert/strict";
import test from "node:test";
import { businessFixture, demoExpenseAccounts, demoPeriods, demoProjects, demoTaxAccounts, demoUsers } from "../scripts/fixtures/demo-data.mjs";
import {
  assertPostCleanupClean,
  buildDeletionPlan,
  buildFixtureIndex,
  buildPreflightReport,
  classifyInvoicePhoto,
  classifyStorageFile,
  preflightBlockingReasons,
} from "../scripts/lib/demo-cleanup.mjs";
import { isKnownE2EInvoiceIntake } from "../lib/demo-data-policy.mjs";

const firebaseUids = { WORKER: "demo-worker-uid", KIM: "demo-kim-uid", ADMIN: "demo-admin-uid" };
const fixture = businessFixture(firebaseUids);
const fixtureIndex = buildFixtureIndex({ demoUsers, demoProjects, demoPeriods, demoExpenseAccounts, demoTaxAccounts, fixture });

function report(overrides = {}) {
  return buildPreflightReport({
    fixtureIndex,
    rowsByType: { UserProfile: demoUsers.map((user) => ({ ...user, firebaseUid: firebaseUids[user.role] })) },
    invoicePhotos: [],
    authRecords: [
      { uid: firebaseUids.WORKER, email: demoUsers[0].email, customClaims: { demo: true } },
      { uid: "real-user-uid", email: "real.user@example.com", customClaims: { demo: false } },
    ],
    storageFiles: [],
    ...overrides,
  });
}

test("une InvoicePhoto DEMO connue est sélectionnée", () => {
  const result = classifyInvoicePhoto(fixture.invoicePhotos[0], fixtureIndex);
  assert.equal(result.classification, "SAFE_DEMO");
});

test("une InvoicePhoto orpheline mais prouvée par son ID fixture est sélectionnée", () => {
  const result = classifyInvoicePhoto({ id: "DEMO-PHOTO-001", storagePath: "receipts/demo/DEMO-INV-001/original-01.png" }, fixtureIndex);
  assert.equal(result.classification, "SAFE_DEMO");
});

test("une InvoicePhoto DEMO inconnue bloque le preflight", () => {
  const result = report({ invoicePhotos: [{ id: "DEMO-PHOTO-999", invoice: { id: "DEMO-INV-999" }, storagePath: "receipts/demo/DEMO-INV-999/original.png" }] });
  assert.equal(result.invoicePhotos[0].classification, "AMBIGUOUS");
  assert.ok(preflightBlockingReasons(result).some((reason) => reason.includes("DEMO-PHOTO-999")));
});

test("une InvoicePhoto non-DEMO n'est jamais sélectionnée", () => {
  const photo = { id: "PHOTO-REAL-001", invoice: { id: "INV-REAL-001" }, storagePath: "receipts/real/invoice.png" };
  const result = classifyInvoicePhoto(photo, fixtureIndex);
  assert.equal(result.classification, "NON_DEMO");
  assert.equal(buildDeletionPlan(report({ invoicePhotos: [photo] })).InvoicePhoto.length, 0);
});

test("l'intake E2E à UUID aléatoire est sélectionnée seulement avec les quatre marqueurs concordants", () => {
  const intake = {
    receiptId: "798a289b-f105-4dfe-90e3-bb5d43c7cf6c",
    uploaderUid: "demo-worker-uid",
    storageFolder: "receipts/2026/08/798a289b-f105-4dfe-90e3-bb5d43c7cf6c",
    extractedVendor: "Quincaillerie Démo",
    extractedInvoiceNumber: "DEMO-E2E-001",
    classificationAccountCode: "DEMO-90001",
    aiNotes: "Facture de démonstration E2E extraite avec succès.",
  };
  assert.equal(isKnownE2EInvoiceIntake(intake), true);
  const current = report({
    rowsByType: { InvoiceIntake: [intake] },
    storageFiles: [{ name: `${intake.storageFolder}/original-01.png`, metadata: { metadata: {} } }],
  });
  assert.equal(current.resources.InvoiceIntake[0].classification, "SAFE_DEMO");
  assert.equal(current.storage[0].classification, "SAFE_DEMO");
  const plan = buildDeletionPlan(current);
  assert.equal(plan.InvoiceIntake.length, 1);
  assert.equal(plan.Storage.length, 1);
});

test("un intake avec un seul marqueur DEMO reste conservé comme ambigu", () => {
  const current = report({ rowsByType: { InvoiceIntake: [{ receiptId: "real-intake", extractedInvoiceNumber: "DEMO-E2E-001" }] } });
  assert.equal(current.resources.InvoiceIntake[0].classification, "NON_DEMO");
  assert.equal(buildDeletionPlan(current).InvoiceIntake.length, 0);
});

test("un fichier Storage sans preuve DEMO suffisante est ambigu et non sélectionné", () => {
  const result = report({ storageFiles: [{ name: "receipts/demo/DEMO-INV-001/unmarked.png", metadata: { metadata: {} } }] });
  assert.equal(result.storage[0].classification, "AMBIGUOUS");
  assert.ok(preflightBlockingReasons(result).some((reason) => reason.includes("unmarked.png")));
});

test("un fichier Storage avec metadata et lien fixture est sélectionné", () => {
  const result = classifyStorageFile({ name: fixture.invoicePhotos[0].storagePath, metadata: { metadata: { demo: "true" } } }, fixtureIndex);
  assert.equal(result.classification, "SAFE_DEMO");
});

test("le compte Auth non-DEMO n'est jamais sélectionné", () => {
  const current = report();
  assert.equal(current.auth.filter((entry) => entry.classification === "NON_DEMO").length, 1);
  assert.equal(buildDeletionPlan(current).FirebaseAuth.length, 1);
  assert.equal(buildDeletionPlan(current).FirebaseAuth[0].row.email, demoUsers[0].email);
});

test("une ressource DEMO inattendue bloque le preflight", () => {
  const current = report({ rowsByType: { ExpenseTransaction: [{ id: "DEMO-TX-UNEXPECTED" }] } });
  assert.ok(preflightBlockingReasons(current).some((reason) => reason.includes("DEMO-TX-UNEXPECTED")));
});

test("les fixtures ne produisent plus les anciens statuts", () => {
  const legacy = new Set(["AI_REVIEW", "TO_VERIFY", "TO_VALIDATE"]);
  assert.equal(fixture.transactions.some((row) => legacy.has(row.status)), false);
  assert.equal(fixture.invoices.some((row) => legacy.has(row.reviewStatus)), false);
  assert.equal(fixture.invoiceIntakes.some((row) => legacy.has(row.status)), false);
});

test("la validation post-cleanup accepte zéro DEMO et un compte non-DEMO", () => {
  assert.doesNotThrow(() => assertPostCleanupClean(report({ rowsByType: {}, authRecords: [{ uid: "real-user-uid", email: "real.user@example.com", customClaims: { demo: false } }] })));
});

test("la validation post-cleanup conserve les ressources opérationnelles non-DEMO", () => {
  assert.doesNotThrow(() => assertPostCleanupClean(report({
    rowsByType: { UserProfile: [{ id: "REAL-USER", firebaseUid: "real-user-uid" }] },
    authRecords: [{ uid: "real-user-uid", email: "real.user@example.com", customClaims: { demo: false } }],
  })));
});

test("une lecture post-cleanup incomplète bloque la certification", () => {
  assert.throws(() => assertPostCleanupClean(report({ rowsByType: {}, authRecords: [{ uid: "real-user-uid", email: "real.user@example.com", customClaims: { demo: false } }], queryErrors: [{ type: "InvoicePhoto", message: "operation indisponible" }] })), /Validation InvoicePhoto indisponible/);
});
