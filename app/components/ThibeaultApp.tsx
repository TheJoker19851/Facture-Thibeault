"use client";

import { ChangeEvent, createContext, FormEvent, Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { AdminUserActionError, accountingReadSource, commitInvoiceIntake, correctPostedInvoice, deleteExpenseAccount, deleteProject, deletePostedInvoice, discardInvoiceIntake, loadAccountingSnapshot, loadAdminUserAccess, loadReportAdjustments, loadTransactionCorrections, mapAccountingSnapshot, removeDemoAccountingData, runAdminUserAction, saveCreditCard, saveExpenseAccount, saveInvoiceIntakeReview, saveProject, saveReportAdjustments, saveStatementPeriod, type AccountingLineItem, type ManualAdjustmentRow } from "../../firebase/accounting";
import { getInvoiceIntakeStatus, retryInvoiceIntakeAi, type InvoiceIntakeStatus } from "../../firebase/ai";
import { appCheckConfigured, firebaseAuth, firebaseConfigured, firebaseStorage } from "../../firebase/client";
import { sqlConnectConfigured } from "../../firebase/data-connect";
import { invoicePhotoFileError, uploadInvoicePhotos } from "../../firebase/uploads";
import { classifyInvoice, invoiceLineItemsSubtotalCents, validateInvoiceLineItemsForCommit } from "../../lib/invoice-processing.mjs";
import { DecisionJsonError, parseDecisionExceptions, serializeDecisionChecks, serializeDecisionExceptions } from "../../lib/decision-json.mjs";
import { filterTransactionsByStatus, transactionStatusFilterCounts, TRANSACTION_STATUS_FILTERS } from "../../lib/transaction-filters.mjs";
import { INVOICE_CLIENT_VERSION } from "../../lib/invoice-client-version.mjs";
import { AUDIT_ACTIONS, auditDetails, parseAuditDetails } from "../../lib/audit-events.mjs";
import { clearCaptureDraft, loadCaptureDraft, saveCaptureDraft } from "../../lib/capture-queue.mjs";
import { buildProjectImportPlan, parseProjectImportJson, PROJECT_IMPORT_MAX_BYTES } from "../../lib/project-import.mjs";
import { buildStatementImportBatch, confirmManualMatch, finalizeStatementImport, normalizeMerchantAliasRows, parseStatementImport, reconcileStatement, RECONCILIATION_STATUSES, setLineReconciliationStatus } from "../../lib/reconciliation.mjs";
import { buildPersistedReconciliation } from "../../lib/reconciliation-server.mjs";
import { DEMO_STATEMENT_IMPORTS } from "../../lib/reconciliation-fixtures.mjs";
import { buildReconciliationExcelXml, reconciliationExportFileName } from "../../lib/reconciliation-export.mjs";
import { accountingReportFileName, buildAccountingReportXlsx } from "../../lib/report-export.mjs";
import { buildAccountingTemplateReport } from "../../lib/accounting-template-report.mjs";
import { uniqueCreditCards } from "../../lib/credit-card-selection.mjs";
import { normalizeManualAdjustmentRows, serializeManualAdjustmentRows } from "../../lib/manual-adjustments.mjs";
import { buildTaxSummaryByHolder } from "../../lib/accounting-report.mjs";
import { createClientId } from "../../lib/client-id.mjs";
import { useFirebaseIdentity, type AppRole } from "./FirebaseShell";

type Role = AppRole;
type View = "dashboard" | "transactions" | "reconciliation" | "reports" | "archives" | "settings" | "intakes" | "debug" | "capture" | "transaction";
type ClientVersionState = "checking" | "current" | "obsolete" | "unavailable";
type DiagnosticSnapshot = {
  environment: string;
  deployedCommit: string;
  clientVersion: string;
  minimumClientVersion: string;
  firebase: string;
  storage: string;
  gemini: string;
  transactionCount: number | string;
  reviewInvoiceCount: number | string;
  processingDepositCount: number | string;
  failedProcessingCount: number | string;
  lastProcessingAt: string | null;
  lastApplicationError: { message: string; at: string | null } | null;
};
type ArchiveSummary = {
  storageObjects: number;
  storageBytes: number;
  eligiblePhotos: number;
  eligibleBytes: number;
  eligibleInvoices: number;
  eligibleReceipts: number;
  unlinkedStorageObjects: number;
  missingLinkedPhotos: number;
  duplicateLinkedPaths: number;
};
type ArchiveApiResponse = {
  ok?: boolean;
  error?: string;
  generatedAt?: string;
  archiveId?: string;
  manifestHash?: string;
  summary?: ArchiveSummary;
};
type TransactionStatusFilter = "Toutes" | "À vérifier" | "À valider" | "Validées" | "Non rapprochées";
type TransactionStatusCounts = Record<TransactionStatusFilter, number>;
const transactionStatusFilters = TRANSACTION_STATUS_FILTERS as TransactionStatusFilter[];

type Transaction = {
  id: string;
  date: string;
  vendor: string;
  submittedBy: string;
  person: string;
  card: string;
  periodId?: string;
  project: string;
  projectId?: string;
  projectNumber?: string;
  projectName?: string;
  accountId?: string;
  accountNumber?: string;
  accountLabel?: string;
  category: string;
  subtotal: number;
  tps: number;
  tvq: number;
  total: number;
  status: "À vérifier" | "À valider" | "Validée";
  processingStatus?: string;
  accountingStatus?: string;
  reconciliation: "Non rapprochée" | "Rapprochée" | "Facture manquante";
  issue?: string;
  correction?: string;
  imageCount: number;
  invoiceId?: string;
  receiptId?: string;
  storageFolder?: string;
  photoPaths?: Array<{ storagePath: string; contentType: string; sequence: number }>;
  invoiceNumber: string;
  note: string;
  sku?: string;
  lineItems?: AccountingLineItem[];
  correctionField?: "subtotal" | "account" | "attachment";
};

const MAX_CAPTURE_PHOTOS = 5;
const MAX_CAPTURE_TOTAL_BYTES = 40 * 1024 * 1024;

type PhotoItem = {
  id: string;
  url: string;
  name: string;
  file: File;
};

type AccountCategory = {
  id: string;
  number: string;
  /** UI compatibility alias; relations and persistence use id, while number is the business key. */
  code: string;
  label: string;
  type: string;
  status?: string;
};

type CreditCard = {
  id: string;
  lastFour: string;
  holderId?: string;
  holder: string;
  function: string;
  startDate: string;
  endDate?: string;
  status: "Actif" | "Inactif";
};

type UserProfile = {
  id: string;
  firebaseUid?: string | null;
  displayName: string;
  email?: string | null;
  jobTitle?: string | null;
  role: string;
  status: string;
  invitationStatus?: string | null;
  invitationSentAt?: string | null;
  invitationSentBy?: string | null;
  lastInvitationError?: string | null;
  activatedAt?: string | null;
  authAccount?: boolean;
  authState?: string;
};

type CardPeriod = {
  id: string;
  label: string;
  start: string;
  end: string;
  statementLabel: string;
  manualAdjustmentRows?: ManualAdjustmentRow[];
  status?: string;
};

type ProjectReference = {
  id: string;
  number: string;
  name: string;
  status?: string;
};

type StatementLine = {
  id: string;
  sequence: number;
  transactionDate: string;
  postedDate?: string | null;
  merchantRaw: string;
  merchantNormalized: string;
  amountCents: number;
  externalReference?: string | null;
  status: string;
  rawData?: string;
};

type CreditCardStatement = {
  id: string;
  cardId: string;
  holderId?: string | null;
  holderNameSnapshot?: string | null;
  periodStart: string;
  periodEnd: string;
  originalStoragePath?: string | null;
  originalFilename: string;
  importedAt?: string | null;
  importedBy?: string | null;
  statementHash: string;
  status: string;
  lineCount: number;
  totalAmountCents: number;
  lines: StatementLine[];
};

type SkuReference = {
  merchant: string;
  sku: string;
  label: string;
  category: string;
  accountCode: string;
  status: "Validé" | "À confirmer";
};

type InvoiceIntake = {
  receiptId: string;
  uploaderUid: string;
  storageFolder: string;
  photoCount: number;
  status: string;
  processingStatus?: string;
  processingState?: string;
  processingAttempts?: number;
  reviewRevision?: number;
  accountingStatus?: string;
  lastError?: string;
  aiModel?: string;
  aiConfidence?: number;
  extractedVendor?: string;
  extractedInvoiceNumber?: string;
  extractedInvoiceDate?: string;
  extractedSubtotalCents?: string;
  extractedTpsCents?: string;
  extractedTvqCents?: string;
  extractedTotalCents?: string;
  extractedCurrency?: string;
  extractedSku?: string;
  extractedCategory?: string;
  extractedProjectId?: string;
  classificationAccountCode?: string;
  classificationCategory?: string;
  classificationSource?: string;
  classificationConfidence?: number;
  classificationStatus?: string;
  lineItems?: AccountingLineItem[];
  aiNotes?: string;
  decisionExceptions?: string;
  decisionChecks?: string;
  createdAt: string;
  updatedAt: string;
};

type AuditEventRecord = {
  id: string;
  actorUid?: string | null;
  actorRole?: string | null;
  actor?: { displayName?: string | null; role?: string | null } | null;
  action: string;
  entityType: string;
  entityId: string;
  details?: string | null;
  createdAt: string;
};

const accountCategories: AccountCategory[] = [
  { id: "DEMO-ACCOUNT-90001", number: "DEMO-90001", code: "DEMO-90001", label: "Matériaux Démo", type: "EXPENSE", status: "ACTIVE" },
  { id: "DEMO-ACCOUNT-90002", number: "DEMO-90002", code: "DEMO-90002", label: "Carburant Démo", type: "EXPENSE", status: "ACTIVE" },
  { id: "DEMO-ACCOUNT-90003", number: "DEMO-90003", code: "DEMO-90003", label: "Équipement Démo", type: "EXPENSE", status: "ACTIVE" },
  { id: "DEMO-ACCOUNT-TPS", number: "DEMO-TPS", code: "DEMO-TPS", label: "TPS Démo", type: "TAX", status: "ACTIVE" },
  { id: "DEMO-ACCOUNT-TVQ", number: "DEMO-TVQ", code: "DEMO-TVQ", label: "TVQ Démo", type: "TAX", status: "ACTIVE" },
];

const creditCards: CreditCard[] = [
  { id: "DEMO-CARD-001", holderId: "DEMO-USER-WORKER", lastFour: "9001", holder: "Alice Démo", function: "Travailleuse démo", startDate: "2026-01-01", status: "Actif" },
  { id: "DEMO-CARD-002", holderId: "DEMO-USER-KIM", lastFour: "9002", holder: "Benoît Démo", function: "Comptabilité démo", startDate: "2026-01-01", status: "Actif" },
];

const demoUserProfiles: UserProfile[] = [
  { id: "DEMO-USER-WORKER", firebaseUid: "demo-worker", displayName: "Alice Démo", email: "worker.demo@example.test", jobTitle: "Travailleuse démo", role: "WORKER", status: "ACTIVE" },
  { id: "DEMO-USER-KIM", firebaseUid: "demo-kim", displayName: "Benoît Démo", email: "kim.demo@example.test", jobTitle: "Comptabilité démo", role: "KIM", status: "ACTIVE" },
  { id: "DEMO-USER-ADMIN", firebaseUid: "demo-admin", displayName: "Chloé Démo", email: "admin.demo@example.test", jobTitle: "Administration démo", role: "ADMIN", status: "ACTIVE" },
];

const cardPeriods: CardPeriod[] = [
  { id: "DEMO-2026-08", label: "Période Démo · 10 août → 9 septembre 2026", start: "2026-08-10", end: "2026-09-09", statementLabel: "Relevé Démo · cycle du 10 au 9" },
  { id: "DEMO-2026-07", label: "Période Démo · 10 juillet → 9 août 2026", start: "2026-07-10", end: "2026-08-09", statementLabel: "Relevé Démo · cycle du 10 au 9" },
];

const emptyProductionPeriod: CardPeriod = {
  id: "custom",
  label: "Période personnalisée",
  start: "2026-08-10",
  end: "2026-09-09",
  statementLabel: "Relevé · période personnalisée",
};

function periodForLoadedTransactions(transactions: Array<Pick<Transaction, "date">>): CardPeriod {
  const dates = transactions.map((transaction) => transaction.date).filter(Boolean).sort();
  if (!dates.length) return emptyProductionPeriod;
  const start = dates[0];
  const end = dates[dates.length - 1];
  return {
    id: "custom",
    label: dates.length === 1 ? `Transaction chargée · ${formatDate(start)}` : `Transactions chargées · ${formatDate(start)} → ${formatDate(end)}`,
    start,
    end,
    statementLabel: "Période personnalisée · transactions chargées",
  };
}

const skuReferences: SkuReference[] = [
  { merchant: "Quincaillerie Démo", sku: "DEMO-SKU-001", label: "Bloc de démonstration", category: "Matériaux Démo", accountCode: "DEMO-90001", status: "Validé" },
];

const projectReferences: ProjectReference[] = [
  { id: "DEMO-PROJET-001", number: "DEMO-001", name: "Chantier Démo A", status: "ACTIVE" },
  { id: "DEMO-PROJET-002", number: "DEMO-002", name: "Chantier Démo B", status: "ACTIVE" },
  { id: "DEMO-ADMIN", number: "DEMO-ADMIN", name: "Administration Démo", status: "ACTIVE" },
];

const demoIntakes: InvoiceIntake[] = [
  {
    receiptId: "DEMO-INTAKE-REVIEW-001",
    uploaderUid: "DEMO-USER-WORKER",
    storageFolder: "receipts/demo/DEMO-INTAKE-REVIEW-001",
    photoCount: 0,
    status: "NEEDS_REVIEW",
    processingStatus: "NEEDS_REVIEW",
    accountingStatus: "NOT_POSTED",
    aiModel: "demo-mock",
    aiConfidence: 0.62,
    extractedVendor: "Matériaux Démo",
    extractedInvoiceNumber: "DEMO-FACT-006",
    extractedInvoiceDate: "2026-08-20",
    extractedSubtotalCents: "12700",
    extractedTpsCents: "635",
    extractedTvqCents: "1263",
    extractedTotalCents: "14698",
    extractedCurrency: "CAD",
    extractedSku: "DEMO-SKU-INCONNU",
    extractedCategory: "Matériaux divers",
    extractedProjectId: "DEMO-PROJET-INCONNU",
    classificationCategory: "Matériaux divers",
    classificationSource: "DEMO_MOCK",
    classificationConfidence: 0.62,
    classificationStatus: "UNRESOLVED",
    decisionExceptions: serializeDecisionExceptions([
      { code: "MISSING_ACCOUNT", fieldName: "accountCode", message: "Un compte comptable doit être confirmé.", aiValue: null, suggestedValue: null, status: "OPEN" },
      { code: "UNKNOWN_PROJECT", fieldName: "projectId", message: "Projet introuvable — sélectionnez le chantier correspondant.", aiValue: "DEMO-PROJET-INCONNU", suggestedValue: null, status: "OPEN" },
      { code: "TAX_MISMATCH", fieldName: "totalCents", message: "Le total ne correspond pas au sous-total et aux taxes extraites.", aiValue: "146,98 $", suggestedValue: "145,98 $", status: "OPEN" },
      { code: "LOW_CONFIDENCE", fieldName: "confidence", message: "La confiance du résultat démo est inférieure au seuil.", aiValue: "0.62", suggestedValue: "Vérification manuelle", status: "OPEN" },
    ]),
    decisionChecks: serializeDecisionChecks([{ code: "AI_CONFIDENCE", passed: false, message: "Scénario démo volontairement incomplet pour une revue manuelle." }]),
    aiNotes: "Donnée entièrement fictive : corriger le compte, le projet et confirmer les taxes avant toute écriture.",
    createdAt: "2026-08-20T13:30:00.000Z",
    updatedAt: "2026-08-20T13:30:00.000Z",
  },
];

type AppData = {
  users: UserProfile[];
  accounts: AccountCategory[];
  cards: CreditCard[];
  periods: CardPeriod[];
  projects: ProjectReference[];
  skuReferences: SkuReference[];
  transactions: Transaction[];
  intakes: InvoiceIntake[];
};

const AppDataContext = createContext<AppData | null>(null);

function classifyTransaction(transaction: Pick<Transaction, "category" | "sku"> & Partial<Pick<Transaction, "vendor">>, data: AppData = demoAppData) {
  const classification = classifyInvoice(
    { category: transaction.category, sku: transaction.sku, vendor: transaction.vendor ?? "" },
    data.skuReferences,
    data.accounts,
  );
  return {
    code: classification.accountCode ?? "—",
    category: classification.category,
  };
}

const transactions: Transaction[] = [
  {
    id: "DEMO-TX-001",
    date: "2026-08-10",
    vendor: "Quincaillerie Démo",
    submittedBy: "Alice Démo",
    person: "Alice Démo",
    card: "9001",
    periodId: "DEMO-2026-08",
    project: "DEMO-PROJET-001 · Chantier Démo A",
    category: "Matériaux Démo",
    subtotal: 100,
    tps: 5,
    tvq: 9.98,
    total: 114.98,
    status: "À vérifier",
    reconciliation: "Non rapprochée",
    issue: "Montant fictif à confirmer.",
    correction: "Valider les données de démonstration.",
    imageCount: 1,
    invoiceNumber: "DEMO-FACT-001",
    note: "Facture entièrement fictive.",
    sku: "DEMO-SKU-001",
    correctionField: "subtotal",
  },
  {
    id: "DEMO-TX-002",
    date: "2026-08-11",
    vendor: "Station Démo",
    submittedBy: "Alice Démo",
    person: "Alice Démo",
    card: "9001",
    periodId: "DEMO-2026-08",
    project: "DEMO-PROJET-002 · Chantier Démo B",
    category: "Carburant Démo",
    subtotal: 80,
    tps: 4,
    tvq: 7.98,
    total: 91.98,
    status: "Validée",
    reconciliation: "Rapprochée",
    imageCount: 1,
    invoiceNumber: "DEMO-FACT-002",
    note: "Transaction fictive validée.",
  },
  {
    id: "DEMO-TX-003",
    date: "2026-08-12",
    vendor: "Équipement Démo",
    submittedBy: "Benoît Démo",
    person: "Benoît Démo",
    card: "9002",
    periodId: "DEMO-2026-08",
    project: "DEMO-ADMIN · Administration Démo",
    category: "Équipement Démo",
    subtotal: 200,
    tps: 10,
    tvq: 19.95,
    total: 229.95,
    status: "À valider",
    reconciliation: "Non rapprochée",
    issue: "Référence fictive à confirmer.",
    correction: "Confirmer la catégorie de démonstration.",
    imageCount: 1,
    invoiceNumber: "DEMO-FACT-003",
    note: "Référence entièrement fictive.",
    sku: "DEMO-SKU-002",
    correctionField: "account",
  },
];

const demoAppData: AppData = {
  users: demoUserProfiles,
  accounts: accountCategories,
  cards: creditCards,
  periods: cardPeriods,
  projects: projectReferences,
  skuReferences,
  transactions,
  intakes: demoIntakes,
};

function useAppData() {
  return useContext(AppDataContext) ?? demoAppData;
}

const navItems: Array<{ id: View; label: string; icon: string }> = [
  { id: "intakes", label: "Factures à vérifier", icon: "!" },
  { id: "transactions", label: "Transactions", icon: "▤" },
  { id: "reports", label: "Tableau", icon: "▥" },
  { id: "archives", label: "Archives", icon: "▣" },
  { id: "settings", label: "Configuration", icon: "⚙" },
  { id: "debug", label: "Diagnostic", icon: "⌁" },
];

const currency = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" });
const dateFormat = new Intl.DateTimeFormat("fr-CA", { day: "2-digit", month: "short", year: "numeric" });
function formatCurrency(value: number) {
  return currency.format(value).replace("CA", "$");
}

function formatDate(value: string) {
  return dateFormat.format(new Date(`${value}T12:00:00`));
}

function formatBytes(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "—";
  if (value < 1024) return `${value} o`;
  const units = ["Ko", "Mo", "Go", "To"];
  let amount = value / 1024;
  let unit = 0;
  while (amount >= 1024 && unit < units.length - 1) {
    amount /= 1024;
    unit += 1;
  }
  return `${amount.toLocaleString("fr-CA", { maximumFractionDigits: 1 })} ${units[unit]}`;
}

function transactionAccountDisplay(transaction: Pick<Transaction, "lineItems" | "accountNumber" | "accountLabel">) {
  const lineCodes = Array.from(new Set((transaction.lineItems ?? []).map((item) => item.accountCode).filter(Boolean)));
  if (lineCodes.length > 1) return { number: "Ventilation", label: "Comptes par ligne" };
  if (lineCodes.length === 1) return { number: lineCodes[0], label: "Compte source de la ligne" };
  return { number: transaction.accountNumber ?? "—", label: transaction.accountLabel ?? "Compte à confirmer" };
}

function manualAdjustmentRowsForPeriod(period: CardPeriod) {
  if (Array.isArray(period.manualAdjustmentRows)) return normalizeManualAdjustmentRows(period.manualAdjustmentRows);
  return normalizeManualAdjustmentRows([]);
}

function manualAmountDraft(value: number | null | undefined) {
  return value == null ? "" : (Number(value) / 100).toFixed(2);
}

function manualAmountToCents(value: string) {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) return null;
  const amount = Number(normalized);
  return Number.isFinite(amount) ? Math.round(amount * 100) : null;
}

function isTransactionInPeriod(transaction: Pick<Transaction, "date" | "periodId">, period: CardPeriod) {
  return transaction.date >= period.start && transaction.date <= period.end &&
    (!transaction.periodId || period.id === "custom" || transaction.periodId === period.id);
}

function statusClass(status: Transaction["status"] | Transaction["reconciliation"]) {
  if (status === "Validée" || status === "Rapprochée") return "badge badge-success";
  if (status === "À vérifier" || status === "Facture manquante") return "badge badge-warning";
  return "badge badge-neutral";
}

function processingStatusOf(intake: InvoiceIntake) {
  // The legacy status is displayed only for compatibility elsewhere; it is
  // never allowed to drive the KIM queue or a posting decision.
  return intake.processingStatus ?? "PROCESSING";
}

function isIntakeException(intake: InvoiceIntake) {
  return processingStatusOf(intake) === "NEEDS_REVIEW" || intake.accountingStatus === "POSTING_ERROR";
}

function isIntakeQueueItem(intake: InvoiceIntake) {
  return isIntakeException(intake) || (processingStatusOf(intake) === "VALIDATED" && intake.accountingStatus === "NOT_POSTED");
}

type IntakeDecisionException = {
  code: string;
  fieldName?: string | null;
  message: string;
  aiValue?: string | null;
  suggestedValue?: string | null;
  status?: string;
};

const technicalIntakeExceptionCodes = new Set(["AI_PROCESSING_ERROR", "INVALID_DECISION_JSON"]);

function parseIntakeExceptions(intake: InvoiceIntake): IntakeDecisionException[] {
  try {
    return parseDecisionExceptions(intake.decisionExceptions) as IntakeDecisionException[];
  } catch (error) {
    const message = error instanceof DecisionJsonError ? error.message : "JSON de décision invalide; correction technique requise.";
    return [{ code: "INVALID_DECISION_JSON", fieldName: null, message, aiValue: null, suggestedValue: null, status: "OPEN" }];
  }
}

function isOptionalReviewException(exception: IntakeDecisionException) {
  return (exception.code === "MISSING_REQUIRED_FIELD" && exception.fieldName === "statementPeriodId") || exception.fieldName === "projectId";
}

function intakeCorrectionFields(intake: InvoiceIntake) {
  const fields = new Set<string>();
  for (const exception of parseIntakeExceptions(intake)) {
    if (isOptionalReviewException(exception)) continue;
    for (const fieldName of (exception.fieldName ?? "").split(/[/,]/)) {
      if (fieldName.trim()) fields.add(fieldName.trim());
    }
    if (exception.code === "TAX_MISMATCH") {
      fields.add("tpsCents");
      fields.add("tvqCents");
    }
  }
  return fields;
}

function intakeFieldLabel(fieldName?: string | null) {
  const labels: Record<string, string> = {
    vendor: "le fournisseur",
    invoiceNumber: "le numéro de facture",
    invoiceDate: "la date de facture",
    subtotalCents: "le sous-total",
    totalCents: "le total",
    tpsCents: "la TPS",
    tvqCents: "la TVQ",
    sku: "le SKU",
    accountCode: "le compte comptable",
    cardId: "la carte utilisée",
    projectId: "le chantier / projet",
    statementPeriodId: "la période du relevé",
    confidence: "les informations extraites",
  };
  return fieldName ? labels[fieldName] ?? "ce champ" : "les informations proposées";
}

function humanizeIntakeException(exception: IntakeDecisionException) {
  switch (exception.code) {
    case "UNKNOWN_PROJECT":
      return "Projet introuvable — sélectionnez le chantier correspondant.";
    case "LOW_CONFIDENCE":
      return "Informations incertaines — vérifiez les champs proposés.";
    case "MISSING_ACCOUNT":
      return "Compte comptable manquant — choisissez le compte approprié.";
    case "ACCOUNT_SUGGESTION_REVIEW":
      return "Compte comptable suggéré — confirmez ou corrigez le compte.";
    case "AMBIGUOUS_ACCOUNT":
      return "Plusieurs comptes sont possibles — choisissez le compte approprié.";
    case "UNKNOWN_CARD":
      return "Carte utilisée non détectée — si votre carte personnelle n’apparaît pas, ajoutez-la dans Configuration.";
    case "AMBIGUOUS_CARD":
      return "Plusieurs cartes correspondent — choisissez la carte utilisée.";
    case "UNKNOWN_SKU":
      return "Article non reconnu — vérifiez le SKU ou la catégorie.";
    case "POSSIBLE_DUPLICATE":
      return "Doublon potentiel — confirmez qu’il s’agit bien d’une nouvelle facture.";
    case "TOTAL_MISMATCH":
      return "Total incohérent — vérifiez le sous-total et les taxes.";
    case "TAX_MISMATCH":
      return "Taxes incohérentes — vérifiez la TPS et la TVQ.";
    case "INVALID_DATE":
      return "Date de facture invalide — corrigez la date.";
    case "MISSING_REQUIRED_FIELD":
      return `${intakeFieldLabel(exception.fieldName)} est requis — complétez cette information.`;
    case "INVALID_DECISION_JSON":
    case "AI_PROCESSING_ERROR":
      return "Vérification manuelle requise — complétez ou corrigez les informations de la facture.";
    default:
      return `${intakeFieldLabel(exception.fieldName)} à vérifier — corrigez la valeur proposée.`;
  }
}

function intakeReviewMessages(intake: InvoiceIntake) {
  const exceptions = parseIntakeExceptions(intake);
  const actionableExceptions = exceptions.filter((exception) => !isOptionalReviewException(exception));
  const businessMessages = actionableExceptions
    .filter((exception) => !technicalIntakeExceptionCodes.has(exception.code))
    .map(humanizeIntakeException);
  if (businessMessages.length) return Array.from(new Set(businessMessages));
  if (intake.accountingStatus === "POSTING_ERROR") return ["L’écriture comptable n’a pas été créée — vérifiez les informations et réessayez."];
  if (actionableExceptions.length || intake.lastError) return ["Vérification manuelle requise — complétez ou corrigez les informations de la facture."];
  return [];
}

