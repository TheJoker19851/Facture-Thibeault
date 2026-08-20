"use client";

import { ChangeEvent, createContext, FormEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { accountingReadSource, commitInvoiceIntake, createFirebaseUser, deleteExpenseAccount, deleteProject, loadAccountingSnapshot, mapAccountingSnapshot, removeDemoAccountingData, saveCreditCard, saveExpenseAccount, saveInvoiceIntakeReview, saveProject, saveStatementPeriod, saveUserProfile } from "../../firebase/accounting";
import { appCheckConfigured, firebaseConfigured, firebaseStorage } from "../../firebase/client";
import { sqlConnectConfigured } from "../../firebase/data-connect";
import { processInvoiceIntakeWithGemini } from "../../firebase/ai";
import { invoicePhotoFileError, uploadInvoicePhotos } from "../../firebase/uploads";
import { classifyInvoice } from "../../lib/invoice-processing.mjs";
import { DecisionJsonError, parseDecisionExceptions, serializeDecisionChecks, serializeDecisionExceptions } from "../../lib/decision-json.mjs";
import { filterTransactionsByStatus, transactionStatusFilterCounts, TRANSACTION_STATUS_FILTERS } from "../../lib/transaction-filters.mjs";
import { INVOICE_CLIENT_VERSION } from "../../lib/invoice-client-version.mjs";
import { AUDIT_ACTIONS, auditDetails, parseAuditDetails } from "../../lib/audit-events.mjs";
import { clearCaptureDraft, loadCaptureDraft, saveCaptureDraft } from "../../lib/capture-queue.mjs";
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
  invoiceNumber: string;
  note: string;
  sku?: string;
  correctionField?: "subtotal" | "account" | "attachment";
};

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
  firebaseUid: string;
  displayName: string;
  email?: string;
  jobTitle?: string;
  role: string;
  status: string;
};

type CardPeriod = {
  id: string;
  label: string;
  start: string;
  end: string;
  statementLabel: string;
  status?: string;
};

