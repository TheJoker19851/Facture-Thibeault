export const LOCAL_DEMO_PASSWORD = "Demo-Facture-2026!";

export const demoUsers = [
  { id: "DEMO-USER-WORKER", email: "worker.demo@example.test", displayName: "Alice Démo", jobTitle: "Travailleuse démo", role: "WORKER" },
  { id: "DEMO-USER-KIM", email: "kim.demo@example.test", displayName: "Benoît Démo", jobTitle: "Comptabilité démo", role: "KIM" },
  { id: "DEMO-USER-ADMIN", email: "admin.demo@example.test", displayName: "Chloé Démo", jobTitle: "Administration démo", role: "ADMIN" },
];

export const demoProjects = [
  { id: "DEMO-PROJET-001", name: "Chantier Démo A", status: "ACTIVE" },
  { id: "DEMO-PROJET-002", name: "Chantier Démo B", status: "ACTIVE" },
  { id: "DEMO-ADMIN", name: "Administration Démo", status: "ACTIVE" },
];

export const demoExpenseAccounts = [
  { code: "DEMO-90001", label: "Matériaux Démo", status: "ACTIVE" },
  { code: "DEMO-90002", label: "Carburant Démo", status: "ACTIVE" },
  { code: "DEMO-90003", label: "Équipement Démo", status: "ACTIVE" },
];

export const demoTaxAccounts = [
  { code: "DEMO-TPS", label: "TPS Démo", status: "ACTIVE" },
  { code: "DEMO-TVQ", label: "TVQ Démo", status: "ACTIVE" },
];

export const demoPeriods = [
  { id: "DEMO-2026-08", label: "Période Démo · août 2026", startDate: "2026-08-01", endDate: "2026-08-31", statementLabel: "Relevé Démo · août", status: "OPEN" },
  { id: "DEMO-2026-07", label: "Période Démo · juillet 2026", startDate: "2026-07-01", endDate: "2026-07-31", statementLabel: "Relevé Démo · juillet", status: "CLOSED" },
];

