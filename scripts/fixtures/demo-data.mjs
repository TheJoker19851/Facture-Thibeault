import { serializeDecisionChecks, serializeDecisionExceptions } from "../../lib/decision-json.mjs";

export const LOCAL_DEMO_PASSWORD = "Demo-Facture-2026!";

export const demoUsers = [
  { id: "DEMO-USER-WORKER", email: "worker.demo@example.test", displayName: "Alice Démo", jobTitle: "Travailleuse démo", role: "WORKER" },
  { id: "DEMO-USER-KIM", email: "kim.demo@example.test", displayName: "Benoît Démo", jobTitle: "Comptabilité démo", role: "KIM" },
  { id: "DEMO-USER-ADMIN", email: "admin.demo@example.test", displayName: "Chloé Démo", jobTitle: "Administration démo", role: "ADMIN" },
];

export const demoProjects = [
  { id: "DEMO-PROJET-001", number: "DEMO-001", name: "Chantier Démo A", status: "ACTIVE" },
  { id: "DEMO-PROJET-002", number: "DEMO-002", name: "Chantier Démo B", status: "ACTIVE" },
  { id: "DEMO-ADMIN", number: "DEMO-ADMIN", name: "Administration Démo", status: "ACTIVE" },
];

export const demoExpenseAccounts = [
  { id: "DEMO-ACCOUNT-90001", number: "DEMO-90001", label: "Matériaux Démo", type: "EXPENSE", status: "ACTIVE" },
  { id: "DEMO-ACCOUNT-90002", number: "DEMO-90002", label: "Carburant Démo", type: "EXPENSE", status: "ACTIVE" },
  { id: "DEMO-ACCOUNT-90003", number: "DEMO-90003", label: "Équipement Démo", type: "EXPENSE", status: "ACTIVE" },
  { id: "DEMO-ACCOUNT-TPS", number: "DEMO-TPS", label: "TPS Démo", type: "TAX", status: "ACTIVE" },
  { id: "DEMO-ACCOUNT-TVQ", number: "DEMO-TVQ", label: "TVQ Démo", type: "TAX", status: "ACTIVE" },
];

export const demoPeriods = [
  { id: "DEMO-2026-08", label: "Période Démo · 10 août → 9 septembre 2026", startDate: "2026-08-10", endDate: "2026-09-09", statementLabel: "Relevé Démo · cycle du 10 au 9", status: "OPEN" },
  { id: "DEMO-2026-07", label: "Période Démo · 10 juillet → 9 août 2026", startDate: "2026-07-10", endDate: "2026-08-09", statementLabel: "Relevé Démo · cycle du 10 au 9", status: "CLOSED" },
];

