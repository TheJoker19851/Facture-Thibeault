export const DEMO_DATA_PREFIX = "DEMO-";

const KNOWN_E2E_INTAKE = Object.freeze({
  invoiceNumber: "DEMO-E2E-001",
  vendor: "Quincaillerie Démo",
  accountCode: "DEMO-90001",
  notesPrefix: "Facture de démonstration E2E",
});

export function isDemoIdentifier(value) {
  return typeof value === "string" && value.startsWith(DEMO_DATA_PREFIX);
}

/**
 * This exact marker set identifies the one production E2E intake whose UUID
 * was generated at runtime and therefore does not start with DEMO-.
 */
export function isKnownE2EInvoiceIntake(intake) {
  return intake?.extractedInvoiceNumber === KNOWN_E2E_INTAKE.invoiceNumber &&
    intake?.extractedVendor === KNOWN_E2E_INTAKE.vendor &&
    intake?.classificationAccountCode === KNOWN_E2E_INTAKE.accountCode &&
    typeof intake?.aiNotes === "string" &&
    intake.aiNotes.startsWith(KNOWN_E2E_INTAKE.notesPrefix);
}

export function isDemoOrE2EInvoiceIntake(intake) {
  return isDemoIdentifier(intake?.receiptId) || isKnownE2EInvoiceIntake(intake);
}