export function businessFixture(firebaseUids) {
  const cards = [
    { id: "DEMO-CARD-001", lastFour: "9001", holder: { id: "DEMO-USER-WORKER" }, cardFunction: "Carte démo travailleur", status: "ACTIVE", activeFrom: "2026-01-01" },
    { id: "DEMO-CARD-002", lastFour: "9002", holder: { id: "DEMO-USER-KIM" }, cardFunction: "Carte démo comptabilité", status: "ACTIVE", activeFrom: "2026-01-01" },
  ];
  const skuReferences = [
    { merchant: "Quincaillerie Démo", sku: "DEMO-SKU-001", productLabel: "Bloc de démonstration", categoryLabel: "Matériaux Démo", expenseAccount: { code: "DEMO-90001" }, verificationStatus: "VALIDATED" },
    { merchant: "Équipement Démo", sku: "DEMO-SKU-002", productLabel: "Outil de démonstration", categoryLabel: "Équipement Démo", expenseAccount: { code: "DEMO-90003" }, verificationStatus: "TO_CONFIRM" },
  ];
  const transactions = [
    {
      id: "DEMO-TX-001", transactionDate: "2026-08-10", vendor: "Quincaillerie Démo", card: { id: "DEMO-CARD-001" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-PROJET-001" }, expenseAccount: { code: "DEMO-90001" }, categoryLabel: "Matériaux Démo", sku: "DEMO-SKU-001", amountBeforeTaxCents: "10000", tpsCents: "500", tvqCents: "998", totalCents: "11498", currency: "CAD", status: "TO_VERIFY", processingStatus: "NEEDS_REVIEW", accountingStatus: "NOT_POSTED", reconciliationStatus: "UNMATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 0.82, classificationNote: "Donnée fictive à valider.", invoiceNumber: "DEMO-FACT-001", issue: "Montant fictif à confirmer.",
    },
    {
      id: "DEMO-TX-002", transactionDate: "2026-08-11", vendor: "Station Démo", card: { id: "DEMO-CARD-001" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-PROJET-002" }, expenseAccount: { code: "DEMO-90002" }, categoryLabel: "Carburant Démo", amountBeforeTaxCents: "8000", tpsCents: "400", tvqCents: "798", totalCents: "9198", currency: "CAD", status: "VALIDATED", processingStatus: "VALIDATED", accountingStatus: "POSTED", reconciliationStatus: "MATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 1, classificationNote: "Transaction fictive validée.", invoiceNumber: "DEMO-FACT-002",
    },
    {
      id: "DEMO-TX-003", transactionDate: "2026-08-12", vendor: "Équipement Démo", card: { id: "DEMO-CARD-002" }, statementPeriod: { id: "DEMO-2026-08" }, project: { id: "DEMO-ADMIN" }, expenseAccount: { code: "DEMO-90003" }, categoryLabel: "Équipement Démo", sku: "DEMO-SKU-002", amountBeforeTaxCents: "20000", tpsCents: "1000", tvqCents: "1995", totalCents: "22995", currency: "CAD", status: "TO_VALIDATE", processingStatus: "NEEDS_REVIEW", accountingStatus: "NOT_POSTED", reconciliationStatus: "UNMATCHED", classificationSource: "DEMO_SEED", classificationConfidence: 0.7, classificationNote: "Référence fictive à confirmer.", invoiceNumber: "DEMO-FACT-003",
    },
  ];
  const invoices = [
    { id: "DEMO-INV-001", transaction: { id: "DEMO-TX-001" }, vendor: "Quincaillerie Démo", invoiceNumber: "DEMO-FACT-001", invoiceDate: "2026-08-10", subtotalCents: "10000", tpsCents: "500", tvqCents: "998", totalCents: "11498", processingStatus: "NEEDS_REVIEW", accountingStatus: "NOT_POSTED", reviewStatus: "TO_VERIFY", storageFolder: "receipts/demo/DEMO-INV-001", createdBy: { id: "DEMO-USER-WORKER" } },
    { id: "DEMO-INV-002", transaction: { id: "DEMO-TX-002" }, vendor: "Station Démo", invoiceNumber: "DEMO-FACT-002", invoiceDate: "2026-08-11", subtotalCents: "8000", tpsCents: "400", tvqCents: "798", totalCents: "9198", processingStatus: "VALIDATED", accountingStatus: "POSTED", reviewStatus: "VALIDATED", storageFolder: "receipts/demo/DEMO-INV-002", createdBy: { id: "DEMO-USER-WORKER" } },
  ];
  const invoicePhotos = [
    { id: "DEMO-PHOTO-001", invoice: { id: "DEMO-INV-001" }, storagePath: "receipts/demo/DEMO-INV-001/original-01.png", contentType: "image/png", sequence: 1 },
    { id: "DEMO-PHOTO-002", invoice: { id: "DEMO-INV-002" }, storagePath: "receipts/demo/DEMO-INV-002/original-01.png", contentType: "image/png", sequence: 1 },
  ];
  const invoiceIntakes = [
    { receiptId: "DEMO-INTAKE-001", uploaderUid: firebaseUids.WORKER, storageFolder: "receipts/demo/DEMO-INTAKE-001", photoCount: 1, status: "NEEDS_REVIEW", processingStatus: "NEEDS_REVIEW", accountingStatus: "NOT_POSTED", aiModel: "demo-mock", aiConfidence: 0.75, extractedVendor: "Équipement Démo", extractedInvoiceNumber: "DEMO-FACT-003", extractedInvoiceDate: "2026-08-12", extractedSubtotalCents: "20000", extractedTpsCents: "1000", extractedTvqCents: "1995", extractedTotalCents: "22995", extractedCurrency: "CAD", extractedSku: "DEMO-SKU-002", extractedCategory: "Équipement Démo", extractedProjectId: "DEMO-ADMIN", classificationAccountCode: "DEMO-90003", classificationCategory: "Équipement Démo", classificationSource: "DEMO_SEED", classificationConfidence: 0.7, classificationStatus: "UNRESOLVED", decisionExceptions: JSON.stringify([{ code: "LOW_CONFIDENCE", fieldName: "confidence", message: "La confiance du résultat démo est inférieure au seuil.", aiValue: "0.75", suggestedValue: "0.95", status: "OPEN" }]), decisionChecks: JSON.stringify([{ code: "AI_CONFIDENCE", passed: false, message: "Fixture locale de revue manuelle." }]), aiNotes: "Donnée entièrement fictive." },
  ];

  return { cards, skuReferences, transactions, invoices, invoicePhotos, invoiceIntakes };
}