type ProjectReference = {
  id: string;
  number: string;
  name: string;
  status?: string;
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

const skuReferences: SkuReference[] = [
  { merchant: "Quincaillerie Démo", sku: "DEMO-SKU-001", label: "Bloc de démonstration", category: "Matériaux Démo", accountCode: "DEMO-90001", status: "Validé" },
];

const projectReferences: ProjectReference[] = [
  { id: "DEMO-PROJET-001", number: "DEMO-001", name: "Chantier Démo A", status: "ACTIVE" },
  { id: "DEMO-PROJET-002", number: "DEMO-002", name: "Chantier Démo B", status: "ACTIVE" },
  { id: "DEMO-ADMIN", number: "DEMO-ADMIN", name: "Administration Démo", status: "ACTIVE" },
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
  intakes: [],
};

function useAppData() {
  return useContext(AppDataContext) ?? demoAppData;
}

const navItems: Array<{ id: View; label: string; icon: string }> = [
  { id: "dashboard", label: "Tableau de bord", icon: "⌂" },
  { id: "transactions", label: "Transactions", icon: "▤" },
  { id: "intakes", label: "Factures à vérifier", icon: "!" },
  { id: "reconciliation", label: "Rapprochement", icon: "⇄" },
  { id: "reports", label: "Rapports", icon: "◔" },
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
  return exception.code === "MISSING_REQUIRED_FIELD" && exception.fieldName === "statementPeriodId";
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
    case "AMBIGUOUS_ACCOUNT":
      return "Plusieurs comptes sont possibles — choisissez le compte approprié.";
    case "UNKNOWN_CARD":
      return "Carte utilisée introuvable — vérifiez la carte associée.";
    case "AMBIGUOUS_CARD":
      return "Plusieurs cartes sont possibles — vérifiez la carte associée.";
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
  const identity = useFirebaseIdentity();
  const isPreviewMode = process.env.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE === "true";
  const isProductionDataSource = accountingReadSource === "firebase-sql-connect" && !isPreviewMode;
  const accountRole = firebaseConfigured && !isPreviewMode ? identity.role : initialRole;
  const canUseAccounting = accountRole === "KIM" || accountRole === "ADMIN";
  const canUseDiagnostics = accountRole === "ADMIN";
  const [appData, setAppData] = useState<AppData>(demoAppData);
  const [dataSourceState, setDataSourceState] = useState<"demo" | "loading" | "ready" | "error">(isProductionDataSource ? "loading" : "demo");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [viewMode, setViewMode] = useState<"accounting" | "capture">(accountRole === "WORKER" || initialRole === "WORKER" ? "capture" : "accounting");
  const [view, setView] = useState<View>(accountRole === "WORKER" || initialRole === "WORKER" ? "capture" : "dashboard");
  const [selectedId, setSelectedId] = useState<string>(appData.transactions[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatusFilter>("Toutes");
  const [selectedPeriod, setSelectedPeriod] = useState<CardPeriod>(isProductionDataSource ? emptyProductionPeriod : appData.periods[0]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [draftReceiptId, setDraftReceiptId] = useState<string | null>(null);
  const [queueState, setQueueState] = useState<"idle" | "uploading" | "sent">("idle");
  const [isOnline, setIsOnline] = useState(() => typeof navigator === "undefined" ? true : navigator.onLine);
  const [clientVersionState, setClientVersionState] = useState<ClientVersionState>(isProductionDataSource ? "checking" : "current");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const serviceWorkerRegistrationRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!isProductionDataSource || !canUseAccounting) return;
    let active = true;
    loadAccountingSnapshot()
      .then((snapshot) => {
        if (!active) return;
        const mappedData = mapAccountingSnapshot(snapshot);
        const nextData = removeDemoAccountingData(mappedData);
        setAppData(nextData);
        setSelectedId((current) => nextData.transactions.some((transaction) => transaction.id === current) ? current : (nextData.transactions[0]?.id ?? ""));
        setSelectedPeriod((current) => nextData.periods.find((period) => period.id === current.id) ?? nextData.periods[0] ?? current);
        setDataSourceState("ready");
      })
      .catch(() => {
        if (active) setDataSourceState("error");
      });
    return () => {
      active = false;
    };
  }, [canUseAccounting, isProductionDataSource, loadAttempt]);

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
    const file = event.target.files?.[0];
    if (!file) return;
    const validationError = invoicePhotoFileError(file);
    if (validationError) {
      notify(validationError);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    const next = await new Promise<PhotoItem>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`, url: String(reader.result), name: file.name, file });
      reader.readAsDataURL(file);
    });
    if (!photos.length) setDraftReceiptId(crypto.randomUUID());
    setPhotos((current) => [...current, next]);
    if (inputRef.current) inputRef.current.value = "";
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
          draftReceiptId ?? crypto.randomUUID(),
        );
        setPhotos([]);
        setDraftReceiptId(null);
        await clearCaptureDraft();
        setQueueState("idle");
        notify(`Facture reçue · ${receipt.receiptId.slice(0, 8)} ✓ Vous pouvez en déposer une autre.`);
        void processInvoiceIntakeWithGemini(receipt.receiptId)
          .then((result) => {
            const vendor = result.extraction.vendor || "fournisseur à confirmer";
            notify(`IA enregistrée · ${vendor} · facture ${receipt.receiptId.slice(0, 8)} à vérifier.`);
          })
          .catch(() => {
            notify(`Facture ${receipt.receiptId.slice(0, 8)} reçue · analyse IA à vérifier dans l'administration.`);
          });
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
    if (nextView === "debug" && !canUseDiagnostics) return;
    if (nextView !== "capture" && !canUseAccounting) return;
    setView(nextView);
    setViewMode(nextView === "capture" ? "capture" : "accounting");
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
          <div className="brand-mark compact"><span className="brand-glyph">MT</span><span>Thibeault</span></div>
          {canUseAccounting ? <button className="ghost-button worker-status" onClick={() => goTo("dashboard")} aria-label="Retourner au contrôle comptable">Retour au contrôle</button> : <span className="worker-status">Dépôt sécurisé</span>}
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
              <span className="camera-hint">La caméra arrière s’ouvre avec le bouton ci-dessous. Ajoutez les pages dans l’ordre avant l’envoi.</span>
            </div>
            <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={handleFiles} />
            <button className="capture-button" onClick={() => inputRef.current?.click()} aria-label={photos.length ? "Ajouter la page suivante" : "Prendre la première photo"}><span>⌾</span> {photos.length ? "Ajouter la page suivante" : "Prendre la première photo"}</button>
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
        </section>
        {toast && <div className="toast">{toast}</div>}
      </main>
    );
  }

  if (isProductionDataSource && dataSourceState === "loading") {
    return <AccountingDataLoading />;
  }

  if (isProductionDataSource && dataSourceState === "error") {
    return <AccountingDataError onRetry={retryAccounting} />;
  }

  return (
    <AppDataContext.Provider value={appData}>
      <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block"><div className="brand-mark"><span className="brand-glyph">MT</span><div><strong>Maçonnerie</strong><span>Thibeault</span></div></div><span className="prototype-pill">{isProductionDataSource ? "Production" : "Prototype"}</span></div>
        <div className="workspace-switcher"><span className="avatar avatar-blue">K</span><div><strong>Kim / Administration</strong><span>Équipe dépenses</span></div><span className="chevron">⌄</span></div>
        <nav className="main-nav" aria-label="Navigation principale">
          {navItems.filter((item) => item.id !== "debug" || canUseDiagnostics).map((item) => <button key={item.id} className={`nav-item ${view === item.id ? "active" : ""}`} onClick={() => goTo(item.id)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.id === "intakes" && appData.intakes.filter(isIntakeException).length > 0 && <span className="nav-count">{appData.intakes.filter(isIntakeException).length}</span>}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="archive-mini"><span className="archive-icon">◷</span><div><strong>Archivage recommandé</strong><span>842 photos admissibles</span></div><span className="arrow">→</span></div>{canUseAccounting && <button className="worker-mode-button" onClick={() => goTo("capture")}><span>⌾</span> Ouvrir le mode dépôt</button>}<div className="user-footer"><span className="avatar avatar-gold">{accountRole === "ADMIN" ? "A" : "K"}</span><div><strong>{accountRole === "ADMIN" ? "Administration" : "Kim"}</strong><span>{accountRole === "KIM" ? "Contrôle comptable" : "Administrateur"}</span></div><button className="icon-button" aria-label="Options du compte">•••</button></div></div>
      </aside>
      <section className="content-area">
        <header className="topbar"><div className="breadcrumbs"><span>Maçonnerie Thibeault</span><span>/</span><strong>{navItems.find((item) => item.id === view)?.label ?? "Tableau de bord"}</strong></div><div className="topbar-actions"><span className="demo-note">{dataSourceLabel}</span><button className="icon-button" aria-label="Notifications">♧<span className="notification-dot" /></button><button className="avatar avatar-gold small" onClick={() => goTo("capture")} aria-label="Ouvrir le mode dépôt">{accountRole === "ADMIN" ? "A" : "K"}</button></div></header>
        <div className="page-content">
          {view === "dashboard" && <Dashboard onNavigate={goTo} onOpenTransactions={(person) => { setQuery(person ?? ""); setStatusFilter("Toutes"); goTo("transactions"); }} period={selectedPeriod} onPeriodChange={setSelectedPeriod} />}
          {view === "transactions" && <TransactionsPage items={filteredTransactions} query={query} setQuery={setQuery} statusFilter={statusFilter} statusCounts={transactionStatusCounts} setStatusFilter={setStatusFilter} onOpen={(id) => { setSelectedId(id); setView("transaction" as View); }} />}
          {view === "reconciliation" && <ReconciliationPage period={selectedPeriod} onPeriodChange={setSelectedPeriod} isProductionDataSource={isProductionDataSource} />}
          {view === "reports" && <ReportsPage period={selectedPeriod} onPeriodChange={setSelectedPeriod} />}
          {view === "archives" && <ArchivesPage onNotify={notify} isProductionDataSource={isProductionDataSource} />}
          {view === "settings" && <AdminDirectoryPage onDataChange={(patch) => setAppData((current) => ({ ...current, ...patch }))} role={accountRole ?? "ADMIN"} />}
          {view === "intakes" && canUseAccounting && <IntakeQueuePage items={appData.intakes.filter(isIntakeException)} onSaved={(receiptId, patch) => setAppData((current) => ({ ...current, intakes: current.intakes.map((intake) => intake.receiptId === receiptId ? { ...intake, ...patch } : intake) }))} />}
          {view === "debug" && canUseDiagnostics && <DebugPage dataSourceState={dataSourceState} onRetry={retryAccounting} role={accountRole ?? "ADMIN"} />}
          {(view as string) === "transaction" && selected && <TransactionDetail transaction={selected} onBack={() => setView("transactions")} onNotify={notify} />}
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
  notes: string;
};

function centsToDraftDollars(cents: string | undefined) {
  if (cents == null) return "";
  const value = Number(cents);
  return Number.isFinite(value) ? (value / 100).toFixed(2) : "";
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
    accountCode: intake.classificationAccountCode ?? "",
    notes: intake.aiNotes ?? "",
  };
}

function dollarsToCents(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed >= 0 ? Math.round(parsed * 100) : null;
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

function auditActionLabel(action: string) {
  const labels: Record<string, string> = {
    DEPOSIT_CREATED: "Dépôt créé",
    AI_EXTRACTION_COMPLETED: "Extraction IA terminée",
    AI_PROCESSING_FAILED: "Traitement échoué",
    HUMAN_CORRECTION: "Correction humaine",
    HUMAN_VALIDATION: "Validation humaine",
    TRANSACTION_CREATED: "Transaction créée",
    RECONCILIATION_UPDATED: "Rapprochement mis à jour",
  };
  return labels[action] ?? action;
}

function AuditTrail({ events, role, state }: { events: AuditEventRecord[]; role: Role | null; state: "loading" | "ready" | "error" }) {
  return <section className="audit-trail" aria-label="Piste d’audit"><div className="section-heading"><span>03</span><div><p className="eyebrow">Traçabilité</p><h2>Historique de la facture</h2></div></div>{state === "loading" && <p className="muted">Chargement de l’historique…</p>}{state === "error" && <p className="intake-evidence-message error">La piste d’audit n’est pas disponible.</p>}{state === "ready" && !events.length && <p className="muted">Aucun événement d’audit enregistré.</p>}{events.length > 0 && <div className="audit-event-list">{events.map((event) => { const details = parseAuditDetails(event.details); const actor = event.actor?.displayName ?? (event.actorRole ? `Rôle ${event.actorRole}` : "Utilisateur authentifié"); return <article className="audit-event" key={event.id}><div><strong>{auditActionLabel(event.action)}</strong><small>{actor} · {event.createdAt}</small></div>{role === "ADMIN" && event.action === "HUMAN_CORRECTION" && Array.isArray(details.corrections) && <div className="audit-corrections">{details.corrections.map((correction: { field?: string; previous?: unknown; corrected?: unknown }) => <span key={String(correction.field)}><b>{String(correction.field ?? "Champ")}</b> · {String(correction.previous ?? "Non renseigné")} → {String(correction.corrected ?? "Non renseigné")}</span>)}</div>}</article>; })}</div>}</section>;
}

function IntakeQueuePage({ items, onSaved }: { items: InvoiceIntake[]; onSaved: (receiptId: string, patch: Partial<InvoiceIntake>) => void }) {
  const { accounts, cards, periods, projects, skuReferences, users } = useAppData();
  const identity = useFirebaseIdentity();
  const sortedItems = [...items].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  const [selectedReceiptId, setSelectedReceiptId] = useState(items[0]?.receiptId ?? "");
  const selectedIntake = items.find((intake) => intake.receiptId === selectedReceiptId) ?? null;
  const [draft, setDraft] = useState<IntakeReviewDraft>(() => selectedIntake ? intakeToReviewDraft(selectedIntake) : {
    vendor: "", invoiceNumber: "", invoiceDate: "", subtotal: "", tps: "0.00", tvq: "0.00", total: "", currency: "CAD", sku: "", category: "", projectId: "", accountCode: "", notes: "",
  });
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [draftDirty, setDraftDirty] = useState(false);
  const cardSuggestionFor = (intake: InvoiceIntake | null) => {
    if (!intake) return "";
    const uploader = users.find((user) => user.firebaseUid === intake.uploaderUid);
    return cards.find((card) => card.status === "Actif" && card.holderId === uploader?.id)?.id ?? "";
  };
  const [commitCardId, setCommitCardId] = useState(() => cardSuggestionFor(selectedIntake));
  const [commitPeriodId, setCommitPeriodId] = useState("");
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

  const selectIntake = (intake: InvoiceIntake) => {
    setSelectedReceiptId(intake.receiptId);
    setDraft(intakeToReviewDraft(intake));
    setSaveState("idle");
    setSaveMessage("");
    setDraftDirty(false);
    setCommitCardId(cardSuggestionFor(intake));
    setCommitPeriodId("");
    setCommitState("idle");
  };
  const updateDraft = (field: keyof IntakeReviewDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setDraftDirty(true);
    setSaveState("idle");
    setCommitState("idle");
    setSaveMessage("");
  };
  const inferredClassification = classifyInvoice(
    { vendor: draft.vendor, sku: draft.sku || undefined, category: draft.category || undefined },
    skuReferences,
    accounts,
  );
  const classificationCategory = draft.category || inferredClassification.category;
  const classificationSource = draft.accountCode ? "KIM_REVIEW" : inferredClassification.source;
  const classificationConfidence = draft.accountCode ? 1 : inferredClassification.confidence;
  const isReadyForAccounting = Boolean(draft.vendor.trim() && draft.invoiceDate && draft.accountCode && draft.projectId);
  const messageState = commitState === "error" || commitState === "saved" ? commitState : saveState;
  const suggestedCard = cards.find((card) => card.id === commitCardId);
  const suggestedUploader = selectedIntake ? users.find((user) => user.firebaseUid === selectedIntake.uploaderUid) : undefined;
  const selectedReviewMessages = selectedIntake ? intakeReviewMessages(selectedIntake) : [];
  const selectedCorrectionFields = selectedIntake ? intakeCorrectionFields(selectedIntake) : new Set<string>();
  const needsCorrection = (...fieldNames: string[]) => fieldNames.some((fieldName) => selectedCorrectionFields.has(fieldName));

  const saveReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    setSaveState("saving");
    setSaveMessage("");
    const status = isReadyForAccounting ? "VALIDATED" : "NEEDS_REVIEW";
    const classificationStatus = isReadyForAccounting ? "RESOLVED" : inferredClassification.resolution;
    const decisionExceptions = isReadyForAccounting ? [] : [
      ...(!draft.accountCode ? [{ code: "MISSING_ACCOUNT", fieldName: "accountCode", message: "Un compte comptable doit être confirmé.", aiValue: null, suggestedValue: inferredClassification.accountCode, status: "OPEN" }] : []),
      ...(!draft.projectId ? [{ code: "UNKNOWN_PROJECT", fieldName: "projectId", message: "Projet introuvable — sélectionnez le chantier correspondant.", aiValue: null, suggestedValue: null, status: "OPEN" }] : []),
    ];
    const previousValues = {
      vendor: selectedIntake.extractedVendor ?? null,
      invoiceNumber: selectedIntake.extractedInvoiceNumber ?? null,
      invoiceDate: selectedIntake.extractedInvoiceDate ?? null,
      subtotalCents: selectedIntake.extractedSubtotalCents ?? null,
      tpsCents: selectedIntake.extractedTpsCents ?? null,
      tvqCents: selectedIntake.extractedTvqCents ?? null,
      totalCents: selectedIntake.extractedTotalCents ?? null,
      sku: selectedIntake.extractedSku ?? null,
      category: selectedIntake.extractedCategory ?? null,
      projectId: selectedIntake.extractedProjectId ?? null,
      accountCode: selectedIntake.classificationAccountCode ?? null,
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
      accountCode: draft.accountCode || null,
    };
    const changedFields = Object.keys(correctedValues).filter((field) => previousValues[field as keyof typeof previousValues] !== correctedValues[field as keyof typeof correctedValues]);
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
        projectId: draft.projectId,
        accountCode: draft.accountCode || null,
        classificationCategory: classificationCategory || null,
        classificationSource,
        classificationConfidence,
        classificationStatus,
        aiNotes: draft.notes.trim(),
        decisionExceptions: serializeDecisionExceptions(decisionExceptions),
        decisionChecks: serializeDecisionChecks([{ code: "KIM_REVIEW", passed: isReadyForAccounting, message: isReadyForAccounting ? "Revue KIM complète." : "La revue KIM reste incomplète." }]),
        auditDetails: auditDetails({
          status,
          changedFields,
          corrections: changedFields.map((field) => ({ field, previous: previousValues[field as keyof typeof previousValues], corrected: correctedValues[field as keyof typeof correctedValues] })),
        }),
      });
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
        classificationAccountCode: draft.accountCode || undefined,
        classificationCategory: classificationCategory || undefined,
        classificationSource,
        classificationConfidence,
        classificationStatus,
        aiNotes: draft.notes.trim(),
        decisionExceptions: serializeDecisionExceptions(decisionExceptions),
        decisionChecks: serializeDecisionChecks([{ code: "KIM_REVIEW", passed: isReadyForAccounting, message: isReadyForAccounting ? "Revue KIM complète." : "La revue KIM reste incomplète." }]),
      });
      setDraftDirty(false);
      setCommitState("idle");
      setSaveState("saved");
      setSaveMessage(status === "VALIDATED" ? "Revue enregistrée; prête pour la création comptable." : "Correction enregistrée; il manque encore le compte comptable.");
    } catch (error) {
      setSaveState("error");
      setSaveMessage(error instanceof Error ? error.message : "La revue n'a pas pu être enregistrée.");
    }
  };

  const commitAccounting = async () => {
    if (!selectedIntake) return;
    if (processingStatusOf(selectedIntake) !== "VALIDATED" || draftDirty) {
      setCommitState("error");
      setSaveMessage("Enregistrez d'abord la revue Kim avant de créer l'écriture comptable.");
      return;
    }
    const subtotalCents = dollarsToCents(draft.subtotal);
    const tpsCents = dollarsToCents(draft.tps);
    const tvqCents = dollarsToCents(draft.tvq);
    const totalCents = dollarsToCents(draft.total);
    if (!draft.vendor.trim() || !draft.invoiceDate || subtotalCents == null || tpsCents == null || tvqCents == null || totalCents == null || !draft.accountCode || !draft.projectId || !commitCardId) {
      setCommitState("error");
      setSaveMessage("Le fournisseur, la date, les montants, le compte, le projet et la carte sont requis. La période du relevé est facultative.");
      return;
    }
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
        accountCode: draft.accountCode,
        cardId: commitCardId,
        statementPeriodId: commitPeriodId || null,
        projectId: draft.projectId,
        classificationNote: draft.notes.trim() || "Revue Kim confirmée.",
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

  return <>
    <PageHeading eyebrow="Traitement des factures" title="Factures à vérifier" description="Seules les factures bloquées par une exception nécessitant une intervention sont présentées à Kim. Les dépôts en cours de traitement restent masqués." />
    <section className="intake-review-layout">
      <section className="panel intake-panel">
        <div className="panel-header">
          <div><p className="eyebrow">File d’exceptions</p><h2>{items.length ? `${items.length} exception${items.length > 1 ? "s" : ""}` : "Aucune exception"}</h2></div>
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
              <span className={intakeStatusClass(processingStatusOf(intake))}>{intakeStatusLabel(processingStatusOf(intake))}</span>
            </button>;
          })}
        </div> : <div className="empty-state"><span>◌</span><strong>Les prochains dépôts apparaîtront ici</strong><p>Après un envoi, Gemini extrait la facture et conserve sa proposition pour validation.</p></div>}
      </section>
      {selectedIntake ? <form className="panel intake-review" onSubmit={saveReview}>
        <div className="panel-header"><div><p className="eyebrow">Exception à résoudre</p><h2>{draft.vendor || "Facture sélectionnée"}</h2></div><span className={intakeStatusClass(processingStatusOf(selectedIntake))}>{intakeStatusLabel(processingStatusOf(selectedIntake))}</span></div>
        {selectedReviewMessages.length > 0 && <div className="detail-alert"><div className="detail-alert-icon">!</div><div><p className="eyebrow">À corriger</p>{selectedReviewMessages.map((message) => <span key={message}>{message}</span>)}</div></div>}
        <InvoiceIntakeEvidence key={selectedIntake.receiptId} intake={selectedIntake} />
        <AuditTrail events={auditEvents} role={identity.role} state={auditState} />
        <div className="intake-review-form">
          <label className={`field wide ${needsCorrection("vendor") ? "needs-correction" : ""}`}><span>Fournisseur</span><input aria-invalid={needsCorrection("vendor")} value={draft.vendor} onChange={(event) => updateDraft("vendor", event.target.value)} /></label>
          <div className="field-grid"><label className={`field ${needsCorrection("invoiceNumber") ? "needs-correction" : ""}`}><span>No de facture</span><input aria-invalid={needsCorrection("invoiceNumber")} value={draft.invoiceNumber} onChange={(event) => updateDraft("invoiceNumber", event.target.value)} /></label><label className={`field ${needsCorrection("invoiceDate") ? "needs-correction" : ""}`}><span>Date</span><input aria-invalid={needsCorrection("invoiceDate")} type="date" value={draft.invoiceDate} onChange={(event) => updateDraft("invoiceDate", event.target.value)} /></label></div>
          <div className="field-grid"><label className={`field ${needsCorrection("subtotalCents") ? "needs-correction" : ""}`}><span>Sous-total</span><input aria-invalid={needsCorrection("subtotalCents")} inputMode="decimal" value={draft.subtotal} onChange={(event) => updateDraft("subtotal", event.target.value)} /></label><label className={`field ${needsCorrection("totalCents") ? "needs-correction" : ""}`}><span>Total</span><input aria-invalid={needsCorrection("totalCents")} inputMode="decimal" value={draft.total} onChange={(event) => updateDraft("total", event.target.value)} /></label><label className={`field ${needsCorrection("tpsCents") ? "needs-correction" : ""}`}><span>TPS</span><input aria-invalid={needsCorrection("tpsCents")} inputMode="decimal" value={draft.tps} onChange={(event) => updateDraft("tps", event.target.value)} /></label><label className={`field ${needsCorrection("tvqCents") ? "needs-correction" : ""}`}><span>TVQ</span><input aria-invalid={needsCorrection("tvqCents")} inputMode="decimal" value={draft.tvq} onChange={(event) => updateDraft("tvq", event.target.value)} /></label></div>
           <label className={`field wide ${needsCorrection("accountCode") ? "needs-correction" : ""}`}><span>Compte comptable confirmé</span><select aria-invalid={needsCorrection("accountCode")} value={draft.accountCode} onChange={(event) => updateDraft("accountCode", event.target.value)}><option value="">Choisir le compte de dépense</option>{accounts.filter((account) => account.status !== "INACTIVE" && account.type === "EXPENSE").map((account) => <option key={account.id} value={account.number}>{account.number} · {account.label}</option>)}</select><small>{inferredClassification.accountCode ? `Suggestion automatique : ${inferredClassification.accountCode} · ${inferredClassification.category}` : "Aucune suggestion fiable; le choix de Kim est requis."}</small></label>
           <label className={`field wide ${needsCorrection("projectId") ? "needs-correction" : ""}`}><span>Chantier / projet</span><select required aria-invalid={needsCorrection("projectId")} value={draft.projectId} onChange={(event) => updateDraft("projectId", event.target.value)}><option value="">Projet introuvable — sélectionnez le chantier correspondant</option>{projects.filter((project) => project.status !== "INACTIVE").map((project) => <option key={project.id} value={project.id}>{project.number} · {project.name}</option>)}</select><small>Un projet actif est obligatoire avant la création de l’écriture.</small></label>
          <label className="field wide"><span>Note de revue</span><textarea rows={3} value={draft.notes} onChange={(event) => updateDraft("notes", event.target.value)} /></label>
          <section className="intake-commit-card">
            <div><p className="eyebrow">Création comptable</p><h3>Références comptables</h3><p className="muted">La carte est requise pour créer l’écriture. La période du relevé est facultative et pourra être associée lors du rapprochement.</p></div>
            <div className="field-grid">
              <label className={`field ${needsCorrection("cardId") ? "needs-correction" : ""}`}><span>Carte utilisée</span><select aria-invalid={needsCorrection("cardId")} value={commitCardId} onChange={(event) => { setCommitCardId(event.target.value); setCommitState("idle"); }}><option value="">Choisir la carte</option>{cards.filter((card) => card.status === "Actif").map((card) => <option key={card.id} value={card.id}>•••• {card.lastFour} · {card.holder}</option>)}</select>{suggestedCard && suggestedUploader && <small>Suggestion : carte de {suggestedUploader.displayName}, selon le compte qui a envoyé la facture.</small>}</label>
              <label className="field"><span>Période du relevé (facultatif)</span><select value={commitPeriodId} onChange={(event) => { setCommitPeriodId(event.target.value); setCommitState("idle"); }}><option value="">Aucune période sélectionnée</option>{periods.map((period) => <option key={period.id} value={period.id}>{period.label}</option>)}</select><small>Association possible plus tard dans le rapprochement.</small></label>
            </div>
            {processingStatusOf(selectedIntake) !== "VALIDATED" && <small>Enregistrez la correction et confirmez un compte avant de créer l’écriture.</small>}
            {draftDirty && <small>Des changements non enregistrés désactivent la création jusqu&apos;à la prochaine sauvegarde.</small>}
            <button className="secondary-button" type="button" onClick={commitAccounting} disabled={commitState === "saving" || processingStatusOf(selectedIntake) !== "VALIDATED" || draftDirty}>{commitState === "saving" ? "Création…" : "Créer l’écriture comptable"}</button>
          </section>
          {saveMessage && <p className={`intake-review-message ${messageState}`}>{saveMessage}</p>}
          <div className="intake-review-actions"><button className="primary-button" type="submit" disabled={saveState === "saving"}>{saveState === "saving" ? "Enregistrement…" : isReadyForAccounting ? "Marquer prête pour comptabilité" : "Enregistrer la correction"}</button><span className="data-source-help">La création est réservée à Kim et aux administrateurs; un nouvel essai ne crée pas de doublon.</span></div>
        </div>
      </form> : <div className="panel empty-state"><span>◌</span><strong>Sélectionnez un dépôt</strong><p>La proposition Gemini et les corrections de Kim apparaîtront ici.</p></div>}
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
  return <div className="period-selector"><span>Période des cartes</span><select value={selectedPreset} onChange={(event) => { const option = periods.find((candidate) => candidate.id === event.target.value); if (option) onChange(option); }}><option value="custom">Période personnalisée</option>{periods.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select><div className="period-custom-dates"><label><span>Du</span><input type="date" value={period.start} max={period.end} onChange={(event) => updateDate("start", event.target.value)} /></label><span className="period-date-arrow">→</span><label><span>Au</span><input type="date" value={period.end} min={period.start} onChange={(event) => updateDate("end", event.target.value)} /></label></div><small>Cycle standard : du 10 au 9. Kim peut ajuster les dates avec une période personnalisée.</small></div>;
}