export function ThibeaultApp({ initialRole = "ADMIN" }: { initialRole?: Role }) {
  void Dashboard;
  void ReconciliationPage;
  void ReportsPage;
  const identity = useFirebaseIdentity();
  const isPreviewMode = process.env.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE === "true";
  const isLocalEmulatorMode = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "demo-facture-thibeault" && process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true";
  const isAccountingDataSource = accountingReadSource === "firebase-sql-connect" && !isPreviewMode;
  const isProductionDataSource = isAccountingDataSource && !isLocalEmulatorMode;
  const accountRole = firebaseConfigured && !isPreviewMode ? identity.role : initialRole;
  const canUseAccounting = accountRole === "KIM" || accountRole === "ADMIN";
  const canUseDiagnostics = accountRole === "ADMIN";
  const [appData, setAppData] = useState<AppData>(demoAppData);
  const [dataSourceState, setDataSourceState] = useState<"demo" | "loading" | "ready" | "error">(isAccountingDataSource ? "loading" : "demo");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [viewMode, setViewMode] = useState<"accounting" | "capture">(accountRole === "WORKER" || initialRole === "WORKER" ? "capture" : "accounting");
  const [view, setView] = useState<View>(accountRole === "WORKER" || initialRole === "WORKER" ? "capture" : "intakes");
  const [selectedId, setSelectedId] = useState<string>(appData.transactions[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatusFilter>("Toutes");
  const [selectedPeriod, setSelectedPeriod] = useState<CardPeriod>(isAccountingDataSource ? emptyProductionPeriod : appData.periods[0]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [draftReceiptId, setDraftReceiptId] = useState<string | null>(null);
  const [queueState, setQueueState] = useState<"idle" | "uploading" | "sent">("idle");
  const [submittedReceipt, setSubmittedReceipt] = useState<InvoiceIntakeStatus | null>(null);
  // Node 22 exposes a navigator object during SSR, but navigator.onLine can be
  // undefined there. Treat only an explicit false as offline so the server
  // render does not incorrectly show a disconnected capture screen.
  const [isOnline, setIsOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine !== false);
  const [clientVersionState, setClientVersionState] = useState<ClientVersionState>(isProductionDataSource ? "checking" : "current");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const serviceWorkerRegistrationRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!isAccountingDataSource || !canUseAccounting) return;
    let active = true;
    loadAccountingSnapshot()
      .then((snapshot) => {
        if (!active) return;
        const mappedData = mapAccountingSnapshot(snapshot);
        const nextData = isLocalEmulatorMode ? mappedData : removeDemoAccountingData(mappedData);
        setAppData(nextData);
        setSelectedId((current) => nextData.transactions.some((transaction) => transaction.id === current) ? current : (nextData.transactions[0]?.id ?? ""));
        setSelectedPeriod((current) => {
          const matchingPeriod = nextData.periods.find((period) => period.id === current.id);
          if (matchingPeriod) return matchingPeriod;
          if (nextData.periods[0]) return nextData.periods[0];
          return current.start === emptyProductionPeriod.start && current.end === emptyProductionPeriod.end
            ? periodForLoadedTransactions(nextData.transactions)
            : current;
        });
        setDataSourceState("ready");
      })
      .catch(() => {
        if (active) setDataSourceState("error");
      });
    return () => {
      active = false;
    };
  }, [canUseAccounting, isAccountingDataSource, isLocalEmulatorMode, loadAttempt]);

  useEffect(() => {
    const onOnline = () => {
      setIsOnline(true);
      setToast("Connexion rétablie. Votre brouillon est prêt à être envoyé.");
    };
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    let active = true;
    void loadCaptureDraft().then(async (draft) => {
      if (!active || !draft?.receiptId || !Array.isArray(draft.photos) || !draft.photos.length) return;
      const restored = await Promise.all(draft.photos.map(async (photo: { id: string; name: string; file: File }) => ({
        id: photo.id,
        name: photo.name,
        file: photo.file,
        url: await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.readAsDataURL(photo.file);
        }),
      })));
      if (!active) return;
      setDraftReceiptId(draft.receiptId);
      setPhotos(restored);
      setToast("Brouillon de facture restauré sur cet appareil.");
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!photos.length || !draftReceiptId) {
      if (!photos.length) void clearCaptureDraft();
      return;
    }
    void saveCaptureDraft(draftReceiptId, photos.map(({ id, name, file }) => ({ id, name, file }))).catch(() => undefined);
  }, [draftReceiptId, photos]);

  useEffect(() => {
    const receiptId = submittedReceipt?.receiptId;
    if (!isProductionDataSource || !receiptId || !firebaseAuth?.currentUser) return;
    let active = true;
    let timer: number | undefined;
    const poll = async () => {
      try {
        const next = await getInvoiceIntakeStatus(receiptId);
        if (!active) return;
        setSubmittedReceipt(next);
        const terminal = next.state.accountingStatus === "POSTED" || ["NEEDS_REVIEW", "AI_ERROR", "REJECTED", "VALIDATED"].includes(next.state.processingStatus);
        if (!terminal) timer = window.setTimeout(() => void poll(), 5000);
      } catch {
        if (active) timer = window.setTimeout(() => void poll(), 10000);
      }
    };
    void poll();
    return () => {
      active = false;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [isProductionDataSource, submittedReceipt?.receiptId]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let reloading = false;
    const onControllerChange = () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    const updateRegistration = async () => {
      const registration = await navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });
      serviceWorkerRegistrationRef.current = registration;
      await registration.update();
    };
    void updateRegistration().catch(() => undefined);
    const interval = window.setInterval(() => void serviceWorkerRegistrationRef.current?.update().catch(() => undefined), 5 * 60 * 1000);
    return () => {
      window.clearInterval(interval);
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  useEffect(() => {
    if (!isProductionDataSource) return;
    let active = true;
    const checkVersion = async () => {
      try {
        const response = await fetch(`/api/client-version?invoiceClientVersion=${encodeURIComponent(INVOICE_CLIENT_VERSION)}`, {
          cache: "no-store",
          headers: { "x-invoice-client-version": INVOICE_CLIENT_VERSION },
        });
        if (!active) return;
        setClientVersionState(response.ok ? "current" : response.status === 426 ? "obsolete" : "unavailable");
      } catch {
        if (active) setClientVersionState("unavailable");
      }
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") void checkVersion();
    };
    const onOnline = () => void checkVersion();
    void checkVersion();
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("online", onOnline);
    const interval = window.setInterval(() => void checkVersion(), 5 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("online", onOnline);
    };
  }, [isProductionDataSource]);

  const selected = appData.transactions.find((transaction) => transaction.id === selectedId) ?? appData.transactions[0] ?? null;
  const searchableTransactions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return appData.transactions.filter((transaction) => {
      const matchesQuery = !normalizedQuery || [transaction.vendor, transaction.person, transaction.project, transaction.category, transaction.id].join(" ").toLowerCase().includes(normalizedQuery);
      return matchesQuery;
    });
  }, [appData.transactions, query]);

  const transactionStatusCounts = useMemo(
    () => transactionStatusFilterCounts(searchableTransactions) as TransactionStatusCounts,
    [searchableTransactions],
  );
  const filteredTransactions = useMemo(
    () => filterTransactionsByStatus(searchableTransactions, statusFilter),
    [searchableTransactions, statusFilter],
  );

  const dataSourceLabel = dataSourceState === "ready"
    ? "Firebase SQL Connect"
    : dataSourceState === "loading"
      ? "Connexion Firebase…"
      : dataSourceState === "error"
        ? "Firebase indisponible"
        : "Données de démonstration";

  const retryAccounting = () => {
    setDataSourceState("loading");
    setLoadAttempt((attempt) => attempt + 1);
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const selectedFiles = Array.from(input.files ?? []);
    input.value = "";
    if (!selectedFiles.length) return;

    const availableSlots = MAX_CAPTURE_PHOTOS - photos.length;
    if (availableSlots <= 0) {
      notify(`Maximum ${MAX_CAPTURE_PHOTOS} photos par facture.`);
      return;
    }

    let totalBytes = photos.reduce((total, photo) => total + photo.file.size, 0);
    const acceptedFiles: File[] = [];
    let invalidCount = 0;
    let tooLargeCount = 0;
    let skippedCount = 0;

    for (const file of selectedFiles) {
      if (acceptedFiles.length >= availableSlots) {
        skippedCount += 1;
        continue;
      }
      if (invoicePhotoFileError(file)) {
        invalidCount += 1;
        continue;
      }
      if (totalBytes + file.size > MAX_CAPTURE_TOTAL_BYTES) {
        tooLargeCount += 1;
        continue;
      }
      acceptedFiles.push(file);
      totalBytes += file.size;
    }

    const nextPhotos = await Promise.all(acceptedFiles.map((file) => new Promise<PhotoItem | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ id: `${file.name}-${file.lastModified}-${createClientId()}`, url: String(reader.result), name: file.name, file });
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    })));
    const readyPhotos = nextPhotos.filter((photo): photo is PhotoItem => photo !== null);
    if (readyPhotos.length > 0) {
      if (!photos.length) setDraftReceiptId(createClientId());
      setPhotos((current) => [...current, ...readyPhotos].slice(0, MAX_CAPTURE_PHOTOS));
    }

    const notices = [
      invalidCount ? `${invalidCount} fichier${invalidCount > 1 ? "s" : ""} ignoré${invalidCount > 1 ? "s" : ""} : format non pris en charge.` : "",
      tooLargeCount ? `${tooLargeCount} fichier${tooLargeCount > 1 ? "s" : ""} ignoré${tooLargeCount > 1 ? "s" : ""} : limite totale de 40 Mo dépassée.` : "",
      skippedCount ? `${skippedCount} fichier${skippedCount > 1 ? "s" : ""} ignoré${skippedCount > 1 ? "s" : ""} : maximum de ${MAX_CAPTURE_PHOTOS} photos.` : "",
    ].filter(Boolean);
    if (notices.length) notify(notices.join(" "));
    if (!readyPhotos.length && !notices.length) notify("Aucune photo n’a pu être ajoutée.");
  };

  const sendPhotos = async () => {
    if (!photos.length) return;
    if (queueState === "uploading") return;
    if (isProductionDataSource && clientVersionState !== "current") {
      notify("Actualisez l’application avant d’envoyer cette facture.");
      return;
    }
    if (!isOnline) {
      notify("En attente d'envoi — les photos restent sur cet appareil.");
      return;
    }
    if (isProductionDataSource && firebaseConfigured) {
      setQueueState("uploading");
      try {
        const receipt = await uploadInvoicePhotos(
          photos.map((photo, index) => ({ file: photo.file, sequence: index + 1 })),
          draftReceiptId ?? createClientId(),
        );
        setPhotos([]);
        setDraftReceiptId(null);
        await clearCaptureDraft();
        setSubmittedReceipt({
          ok: true,
          receiptId: receipt.receiptId,
          state: {
            processingStatus: "PROCESSING",
            processingState: "QUEUED",
            processingAttempts: 0,
            lastAttemptAt: null,
            accountingStatus: "NOT_POSTED",
            lastError: null,
            aiErrorCode: null,
          },
        });
        setQueueState("idle");
        notify(`Facture reçue · ${receipt.receiptId.slice(0, 8)} ✓ Vous pouvez en déposer une autre.`);
        notify(`Facture ${receipt.receiptId.slice(0, 8)} reçue · analyse IA planifiée côté serveur.`);
      } catch (error) {
        setQueueState("idle");
        notify(error instanceof Error ? error.message : "L’envoi Firebase a échoué.");
      }
      return;
    }

    setQueueState("uploading");
    window.setTimeout(() => {
      setPhotos([]);
      setDraftReceiptId(null);
      void clearCaptureDraft();
      setQueueState("idle");
      notify("Facture prête ✓ Vous pouvez en déposer une autre.");
    }, 1000);
  };

  const goTo = (nextView: View) => {
    const resolvedView: View = nextView === "dashboard" || nextView === "reconciliation" ? "intakes" : nextView;
    if (resolvedView === "debug" && !canUseDiagnostics) return;
    if (resolvedView !== "capture" && !canUseAccounting) return;
    setView(resolvedView);
    setViewMode(resolvedView === "capture" ? "capture" : "accounting");
  };

  const refreshApplication = () => {
    void serviceWorkerRegistrationRef.current?.update().finally(() => window.location.reload());
    if (!serviceWorkerRegistrationRef.current) window.location.reload();
  };

  if (isProductionDataSource && clientVersionState !== "current") {
    return <ClientVersionGate state={clientVersionState} onRefresh={refreshApplication} />;
  }

  if (!accountRole && firebaseConfigured) {
    return <RoleLoading />;
  }

  if (accountRole === "WORKER" || viewMode === "capture") {
    return (
      <main className="worker-shell">
        <div className="worker-topbar">
          <div className="brand-mark compact"><img className="brand-logo worker-logo" src="/brand-mbj-thibeault.png" alt="MBJ Thibeault" /></div>
          {canUseAccounting ? <button className="ghost-button worker-status" onClick={() => goTo("intakes")} aria-label="Retourner aux factures à vérifier">Retour au contrôle</button> : <span className="worker-status">Dépôt sécurisé</span>}
        </div>
        <section className="capture-stage">
          <div className="capture-intro">
            <div>
              <p className="eyebrow">Dépôt de facture</p>
              <h1>Photographier, envoyer.</h1>
              <p className="muted">Aucune information comptable à saisir.</p>
            </div>
            <div className={`connection-pill ${isOnline ? "online" : "offline"}`}><span className="status-dot" />{isOnline ? "En ligne" : "Hors ligne"}</div>
          </div>
          <div className="camera-card">
            <div className="camera-placeholder">
              <div className="camera-reticle"><span>＋</span></div>
              <p>{photos.length ? `${photos.length} page${photos.length > 1 ? "s" : ""} prête${photos.length > 1 ? "s" : ""}` : "Prêt pour la première page"}</p>
              <span className="camera-hint">Prenez une photo maintenant ou ajoutez des photos déjà prises. Vous pouvez sélectionner jusqu’à {MAX_CAPTURE_PHOTOS} pages avant l’envoi.</span>
            </div>
            <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={handleFiles} />
            <input ref={galleryInputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFiles} />
            <div className="capture-actions">
              <button className="capture-button" onClick={() => inputRef.current?.click()} disabled={photos.length >= MAX_CAPTURE_PHOTOS} aria-label={photos.length ? "Ajouter une page avec la caméra" : "Prendre la première photo"}><span>⌾</span> {photos.length ? "Ajouter avec la caméra" : "Prendre une photo"}</button>
              <button className="gallery-button" onClick={() => galleryInputRef.current?.click()} disabled={photos.length >= MAX_CAPTURE_PHOTOS} aria-label="Choisir plusieurs photos dans la galerie"><span>▧</span> Ajouter depuis la galerie</button>
            </div>
          </div>
          {photos.length > 0 && (
            <div className="photo-tray">
              <div className="tray-heading"><span>Pages de cette facture</span><button className="text-button" onClick={() => { setPhotos([]); setDraftReceiptId(null); }}>Recommencer</button></div>
              <div className="photo-grid">
                {photos.map((photo, index) => <div className="photo-thumb" key={photo.id}><PhotoPreview url={photo.url} alt={`Page ${index + 1}`} /><span>{index + 1}</span><button onClick={() => setPhotos((current) => { const next = current.filter((item) => item.id !== photo.id); if (!next.length) setDraftReceiptId(null); return next; })} aria-label={`Supprimer la photo ${index + 1}`}>×</button></div>)}
              </div>
              <button className="send-button" onClick={sendPhotos} disabled={queueState === "uploading" || clientVersionState !== "current"}>{queueState === "uploading" ? "Envoi de la facture…" : isOnline ? "Envoyer la facture" : "Mettre en attente"}</button>
            </div>
          )}
          {!isOnline && <div className="offline-notice"><span className="notice-icon">↯</span><div><strong>En attente d’envoi</strong><p>Vos photos restent sur cet appareil et seront reprises dès que le réseau revient.</p></div></div>}
          {submittedReceipt && <div className="offline-notice" aria-live="polite"><span className="notice-icon">✓</span><div><strong>Facture {submittedReceipt.receiptId.slice(0, 8)} · {intakeStatusLabel(submittedReceipt.state.processingStatus)}</strong><p>{submittedReceipt.state.accountingStatus === "POSTED" ? "Écriture comptable créée." : submittedReceipt.state.lastError ?? `Traitement serveur · tentative ${submittedReceipt.state.processingAttempts}.`}</p></div></div>}
        </section>
        {toast && <div className="toast">{toast}</div>}
      </main>
    );
  }

  if (isAccountingDataSource && dataSourceState === "loading") {
    return <AccountingDataLoading />;
  }

  if (isAccountingDataSource && dataSourceState === "error") {
    return <AccountingDataError onRetry={retryAccounting} />;
  }

  return (
    <AppDataContext.Provider value={appData}>
      <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block brand-block-logo"><div className="brand-logo-frame"><img className="brand-logo" src="/brand-mbj-thibeault.png" alt="MBJ Thibeault" /></div></div>
        <div className="workspace-switcher"><span className="avatar avatar-blue">K</span><div><strong>Kim / Administration</strong><span>Équipe dépenses</span></div><span className="chevron">⌄</span></div>
        <nav className="main-nav" aria-label="Navigation principale">
          {navItems.filter((item) => item.id !== "debug" || canUseDiagnostics).map((item) => <button key={item.id} className={`nav-item ${view === item.id ? "active" : ""}`} onClick={() => goTo(item.id)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.id === "intakes" && appData.intakes.filter(isIntakeQueueItem).length > 0 && <span className="nav-count">{appData.intakes.filter(isIntakeQueueItem).length}</span>}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="archive-mini"><span className="archive-icon">◷</span><div><strong>{isProductionDataSource ? "Archivage Storage" : "Archivage recommandé"}</strong><span>{isProductionDataSource ? "Statistiques en direct" : "Statistiques non disponibles"}</span></div><span className="arrow">→</span></div>{canUseAccounting && <button className="worker-mode-button" onClick={() => goTo("capture")}><span>⌾</span> Ouvrir le mode dépôt</button>}<div className="user-footer"><span className="avatar avatar-gold">{accountRole === "ADMIN" ? "A" : "K"}</span><div><strong>{accountRole === "ADMIN" ? "Administration" : "Kim"}</strong><span>{accountRole === "KIM" ? "Contrôle comptable" : "Administrateur"}</span></div><button className="icon-button" aria-label="Options du compte">•••</button></div></div>
      </aside>
      <section className="content-area">
        <header className="topbar"><div className="breadcrumbs"><span>Maçonnerie Thibeault</span><span>/</span><strong>{navItems.find((item) => item.id === view)?.label ?? (view === "transaction" ? "Transaction" : "Factures à vérifier")}</strong></div><div className="topbar-actions"><span className="demo-note">{dataSourceLabel}</span><button className="icon-button" aria-label="Notifications">♧<span className="notification-dot" /></button><button className="avatar avatar-gold small" onClick={() => goTo("capture")} aria-label="Ouvrir le mode dépôt">{accountRole === "ADMIN" ? "A" : "K"}</button></div></header>
        <div className="page-content">
          {view === "transactions" && <TransactionsPage items={filteredTransactions} query={query} setQuery={setQuery} statusFilter={statusFilter} statusCounts={transactionStatusCounts} setStatusFilter={setStatusFilter} onOpen={(id) => { setSelectedId(id); setView("transaction" as View); }} />}
          {view === "reports" && canUseAccounting && <KimAccountingReport key={`${selectedPeriod.id}:${selectedPeriod.start}:${selectedPeriod.end}`} period={selectedPeriod} onPeriodChange={setSelectedPeriod} />}
          {view === "archives" && <ArchivesPage onNotify={notify} isProductionDataSource={isProductionDataSource} />}
          {view === "settings" && <AdminDirectoryPage onDataChange={(patch) => setAppData((current) => ({ ...current, ...patch }))} role={accountRole ?? "ADMIN"} />}
          {view === "intakes" && canUseAccounting && <IntakeQueuePage period={selectedPeriod} items={appData.intakes.filter(isIntakeQueueItem)} onSaved={(receiptId, patch) => { setAppData((current) => ({ ...current, intakes: current.intakes.map((intake) => intake.receiptId === receiptId ? { ...intake, ...patch } : intake) })); if (patch.accountingStatus === "POSTED") retryAccounting(); }} />}
          {view === "debug" && canUseDiagnostics && <DebugPage dataSourceState={dataSourceState} onRetry={retryAccounting} role={accountRole ?? "ADMIN"} />}
          {(view as string) === "transaction" && selected && <TransactionDetail transaction={selected} onBack={() => setView("transactions")} onDeleted={(transactionId) => { setAppData((current) => ({ ...current, transactions: current.transactions.filter((item) => item.id !== transactionId) })); setSelectedId(""); setView("transactions"); setToast("Facture et écriture supprimées; les totaux ont été recalculés."); setLoadAttempt((current) => current + 1); }} />}
        </div>
      </section>
      {toast && <div className="toast">{toast}</div>}
      </main>
    </AppDataContext.Provider>
  );
}

function AccountingDataLoading() {
  return <main className="data-source-gate"><section className="data-source-card" aria-live="polite"><span className="eyebrow">Connexion sécurisée</span><h1>Chargement des données comptables</h1><p className="muted">Connexion à Firebase SQL Connect en cours. Les données de démonstration ne sont pas affichées en production.</p><span className="data-source-spinner" aria-hidden="true" /></section></main>;
}

function AccountingDataError({ onRetry }: { onRetry: () => void }) {
  return <main className="data-source-gate"><section className="data-source-card"><span className="eyebrow">Connexion requise</span><h1>Données comptables indisponibles</h1><p className="muted">Le connecteur de production n’a pas répondu. Vérifiez que l’utilisateur est authentifié et que le connecteur SQL Connect <strong>accounting</strong> est déployé dans Firebase.</p><div className="data-source-actions"><button className="primary-button" type="button" onClick={onRetry}>Réessayer</button><span className="data-source-help">Aucune donnée fictive n’est utilisée dans ce mode.</span></div></section></main>;
}

function RoleLoading() {
  return <main className="data-source-gate"><section className="data-source-card" aria-live="polite"><span className="eyebrow">Accès sécurisé</span><h1>Vérification des permissions</h1><p className="muted">Le rôle Firebase du compte est vérifié avant d’ouvrir les données de l’entreprise.</p><span className="data-source-spinner" aria-hidden="true" /></section></main>;
}

function DebugPage({ dataSourceState, onRetry, role }: { dataSourceState: "demo" | "loading" | "ready" | "error"; onRetry: () => void; role: Role }) {
  const identity = useFirebaseIdentity();
  const uid = identity.user?.uid ?? "Non disponible";
  const maskedUid = uid.length > 12 ? `${uid.slice(0, 6)}…${uid.slice(-4)}` : uid;
  const status = dataSourceState === "ready" ? "Opérationnel" : dataSourceState === "error" ? "Erreur" : dataSourceState === "loading" ? "Connexion en cours" : "Non configuré";
  const [diagnostic, setDiagnostic] = useState<DiagnosticSnapshot | null>(null);
  const [diagnosticState, setDiagnosticState] = useState<"idle" | "loading" | "error">("idle");
  const [serviceWorkerState, setServiceWorkerState] = useState("Non disponible");

  const loadDiagnostic = useCallback(async () => {
    if (!identity.user) return;
    setDiagnosticState("loading");
    try {
      const token = await identity.user.getIdToken();
      const response = await fetch("/api/admin/diagnostic", { headers: { authorization: `Bearer ${token}` }, cache: "no-store" });
      if (!response.ok) throw new Error("Diagnostic indisponible.");
      setDiagnostic(await response.json() as DiagnosticSnapshot);
      setDiagnosticState("idle");
    } catch {
      setDiagnosticState("error");
    }
  }, [identity.user]);

  useEffect(() => {
    const diagnosticTimer = window.setTimeout(() => void loadDiagnostic(), 0);
    if (!("serviceWorker" in navigator)) return;
    const refreshServiceWorker = async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      setServiceWorkerState(registration?.active ? "Actif" : registration?.installing ? "Installation" : "Non disponible");
    };
    void refreshServiceWorker();
    navigator.serviceWorker.addEventListener("controllerchange", refreshServiceWorker);
    return () => {
      window.clearTimeout(diagnosticTimer);
      navigator.serviceWorker.removeEventListener("controllerchange", refreshServiceWorker);
    };
  }, [identity.user?.uid, loadDiagnostic]);

  const value = (item: string | number | null | undefined) => item == null || item === "" ? "Non disponible" : String(item);

  return <>
    <PageHeading eyebrow="Administration" title="Diagnostic" description="Vérifiez l’environnement, les services et le dernier traitement sans exposer de secrets." action={<div className="detail-toolbar-actions"><button className="secondary-button" type="button" onClick={onRetry}>Retester SQL Connect</button><button className="secondary-button" type="button" onClick={() => void loadDiagnostic()} disabled={diagnosticState === "loading"}>{diagnosticState === "loading" ? "Lecture…" : "Actualiser le diagnostic"}</button></div>} />
    <section className="debug-grid">
      <div className="panel debug-card"><p className="eyebrow">Identité</p><h2>{identity.user?.email ?? "Session non disponible"}</h2><dl><div><dt>Rôle</dt><dd>{role}</dd></div><div><dt>UID</dt><dd>{maskedUid}</dd></div><div><dt>Courriel vérifié</dt><dd>{identity.user?.emailVerified ? "Oui" : "Non"}</dd></div></dl></div>
      <div className="panel debug-card"><p className="eyebrow">Déploiement</p><h2>{value(diagnostic?.environment)}</h2><dl><div><dt>Commit déployé</dt><dd>{value(diagnostic?.deployedCommit)}</dd></div><div><dt>Version client/PWA</dt><dd>{value(diagnostic?.clientVersion)}</dd></div><div><dt>Version minimale requise</dt><dd>{value(diagnostic?.minimumClientVersion)}</dd></div><div><dt>Service worker</dt><dd>{serviceWorkerState}</dd></div></dl></div>
      <div className="panel debug-card"><p className="eyebrow">Services</p><h2>État des connexions</h2><dl><div><dt>SQL Connect</dt><dd><span className={`debug-status ${dataSourceState}`}>{status}</span></dd></div><div><dt>Firebase Admin</dt><dd>{value(diagnostic?.firebase)}</dd></div><div><dt>Storage</dt><dd>{value(diagnostic?.storage)}</dd></div><div><dt>Gemini</dt><dd>{value(diagnostic?.gemini)}</dd></div><div><dt>App Check</dt><dd>{appCheckConfigured ? "Configuré" : "Non disponible"}</dd></div></dl></div>
      <div className="panel debug-card"><p className="eyebrow">Activité</p><h2>Premières semaines</h2><dl><div><dt>Transactions</dt><dd>{value(diagnostic?.transactionCount)}</dd></div><div><dt>Factures à vérifier</dt><dd>{value(diagnostic?.reviewInvoiceCount)}</dd></div><div><dt>Dépôts en traitement</dt><dd>{value(diagnostic?.processingDepositCount)}</dd></div><div><dt>Traitements échoués</dt><dd>{value(diagnostic?.failedProcessingCount)}</dd></div><div><dt>Dernier traitement</dt><dd>{value(diagnostic?.lastProcessingAt)}</dd></div></dl></div>
      <div className="panel debug-card"><p className="eyebrow">Dernière erreur pertinente</p><h2>{diagnostic?.lastApplicationError?.message ?? (diagnosticState === "error" ? "Diagnostic indisponible" : "Non disponible")}</h2><p className="muted">{diagnostic?.lastApplicationError?.at ? `Survenue le ${diagnostic.lastApplicationError.at}` : "Aucune erreur enregistrée dans les dépôts consultés."}</p></div>
      <div className="panel debug-card debug-card-wide"><p className="eyebrow">Lecture de sécurité</p><h2>Comportement attendu</h2><ul className="debug-checklist"><li><span>✓</span>Les rôles KIM et ADMIN peuvent lire SQL Connect.</li><li><span>✓</span>Les comptes WORKER peuvent uniquement déposer des photos.</li><li><span>✓</span>Les données de démonstration ne remplacent jamais les données de production.</li><li><span>✓</span>Les diagnostics ne renvoient aucun token, mot de passe ou credential.</li></ul></div>
    </section>
  </>;
}

function intakeStatusLabel(status: string) {
  if (status === "AUTO_APPROVED") return "Approuvée automatiquement";
  if (status === "NEEDS_REVIEW" || status === "AI_REVIEW" || status === "AI_ERROR") return "À vérifier";
  if (status === "PROCESSING" || status === "RECEIVED") return "En traitement";
  if (status === "VALIDATED" || status === "READY_FOR_ACCOUNTING" || status === "COMMITTED") return "Validée";
  if (status === "REJECTED") return "Rejetée";
  return status.replaceAll("_", " ");
}

function intakeQueueStatusLabel(intake: InvoiceIntake) {
  return processingStatusOf(intake) === "VALIDATED" && intake.accountingStatus === "NOT_POSTED"
    ? "Prête à comptabiliser"
    : intakeStatusLabel(processingStatusOf(intake));
}

function ClientVersionGate({ state, onRefresh }: { state: Exclude<ClientVersionState, "current">; onRefresh: () => void }) {
  const checking = state === "checking";
  const unavailable = state === "unavailable";
  return <main className="data-source-gate"><section className="data-source-card" aria-live="polite"><span className="eyebrow">Mise à jour sécurisée</span><h1>{checking ? "Vérification de la version" : unavailable ? "Version impossible à vérifier" : "Actualisation requise"}</h1><p className="muted">{checking ? "La version de l’application est vérifiée avant d’autoriser un dépôt." : unavailable ? "L’envoi est bloqué tant que la version courante ne peut pas être confirmée." : "Cette application est obsolète. Actualisez-la avant d’envoyer une facture."}</p>{checking ? <span className="data-source-spinner" aria-hidden="true" /> : <div className="data-source-actions"><button className="primary-button" type="button" onClick={onRefresh}>Actualiser l’application</button><span className="data-source-help">Aucune photo ne sera envoyée avec une version non validée.</span></div>}</section></main>;
}

function intakeStatusClass(status: string) {
  if (status === "REJECTED") return "badge badge-danger";
  if (status === "NEEDS_REVIEW" || status === "AI_REVIEW" || status === "AI_ERROR") return "badge badge-warning";
  if (status === "AUTO_APPROVED" || status === "VALIDATED" || status === "READY_FOR_ACCOUNTING" || status === "COMMITTED") return "badge badge-success";
  return "badge badge-neutral";
}

type IntakeReviewDraft = {
  vendor: string;
  invoiceNumber: string;
  invoiceDate: string;
  subtotal: string;
  tps: string;
  tvq: string;
  total: string;
  currency: string;
  sku: string;
  category: string;
  projectId: string;
  accountCode: string;
  lineItems: AccountingLineItem[];
  notes: string;
};

function centsToDraftDollars(cents: string | undefined) {
  if (cents == null) return "";
  const value = Number(cents);
  return Number.isFinite(value) ? (value / 100).toFixed(2) : "";
}

function normalizedIntakeCents(cents: string | undefined) {
  if (cents == null || cents === "") return null;
  const value = Number(cents);
  return Number.isFinite(value) ? value : null;
}

function reviewNoteForDisplay(note?: string | null) {
  const value = note?.trim() ?? "";
  const dateMatch = value.match(/^Date appears as (.+?) on the receipt\.\s*(.*)$/i);
  if (!dateMatch) return value;
  const dateText = dateMatch[1].replace(/\bor\b/gi, "ou");
  const remainder = dateMatch[2].replace(/\bor\b/gi, "ou").trim();
  return [`Date à confirmer sur le reçu : ${dateText}.`, remainder].filter(Boolean).join(" ");
}

function intakeToReviewDraft(intake: InvoiceIntake): IntakeReviewDraft {
  return {
    vendor: intake.extractedVendor ?? "",
    invoiceNumber: intake.extractedInvoiceNumber ?? "",
    invoiceDate: intake.extractedInvoiceDate ?? "",
    subtotal: centsToDraftDollars(intake.extractedSubtotalCents),
    tps: centsToDraftDollars(intake.extractedTpsCents) || "0.00",
    tvq: centsToDraftDollars(intake.extractedTvqCents) || "0.00",
    total: centsToDraftDollars(intake.extractedTotalCents),
    currency: intake.extractedCurrency ?? "CAD",
    sku: intake.extractedSku ?? "",
    category: intake.extractedCategory ?? intake.classificationCategory ?? "",
    projectId: intake.extractedProjectId ?? "",
    accountCode: intake.classificationStatus === "PROPOSED" ? "" : intake.classificationAccountCode ?? "",
    lineItems: intake.lineItems ?? [],
    notes: reviewNoteForDisplay(intake.aiNotes),
  };
}

function dollarsToCents(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : null;
}

type IntakeEvidencePhoto = { sequence: number; url: string };
type IntakeEvidenceState = { key: string; status: "loading" | "ready" | "error"; photos: IntakeEvidencePhoto[] };

const intakePhotoExtensions = ["jpg", "png", "webp"] as const;

async function loadIntakeEvidencePhotos(intake: InvoiceIntake): Promise<IntakeEvidencePhoto[]> {
  if (!firebaseStorage) throw new Error("Firebase Storage n'est pas configure.");
  if (!intake.storageFolder || intake.photoCount < 1) return [];

  const photos: IntakeEvidencePhoto[] = [];
  for (let sequence = 1; sequence <= intake.photoCount; sequence += 1) {
    const stem = `${intake.storageFolder}/original-${String(sequence).padStart(2, "0")}`;
    let lastError: unknown;
    for (const extension of intakePhotoExtensions) {
      try {
        const url = await getDownloadURL(ref(firebaseStorage, `${stem}.${extension}`));
        photos.push({ sequence, url });
        lastError = undefined;
        break;
      } catch (error) {
        lastError = error;
      }
    }
    if (lastError) throw new Error(`La photo ${sequence} de la facture n'est pas disponible dans Storage.`);
  }
  return photos;
}

function InvoiceIntakeEvidence({ intake }: { intake: InvoiceIntake }) {
  const evidenceKey = `${intake.receiptId}:${intake.storageFolder}:${intake.photoCount}`;
  const [evidence, setEvidence] = useState<IntakeEvidenceState>({ key: "", status: "loading", photos: [] });
  const [activeSequence, setActiveSequence] = useState(1);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let active = true;
    void loadIntakeEvidencePhotos(intake)
      .then((photos) => {
        if (active) setEvidence({ key: evidenceKey, status: "ready", photos });
      })
      .catch(() => {
        if (active) setEvidence({ key: evidenceKey, status: "error", photos: [] });
      });
    return () => {
      active = false;
    };
  }, [evidenceKey, intake]);

  const currentEvidence = evidence.key === evidenceKey ? evidence : { key: evidenceKey, status: "loading" as const, photos: [] };
  const activePhoto = currentEvidence.photos.find((photo) => photo.sequence === activeSequence) ?? currentEvidence.photos[0];

  return <section className="intake-evidence" aria-label="Photo Storage de la facture">
    <div className="intake-evidence-header">
      <div><p className="eyebrow">Preuve originale</p><h3>Photo de la facture</h3></div>
      <span className="data-source-help">Lecture seule · Storage</span>
    </div>
    {currentEvidence.status === "loading" && <p className="intake-evidence-message">Chargement de la photo associée…</p>}
    {currentEvidence.status === "error" && <p className="intake-evidence-message error">La photo Storage n’a pas pu être chargée. Aucun fichier n’a été recréé.</p>}
    {currentEvidence.status === "ready" && !activePhoto && <p className="intake-evidence-message">Aucune photo n’est associée à cette facture.</p>}
    {currentEvidence.status === "ready" && activePhoto && <>
      <div className="intake-evidence-main"><div className="intake-evidence-zoom-stage"><div style={{ transform: `scale(${zoom})` }}><IntakeEvidencePreview url={activePhoto.url} alt={`Preuve originale de la facture ${intake.receiptId}, page ${activePhoto.sequence}`} /></div></div><div className="intake-evidence-tools" aria-label="Contrôles de zoom"><button type="button" className="icon-button" onClick={() => setZoom((current) => Math.max(0.75, Number((current - 0.25).toFixed(2))))} aria-label="Réduire le zoom">−</button><span>{Math.round(zoom * 100)}%</span><button type="button" className="icon-button" onClick={() => setZoom((current) => Math.min(2.5, Number((current + 0.25).toFixed(2))))} aria-label="Augmenter le zoom">＋</button><a className="text-button" href={activePhoto.url} target="_blank" rel="noreferrer">Ouvrir l’original</a></div></div>
      {currentEvidence.photos.length > 1 && <div className="intake-evidence-thumbs" aria-label="Pages de la facture">
        {currentEvidence.photos.map((photo) => <button className={`intake-evidence-thumb ${photo.sequence === activePhoto.sequence ? "active" : ""}`} type="button" key={photo.sequence} onClick={() => setActiveSequence(photo.sequence)} aria-label={`Afficher la page ${photo.sequence}`} aria-pressed={photo.sequence === activePhoto.sequence}><IntakeEvidencePreview url={photo.url} alt={`Miniature, page ${photo.sequence}`} /></button>)}
      </div>}
    </>}
  </section>;
}

function prepareLineItemsForSave(lineItems: AccountingLineItem[], vendor: string, skuReferences: SkuReference[], accounts: AccountCategory[]) {
  return lineItems.map((item, index) => {
    const classification = classifyInvoice(
      { vendor, sku: item.sku ?? undefined, category: item.category ?? undefined },
      skuReferences,
      accounts,
    );
    const accountCode = item.accountCode?.trim() || null;
    return {
      ...item,
      sequence: index + 1,
      description: item.description.trim(),
      category: item.category?.trim() || classification.category,
      accountCode,
      classificationSource: accountCode ? "KIM_LINE_REVIEW" : classification.source,
      classificationConfidence: accountCode ? 1 : classification.confidence,
      classificationStatus: accountCode ? "CONFIRMED" : classification.resolution,
      classificationNote: accountCode ? "Compte confirmé par KIM." : classification.note,
    };
  });
}

function reviewLineStatus(item: AccountingLineItem) {
  return item.accountCode && ["RESOLVED", "CONFIRMED"].includes(item.classificationStatus ?? "")
    ? "Confirmée"
    : "À confirmer";
}