export function businessFixture(firebaseUids) {
  const cards = [
    { id: "DEMO-CARD-001", lastFour: "9001", holder: { id: "DEMO-USER-WORKER" }, cardFunction: "Carte démo travailleur", status: "ACTIVE", activeFrom: "2026-01-01" },
    { id: "DEMO-CARD-002", lastFour: "9002", holder: { id: "DEMO-USER-KIM" }, cardFunction: "Carte démo comptabilité", status: "ACTIVE", activeFrom: "2026-01-01" },
  ];
  const skuReferences = [
    { merchant: "Quincaillerie Démo", sku: "DEMO-SKU-001", productLabel: "Bloc de démonstration", categoryLabel: "Matériaux Démo", expenseAccount: { id: "DEMO-ACCOUNT-90001" }, verificationStatus: "VALIDATED" },
    { merchant: "Équipement Démo", sku: "DEMO-SKU-002", productLabel: "Outil de démonstration", categoryLabel: "Équipement Démo", expenseAccount: { id: "DEMO-ACCOUNT-90003" }, verificationStatus: "TO_CONFIRM" },
  ];
  const transactions = [
    {
      id: "DEMO-TX-001", transactionDate: "2026-08-10", vendor: "Quincaillerie Démo", card: { id: "DEMO-CARD-001" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-PROJET-001" }, expenseAccount: { id: "DEMO-ACCOUNT-90001" }, categoryLabel: "Matériaux Démo", sku: "DEMO-SKU-001", amountBeforeTaxCents: "10000", tpsCents: "500", tvqCents: "998", totalCents: "11498", currency: "CAD", status: "NEEDS_REVIEW", processingStatus: "NEEDS_REVIEW", accountingStatus: "NOT_POSTED", reconciliationStatus: "UNMATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 0.82, classificationNote: "Donnée fictive à valider.", invoiceNumber: "DEMO-FACT-001", issue: "Montant fictif à confirmer.",
    },
    {
      id: "DEMO-TX-002", transactionDate: "2026-08-11", vendor: "Station Démo", card: { id: "DEMO-CARD-001" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-PROJET-002" }, expenseAccount: { id: "DEMO-ACCOUNT-90002" }, categoryLabel: "Carburant Démo", amountBeforeTaxCents: "8000", tpsCents: "400", tvqCents: "798", totalCents: "9198", currency: "CAD", status: "VALIDATED", processingStatus: "VALIDATED", accountingStatus: "POSTED", reconciliationStatus: "MATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 1, classificationNote: "Transaction fictive validée.", invoiceNumber: "DEMO-FACT-002",
    },
    {
      id: "DEMO-TX-003", transactionDate: "2026-08-12", vendor: "Équipement Démo", card: { id: "DEMO-CARD-002" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-ADMIN" }, expenseAccount: { id: "DEMO-ACCOUNT-90003" }, categoryLabel: "Équipement Démo", sku: "DEMO-SKU-002", amountBeforeTaxCents: "20000", tpsCents: "1000", tvqCents: "1995", totalCents: "22995", currency: "CAD", status: "NEEDS_REVIEW", processingStatus: "NEEDS_REVIEW", accountingStatus: "NOT_POSTED", reconciliationStatus: "UNMATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 0.7, classificationNote: "Référence fictive à confirmer.", invoiceNumber: "DEMO-FACT-003",
    },
    {
      id: "DEMO-TX-004", transactionDate: "2026-08-13", vendor: "Auto Démo", card: { id: "DEMO-CARD-001" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-PROJET-001" }, expenseAccount: { id: "DEMO-ACCOUNT-90001" }, categoryLabel: "Auto Démo", sku: "DEMO-SKU-001", amountBeforeTaxCents: "5000", tpsCents: "250", tvqCents: "499", totalCents: "5749", currency: "CAD", status: "AUTO_APPROVED", processingStatus: "AUTO_APPROVED", accountingStatus: "POSTED", reconciliationStatus: "UNMATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 1, classificationNote: "Approbation automatique fictive.", invoiceNumber: "DEMO-FACT-004", issue: null,
    },
    {
      id: "DEMO-TX-005", transactionDate: "2026-08-14", vendor: "Validation Démo", card: { id: "DEMO-CARD-002" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-ADMIN" }, expenseAccount: { id: "DEMO-ACCOUNT-90003" }, categoryLabel: "Validation Démo", sku: "DEMO-SKU-002", amountBeforeTaxCents: "6000", tpsCents: "300", tvqCents: "599", totalCents: "6899", currency: "CAD", status: "VALIDATED", processingStatus: "VALIDATED", accountingStatus: "NOT_POSTED", reconciliationStatus: "UNMATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 1, classificationNote: "Validation humaine avant commit fictif.", invoiceNumber: "DEMO-FACT-005", issue: null,
    },
    {
      id: "DEMO-TX-006", transactionDate: "2026-08-15", vendor: "Rapprochement Démo", card: { id: "DEMO-CARD-002" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-PROJET-002" }, expenseAccount: { id: "DEMO-ACCOUNT-90002" }, categoryLabel: "Rapprochement Démo", amountBeforeTaxCents: "7000", tpsCents: "350", tvqCents: "699", totalCents: "8049", currency: "CAD", status: "VALIDATED", processingStatus: "VALIDATED", accountingStatus: "POSTED", reconciliationStatus: "UNMATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 1, classificationNote: "Écriture postée non rapprochée fictive.", invoiceNumber: "DEMO-FACT-006", issue: null,
    },
  ];
  const invoices = [
    { id: "DEMO-INV-001", transaction: { id: "DEMO-TX-001" }, vendor: "Quincaillerie Démo", invoiceNumber: "DEMO-FACT-001", invoiceDate: "2026-08-10", subtotalCents: "10000", tpsCents: "500", tvqCents: "998", totalCents: "11498", processingStatus: "NEEDS_REVIEW", accountingStatus: "NOT_POSTED", reviewStatus: "NEEDS_REVIEW", storageFolder: "receipts/demo/DEMO-INV-001", createdBy: { id: "DEMO-USER-WORKER" } },
    { id: "DEMO-INV-002", transaction: { id: "DEMO-TX-002" }, vendor: "Station Démo", invoiceNumber: "DEMO-FACT-002", invoiceDate: "2026-08-11", subtotalCents: "8000", tpsCents: "400", tvqCents: "798", totalCents: "9198", processingStatus: "VALIDATED", accountingStatus: "POSTED", reviewStatus: "VALIDATED", storageFolder: "receipts/demo/DEMO-INV-002", createdBy: { id: "DEMO-USER-WORKER" } },
    { id: "DEMO-INV-003", transaction: { id: "DEMO-TX-004" }, vendor: "Auto Démo", invoiceNumber: "DEMO-FACT-004", invoiceDate: "2026-08-13", subtotalCents: "5000", tpsCents: "250", tvqCents: "499", totalCents: "5749", processingStatus: "AUTO_APPROVED", accountingStatus: "POSTED", reviewStatus: "VALIDATED", storageFolder: "receipts/demo/DEMO-INV-003", createdBy: { id: "DEMO-USER-WORKER" } },
    { id: "DEMO-INV-004", transaction: { id: "DEMO-TX-005" }, vendor: "Validation Démo", invoiceNumber: "DEMO-FACT-005", invoiceDate: "2026-08-14", subtotalCents: "6000", tpsCents: "300", tvqCents: "599", totalCents: "6899", processingStatus: "VALIDATED", accountingStatus: "NOT_POSTED", reviewStatus: "VALIDATED", storageFolder: "receipts/demo/DEMO-INV-004", createdBy: { id: "DEMO-USER-WORKER" } },
    { id: "DEMO-INV-005", transaction: { id: "DEMO-TX-006" }, vendor: "Rapprochement Démo", invoiceNumber: "DEMO-FACT-006", invoiceDate: "2026-08-15", subtotalCents: "7000", tpsCents: "350", tvqCents: "699", totalCents: "8049", processingStatus: "VALIDATED", accountingStatus: "POSTED", reviewStatus: "VALIDATED", storageFolder: "receipts/demo/DEMO-INV-005", createdBy: { id: "DEMO-USER-WORKER" } },
  ];
  const invoicePhotos = [
    { id: "DEMO-PHOTO-001", invoice: { id: "DEMO-INV-001" }, storagePath: "receipts/demo/DEMO-INV-001/original-01.png", contentType: "image/png", sequence: 1 },
    { id: "DEMO-PHOTO-002", invoice: { id: "DEMO-INV-002" }, storagePath: "receipts/demo/DEMO-INV-002/original-01.png", contentType: "image/png", sequence: 1 },
    { id: "DEMO-PHOTO-003", invoice: { id: "DEMO-INV-003" }, storagePath: "receipts/demo/DEMO-INV-003/original-01.png", contentType: "image/png", sequence: 1 },
    { id: "DEMO-PHOTO-004", invoice: { id: "DEMO-INV-004" }, storagePath: "receipts/demo/DEMO-INV-004/original-01.png", contentType: "image/png", sequence: 1 },
    { id: "DEMO-PHOTO-005", invoice: { id: "DEMO-INV-005" }, storagePath: "receipts/demo/DEMO-INV-005/original-01.png", contentType: "image/png", sequence: 1 },
  ];
  const invoiceIntakes = [
    { receiptId: "DEMO-INTAKE-001", uploaderUid: firebaseUids.WORKER, storageFolder: "receipts/demo/DEMO-INTAKE-001", photoCount: 1, status: "NEEDS_REVIEW", processingStatus: "NEEDS_REVIEW", accountingStatus: "NOT_POSTED", aiModel: "demo-mock", aiConfidence: 0.75, extractedVendor: "Équipement Démo", extractedInvoiceNumber: "DEMO-FACT-003", extractedInvoiceDate: "2026-08-12", extractedSubtotalCents: "20000", extractedTpsCents: "1000", extractedTvqCents: "1995", extractedTotalCents: "22995", extractedCurrency: "CAD", extractedSku: "DEMO-SKU-002", extractedCategory: "Équipement Démo", extractedProjectId: "DEMO-ADMIN", classificationAccountCode: "DEMO-90003", classificationCategory: "Équipement Démo", classificationSource: "DEMO_SEED", classificationConfidence: 0.7, classificationStatus: "UNRESOLVED", decisionExceptions: serializeDecisionExceptions([{ code: "LOW_CONFIDENCE", fieldName: "confidence", message: "La confiance du résultat démo est inférieure au seuil.", aiValue: "0.75", suggestedValue: "0.95", status: "OPEN" }]), decisionChecks: serializeDecisionChecks([{ code: "AI_CONFIDENCE", passed: false, message: "Fixture locale de revue manuelle." }]), aiNotes: "Donnée entièrement fictive." },
    { receiptId: "DEMO-INTAKE-002", uploaderUid: firebaseUids.KIM, storageFolder: "receipts/demo/DEMO-INTAKE-002", photoCount: 0, status: "VALIDATED", processingStatus: "VALIDATED", accountingStatus: "NOT_POSTED", aiModel: "demo-mock", aiConfidence: 1, extractedVendor: "Validation Démo", extractedInvoiceNumber: "DEMO-FACT-005", extractedInvoiceDate: "2026-08-14", extractedSubtotalCents: "6000", extractedTpsCents: "300", extractedTvqCents: "599", extractedTotalCents: "6899", extractedCurrency: "CAD", extractedSku: "DEMO-SKU-002", extractedCategory: "Validation Démo", extractedProjectId: "DEMO-ADMIN", classificationAccountCode: "DEMO-90003", classificationCategory: "Validation Démo", classificationSource: "DEMO_SEED", classificationConfidence: 1, classificationStatus: "RESOLVED", decisionExceptions: serializeDecisionExceptions([]), decisionChecks: serializeDecisionChecks([{ code: "KIM_REVIEW", passed: true, message: "Validation KIM fictive complète." }]), aiNotes: "Scénario validé avant écriture comptable." },
    { receiptId: "DEMO-INTAKE-003", uploaderUid: firebaseUids.WORKER, storageFolder: "receipts/demo/DEMO-INTAKE-003", photoCount: 0, status: "AUTO_APPROVED", processingStatus: "AUTO_APPROVED", accountingStatus: "POSTED", aiModel: "demo-mock", aiConfidence: 1, extractedVendor: "Auto Démo", extractedInvoiceNumber: "DEMO-FACT-004", extractedInvoiceDate: "2026-08-13", extractedSubtotalCents: "5000", extractedTpsCents: "250", extractedTvqCents: "499", extractedTotalCents: "5749", extractedCurrency: "CAD", extractedSku: "DEMO-SKU-001", extractedCategory: "Auto Démo", extractedProjectId: "DEMO-PROJET-001", classificationAccountCode: "DEMO-90001", classificationCategory: "Auto Démo", classificationSource: "DEMO_SEED", classificationConfidence: 1, classificationStatus: "RESOLVED", decisionExceptions: serializeDecisionExceptions([]), decisionChecks: serializeDecisionChecks([{ code: "AUTO_APPROVAL", passed: true, message: "Toutes les vérifications automatiques sont passées." }]), aiNotes: "Scénario approuvé automatiquement fictif." },
  ];

  return { cards, skuReferences, transactions, invoices, invoicePhotos, invoiceIntakes };
}