function Dashboard({ onNavigate, onOpenTransactions, period, onPeriodChange }: { onNavigate: (view: View) => void; onOpenTransactions: (person?: string) => void; period: CardPeriod; onPeriodChange: (period: CardPeriod) => void }) {
  const { cards, transactions } = useAppData();
  const holderRows = cards.filter((card) => card.status === "Actif").map((card) => {
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
      <button className="dashboard-tab" onClick={() => onNavigate("reports")}>4 · Tableau comptable</button>
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
  return <div className={`table-wrap ${compact ? "compact" : ""}`}><table><thead><tr><th>Transaction</th><th>Date</th><th>Fournisseur</th><th>Titulaire / carte</th><th>Projet</th><th>Compte</th><th>Sous-total</th><th>TPS</th><th>TVQ</th><th>Total</th><th>État / rapprochement</th><th /></tr></thead><tbody>{items.map((item) => { const classification = classifyTransaction(item, data); const accountNumber = item.accountNumber ?? classification.code; const accountLabel = item.accountLabel ?? classification.category; return <tr key={item.id} onClick={() => onOpen?.(item.id)}><td><div className="transaction-id"><span className="receipt-icon">▧</span><span><strong>{item.id}</strong><small>{item.invoiceNumber} · {item.imageCount} photo{item.imageCount > 1 ? "s" : ""}</small></span></div></td><td>{formatDate(item.date)}</td><td>{item.vendor}</td><td>{item.person}<small>•••• {item.card}</small></td><td><strong>{item.projectNumber ?? "—"}</strong><small>{item.projectName ?? item.project}</small></td><td><strong>{accountNumber}</strong><small>{accountLabel}</small></td><td>{formatCurrency(item.subtotal)}</td><td>{formatCurrency(item.tps)}</td><td>{formatCurrency(item.tvq)}</td><td><strong>{formatCurrency(item.total)}</strong></td><td><span className={statusClass(item.status)}>{item.status}</span><small className="table-substatus">{item.reconciliation}</small></td><td><button className="row-menu" onClick={(event) => { event.stopPropagation(); onOpen?.(item.id); }} aria-label={`Ouvrir ${item.id}`}>→</button></td></tr>; })}</tbody></table>{items.length === 0 && <div className="empty-state"><span>⌕</span><strong>Aucune transaction trouvée</strong><p>Modifiez vos filtres pour élargir la recherche.</p></div>}</div>;
}

function TransactionDetail({ transaction, onBack, onNotify }: { transaction: Transaction; onBack: () => void; onNotify: (message: string) => void }) {
  const data = useAppData();
  const [activePage, setActivePage] = useState(1);
  const [saved, setSaved] = useState(false);
  const [draftCategory, setDraftCategory] = useState(transaction.category);
  const [draftSubtotal, setDraftSubtotal] = useState("160.35");
  const [attachmentAdded, setAttachmentAdded] = useState(false);
  const classification = classifyTransaction({ category: draftCategory, sku: transaction.sku, vendor: transaction.vendor }, data);
  return <>
    <div className="detail-toolbar">
      <button className="back-button" onClick={onBack}>← <span>Transactions</span></button>
      <div className="detail-toolbar-actions">
        <span className={statusClass(transaction.status)}>{transaction.status}</span>
        <button className="secondary-button" onClick={() => onNotify("Transaction laissée dans la file À vérifier.")}>Remettre à vérifier</button>
        <button className="primary-button" onClick={() => { setSaved(true); onNotify("Correction enregistrée dans l’audit."); }}>Valider la transaction</button>
      </div>
    </div>
    <div className="detail-layout">
      <section className="evidence-panel">
        <div className="evidence-top"><div><p className="eyebrow">Preuve · {transaction.imageCount} pages</p><h1>{transaction.vendor}</h1></div><div className="evidence-tools"><button className="icon-button">−</button><span>100%</span><button className="icon-button">＋</button><button className="icon-button">↗</button></div></div>
        <div className="document-viewer"><div className="document-paper"><div className="paper-brand">{transaction.vendor}</div><div className="paper-line wide" /><div className="paper-line medium" /><div className="paper-grid"><div /><div /><div /><div /><div /><div /></div><div className="paper-total"><span>TOTAL</span><strong>{formatCurrency(transaction.total)}</strong></div><span className="paper-stamp">APERÇU<br />DÉMO</span></div></div>
        <div className="page-controls"><button onClick={() => setActivePage(Math.max(1, activePage - 1))}>‹</button><span>Page {activePage} sur {transaction.imageCount}</span><button onClick={() => setActivePage(Math.min(transaction.imageCount, activePage + 1))}>›</button></div>
      </section>
      <aside className="detail-form">
        <div className="form-section"><div className="section-heading"><span>01</span><div><p className="eyebrow">Provenance</p><h2>Source de la transaction</h2></div></div><div className="provenance-card"><div className="avatar avatar-blue">K</div><div><strong>{transaction.submittedBy}</strong><span>Soumis le {formatDate(transaction.date)} · appareil mobile</span></div><span className="verified-mark">✓</span></div><div className="field-grid"><Field label="Personne associée" value={transaction.person} /><Field label="Carte détectée" value={`•••• ${transaction.card}`} hint="Concordance confirmée" tone="success" /><Field label="Dossier source" value="/dépôts/chantier" /><Field label="Réception" value={`${formatDate(transaction.date)} · 14:32`} /></div></div>
         <div className="form-section"><div className="section-heading"><span>02</span><div><p className="eyebrow">Facture</p><h2>Données principales</h2></div></div><div className="field-grid"><Field label="Fournisseur" value={transaction.vendor} /><Field label="No facture" value={transaction.invoiceNumber} /><Field label="Date de facture" value={formatDate(transaction.date)} /><Field label="Chantier" value={transaction.project} /><Field label="Catégorie" value={draftCategory} /><Field label="Compte comptable" value={`${classification.code} · ${classification.category}`} invalid={transaction.correctionField === "account"} wide /></div>{transaction.correctionField === "account" && <label className="correction-editor correction-editor-danger"><span>Corriger la classification proposée par le SKU {transaction.sku}</span><select value={draftCategory} onChange={(event) => setDraftCategory(event.target.value)}>{data.accounts.filter((account) => account.type === "EXPENSE").map((account) => <option value={account.label} key={account.id}>{account.number} · {account.label}</option>)}</select></label>}</div>
        {transaction.issue && <div className="detail-alert"><div className="detail-alert-icon">!</div><div><p className="eyebrow">Action requise avant validation</p><strong>{transaction.issue}</strong><span>{transaction.correction ?? "Correction humaine requise avant validation."}</span></div></div>}
         <div className="form-section"><div className="section-heading"><span>03</span><div><p className="eyebrow">Montants</p><h2>Contrôle comptable</h2></div><span className="control-ok">✓ Contrôles 4/4</span></div><div className="amount-card"><div className={transaction.correctionField === "subtotal" ? "amount-invalid" : ""}><span>Sous-total</span>{transaction.correctionField === "subtotal" ? <input className="amount-input" type="number" step="0.01" value={draftSubtotal} onChange={(event) => setDraftSubtotal(event.target.value)} /> : <strong>{formatCurrency(transaction.subtotal)}</strong>}</div><div><span>TPS</span><strong>{formatCurrency(transaction.tps)}</strong></div><div><span>TVQ</span><strong>{formatCurrency(transaction.tvq)}</strong></div><div className="amount-total"><span>Total</span><strong>{formatCurrency(transaction.total)}</strong></div></div></div>
        <div className="form-section"><div className="section-heading"><span>04</span><div><p className="eyebrow">Articles</p><h2>Lignes extraites</h2></div><button className="text-button">＋ Ajouter</button></div><div className="line-items"><div className="line-item"><span>01</span><div><strong>Matériaux / pièce</strong><small>Description originale conservée</small></div><strong>120,00 $</strong></div><div className="line-item warning-line"><span>02</span><div><strong>Article à confirmer</strong><small>Information absente de la page analysée</small></div><strong>—</strong></div></div><div className="field-note">{transaction.note}</div>{transaction.correctionField === "attachment" && <div className="correction-editor correction-editor-danger"><strong>Bon de livraison requis</strong><span>Cette correction doit être jointe à la facture avant la validation.</span><button className="secondary-button" onClick={() => setAttachmentAdded(true)}>{attachmentAdded ? "Pièce ajoutée ✓" : "Ajouter la pièce justificative"}</button></div>}</div>
        <div className="audit-footer">{saved ? "Dernière correction enregistrée à l’instant" : "Dernière analyse IA · il y a 8 min"}<button className="text-button">Voir l’audit →</button></div>
      </aside>
    </div>
  </>;
}

function Field({ label, value, hint, tone, wide = false, invalid = false }: { label: string; value: string; hint?: string; tone?: string; wide?: boolean; invalid?: boolean }) {
  return <label className={`field ${wide ? "wide" : ""} ${invalid ? "field-invalid" : ""}`}><span>{label}{invalid && <b> · correction requise</b>}</span><div className="field-value">{value}<span className="field-edit">✎</span></div>{hint && <small className={tone === "success" ? "hint-success" : ""}>{hint}</small>}</label>;
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

function ReconciliationPage({ period, onPeriodChange, isProductionDataSource }: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void; isProductionDataSource: boolean }) {
  const { cards, transactions } = useAppData();
  const activeCards = cards.filter((card) => card.status === "Actif");
  const visibleTransactions = transactions.filter((transaction) => isTransactionInPeriod(transaction, period));
  const matchedCount = visibleTransactions.filter((transaction) => transaction.reconciliation === "Rapprochée").length;
  const missingCount = visibleTransactions.filter((transaction) => transaction.reconciliation === "Facture manquante").length;
  const reviewCount = visibleTransactions.filter((transaction) => transaction.reconciliation === "Non rapprochée").length;

  return <>
    <PageHeading eyebrow="Contrôle des relevés" title="Rapprochement" description="Chaque relevé est comparé aux factures reçues pour la même période et la même carte." action={<button className="primary-button"><span>↑</span> Importer un relevé</button>} />
    <div className="reconciliation-toolbar"><PeriodSelector period={period} onChange={onPeriodChange} /><div className="period-card"><span className="card-icon teal">▤</span><div><span>Cartes incluses</span><strong>{activeCards.length} cartes actives · titulaires associés</strong></div><button className="icon-button">⌄</button></div></div>
    <div className="card-roster">{activeCards.map((card) => <span className="card-chip" key={card.id}><b>•••• {card.lastFour}</b><span>{card.holder}</span></span>)}</div>
    <div className="reconciliation-stats"><StatTile label="Lignes du relevé" value={String(visibleTransactions.length)} /><StatTile label="Rapprochées" value={String(matchedCount)} tone="success" /><StatTile label="À vérifier" value={String(reviewCount)} tone="warning" /><StatTile label="Factures manquantes" value={String(missingCount)} tone="danger" /></div>
    <section className="panel reconciliation-panel"><div className="panel-header"><div><p className="eyebrow">{period.statementLabel} · {period.label}</p><h2>{isProductionDataSource ? "Correspondances et exceptions" : "Correspondances et exceptions · données fictives"}</h2></div><button className="secondary-button">Exporter les exceptions</button></div>
      <div className="reconciliation-explainer"><span className="summary-icon rose">!</span><div>{isProductionDataSource ? <><strong>Les lignes proviennent de Firebase SQL Connect.</strong><span>Les états de rapprochement sont calculés à partir des transactions du cycle sélectionné.</span></> : <><strong>Chaque ligne ci-dessous est une donnée de démonstration.</strong><span>Les cartes, titulaires, fournisseurs et montants sont fictifs.</span></>}</div></div>
      <div className="statement-list">{isProductionDataSource ? visibleTransactions.map((transaction) => {
        const isMatched = transaction.reconciliation === "Rapprochée";
        const isMissing = transaction.reconciliation === "Facture manquante";
        return <StatementRow key={transaction.id} date={formatDate(transaction.date)} vendor={transaction.vendor} amount={formatCurrency(transaction.total)} card={transaction.card} holder={transaction.person} status={isMatched ? "RAPPROCHÉE" : isMissing ? "FACTURE MANQUANTE" : "À VÉRIFIER"} tone={isMatched ? "success" : isMissing ? "danger" : "warning"} reason={isMatched ? "Facture associée et montant concordant." : isMissing ? "Aucune facture associée à cette ligne de relevé." : transaction.issue ?? "La ligne doit être vérifiée par Kim."} action={isMatched ? "Aucune action requise." : isMissing ? "Importer ou associer la facture correspondante." : "Ouvrir la transaction et confirmer le rapprochement."} />;
      }) : <><StatementRow date="12 août 2026" vendor="Quincaillerie Démo" amount="114,98 $" card="9001" holder="Alice Démo" status="FACTURE MANQUANTE" tone="danger" reason="Aucune facture démo reçue pour cette ligne fictive." action="Tester le dépôt mobile avec le compte WORKER de démonstration." /><StatementRow date="11 août 2026" vendor="Station Démo" amount="91,98 $" card="9001" holder="Alice Démo" status="RAPPROCHÉE · DEMO-TX-002" tone="success" reason="Facture fictive trouvée et montant concordant." action="Aucune action — scénario de démonstration réussi." /><StatementRow date="10 août 2026" vendor="Équipement Démo" amount="229,95 $" card="9002" holder="Benoît Démo" status="À VÉRIFIER" tone="warning" reason="Catégorie démo encore à confirmer." action="Ouvrir la facture avec KIM et confirmer le compte 90003." /></>}{isProductionDataSource && visibleTransactions.length === 0 && <div className="empty-state"><span>⇄</span><strong>Aucune ligne pour cette période</strong><p>Importez un relevé ou sélectionnez une autre période.</p></div>}</div>
    </section>
  </>;
}

function StatTile({ label, value, tone = "" }: { label: string; value: string; tone?: string }) { return <div className={`stat-tile ${tone}`}><span>{label}</span><strong>{value}</strong></div>; }
function StatementRow({ date, vendor, amount, card, holder, status, tone, reason, action }: { date: string; vendor: string; amount: string; card: string; holder: string; status: string; tone: string; reason: string; action: string }) { return <div className="statement-row"><span className="statement-date">{date}</span><span className="statement-vendor"><strong>{vendor}</strong><small>Carte •••• {card} · {holder}</small></span><strong className="statement-amount">{amount}</strong><span className={`statement-status ${tone}`}><span className="status-dot" />{status}</span><div className="statement-resolution"><strong>Pourquoi</strong><span>{reason}</span><strong>À faire</strong><span>{action}</span></div><button className="row-menu">→</button></div>; }

function ReportsPage(props: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void }) {
  return <KimAccountingReport {...props} />;
}

function KimAccountingReport({ period, onPeriodChange, embedded = false }: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void; embedded?: boolean }) {
  void DemoReportsPage;
  const data = useAppData();
  const { cards, transactions, accounts } = data;
  const [selectedPerson, setSelectedPerson] = useState("TOUS");
  const [selectedProject, setSelectedProject] = useState("TOUS");
  const people = Array.from(new Set(cards.map((card) => card.holder)));
  const projects = data.projects;
  const visibleTransactions = useMemo(() => transactions.filter((transaction) => {
    const matchesPerson = selectedPerson === "TOUS" || transaction.person === selectedPerson;
    const matchesProject = selectedProject === "TOUS" || transaction.projectId === selectedProject || transaction.projectNumber === selectedProject;
    const matchesPeriod = isTransactionInPeriod(transaction, period);
    const isIncludedStatus = transaction.accountingStatus === "POSTED" &&
      (transaction.processingStatus === "AUTO_APPROVED" || transaction.processingStatus === "VALIDATED");
    return matchesPerson && matchesProject && matchesPeriod && isIncludedStatus;
  }), [period, selectedPerson, selectedProject, transactions]);
  const visibleTotals = useMemo(() => {
    const totals = new Map<string, { subtotal: number; tps: number; tvq: number; total: number }>();
    visibleTransactions.forEach((transaction) => {
      const accountNumber = transaction.accountNumber ?? classifyTransaction(transaction, data).code;
      const current = totals.get(accountNumber) ?? { subtotal: 0, tps: 0, tvq: 0, total: 0 };
      totals.set(accountNumber, { subtotal: current.subtotal + transaction.subtotal, tps: current.tps + transaction.tps, tvq: current.tvq + transaction.tvq, total: current.total + transaction.total });
    });
    return totals;
  }, [data, visibleTransactions]);
  const visibleTotal = Array.from(visibleTotals.values()).reduce((sum, amount) => sum + amount.total, 0);
  const visibleSubtotal = Array.from(visibleTotals.values()).reduce((sum, amount) => sum + amount.subtotal, 0);
  const visibleTps = Array.from(visibleTotals.values()).reduce((sum, amount) => sum + amount.tps, 0);
  const visibleTvq = Array.from(visibleTotals.values()).reduce((sum, amount) => sum + amount.tvq, 0);
  return <>
    {!embedded && <PageHeading eyebrow="Analyse" title="Rapports" description="Le tableau compact utilisé par Kim pour reporter les dépenses dans la comptabilité." action={<button className="primary-button"><span>⇩</span> Exporter en Excel</button>} />}
    <div className="kim-report-toolbar">
      {!embedded && <PeriodSelector period={period} onChange={onPeriodChange} />}
       <label><span>Titulaire de carte</span><select aria-label="Filtrer par titulaire de carte" value={selectedPerson} onChange={(event) => setSelectedPerson(event.target.value)}><option value="TOUS">Tous les titulaires</option>{people.map((person) => <option value={person} key={person}>{person}</option>)}</select></label>
       <label><span>Projet</span><select aria-label="Filtrer par projet" value={selectedProject} onChange={(event) => setSelectedProject(event.target.value)}><option value="TOUS">Tous les projets</option>{projects.map((project) => <option value={project.id} key={project.id}>{project.number} — {project.name}</option>)}</select></label>
       <div className="kim-report-context"><span className="status-dot" /><span>{period.label}</span><small>{visibleTransactions.length} transactions incluses</small></div>
    </div>
    <section className="panel kim-report-table">
      <div className="panel-header"><div><p className="eyebrow">Tableau de Kim</p><h2>Résumé par catégorie comptable</h2></div><span className="badge badge-neutral">Avant taxes</span></div>
       <div className="kim-report-head"><span>Compte</span><span>Catégorie</span><span>Hors taxes</span><span>TPS</span><span>TVQ</span><span>Total</span></div>
       <div className="kim-report-rows">{accounts.filter((account) => account.type === "EXPENSE").map((account) => { const totals = visibleTotals.get(account.number) ?? { subtotal: 0, tps: 0, tvq: 0, total: 0 }; return <div key={account.id}><span><b>{account.number}</b></span><span>{account.label}</span><strong>{formatCurrency(totals.subtotal)}</strong><strong>{formatCurrency(totals.tps)}</strong><strong>{formatCurrency(totals.tvq)}</strong><strong>{formatCurrency(totals.total)}</strong></div>; })}</div>
       <div className="account-report-total"><strong>TOTAL</strong><span>{formatCurrency(visibleSubtotal)}</span><span>{formatCurrency(visibleTps)}</span><span>{formatCurrency(visibleTvq)}</span><strong>{formatCurrency(visibleTotal)}</strong></div>
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
    <PageHeading eyebrow="Analyse" title="Rapports" description="Générez le tableau que Kim reporte dans le programme de comptabilité, sur le même cycle que les cartes." action={<button className="primary-button"><span>⇩</span> Exporter en Excel</button>} />
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
    <section className="panel report-table full-width"><div className="panel-header"><div><p className="eyebrow">Résumé par catégorie comptable</p><h2>Répartition avant taxes · compte utilisé par Kim</h2></div><button className="secondary-button">Enregistrer ce rapport</button></div><div className="account-report-head"><span>Compte</span><span>Catégorie</span><span>Total avant taxes</span></div><div className="category-report">{accountCategories.map((account) => <div key={account.code}><span><b>{account.code}</b></span><span>{account.label}</span><strong>{formatCurrency(visibleTotals.get(account.code) ?? 0)}</strong></div>)}</div><div className="account-report-total"><strong>TOTAL CATÉGORIES</strong><strong>{formatCurrency(visibleTotal)}</strong></div></section>
  </>;
}