function InvoiceLineItemsReview({
  items,
  vendor,
  subtotalCents,
  accounts,
  skuReferences,
  onUpdate,
  onAdd,
  onRemove,
}: {
  items: AccountingLineItem[];
  vendor: string;
  subtotalCents: number | null;
  accounts: AccountCategory[];
  skuReferences: SkuReference[];
  onUpdate: (index: number, patch: Partial<AccountingLineItem>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  const linesSubtotalCents = invoiceLineItemsSubtotalCents(items);
  const differenceCents = subtotalCents == null ? null : linesSubtotalCents - subtotalCents;
  const missingAccounts = items.filter((item) => !item.accountCode).length;
  return <section className="review-line-items" aria-labelledby="review-line-items-title">
    <div className="section-heading"><span>04</span><div><p className="eyebrow">Articles extraits</p><h2 id="review-line-items-title">Classification par ligne</h2></div><button className="text-button" type="button" onClick={onAdd}>+ Ajouter une ligne</button></div>
    <p className="muted">Chaque ligne doit conserver la description visible sur la facture et être associée à un compte avant la comptabilisation.</p>
    {items.length === 0 && <div className="line-item warning-line"><span>—</span><div><strong>Aucune ligne extraite</strong><small>Ajoutez les articles à partir de la photo originale. La comptabilisation restera bloquée tant que le détail ne sera pas complet.</small></div><strong>—</strong></div>}
    {items.map((item, index) => {
      const suggestion = classifyInvoice({ vendor, sku: item.sku ?? undefined, category: item.category ?? undefined }, skuReferences, accounts);
      return <div className="review-line-item" key={`${item.sequence}-${index}`}>
        <div className="review-line-item-header"><span>{String(index + 1).padStart(2, "0")}</span><strong>{reviewLineStatus(item)}</strong><button className="text-button danger-text" type="button" onClick={() => onRemove(index)}>Retirer</button></div>
        <div className="review-line-item-grid">
          <label className="field wide"><span>Description</span><input value={item.description} onChange={(event) => onUpdate(index, { description: event.target.value })} /></label>
          <label className="field"><span>Quantité</span><input inputMode="decimal" value={item.quantity == null ? "" : String(item.quantity)} onChange={(event) => onUpdate(index, { quantity: Number(event.target.value.replace(",", ".")) || null })} /></label>
          <label className="field"><span>Prix unitaire</span><input inputMode="decimal" value={centsToDraftDollars(item.unitPriceCents == null ? undefined : String(item.unitPriceCents))} onChange={(event) => onUpdate(index, { unitPriceCents: dollarsToCents(event.target.value) })} /></label>
          <label className="field"><span>Montant avant taxes</span><input inputMode="decimal" value={centsToDraftDollars(item.amountCents == null ? undefined : String(item.amountCents))} onChange={(event) => onUpdate(index, { amountCents: dollarsToCents(event.target.value) })} /></label>
          <label className="field"><span>SKU / code produit</span><input value={item.sku ?? ""} onChange={(event) => onUpdate(index, { sku: event.target.value || null })} /></label>
          <label className="field"><span>Catégorie proposée</span><input value={item.category ?? ""} onChange={(event) => onUpdate(index, { category: event.target.value || null })} /><small>{suggestion.category ? `Suggestion : ${suggestion.category}` : "Aucune suggestion fiable."}</small></label>
          <label className="field wide"><span>Compte comptable</span><select value={item.accountCode ?? ""} onChange={(event) => onUpdate(index, { accountCode: event.target.value || null })}><option value="">Choisir le compte de dépense</option>{accounts.filter((account) => account.status !== "INACTIVE" && account.type === "EXPENSE").map((account) => <option key={account.id} value={account.number}>{account.number} · {account.label}</option>)}</select><small>{suggestion.accountCode ? `Suggestion : ${suggestion.accountCode} · ${suggestion.category}` : "Aucune suggestion fiable; un choix manuel est requis."}</small></label>
        </div>
      </div>;
    })}
    <div className={`line-items-control ${items.length && differenceCents === 0 && missingAccounts === 0 ? "success" : "warning"}`}><span>{items.length ? `Total des lignes : ${formatCurrency(linesSubtotalCents / 100)}` : "Détail manquant"}</span><span>{differenceCents == null ? "Sous-total à saisir" : Math.abs(differenceCents) <= 1 ? "✓ Concorde avec le sous-total" : `Écart : ${formatCurrency(Math.abs(differenceCents) / 100)}`}</span><span>{missingAccounts ? `${missingAccounts} compte${missingAccounts > 1 ? "s" : ""} à confirmer` : items.length ? "✓ Comptes confirmés" : ""}</span></div>
  </section>;
}

type TransactionEvidencePhoto = { sequence: number; storagePath: string; url: string };
type TransactionEvidenceState = { key: string; status: "loading" | "ready" | "error"; photos: TransactionEvidencePhoto[] };

async function loadTransactionEvidencePhotos(transaction: Transaction): Promise<TransactionEvidencePhoto[]> {
  if (!firebaseStorage) throw new Error("Firebase Storage n'est pas configure.");
  const storage = firebaseStorage;
  const photoPaths = [...(transaction.photoPaths ?? [])].sort((left, right) => left.sequence - right.sequence);
  return Promise.all(photoPaths.map(async (photo) => ({
    sequence: photo.sequence,
    storagePath: photo.storagePath,
    url: await getDownloadURL(ref(storage, photo.storagePath)),
  })));
}

function TransactionEvidence({ transaction }: { transaction: Transaction }) {
  const photoKey = (transaction.photoPaths ?? []).map((photo) => `${photo.sequence}:${photo.storagePath}`).join("|");
  const evidenceKey = `${transaction.id}:${photoKey}`;
  const [evidence, setEvidence] = useState<TransactionEvidenceState>({ key: "", status: "loading", photos: [] });
  const [activeSequence, setActiveSequence] = useState(1);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let active = true;
    void loadTransactionEvidencePhotos(transaction)
      .then((photos) => {
        if (active) setEvidence({ key: evidenceKey, status: "ready", photos });
      })
      .catch(() => {
        if (active) setEvidence({ key: evidenceKey, status: "error", photos: [] });
      });
    return () => {
      active = false;
    };
  }, [evidenceKey, transaction]);

  const currentEvidence = evidence.key === evidenceKey ? evidence : { key: evidenceKey, status: "loading" as const, photos: [] };
  const activePhoto = currentEvidence.photos.find((photo) => photo.sequence === activeSequence) ?? currentEvidence.photos[0];
  const pageCount = transaction.imageCount || currentEvidence.photos.length;

  return <>
    {currentEvidence.status === "loading" && <div className="document-viewer"><p className="intake-evidence-message">Chargement de la photo associée…</p></div>}
    {currentEvidence.status === "error" && <div className="document-viewer"><p className="intake-evidence-message error">La photo Storage n’a pas pu être chargée. Le fichier original n’a pas été recréé.</p></div>}
    {currentEvidence.status === "ready" && !activePhoto && <div className="document-viewer"><p className="intake-evidence-message">Aucune photo associée à cette transaction.</p></div>}
    {currentEvidence.status === "ready" && activePhoto && <>
      <div className="document-viewer"><div className="intake-evidence-zoom-stage"><div style={{ transform: `scale(${zoom})` }}><IntakeEvidencePreview url={activePhoto.url} alt={`Photo originale de la transaction ${transaction.id}, page ${activePhoto.sequence}`} /></div></div></div>
      <div className="intake-evidence-tools" aria-label="Contrôles de zoom"><button type="button" className="icon-button" onClick={() => setZoom((current) => Math.max(0.75, Number((current - 0.25).toFixed(2))))} aria-label="Réduire le zoom">−</button><span>{Math.round(zoom * 100)}%</span><button type="button" className="icon-button" onClick={() => setZoom((current) => Math.min(2.5, Number((current + 0.25).toFixed(2))))} aria-label="Augmenter le zoom">＋</button><a className="text-button" href={activePhoto.url} target="_blank" rel="noreferrer">Ouvrir l’original</a></div>
      {currentEvidence.photos.length > 1 && <div className="intake-evidence-thumbs" aria-label="Pages de la facture">{currentEvidence.photos.map((photo) => <button className={`intake-evidence-thumb ${photo.sequence === activePhoto.sequence ? "active" : ""}`} type="button" key={photo.sequence} onClick={() => setActiveSequence(photo.sequence)} aria-label={`Afficher la page ${photo.sequence}`} aria-pressed={photo.sequence === activePhoto.sequence}><IntakeEvidencePreview url={photo.url} alt={`Miniature, page ${photo.sequence}`} /></button>)}</div>}
      <div className="page-controls"><button type="button" onClick={() => setActiveSequence(Math.max(1, activeSequence - 1))} disabled={activeSequence <= 1}>‹</button><span>Page {activePhoto.sequence} sur {pageCount}</span><button type="button" onClick={() => setActiveSequence(Math.min(pageCount, activeSequence + 1))} disabled={activeSequence >= pageCount}>›</button></div>
    </>}
  </>;
}

function auditActionLabel(action: string) {
  const labels: Record<string, string> = {
    DEPOSIT_CREATED: "Dépôt créé",
    AI_EXTRACTION_COMPLETED: "Extraction IA terminée",
    AI_PROCESSING_FAILED: "Traitement échoué",
    HUMAN_CORRECTION: "Correction humaine",
    HUMAN_VALIDATION: "Validation humaine",
    TRANSACTION_CREATED: "Transaction créée",
    INVOICE_DISCARDED: "Facture supprimée",
    POSTED_INVOICE_DELETED: "Écriture publiée supprimée",
    RECONCILIATION_UPDATED: "Rapprochement mis à jour",
    STATEMENT_ADJUSTMENTS_UPDATED: "Ajustements de relevé enregistrés",
    USER_CREATED: "Profil utilisateur créé",
    ROLE_ASSIGNED: "Rôle attribué",
    INVITATION_SENT: "Invitation envoyée",
    INVITATION_RESENT: "Invitation renvoyée",
    INVITATION_FAILED: "Invitation échouée",
    PASSWORD_RESET_REQUESTED: "Réinitialisation demandée",
    PASSWORD_RESET_FAILED: "Réinitialisation échouée",
    USER_EMAIL_UPDATED: "Email utilisateur mis à jour",
    USER_ACTIVATED: "Compte utilisateur activé",
    ACCOUNT_DEACTIVATED: "Compte utilisateur désactivé",
  };
  return labels[action] ?? action;
}

function auditActionDescription(action: string) {
  const descriptions: Record<string, string> = {
    DEPOSIT_CREATED: "La photo a été reçue et conservée dans le stockage sécurisé.",
    AI_EXTRACTION_COMPLETED: "L’IA a rempli les champs visibles. Les valeurs incertaines doivent être confirmées avant la création de l’écriture.",
    AI_PROCESSING_FAILED: "Le traitement automatique a rencontré une erreur; une revue manuelle est nécessaire.",
    HUMAN_CORRECTION: "Un membre autorisé a modifié les champs indiqués avant la création de l’écriture.",
    HUMAN_VALIDATION: "Les informations obligatoires ont été confirmées par un membre autorisé.",
    TRANSACTION_CREATED: "La facture a été transformée en écriture comptable.",
    INVOICE_DISCARDED: "La facture a été retirée de la file et sa photo Storage a été supprimée.",
    POSTED_INVOICE_DELETED: "L’écriture publiée a été retirée des vues opérationnelles; la trace d’audit est conservée.",
    RECONCILIATION_UPDATED: "Le lien entre la facture et le relevé de carte a été mis à jour.",
    STATEMENT_ADJUSTMENTS_UPDATED: "Les lignes manuelles du relevé ont été enregistrées pour la période.",
    USER_CREATED: "Le profil et son rôle ont été enregistrés par un administrateur.",
    ROLE_ASSIGNED: "Le rôle applicatif a été appliqué au compte Firebase.",
    INVITATION_SENT: "Un lien personnel de création de mot de passe a été envoyé.",
    INVITATION_RESENT: "Un nouveau lien personnel de création de mot de passe a été envoyé.",
    INVITATION_FAILED: "Le profil est conservé et doit être réessayé après correction de l’envoi email.",
    PASSWORD_RESET_REQUESTED: "Un lien Firebase de réinitialisation a été envoyé; aucun mot de passe n’a été exposé.",
    PASSWORD_RESET_FAILED: "Le lien de réinitialisation n’a pas pu être envoyé.",
    USER_EMAIL_UPDATED: "L’email local et le compte Firebase ont été synchronisés.",
    USER_ACTIVATED: "L’activation du compte a été détectée ou le compte a été réactivé.",
    ACCOUNT_DEACTIVATED: "Le profil et le compte Firebase ont été désactivés par un administrateur.",
  };
  return descriptions[action] ?? "Cette étape a été enregistrée dans la piste d’audit.";
}

function auditFieldLabel(field?: string) {
  const labels: Record<string, string> = {
    vendor: "Fournisseur",
    invoiceNumber: "No de facture",
    invoiceDate: "Date de facture",
    subtotalCents: "Sous-total",
    tpsCents: "TPS",
    tvqCents: "TVQ",
    totalCents: "Total",
    category: "Catégorie",
    accountCode: "Compte comptable",
    projectId: "Projet",
    cardId: "Carte utilisée",
  };
  return field ? labels[field] ?? field : "Champ";
}

type AuditReferenceData = {
  cards?: CreditCard[];
  projects?: ProjectReference[];
};

function parseAuditLineItems(value: unknown) {
  if (Array.isArray(value)) return value as Array<{ amountCents?: unknown }>;
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed as Array<{ amountCents?: unknown }> : null;
  } catch {
    return null;
  }
}

function auditLineItemsSummary(value: unknown) {
  const lineItems = parseAuditLineItems(value);
  if (!lineItems) return value == null || value === "" ? "Détail non renseigné" : "Détail non lisible";
  const totalCents = lineItems.reduce((sum, item) => {
    const amount = Number(item.amountCents);
    return Number.isFinite(amount) ? sum + amount : sum;
  }, 0);
  const countLabel = `${lineItems.length} ligne${lineItems.length > 1 ? "s" : ""}`;
  return `${countLabel} · ${formatCurrency(totalCents / 100)}`;
}

function auditFieldValue(field: string | undefined, value: unknown, references: AuditReferenceData = {}) {
  if (value == null || value === "") return "Non renseigné";
  if (field === "lineItems") return auditLineItemsSummary(value);
  if (field?.endsWith("Cents")) {
    const cents = Number(value);
    if (Number.isFinite(cents)) return formatCurrency(cents / 100);
  }
  if (field === "accountCode") return `Compte ${String(value)}`;
  if (field === "cardId") {
    const card = references.cards?.find((candidate) => candidate.id === String(value));
    return card ? `•••• ${card.lastFour} · ${card.holder}` : String(value);
  }
  if (field === "projectId") {
    const project = references.projects?.find((candidate) => candidate.id === String(value));
    return project ? `${project.number} · ${project.name}` : String(value);
  }
  return String(value);
}

type AuditCorrection = { field?: string; previous?: unknown; corrected?: unknown };

function meaningfulAuditCorrections(details: Record<string, unknown>, references: AuditReferenceData = {}) {
  const corrections = Array.isArray(details.corrections) ? details.corrections as AuditCorrection[] : [];
  return corrections.filter((correction) => auditFieldValue(correction.field, correction.previous, references) !== auditFieldValue(correction.field, correction.corrected, references));
}

function auditTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-CA", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function AuditTrailView({ events, role, state, cards, projects }: { events: AuditEventRecord[]; role: Role | null; state: "loading" | "ready" | "error"; cards?: CreditCard[]; projects?: ProjectReference[] }) {
  void AuditTrail;
  const references = { cards, projects };
  events = events.filter((event) => !(event.action === "HUMAN_CORRECTION" && parseAuditDetails(event.details).source !== "HUMAN_EDIT"));
  return <section className="audit-trail" aria-label="Piste d’audit"><div className="section-heading"><span>03</span><div><p className="eyebrow">Traçabilité</p><h2>Historique de la facture</h2><p className="section-help">Chaque étape indique ce qui s’est passé et qui l’a enregistrée.</p></div></div>{state === "loading" && <p className="muted">Chargement de l’historique…</p>}{state === "error" && <p className="intake-evidence-message error">La piste d’audit n’est pas disponible.</p>}{state === "ready" && !events.length && <p className="muted">Aucun événement d’audit enregistré.</p>}{events.length > 0 && <div className="audit-event-list">{events.map((event) => { const details = parseAuditDetails(event.details); const isLegacyCorrection = event.action === "HUMAN_CORRECTION" && details.source !== "HUMAN_EDIT"; const corrections = isLegacyCorrection ? [] : meaningfulAuditCorrections(details, references); const actor = event.actor?.displayName ?? (event.actorRole ? `Rôle ${event.actorRole}` : "Utilisateur authentifié"); const isUnconfirmedCorrection = event.action === "HUMAN_CORRECTION" && (isLegacyCorrection || corrections.length === 0); return <article className={`audit-event audit-event-${event.action.toLowerCase()}`} key={event.id}><div className="audit-event-heading"><div><strong>{isUnconfirmedCorrection ? "Revue enregistrée" : auditActionLabel(event.action)}</strong><p>{isLegacyCorrection ? "Cette revue provient d’une ancienne version de l’application; elle ne confirme pas une modification manuelle." : corrections.length === 0 && event.action === "HUMAN_CORRECTION" ? "La revue a été enregistrée sans modification de valeur." : auditActionDescription(event.action)}</p></div><small>{actor}<br />{auditTimestamp(event.createdAt)}</small></div>{role === "ADMIN" && event.action === "HUMAN_CORRECTION" && !isUnconfirmedCorrection && corrections.length > 0 && <div className="audit-corrections">{corrections.map((correction) => <span key={String(correction.field)}><b>{auditFieldLabel(correction.field)}</b><span>{auditFieldValue(correction.field, correction.previous, references)} <i aria-hidden="true">→</i> {auditFieldValue(correction.field, correction.corrected, references)}</span></span>)}</div>}</article>; })}</div>}</section>;
}

function AuditTrail({ events, role, state }: { events: AuditEventRecord[]; role: Role | null; state: "loading" | "ready" | "error" }) {
  return <section className="audit-trail" aria-label="Piste d’audit"><div className="section-heading"><span>03</span><div><p className="eyebrow">Traçabilité</p><h2>Historique de la facture</h2><p className="section-help">Chaque étape indique ce qui s’est passé et qui l’a enregistrée.</p></div></div>{state === "loading" && <p className="muted">Chargement de l’historique…</p>}{state === "error" && <p className="intake-evidence-message error">La piste d’audit n’est pas disponible.</p>}{state === "ready" && !events.length && <p className="muted">Aucun événement d’audit enregistré.</p>}{events.length > 0 && <div className="audit-event-list">{events.map((event) => { const details = parseAuditDetails(event.details); const corrections = meaningfulAuditCorrections(details); const actor = event.actor?.displayName ?? (event.actorRole ? `Rôle ${event.actorRole}` : "Utilisateur authentifié"); const isEmptyCorrection = event.action === "HUMAN_CORRECTION" && corrections.length === 0; return <article className={`audit-event audit-event-${event.action.toLowerCase()}`} key={event.id}><div className="audit-event-heading"><div><strong>{isEmptyCorrection ? "Revue enregistrée" : auditActionLabel(event.action)}</strong><p>{isEmptyCorrection ? "La revue a été enregistrée sans modification de valeur." : auditActionDescription(event.action)}</p></div><small>{actor}<br />{auditTimestamp(event.createdAt)}</small></div>{role === "ADMIN" && event.action === "HUMAN_CORRECTION" && corrections.length > 0 && <div className="audit-corrections">{corrections.map((correction) => <span key={String(correction.field)}><b>{auditFieldLabel(correction.field)}</b><span>{auditFieldValue(correction.field, correction.previous)} <i aria-hidden="true">→</i> {auditFieldValue(correction.field, correction.corrected)}</span></span>)}</div>}</article>; })}</div>}</section>;
}