function ArchivesPage({ onNotify, isProductionDataSource }: { onNotify: (message: string) => void; isProductionDataSource: boolean }) {
  if (isProductionDataSource) {
    return <><PageHeading eyebrow="Conservation" title="Archives" description="Les données structurées restent accessibles; les photos ne seront purgées qu’après un export vérifié." action={<button className="secondary-button" onClick={() => onNotify("L’export d’archives doit encore être configuré avec le manifeste Storage.")}>Préparer un export</button>} /><section className="panel data-source-card"><p className="eyebrow">Préparation requise</p><h2>Archivage de production à configurer</h2><p className="muted">Les statistiques d’archives ne sont pas encore calculées depuis Storage. Aucun chiffre fictif ni aucune suppression automatique ne sont affichés dans ce mode.</p><button className="primary-button" onClick={() => onNotify("Le manifeste d’archive sera ajouté dans une prochaine étape.")}>Voir la prochaine étape</button></section></>;
  }
  return <><PageHeading eyebrow="Conservation" title="Archives" description="Les données structurées restent accessibles; seules les photos admissibles peuvent être purgées." action={<button className="secondary-button" onClick={() => onNotify("La préparation d’archive sera disponible après la connexion Firebase.")}>Préparer un export</button>} /><div className="archive-banner"><span className="archive-icon large">◷</span><div><p className="eyebrow">Archivage recommandé</p><h2>842 photos de factures validées peuvent être archivées.</h2><p>Période: 1er juin au 31 août 2026 · aucune suppression automatique activée</p></div><button className="primary-button" onClick={() => onNotify("Rappel reporté de 30 jours.")}>Reporter</button></div><section className="archive-grid"><div className="panel archive-card"><div className="archive-card-icon">✓</div><p className="eyebrow">Photos admissibles</p><strong>842</strong><span>après contrôles d’intégrité</span><div className="progress"><span style={{ width: "72%" }} /></div><small>72% de la période est prête</small></div><div className="panel archive-card"><div className="archive-card-icon blue">▣</div><p className="eyebrow">Dernier export vérifié</p><strong>31 mai 2026</strong><span>Factures_2026-03_2026-05</span><button className="text-button">Ouvrir le manifeste →</button></div><div className="panel archive-card"><div className="archive-card-icon gold">⌁</div><p className="eyebrow">Politique</p><strong>Mode manuel</strong><span>La purge automatique est désactivée.</span><button className="text-button">Modifier dans Configuration →</button></div></section></>;
}

type DirectoryDataPatch = { users?: UserProfile[]; cards?: CreditCard[]; accounts?: AccountCategory[]; projects?: ProjectReference[]; periods?: CardPeriod[] };

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
  const [userForm, setUserForm] = useState({ displayName: "", email: "", jobTitle: "Contremaître", role: "WORKER", password: "" });
  const [cardForm, setCardForm] = useState({ lastFour: "", holderId: "", cardFunction: "" });
  const [busyKey, setBusyKey] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [directoryQuery, setDirectoryQuery] = useState("");
  const [accountForm, setAccountForm] = useState({ id: "", number: "", label: "", type: "EXPENSE" });
  const [projectForm, setProjectForm] = useState({ id: "", number: "", name: "" });
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
      const account = await createFirebaseUser(userForm, token);
      const profile: UserProfile = {
        id: account.uid,
        firebaseUid: account.uid,
        displayName: userForm.displayName.trim(),
        email: userForm.email.trim().toLowerCase(),
        jobTitle: userForm.jobTitle.trim() || undefined,
        role: userForm.role,
        status: "ACTIVE",
      };
      try {
        await saveUserProfile({
          id: profile.id,
          firebaseUid: profile.firebaseUid,
          displayName: profile.displayName,
          email: profile.email ?? null,
          jobTitle: profile.jobTitle ?? null,
          role: profile.role,
          status: profile.status,
        });
      } catch (profileError) {
        throw new Error(`Compte Firebase créé, mais le profil SQL n'a pas été enregistré : ${profileError instanceof Error ? profileError.message : "erreur inconnue"}. UID : ${account.uid}`);
      }
      const nextUsers = [...users, profile];
      setUsers(nextUsers);
      onDataChange({ users: nextUsers });
      setUserForm({ displayName: "", email: "", jobTitle: "Contremaître", role: "WORKER", password: "" });
      setNotice(`Compte créé pour ${profile.displayName}. Il peut maintenant se connecter avec son courriel et son mot de passe temporaire.`);
    } catch (reason) {
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
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ uid: user.firebaseUid, disabled: nextStatus === "INACTIVE" }),
      });
      const responseBody = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(responseBody.error ?? "Le statut Firebase n'a pas pu être modifié.");
      await saveUserProfile({ id: user.id, firebaseUid: user.firebaseUid, displayName: user.displayName, email: user.email ?? null, jobTitle: user.jobTitle ?? null, role: user.role, status: nextStatus });
      const nextUsers = users.map((candidate) => candidate.id === user.id ? { ...candidate, status: nextStatus } : candidate);
      setUsers(nextUsers);
      onDataChange({ users: nextUsers });
      setNotice(`${user.displayName} est maintenant ${nextStatus === "ACTIVE" ? "actif" : "désactivé"}.`);
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
    setBusyKey("add-card");
    try {
      const id = `CARD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
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
    const id = accountForm.id || `ACCOUNT-${crypto.randomUUID().toUpperCase()}`;
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
    const id = projectForm.id || `PROJECT-${crypto.randomUUID().toUpperCase()}`;
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
          <div className="field-grid"><label className="field"><span>Nom complet</span><input required value={userForm.displayName} onChange={(event) => setUserForm((current) => ({ ...current, displayName: event.target.value }))} placeholder="Personne Démo" /></label><label className="field"><span>Courriel</span><input required type="email" value={userForm.email} onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))} placeholder="personne@example.test" /></label></div>
          <div className="field-grid"><label className="field"><span>Fonction</span><input value={userForm.jobTitle} onChange={(event) => setUserForm((current) => ({ ...current, jobTitle: event.target.value }))} placeholder="Contremaître" /></label><label className="field"><span>Rôle applicatif</span><select value={userForm.role} onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))}><option value="WORKER">WORKER · dépôt seulement</option><option value="KIM">KIM · contrôle comptable</option><option value="ADMIN">ADMIN · administration</option></select></label></div>
          <div className="field-grid"><label className="field"><span>Mot de passe temporaire</span><input required minLength={12} type="password" value={userForm.password} onChange={(event) => setUserForm((current) => ({ ...current, password: event.target.value }))} placeholder="12 caractères minimum" /></label><div className="directory-help">Le mot de passe est envoyé une seule fois à Firebase Admin et n&apos;est jamais enregistré dans SQL Connect.</div></div>
          <button className="primary-button" type="submit" disabled={!persistenceReady || busyKey === "create-user"}>{busyKey === "create-user" ? "Création…" : "Créer le compte et le profil"}</button>
        </form> : <div className="config-note"><span>i</span><p>Kim peut consulter les profils et gérer les cartes. La création et la désactivation des comptes sont réservées à ADMIN.</p></div>}
        <div className="directory-list">{visibleUsers.map((user) => <div className="directory-row" key={user.id}><div><strong>{user.displayName}</strong><small>{user.email ?? "Courriel non renseigné"} · {user.jobTitle ?? "Fonction non renseignée"}</small></div><span className="badge badge-neutral">{user.role}</span><span className={`badge ${user.status === "ACTIVE" ? "badge-success" : "badge-danger"}`}>{user.status === "ACTIVE" ? "Actif" : "Désactivé"}</span>{canCreateUsers && <button className="secondary-button" type="button" disabled={!persistenceReady || busyKey === `user-${user.id}`} onClick={() => void toggleUser(user)}>{busyKey === `user-${user.id}` ? "…" : user.status === "ACTIVE" ? "Désactiver" : "Réactiver"}</button>}</div>)}</div>
      </>}
      {selectedSection === "cards" && <>
        <form className="directory-form" onSubmit={addCard}><div className="field-grid"><label className="field"><span>Quatre derniers chiffres</span><input required inputMode="numeric" maxLength={4} value={cardForm.lastFour} onChange={(event) => setCardForm((current) => ({ ...current, lastFour: event.target.value.replace(/\D/g, "") }))} placeholder="9001" /></label><label className="field"><span>Titulaire</span><select required value={cardForm.holderId} onChange={(event) => setCardForm((current) => ({ ...current, holderId: event.target.value }))}><option value="">Sélectionner le profil</option>{users.filter((user) => user.status === "ACTIVE").map((user) => <option key={user.id} value={user.id}>{user.displayName} · {user.jobTitle ?? user.role}</option>)}</select></label></div><div className="field-grid"><label className="field"><span>Fonction de la carte</span><input value={cardForm.cardFunction} onChange={(event) => setCardForm((current) => ({ ...current, cardFunction: event.target.value }))} placeholder="Fonction démo" /></label><div className="directory-help">Seuls les quatre derniers chiffres sont conservés. Le numéro complet de la carte ne passe jamais dans l&apos;application.</div></div><button className="primary-button" type="submit" disabled={!persistenceReady || busyKey === "add-card"}>{busyKey === "add-card" ? "Enregistrement…" : "Ajouter et associer la carte"}</button></form>
        <div className="directory-list">{visibleCards.map((card) => <div className="directory-row card-directory-row" key={card.id}><div><strong>•••• {card.lastFour}</strong><small>{card.function} · {card.status} · {card.startDate || "date inconnue"}</small></div><select value={cardHolderDrafts[card.id] ?? card.holderId ?? ""} onChange={(event) => setCardHolderDrafts((current) => ({ ...current, [card.id]: event.target.value }))} aria-label={`Titulaire de la carte ${card.lastFour}`}><option value="">Titulaire à choisir</option>{users.map((user) => <option key={user.id} value={user.id}>{user.displayName}</option>)}</select><button className="secondary-button" type="button" disabled={!persistenceReady || busyKey === `card-${card.id}`} onClick={() => void saveCardAssignment(card)}>{busyKey === `card-${card.id}` ? "…" : "Enregistrer"}</button><button className="text-button" type="button" disabled={!persistenceReady || busyKey === `toggle-card-${card.id}`} onClick={() => void toggleCard(card)}>{card.status === "Actif" ? "Désactiver" : "Réactiver"}</button></div>)}</div>
      </>}
       {selectedSection === "accounts" && <>
         {canEditReferences ? <form className="directory-form" onSubmit={saveAccountReference}><div className="field-grid"><label className="field"><span>Numéro de compte</span><input required inputMode="numeric" value={accountForm.number} onChange={(event) => setAccountForm((current) => ({ ...current, number: event.target.value }))} placeholder="33544" /></label><label className="field"><span>Libellé / catégorie</span><input required value={accountForm.label} onChange={(event) => setAccountForm((current) => ({ ...current, label: event.target.value }))} placeholder="Matériaux divers" /></label></div><div className="field-grid"><label className="field"><span>Type</span><select value={accountForm.type} onChange={(event) => setAccountForm((current) => ({ ...current, type: event.target.value }))}><option value="EXPENSE">Dépense</option><option value="TAX">Taxe</option></select></label><div className="directory-help">Le numéro est stocké comme texte afin de préserver les zéros initiaux. L’identifiant interne ne change pas lors d’une correction.</div></div><button className="primary-button" type="submit" disabled={!persistenceReady || busyKey.startsWith("account-")}>{busyKey.startsWith("account-") ? "Enregistrement…" : accountForm.id ? "Enregistrer la modification" : "Ajouter le compte"}</button></form> : <div className="config-note"><span>i</span><p>Kim peut consulter et sélectionner les comptes. La gestion du référentiel est réservée à ADMIN.</p></div>}
         <div className="directory-list">{visibleAccounts.map((account) => <div className="directory-row" key={account.id}><div><strong>{account.number} — {account.label}</strong><small>{account.type === "TAX" ? "Taxe" : "Dépense"}</small></div><span className={`badge ${account.status === "INACTIVE" ? "badge-danger" : "badge-success"}`}>{account.status === "INACTIVE" ? "Inactif" : "Actif"}</span>{canEditReferences && <><button className="text-button" type="button" onClick={() => setAccountForm({ id: account.id, number: account.number, label: account.label, type: account.type })}>Modifier</button><button className="text-button" type="button" disabled={!persistenceReady || busyKey === `account-toggle-${account.id}`} onClick={() => void toggleAccount(account)}>{account.status === "INACTIVE" ? "Réactiver" : "Désactiver"}</button><button className="text-button danger-text" type="button" disabled={!persistenceReady || busyKey === `account-delete-${account.id}`} onClick={() => void deleteAccount(account)}>Supprimer</button></>}</div>)}</div>
       </>}
       {selectedSection === "projects" && <>
         {canEditReferences ? <form className="directory-form" onSubmit={saveProjectReference}><div className="field-grid"><label className="field"><span>Numéro de projet</span><input required value={projectForm.number} onChange={(event) => setProjectForm((current) => ({ ...current, number: event.target.value }))} placeholder="26015" /></label><label className="field"><span>Nom du projet</span><input required value={projectForm.name} onChange={(event) => setProjectForm((current) => ({ ...current, name: event.target.value }))} placeholder="Réfection usine Bécancour" /></label></div><button className="primary-button" type="submit" disabled={!persistenceReady || busyKey.startsWith("project-")}>{busyKey.startsWith("project-") ? "Enregistrement…" : projectForm.id ? "Enregistrer la modification" : "Ajouter le projet"}</button></form> : <div className="config-note"><span>i</span><p>Kim peut consulter et sélectionner les projets. La gestion du référentiel est réservée à ADMIN.</p></div>}
         <div className="directory-list">{visibleProjects.map((project) => <div className="directory-row" key={project.id}><div><strong>{project.number} — {project.name}</strong><small>ID interne conservé: {project.id}</small></div><span className={`badge ${project.status === "INACTIVE" ? "badge-danger" : "badge-success"}`}>{project.status === "INACTIVE" ? "Inactif" : "Actif"}</span>{canEditReferences && <><button className="text-button" type="button" onClick={() => setProjectForm({ id: project.id, number: project.number, name: project.name })}>Modifier</button><button className="text-button" type="button" disabled={!persistenceReady || busyKey === `project-toggle-${project.id}`} onClick={() => void toggleProject(project)}>{project.status === "INACTIVE" ? "Réactiver" : "Désactiver"}</button><button className="text-button danger-text" type="button" disabled={!persistenceReady || busyKey === `project-delete-${project.id}`} onClick={() => void deleteProjectReference(project)}>Supprimer</button></>}</div>)}</div>
      </>}
      {selectedSection === "periods" && <>
        <form className="directory-form" onSubmit={savePeriodReference}><div className="field-grid"><label className="field"><span>Identifiant de période</span><input required value={periodForm.id} onChange={(event) => setPeriodForm((current) => ({ ...current, id: event.target.value }))} placeholder="2026-08" /></label><label className="field"><span>Libellé</span><input required value={periodForm.label} onChange={(event) => setPeriodForm((current) => ({ ...current, label: event.target.value }))} placeholder="Cycle du 10 août au 9 septembre" /></label></div><div className="field-grid"><label className="field"><span>Du</span><input required type="date" value={periodForm.startDate} onChange={(event) => setPeriodForm((current) => ({ ...current, startDate: event.target.value }))} /></label><label className="field"><span>Au</span><input required type="date" value={periodForm.endDate} onChange={(event) => setPeriodForm((current) => ({ ...current, endDate: event.target.value }))} /></label></div><label className="field"><span>Libellé du relevé (facultatif)</span><input value={periodForm.statementLabel} onChange={(event) => setPeriodForm((current) => ({ ...current, statementLabel: event.target.value }))} placeholder="Relevé Mastercard · cycle du 10 au 9" /></label><p className="directory-help">Le cycle par défaut est du 10 au 9. Kim peut toujours corriger une période directement sur une revue.</p><button className="primary-button" type="submit" disabled={!persistenceReady || busyKey.startsWith("period-")}>{busyKey.startsWith("period-") ? "Enregistrement…" : "Ajouter ou actualiser la période"}</button></form>
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
      {selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={project.id + "-" + index}><input value={project.name} onChange={(event) => setProjects((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} aria-label={"Projet " + (index + 1)} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; setProjects((current) => [...current, { id: "PROJECT-" + crypto.randomUUID().slice(0, 8), number: "PROJECT-" + crypto.randomUUID().slice(0, 8), name: newProject.trim(), status: "ACTIVE" }]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}
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
      {selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={project.id + "-" + index}><input value={project.name} onChange={(event) => setProjects((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} aria-label={"Projet " + (index + 1)} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; setProjects((current) => [...current, { id: "PROJECT-" + crypto.randomUUID().slice(0, 8), number: "PROJECT-" + crypto.randomUUID().slice(0, 8), name: newProject.trim(), status: "ACTIVE" }]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}
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
    { id: "accounts", title: "Comptes comptables", description: "Codes et catégories utilisés dans le rapport de Kim", meta: `${accounts.length} comptes` },
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

      return <><PageHeading eyebrow="Administration" title="Configuration" description="Les cartes, titulaires, comptes, projets et références SKU sont regroupés dans une source de vérité administrable." action={<button className="primary-button" onClick={() => setNotice("Les changements sont prêts à être persistés après l’approbation du schéma Firebase.")}>Enregistrer les changements</button>} /><section className="settings-list">{sections.map((section, index) => <button className={`settings-row ${selectedSection === section.id ? "selected" : ""}`} key={section.id} onClick={() => setSelectedSection(section.id)}><span className={`settings-number n${(index % 6) + 1}`}>0{index + 1}</span><span className="settings-copy"><strong>{section.title}</strong><span>{section.description}</span></span><span className="settings-meta">{section.meta}</span><span className="row-arrow">→</span></button>)}</section><section className="panel settings-editor"><div className="panel-header"><div><p className="eyebrow">Éditeur de référentiel</p><h2>{selectedTitle}</h2></div><span className="badge badge-neutral">Mode local</span></div>{selectedSection === "cards" && <div className="settings-editor-grid">{cards.map((card) => <label className="settings-input-card" key={card.id}><span>Carte ···· {card.lastFour} · {card.status}</span><input value={card.holder} onChange={(event) => updateCardHolder(card.id, event.target.value)} aria-label={`Titulaire de la carte ${card.lastFour}`} /><small>{card.function} · active depuis {formatDate(card.startDate)}</small></label>)}</div>}{selectedSection === "accounts" && <div className="settings-editor-list">{accounts.map((account) => <div className="settings-inline-row" key={account.code}><input value={account.code} onChange={(event) => updateAccount(account.code, "code", event.target.value)} aria-label="Code comptable" /><input value={account.label} onChange={(event) => updateAccount(account.code, "label", event.target.value)} aria-label="Catégorie comptable" /></div>)}</div>}{selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={`${project.id}-${index}`}><input value={project.name} onChange={(event) => updateProject(index, event.target.value)} aria-label={`Projet ${index + 1}`} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; setProjects((current) => [...current, { id: "PROJECT-" + crypto.randomUUID().slice(0, 8), number: "PROJECT-" + crypto.randomUUID().slice(0, 8), name: newProject.trim(), status: "ACTIVE" }]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}{selectedSection === "sku" && <div className="settings-editor-list">{skus.map((reference) => <div className="sku-reference-row" key={`${reference.merchant}-${reference.sku}`}><div><strong>{reference.merchant} · SKU {reference.sku}</strong><span>{reference.label} · {reference.accountCode} · {reference.category}</span></div><span className="badge badge-warning">{reference.status}</span><small>Recherche externe à lancer lorsque la fiche est nécessaire.</small></div>)}</div>}{!["cards", "accounts", "projects", "sku"].includes(selectedSection) && <div className="settings-placeholder"><strong>Référentiel prêt à connecter</strong><p>Cette section est préparée pour les règles Firebase et les permissions administrateur. Aucune mutation distante n’est envoyée dans cette étape.</p></div>}</section>{notice && <div className="config-note"><span>✓</span><p>{notice}</p></div>}<div className="config-note"><span>i</span><p><strong>Classification automatique.</strong> Les transactions sont classées par catégorie et code comptable; les SKU connus peuvent remplacer la catégorie locale. Les SKU inconnus restent « À confirmer » pour éviter une écriture comptable automatique non vérifiée.</p></div></>;
}