function IntakeQueuePage({ items, period, onSaved }: { items: InvoiceIntake[]; period: CardPeriod; onSaved: (receiptId: string, patch: Partial<InvoiceIntake>) => void }) {
  const { accounts, cards, periods, projects, skuReferences, users } = useAppData();
  const identity = useFirebaseIdentity();
  const sortedItems = [...items].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  const [selectedReceiptId, setSelectedReceiptId] = useState(items[0]?.receiptId ?? "");
  const selectedIntake = items.find((intake) => intake.receiptId === selectedReceiptId) ?? null;
  const [draft, setDraft] = useState<IntakeReviewDraft>(() => selectedIntake ? intakeToReviewDraft(selectedIntake) : {
    vendor: "", invoiceNumber: "", invoiceDate: "", subtotal: "", tps: "0.00", tvq: "0.00", total: "", currency: "CAD", sku: "", category: "", projectId: "", accountCode: "", lineItems: [], notes: "",
  });
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [retryState, setRetryState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [retryMessage, setRetryMessage] = useState("");
  const [draftDirty, setDraftDirty] = useState(false);
  const activeUserIds = new Set(users.filter((user) => user.status === "ACTIVE").map((user) => user.id));
  const selectableCards = uniqueCreditCards(cards.filter((card) => card.status === "Actif" && activeUserIds.has(card.holderId ?? "")));
  const cardSuggestionFor = (intake: InvoiceIntake | null) => {
    if (!intake) return "";
    const uploader = users.find((user) => user.firebaseUid === intake.uploaderUid);
    const matches = selectableCards.filter((card) => card.holderId === uploader?.id);
    return matches.length === 1 ? matches[0].id : "";
  };
  const [commitCardId, setCommitCardId] = useState(() => cardSuggestionFor(selectedIntake));
  const [commitPeriodId, setCommitPeriodId] = useState(() => period.id === "custom" ? "" : period.id);
  const [commitState, setCommitState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [auditEvents, setAuditEvents] = useState<AuditEventRecord[]>([]);
  const [auditState, setAuditState] = useState<"loading" | "ready" | "error">("loading");
  const auditUser = identity.user;
  const auditReceiptId = selectedIntake?.receiptId;

  useEffect(() => {
    let active = true;
    if (!auditReceiptId || !auditUser) {
      return () => { active = false; };
    }
    const auditTimer = window.setTimeout(() => {
      setAuditState("loading");
      void auditUser.getIdToken().then((token) => fetch(`/api/admin/audit?entityType=InvoiceIntake&entityId=${encodeURIComponent(auditReceiptId)}`, { headers: { authorization: `Bearer ${token}` }, cache: "no-store" })).then(async (response) => {
        if (!response.ok) throw new Error("audit unavailable");
        return response.json() as Promise<{ events: AuditEventRecord[] }>;
      }).then((payload) => {
        if (!active) return;
        setAuditEvents(payload.events ?? []);
        setAuditState("ready");
      }).catch(() => {
        if (active) setAuditState("error");
      });
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(auditTimer);
    };
  }, [auditReceiptId, auditUser]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCommitPeriodId(period.id === "custom" ? "" : period.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [period.id]);

  const selectIntake = (intake: InvoiceIntake) => {
    setSelectedReceiptId(intake.receiptId);
    setDraft(intakeToReviewDraft(intake));
    setSaveState("idle");
    setSaveMessage("");
    setRetryState("idle");
    setRetryMessage("");
    setDraftDirty(false);
    setCommitCardId(cardSuggestionFor(intake));
    setCommitPeriodId(period.id === "custom" ? "" : period.id);
    setCommitState("idle");
  };
  const updateDraft = (field: keyof IntakeReviewDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setDraftDirty(true);
    setSaveState("idle");
    setCommitState("idle");
    setSaveMessage("");
  };
  const updateLineItem = (index: number, patch: Partial<AccountingLineItem>) => {
    setDraft((current) => ({ ...current, lineItems: current.lineItems.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item) }));
    setDraftDirty(true);
    setSaveState("idle");
    setCommitState("idle");
    setSaveMessage("");
  };
  const addLineItem = () => {
    setDraft((current) => ({ ...current, lineItems: [...current.lineItems, { sequence: current.lineItems.length + 1, description: "", quantity: 1, unitPriceCents: null, amountCents: null, sku: null, category: null, accountCode: null, classificationSource: null, classificationConfidence: null, classificationStatus: null, classificationNote: null }] }));
    setDraftDirty(true);
    setSaveState("idle");
    setCommitState("idle");
  };
  const removeLineItem = (index: number) => {
    setDraft((current) => ({ ...current, lineItems: current.lineItems.filter((_, itemIndex) => itemIndex !== index).map((item, itemIndex) => ({ ...item, sequence: itemIndex + 1 })) }));
    setDraftDirty(true);
    setSaveState("idle");
    setCommitState("idle");
  };
  const inferredClassification = classifyInvoice(
    { vendor: draft.vendor, sku: draft.sku || undefined, category: draft.category || undefined },
    skuReferences,
    accounts,
  );
  const preparedLineItems = prepareLineItemsForSave(draft.lineItems, draft.vendor, skuReferences, accounts);
  const draftSubtotalCents = dollarsToCents(draft.subtotal);
  const lineItemsValidation = validateInvoiceLineItemsForCommit(preparedLineItems, draftSubtotalCents ?? -1);
  const lineItemsReady = lineItemsValidation.ok;
  const lineAccountCodes = Array.from(new Set(preparedLineItems.map((item) => item.accountCode).filter((code): code is string => Boolean(code))));
  const allLineAccountsConfirmed = preparedLineItems.length > 0 && preparedLineItems.every((item) => Boolean(item.accountCode));
  const summaryAccountCode = lineAccountCodes.length === 1 ? lineAccountCodes[0] : null;
  const classificationCategory = draft.category || inferredClassification.category;
  const classificationSource = allLineAccountsConfirmed ? "KIM_LINE_REVIEW" : draft.accountCode ? "KIM_REVIEW" : inferredClassification.source;
  const classificationConfidence = allLineAccountsConfirmed ? 1 : draft.accountCode ? 1 : inferredClassification.confidence;
  const isReadyForAccounting = Boolean(draft.vendor.trim() && draft.invoiceDate && commitCardId && lineItemsReady && allLineAccountsConfirmed);
  const messageState = commitState === "error" || commitState === "saved" ? commitState : saveState;
  const suggestedCardId = selectedIntake ? cardSuggestionFor(selectedIntake) : "";
  const cardAutomaticallyResolved = Boolean(suggestedCardId && commitCardId === suggestedCardId);
  const suggestedCard = cards.find((card) => card.id === commitCardId);
  const suggestedUploader = selectedIntake ? users.find((user) => user.firebaseUid === selectedIntake.uploaderUid) : undefined;
  const selectedReviewMessages = selectedIntake
    ? intakeReviewMessages(selectedIntake).filter((message) => !(cardAutomaticallyResolved && message.toLowerCase().includes("carte")))
    : [];
  const selectedCorrectionFields = selectedIntake ? intakeCorrectionFields(selectedIntake) : new Set<string>();
  const needsCorrection = (...fieldNames: string[]) => fieldNames.some((fieldName) => selectedCorrectionFields.has(fieldName));
  const cardNeedsCorrection = !commitCardId || (needsCorrection("cardId") && !cardAutomaticallyResolved);
  const cardReviewMessage = "Carte utilisée non détectée ou non sélectionnée — si votre carte personnelle n’apparaît pas, ajoutez-la dans Configuration.";
  const visibleReviewMessages = selectedIntake && cardNeedsCorrection && !selectedReviewMessages.some((message) => message.toLowerCase().includes("carte"))
    ? [...selectedReviewMessages, cardReviewMessage]
    : selectedReviewMessages;
  const canRetryAi = Boolean(
    selectedIntake &&
    (identity.role === "KIM" || identity.role === "ADMIN") &&
    selectedIntake.processingStatus === "NEEDS_REVIEW" &&
    selectedIntake.processingState === "FAILED" &&
    !selectedIntake.aiModel &&
    parseIntakeExceptions(selectedIntake).some((exception) => exception.code === "AI_PROCESSING_ERROR"),
  );

  const retryAi = async () => {
    if (!selectedIntake || !canRetryAi) return;
    if (!window.confirm("Relancer l’analyse IA de cette facture maintenant ? La facture sera retraitée et pourra revenir en revue manuelle si une incohérence subsiste.")) return;
    setRetryState("saving");
    setRetryMessage("");
    try {
      await retryInvoiceIntakeAi(selectedIntake.receiptId);
      setRetryState("saved");
      setRetryMessage("Analyse relancée; actualisation de la facture…");
      window.setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      setRetryState("error");
      setRetryMessage(error instanceof Error ? error.message : "La nouvelle analyse n'a pas pu être lancée.");
    }
  };

  const saveReview = async (event?: FormEvent<HTMLFormElement>, action: "save" | "commit" = "save") => {
    event?.preventDefault();
    if (!selectedIntake) return;
    const subtotalCents = dollarsToCents(draft.subtotal);
    const tpsCents = dollarsToCents(draft.tps);
    const tvqCents = dollarsToCents(draft.tvq);
    const totalCents = dollarsToCents(draft.total);
    if (!draft.vendor.trim() || !draft.invoiceDate || subtotalCents == null || tpsCents == null || tvqCents == null || totalCents == null) {
      setSaveState("error");
      setSaveMessage("Fournisseur, date et montants valides sont requis.");
      return;
    }
    if (Math.abs(subtotalCents + tpsCents + tvqCents - totalCents) > 1) {
      setSaveState("error");
      setSaveMessage("Le total doit correspondre au sous-total plus les taxes.");
      return;
    }
    if (action === "commit" && !isReadyForAccounting) {
      setSaveState("error");
      setSaveMessage("Le fournisseur, la date, les montants, chaque compte de ligne et la carte sont requis avant la comptabilisation.");
      return;
    }
    if (action === "commit" && !window.confirm(`Enregistrer la correction et créer immédiatement l’écriture comptable pour ${draft.vendor.trim()} (${formatCurrency(totalCents / 100)}) ?`)) {
      return;
    }
    setSaveState("saving");
    setCommitState(action === "commit" ? "saving" : "idle");
    setSaveMessage("");
    const status = isReadyForAccounting ? "VALIDATED" : "NEEDS_REVIEW";
    const classificationStatus = isReadyForAccounting ? "RESOLVED" : inferredClassification.resolution;
    const decisionExceptions: Array<{ code: string; fieldName: string; message: string; aiValue: string | null; suggestedValue: string | null; status: string }> = isReadyForAccounting ? [] : [
      ...(!allLineAccountsConfirmed ? [{ code: "MISSING_ACCOUNT", fieldName: "accountCode", message: "Chaque ligne doit avoir un compte comptable confirmé.", aiValue: null, suggestedValue: inferredClassification.accountCode, status: "OPEN" }] : []),
      ...(!commitCardId ? [{ code: "UNKNOWN_CARD", fieldName: "cardId", message: "Carte utilisée non détectée ou non sélectionnée.", aiValue: null, suggestedValue: null, status: "OPEN" }] : []),
    ];
    const previousValues = {
      vendor: selectedIntake.extractedVendor ?? null,
      invoiceNumber: selectedIntake.extractedInvoiceNumber ?? null,
      invoiceDate: selectedIntake.extractedInvoiceDate ?? null,
      subtotalCents: normalizedIntakeCents(selectedIntake.extractedSubtotalCents),
      tpsCents: normalizedIntakeCents(selectedIntake.extractedTpsCents),
      tvqCents: normalizedIntakeCents(selectedIntake.extractedTvqCents),
      totalCents: normalizedIntakeCents(selectedIntake.extractedTotalCents),
      sku: selectedIntake.extractedSku ?? null,
      category: selectedIntake.extractedCategory ?? selectedIntake.classificationCategory ?? null,
      projectId: selectedIntake.extractedProjectId ?? null,
      cardId: null,
      accountCode: selectedIntake.classificationAccountCode ?? null,
      lineItems: JSON.stringify(selectedIntake.lineItems ?? []),
    };
    const correctedValues = {
      vendor: draft.vendor.trim(),
      invoiceNumber: draft.invoiceNumber.trim() || null,
      invoiceDate: draft.invoiceDate,
      subtotalCents,
      tpsCents,
      tvqCents,
      totalCents,
      sku: draft.sku.trim() || null,
      category: draft.category.trim() || null,
      projectId: draft.projectId || null,
      cardId: commitCardId || null,
      accountCode: summaryAccountCode,
      lineItems: JSON.stringify(preparedLineItems),
    };
    const changedFields = Object.keys(correctedValues).filter((field) => previousValues[field as keyof typeof previousValues] !== correctedValues[field as keyof typeof correctedValues]);
    const commitInput = {
      receiptId: selectedIntake.receiptId,
      vendor: draft.vendor.trim(),
      invoiceNumber: draft.invoiceNumber.trim() || null,
      invoiceDate: draft.invoiceDate,
      subtotalCents,
      tpsCents,
      tvqCents,
      totalCents,
      currency: draft.currency.trim().toUpperCase() || "CAD",
      sku: draft.sku.trim() || null,
      category: classificationCategory || "Divers",
      accountCode: summaryAccountCode,
      cardId: commitCardId,
      statementPeriodId: commitPeriodId || null,
      projectId: draft.projectId || null,
      classificationNote: draft.notes.trim() || "Revue confirmée.",
      lineItems: JSON.stringify(preparedLineItems),
    };
    if (preparedLineItems.length === 0) {
      decisionExceptions.push({ code: "MISSING_LINE_ITEMS", fieldName: "lineItems", message: "Au moins une ligne d’article doit être ajoutée.", aiValue: null, suggestedValue: null, status: "OPEN" });
    } else if (Math.abs(lineItemsValidation.differenceCents) > 1) {
      decisionExceptions.push({ code: "LINE_ITEMS_TOTAL_MISMATCH", fieldName: "lineItems", message: "La somme des lignes doit correspondre au sous-total.", aiValue: String(lineItemsValidation.linesSubtotalCents), suggestedValue: String(subtotalCents), status: "OPEN" });
    }
    if (preparedLineItems.some((item) => !item.accountCode)) {
      decisionExceptions.push({ code: "LINE_ITEM_CLASSIFICATION_REVIEW", fieldName: "lineItems", message: "Chaque ligne doit avoir un compte comptable confirmé.", aiValue: null, suggestedValue: null, status: "OPEN" });
    }
    let reviewSaved = false;
    try {
      await saveInvoiceIntakeReview({
        receiptId: selectedIntake.receiptId,
        status,
        vendor: draft.vendor.trim(),
        invoiceNumber: draft.invoiceNumber.trim() || null,
        invoiceDate: draft.invoiceDate,
        subtotalCents,
        tpsCents,
        tvqCents,
        totalCents,
        currency: draft.currency.trim().toUpperCase() || "CAD",
        sku: draft.sku.trim() || null,
        category: draft.category.trim() || null,
        projectId: draft.projectId || null,
        accountCode: summaryAccountCode,
        classificationCategory: classificationCategory || null,
        classificationSource,
        classificationConfidence,
        classificationStatus,
        aiNotes: draft.notes.trim(),
        lineItems: JSON.stringify(preparedLineItems),
        writeAudit: changedFields.length > 0,
        decisionExceptions: serializeDecisionExceptions(decisionExceptions),
        decisionChecks: serializeDecisionChecks([{ code: "KIM_REVIEW", passed: isReadyForAccounting, message: isReadyForAccounting ? "Revue KIM complète." : "La revue KIM reste incomplète." }]),
        reviewRevision: selectedIntake.reviewRevision ?? 0,
        auditDetails: auditDetails({
          source: "HUMAN_EDIT",
          status,
          changedFields,
          corrections: changedFields.map((field) => ({ field, previous: previousValues[field as keyof typeof previousValues], corrected: correctedValues[field as keyof typeof correctedValues] })),
        }),
      });
      reviewSaved = true;
      onSaved(selectedIntake.receiptId, {
        status,
        processingStatus: status,
        accountingStatus: "NOT_POSTED",
        lastError: undefined,
        extractedVendor: draft.vendor.trim(),
        extractedInvoiceNumber: draft.invoiceNumber.trim() || undefined,
        extractedInvoiceDate: draft.invoiceDate,
        extractedSubtotalCents: String(subtotalCents),
        extractedTpsCents: String(tpsCents),
        extractedTvqCents: String(tvqCents),
        extractedTotalCents: String(totalCents),
        extractedCurrency: draft.currency.trim().toUpperCase() || "CAD",
        extractedSku: draft.sku.trim() || undefined,
        extractedCategory: draft.category.trim() || undefined,
        extractedProjectId: draft.projectId || undefined,
        lineItems: preparedLineItems,
        classificationAccountCode: summaryAccountCode || undefined,
        classificationCategory: classificationCategory || undefined,
        classificationSource,
        classificationConfidence,
        classificationStatus,
        aiNotes: draft.notes.trim(),
        decisionExceptions: serializeDecisionExceptions(decisionExceptions),
        decisionChecks: serializeDecisionChecks([{ code: "KIM_REVIEW", passed: isReadyForAccounting, message: isReadyForAccounting ? "Revue KIM complète." : "La revue KIM reste incomplète." }]),
        reviewRevision: (selectedIntake.reviewRevision ?? 0) + 1,
      });
      setDraftDirty(false);
      setSaveState("saved");
      if (action === "commit") {
        await commitInvoiceIntake(commitInput);
        onSaved(selectedIntake.receiptId, {
          status: "VALIDATED",
          processingStatus: "VALIDATED",
          accountingStatus: "POSTED",
          classificationSource: "KIM_COMMIT",
          classificationStatus: "RESOLVED",
          classificationConfidence: 1,
          lastError: undefined,
        });
        setCommitState("saved");
        setSaveMessage("Correction enregistrée et écriture comptable créée; dossier marqué comme traité.");
        return;
      }
      setCommitState("idle");
      setSaveMessage(
        status === "VALIDATED"
          ? "Revue enregistrée; prête pour la création comptable."
          : !allLineAccountsConfirmed
            ? "Correction enregistrée; chaque ligne doit encore recevoir un compte comptable."
            : !commitCardId
              ? "Correction enregistrée; la carte utilisée doit être confirmée avant la création."
              : "Correction enregistrée; certains contrôles doivent encore être confirmés.",
      );
    } catch (error) {
      setSaveState(reviewSaved ? "saved" : "error");
      setCommitState(action === "commit" ? "error" : "idle");
      setSaveMessage(error instanceof Error ? error.message : "La revue n'a pas pu être enregistrée.");
    }
  };

  const commitAccounting = async () => {
    if (!selectedIntake) return;
    if (processingStatusOf(selectedIntake) !== "VALIDATED" || draftDirty) {
      setCommitState("error");
    setSaveMessage("Enregistrez d'abord la revue avant de créer l'écriture comptable.");
      return;
    }
    const subtotalCents = dollarsToCents(draft.subtotal);
    const tpsCents = dollarsToCents(draft.tps);
    const tvqCents = dollarsToCents(draft.tvq);
    const totalCents = dollarsToCents(draft.total);
    if (!draft.vendor.trim() || !draft.invoiceDate || subtotalCents == null || tpsCents == null || tvqCents == null || totalCents == null || !allLineAccountsConfirmed || !commitCardId) {
      setCommitState("error");
      setSaveMessage("Le fournisseur, la date, les montants, chaque compte de ligne et la carte sont requis. Le projet et la période du relevé sont facultatifs.");
      return;
    }
    if (!window.confirm(`Créer l’écriture comptable pour ${draft.vendor.trim()} (${formatCurrency(totalCents / 100)}) ?`)) return;
    setCommitState("saving");
    setSaveMessage("");
    try {
      await commitInvoiceIntake({
        receiptId: selectedIntake.receiptId,
        vendor: draft.vendor.trim(),
        invoiceNumber: draft.invoiceNumber.trim() || null,
        invoiceDate: draft.invoiceDate,
        subtotalCents,
        tpsCents,
        tvqCents,
        totalCents,
        currency: draft.currency.trim().toUpperCase() || "CAD",
        sku: draft.sku.trim() || null,
        category: classificationCategory || "Divers",
        accountCode: summaryAccountCode,
        cardId: commitCardId,
        statementPeriodId: commitPeriodId || null,
        projectId: draft.projectId || null,
        classificationNote: draft.notes.trim() || "Revue confirmée.",
        lineItems: JSON.stringify(preparedLineItems),
      });
      onSaved(selectedIntake.receiptId, {
        status: "VALIDATED",
        processingStatus: "VALIDATED",
        accountingStatus: "POSTED",
        classificationSource: "KIM_COMMIT",
        classificationStatus: "RESOLVED",
        classificationConfidence: 1,
        lastError: undefined,
      });
      setCommitState("saved");
      setSaveMessage("Écriture comptable et facture créées; dossier marqué comme traité.");
    } catch (error) {
      setCommitState("error");
      setSaveMessage(error instanceof Error ? error.message : "L'écriture comptable n'a pas pu être créée.");
    }
  };

  const discardReview = async () => {
    if (!selectedIntake) return;
    const description = `${draft.vendor.trim() || "cette facture"}${draft.invoiceNumber.trim() ? ` no ${draft.invoiceNumber.trim()}` : ""}`;
    if (!window.confirm(`Supprimer ${description} ? La facture sera retirée de la file et sa photo Storage sera supprimée. Cette action est réservée à KIM/ADMIN.`)) return;
    setSaveState("saving");
    setSaveMessage("");
    try {
      const result = await discardInvoiceIntake({
        receiptId: selectedIntake.receiptId,
        reason: "Facture retirée manuellement de la file de traitement.",
      });
      onSaved(selectedIntake.receiptId, {
        status: "DELETED",
        processingStatus: "DELETED",
        accountingStatus: "NOT_POSTED",
        lastError: "Facture retirée par un utilisateur autorisé.",
      });
      setSaveState("saved");
      setSaveMessage(result.storageCleanup === "failed"
        ? "Facture retirée de la file; la photo Storage doit encore être nettoyée."
        : "Facture supprimée et photo Storage supprimée.");
    } catch (error) {
      setSaveState("error");
      setSaveMessage(error instanceof Error ? error.message : "La facture n'a pas pu être supprimée.");
    }
  };

  return <>
    <PageHeading eyebrow="Traitement des factures" title="Factures à vérifier" description="Les exceptions et les factures validées mais pas encore comptabilisées restent ici jusqu’à leur traitement final. Elles apparaîtront dans Transactions seulement après la création de l’écriture comptable." />
    <section className="intake-review-layout">
      <section className="panel intake-panel">
          <div className="panel-header">
          <div><p className="eyebrow">File de traitement</p><h2>{items.length ? `${items.length} facture${items.length > 1 ? "s" : ""}` : "Aucune facture à traiter"}</h2></div>
          <span className="data-source-help">Les factures fiables sont comptabilisées sans intervention KIM.</span>
        </div>
        {sortedItems.length ? <div className="intake-list">
          {sortedItems.map((intake) => {
            const total = intake.extractedTotalCents == null ? null : Number(intake.extractedTotalCents) / 100;
            const category = intake.classificationCategory ?? intake.extractedCategory ?? "À classer";
            const account = intake.classificationAccountCode ?? "À choisir";
            return <button type="button" className={`intake-row ${selectedReceiptId === intake.receiptId ? "selected" : ""}`} key={intake.receiptId} onClick={() => selectIntake(intake)} aria-pressed={selectedReceiptId === intake.receiptId}>
              <div className="receipt-icon" aria-hidden="true">▤</div>
              <div className="intake-main">
                <strong>{intake.extractedVendor ?? "Fournisseur à identifier"}</strong>
                <span>{intake.receiptId.slice(0, 8)} · {intake.photoCount} photo{intake.photoCount > 1 ? "s" : ""} · {formatDate(intake.updatedAt.slice(0, 10))}</span>
                {intakeReviewMessages(intake).map((message) => <small className="intake-error" key={message}>{message}</small>)}
                {!intakeReviewMessages(intake).length && intake.aiNotes && <small>{intake.aiNotes}</small>}
              </div>
              <div className="intake-fields"><span>Catégorie <strong>{category}</strong></span><span>Compte <strong>{account}</strong></span></div>
              <strong className="intake-total">{total == null || Number.isNaN(total) ? "—" : formatCurrency(total)}</strong>
              <span className={intakeStatusClass(processingStatusOf(intake))}>{intakeQueueStatusLabel(intake)}</span>
            </button>;
          })}
        </div> : <div className="empty-state"><span>◌</span><strong>Les prochains dépôts apparaîtront ici</strong><p>Après un envoi, Gemini extrait la facture et conserve sa proposition pour validation.</p></div>}
      </section>
      {selectedIntake ? <form className="panel intake-review" onSubmit={(event) => void saveReview(event, "save")}>
        <div className="panel-header"><div><p className="eyebrow">{processingStatusOf(selectedIntake) === "VALIDATED" ? "Prête pour comptabilisation" : "Exception à résoudre"}</p><h2>{draft.vendor || "Facture sélectionnée"}</h2></div><span className={intakeStatusClass(processingStatusOf(selectedIntake))}>{intakeQueueStatusLabel(selectedIntake)}</span></div>
        {canRetryAi && <div className="detail-alert"><div><p className="eyebrow">Erreur technique sans extraction</p><span>La lecture IA n’a enregistré aucune donnée; vous pouvez relancer l’analyse après correction du traitement.</span><button className="secondary-button" type="button" onClick={() => void retryAi()} disabled={retryState === "saving"}>{retryState === "saving" ? "Nouvelle analyse…" : "Relancer l’analyse IA"}</button>{retryMessage && <p className={`intake-review-message ${retryState}`}>{retryMessage}</p>}</div></div>}
        {visibleReviewMessages.length > 0 && <div className="detail-alert"><div className="detail-alert-icon">!</div><div><p className="eyebrow">À corriger</p>{visibleReviewMessages.map((message) => <span key={message}>{message}</span>)}</div></div>}
        <InvoiceIntakeEvidence key={selectedIntake.receiptId} intake={selectedIntake} />
        <AuditTrailView events={auditEvents} role={identity.role} state={auditState} cards={cards} projects={projects} />
        <div className="intake-review-form">
          <label className={`field wide ${needsCorrection("vendor") ? "needs-correction" : ""}`}><span>Fournisseur</span><input aria-invalid={needsCorrection("vendor")} value={draft.vendor} onChange={(event) => updateDraft("vendor", event.target.value)} /></label>
          <div className="field-grid"><label className={`field ${needsCorrection("invoiceNumber") ? "needs-correction" : ""}`}><span>No de facture</span><input aria-invalid={needsCorrection("invoiceNumber")} value={draft.invoiceNumber} onChange={(event) => updateDraft("invoiceNumber", event.target.value)} /></label><label className={`field ${needsCorrection("invoiceDate") ? "needs-correction" : ""}`}><span>Date</span><input aria-invalid={needsCorrection("invoiceDate")} type="date" value={draft.invoiceDate} onChange={(event) => updateDraft("invoiceDate", event.target.value)} /></label></div>
          <div className="field-grid"><label className={`field ${needsCorrection("subtotalCents") ? "needs-correction" : ""}`}><span>Sous-total</span><input aria-invalid={needsCorrection("subtotalCents")} inputMode="decimal" value={draft.subtotal} onChange={(event) => updateDraft("subtotal", event.target.value)} /></label><label className={`field ${needsCorrection("totalCents") ? "needs-correction" : ""}`}><span>Total</span><input aria-invalid={needsCorrection("totalCents")} inputMode="decimal" value={draft.total} onChange={(event) => updateDraft("total", event.target.value)} /></label><label className={`field ${needsCorrection("tpsCents") ? "needs-correction" : ""}`}><span>TPS</span><input aria-invalid={needsCorrection("tpsCents")} inputMode="decimal" value={draft.tps} onChange={(event) => updateDraft("tps", event.target.value)} /></label><label className={`field ${needsCorrection("tvqCents") ? "needs-correction" : ""}`}><span>TVQ</span><input aria-invalid={needsCorrection("tvqCents")} inputMode="decimal" value={draft.tvq} onChange={(event) => updateDraft("tvq", event.target.value)} /></label></div>
          <InvoiceLineItemsReview items={draft.lineItems} vendor={draft.vendor} subtotalCents={draftSubtotalCents} accounts={accounts} skuReferences={skuReferences} onUpdate={updateLineItem} onAdd={addLineItem} onRemove={removeLineItem} />
          <div className={`field wide ${needsCorrection("accountCode") || !allLineAccountsConfirmed ? "needs-correction" : ""}`}><span>Compte résumé (facultatif)</span><div className="field-value">{summaryAccountCode ? `${summaryAccountCode} · ventilation uniforme` : lineAccountCodes.length > 1 ? "Ventilation multi-comptes — voir les lignes" : "Aucun compte de ligne confirmé"}</div><small>La ventilation des lignes est la source de vérité. Le compte résumé n’est affiché que lorsque toutes les lignes utilisent le même compte.</small></div>
          <label className="field wide"><span>Chantier / projet (facultatif)</span><select value={draft.projectId} onChange={(event) => updateDraft("projectId", event.target.value)}><option value="">Ajouter le projet plus tard</option>{projects.filter((project) => project.status !== "INACTIVE").map((project) => <option key={project.id} value={project.id}>{project.number} · {project.name}</option>)}</select><small>Le projet est temporairement retiré des conditions d’acceptation. Vous pouvez l’ajouter maintenant ou plus tard.</small></label>
          <label className="field wide"><span>Note de revue (facultative)</span><textarea rows={3} value={draft.notes} onChange={(event) => updateDraft("notes", event.target.value)} /><small>Expliquez brièvement ce qui reste incertain ou la décision prise. Laissez ce champ vide si aucune précision n’est nécessaire.</small></label>
          <section className="intake-commit-card">
            <div><p className="eyebrow">Création comptable</p><h3>Références comptables</h3><p className="muted">Choisissez la carte utilisée et le cycle comptable. Ces informations alimentent directement le tableau de Kim après la comptabilisation.</p></div>
            <div className="field-grid">
              <label className={`field ${cardNeedsCorrection ? "needs-correction" : ""}`}><span>Carte utilisée</span><select aria-invalid={cardNeedsCorrection} value={commitCardId} onChange={(event) => { setCommitCardId(event.target.value); setCommitState("idle"); }}><option value="">Choisir la carte</option>{selectableCards.map((card) => <option key={card.id} value={card.id}>•••• {card.lastFour} · {card.holder}</option>)}</select>{suggestedCard && suggestedUploader ? <small>Suggestion : carte de {suggestedUploader.displayName}, selon le compte qui a envoyé la facture.</small> : cardNeedsCorrection ? <small>{cardReviewMessage}</small> : null}</label>
              <label className="field"><span>Période du relevé (facultatif)</span><select value={commitPeriodId} onChange={(event) => { setCommitPeriodId(event.target.value); setCommitState("idle"); }}><option value="">Aucune période sélectionnée</option>{periods.map((period) => <option key={period.id} value={period.id}>{period.label}</option>)}</select><small>Cette association classe l’écriture dans le cycle du tableau de Kim.</small></label>
            </div>
            {processingStatusOf(selectedIntake) !== "VALIDATED" && <small>Enregistrez la correction et confirmez le compte de chaque ligne avant de créer l’écriture.</small>}
            {draftDirty && <small>Des changements non enregistrés désactivent la création jusqu&apos;à la prochaine sauvegarde.</small>}
            <button className="secondary-button" type="button" onClick={commitAccounting} disabled={commitState === "saving" || processingStatusOf(selectedIntake) !== "VALIDATED" || draftDirty}>{commitState === "saving" ? "Création…" : "Comptabiliser sans nouvelle correction"}</button>
          </section>
          {saveMessage && <p className={`intake-review-message ${messageState}`}>{saveMessage}</p>}
          <div className="intake-review-actions"><button className="text-button danger-text" type="button" onClick={() => void discardReview()} disabled={saveState === "saving" || commitState === "saving"}>Supprimer la facture</button><div className="intake-review-primary-actions">{isReadyForAccounting && <button className="primary-button" type="button" onClick={() => void saveReview(undefined, "commit")} disabled={saveState === "saving" || commitState === "saving"}>{commitState === "saving" ? "Enregistrement et comptabilisation…" : "Enregistrer et comptabiliser"}</button>}<button className={isReadyForAccounting ? "secondary-button" : "primary-button"} type="submit" disabled={saveState === "saving" || commitState === "saving"}>{saveState === "saving" ? "Enregistrement…" : isReadyForAccounting ? "Enregistrer pour plus tard" : "Enregistrer la correction"}</button></div><span className="data-source-help">La suppression et la création comptable sont réservées aux personnes autorisées; les opérations sont idempotentes.</span></div>
        </div>
      </form> : <div className="panel empty-state"><span>◌</span><strong>Sélectionnez un dépôt</strong><p>La proposition Gemini et les corrections manuelles apparaîtront ici.</p></div>}
    </section>
  </>;
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted heading-description">{description}</p></div>{action}</div>;
}

function PeriodSelector({ period, onChange }: { period: CardPeriod; onChange: (period: CardPeriod) => void }) {
  const { periods } = useAppData();
  const selectedPreset = periods.some((option) => option.id === period.id) ? period.id : "custom";
  const updateDate = (field: "start" | "end", value: string) => {
    const nextStart = field === "start" ? value : period.start;
    const nextEnd = field === "end" ? value : period.end;
    onChange({ ...period, id: "custom", start: nextStart, end: nextEnd, label: formatDate(nextStart) + " → " + formatDate(nextEnd), statementLabel: "Relevé Mastercard · période personnalisée" });
  };
  return <div className="period-selector"><span>Période des cartes</span><select value={selectedPreset} onChange={(event) => { const option = periods.find((candidate) => candidate.id === event.target.value); if (option) onChange(option); }}><option value="custom">Période personnalisée</option>{periods.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select><div className="period-custom-dates"><label><span>Du</span><input type="date" value={period.start} max={period.end} onChange={(event) => updateDate("start", event.target.value)} /></label><span className="period-date-arrow">→</span><label><span>Au</span><input type="date" value={period.end} min={period.start} onChange={(event) => updateDate("end", event.target.value)} /></label></div><small>Cycle standard : du 10 au 9. Une personne autorisée peut ajuster les dates avec une période personnalisée.</small></div>;
}

function Dashboard({ onNavigate, onOpenTransactions, period, onPeriodChange }: { onNavigate: (view: View) => void; onOpenTransactions: (person?: string) => void; period: CardPeriod; onPeriodChange: (period: CardPeriod) => void }) {
  const { cards, transactions } = useAppData();
  const holderRows = uniqueCreditCards(cards.filter((card) => card.status === "Actif")).map((card) => {
    const items = transactions.filter((transaction) => transaction.person === card.holder && isTransactionInPeriod(transaction, period));
    return { card, items, total: items.reduce((sum, item) => sum + item.total, 0) };
  });

  return <>
    <PageHeading eyebrow="Vue d’ensemble" title="Bonjour Kim" description="Un espace de contrôle organisé par titulaire, facture et période comptable." action={<button className="primary-button" onClick={() => onNavigate("capture")}><span>＋</span> Ouvrir le mode travailleur</button>} />
    <div className="filter-strip"><PeriodSelector period={period} onChange={onPeriodChange} /><span className="filter-divider" /><span className="live-indicator"><span className="status-dot" /> Données prêtes pour le cycle sélectionné</span></div>
    <div className="dashboard-tabs" aria-label="Raccourcis du tableau de bord">
      <button className="dashboard-tab active" aria-current="page">1 · Titulaires</button>
      <button className="dashboard-tab" onClick={() => onOpenTransactions()}>2 · Transactions par personne</button>
      <button className="dashboard-tab" onClick={() => onNavigate("intakes")}>3 · Factures à vérifier</button>
      <button className="dashboard-tab" onClick={() => onNavigate("reports")}>4 · Tableau</button>
    </div>
    <DashboardHoldersTab rows={holderRows} onChoose={onOpenTransactions} />
  </>;
}

type HolderRow = { card: CreditCard; items: Transaction[]; total: number };

function DashboardHoldersTab({ rows, onChoose }: { rows: HolderRow[]; onChoose: (person: string) => void }) {
  const transactionCount = rows.reduce((sum, row) => sum + row.items.length, 0);
  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);
  return <section className="dashboard-tab-panel">
    <div className="dashboard-tab-heading"><div><p className="eyebrow">1er onglet · cartes actives</p><h2>Qui a dépensé quoi?</h2><p className="muted">Chaque titulaire est résumé avec son nombre de transactions et son total pour la période.</p></div><div className="dashboard-total-pill"><strong>{transactionCount}</strong><span>transactions · {formatCurrency(grandTotal)}</span></div></div>
    <div className="holder-summary-grid">{rows.map((row) => <button className="holder-summary-card" key={row.card.id} onClick={() => onChoose(row.card.holder)}><span className="holder-summary-top"><span className="avatar avatar-blue small">{row.card.holder.charAt(0)}</span><span><strong>{row.card.holder}</strong><small>Carte ···· {row.card.lastFour}</small></span><span className="row-arrow">→</span></span><span className="holder-summary-metrics"><span><strong>{row.items.length}</strong><small>transaction{row.items.length === 1 ? "" : "s"}</small></span><span><strong>{formatCurrency(row.total)}</strong><small>montant total</small></span></span></button>)}</div>
  </section>;
}

function TransactionsPage({ items, query, setQuery, statusFilter, statusCounts, setStatusFilter, onOpen }: { items: Transaction[]; query: string; setQuery: (value: string) => void; statusFilter: TransactionStatusFilter; statusCounts: TransactionStatusCounts; setStatusFilter: (value: TransactionStatusFilter) => void; onOpen: (id: string) => void }) {
  return <><PageHeading eyebrow="Registre principal" title="Transactions" description="Toutes les dépenses, avec leur provenance et leur état de contrôle." action={<button className="primary-button" type="button"><span>⇩</span> Exporter</button>} /><div className="filter-panel"><div className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un fournisseur, une personne, un chantier…" /></div><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as TransactionStatusFilter)} aria-label="Filtrer les transactions par statut">{transactionStatusFilters.slice(0, 4).map((filter) => <option key={filter} value={filter}>{filter}</option>)}</select><button className="filter-select" type="button">Période <b>⌄</b></button><button className="filter-select" type="button">Plus de filtres <b>＋</b></button></div><div className="quick-filters" aria-label="Filtres rapides de statut">{transactionStatusFilters.map((filter) => <button className={`quick-filter ${statusFilter === filter ? "active" : ""}`} type="button" key={filter} onClick={() => setStatusFilter(filter)} aria-pressed={statusFilter === filter}>{filter} <span>{statusCounts[filter]}</span></button>)}</div><section className="panel transaction-panel"><div className="table-meta"><span><strong>{items.length}</strong> transactions affichées</span><span className="muted">Dernière synchronisation · il y a 2 min</span></div><TransactionTable items={items} onOpen={onOpen} /></section></>;
}

function TransactionTable({ items, compact = false, onOpen }: { items: Transaction[]; compact?: boolean; onOpen?: (id: string) => void }) {
  const data = useAppData();
  return <div className={`table-wrap ${compact ? "compact" : ""}`}><table><thead><tr><th>Dépense</th><th>Date</th><th>Fournisseur</th><th>Titulaire / carte</th><th>Projet</th><th>Compte</th><th>Sous-total</th><th>TPS</th><th>TVQ</th><th>Total</th><th>État / rapprochement</th><th /></tr></thead><tbody>{items.map((item) => { const fallbackClassification = classifyTransaction(item, data); const account = transactionAccountDisplay(item); const accountNumber = account.number === "—" ? fallbackClassification.code : account.number; const accountLabel = account.label === "Compte à confirmer" ? fallbackClassification.category : account.label; const invoiceLabel = item.invoiceNumber ? `Facture ${item.invoiceNumber}` : "Facture sans numéro"; return <tr key={item.id} onClick={() => onOpen?.(item.id)}><td><div className="transaction-id"><span className="receipt-icon">▧</span><span><strong>{item.vendor}</strong><small>{invoiceLabel} · {item.imageCount} photo{item.imageCount > 1 ? "s" : ""}</small></span></div></td><td>{formatDate(item.date)}</td><td>{item.vendor}</td><td>{item.person}<small>•••• {item.card}</small></td><td><strong>{item.projectNumber ?? "—"}</strong><small>{item.projectName ?? item.project}</small></td><td><strong>{accountNumber}</strong><small>{accountLabel}</small></td><td>{formatCurrency(item.subtotal)}</td><td>{formatCurrency(item.tps)}</td><td>{formatCurrency(item.tvq)}</td><td><strong>{formatCurrency(item.total)}</strong></td><td><span className={statusClass(item.status)}>{item.status}</span><small className="table-substatus">{item.reconciliation}</small></td><td><button className="row-menu" onClick={(event) => { event.stopPropagation(); onOpen?.(item.id); }} aria-label={`Ouvrir ${item.vendor}${item.invoiceNumber ? `, facture ${item.invoiceNumber}` : ""}`}>→</button></td></tr>; })}</tbody></table>{items.length === 0 && <div className="empty-state"><span>⌕</span><strong>Aucune transaction trouvée</strong><p>Modifiez vos filtres pour élargir la recherche.</p></div>}</div>;
}

function TransactionDetail({ transaction, onBack, onDeleted }: { transaction: Transaction; onBack: () => void; onDeleted: (transactionId: string) => void }) {
  const data = useAppData();
  const identity = useFirebaseIdentity();
  const accountDisplay = transactionAccountDisplay(transaction);
  const detailSource = transaction.storageFolder ?? (transaction.receiptId ? `Dépôt ${transaction.receiptId}` : "Non disponible");
  const accountingLabel = transaction.accountingStatus === "POSTED" ? "Écriture comptabilisée" : "Lecture seule";
  const lineItems = transaction.lineItems ?? [];
  const lineSubtotalCents = invoiceLineItemsSubtotalCents(lineItems);
  const lineDifferenceCents = lineSubtotalCents - Math.round(transaction.subtotal * 100);
  const canCorrect = transaction.accountingStatus === "POSTED" && Boolean(transaction.invoiceId) && (identity.role === "KIM" || identity.role === "ADMIN");
  const canDelete = transaction.accountingStatus === "POSTED" && Boolean(transaction.invoiceId) && (identity.role === "KIM" || identity.role === "ADMIN");
  const [correctionField, setCorrectionField] = useState("subtotalCents");
  const [correctionValue, setCorrectionValue] = useState(String(transaction.subtotal.toFixed(2)));
  const [correctionAccountId, setCorrectionAccountId] = useState(transaction.accountId ?? "");
  const [correctionNote, setCorrectionNote] = useState("");
  const [correctionState, setCorrectionState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [correctionMessage, setCorrectionMessage] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteState, setDeleteState] = useState<"idle" | "saving" | "error">("idle");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [corrections, setCorrections] = useState<Array<{ id: string; fieldName: string; previousValue?: string | null; correctedValue: string; note: string; createdAt: string; correctedBy?: string }>>([]);
  useEffect(() => {
    if (!transaction.id || transaction.accountingStatus !== "POSTED") return;
    void loadTransactionCorrections(transaction.id).then((rows) => setCorrections(rows.map((row) => ({
      id: row.id,
      fieldName: row.fieldName,
      previousValue: row.previousValue,
      correctedValue: row.correctedValue,
      note: row.note ?? "",
      createdAt: row.createdAt,
      correctedBy: row.correctedBy?.displayName ?? "Utilisateur autorisé",
    })))).catch(() => setCorrections([]));
  }, [transaction.accountingStatus, transaction.id]);
  const savePostedCorrection = async () => {
    if (!canCorrect || !transaction.invoiceId) return;
    if (!correctionNote.trim()) {
      setCorrectionState("error");
      setCorrectionMessage("Une note de correction est obligatoire pour conserver le contexte de l’audit.");
      return;
    }
    const currentValues = {
      subtotalCents: Math.round(transaction.subtotal * 100),
      tpsCents: Math.round(transaction.tps * 100),
      tvqCents: Math.round(transaction.tvq * 100),
      totalCents: Math.round(transaction.total * 100),
    };
    const nextValues = { ...currentValues };
    let previousValue: string | null = null;
    let correctedValue = correctionValue.trim();
    let lineItemsJson = JSON.stringify(lineItems);
    let category = transaction.category;
    let accountId = transaction.accountId ?? null;
    if (correctionField === "account") {
      const account = data.accounts.find((candidate) => candidate.id === correctionAccountId);
      if (!account) {
        setCorrectionState("error");
        setCorrectionMessage("Sélectionnez un compte actif.");
        return;
      }
      previousValue = accountDisplay.number;
      correctedValue = account.number;
      category = account.label;
      accountId = account.id;
      lineItemsJson = JSON.stringify(lineItems.map((item) => ({ ...item, accountCode: account.number, classificationSource: "POSTED_CORRECTION", classificationStatus: "CONFIRMED", classificationConfidence: 1 })));
    } else {
      const cents = dollarsToCents(correctionValue);
      if (cents == null || cents < 0) {
        setCorrectionState("error");
        setCorrectionMessage("Saisissez un montant valide en dollars canadiens.");
        return;
      }
      previousValue = String(currentValues[correctionField as keyof typeof currentValues]);
      nextValues[correctionField as keyof typeof nextValues] = cents;
      correctedValue = String(cents);
    }
    if (nextValues.subtotalCents + nextValues.tpsCents + nextValues.tvqCents !== nextValues.totalCents) {
      setCorrectionState("error");
      setCorrectionMessage("Le total doit correspondre au sous-total plus la TPS et la TVQ.");
      return;
    }
    setCorrectionState("saving");
    setCorrectionMessage("");
    try {
      await correctPostedInvoice({
        invoiceId: transaction.invoiceId,
        transactionId: transaction.id,
        fieldName: correctionField,
        previousValue,
        correctedValue,
        note: correctionNote.trim(),
        vendor: transaction.vendor,
        invoiceNumber: transaction.invoiceNumber === "—" ? null : transaction.invoiceNumber,
        invoiceDate: transaction.date,
        ...nextValues,
        lineItems: lineItemsJson,
        category,
        accountId,
      });
      setCorrectionState("saved");
      setCorrectionMessage("Correction enregistrée avec la valeur précédente et la note d’audit.");
      setCorrections((current) => [...current, { id: `local-${Date.now()}`, fieldName: correctionField, previousValue, correctedValue, note: correctionNote.trim(), createdAt: new Date().toISOString(), correctedBy: identity.user?.displayName ?? identity.user?.email ?? "Utilisateur autorisé" }]);
      setCorrectionNote("");
    } catch (error) {
      setCorrectionState("error");
      setCorrectionMessage(error instanceof Error ? error.message : "La correction n’a pas pu être enregistrée.");
    }
  };
  const deletePosted = async () => {
    if (!canDelete || !transaction.invoiceId) return;
    if (!deleteReason.trim()) {
      setDeleteState("error");
      setDeleteMessage("Une raison est obligatoire pour supprimer une écriture publiée.");
      return;
    }
    if (!window.confirm(`Retirer ${transaction.vendor}${transaction.invoiceNumber !== "—" ? ` · facture ${transaction.invoiceNumber}` : ""} des transactions et des rapports ? La trace d’audit sera conservée.`)) return;
    setDeleteState("saving");
    setDeleteMessage("");
    try {
      await deletePostedInvoice({
        invoiceId: transaction.invoiceId,
        transactionId: transaction.id,
        receiptId: transaction.receiptId,
        reason: deleteReason.trim(),
      });
      onDeleted(transaction.id);
    } catch (error) {
      setDeleteState("error");
      setDeleteMessage(error instanceof Error ? error.message : "La facture publiée n’a pas pu être supprimée.");
    }
  };
  return <>
    <div className="detail-toolbar">
      <button className="back-button" onClick={onBack}>← <span>Transactions</span></button>
      <div className="detail-toolbar-actions">
        <span className={statusClass(transaction.status)}>{transaction.status}</span>
        <span className="data-source-help">{accountingLabel}</span>
      </div>
    </div>
    <div className="detail-layout">
      <section className="evidence-panel">
        <div className="evidence-top"><div><p className="eyebrow">Preuve · {transaction.imageCount} photo{transaction.imageCount > 1 ? "s" : ""}</p><h1>{transaction.vendor}</h1></div><span className="data-source-help">Lecture seule · Storage</span></div>
        <TransactionEvidence transaction={transaction} />
      </section>
      <aside className="detail-form">
        <div className="form-section"><div className="section-heading"><span>01</span><div><p className="eyebrow">Provenance</p><h2>Source de la transaction</h2></div></div><div className="provenance-card"><div className="avatar avatar-blue">{transaction.person.slice(0, 1).toUpperCase()}</div><div><strong>{transaction.submittedBy}</strong><span>Transaction enregistrée le {formatDate(transaction.date)}</span></div><span className="verified-mark">✓</span></div><div className="field-grid"><Field label="Personne associée" value={transaction.person} /><Field label="Carte détectée" value={`•••• ${transaction.card}`} hint="Carte liée à l’écriture" tone="success" /><Field label="Dossier source" value={detailSource} /><Field label="Réception" value={transaction.receiptId ?? "Référence de dépôt non disponible"} /></div></div>
         <div className="form-section"><div className="section-heading"><span>02</span><div><p className="eyebrow">Facture</p><h2>Données principales</h2></div></div><div className="field-grid"><Field label="Fournisseur" value={transaction.vendor} /><Field label="No facture" value={transaction.invoiceNumber} /><Field label="Date de facture" value={formatDate(transaction.date)} /><Field label="Chantier" value={transaction.project} /><Field label="Catégorie" value={transaction.category} /><Field label="Compte comptable" value={`${accountDisplay.number} · ${accountDisplay.label}`} invalid={transaction.correctionField === "account"} wide /></div></div>
        {transaction.issue && <div className="detail-alert"><div className="detail-alert-icon">!</div><div><p className="eyebrow">Action requise avant validation</p><strong>{transaction.issue}</strong><span>{transaction.correction ?? "Correction humaine requise avant validation."}</span></div></div>}
         <div className="form-section"><div className="section-heading"><span>03</span><div><p className="eyebrow">Montants</p><h2>Contrôle comptable</h2></div><span className="control-ok">✓ Totaux persistés</span></div><div className="amount-card"><div><span>Sous-total</span><strong>{formatCurrency(transaction.subtotal)}</strong></div><div><span>TPS</span><strong>{formatCurrency(transaction.tps)}</strong></div><div><span>TVQ</span><strong>{formatCurrency(transaction.tvq)}</strong></div><div className="amount-total"><span>Total</span><strong>{formatCurrency(transaction.total)}</strong></div></div></div>
        {canCorrect && <div className="form-section"><div className="section-heading"><span>05</span><div><p className="eyebrow">Correction contrôlée</p><h2>Corriger une écriture publiée</h2></div><span className="badge badge-warning">KIM / ADMIN</span></div><p className="muted">La valeur précédente reste dans TransactionCorrection; la facture et la transaction sont mises à jour dans la même transaction.</p><div className="field-grid"><label className="field"><span>Champ</span><select value={correctionField} onChange={(event) => { setCorrectionField(event.target.value); setCorrectionState("idle"); }}><option value="subtotalCents">Sous-total</option><option value="tpsCents">TPS</option><option value="tvqCents">TVQ</option><option value="totalCents">Total</option><option value="account">Compte / ventilation</option></select></label>{correctionField === "account" ? <label className="field"><span>Nouveau compte</span><select value={correctionAccountId} onChange={(event) => setCorrectionAccountId(event.target.value)}><option value="">Choisir le compte</option>{data.accounts.filter((account) => account.status !== "INACTIVE" && account.type === "EXPENSE").map((account) => <option value={account.id} key={account.id}>{account.number} · {account.label}</option>)}</select></label> : <label className="field"><span>Nouvelle valeur</span><input inputMode="decimal" value={correctionValue} onChange={(event) => setCorrectionValue(event.target.value)} /></label>}</div><label className="field wide"><span>Note obligatoire</span><textarea rows={2} value={correctionNote} onChange={(event) => setCorrectionNote(event.target.value)} placeholder="Pourquoi cette correction est-elle nécessaire?" /></label><button className="secondary-button" type="button" onClick={() => void savePostedCorrection()} disabled={correctionState === "saving"}>{correctionState === "saving" ? "Enregistrement…" : "Enregistrer la correction auditée"}</button>{correctionMessage && <p className={`intake-review-message ${correctionState}`}>{correctionMessage}</p>}</div>}
        {corrections.length > 0 && <div className="form-section correction-history"><div className="section-heading"><span>06</span><div><p className="eyebrow">Piste de correction</p><h2>Valeurs originales conservées</h2></div><span className="badge badge-neutral">{corrections.length}</span></div><div className="settings-editor-list">{corrections.map((correction) => <div className="settings-inline-row" key={correction.id}><div><strong>{correction.fieldName}</strong><span>{correction.previousValue ?? "—"} → {correction.correctedValue}</span><small>{correction.note} · {correction.correctedBy ?? "Utilisateur autorisé"} · {formatDate(correction.createdAt)}</small></div></div>)}</div></div>}
        {canDelete && <div className="form-section correction-editor correction-editor-danger"><div className="section-heading"><span>07</span><div><p className="eyebrow">Suppression contrôlée</p><h2>Retirer de la comptabilité</h2></div><span className="badge badge-danger">KIM / ADMIN</span></div><p className="muted">La facture et l’écriture disparaîtront des transactions, rapprochements et rapports. L’action est auditée et les totaux seront recalculés après actualisation.</p><label className="field wide"><span>Raison obligatoire</span><textarea rows={2} value={deleteReason} onChange={(event) => { setDeleteReason(event.target.value); setDeleteState("idle"); }} placeholder="Ex. facture test envoyée par erreur" /></label><button className="danger-button" type="button" onClick={() => void deletePosted()} disabled={deleteState === "saving"}>{deleteState === "saving" ? "Suppression…" : "Supprimer la facture et l’écriture"}</button>{deleteMessage && <p className={`intake-review-message ${deleteState}`}>{deleteMessage}</p>}</div>}
        <div className="form-section"><div className="section-heading"><span>04</span><div><p className="eyebrow">Articles</p><h2>Détail des articles</h2></div><span className={lineItems.length && Math.abs(lineDifferenceCents) <= 1 ? "control-ok" : "control-warning"}>{lineItems.length ? `${lineItems.length} ligne${lineItems.length > 1 ? "s" : ""}` : "Détail absent"}</span></div>{lineItems.length ? <><div className="line-items">{lineItems.map((item, index) => <div className="line-item" key={`${item.sequence}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.description || "Article à confirmer"}</strong><small>{item.quantity == null ? "Quantité à confirmer" : `Qté ${item.quantity}`}{item.sku ? ` · SKU ${item.sku}` : ""} · {item.category ?? "Catégorie à confirmer"} · Compte {item.accountCode ?? "à confirmer"}</small></div><strong>{item.amountCents == null ? "—" : formatCurrency(item.amountCents / 100)}</strong></div>)}</div><div className={`line-items-control ${Math.abs(lineDifferenceCents) <= 1 ? "success" : "warning"}`}><span>Total lignes {formatCurrency(lineSubtotalCents / 100)}</span><span>{Math.abs(lineDifferenceCents) <= 1 ? "✓ Concorde avec le sous-total" : `Écart avec le sous-total : ${formatCurrency(Math.abs(lineDifferenceCents) / 100)}`}</span></div></> : <div className="line-items"><div className="line-item warning-line"><span>—</span><div><strong>Détail des articles non disponible</strong><small>Cette facture a été persistée sans lignes structurées. Une nouvelle analyse ou une saisie manuelle est requise pour une classification fiable.</small></div><strong>—</strong></div></div>}<div className="field-note">{transaction.note}</div></div>
        <div className="audit-footer"><span>{accountingLabel} dans Data Connect</span><span>{transaction.invoiceId ? `Facture ${transaction.invoiceId}` : "Facture liée non disponible"}</span><span>Référence technique {transaction.id}</span>{corrections.length > 0 && <span>{corrections.length} correction{corrections.length > 1 ? "s" : ""} auditée{corrections.length > 1 ? "s" : ""}</span>}</div>
      </aside>
    </div>
  </>;
}

function Field({ label, value, hint, tone, wide = false, invalid = false }: { label: string; value: string; hint?: string; tone?: string; wide?: boolean; invalid?: boolean }) {
  return <div className={`field ${wide ? "wide" : ""} ${invalid ? "field-invalid" : ""}`}><span>{label}{invalid && <b> · correction requise</b>}</span><div className="field-value">{value}</div>{hint && <small className={tone === "success" ? "hint-success" : ""}>{hint}</small>}</div>;
}

function PhotoPreview({ url, alt }: { url: string; alt: string }) {
  // These are local FileReader previews, so Next image optimization is not applicable.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} />;
}

function IntakeEvidencePreview({ url, alt }: { url: string; alt: string }) {
  // Firebase Storage returns a signed URL that is not known at build time.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} />;
}

type ReconciliationTransaction = { id: string; cardId?: string; date: string; vendor: string; totalCents: number; invoiceId?: string | null; invoiceNumber?: string; projectId?: string; projectNumber?: string; projectName?: string; accountNumber?: string; accountLabel?: string; person?: string; card?: string };
type ReconciliationCandidate = { transaction: ReconciliationTransaction; score: { score: number; reasons: string[]; merchantMatches: boolean } };
type ReconciliationLineResult = { line: StatementLine; status: string; match: { expenseTransactionId: string; invoiceId?: string | null; matchScore: number; matchMethod: string } | null; persistedMatchId?: string; candidates: ReconciliationCandidate[]; reason: string };
type ReconciliationView = { statement: CreditCardStatement; lineResults: ReconciliationLineResult[]; outsideTransactions: Array<{ transaction: ReconciliationTransaction; status: string; reason: string; controlId?: string }>; summary: Record<string, number> };
type StatementImportPlan = { additions: CreditCardStatement[]; duplicates: CreditCardStatement[]; warnings: string[]; errors: string[] };
type PersistedReconciliationContext = {
  statements: CreditCardStatement[];
  lines: Array<Record<string, unknown>>;
  transactions: ReconciliationTransaction[];
  invoices: Array<Record<string, unknown>>;
  aliases: Array<Record<string, unknown>>;
  aliasRules: ReturnType<typeof normalizeMerchantAliasRows>;
  histories: Array<Record<string, unknown>>;
  matches: Array<Record<string, unknown>>;
  outsideControls: Array<Record<string, unknown>>;
};
type PersistedReconciliationPayload = Omit<PersistedReconciliationContext, "aliasRules">;

function normalizePersistedTransaction(raw: Record<string, unknown>): ReconciliationTransaction {
  const card = raw.card as Record<string, unknown> | undefined;
  const holder = card?.holder as Record<string, unknown> | undefined;
  const project = raw.project as Record<string, unknown> | undefined;
  const account = raw.account as Record<string, unknown> | undefined;
  return {
    id: String(raw.id ?? ""),
    cardId: String(card?.id ?? raw.cardId ?? "") || undefined,
    date: String(raw.transactionDate ?? raw.date ?? ""),
    vendor: String(raw.vendor ?? ""),
    totalCents: Number(raw.totalCents ?? 0),
    invoiceId: raw.invoiceId ? String(raw.invoiceId) : null,
    invoiceNumber: raw.invoiceNumber ? String(raw.invoiceNumber) : undefined,
    projectId: String(project?.id ?? raw.projectId ?? "") || undefined,
    projectNumber: String(project?.number ?? raw.projectNumber ?? "") || undefined,
    projectName: String(project?.name ?? raw.projectName ?? "") || undefined,
    accountNumber: String(account?.number ?? raw.accountNumber ?? "") || undefined,
    accountLabel: String(account?.label ?? raw.accountLabel ?? "") || undefined,
    person: String(holder?.displayName ?? raw.person ?? "") || undefined,
    card: String(card?.lastFour ?? raw.card ?? "") || undefined,
  };
}

function normalizePersistedWorkflow(payload: PersistedReconciliationPayload): PersistedReconciliationContext {
  return {
    ...payload,
    transactions: payload.transactions.map(normalizePersistedTransaction),
    aliasRules: normalizeMerchantAliasRows(payload.aliases),
  };
}

function reconciliationStatusLabel(status: string) {
  if (status === RECONCILIATION_STATUSES.MATCHED) return "Jumelée";
  if (status === RECONCILIATION_STATUSES.REVIEW) return "À vérifier";
  if (status === RECONCILIATION_STATUSES.MISSING_INVOICE) return "Facture manquante";
  if (status === RECONCILIATION_STATUSES.OUTSIDE_STATEMENT) return "Hors relevé";
  if (status === RECONCILIATION_STATUSES.DUPLICATE) return "Doublon possible";
  if (status === RECONCILIATION_STATUSES.IGNORED) return "Ignorée";
  return status;
}

function reconciliationStatusTone(status: string) {
  if (status === RECONCILIATION_STATUSES.MATCHED) return "success";
  if (status === RECONCILIATION_STATUSES.MISSING_INVOICE) return "danger";
  if (status === RECONCILIATION_STATUSES.REVIEW || status === RECONCILIATION_STATUSES.DUPLICATE) return "warning";
  return "neutral";
}

function ReconciliationPage({ period, onPeriodChange, isProductionDataSource }: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void; isProductionDataSource: boolean }) {
  const { cards, transactions } = useAppData();
  const identity = useFirebaseIdentity();
  const isLocalEmulatorMode = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "demo-facture-thibeault" && process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true";
  const useServerWorkflow = isLocalEmulatorMode && Boolean(identity.user) && (identity.role === "KIM" || identity.role === "ADMIN");
  const activeCards = uniqueCreditCards(cards.filter((card) => card.status === "Actif"));
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const [statements, setStatements] = useState<CreditCardStatement[]>(() => isProductionDataSource || isLocalEmulatorMode ? [] : DEMO_STATEMENT_IMPORTS as unknown as CreditCardStatement[]);
  const [selectedStatementId, setSelectedStatementId] = useState<string>(() => isProductionDataSource || isLocalEmulatorMode ? "" : (DEMO_STATEMENT_IMPORTS[0]?.id ?? ""));
  const [selectedLineId, setSelectedLineId] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [manualReconciliation, setManualReconciliation] = useState<ReconciliationView | null>(null);
  const [statementImportPlan, setStatementImportPlan] = useState<StatementImportPlan | null>(null);
  const [pendingServerImports, setPendingServerImports] = useState<Array<{ sourceText: string; originalFilename: string; originalStoragePath: string }>>([]);
  const [persistedContext, setPersistedContext] = useState<PersistedReconciliationContext | null>(null);
  const [workflowLoading, setWorkflowLoading] = useState(false);
  const [statementNotice, setStatementNotice] = useState("");
  const [statementError, setStatementError] = useState("");

  const loadPersistedWorkflow = useCallback(async () => {
    if (!useServerWorkflow || !identity.user) return;
    setWorkflowLoading(true);
    try {
      const token = await identity.user.getIdToken();
      const response = await fetch("/api/reconciliation/statements", { cache: "no-store", headers: { Authorization: `Bearer ${token}` } });
      const payload = await response.json() as PersistedReconciliationPayload & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Le workflow persistant n’est pas disponible.");
      const next = normalizePersistedWorkflow(payload);
      setPersistedContext(next);
      setStatements(next.statements);
      setSelectedStatementId((current) => next.statements.some((statement) => statement.id === current) ? current : (next.statements.at(-1)?.id ?? ""));
      setManualReconciliation(null);
    } catch (reason) {
      setStatementError(reason instanceof Error ? reason.message : "Le workflow persistant n’est pas disponible.");
    } finally {
      setWorkflowLoading(false);
    }
  }, [identity.user, useServerWorkflow]);

  useEffect(() => {
    if (!useServerWorkflow) return;
    // This effect synchronizes the screen with the emulator-backed server state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPersistedWorkflow();
  }, [loadPersistedWorkflow, useServerWorkflow]);

  const selectedStatement = statements.find((statement) => statement.id === selectedStatementId) ?? statements[0] ?? null;
  const reconciliationTransactions = useMemo<ReconciliationTransaction[]>(() => transactions.map((transaction) => {
    const card = cards.find((candidate) => candidate.lastFour === transaction.card);
    return { id: transaction.id, cardId: card?.id, date: transaction.date, vendor: transaction.vendor, totalCents: Math.round(transaction.total * 100), invoiceNumber: transaction.invoiceNumber, projectId: transaction.projectId, projectNumber: transaction.projectNumber, projectName: transaction.projectName, accountNumber: transaction.accountNumber, accountLabel: transaction.accountLabel, person: transaction.person, card: transaction.card };
  }), [cards, transactions]);
  const activeReconciliationTransactions = persistedContext?.transactions ?? reconciliationTransactions;
  const baseReconciliation = useMemo<ReconciliationView | null>(() => {
    if (!selectedStatement) return null;
    if (persistedContext) return buildPersistedReconciliation(persistedContext, selectedStatement.id) as ReconciliationView;
    return reconcileStatement(selectedStatement, activeReconciliationTransactions) as ReconciliationView;
  }, [activeReconciliationTransactions, persistedContext, selectedStatement]);
  const reconciliation = manualReconciliation?.statement.id === selectedStatement?.id ? manualReconciliation : baseReconciliation;
  const selectedResult = reconciliation?.lineResults.find((result) => result.line.id === selectedLineId) ?? reconciliation?.lineResults.find((result) => result.status === RECONCILIATION_STATUSES.REVIEW || result.status === RECONCILIATION_STATUSES.DUPLICATE || result.status === RECONCILIATION_STATUSES.MISSING_INVOICE) ?? reconciliation?.lineResults[0] ?? null;
  const selectedCandidate = selectedResult?.candidates.find((candidate) => candidate.transaction.id === selectedCandidateId) ?? selectedResult?.candidates[0] ?? null;

  const selectStatement = (id: string) => {
    setSelectedStatementId(id);
    setManualReconciliation(null);
    setSelectedLineId("");
    setSelectedCandidateId("");
  };

  const handleStatementFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    setStatementError("");
    setStatementNotice("");
    if (isProductionDataSource) {
      setStatementError("L’import Production est volontairement désactivé tant que le workflow serveur et sa migration n’ont pas été validés.");
      return;
    }
    const parsedStatements: CreditCardStatement[] = [];
    const errors: string[] = [];
    const serverImports: Array<{ sourceText: string; originalFilename: string; originalStoragePath: string }> = [];
    for (const file of files) {
      try {
        const source = await file.text();
        serverImports.push({ sourceText: source, originalFilename: file.name, originalStoragePath: `local://${file.name}` });
        const parsed = parseStatementImport(source, { originalFilename: file.name, originalStoragePath: `local://${file.name}`, importedBy: "DEMO-USER-KIM" });
        if (parsed.errors.length || !parsed.statement) errors.push(`${file.name} : ${parsed.errors.join(" ")}`);
        else parsedStatements.push(await finalizeStatementImport(parsed.statement, source) as CreditCardStatement);
      } catch (reason) {
        errors.push(`${file.name} : ${reason instanceof Error ? reason.message : "fichier invalide"}`);
      }
    }
    const plan = buildStatementImportBatch(statements, parsedStatements) as StatementImportPlan;
    setPendingServerImports(serverImports);
    setStatementImportPlan({ ...plan, errors: [...errors, ...plan.errors] });
    if (errors.length || plan.errors.length) setStatementError("L’aperçu contient des erreurs; aucun relevé ne sera ajouté.");
    else setStatementNotice(`${plan.additions.length} nouveau(x) relevé(s) prêt(s) à importer; ${plan.duplicates.length} rejeu(x) idempotent(s).`);
  };

  const applyStatementImport = async () => {
    if (!statementImportPlan || statementImportPlan.errors.length) return;
    if (useServerWorkflow) {
      if (!identity.user || !pendingServerImports.length) return;
      setWorkflowLoading(true);
      setStatementError("");
      try {
        const token = await identity.user.getIdToken();
        const response = await fetch("/api/reconciliation/statements", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ imports: pendingServerImports }),
        });
        const result = await response.json() as { imported?: number; idempotent?: number; rejected?: number; error?: string };
        if (!response.ok && response.status !== 207) throw new Error(result.error ?? "L’import serveur a échoué.");
        await loadPersistedWorkflow();
        setStatementNotice(`${result.imported ?? 0} relevé(s) écrit(s) dans l’émulateur · ${result.idempotent ?? 0} rejeu(x) idempotent(s) · ${result.rejected ?? 0} rejet(s).`);
        setStatementImportPlan(null);
        setPendingServerImports([]);
      } catch (reason) {
        setStatementError(reason instanceof Error ? reason.message : "L’import serveur a échoué.");
      } finally {
        setWorkflowLoading(false);
      }
      return;
    }
    setStatements((current) => [...current, ...statementImportPlan.additions]);
    if (!selectedStatementId && statementImportPlan.additions[0]) selectStatement(statementImportPlan.additions[0].id);
    setStatementNotice(`${statementImportPlan.additions.length} relevé(s) importé(s). L’ordre de chaque fichier est conservé par sequence.`);
    setStatementImportPlan(null);
  };

  const downloadExcel = () => {
    if (!reconciliation) return;
    const xml = buildReconciliationExcelXml({ statement: reconciliation.statement, lineResults: reconciliation.lineResults, outsideTransactions: reconciliation.outsideTransactions, transactions: activeReconciliationTransactions });
    const url = URL.createObjectURL(new Blob([xml], { type: "application/vnd.ms-excel" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = reconciliationExportFileName(reconciliation.statement);
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const selectLine = (result: ReconciliationLineResult) => {
    setSelectedLineId(result.line.id);
    setSelectedCandidateId(result.candidates[0]?.transaction.id ?? "");
  };

  const runServerAction = async (body: Record<string, unknown>) => {
    if (!useServerWorkflow || !identity.user) return;
    const token = await identity.user.getIdToken();
    const response = await fetch("/api/reconciliation/actions", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json() as { error?: string };
    if (!response.ok) throw new Error(result.error ?? "L’action serveur a échoué.");
    await loadPersistedWorkflow();
  };

  const autoMatchPersisted = async () => {
    if (!reconciliation) return;
    try {
      await runServerAction({ action: "AUTO_MATCH", statementId: reconciliation.statement.id });
      setStatementNotice("Les jumelages automatiques admissibles et les contrôles hors relevé sont persistés dans l’émulateur.");
    } catch (reason) {
      setStatementError(reason instanceof Error ? reason.message : "Les jumelages automatiques n’ont pas pu être persistés.");
    }
  };

  const confirmSelectedMatch = async () => {
    if (!reconciliation || !selectedResult || !selectedCandidate) return;
    try {
      if (useServerWorkflow) {
        await runServerAction({
          action: selectedResult.persistedMatchId ? "CHANGE_MATCH" : "CONFIRM_MATCH",
          statementId: reconciliation.statement.id,
          lineId: selectedResult.line.id,
          transactionId: selectedCandidate.transaction.id,
          invoiceId: selectedCandidate.transaction.invoiceId ?? null,
        });
        setStatementNotice("Jumelage enregistré côté serveur et audité dans l’émulateur.");
        return;
      }
      setManualReconciliation(confirmManualMatch(reconciliation, selectedResult.line.id, selectedCandidate.transaction.id, { uid: "DEMO-USER-KIM", confirmedAt: new Date().toISOString() }) as ReconciliationView);
      setStatementNotice("Jumelage manuel enregistré dans le scénario local et audité.");
    } catch (reason) {
      setStatementError(reason instanceof Error ? reason.message : "Le jumelage n’a pas pu être confirmé.");
    }
  };

  const updateSelectedStatus = async (status: string) => {
    if (!reconciliation || !selectedResult) return;
    try {
      if (useServerWorkflow) {
        await runServerAction({ action: "SET_STATUS", statementId: reconciliation.statement.id, lineId: selectedResult.line.id, status });
        setStatementNotice(`Statut « ${reconciliationStatusLabel(status)} » persisté et audité dans l’émulateur.`);
        return;
      }
      setManualReconciliation(setLineReconciliationStatus(reconciliation, selectedResult.line.id, status, { uid: "DEMO-USER-KIM" }) as ReconciliationView);
      setStatementNotice(`Statut « ${reconciliationStatusLabel(status)} » enregistré dans le scénario local et audité.`);
    } catch (reason) {
      setStatementError(reason instanceof Error ? reason.message : "Le statut n’a pas pu être modifié.");
    }
  };

  const unlinkSelectedMatch = async () => {
    if (!reconciliation || !selectedResult?.match) return;
    try {
      if (useServerWorkflow) {
        await runServerAction({ action: "UNLINK", statementId: reconciliation.statement.id, lineId: selectedResult.line.id });
        setStatementNotice("Jumelage dissocié côté serveur; la ligne est rouverte pour vérification.");
        return;
      }
      setManualReconciliation(setLineReconciliationStatus(reconciliation, selectedResult.line.id, RECONCILIATION_STATUSES.REVIEW, { uid: "DEMO-USER-KIM" }) as ReconciliationView);
      setStatementNotice("La ligne est rouverte pour vérification dans le scénario local.");
    } catch (reason) {
      setStatementError(reason instanceof Error ? reason.message : "Le jumelage n’a pas pu être dissocié.");
    }
  };

  const resolveOutside = async (controlId?: string) => {
    if (!reconciliation || !controlId || !useServerWorkflow) return;
    try {
      await runServerAction({ action: "RESOLVE_OUTSIDE", statementId: reconciliation.statement.id, controlId, resolutionNote: "Contrôle revu dans l’émulateur." });
      setStatementNotice("Contrôle hors relevé résolu et audité.");
    } catch (reason) {
      setStatementError(reason instanceof Error ? reason.message : "Le contrôle hors relevé n’a pas pu être résolu.");
    }
  };

  const summary = reconciliation?.summary ?? {};
  return <>
    <PageHeading eyebrow="Contrôle des relevés" title="Rapprochement" description="Le relevé conserve l’ordre des lignes. Le contrôle comptable traite seulement les ambiguïtés, absences et doublons." action={<div className="reconciliation-actions"><button className="primary-button" type="button" onClick={() => importInputRef.current?.click()} disabled={isProductionDataSource || workflowLoading}><span>↑</span> Importer des relevés</button>{useServerWorkflow && reconciliation && <button className="secondary-button" type="button" onClick={() => void autoMatchPersisted()} disabled={workflowLoading}>Enregistrer les jumelages sûrs</button>}<button className="secondary-button" type="button" onClick={downloadExcel} disabled={!reconciliation}>Exporter Excel</button><input ref={importInputRef} hidden type="file" accept=".json,.csv,application/json,text/csv" multiple onChange={(event) => void handleStatementFiles(event)} /></div>} />
    <div className="reconciliation-toolbar"><PeriodSelector period={period} onChange={onPeriodChange} /><div className="period-card"><span className="card-icon teal">▤</span><div><span>Relevés disponibles</span><strong>{statements.length} relevé(s) · {activeCards.length} cartes actives</strong></div></div></div>
    {statementError && <p className="intake-review-message error">{statementError}</p>}
    {statementNotice && <p className="intake-review-message saved">{statementNotice}</p>}
    {!isProductionDataSource && <section className="panel statement-import-panel"><div className="panel-header"><div><p className="eyebrow">{useServerWorkflow ? "Import persistant émulateur" : "Import local synthétique"}</p><h2>Relevés importés</h2></div><span className="badge badge-neutral">Aucune écriture Production</span></div><div className="statement-import-toolbar"><label className="field"><span>Relevé actif</span><select value={selectedStatement?.id ?? ""} onChange={(event) => selectStatement(event.target.value)}><option value="">Sélectionner un relevé</option>{statements.map((statement) => <option key={statement.id} value={statement.id}>{statement.originalFilename} · •••• {cards.find((card) => card.id === statement.cardId)?.lastFour ?? statement.cardId} · {statement.periodStart} → {statement.periodEnd}</option>)}</select></label><div className="directory-help">{useServerWorkflow ? "Le fichier est relu et hashé côté serveur, puis écrit de façon atomique et idempotente dans Data Connect Emulator. Les actions manuelles sont contrôlées par le serveur." : "Le fichier JSON porte sa carte et ses dates. Un CSV structuré est accepté par l’adaptateur, avec les métadonnées de carte/période fournies par le workflow. Le PDF reste une extension future."}</div></div>{statementImportPlan && <div className="statement-import-preview"><strong>Aperçu avant écriture</strong><span>{statementImportPlan.additions.length} ajout(s) · {statementImportPlan.duplicates.length} rejeu(x) idempotent(s) · {statementImportPlan.warnings.length} avertissement(s)</span>{statementImportPlan.warnings.map((warning) => <small key={warning}>{warning}</small>)}{statementImportPlan.errors.length === 0 && <button className="primary-button" type="button" onClick={() => void applyStatementImport()} disabled={workflowLoading}>{useServerWorkflow ? "Écrire dans l’émulateur" : "Appliquer l’import local"}</button>}</div>}</section>}
    {isProductionDataSource && <div className="config-note"><span>i</span><p>Le rapprochement Production reste en lecture seule pendant cette étape. Le modèle et les opérations Data Connect seront migrés séparément après validation locale.</p></div>}
    {reconciliation ? <>
      <div className="card-roster">{activeCards.map((card) => <span className="card-chip" key={card.id}><b>•••• {card.lastFour}</b><span>{card.holder}</span></span>)}</div>
      <div className="reconciliation-stats"><StatTile label="Lignes du relevé" value={String(reconciliation.lineResults.length)} /><StatTile label="Jumelées" value={String(summary.MATCHED ?? 0)} tone="success" /><StatTile label="À vérifier" value={String((summary.REVIEW ?? 0) + (summary.DUPLICATE ?? 0))} tone="warning" /><StatTile label="Factures manquantes" value={String(summary.MISSING_INVOICE ?? 0)} tone="danger" /></div>
      <section className="panel reconciliation-panel"><div className="panel-header"><div><p className="eyebrow">{reconciliation.statement.originalFilename} · {reconciliation.statement.periodStart} → {reconciliation.statement.periodEnd}</p><h2>Correspondances et exceptions</h2></div><span className="badge badge-neutral">sequence immuable</span></div><div className="reconciliation-explainer"><span className="summary-icon rose">!</span><div><strong>Le relevé est la source de vérité de l’ordre.</strong><span>Montants comparés au cent; date tolérée de ±2 jours; deux candidats équivalents restent à vérifier.</span></div></div><div className="reconciliation-table-wrap"><table className="reconciliation-detail-table"><thead><tr><th>#</th><th>Date</th><th>Marchand relevé</th><th>Montant</th><th>Facture / projet / compte</th><th>Statut</th></tr></thead><tbody>{reconciliation.lineResults.map((result) => { const transaction = result.match ? activeReconciliationTransactions.find((candidate) => candidate.id === result.match?.expenseTransactionId) : null; const selected = selectedResult?.line.id === result.line.id; return <tr key={result.line.id} className={selected ? "selected" : ""} onClick={() => selectLine(result)}><td>{result.line.sequence}</td><td>{formatDate(result.line.transactionDate)}</td><td><strong>{result.line.merchantRaw}</strong><small>{result.line.merchantNormalized}</small></td><td><strong>{formatCurrency(result.line.amountCents / 100)}</strong></td><td><strong>{transaction?.invoiceNumber ?? "—"}</strong><small>{transaction ? `${transaction.projectNumber ?? "—"} · ${transaction.accountNumber ?? "—"}` : result.candidates.length ? `${result.candidates.length} candidate(s)` : "Aucune candidate"}</small></td><td><span className={`badge badge-${reconciliationStatusTone(result.status)}`}>{reconciliationStatusLabel(result.status)}</span></td></tr>; })}</tbody></table></div></section>
      {selectedResult && <section className="panel reconciliation-detail-card"><div className="panel-header"><div><p className="eyebrow">Détail de la ligne {selectedResult.line.sequence}</p><h2>{selectedResult.line.merchantRaw} · {formatCurrency(selectedResult.line.amountCents / 100)}</h2></div><span className={`badge badge-${reconciliationStatusTone(selectedResult.status)}`}>{reconciliationStatusLabel(selectedResult.status)}</span></div><div className="reconciliation-detail-grid"><div><span>Date relevé</span><strong>{formatDate(selectedResult.line.transactionDate)}</strong></div><div><span>Motif du score</span><strong>{selectedResult.reason}</strong></div><div><span>Carte / titulaire</span><strong>{cards.find((card) => card.id === reconciliation.statement.cardId)?.lastFour ?? reconciliation.statement.cardId} · {reconciliation.statement.holderNameSnapshot ?? "titulaire snapshot"}</strong></div></div>{selectedResult.candidates.length > 0 && <div className="reconciliation-candidate-actions"><label className="field"><span>Facture candidate</span><select value={selectedCandidate?.transaction.id ?? ""} onChange={(event) => setSelectedCandidateId(event.target.value)}>{selectedResult.candidates.map((candidate) => <option key={candidate.transaction.id} value={candidate.transaction.id}>{candidate.transaction.invoiceNumber ?? candidate.transaction.id} · {candidate.score.score}/100 · {candidate.transaction.vendor}</option>)}</select></label><button className="primary-button" type="button" onClick={() => void confirmSelectedMatch()} disabled={workflowLoading}>Confirmer le jumelage</button></div>}<div className="reconciliation-detail-actions"><button className="secondary-button" type="button" onClick={() => void updateSelectedStatus(RECONCILIATION_STATUSES.MISSING_INVOICE)} disabled={workflowLoading}>Marquer facture manquante</button><button className="secondary-button" type="button" onClick={() => void updateSelectedStatus(RECONCILIATION_STATUSES.IGNORED)} disabled={workflowLoading}>Ignorer</button>{selectedResult.match && <button className="secondary-button" type="button" onClick={() => void unlinkSelectedMatch()} disabled={workflowLoading}>Dissocier</button>}<button className="text-button" type="button" onClick={() => void updateSelectedStatus(RECONCILIATION_STATUSES.REVIEW)} disabled={workflowLoading}>Rouvrir pour vérification</button></div></section>}
      {reconciliation.outsideTransactions.length > 0 && <section className="panel reconciliation-outside"><div className="panel-header"><div><p className="eyebrow">Contrôle inverse</p><h2>Hors relevé</h2></div><span className="badge badge-warning">{reconciliation.outsideTransactions.length}</span></div><div className="directory-list">{reconciliation.outsideTransactions.map(({ transaction, reason, controlId }) => <div className="directory-row" key={transaction.id}><div><strong>{transaction.vendor} · {formatCurrency(transaction.totalCents / 100)}</strong><small>{transaction.date} · {transaction.invoiceNumber ?? transaction.id}</small></div><span className="badge badge-neutral">Hors relevé</span><small>{reason}</small>{controlId && useServerWorkflow && <button className="text-button" type="button" onClick={() => void resolveOutside(controlId)} disabled={workflowLoading}>Résoudre</button>}</div>)}</div></section>}
    </> : <section className="panel data-source-card"><p className="eyebrow">Aucun relevé sélectionné</p><h2>Importez un relevé synthétique local</h2><p className="muted">Le parcours local est prêt avec dix fixtures fictives; aucune écriture Production n’est effectuée.</p></section>}
  </>;
}

function StatTile({ label, value, tone = "" }: { label: string; value: string; tone?: string }) { return <div className={`stat-tile ${tone}`}><span>{label}</span><strong>{value}</strong></div>; }

function ReportsPage(props: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void }) {
  return <KimAccountingReport key={`${props.period.id}:${props.period.start}:${props.period.end}`} {...props} />;
}

type AccountingTemplateColumn = {
  key: string;
  code?: string;
  label?: string;
  width?: number;
  spacer?: boolean;
  hidden?: boolean;
};

type AccountingTemplateRow = {
  transactionId: string;
  date: string;
  description: string;
  attachment: string;
  project: string;
  totalCents: number;
  tpsCents: number;
  tvqCents: number;
  subtotalCents: number;
  accountCents: Record<string, number>;
};

type AccountingTemplateTotals = {
  totalCents: number;
  tpsCents: number;
  tvqCents: number;
  subtotalCents: number;
  accountCents: Record<string, number>;
};

type AccountingTemplateReport = {
  taxColumns: ReadonlyArray<{ key: string; code: string; label: string; header: string }>;
  accountColumns: ReadonlyArray<AccountingTemplateColumn>;
  sections: Array<{ cardKey: string; person: string; card: string; rows: AccountingTemplateRow[]; totals: AccountingTemplateTotals }>;
  totals: AccountingTemplateTotals;
  payableAfterAdjustmentsCents: number;
  manualAdjustmentRows: ManualAdjustmentRow[];
};

function AccountingTemplatePreview({ report, manualAmountDrafts, canEditManualAdjustments, manualSaveDisabled, manualSaveState, manualSaveMessage, onManualDescriptionChange, onManualAmountChange, onSaveManualAdjustments }: {
  report: AccountingTemplateReport;
  manualAmountDrafts: Record<number, string>;
  canEditManualAdjustments: boolean;
  manualSaveDisabled: boolean;
  manualSaveState: "idle" | "saving" | "saved" | "error";
  manualSaveMessage: string;
  onManualDescriptionChange: (index: number, value: string) => void;
  onManualAmountChange: (index: number, value: string) => void;
  onSaveManualAdjustments: () => void;
}) {
  const accountColumns = report.accountColumns ?? [];
  const columnCount = 8 + accountColumns.length;
  const accountValue = (row: AccountingTemplateRow, column: AccountingTemplateColumn) => column.spacer || !row.accountCents?.[column.key] ? "" : formatCurrency(Number(row.accountCents[column.key]) / 100);
  const accountTotal = (values: Array<number | null>, index: number) => values[index] == null ? "" : formatCurrency(Number(values[index]) / 100);
  const accountColumnClass = (column: AccountingTemplateColumn) => [column.spacer ? "template-spacer" : "", column.hidden ? "template-col-hidden" : ""].filter(Boolean).join(" ");
  const totalAccountValues = (rows: AccountingTemplateRow[]) => {
    const totals: Record<string, number> = {};
    for (const row of rows) for (const column of accountColumns) if (!column.spacer && row.accountCents?.[column.key] != null) totals[column.key] = (totals[column.key] ?? 0) + Number(row.accountCents[column.key]);
    return accountColumns.map((column) => column.spacer ? null : totals[column.key] ?? null);
  };
  const money = (value: number | null | undefined) => value == null ? "" : formatCurrency(Number(value) / 100);
  return <section className="panel accounting-template-preview">
    <div className="panel-header"><div><p className="eyebrow">Aperçu du template Excel</p><h2>Rapport comptable par carte</h2></div><div className="accounting-template-actions"><span className="badge badge-neutral">{report.sections.length} carte{report.sections.length === 1 ? "" : "s"}</span><button className="secondary-button" type="button" onClick={onSaveManualAdjustments} disabled={manualSaveDisabled || manualSaveState === "saving"}>{manualSaveState === "saving" ? "Enregistrement…" : "Enregistrer les lignes"}</button></div></div>
    <div className="accounting-template-scroll"><table className="accounting-template-table"><colgroup><col className="template-col-date" /><col className="template-col-description" /><col className="template-col-attachment" /><col className="template-col-project" /><col className="template-col-money" /><col className="template-col-tax-tps" /><col className="template-col-tax-tvq" /><col className="template-col-money" />{accountColumns.map((column) => <col className={`${column.spacer ? "template-col-spacer" : "template-col-account"} ${column.hidden ? "template-col-hidden" : ""}`} style={{ width: `${(column.width ?? 11.42578125) * 6}px` }} key={`${column.key}-width`} />)}</colgroup><thead><tr><th rowSpan={2}>Date</th><th rowSpan={2}>Description</th><th rowSpan={2}>PJ</th><th rowSpan={2}># Projet</th><th rowSpan={2}>Total</th><th>{report.taxColumns?.[0]?.header ?? "21340"}</th><th>{report.taxColumns?.[1]?.header ?? "21370"}</th><th rowSpan={2}>Avant taxes</th>{accountColumns.map((column) => <th className={accountColumnClass(column)} key={`${column.key}-code`}>{column.spacer ? "" : column.code}</th>)}</tr><tr><th>{report.taxColumns?.[0]?.label ?? "TPS"}</th><th>{report.taxColumns?.[1]?.label ?? "TVQ"}</th>{accountColumns.map((column) => <th className={accountColumnClass(column)} key={`${column.key}-label`}>{column.spacer ? "" : column.label}</th>)}</tr></thead><tbody>
      {report.sections.map((section) => <Fragment key={section.cardKey ?? section.person}><tr className="accounting-template-holder"><td>{section.person}</td><td><strong>{section.card}</strong></td><td colSpan={columnCount - 2}></td></tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr>{section.rows.map((row) => <tr key={row.transactionId}><td>{row.date ? formatDate(row.date) : ""}</td><td>{row.description}</td><td>{row.attachment}</td><td>{row.project}</td><td>{money(row.totalCents)}</td><td>{money(row.tpsCents)}</td><td>{money(row.tvqCents)}</td><td>{money(row.subtotalCents)}</td>{accountColumns.map((column) => <td className={accountColumnClass(column)} key={`${row.transactionId}-${column.key}`}>{accountValue(row, column)}</td>)}</tr>)}<tr className="accounting-template-space"><td colSpan={columnCount}></td></tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr><tr className="accounting-template-total"><td></td><td></td><td></td><td></td><td>{money(section.totals.totalCents)}</td><td>{money(section.totals.tpsCents)}</td><td>{money(section.totals.tvqCents)}</td><td>{money(section.totals.subtotalCents)}</td>{totalAccountValues(section.rows).map((value, index) => <td className={accountColumnClass(accountColumns[index])} key={`${section.cardKey ?? section.person}-total-${index}`}>{accountTotal([value], 0)}</td>)}</tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr></Fragment>)}
      <tr className="accounting-template-grand"><td></td><td>GRAND TOTAL</td><td></td><td></td><td>{money(report.totals.totalCents)}</td><td>{money(report.totals.tpsCents)}</td><td>{money(report.totals.tvqCents)}</td><td>{money(report.totals.subtotalCents)}</td>{totalAccountValues(report.sections.flatMap((section) => section.rows)).map((value, index) => <td className={accountColumnClass(accountColumns[index])} key={`grand-${index}`}>{accountTotal([value], 0)}</td>)}</tr>
      <tr className="accounting-template-space"><td colSpan={columnCount}></td></tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr>
      <tr className="accounting-template-bottom"><td></td><td>Montant à payer</td><td></td><td></td><td>{money(report.payableAfterAdjustmentsCents)}</td><td colSpan={columnCount - 5}></td></tr>
      <tr className="accounting-template-space"><td colSpan={columnCount}></td></tr>
      {(report.manualAdjustmentRows ?? []).map((adjustment) => <tr className="accounting-template-manual" key={`manual-${adjustment.index}`}><td></td><td>{canEditManualAdjustments ? <input className="accounting-template-manual-input" aria-label={`Description de l’ajustement ${adjustment.index}`} maxLength={160} value={adjustment.description} onChange={(event) => onManualDescriptionChange(adjustment.index, event.target.value)} placeholder="Description" /> : adjustment.description}</td><td></td><td></td><td>{canEditManualAdjustments ? <input className="accounting-template-manual-input accounting-template-manual-amount" aria-label={`Montant de l’ajustement ${adjustment.index}`} inputMode="decimal" value={manualAmountDrafts[adjustment.index] ?? manualAmountDraft(adjustment.amountCents)} onChange={(event) => onManualAmountChange(adjustment.index, event.target.value)} placeholder="0,00" /> : money(adjustment.amountCents)}</td><td colSpan={columnCount - 5}></td></tr>)}
      <tr className="accounting-template-space"><td colSpan={columnCount}></td></tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr><tr className="accounting-template-space"><td colSpan={columnCount}></td></tr>
      <tr className="accounting-template-bottom"><td></td><td>Montant à payer</td><td></td><td></td><td>{money(report.payableAfterAdjustmentsCents)}</td><td colSpan={columnCount - 5}></td></tr>
    </tbody></table></div><p className="accounting-template-note">Les lignes libres sous « Montant à payer » servent aux ajustements manuels de Kim. Un paiement ou un crédit qui réduit le solde doit être saisi avec un signe négatif. {canEditManualAdjustments ? "Les changements sont enregistrés pour la période du relevé." : "Sélectionnez Tous les titulaires pour modifier les ajustements de la période."}</p>{manualSaveMessage && <p className={`accounting-template-save-message ${manualSaveState}`}>{manualSaveMessage}</p>}
  </section>;
}

function KimAccountingReport({ period, onPeriodChange, embedded = false }: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void; embedded?: boolean }) {
  void DemoReportsPage;
  const { cards, transactions, accounts, projects } = useAppData();
  const identity = useFirebaseIdentity();
  const [selectedPerson, setSelectedPerson] = useState("TOUS");
  const [selectedProject, setSelectedProject] = useState("TOUS");
  const [manualAdjustmentRows, setManualAdjustmentRows] = useState<ManualAdjustmentRow[]>(() => manualAdjustmentRowsForPeriod(period));
  const [savedManualAdjustmentRows, setSavedManualAdjustmentRows] = useState<ManualAdjustmentRow[]>(() => manualAdjustmentRowsForPeriod(period));
  const [manualAmountDrafts, setManualAmountDrafts] = useState<Record<number, string>>(() => Object.fromEntries(manualAdjustmentRowsForPeriod(period).map((row) => [row.index, manualAmountDraft(row.amountCents)])));
  const [manualSaveState, setManualSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [manualSaveMessage, setManualSaveMessage] = useState("");
  const manualAdjustmentScope = useMemo(() => ({
    periodKey: period.id === "custom" ? `custom:${period.start}:${period.end}` : period.id,
    periodStart: period.start,
    periodEnd: period.end,
    projectId: selectedProject === "TOUS" ? null : selectedProject,
    holderId: selectedPerson === "TOUS" ? null : cards.find((card) => card.holder === selectedPerson)?.holderId ?? null,
  }), [cards, period.end, period.id, period.start, selectedPerson, selectedProject]);
  useEffect(() => {
    let active = true;
    const hasScopedFilter = manualAdjustmentScope.projectId !== null || manualAdjustmentScope.holderId !== null || period.id === "custom";
    const fallbackRows = !hasScopedFilter ? manualAdjustmentRowsForPeriod(period) : normalizeManualAdjustmentRows([]);
    if (!sqlConnectConfigured || !identity.user) {
      const timer = window.setTimeout(() => {
        if (!active) return;
        setManualAdjustmentRows(fallbackRows);
        setSavedManualAdjustmentRows(fallbackRows);
        setManualAmountDrafts(Object.fromEntries(fallbackRows.map((row) => [row.index, manualAmountDraft(row.amountCents)])));
      }, 0);
      return () => { active = false; window.clearTimeout(timer); };
    }
    loadReportAdjustments(manualAdjustmentScope)
      .then((rows) => {
        if (!active) return;
        const nextRows = rows.length || hasScopedFilter ? rows : fallbackRows;
        setManualAdjustmentRows(nextRows);
        setSavedManualAdjustmentRows(nextRows);
        setManualAmountDrafts(Object.fromEntries(nextRows.map((row) => [row.index, manualAmountDraft(row.amountCents)])));
        setManualSaveState("idle");
        setManualSaveMessage("");
      })
      .catch((reason) => {
        if (!active) return;
        setManualSaveState("error");
        setManualSaveMessage(reason instanceof Error ? reason.message : "Les ajustements persistés n’ont pas pu être chargés.");
      });
    return () => { active = false; };
  }, [identity.user, manualAdjustmentScope, period, selectedProject]);
  const people = Array.from(new Set([...cards.map((card) => card.holder), ...transactions.map((transaction) => transaction.person).filter(Boolean)]));
  const periodTransactions = useMemo(() => transactions.filter((transaction) => {
    const matchesProject = selectedProject === "TOUS" || transaction.projectId === selectedProject || transaction.projectNumber === selectedProject;
    const matchesPeriod = isTransactionInPeriod(transaction, period);
    const isIncludedStatus = transaction.accountingStatus
      ? transaction.accountingStatus === "POSTED" && (transaction.processingStatus === "AUTO_APPROVED" || transaction.processingStatus === "VALIDATED")
      : transaction.status === "Validée";
    return matchesProject && matchesPeriod && isIncludedStatus;
  }), [period, selectedProject, transactions]);
  const visibleTransactions = useMemo(() => periodTransactions.filter((transaction) => selectedPerson === "TOUS" || transaction.person === selectedPerson), [periodTransactions, selectedPerson]);
  const taxSummary = useMemo(() => buildTaxSummaryByHolder({ transactions: visibleTransactions }), [visibleTransactions]);
  const templateReport = useMemo(() => buildAccountingTemplateReport({ period, transactions: periodTransactions, selectedPerson, cards, manualAdjustmentRows }), [cards, manualAdjustmentRows, period, periodTransactions, selectedPerson]);
  const manualAmountsAreValid = manualAdjustmentRows.every((row) => {
    const draft = manualAmountDrafts[row.index] ?? manualAmountDraft(row.amountCents);
    return !draft.trim() || manualAmountToCents(draft) != null;
  });
  const manualRowsAreDirty = serializeManualAdjustmentRows(manualAdjustmentRows) !== serializeManualAdjustmentRows(savedManualAdjustmentRows);
  const canEditManualAdjustments = selectedPerson === "TOUS" || manualAdjustmentScope.holderId !== null;
  const changeManualDescription = (index: number, value: string) => {
    setManualAdjustmentRows((current) => current.map((row) => row.index === index ? { ...row, description: value } : row));
    setManualSaveState("idle");
    setManualSaveMessage("");
  };
  const changeManualAmount = (index: number, value: string) => {
    setManualAmountDrafts((current) => ({ ...current, [index]: value }));
    setManualAdjustmentRows((current) => current.map((row) => row.index === index ? { ...row, amountCents: manualAmountToCents(value) } : row));
    setManualSaveState("idle");
    setManualSaveMessage("");
  };
  const saveManualRows = async () => {
    if (!canEditManualAdjustments || !manualAmountsAreValid || !manualRowsAreDirty) return;
    const rows = normalizeManualAdjustmentRows(manualAdjustmentRows);
    setManualSaveState("saving");
    setManualSaveMessage("");
    try {
      const canSaveToFirebase = sqlConnectConfigured && Boolean(identity.user);
      if (canSaveToFirebase) {
        await saveReportAdjustments({ scope: manualAdjustmentScope, rows, auditDetails: auditDetails({ scope: manualAdjustmentScope, before: savedManualAdjustmentRows, after: rows, source: "KIM_ACCOUNTING_REPORT" }) });
      } else {
        throw new Error("Une session SQL Connect est requise pour persister les ajustements du rapport.");
      }
      setManualAdjustmentRows(rows);
      setSavedManualAdjustmentRows(rows);
      setManualAmountDrafts(Object.fromEntries(rows.map((row) => [row.index, manualAmountDraft(row.amountCents)])));
      onPeriodChange({ ...period, manualAdjustmentRows: rows });
      setManualSaveState("saved");
      setManualSaveMessage("Lignes enregistrées dans SQL Connect avec leur période, projet et titulaire.");
    } catch (reason) {
      setManualSaveState("error");
      setManualSaveMessage(reason instanceof Error ? reason.message : "Les lignes manuelles n’ont pas pu être enregistrées.");
    }
  };
  const downloadReport = () => {
    const xlsx = buildAccountingReportXlsx({ period, transactions: periodTransactions, accounts, cards, selectedPerson, manualAdjustmentRows });
    const blob = new Blob([xlsx], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = accountingReportFileName(period);
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return <>
    {embedded ? <div className="embedded-report-heading"><div><p className="eyebrow">Sortie comptable intégrée</p><h2>Tableau</h2><p className="muted">Les factures comptabilisées s’ajoutent ici automatiquement, par carte et par catégorie, dans l’ordre de date.</p></div><button className="primary-button" type="button" onClick={downloadReport}><span>⇩</span> Exporter le template Excel</button></div> : <PageHeading eyebrow="Analyse" title="Tableau" description="Le template Excel de Kim, avec toutes les transactions de la période classées par carte et par compte." action={<button className="primary-button" type="button" onClick={downloadReport}><span>⇩</span> Exporter le template Excel</button>} />}
    <div className="kim-report-toolbar">
      <PeriodSelector period={period} onChange={onPeriodChange} />
       <label><span>Titulaire de carte</span><select aria-label="Filtrer par titulaire de carte" value={selectedPerson} onChange={(event) => setSelectedPerson(event.target.value)}><option value="TOUS">Tous les titulaires</option>{people.map((person) => <option value={person} key={person}>{person}</option>)}</select></label>
       <label><span>Projet</span><select aria-label="Filtrer par projet" value={selectedProject} onChange={(event) => setSelectedProject(event.target.value)}><option value="TOUS">Tous les projets</option>{projects.map((project) => <option value={project.id} key={project.id}>{project.number} — {project.name}</option>)}</select></label>
       <div className="kim-report-context"><span className="status-dot" /><span>{period.label}</span><small>{visibleTransactions.length} transaction{visibleTransactions.length === 1 ? "" : "s"} affichée{visibleTransactions.length === 1 ? "" : "s"} · taxes calculées sur la sélection active</small></div>
    </div>
     <AccountingTemplatePreview report={templateReport as unknown as AccountingTemplateReport} manualAmountDrafts={manualAmountDrafts} canEditManualAdjustments={canEditManualAdjustments} manualSaveDisabled={!canEditManualAdjustments || !manualAmountsAreValid || !manualRowsAreDirty} manualSaveState={manualSaveState} manualSaveMessage={manualSaveMessage} onManualDescriptionChange={changeManualDescription} onManualAmountChange={changeManualAmount} onSaveManualAdjustments={() => void saveManualRows()} />
    <section className="panel kim-tax-table">
      <div className="panel-header"><div><p className="eyebrow">Récupération des taxes · {period.label}</p><h2>Taxes cumulées par titulaire</h2></div><div className="kim-tax-total"><span>Total à récupérer</span><strong>{formatCurrency(taxSummary.totals.taxesCents / 100)}</strong><small>TPS {formatCurrency(taxSummary.totals.tpsCents / 100)} · TVQ {formatCurrency(taxSummary.totals.tvqCents / 100)}</small></div></div>
      <div className="kim-tax-table-wrap"><div className="kim-tax-head"><span>Titulaire de carte</span><span>Avant taxes</span><span>TPS</span><span>TVQ</span><span>Taxes cumulées</span><span>Total période</span></div>
        <div className="kim-tax-rows">{taxSummary.rows.map((row) => <div className={row.holder === selectedPerson ? "selected" : ""} key={row.holder}><span><b>{row.holder}</b><small>{row.cards.map((card: string) => `•••• ${card}`).join(" · ") || "Carte non identifiée"}</small></span><strong>{formatCurrency(row.subtotalCents / 100)}</strong><strong>{formatCurrency(row.tpsCents / 100)}</strong><strong>{formatCurrency(row.tvqCents / 100)}</strong><strong>{formatCurrency(row.taxesCents / 100)}</strong><strong>{formatCurrency(row.totalCents / 100)}</strong></div>)}<div className="kim-tax-total-row"><strong>TOTAL PÉRIODE</strong><strong>{formatCurrency(taxSummary.totals.subtotalCents / 100)}</strong><strong>{formatCurrency(taxSummary.totals.tpsCents / 100)}</strong><strong>{formatCurrency(taxSummary.totals.tvqCents / 100)}</strong><strong>{formatCurrency(taxSummary.totals.taxesCents / 100)}</strong><strong>{formatCurrency(taxSummary.totals.totalCents / 100)}</strong></div></div>
      </div>
    </section>
  </>;
}

function DemoReportsPage({ period, onPeriodChange }: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void }) {
  const [selectedPerson, setSelectedPerson] = useState("TOUS");
  const [selectedProject, setSelectedProject] = useState("TOUS");
  const [selectedStatus, setSelectedStatus] = useState("VALIDES_ET_A_VALIDER");
  const people = Array.from(new Set(creditCards.map((card) => card.holder)));
  const projects = ["21", "125", "133", "135", "138", "ADMIN"];
  const visibleTransactions = useMemo(() => transactions.filter((transaction) => {
    const matchesPerson = selectedPerson === "TOUS" || transaction.person === selectedPerson;
    const matchesProject = selectedProject === "TOUS" || transaction.project === selectedProject || transaction.project.startsWith(`${selectedProject} ·`);
    const matchesStatus = (selectedStatus === "VALIDES_ET_A_VALIDER" && (transaction.status === "Validée" || transaction.status === "À valider")) ||
      (selectedStatus === "VALIDEE" && transaction.status === "Validée") ||
      (selectedStatus === "A_VALIDER" && transaction.status === "À valider");
    return matchesPerson && matchesProject && matchesStatus;
  }), [selectedPerson, selectedProject, selectedStatus]);
  const visibleTotals = useMemo(() => {
    const totals = new Map<string, number>();
    visibleTransactions.forEach((transaction) => {
      const accountCode = classifyTransaction(transaction).code;
      totals.set(accountCode, (totals.get(accountCode) ?? 0) + transaction.total);
    });
    return totals;
  }, [visibleTransactions]);
  const visibleCardTotals = useMemo(() => {
    const totals = new Map<string, number>();
    visibleTransactions.forEach((transaction) => {
      totals.set(transaction.card, (totals.get(transaction.card) ?? 0) + transaction.total);
    });
    return totals;
  }, [visibleTransactions]);
  const visibleTotal = Array.from(visibleTotals.values()).reduce((sum, amount) => sum + amount, 0);
  const visibleCards = creditCards.filter((card) => card.status === "Actif" && (selectedPerson === "TOUS" || card.holder === selectedPerson));

  return <>
    <PageHeading eyebrow="Analyse" title="Rapports" description="Générez le tableau à reporter dans le programme de comptabilité, sur le même cycle que les cartes." action={<button className="primary-button"><span>⇩</span> Exporter en Excel</button>} />
    <div className="report-filter-grid">
      <PeriodSelector period={period} onChange={onPeriodChange} />
      <label><span>Titulaire de carte</span><select aria-label="Filtrer par titulaire de carte" value={selectedPerson} onChange={(event) => setSelectedPerson(event.target.value)}><option value="TOUS">Tous les titulaires</option>{people.map((person) => <option value={person} key={person}>{person}</option>)}</select></label>
      <label><span>Chantier</span><select aria-label="Filtrer par chantier" value={selectedProject} onChange={(event) => setSelectedProject(event.target.value)}><option value="TOUS">Tous les chantiers</option>{projects.map((project) => <option value={project} key={project}>{project}</option>)}</select></label>
      <label><span>État</span><select aria-label="Filtrer par état" value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}><option value="VALIDES_ET_A_VALIDER">Validées et à valider</option><option value="VALIDEE">Validées seulement</option><option value="A_VALIDER">À valider seulement</option></select></label>
    </div>
    <div className="report-period-note"><span className="status-dot" /><strong>{period.label}</strong><span>· {selectedPerson === "TOUS" ? "tous les titulaires" : selectedPerson} · {selectedProject === "TOUS" ? "tous les chantiers" : `chantier ${selectedProject}`}</span></div>
    <div className="report-local-note"><strong>Lecture seule.</strong><span>Les filtres titulaire, chantier et état calculent les montants à partir des transactions chargées. Les écritures comptables restent désactivées jusqu’à validation du workflow de correction.</span></div>
    <div className="report-layout">
      <section className="panel report-total"><p className="eyebrow">Résumé de période</p><h2>{formatCurrency(visibleTotal)}</h2><p className="muted">{visibleTransactions.length} transaction{visibleTransactions.length === 1 ? "" : "s"} dans cette vue</p><div className="report-breakdown"><div><span>Avant taxes</span><strong>{formatCurrency(visibleTotal)}</strong></div><div><span>TPS</span><strong>—</strong></div><div><span>TVQ</span><strong>—</strong></div></div></section>
      <section className="panel report-table"><div className="panel-header"><div><p className="eyebrow">Résumé par titulaire et carte</p><h2>Qui dépense quoi</h2></div><button className="text-button">Détails →</button></div><div className="mini-table card-total-list">{visibleCards.map((card) => <div key={card.id}><span><b>•••• {card.lastFour}</b> {card.holder}</span><strong>{formatCurrency(visibleCardTotals.get(card.lastFour) ?? 0)}</strong></div>)}</div></section>
    </div>
    <section className="panel report-table full-width"><div className="panel-header"><div><p className="eyebrow">Résumé par catégorie comptable</p><h2>Répartition avant taxes · compte utilisé</h2></div><button className="secondary-button">Enregistrer ce rapport</button></div><div className="account-report-head"><span>Compte</span><span>Catégorie</span><span>Total avant taxes</span></div><div className="category-report">{accountCategories.map((account) => <div key={account.code}><span><b>{account.code}</b></span><span>{account.label}</span><strong>{formatCurrency(visibleTotals.get(account.code) ?? 0)}</strong></div>)}</div><div className="account-report-total"><strong>TOTAL CATÉGORIES</strong><strong>{formatCurrency(visibleTotal)}</strong></div></section>
  </>;
}

function ArchivesPage({ onNotify, isProductionDataSource }: { onNotify: (message: string) => void; isProductionDataSource: boolean }) {
  const identity = useFirebaseIdentity();
  const [summary, setSummary] = useState<ArchiveSummary | null>(null);
  const [manifestHash, setManifestHash] = useState("");
  const [generatedAt, setGeneratedAt] = useState("");
  const [archiveState, setArchiveState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [actionState, setActionState] = useState<"idle" | "downloading" | "purging">("idle");
  const [error, setError] = useState("");

  const loadArchive = useCallback(async () => {
    if (!identity.user || !isProductionDataSource) return;
    setArchiveState("loading");
    setError("");
    try {
      const response = await fetch("/api/admin/archive", {
        cache: "no-store",
        headers: { authorization: `Bearer ${await identity.user.getIdToken()}` },
      });
      const payload = await response.json().catch(() => ({})) as ArchiveApiResponse;
      if (!response.ok || !payload.ok || !payload.summary) throw new Error(payload.error ?? "Les statistiques d’archives ne sont pas disponibles.");
      setSummary(payload.summary);
      setManifestHash(payload.manifestHash ?? "");
      setGeneratedAt(payload.generatedAt ?? "");
      setArchiveState("ready");
    } catch (reason) {
      setArchiveState("error");
      setError(reason instanceof Error ? reason.message : "Les statistiques d’archives ne sont pas disponibles.");
    }
  }, [identity.user, isProductionDataSource]);

  useEffect(() => {
    if (!isProductionDataSource) return;
    const timer = window.setTimeout(() => void loadArchive(), 0);
    return () => window.clearTimeout(timer);
  }, [isProductionDataSource, loadArchive]);

  const downloadManifest = async () => {
    if (!identity.user) return;
    setActionState("downloading");
    setError("");
    try {
      const response = await fetch("/api/admin/archive?include=manifest", {
        cache: "no-store",
        headers: { authorization: `Bearer ${await identity.user.getIdToken()}` },
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({})) as ArchiveApiResponse;
        throw new Error(payload.error ?? "Le manifeste n’a pas pu être exporté.");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `archive-manifest-${manifestHash.slice(0, 12) || "courant"}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      onNotify("Manifeste Storage exporté. Il ne contient aucune clé secrète.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Le manifeste n’a pas pu être exporté.");
    } finally {
      setActionState("idle");
    }
  };

  const purgeArchive = async () => {
    if (!identity.user || !summary || !manifestHash || identity.role !== "ADMIN" || summary.eligiblePhotos === 0) return;
    const exportReference = window.prompt("Référence de l’export vérifié (copie externe des photos) :")?.trim() ?? "";
    if (!exportReference) return;
    if (!window.confirm(`Supprimer ${summary.eligiblePhotos} photo${summary.eligiblePhotos > 1 ? "s" : ""} Storage admissible${summary.eligiblePhotos > 1 ? "s" : ""} (${formatBytes(summary.eligibleBytes)}) ? Les données comptables seront conservées.`)) return;
    setActionState("purging");
    setError("");
    try {
      const response = await fetch("/api/admin/archive", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${await identity.user.getIdToken()}`,
        },
        body: JSON.stringify({ manifestHash, confirmation: "ARCHIVE_PURGE", exportReference }),
      });
      const payload = await response.json().catch(() => ({})) as ArchiveApiResponse & { deletedCount?: number; deletedBytes?: number };
      if (!response.ok || !payload.ok) throw new Error(payload.error ?? "La purge n’a pas pu être exécutée.");
      onNotify(`${payload.deletedCount ?? 0} photo${payload.deletedCount === 1 ? "" : "s"} supprimée${payload.deletedCount === 1 ? "" : "s"} après audit.`);
      await loadArchive();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "La purge n’a pas pu être exécutée.");
    } finally {
      setActionState("idle");
    }
  };

  if (isProductionDataSource) {
    const isBusy = archiveState === "loading" || actionState !== "idle";
    return <>
      <PageHeading eyebrow="Conservation" title="Archives" description="Les données structurées restent accessibles. Les photos ne sont admissibles qu’après comptabilisation et restent protégées jusqu’à un export externe vérifié." action={<button className="secondary-button" type="button" onClick={() => void loadArchive()} disabled={isBusy}>↻ Actualiser</button>} />
      <section className="archive-production-grid">
        <div className="panel archive-card"><div className="archive-card-icon">▣</div><p className="eyebrow">Objets Storage</p><strong>{summary?.storageObjects ?? "—"}</strong><span>{formatBytes(summary?.storageBytes)} utilisés sous receipts/</span></div>
        <div className="panel archive-card"><div className="archive-card-icon">✓</div><p className="eyebrow">Photos admissibles</p><strong>{summary?.eligiblePhotos ?? "—"}</strong><span>{formatBytes(summary?.eligibleBytes)} · factures POSTED uniquement</span></div>
        <div className="panel archive-card"><div className="archive-card-icon blue">⌁</div><p className="eyebrow">Factures liées</p><strong>{summary?.eligibleInvoices ?? "—"}</strong><span>{summary?.eligibleReceipts ?? "—"} dépôt{summary?.eligibleReceipts === 1 ? "" : "s"} concernés</span></div>
        <div className="panel archive-card"><div className="archive-card-icon gold">!</div><p className="eyebrow">À conserver / vérifier</p><strong>{summary?.unlinkedStorageObjects ?? "—"}</strong><span>{summary ? `${summary.missingLinkedPhotos} photo${summary.missingLinkedPhotos === 1 ? "" : "s"} liée${summary.missingLinkedPhotos === 1 ? "" : "s"} absente${summary.missingLinkedPhotos === 1 ? "" : "s"}` : "Lecture Storage en cours"}</span></div>
      </section>
      <section className="panel archive-controls-panel"><div className="panel-header"><div><p className="eyebrow">Manifeste vérifiable</p><h2>Inventaire des photos</h2></div><span className="badge badge-neutral">{archiveState === "loading" ? "Lecture en cours" : archiveState === "ready" ? "À jour" : "Non chargé"}</span></div><div className="archive-controls"><button className="secondary-button" type="button" onClick={() => void downloadManifest()} disabled={isBusy || archiveState !== "ready"}>⇩ Télécharger le manifeste</button>{identity.role === "ADMIN" ? <button className="primary-button archive-danger-button" type="button" onClick={() => void purgeArchive()} disabled={isBusy || archiveState !== "ready" || !summary?.eligiblePhotos}>Purger après export vérifié</button> : <span className="archive-permission-note">La purge est réservée à ADMIN.</span>}</div><div className="archive-safety-note"><strong>Contrôle de sécurité.</strong><span>Le manifeste ne supprime rien. La purge exige une référence d’export externe, une confirmation exacte, un hash de manifeste encore à jour et une écriture d’audit avant la suppression.</span></div>{manifestHash && <small className="archive-manifest-meta">Manifeste {manifestHash.slice(0, 16)}… · lecture {generatedAt ? formatDate(generatedAt.slice(0, 10)) : "—"}</small>}{error && <div className="config-note archive-error"><span>!</span><p>{error}</p></div>}</section>
    </>;
  }
  return <><PageHeading eyebrow="Conservation" title="Archives" description="Les données structurées restent accessibles; seules les photos admissibles peuvent être purgées." action={<button className="secondary-button" onClick={() => onNotify("La préparation d’archive sera disponible après la connexion Firebase.")}>Préparer un export</button>} /><div className="archive-banner"><span className="archive-icon large">◷</span><div><p className="eyebrow">Archivage recommandé</p><h2>842 photos de factures validées peuvent être archivées.</h2><p>Période: 1er juin au 31 août 2026 · aucune suppression automatique activée</p></div><button className="primary-button" onClick={() => onNotify("Rappel reporté de 30 jours.")}>Reporter</button></div><section className="archive-grid"><div className="panel archive-card"><div className="archive-card-icon">✓</div><p className="eyebrow">Photos admissibles</p><strong>842</strong><span>après contrôles d’intégrité</span><div className="progress"><span style={{ width: "72%" }} /></div><small>72% de la période est prête</small></div><div className="panel archive-card"><div className="archive-card-icon blue">▣</div><p className="eyebrow">Dernier export vérifié</p><strong>31 mai 2026</strong><span>Factures_2026-03_2026-05</span><button className="text-button">Ouvrir le manifeste →</button></div><div className="panel archive-card"><div className="archive-card-icon gold">⌁</div><p className="eyebrow">Politique</p><strong>Mode manuel</strong><span>La purge automatique est désactivée.</span><button className="text-button">Modifier dans Configuration →</button></div></section></>;
}

type DirectoryDataPatch = { users?: UserProfile[]; cards?: CreditCard[]; accounts?: AccountCategory[]; projects?: ProjectReference[]; periods?: CardPeriod[] };

type ProjectImportChange = { before: ProjectReference; after: ProjectReference };
type ProjectImportPlan = {
  rows: ProjectReference[];
  additions: ProjectReference[];
  updates: ProjectImportChange[];
  unchanged: ProjectReference[];
  conflicts: string[];
  errors: string[];
};

function AdminDirectoryPage({ onDataChange, role }: { onDataChange: (patch: DirectoryDataPatch) => void; role: Role }) {
  const data = useAppData();
  const identity = useFirebaseIdentity();
  const [selectedSection, setSelectedSection] = useState<"users" | "cards" | "accounts" | "projects" | "periods">("users");
  const [users, setUsers] = useState(data.users);
  const [cards, setCards] = useState(data.cards);
  const [accounts, setAccounts] = useState(data.accounts);
  const [projects, setProjects] = useState(data.projects);
  const [periods, setPeriods] = useState(data.periods);
  const [cardHolderDrafts, setCardHolderDrafts] = useState<Record<string, string>>(() => Object.fromEntries(data.cards.map((card) => [card.id, card.holderId ?? ""])));
  const [userForm, setUserForm] = useState({ displayName: "", email: "", jobTitle: "Contremaître", role: "WORKER", sendInvitation: true });
  const [cardForm, setCardForm] = useState({ lastFour: "", holderId: "", cardFunction: "" });
  const [busyKey, setBusyKey] = useState("");
  const [editingEmailUserId, setEditingEmailUserId] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [directoryQuery, setDirectoryQuery] = useState("");
  const [accountForm, setAccountForm] = useState({ id: "", number: "", label: "", type: "EXPENSE" });
  const [projectForm, setProjectForm] = useState({ id: "", number: "", name: "" });
  const projectImportInputRef = useRef<HTMLInputElement | null>(null);
  const [projectImportFileName, setProjectImportFileName] = useState("");
  const [projectImportPlan, setProjectImportPlan] = useState<ProjectImportPlan | null>(null);
  const [periodForm, setPeriodForm] = useState({ id: "", label: "", startDate: "", endDate: "", statementLabel: "" });
  const canCreateUsers = role === "ADMIN";
  const canEditReferences = role === "ADMIN";
  const [accountStatusFilter, setAccountStatusFilter] = useState("ALL");
  const [accountTypeFilter, setAccountTypeFilter] = useState("ALL");
  const [projectStatusFilter, setProjectStatusFilter] = useState("ALL");
  const isPreviewMode = process.env.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE === "true";
  const persistenceReady = !isPreviewMode && sqlConnectConfigured && accountingReadSource === "firebase-sql-connect";

  const showError = (reason: unknown) => setError(reason instanceof Error ? reason.message : "La modification n'a pas pu être enregistrée.");
  const getAdminToken = async () => {
    if (!identity.user) throw new Error("Session administrateur absente.");
    return identity.user.getIdToken();
  };

  useEffect(() => {
    let active = true;
    if (!canCreateUsers || !persistenceReady || !identity.user) return () => { active = false; };
    void identity.user.getIdToken()
      .then((token) => loadAdminUserAccess(token))
      .then((nextUsers) => {
        if (active) setUsers(nextUsers);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [canCreateUsers, identity.user, persistenceReady]);

  const createUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!canCreateUsers) {
      setError("Seul un administrateur peut créer un compte utilisateur.");
      return;
    }
    if (!persistenceReady) {
      setError("La base de production doit être connectée avant de créer un utilisateur.");
      return;
    }
    setBusyKey("create-user");
    try {
      const token = await getAdminToken();
      const profile = await runAdminUserAction({ action: "create", displayName: userForm.displayName, email: userForm.email, jobTitle: userForm.jobTitle, role: userForm.role, sendInvitation: userForm.sendInvitation }, token);
      const nextUsers = [...users, profile];
      setUsers(nextUsers);
      onDataChange({ users: nextUsers });
      setUserForm({ displayName: "", email: "", jobTitle: "Contremaître", role: "WORKER", sendInvitation: true });
      setNotice(profile.invitationStatus === "INVITED" ? `Profil créé et invitation envoyée à ${profile.email}.` : `Profil créé pour ${profile.displayName}. Il pourra être invité depuis cette liste.`);
    } catch (reason) {
      if (reason instanceof AdminUserActionError && reason.profile) {
        const nextUsers = users.some((candidate) => candidate.id === reason.profile?.id)
          ? users.map((candidate) => candidate.id === reason.profile?.id ? reason.profile as UserProfile : candidate)
          : [...users, reason.profile as UserProfile];
        setUsers(nextUsers);
        onDataChange({ users: nextUsers });
      }
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const toggleUser = async (user: UserProfile) => {
    if (!canCreateUsers || !persistenceReady) return;
    const nextStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setBusyKey(`user-${user.id}`);
    setError("");
    setNotice("");
    try {
      const token = await getAdminToken();
      const updated = await runAdminUserAction({ action: "status", profileId: user.id, status: nextStatus }, token);
      const nextUsers = users.map((candidate) => candidate.id === user.id ? { ...candidate, ...updated } : candidate);
      setUsers(nextUsers);
      const nextCards = nextStatus === "INACTIVE"
        ? cards.map((card) => card.holderId === user.id
          ? { ...card, status: "Inactif" as const, endDate: card.endDate ?? new Date().toISOString().slice(0, 10) }
          : card)
        : cards;
      if (nextStatus === "INACTIVE") setCards(nextCards);
      onDataChange({ users: nextUsers, cards: nextCards });
      setNotice(`${user.displayName} est maintenant ${nextStatus === "ACTIVE" ? "actif" : "désactivé"}.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const runUserAccessAction = async (user: UserProfile, action: "invite" | "reset") => {
    if (!canCreateUsers || !persistenceReady) return;
    setBusyKey(`${action}-${user.id}`);
    setError("");
    setNotice("");
    try {
      const profile = await runAdminUserAction({ action, profileId: user.id }, await getAdminToken());
      const nextUsers = users.map((candidate) => candidate.id === user.id ? { ...candidate, ...profile } : candidate);
      setUsers(nextUsers);
      onDataChange({ users: nextUsers });
      setNotice(action === "reset" ? `Le lien de réinitialisation a été envoyé à ${profile.email}.` : `L’invitation a été envoyée à ${profile.email}.`);
    } catch (reason) {
      if (reason instanceof AdminUserActionError && reason.profile) {
        const nextUsers = users.map((candidate) => candidate.id === user.id ? { ...candidate, ...reason.profile } : candidate);
        setUsers(nextUsers);
        onDataChange({ users: nextUsers });
      }
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const saveUserEmail = async (user: UserProfile) => {
    if (!canCreateUsers || !persistenceReady) return;
    setBusyKey(`email-${user.id}`);
    setError("");
    setNotice("");
    try {
      const profile = await runAdminUserAction({ action: "update-email", profileId: user.id, email: emailDraft }, await getAdminToken());
      const nextUsers = users.map((candidate) => candidate.id === user.id ? { ...candidate, ...profile } : candidate);
      setUsers(nextUsers);
      onDataChange({ users: nextUsers });
      setEditingEmailUserId("");
      setNotice(`L’email de ${profile.displayName} a été synchronisé.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const addCard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!persistenceReady) {
      setError("La base de production doit être connectée avant d'enregistrer une carte.");
      return;
    }
    if (!/^\d{4}$/.test(cardForm.lastFour) || !cardForm.holderId) {
      setError("Les quatre derniers chiffres et le titulaire sont requis.");
      return;
    }
    if (cards.some((card) => card.status === "Actif" && card.lastFour === cardForm.lastFour && card.holderId === cardForm.holderId)) {
      setError("Cette carte est déjà associée à ce titulaire. Désactivez l’ancien enregistrement avant d’en créer un autre.");
      return;
    }
    setBusyKey("add-card");
    try {
      const id = `CARD-${createClientId().slice(0, 8).toUpperCase()}`;
      const today = new Date().toISOString().slice(0, 10);
      await saveCreditCard({ id, lastFour: cardForm.lastFour, holderId: cardForm.holderId, cardFunction: cardForm.cardFunction.trim() || null, status: "ACTIVE", activeFrom: today, inactiveFrom: null });
      const holder = users.find((user) => user.id === cardForm.holderId);
      if (!holder) throw new Error("Le profil titulaire sélectionné est introuvable.");
      const nextCard: CreditCard = { id, lastFour: cardForm.lastFour, holderId: holder.id, holder: holder.displayName, function: cardForm.cardFunction.trim() || "À définir", startDate: today, status: "Actif" };
      const nextCards = [...cards, nextCard];
      setCards(nextCards);
      setCardHolderDrafts((current) => ({ ...current, [id]: holder.id }));
      onDataChange({ cards: nextCards });
      setCardForm({ lastFour: "", holderId: "", cardFunction: "" });
      setNotice(`Carte •••• ${nextCard.lastFour} associée à ${holder.displayName}.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const saveCardAssignment = async (card: CreditCard) => {
    const holderId = cardHolderDrafts[card.id] ?? card.holderId ?? "";
    const holder = users.find((user) => user.id === holderId);
    if (!holder) {
      setError("Sélectionnez un titulaire valide pour cette carte.");
      return;
    }
    setBusyKey(`card-${card.id}`);
    setError("");
    setNotice("");
    try {
      await saveCreditCard({ id: card.id, lastFour: card.lastFour, holderId, cardFunction: card.function || null, status: card.status === "Actif" ? "ACTIVE" : "INACTIVE", activeFrom: card.startDate || null, inactiveFrom: card.endDate || null });
      const nextCards = cards.map((candidate) => candidate.id === card.id ? { ...candidate, holderId, holder: holder.displayName } : candidate);
      setCards(nextCards);
      onDataChange({ cards: nextCards });
      setNotice(`Carte •••• ${card.lastFour} associée à ${holder.displayName}.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const toggleCard = async (card: CreditCard) => {
    const holderId = cardHolderDrafts[card.id] ?? card.holderId ?? "";
    const holder = users.find((user) => user.id === holderId);
    if (!holder) {
      setError("Sélectionnez un titulaire valide pour cette carte.");
      return;
    }
    const nextStatus: CreditCard["status"] = card.status === "Actif" ? "Inactif" : "Actif";
    setBusyKey(`toggle-card-${card.id}`);
    setError("");
    setNotice("");
    try {
      await saveCreditCard({ id: card.id, lastFour: card.lastFour, holderId, cardFunction: card.function || null, status: nextStatus === "Actif" ? "ACTIVE" : "INACTIVE", activeFrom: card.startDate || null, inactiveFrom: nextStatus === "Actif" ? null : card.endDate ?? new Date().toISOString().slice(0, 10) });
      const nextCards = cards.map((candidate) => candidate.id === card.id ? { ...candidate, holderId, holder: holder.displayName, status: nextStatus, ...(nextStatus === "Actif" ? { endDate: undefined } : { endDate: card.endDate ?? new Date().toISOString().slice(0, 10) }) } : candidate);
      setCards(nextCards);
      onDataChange({ cards: nextCards });
      setNotice(`Carte •••• ${card.lastFour} ${nextStatus === "Actif" ? "réactivée" : "désactivée"}.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const ensureAdminPersistence = () => {
    if (role !== "ADMIN") {
      setError("Seul un administrateur peut modifier ce référentiel.");
      return false;
    }
    if (!persistenceReady) {
      setError("La base de production doit être connectée avant de modifier ce référentiel.");
      return false;
    }
    return true;
  };

  const saveAccountReference = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    const number = accountForm.number.trim();
    const label = accountForm.label.trim();
    if (!ensureAdminPersistence()) return;
    if (!number || !label) {
      setError("Le numéro et le libellé du compte sont requis.");
      return;
    }
    if (!/^\d{1,20}$/.test(number)) {
      setError("Le numéro de compte doit contenir uniquement des chiffres et conserver les zéros initiaux.");
      return;
    }
    const id = accountForm.id || `ACCOUNT-${createClientId().toUpperCase()}`;
    const previous = accounts.find((account) => account.id === id);
    if (accounts.some((account) => account.id !== id && account.number === number)) {
      setError(`Le numéro de compte ${number} existe déjà.`);
      return;
    }
    setBusyKey(`account-${id}`);
    try {
      const status = previous?.status ?? "ACTIVE";
      const action = previous ? AUDIT_ACTIONS.ACCOUNT_UPDATED : AUDIT_ACTIONS.ACCOUNT_CREATED;
      const nextAccount = { id, number, code: number, label, type: accountForm.type, status };
      await saveExpenseAccount({ id, number, label, type: accountForm.type, status, auditAction: action, auditDetails: auditDetails({ before: previous ?? null, after: nextAccount }) });
      const nextAccounts = [...accounts.filter((account) => account.id !== id), nextAccount];
      setAccounts(nextAccounts);
      onDataChange({ accounts: nextAccounts });
      setAccountForm({ id: "", number: "", label: "", type: "EXPENSE" });
      setNotice(`Compte ${number} enregistré.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const toggleAccount = async (account: AccountCategory) => {
    if (!ensureAdminPersistence()) return;
    const status = account.status === "INACTIVE" ? "ACTIVE" : "INACTIVE";
    setBusyKey(`account-toggle-${account.id}`);
    setError("");
    setNotice("");
    try {
      await saveExpenseAccount({ id: account.id, number: account.number, label: account.label, type: account.type, status, auditAction: status === "ACTIVE" ? AUDIT_ACTIONS.ACCOUNT_ACTIVATED : AUDIT_ACTIONS.ACCOUNT_DEACTIVATED, auditDetails: auditDetails({ before: account, after: { ...account, status } }) });
      const nextAccounts = accounts.map((candidate) => candidate.id === account.id ? { ...candidate, status } : candidate);
      setAccounts(nextAccounts);
      onDataChange({ accounts: nextAccounts });
      setNotice(`Compte ${account.number} ${status === "ACTIVE" ? "réactivé" : "désactivé"}.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const deleteAccount = async (account: AccountCategory) => {
    if (!ensureAdminPersistence()) return;
    const used = data.transactions.some((transaction) => transaction.accountId === account.id || transaction.accountNumber === account.number) || data.skuReferences.some((reference) => reference.accountCode === account.number);
    if (used) {
      if (account.status !== "INACTIVE") await toggleAccount(account);
      setNotice("Ce compte possède un historique et ne peut pas être supprimé. Il sera désactivé.");
      return;
    }
    if (!window.confirm(`Supprimer le compte ${account.number} — ${account.label} ?`)) return;
    setBusyKey(`account-delete-${account.id}`);
    setError("");
    setNotice("");
    try {
      await deleteExpenseAccount({ id: account.id, auditDetails: auditDetails({ before: account }) });
      const nextAccounts = accounts.filter((candidate) => candidate.id !== account.id);
      setAccounts(nextAccounts);
      onDataChange({ accounts: nextAccounts });
      setNotice(`Compte ${account.number} supprimé.`);
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "";
      if (/historique|ne peut pas être supprimé/i.test(message)) {
        await toggleAccount(account);
        setNotice("Ce compte possède un historique et ne peut pas être supprimé. Il sera désactivé.");
      } else {
        showError(reason);
      }
    } finally {
      setBusyKey("");
    }
  };

  const saveProjectReference = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    const id = projectForm.id || `PROJECT-${createClientId().toUpperCase()}`;
    const number = projectForm.number.trim();
    const name = projectForm.name.trim();
    if (!ensureAdminPersistence()) return;
    if (!number || !name) {
      setError("Le numéro et le nom du projet sont requis.");
      return;
    }
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/.test(number)) {
      setError("Le numéro de projet contient des caractères non valides.");
      return;
    }
    const previous = projects.find((project) => project.id === id);
    if (projects.some((project) => project.id !== id && project.number === number)) {
      setError(`Le numéro de projet ${number} existe déjà.`);
      return;
    }
    setBusyKey(`project-${id}`);
    try {
      const status = previous?.status ?? "ACTIVE";
      const action = previous ? AUDIT_ACTIONS.PROJECT_UPDATED : AUDIT_ACTIONS.PROJECT_CREATED;
      const nextProject = { id, number, name, status };
      await saveProject({ id, number, name, status, auditAction: action, auditDetails: auditDetails({ before: previous ?? null, after: nextProject }) });
      const nextProjects = [...projects.filter((project) => project.id !== id), nextProject];
      setProjects(nextProjects);
      onDataChange({ projects: nextProjects });
      setProjectForm({ id: "", number: "", name: "" });
      setNotice(`Projet ${name} enregistré.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const previewProjectImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    setNotice("");
    setProjectImportPlan(null);
    setProjectImportFileName(file.name);
    if (!ensureAdminPersistence()) return;
    if (file.size > PROJECT_IMPORT_MAX_BYTES) {
      setError(`Le fichier dépasse la limite de ${Math.round(PROJECT_IMPORT_MAX_BYTES / 1_000_000)} Mo.`);
      return;
    }
    try {
      const parsed = parseProjectImportJson(await file.text());
      const plan = buildProjectImportPlan(projects, parsed as { rows: ProjectReference[]; errors: string[] }) as ProjectImportPlan;
      setProjectImportPlan(plan);
      if (plan.errors.length || plan.conflicts.length) {
        setError("L’aperçu contient des erreurs ou des conflits. Aucun projet ne sera écrit tant qu’ils ne sont pas corrigés.");
      } else {
        setNotice(`${plan.rows.length} projet(s) analysé(s). Vérifiez l’aperçu avant d’appliquer l’import.`);
      }
    } catch (reason) {
      showError(reason);
    }
  };

  const applyProjectImport = async () => {
    if (!ensureAdminPersistence() || !projectImportPlan) return;
    if (projectImportPlan.errors.length || projectImportPlan.conflicts.length) {
      setError("Corrigez les erreurs et conflits avant d’appliquer l’import.");
      return;
    }
    setBusyKey("project-import");
    setError("");
    setNotice("");
    const workingProjects = new Map(projects.map((project) => [project.id, project]));
    let appliedCount = 0;
    try {
      for (const project of projectImportPlan.rows) {
        const previous = projects.find((candidate) => candidate.id === project.id || candidate.number === project.number);
        await saveProject({
          id: project.id,
          number: project.number,
          name: project.name,
          status: project.status ?? "ACTIVE",
          auditAction: AUDIT_ACTIONS.PROJECT_IMPORTED,
          auditDetails: auditDetails({ source: "JSON_IMPORT", fileName: projectImportFileName, before: previous ?? null, after: project }),
        });
        workingProjects.set(project.id, project);
        appliedCount += 1;
      }
      const nextProjects = Array.from(workingProjects.values());
      setProjects(nextProjects);
      onDataChange({ projects: nextProjects });
      setProjectImportPlan(null);
      setProjectImportFileName("");
      setNotice(`Import terminé : ${projectImportPlan.additions.length} ajout(s), ${projectImportPlan.updates.length} mise(s) à jour, ${projectImportPlan.unchanged.length} inchangé(s). Aucun projet supprimé.`);
    } catch (reason) {
      const nextProjects = Array.from(workingProjects.values());
      if (appliedCount > 0) {
        setProjects(nextProjects);
        onDataChange({ projects: nextProjects });
      }
      showError(new Error(`Import interrompu après ${appliedCount} projet(s) : ${reason instanceof Error ? reason.message : "erreur inconnue"}.`));
    } finally {
      setBusyKey("");
    }
  };

  const toggleProject = async (project: ProjectReference) => {
    if (!ensureAdminPersistence()) return;
    const status = project.status === "INACTIVE" ? "ACTIVE" : "INACTIVE";
    setBusyKey(`project-toggle-${project.id}`);
    setError("");
    setNotice("");
    try {
      await saveProject({ id: project.id, number: project.number, name: project.name, status, auditAction: status === "ACTIVE" ? AUDIT_ACTIONS.PROJECT_ACTIVATED : AUDIT_ACTIONS.PROJECT_DEACTIVATED, auditDetails: auditDetails({ before: project, after: { ...project, status } }) });
      const nextProjects = projects.map((candidate) => candidate.id === project.id ? { ...candidate, status } : candidate);
      setProjects(nextProjects);
      onDataChange({ projects: nextProjects });
      setNotice(`Projet ${project.name} ${status === "ACTIVE" ? "réactivé" : "désactivé"}.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const deleteProjectReference = async (project: ProjectReference) => {
    if (!ensureAdminPersistence()) return;
    const used = data.transactions.some((transaction) => transaction.projectId === project.id || transaction.projectNumber === project.number);
    if (used) {
      if (project.status !== "INACTIVE") await toggleProject(project);
      setNotice("Ce projet possède un historique et ne peut pas être supprimé. Il sera désactivé.");
      return;
    }
    if (!window.confirm(`Supprimer le projet ${project.number} — ${project.name} ?`)) return;
    setBusyKey(`project-delete-${project.id}`);
    setError("");
    setNotice("");
    try {
      await deleteProject({ id: project.id, auditDetails: auditDetails({ before: project }) });
      const nextProjects = projects.filter((candidate) => candidate.id !== project.id);
      setProjects(nextProjects);
      onDataChange({ projects: nextProjects });
      setNotice(`Projet ${project.number} supprimé.`);
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "";
      if (/historique|ne peut pas être supprimé/i.test(message)) {
        await toggleProject(project);
        setNotice("Ce projet possède un historique et ne peut pas être supprimé. Il sera désactivé.");
      } else {
        showError(reason);
      }
    } finally {
      setBusyKey("");
    }
  };

  const savePeriodReference = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    const id = periodForm.id.trim();
    const label = periodForm.label.trim();
    const startDate = periodForm.startDate;
    const endDate = periodForm.endDate;
    if (!ensureAdminPersistence()) return;
    if (!id || !label || !startDate || !endDate) {
      setError("L’identifiant, le libellé et les deux dates de la période sont requis.");
      return;
    }
    if (startDate > endDate) {
      setError("La date de début doit précéder la date de fin.");
      return;
    }
    setBusyKey(`period-${id}`);
    try {
      await saveStatementPeriod({ id, label, startDate, endDate, statementLabel: periodForm.statementLabel.trim() || null, status: "ACTIVE" });
      const nextPeriods = [...periods.filter((period) => period.id !== id), { id, label, start: startDate, end: endDate, statementLabel: periodForm.statementLabel.trim() || "Relevé Mastercard", status: "ACTIVE" }];
      setPeriods(nextPeriods);
      onDataChange({ periods: nextPeriods });
      setPeriodForm({ id: "", label: "", startDate: "", endDate: "", statementLabel: "" });
      setNotice(`Période ${label} enregistrée.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const togglePeriod = async (period: CardPeriod) => {
    if (!ensureAdminPersistence()) return;
    const status = period.status === "INACTIVE" ? "ACTIVE" : "INACTIVE";
    setBusyKey(`period-toggle-${period.id}`);
    setError("");
    setNotice("");
    try {
      await saveStatementPeriod({ id: period.id, label: period.label, startDate: period.start, endDate: period.end, statementLabel: period.statementLabel || null, status });
      const nextPeriods = periods.map((candidate) => candidate.id === period.id ? { ...candidate, status } : candidate);
      setPeriods(nextPeriods);
      onDataChange({ periods: nextPeriods });
      setNotice(`Période ${period.label} ${status === "ACTIVE" ? "réactivée" : "désactivée"}.`);
    } catch (reason) {
      showError(reason);
    } finally {
      setBusyKey("");
    }
  };

  const normalizedDirectoryQuery = directoryQuery.trim().toLowerCase();
  const matchesDirectoryQuery = (...values: Array<string | undefined | null>) => !normalizedDirectoryQuery || values.some((value) => value?.toLowerCase().includes(normalizedDirectoryQuery));
  const visibleUsers = users.filter((user) => matchesDirectoryQuery(user.displayName, user.email, user.jobTitle, user.role, user.status));
  const visibleCards = cards.filter((card) => matchesDirectoryQuery(card.lastFour, card.holder, card.function, card.status));
  const visibleAccounts = accounts.filter((account) => matchesDirectoryQuery(account.number, account.label, account.type, account.status) && (accountStatusFilter === "ALL" || account.status === accountStatusFilter) && (accountTypeFilter === "ALL" || account.type === accountTypeFilter));
  const visibleProjects = projects.filter((project) => matchesDirectoryQuery(project.number, project.name, project.status) && (projectStatusFilter === "ALL" || project.status === projectStatusFilter));
  const visiblePeriods = periods.filter((period) => matchesDirectoryQuery(period.id, period.label, period.start, period.end, period.statementLabel, period.status));

  return <>
    <PageHeading eyebrow="Administration" title="Référentiels de production" description="Gérez les accès, cartes, comptes, projets et cycles de relevé depuis une source de vérité persistante." />
    {!persistenceReady && <div className="config-note"><span>i</span><p>Mode aperçu local : les boutons de sauvegarde sont désactivés et aucune modification ne sera envoyée à Firebase.</p></div>}
    {error && <p className="intake-review-message error">{error}</p>}
    {notice && <p className="intake-review-message saved">{notice}</p>}
    <section className="settings-list compact-settings-list">
      <button className={`settings-row ${selectedSection === "users" ? "selected" : ""}`} type="button" onClick={() => setSelectedSection("users")}><span className="settings-number n1">01</span><span className="settings-copy"><strong>Utilisateurs et accès</strong><span>Comptes, rôles et état d&apos;accès</span></span><span className="settings-meta">{users.length} profils</span><span className="row-arrow">→</span></button>
      <button className={`settings-row ${selectedSection === "cards" ? "selected" : ""}`} type="button" onClick={() => setSelectedSection("cards")}><span className="settings-number n2">02</span><span className="settings-copy"><strong>Cartes et titulaires</strong><span>Association officielle par identifiant de profil</span></span><span className="settings-meta">{cards.filter((card) => card.status === "Actif").length} actives</span><span className="row-arrow">→</span></button>
      <button className={`settings-row ${selectedSection === "accounts" ? "selected" : ""}`} type="button" onClick={() => setSelectedSection("accounts")}><span className="settings-number n3">03</span><span className="settings-copy"><strong>Comptes comptables</strong><span>Codes et libellés utilisés par la classification</span></span><span className="settings-meta">{accounts.filter((account) => account.status !== "INACTIVE").length} actifs</span><span className="row-arrow">→</span></button>
      <button className={`settings-row ${selectedSection === "projects" ? "selected" : ""}`} type="button" onClick={() => setSelectedSection("projects")}><span className="settings-number n4">04</span><span className="settings-copy"><strong>Projets et chantiers</strong><span>Référentiel choisi sur chaque facture</span></span><span className="settings-meta">{projects.filter((project) => project.status !== "INACTIVE").length} actifs</span><span className="row-arrow">→</span></button>
      <button className={`settings-row ${selectedSection === "periods" ? "selected" : ""}`} type="button" onClick={() => setSelectedSection("periods")}><span className="settings-number n5">05</span><span className="settings-copy"><strong>Périodes de relevé</strong><span>Cycle par défaut du 10 au 9, corrigible au besoin</span></span><span className="settings-meta">{periods.filter((period) => period.status !== "INACTIVE").length} actives</span><span className="row-arrow">→</span></button>
    </section>
    <section className="panel settings-editor compact-settings-editor">
      <div className="panel-header"><div><p className="eyebrow">Référentiel persistant</p><h2>{selectedSection === "users" ? "Utilisateurs et accès" : selectedSection === "cards" ? "Cartes et titulaires" : selectedSection === "accounts" ? "Comptes comptables" : selectedSection === "projects" ? "Projets et chantiers" : "Périodes de relevé"}</h2></div><span className="badge badge-neutral">{persistenceReady ? "Firebase" : "Aperçu local"}</span></div>
       <label className="directory-search"><span>Rechercher dans ce référentiel</span><input value={directoryQuery} onChange={(event) => setDirectoryQuery(event.target.value)} placeholder="Nom, numéro, carte ou période" /></label>
       {selectedSection === "accounts" && <div className="field-grid"><label className="field"><span>Statut</span><select value={accountStatusFilter} onChange={(event) => setAccountStatusFilter(event.target.value)}><option value="ALL">Tous</option><option value="ACTIVE">Actifs</option><option value="INACTIVE">Inactifs</option></select></label><label className="field"><span>Type</span><select value={accountTypeFilter} onChange={(event) => setAccountTypeFilter(event.target.value)}><option value="ALL">Tous</option><option value="EXPENSE">Dépense</option><option value="TAX">Taxe</option></select></label></div>}
       {selectedSection === "projects" && <label className="field"><span>Statut</span><select value={projectStatusFilter} onChange={(event) => setProjectStatusFilter(event.target.value)}><option value="ALL">Tous</option><option value="ACTIVE">Actifs</option><option value="INACTIVE">Inactifs</option></select></label>}
       {selectedSection === "users" && <>
         {canCreateUsers ? <form className="directory-form" onSubmit={createUser}>
           <div className="field-grid"><label className="field"><span>Nom complet</span><input required value={userForm.displayName} onChange={(event) => setUserForm((current) => ({ ...current, displayName: event.target.value }))} placeholder="Personne Démo" /></label><label className="field"><span>Courriel {userForm.sendInvitation ? "" : "(facultatif)"}</span><input required={userForm.sendInvitation} type="email" value={userForm.email} onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))} placeholder="personne@example.test" /></label></div>
           <div className="field-grid"><label className="field"><span>Fonction</span><input value={userForm.jobTitle} onChange={(event) => setUserForm((current) => ({ ...current, jobTitle: event.target.value }))} placeholder="Contremaître" /></label><label className="field"><span>Rôle applicatif</span><select value={userForm.role} onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))}><option value="WORKER">WORKER · dépôt seulement</option><option value="KIM">KIM · contrôle comptable</option><option value="ADMIN">ADMIN · administration</option></select></label></div>
            <div className="directory-invitation-option"><input id="send-user-invitation" type="checkbox" aria-describedby="send-user-invitation-help" checked={userForm.sendInvitation} onChange={(event) => setUserForm((current) => ({ ...current, sendInvitation: event.target.checked }))} /><div><label className="directory-invitation-label" htmlFor="send-user-invitation">Envoyer une invitation par email</label><small id="send-user-invitation-help">L’utilisateur crée lui-même son mot de passe avec le lien Firebase sécurisé.</small></div></div>
           <button className="primary-button" type="submit" disabled={!persistenceReady || busyKey === "create-user"}>{busyKey === "create-user" ? "Création…" : userForm.sendInvitation ? "Créer le profil et envoyer l’invitation" : "Créer le profil"}</button>
         </form> : <div className="config-note"><span>i</span><p>Le contrôle comptable peut consulter les profils et gérer les cartes. La création et la désactivation des comptes sont réservées à ADMIN.</p></div>}
         <div className="directory-list">{visibleUsers.map((user) => {
           const accountActive = user.authState === "ACTIVE" || user.invitationStatus === "ACTIVE";
           const invitationLabel = accountActive ? "Compte actif" : user.invitationStatus === "INVITED" ? "Invitation envoyée" : user.invitationStatus === "INVITATION_FAILED" ? "Échec d’envoi" : user.authAccount ? "À inviter" : user.email ? "À inviter · Auth absent" : "Email manquant";
           const invitationClass = accountActive ? "badge-success" : user.invitationStatus === "INVITATION_FAILED" ? "badge-danger" : user.invitationStatus === "INVITED" ? "badge-warning" : "badge-neutral";
           const action = accountActive ? "reset" : "invite";
           return <div className="directory-row" key={user.id}><div><strong>{user.displayName}</strong>{editingEmailUserId === user.id ? <div className="directory-email-editor"><input type="email" value={emailDraft} onChange={(event) => setEmailDraft(event.target.value)} aria-label={`Email de ${user.displayName}`} /><button className="text-button" type="button" disabled={busyKey === `email-${user.id}`} onClick={() => void saveUserEmail(user)}>{busyKey === `email-${user.id}` ? "…" : "Enregistrer"}</button><button className="text-button" type="button" onClick={() => setEditingEmailUserId("")}>Annuler</button></div> : <small>{user.email ?? "Courriel non renseigné"} · {user.jobTitle ?? "Fonction non renseignée"}</small>}</div><span className="badge badge-neutral">{user.role}</span><span className={`badge ${invitationClass}`}>{invitationLabel}</span>{canCreateUsers && <div className="directory-actions"><button className="secondary-button" type="button" disabled={!persistenceReady || busyKey === `${action}-${user.id}` || (!accountActive && !user.email)} onClick={() => void runUserAccessAction(user, action)}>{busyKey === `${action}-${user.id}` ? "…" : accountActive ? "Réinitialiser le mot de passe" : user.invitationStatus === "INVITED" ? "Renvoyer l’invitation" : "Envoyer l’invitation"}</button><button className="text-button" type="button" disabled={!persistenceReady} onClick={() => { setEditingEmailUserId(user.id); setEmailDraft(user.email ?? ""); setError(""); setNotice(""); }}>Modifier l’email</button><button className="text-button" type="button" disabled={!persistenceReady || busyKey === `user-${user.id}`} onClick={() => void toggleUser(user)}>{busyKey === `user-${user.id}` ? "…" : user.status === "ACTIVE" ? "Désactiver" : "Réactiver"}</button></div>}</div>;
         })}</div>
       </>}
      {selectedSection === "cards" && <>
        <form className="directory-form" onSubmit={addCard}><div className="field-grid"><label className="field"><span>Quatre derniers chiffres</span><input required inputMode="numeric" maxLength={4} value={cardForm.lastFour} onChange={(event) => setCardForm((current) => ({ ...current, lastFour: event.target.value.replace(/\D/g, "") }))} placeholder="9001" /></label><label className="field"><span>Titulaire</span><select required value={cardForm.holderId} onChange={(event) => setCardForm((current) => ({ ...current, holderId: event.target.value }))}><option value="">Sélectionner le profil</option>{users.filter((user) => user.status === "ACTIVE").map((user) => <option key={user.id} value={user.id}>{user.displayName} · {user.jobTitle ?? user.role}</option>)}</select></label></div><div className="field-grid"><label className="field"><span>Fonction de la carte</span><input value={cardForm.cardFunction} onChange={(event) => setCardForm((current) => ({ ...current, cardFunction: event.target.value }))} placeholder="Fonction démo" /></label><div className="directory-help">Seuls les quatre derniers chiffres sont conservés. Le numéro complet de la carte ne passe jamais dans l&apos;application.</div></div><button className="primary-button" type="submit" disabled={!persistenceReady || busyKey === "add-card"}>{busyKey === "add-card" ? "Enregistrement…" : "Ajouter et associer la carte"}</button></form>
        <div className="directory-list">{visibleCards.map((card) => <div className="directory-row card-directory-row" key={card.id}><div><strong>•••• {card.lastFour}</strong><small>{card.function} · {card.status} · {card.startDate || "date inconnue"}</small></div><select value={cardHolderDrafts[card.id] ?? card.holderId ?? ""} onChange={(event) => setCardHolderDrafts((current) => ({ ...current, [card.id]: event.target.value }))} aria-label={`Titulaire de la carte ${card.lastFour}`}><option value="">Titulaire à choisir</option>{users.filter((user) => user.status === "ACTIVE").map((user) => <option key={user.id} value={user.id}>{user.displayName}</option>)}</select><button className="secondary-button" type="button" disabled={!persistenceReady || busyKey === `card-${card.id}`} onClick={() => void saveCardAssignment(card)}>{busyKey === `card-${card.id}` ? "…" : "Enregistrer"}</button><button className="text-button" type="button" disabled={!persistenceReady || busyKey === `toggle-card-${card.id}`} onClick={() => void toggleCard(card)}>{card.status === "Actif" ? "Désactiver" : "Réactiver"}</button></div>)}</div>
      </>}
       {selectedSection === "accounts" && <>
         {canEditReferences ? <form className="directory-form" onSubmit={saveAccountReference}><div className="field-grid"><label className="field"><span>Numéro de compte</span><input required inputMode="numeric" value={accountForm.number} onChange={(event) => setAccountForm((current) => ({ ...current, number: event.target.value }))} placeholder="33544" /></label><label className="field"><span>Libellé / catégorie</span><input required value={accountForm.label} onChange={(event) => setAccountForm((current) => ({ ...current, label: event.target.value }))} placeholder="Matériaux divers" /></label></div><div className="field-grid"><label className="field"><span>Type</span><select value={accountForm.type} onChange={(event) => setAccountForm((current) => ({ ...current, type: event.target.value }))}><option value="EXPENSE">Dépense</option><option value="TAX">Taxe</option></select></label><div className="directory-help">Le numéro est stocké comme texte afin de préserver les zéros initiaux. L’identifiant interne ne change pas lors d’une correction.</div></div><button className="primary-button" type="submit" disabled={!persistenceReady || busyKey.startsWith("account-")}>{busyKey.startsWith("account-") ? "Enregistrement…" : accountForm.id ? "Enregistrer la modification" : "Ajouter le compte"}</button></form> : <div className="config-note"><span>i</span><p>Le contrôle comptable peut consulter et sélectionner les comptes. La gestion du référentiel est réservée à ADMIN.</p></div>}
         <div className="directory-list">{visibleAccounts.map((account) => <div className="directory-row" key={account.id}><div><strong>{account.number} — {account.label}</strong><small>{account.type === "TAX" ? "Taxe" : "Dépense"}</small></div><span className={`badge ${account.status === "INACTIVE" ? "badge-danger" : "badge-success"}`}>{account.status === "INACTIVE" ? "Inactif" : "Actif"}</span>{canEditReferences && <><button className="text-button" type="button" onClick={() => setAccountForm({ id: account.id, number: account.number, label: account.label, type: account.type })}>Modifier</button><button className="text-button" type="button" disabled={!persistenceReady || busyKey === `account-toggle-${account.id}`} onClick={() => void toggleAccount(account)}>{account.status === "INACTIVE" ? "Réactiver" : "Désactiver"}</button><button className="text-button danger-text" type="button" disabled={!persistenceReady || busyKey === `account-delete-${account.id}`} onClick={() => void deleteAccount(account)}>Supprimer</button></>}</div>)}</div>
       </>}
       {selectedSection === "projects" && <>
         {canEditReferences ? <>
           <form className="directory-form" onSubmit={saveProjectReference}><div className="field-grid"><label className="field"><span>Numéro de projet</span><input required value={projectForm.number} onChange={(event) => setProjectForm((current) => ({ ...current, number: event.target.value }))} placeholder="26015" /></label><label className="field"><span>Nom du projet</span><input required value={projectForm.name} onChange={(event) => setProjectForm((current) => ({ ...current, name: event.target.value }))} placeholder="Réfection usine Bécancour" /></label></div><button className="primary-button" type="submit" disabled={!persistenceReady || busyKey.startsWith("project-")}>{busyKey.startsWith("project-") ? "Enregistrement…" : projectForm.id ? "Enregistrer la modification" : "Ajouter le projet"}</button></form>
           <div className="project-import-panel">
             <div><p className="eyebrow">Mise à jour en lot · ADMIN</p><h3>Importer la liste des projets</h3><p className="muted">Sélectionnez un fichier JSON pour obtenir un aperçu avant toute écriture.</p></div>
             <label className="project-import-file"><span>Fichier JSON</span><input ref={projectImportInputRef} type="file" accept=".json,application/json" disabled={!persistenceReady || busyKey === "project-import"} onChange={(event) => void previewProjectImport(event)} /></label>
             <div className="directory-help">Format attendu : <code>{'{ "projects": [{ "number": "26015", "name": "Nom du chantier", "status": "ACTIVE" }] }'}</code>. Un numéro existant est mis à jour; un numéro absent est ajouté. Les projets absents du fichier ne sont jamais supprimés.</div>
             {projectImportFileName && <p className="project-import-file-name">Fichier sélectionné : <strong>{projectImportFileName}</strong></p>}
             {projectImportPlan && <div className="project-import-preview" aria-live="polite">
               <div className="project-import-summary"><span><strong>{projectImportPlan.rows.length}</strong> analysés</span><span><strong>{projectImportPlan.additions.length}</strong> ajouts</span><span><strong>{projectImportPlan.updates.length}</strong> mises à jour</span><span><strong>{projectImportPlan.unchanged.length}</strong> inchangés</span></div>
               {projectImportPlan.errors.length > 0 && <div className="project-import-errors"><strong>Erreurs de validation</strong><ul>{projectImportPlan.errors.slice(0, 6).map((message) => <li key={message}>{message}</li>)}</ul>{projectImportPlan.errors.length > 6 && <small>… et {projectImportPlan.errors.length - 6} autre(s).</small>}</div>}
               {projectImportPlan.conflicts.length > 0 && <div className="project-import-errors"><strong>Conflits</strong><ul>{projectImportPlan.conflicts.slice(0, 6).map((message) => <li key={message}>{message}</li>)}</ul>{projectImportPlan.conflicts.length > 6 && <small>… et {projectImportPlan.conflicts.length - 6} autre(s).</small>}</div>}
               {projectImportPlan.errors.length === 0 && projectImportPlan.conflicts.length === 0 && <button className="primary-button" type="button" disabled={!persistenceReady || busyKey === "project-import"} onClick={() => void applyProjectImport()}>{busyKey === "project-import" ? "Import en cours…" : "Appliquer l’import"}</button>}
             </div>}
           </div>
         </> : <div className="config-note"><span>i</span><p>Le contrôle comptable peut consulter et sélectionner les projets. L’import JSON et la gestion du référentiel sont réservés à ADMIN.</p></div>}
         <div className="directory-list">{visibleProjects.map((project) => <div className="directory-row" key={project.id}><div><strong>{project.number} — {project.name}</strong><small>ID interne conservé: {project.id}</small></div><span className={`badge ${project.status === "INACTIVE" ? "badge-danger" : "badge-success"}`}>{project.status === "INACTIVE" ? "Inactif" : "Actif"}</span>{canEditReferences && <><button className="text-button" type="button" onClick={() => setProjectForm({ id: project.id, number: project.number, name: project.name })}>Modifier</button><button className="text-button" type="button" disabled={!persistenceReady || busyKey === `project-toggle-${project.id}`} onClick={() => void toggleProject(project)}>{project.status === "INACTIVE" ? "Réactiver" : "Désactiver"}</button><button className="text-button danger-text" type="button" disabled={!persistenceReady || busyKey === `project-delete-${project.id}`} onClick={() => void deleteProjectReference(project)}>Supprimer</button></>}</div>)}</div>
      </>}
      {selectedSection === "periods" && <>
        <form className="directory-form" onSubmit={savePeriodReference}><div className="field-grid"><label className="field"><span>Identifiant de période</span><input required value={periodForm.id} onChange={(event) => setPeriodForm((current) => ({ ...current, id: event.target.value }))} placeholder="2026-08" /></label><label className="field"><span>Libellé</span><input required value={periodForm.label} onChange={(event) => setPeriodForm((current) => ({ ...current, label: event.target.value }))} placeholder="Cycle du 10 août au 9 septembre" /></label></div><div className="field-grid"><label className="field"><span>Du</span><input required type="date" value={periodForm.startDate} onChange={(event) => setPeriodForm((current) => ({ ...current, startDate: event.target.value }))} /></label><label className="field"><span>Au</span><input required type="date" value={periodForm.endDate} onChange={(event) => setPeriodForm((current) => ({ ...current, endDate: event.target.value }))} /></label></div><label className="field"><span>Libellé du relevé (facultatif)</span><input value={periodForm.statementLabel} onChange={(event) => setPeriodForm((current) => ({ ...current, statementLabel: event.target.value }))} placeholder="Relevé Mastercard · cycle du 10 au 9" /></label><p className="directory-help">Le cycle par défaut est du 10 au 9. Une personne autorisée peut toujours corriger une période directement sur une revue.</p><button className="primary-button" type="submit" disabled={!persistenceReady || busyKey.startsWith("period-")}>{busyKey.startsWith("period-") ? "Enregistrement…" : "Ajouter ou actualiser la période"}</button></form>
        <div className="directory-list">{visiblePeriods.map((period) => <div className="directory-row" key={period.id}><div><strong>{period.label}</strong><small>{period.start} → {period.end} · {period.statementLabel}</small></div><span className={`badge ${period.status === "INACTIVE" ? "badge-danger" : "badge-success"}`}>{period.status === "INACTIVE" ? "Désactivée" : "Active"}</span><button className="text-button" type="button" disabled={!persistenceReady || busyKey === `period-toggle-${period.id}`} onClick={() => void togglePeriod(period)}>{period.status === "INACTIVE" ? "Réactiver" : "Désactiver"}</button></div>)}</div>
      </>}
    </section>
  </>;
}

function SaferSettingsPage() {
  void CompactSettingsPage;
  const data = useAppData();
  const [selectedSection, setSelectedSection] = useState("cards");
  const [cards, setCards] = useState(data.cards);
  const [accounts, setAccounts] = useState(data.accounts);
  const [projects, setProjects] = useState(data.projects);
  const [editingCards, setEditingCards] = useState(false);
  const [pendingDeleteCard, setPendingDeleteCard] = useState("");
  const [newCardLastFour, setNewCardLastFour] = useState("");
  const [newCardHolder, setNewCardHolder] = useState("");
  const [newProject, setNewProject] = useState("");
  const sections = [
    { id: "cards", title: "Cartes et titulaires", meta: cards.filter((card) => card.status === "Actif").length + " actives" },
    { id: "accounts", title: "Comptes comptables", meta: accounts.length + " comptes" },
    { id: "projects", title: "Projets", meta: projects.length + " chantiers" },
    { id: "sku", title: "Produits et SKU", meta: data.skuReferences.length + " SKU suivis" },
    { id: "controls", title: "Contrôles et seuils", meta: "0,01 $" },
    { id: "ai", title: "Intelligence artificielle", meta: "Gemini · prêt à brancher" },
  ];
  const updateCardHolder = (cardId: string, holder: string) => setCards((current) => current.map((card) => card.id === cardId ? { ...card, holder } : card));
  const removeCard = (cardId: string) => setCards((current) => current.filter((card) => card.id !== cardId));
  const addCard = () => {
    const lastFour = newCardLastFour.trim();
    const holder = newCardHolder.trim();
    if (lastFour.length !== 4 || !/^\d{4}$/.test(lastFour) || !holder) return;
    setCards((current) => [...current, { id: "CARD-" + String(current.length + 1).padStart(2, "0"), lastFour, holder, function: "À définir", startDate: "2026-01-01", status: "Actif" }]);
    setNewCardLastFour("");
    setNewCardHolder("");
  };
  return <>
    <PageHeading eyebrow="Administration" title="Configuration" description="Cartes, titulaires, comptes, projets et références SKU dans une liste compacte." />
    <section className="settings-list compact-settings-list">{sections.map((section, index) => <button className={"settings-row " + (selectedSection === section.id ? "selected" : "")} key={section.id} onClick={() => setSelectedSection(section.id)}><span className={"settings-number n" + ((index % 6) + 1)}>0{index + 1}</span><span className="settings-copy"><strong>{section.title}</strong><span>Modifier ce référentiel</span></span><span className="settings-meta">{section.meta}</span><span className="row-arrow">→</span></button>)}</section>
    <section className="panel settings-editor compact-settings-editor">
      <div className="panel-header"><div><p className="eyebrow">Éditeur de référentiel</p><h2>{sections.find((section) => section.id === selectedSection)?.title}</h2></div><span className="badge badge-neutral">Mode local</span></div>
      {selectedSection === "cards" && <div className="settings-editor-list settings-card-list">
        <div className="settings-card-toolbar"><span>{editingCards ? "Mode édition activé · les actions sensibles sont visibles." : "Lecture seule · activez Modifier pour changer ou retirer une carte."}</span><button className="secondary-button" type="button" onClick={() => { setEditingCards((current) => !current); setPendingDeleteCard(""); }}>{editingCards ? "Terminer" : "Modifier"}</button></div>
        {cards.map((card) => <div className="settings-card-row" key={card.id}><span><b>•••• {card.lastFour}</b><small>{card.status} · {card.function}</small></span><input disabled={!editingCards} value={card.holder} onChange={(event) => updateCardHolder(card.id, event.target.value)} aria-label="Titulaire de la carte" />{editingCards && <button className="settings-edit-button" type="button" onClick={() => setPendingDeleteCard(card.id)} aria-label="Préparer le retrait de cette carte">Retirer</button>}{editingCards && pendingDeleteCard === card.id && <div className="settings-delete-confirm"><span>Retirer la carte •••• {card.lastFour}?</span><button className="danger-button" type="button" onClick={() => { removeCard(card.id); setPendingDeleteCard(""); }}>Confirmer le retrait</button><button className="text-button" type="button" onClick={() => setPendingDeleteCard("")}>Annuler</button></div>}</div>)}
        {editingCards && <form className="settings-add-row settings-add-card" onSubmit={(event) => { event.preventDefault(); addCard(); }}><input inputMode="numeric" maxLength={4} value={newCardLastFour} onChange={(event) => setNewCardLastFour(event.target.value)} placeholder="4 derniers chiffres" aria-label="Quatre derniers chiffres de la carte" /><input value={newCardHolder} onChange={(event) => setNewCardHolder(event.target.value)} placeholder="Titulaire" aria-label="Nouveau titulaire" /><button className="secondary-button" type="submit">＋ Ajouter la carte</button></form>}
      </div>}
      {selectedSection === "accounts" && <div className="settings-editor-list">{accounts.map((account) => <div className="settings-inline-row" key={account.code}><input value={account.code} onChange={(event) => setAccounts((current) => current.map((item) => item.code === account.code ? { ...item, code: event.target.value } : item))} aria-label="Code comptable" /><input value={account.label} onChange={(event) => setAccounts((current) => current.map((item) => item.code === account.code ? { ...item, label: event.target.value } : item))} aria-label="Catégorie comptable" /></div>)}</div>}
      {selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={project.id + "-" + index}><input value={project.name} onChange={(event) => setProjects((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} aria-label={"Projet " + (index + 1)} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; const projectId = createClientId().slice(0, 8); setProjects((current) => [...current, { id: "PROJECT-" + projectId, number: "PROJECT-" + projectId, name: newProject.trim(), status: "ACTIVE" }]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}
      {selectedSection === "sku" && <div className="settings-editor-list">{data.skuReferences.map((reference) => <div className="sku-reference-row" key={reference.merchant + "-" + reference.sku}><div><strong>{reference.merchant} · SKU {reference.sku}</strong><span>{reference.label} · {reference.accountCode} · {reference.category}</span></div><span className="badge badge-warning">{reference.status}</span><small>Recherche externe à lancer lorsque la fiche est nécessaire.</small></div>)}</div>}
      {!["cards", "accounts", "projects", "sku"].includes(selectedSection) && <div className="settings-placeholder"><strong>Référentiel prêt à connecter</strong><p>Cette section est préparée pour les règles Firebase et les permissions administrateur.</p></div>}
    </section>
    <div className="config-note"><span>i</span><p><strong>Protection des actions sensibles.</strong> Le retrait d’une carte passe par le mode Modifier, puis par une confirmation explicite.</p></div>
  </>;
}

function CompactSettingsPage() {
  void SaferSettingsPage;
  void SettingsPage;
  const [selectedSection, setSelectedSection] = useState("cards");
  const [cards, setCards] = useState(creditCards);
  const [accounts, setAccounts] = useState(accountCategories);
  const [projects, setProjects] = useState(projectReferences);
  const [newCardLastFour, setNewCardLastFour] = useState("");
  const [newCardHolder, setNewCardHolder] = useState("");
  const [newProject, setNewProject] = useState("");
  const sections = [
    { id: "cards", title: "Cartes et titulaires", meta: cards.filter((card) => card.status === "Actif").length + " actives" },
    { id: "accounts", title: "Comptes comptables", meta: accounts.length + " comptes" },
    { id: "projects", title: "Projets", meta: projects.length + " chantiers" },
    { id: "sku", title: "Produits et SKU", meta: skuReferences.length + " SKU suivis" },
    { id: "controls", title: "Contrôles et seuils", meta: "0,01 $" },
    { id: "ai", title: "Intelligence artificielle", meta: "Gemini · prêt à brancher" },
  ];
  const updateCardHolder = (cardId: string, holder: string) => setCards((current) => current.map((card) => card.id === cardId ? { ...card, holder } : card));
  const removeCard = (cardId: string) => setCards((current) => current.filter((card) => card.id !== cardId));
  const addCard = () => {
    const lastFour = newCardLastFour.trim();
    const holder = newCardHolder.trim();
    if (lastFour.length !== 4 || !/^\d{4}$/.test(lastFour) || !holder) return;
    setCards((current) => [...current, { id: "CARD-" + String(current.length + 1).padStart(2, "0"), lastFour, holder, function: "À définir", startDate: "2026-01-01", status: "Actif" }]);
    setNewCardLastFour("");
    setNewCardHolder("");
  };
  return <>
    <PageHeading eyebrow="Administration" title="Configuration" description="Cartes, titulaires, comptes, projets et références SKU dans une liste compacte." />
    <section className="settings-list compact-settings-list">{sections.map((section, index) => <button className={"settings-row " + (selectedSection === section.id ? "selected" : "")} key={section.id} onClick={() => setSelectedSection(section.id)}><span className={"settings-number n" + ((index % 6) + 1)}>0{index + 1}</span><span className="settings-copy"><strong>{section.title}</strong><span>Modifier ce référentiel</span></span><span className="settings-meta">{section.meta}</span><span className="row-arrow">→</span></button>)}</section>
    <section className="panel settings-editor compact-settings-editor">
      <div className="panel-header"><div><p className="eyebrow">Éditeur de référentiel</p><h2>{sections.find((section) => section.id === selectedSection)?.title}</h2></div><span className="badge badge-neutral">Mode local</span></div>
      {selectedSection === "cards" && <div className="settings-editor-list settings-card-list">{cards.map((card) => <div className="settings-card-row" key={card.id}><span><b>•••• {card.lastFour}</b><small>{card.status} · {card.function}</small></span><input value={card.holder} onChange={(event) => updateCardHolder(card.id, event.target.value)} aria-label="Titulaire de la carte" /><button className="icon-button" type="button" onClick={() => removeCard(card.id)} aria-label="Retirer cette carte">×</button></div>)}<form className="settings-add-row settings-add-card" onSubmit={(event) => { event.preventDefault(); addCard(); }}><input inputMode="numeric" maxLength={4} value={newCardLastFour} onChange={(event) => setNewCardLastFour(event.target.value)} placeholder="4 derniers chiffres" aria-label="Quatre derniers chiffres de la carte" /><input value={newCardHolder} onChange={(event) => setNewCardHolder(event.target.value)} placeholder="Titulaire" aria-label="Nouveau titulaire" /><button className="secondary-button" type="submit">＋ Ajouter la carte</button></form></div>}
      {selectedSection === "accounts" && <div className="settings-editor-list">{accounts.map((account) => <div className="settings-inline-row" key={account.code}><input value={account.code} onChange={(event) => setAccounts((current) => current.map((item) => item.code === account.code ? { ...item, code: event.target.value } : item))} aria-label="Code comptable" /><input value={account.label} onChange={(event) => setAccounts((current) => current.map((item) => item.code === account.code ? { ...item, label: event.target.value } : item))} aria-label="Catégorie comptable" /></div>)}</div>}
      {selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={project.id + "-" + index}><input value={project.name} onChange={(event) => setProjects((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} aria-label={"Projet " + (index + 1)} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; const projectId = createClientId().slice(0, 8); setProjects((current) => [...current, { id: "PROJECT-" + projectId, number: "PROJECT-" + projectId, name: newProject.trim(), status: "ACTIVE" }]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}
      {selectedSection === "sku" && <div className="settings-editor-list">{skuReferences.map((reference) => <div className="sku-reference-row" key={reference.merchant + "-" + reference.sku}><div><strong>{reference.merchant} · SKU {reference.sku}</strong><span>{reference.label} · {reference.accountCode} · {reference.category}</span></div><span className="badge badge-warning">{reference.status}</span><small>Recherche externe à lancer lorsque la fiche est nécessaire.</small></div>)}</div>}
      {!["cards", "accounts", "projects", "sku"].includes(selectedSection) && <div className="settings-placeholder"><strong>Référentiel prêt à connecter</strong><p>Cette section est préparée pour les règles Firebase et les permissions administrateur.</p></div>}
    </section>
    <div className="config-note"><span>i</span><p><strong>Classification automatique.</strong> Les transactions sont classées par catégorie et code comptable; les SKU inconnus restent « À confirmer ».</p></div>
  </>;
}

function SettingsPage() {
  const [selectedSection, setSelectedSection] = useState("cards");
  const [cards, setCards] = useState(creditCards);
  const [accounts, setAccounts] = useState(accountCategories);
  const [projects, setProjects] = useState(projectReferences);
  const skus = skuReferences;
  const [newCardLastFour, setNewCardLastFour] = useState("");
  const [newCardHolder, setNewCardHolder] = useState("");
  const [newProject, setNewProject] = useState("");
  const [notice, setNotice] = useState("");
  const sections = [
    { id: "users", title: "Utilisateurs et accès", description: "Comptes, rôles, personnes, cartes autorisées", meta: "12 comptes" },
    { id: "cards", title: "Cartes et titulaires", description: "Association officielle entre chaque carte et sa personne", meta: `${cards.filter((card) => card.status === "Actif").length} actives · 1 inactive` },
    { id: "accounts", title: "Comptes comptables", description: "Codes et catégories utilisés dans les rapports", meta: `${accounts.length} comptes` },
    { id: "projects", title: "Référentiels métier", description: "Chantiers, fournisseurs et aliases", meta: `${projects.length} chantiers` },
    { id: "sku", title: "Produits et SKU", description: "Base Canadian Tire, enrichissement et validations", meta: `${skus.length} SKU suivis` },
    { id: "controls", title: "Contrôles et seuils", description: "Tolérance monétaire, doublons et règles de validation", meta: "0,01 $" },
    { id: "ai", title: "Intelligence artificielle", description: "Fournisseur, modèle, schéma et seuils de confiance", meta: "Gemini · prêt à brancher" },
    { id: "archives", title: "Archivage", description: "Rappels, export, vérification et politique de purge", meta: "Mode manuel" },
  ];
  const selectedTitle = sections.find((section) => section.id === selectedSection)?.title ?? "Configuration";
  const updateCardHolder = (cardId: string, holder: string) => setCards((current) => current.map((card) => card.id === cardId ? { ...card, holder } : card));
  const removeCard = (cardId: string) => setCards((current) => current.filter((card) => card.id !== cardId));
  const addCard = () => {
    const lastFour = newCardLastFour.trim();
    const holder = newCardHolder.trim();
    if (lastFour.length !== 4 || !/^\d{4}$/.test(lastFour) || !holder) return;
    setCards((current) => [...current, { id: "CARD-" + String(current.length + 1).padStart(2, "0"), lastFour, holder, function: "À définir", startDate: "2026-01-01", status: "Actif" }]);
    setNewCardLastFour("");
    setNewCardHolder("");
  };
  const updateAccount = (code: string, field: "code" | "label", value: string) => setAccounts((current) => current.map((account) => account.code === code ? { ...account, [field]: value } : account));
  const updateProject = (index: number, value: string) => setProjects((current) => current.map((project, projectIndex) => projectIndex === index ? { ...project, name: value } : project));
  void removeCard;
  void addCard;

      return <><PageHeading eyebrow="Administration" title="Configuration" description="Les cartes, titulaires, comptes, projets et références SKU sont regroupés dans une source de vérité administrable." action={<button className="primary-button" onClick={() => setNotice("Les changements sont prêts à être persistés après l’approbation du schéma Firebase.")}>Enregistrer les changements</button>} /><section className="settings-list">{sections.map((section, index) => <button className={`settings-row ${selectedSection === section.id ? "selected" : ""}`} key={section.id} onClick={() => setSelectedSection(section.id)}><span className={`settings-number n${(index % 6) + 1}`}>0{index + 1}</span><span className="settings-copy"><strong>{section.title}</strong><span>{section.description}</span></span><span className="settings-meta">{section.meta}</span><span className="row-arrow">→</span></button>)}</section><section className="panel settings-editor"><div className="panel-header"><div><p className="eyebrow">Éditeur de référentiel</p><h2>{selectedTitle}</h2></div><span className="badge badge-neutral">Mode local</span></div>{selectedSection === "cards" && <div className="settings-editor-grid">{cards.map((card) => <label className="settings-input-card" key={card.id}><span>Carte ···· {card.lastFour} · {card.status}</span><input value={card.holder} onChange={(event) => updateCardHolder(card.id, event.target.value)} aria-label={`Titulaire de la carte ${card.lastFour}`} /><small>{card.function} · active depuis {formatDate(card.startDate)}</small></label>)}</div>}{selectedSection === "accounts" && <div className="settings-editor-list">{accounts.map((account) => <div className="settings-inline-row" key={account.code}><input value={account.code} onChange={(event) => updateAccount(account.code, "code", event.target.value)} aria-label="Code comptable" /><input value={account.label} onChange={(event) => updateAccount(account.code, "label", event.target.value)} aria-label="Catégorie comptable" /></div>)}</div>}{selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={`${project.id}-${index}`}><input value={project.name} onChange={(event) => updateProject(index, event.target.value)} aria-label={`Projet ${index + 1}`} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; const projectId = createClientId().slice(0, 8); setProjects((current) => [...current, { id: "PROJECT-" + projectId, number: "PROJECT-" + projectId, name: newProject.trim(), status: "ACTIVE" }]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}{selectedSection === "sku" && <div className="settings-editor-list">{skus.map((reference) => <div className="sku-reference-row" key={`${reference.merchant}-${reference.sku}`}><div><strong>{reference.merchant} · SKU {reference.sku}</strong><span>{reference.label} · {reference.accountCode} · {reference.category}</span></div><span className="badge badge-warning">{reference.status}</span><small>Recherche externe à lancer lorsque la fiche est nécessaire.</small></div>)}</div>}{!["cards", "accounts", "projects", "sku"].includes(selectedSection) && <div className="settings-placeholder"><strong>Référentiel prêt à connecter</strong><p>Cette section est préparée pour les règles Firebase et les permissions administrateur. Aucune mutation distante n’est envoyée dans cette étape.</p></div>}</section>{notice && <div className="config-note"><span>✓</span><p>{notice}</p></div>}<div className="config-note"><span>i</span><p><strong>Classification automatique.</strong> Les transactions sont classées par catégorie et code comptable; les SKU connus peuvent remplacer la catégorie locale. Les SKU inconnus restent « À confirmer » pour éviter une écriture comptable automatique non vérifiée.</p></div></>;
}
