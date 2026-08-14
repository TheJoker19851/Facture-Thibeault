"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { firebaseConfigured } from "../../firebase/client";
import { uploadInvoicePhotos } from "../../firebase/uploads";

type Role = "WORKER" | "KIM" | "ADMIN" | "SUPER_ADMIN";
type View = "dashboard" | "transactions" | "review" | "reconciliation" | "reports" | "archives" | "settings" | "capture" | "transaction";

type Transaction = {
  id: string;
  date: string;
  vendor: string;
  submittedBy: string;
  person: string;
  card: string;
  project: string;
  category: string;
  total: number;
  status: "À vérifier" | "À valider" | "Validée";
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
  code: string;
  label: string;
};

type CreditCard = {
  id: string;
  lastFour: string;
  holder: string;
  function: string;
  startDate: string;
  endDate?: string;
  status: "Actif" | "Inactif";
};

type CardPeriod = {
  id: string;
  label: string;
  start: string;
  end: string;
  statementLabel: string;
};

type SkuReference = {
  merchant: string;
  sku: string;
  label: string;
  category: string;
  accountCode: string;
  status: "Validé" | "À confirmer";
};

const accountCategories: AccountCategory[] = [
  { code: "33544", label: "Essence" },
  { code: "33556", label: "Entretien roulant" },
  { code: "33557", label: "Réparation équipement" },
  { code: "43400", label: "CCQ" },
  { code: "33500", label: "Matériaux divers" },
  { code: "42112", label: "Frais bureau" },
  { code: "33552", label: "Frais de soumission" },
  { code: "42104", label: "Pénalité/amende" },
  { code: "33537", label: "Chauffage des travaux" },
  { code: "33539", label: "Rebus" },
  { code: "33526", label: "Divers" },
  { code: "34019", label: "Équipement de sécurité" },
  { code: "42102", label: "Taxes licence permis" },
  { code: "34016", label: "Voyage et pension" },
  { code: "11155", label: "Avance à l'administrateur" },
  { code: "45670", label: "Promotion" },
  { code: "33558", label: "Immatriculation" },
  { code: "33536", label: "Location équipement" },
  { code: "33555", label: "Entretien camion lourd" },
  { code: "33554", label: "Location camion" },
  { code: "34014", label: "Formation" },
  { code: "33540", label: "Transport matériel" },
  { code: "33518", label: "Maçonnerie" },
  { code: "15250", label: "Mise de fonds achat tracteur" },
  { code: "11160", label: "Dépôt garantie" },
];

const creditCards: CreditCard[] = [
  { id: "CARD-01", lastFour: "2481", holder: "Keven Tremblay", function: "Propriétaire", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-02", lastFour: "2286", holder: "Patrice Savard", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-03", lastFour: "7184", holder: "Stéphane Deschêsne", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-05", lastFour: "0383", holder: "Olivier Simard", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-06", lastFour: "9294", holder: "Martial Tremblay", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-07", lastFour: "9295", holder: "Keven Lavoie", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-08", lastFour: "9309", holder: "Simon Murray", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-09", lastFour: "2250", holder: "Michel Fortier", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-10", lastFour: "9291", holder: "Michel Simard", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-11", lastFour: "9298", holder: "Dave Émond", function: "Contremaître", startDate: "2026-01-01", status: "Actif" },
  { id: "CARD-04", lastFour: "2141", holder: "Réal Savard", function: "Contremaître", startDate: "2026-01-01", status: "Inactif" },
];

const cardPeriods: CardPeriod[] = [
  { id: "2026-06", label: "10 juin → 09 juillet 2026", start: "2026-06-10", end: "2026-07-09", statementLabel: "Relevé Mastercard · juin" },
  { id: "2026-07", label: "10 juillet → 09 août 2026", start: "2026-07-10", end: "2026-08-09", statementLabel: "Relevé Mastercard · juillet" },
  { id: "2026-05", label: "10 mai → 09 juin 2026", start: "2026-05-10", end: "2026-06-09", statementLabel: "Relevé Mastercard · mai" },
];

const accountCodeByCategory = new Map(accountCategories.map((account) => [account.label, account.code]));

const skuReferences: SkuReference[] = [
  { merchant: "Canadian Tire", sku: "07654856", label: "Article à confirmer", category: "Divers", accountCode: "33526", status: "À confirmer" },
];

const projectReferences = ["21 · Façade", "125 · Résidentiel", "133 · Chantier Nord", "135 · Chantier Est", "138 · Atelier", "ADMIN"];

function accountCodeFor(category: string) {
  return accountCodeByCategory.get(category) ?? "—";
}

function classifyTransaction(transaction: Pick<Transaction, "category" | "sku">) {
  const skuReference = transaction.sku ? skuReferences.find((reference) => reference.sku === transaction.sku) : undefined;
  return {
    code: skuReference?.accountCode ?? accountCodeFor(transaction.category),
    category: skuReference?.category ?? transaction.category,
  };
}

const transactions: Transaction[] = [
  {
    id: "TX-2026-0048",
    date: "2026-08-12",
    vendor: "CANAC",
    submittedBy: "Keven Tremblay",
    person: "Keven Tremblay",
    card: "2481",
    project: "125 · Résidentiel",
    category: "Matériaux divers",
    total: 184.37,
    status: "À vérifier",
    reconciliation: "Non rapprochée",
    issue: "Sous-total incomplet : une ligne de 64,37 $ est absente des photos reçues.",
    correction: "Ajouter la page manquante ou corriger les lignes avant de valider la facture.",
    imageCount: 3,
    invoiceNumber: "CAN-84219",
    note: "Facture multipage détectée. Vérifier les lignes manquantes avant validation.",
    correctionField: "subtotal",
  },
  {
    id: "TX-2026-0047",
    date: "2026-08-11",
    vendor: "Canadian Tire",
    submittedBy: "Patrice Savard",
    person: "Patrice Savard",
    card: "2286",
    project: "ADMIN",
    category: "Divers",
    total: 62.14,
    status: "À valider",
    reconciliation: "Rapprochée",
    issue: "Compte comptable à confirmer : le SKU 07654856 n'est pas encore validé.",
    correction: "Choisir le compte 33526 — Divers, ou confirmer une autre catégorie.",
    imageCount: 1,
    invoiceNumber: "CT-119402",
    note: "SKU reconnu dans la base locale; contrôle de catégorie en attente.",
    sku: "07654856",
    correctionField: "account",
  },
  {
    id: "TX-2026-0046",
    date: "2026-08-10",
    vendor: "Esso",
    submittedBy: "Stéphane Deschêsne",
    person: "Stéphane Deschêsne",
    card: "7184",
    project: "133 · Chantier Nord",
    category: "Essence",
    total: 91.52,
    status: "Validée",
    reconciliation: "Rapprochée",
    imageCount: 1,
    invoiceNumber: "ESS-66481",
    note: "Contrôles complets; preuve conservée.",
  },
  {
    id: "TX-2026-0045",
    date: "2026-08-09",
    vendor: "Location Équipement Plus",
    submittedBy: "Olivier Simard",
    person: "Olivier Simard",
    card: "0383",
    project: "138 · Atelier",
    category: "Location équipement",
    total: 438.0,
    status: "À valider",
    reconciliation: "Non rapprochée",
    issue: "Bon de livraison non joint à la facture.",
    correction: "Ajouter la page du bon de livraison ou confirmer la date et le chantier.",
    imageCount: 2,
    invoiceNumber: "LEP-2026-081",
    note: "Deux pages regroupées automatiquement; validation administrative requise.",
    correctionField: "attachment",
  },
  {
    id: "TX-2026-0044",
    date: "2026-08-08",
    vendor: "Béton Montréal",
    submittedBy: "Martial Tremblay",
    person: "Martial Tremblay",
    card: "9294",
    project: "21 · Façade",
    category: "Maçonnerie",
    total: 721.8,
    status: "Validée",
    reconciliation: "Rapprochée",
    imageCount: 1,
    invoiceNumber: "BM-99012",
    note: "Transaction historique validée.",
  },
];

const navItems: Array<{ id: View; label: string; icon: string }> = [
  { id: "dashboard", label: "Tableau de bord", icon: "⌂" },
  { id: "transactions", label: "Transactions", icon: "▤" },
  { id: "review", label: "À vérifier", icon: "!" },
  { id: "reconciliation", label: "Rapprochement", icon: "⇄" },
  { id: "reports", label: "Rapports", icon: "◔" },
  { id: "archives", label: "Archives", icon: "▣" },
  { id: "settings", label: "Configuration", icon: "⚙" },
];

const currency = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" });
const dateFormat = new Intl.DateTimeFormat("fr-CA", { day: "2-digit", month: "short", year: "numeric" });
function formatCurrency(value: number) {
  return currency.format(value).replace("CA", "$");
}

function formatDate(value: string) {
  return dateFormat.format(new Date(`${value}T12:00:00`));
}

function statusClass(status: Transaction["status"] | Transaction["reconciliation"]) {
  if (status === "Validée" || status === "Rapprochée") return "badge badge-success";
  if (status === "À vérifier" || status === "Facture manquante") return "badge badge-warning";
  return "badge badge-neutral";
}

export function ThibeaultApp({ initialRole = "ADMIN" }: { initialRole?: Role }) {
  const [role, setRole] = useState<Role>(initialRole);
  const [view, setView] = useState<View>("dashboard");
  const [selectedId, setSelectedId] = useState<string>(transactions[0].id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Toutes");
  const [selectedPeriod, setSelectedPeriod] = useState(cardPeriods[0]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [queueState, setQueueState] = useState<"idle" | "uploading" | "sent">("idle");
  const [isOnline, setIsOnline] = useState(true);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const selected = transactions.find((transaction) => transaction.id === selectedId) ?? transactions[0];
  const filteredTransactions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return transactions.filter((transaction) => {
      const matchesQuery = !normalizedQuery || [transaction.vendor, transaction.person, transaction.project, transaction.category, transaction.id].join(" ").toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === "Toutes" || transaction.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const next = await Promise.all(files.map((file) => new Promise<PhotoItem>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ id: `${file.name}-${file.lastModified}`, url: String(reader.result), name: file.name, file });
      reader.readAsDataURL(file);
    })));
    setPhotos((current) => [...current, ...next]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const sendPhotos = async () => {
    if (!photos.length) return;
    if (!isOnline) {
      notify("En attente d'envoi — les photos restent sur cet appareil.");
      return;
    }
    if (firebaseConfigured) {
      setQueueState("uploading");
      try {
        await uploadInvoicePhotos(photos.map((photo, index) => ({ file: photo.file, sequence: index + 1 })));
        setQueueState("sent");
        notify("Envoyé ✓");
        window.setTimeout(() => {
          setPhotos([]);
          setQueueState("idle");
        }, 1200);
      } catch (error) {
        setQueueState("idle");
        notify(error instanceof Error ? error.message : "L’envoi Firebase a échoué.");
      }
      return;
    }

    setQueueState("uploading");
    window.setTimeout(() => {
      setQueueState("sent");
      notify("Envoyé ✓");
      window.setTimeout(() => {
        setPhotos([]);
        setQueueState("idle");
      }, 1200);
    }, 1000);
  };

  const goTo = (nextView: View) => {
    setView(nextView);
    if (nextView === "capture") setRole("WORKER");
  };

  if (role === "WORKER") {
    return (
      <main className="worker-shell">
        <div className="worker-topbar">
          <div className="brand-mark compact"><span className="brand-glyph">MT</span><span>Thibeault</span></div>
          <button className="ghost-button worker-status" onClick={() => { setRole("ADMIN"); setView("dashboard"); }} aria-label="Changer de mode démo">Mode démo · Travailleur</button>
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
              <p>{photos.length ? `${photos.length} photo${photos.length > 1 ? "s" : ""} prête${photos.length > 1 ? "s" : ""}` : "Cadrez la facture dans la zone"}</p>
              <span className="camera-hint">Vous pourrez ajouter plusieurs pages avant l’envoi.</span>
            </div>
            <input ref={inputRef} className="sr-only" type="file" accept="image/*" capture="environment" multiple onChange={handleFiles} />
            <button className="capture-button" onClick={() => inputRef.current?.click()} aria-label="Prendre une photo"><span>⌾</span> Prendre une photo</button>
          </div>
          {photos.length > 0 && (
            <div className="photo-tray">
              <div className="tray-heading"><span>Photos prises</span><button className="text-button" onClick={() => setPhotos([])}>Tout supprimer</button></div>
              <div className="photo-grid">
                {photos.map((photo, index) => <div className="photo-thumb" key={photo.id}><img src={photo.url} alt={`Page ${index + 1}`} /><span>{index + 1}</span><button onClick={() => setPhotos((current) => current.filter((item) => item.id !== photo.id))} aria-label={`Supprimer la photo ${index + 1}`}>×</button></div>)}
              </div>
              <button className="send-button" onClick={sendPhotos} disabled={queueState === "uploading"}>{queueState === "uploading" ? "Envoi en cours…" : queueState === "sent" ? "Envoyé ✓" : isOnline ? "Envoyer les photos" : "Mettre en attente"}</button>
            </div>
          )}
          {!isOnline && <div className="offline-notice"><span className="notice-icon">↯</span><div><strong>En attente d’envoi</strong><p>Vos photos restent sur cet appareil et seront reprises dès que le réseau revient.</p></div></div>}
        </section>
        {toast && <div className="toast">{toast}</div>}
      </main>
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block"><div className="brand-mark"><span className="brand-glyph">MT</span><div><strong>Maçonnerie</strong><span>Thibeault</span></div></div><span className="prototype-pill">Prototype</span></div>
        <div className="workspace-switcher"><span className="avatar avatar-blue">K</span><div><strong>Kim / Administration</strong><span>Équipe dépenses</span></div><span className="chevron">⌄</span></div>
        <nav className="main-nav" aria-label="Navigation principale">
          {navItems.map((item) => <button key={item.id} className={`nav-item ${view === item.id ? "active" : ""}`} onClick={() => goTo(item.id)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.id === "review" && <span className="nav-count">3</span>}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="archive-mini"><span className="archive-icon">◷</span><div><strong>Archivage recommandé</strong><span>842 photos admissibles</span></div><span className="arrow">→</span></div><button className="worker-mode-button" onClick={() => goTo("capture")}><span>⌾</span> Ouvrir le mode travailleur</button><div className="user-footer"><span className="avatar avatar-gold">K</span><div><strong>Kim</strong><span>Administratrice</span></div><button className="icon-button" aria-label="Options du compte">•••</button></div></div>
      </aside>
      <section className="content-area">
        <header className="topbar"><div className="breadcrumbs"><span>Maçonnerie Thibeault</span><span>/</span><strong>{navItems.find((item) => item.id === view)?.label ?? "Tableau de bord"}</strong></div><div className="topbar-actions"><span className="demo-note">Données de démonstration</span><button className="icon-button" aria-label="Notifications">♧<span className="notification-dot" /></button><button className="avatar avatar-gold small" onClick={() => { setRole("WORKER"); setView("capture"); }} aria-label="Ouvrir le mode travailleur">K</button></div></header>
        <div className="page-content">
          {view === "dashboard" && <Dashboard onNavigate={goTo} onOpenTransaction={(id) => { setSelectedId(id); setView("transaction"); }} period={selectedPeriod} onPeriodChange={setSelectedPeriod} />}
          {view === "transactions" && <TransactionsPage items={filteredTransactions} query={query} setQuery={setQuery} statusFilter={statusFilter} setStatusFilter={setStatusFilter} onOpen={(id) => { setSelectedId(id); setView("transaction" as View); }} />}
          {view === "review" && <ReviewPage items={transactions.filter((item) => item.status !== "Validée")} onOpen={(id) => { setSelectedId(id); setView("transaction" as View); }} />}
          {view === "reconciliation" && <ReconciliationPage period={selectedPeriod} onPeriodChange={setSelectedPeriod} />}
          {view === "reports" && <ReportsPage period={selectedPeriod} onPeriodChange={setSelectedPeriod} />}
          {view === "archives" && <ArchivesPage onNotify={notify} />}
          {view === "settings" && <SaferSettingsPage />}
          {(view as string) === "transaction" && <TransactionDetail transaction={selected} onBack={() => setView("transactions")} onNotify={notify} />}
        </div>
      </section>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted heading-description">{description}</p></div>{action}</div>;
}

function PeriodSelector({ period, onChange }: { period: CardPeriod; onChange: (period: CardPeriod) => void }) {
  const selectedPreset = cardPeriods.some((option) => option.id === period.id) ? period.id : "custom";
  const updateDate = (field: "start" | "end", value: string) => {
    const nextStart = field === "start" ? value : period.start;
    const nextEnd = field === "end" ? value : period.end;
    onChange({ ...period, id: "custom", start: nextStart, end: nextEnd, label: formatDate(nextStart) + " → " + formatDate(nextEnd), statementLabel: "Relevé Mastercard · période personnalisée" });
  };
  return <div className="period-selector"><span>Période des cartes</span><select value={selectedPreset} onChange={(event) => { const option = cardPeriods.find((candidate) => candidate.id === event.target.value); if (option) onChange(option); }}><option value="custom">Période personnalisée</option>{cardPeriods.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select><div className="period-custom-dates"><label><span>Du</span><input type="date" value={period.start} max={period.end} onChange={(event) => updateDate("start", event.target.value)} /></label><span className="period-date-arrow">→</span><label><span>Au</span><input type="date" value={period.end} min={period.start} onChange={(event) => updateDate("end", event.target.value)} /></label></div><small>Toutes les cartes actives utilisent ce même cycle.</small></div>;
}

type DashboardTab = "holders" | "transactions" | "review" | "accounting";

function Dashboard({ onNavigate, onOpenTransaction, period, onPeriodChange }: { onNavigate: (view: View) => void; onOpenTransaction: (id: string) => void; period: CardPeriod; onPeriodChange: (period: CardPeriod) => void }) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("holders");
  const [focusedPerson, setFocusedPerson] = useState("TOUS");
  const holderRows = creditCards.filter((card) => card.status === "Actif").map((card) => {
    const items = transactions.filter((transaction) => transaction.person === card.holder);
    return { card, items, total: items.reduce((sum, item) => sum + item.total, 0) };
  });
  const choosePerson = (person: string) => {
    setFocusedPerson(person);
    setActiveTab("transactions");
  };

  return <>
    <PageHeading eyebrow="Vue d’ensemble" title="Bonjour Kim" description="Un espace de contrôle organisé par titulaire, facture et période comptable." action={<button className="primary-button" onClick={() => onNavigate("capture")}><span>＋</span> Ouvrir le mode travailleur</button>} />
    <div className="filter-strip"><PeriodSelector period={period} onChange={onPeriodChange} /><span className="filter-divider" /><span className="live-indicator"><span className="status-dot" /> Données prêtes pour le cycle sélectionné</span></div>
    <div className="dashboard-tabs" role="tablist" aria-label="Sections du tableau de bord">
      <button className={`dashboard-tab ${activeTab === "holders" ? "active" : ""}`} onClick={() => setActiveTab("holders")} role="tab" aria-selected={activeTab === "holders"}>1 · Titulaires</button>
      <button className={`dashboard-tab ${activeTab === "transactions" ? "active" : ""}`} onClick={() => setActiveTab("transactions")} role="tab" aria-selected={activeTab === "transactions"}>2 · Transactions par personne</button>
      <button className={`dashboard-tab ${activeTab === "review" ? "active" : ""}`} onClick={() => setActiveTab("review")} role="tab" aria-selected={activeTab === "review"}>3 · Factures à corriger</button>
      <button className={`dashboard-tab ${activeTab === "accounting" ? "active" : ""}`} onClick={() => setActiveTab("accounting")} role="tab" aria-selected={activeTab === "accounting"}>4 · Tableau comptable</button>
    </div>
    {activeTab === "holders" && <DashboardHoldersTab rows={holderRows} onChoose={choosePerson} />}
    {activeTab === "transactions" && <DashboardTransactionsTab rows={holderRows} focusedPerson={focusedPerson} onFocus={setFocusedPerson} onOpen={onOpenTransaction} />}
    {activeTab === "review" && <DashboardReviewTab onOpen={onOpenTransaction} />}
    {activeTab === "accounting" && <KimAccountingReport period={period} onPeriodChange={onPeriodChange} embedded />}
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

function DashboardTransactionsTab({ rows, focusedPerson, onFocus, onOpen }: { rows: HolderRow[]; focusedPerson: string; onFocus: (person: string) => void; onOpen: (id: string) => void }) {
  const visibleRows = focusedPerson === "TOUS" ? rows : rows.filter((row) => row.card.holder === focusedPerson);
  return <section className="dashboard-tab-panel">
    <div className="dashboard-tab-heading"><div><p className="eyebrow">2e onglet · groupes extensibles</p><h2>Transactions par utilisateur</h2><p className="muted">Ouvrez seulement le titulaire que vous devez contrôler; les autres restent repliés.</p></div><label className="dashboard-person-filter"><span>Titulaire</span><select value={focusedPerson} onChange={(event) => onFocus(event.target.value)}><option value="TOUS">Tous les titulaires</option>{rows.map((row) => <option value={row.card.holder} key={row.card.id}>{row.card.holder}</option>)}</select></label></div>
    <div className="user-transaction-list">{visibleRows.map((row) => <details className="user-transaction-card" key={row.card.id} open={focusedPerson !== "TOUS"}><summary><span className="avatar avatar-blue small">{row.card.holder.charAt(0)}</span><span className="user-transaction-heading"><strong>{row.card.holder}</strong><small>Carte ···· {row.card.lastFour} · {row.items.length} transaction{row.items.length === 1 ? "" : "s"}</small></span><strong>{formatCurrency(row.total)}</strong><span className="details-chevron">⌄</span></summary><div className="user-transaction-body"><TransactionTable items={row.items} compact onOpen={onOpen} /></div></details>)}</div>
  </section>;
}

function DashboardReviewTab({ onOpen }: { onOpen: (id: string) => void }) {
  const items = transactions.filter((transaction) => transaction.issue || transaction.status !== "Validée");
  return <section className="dashboard-tab-panel">
    <div className="dashboard-tab-heading"><div><p className="eyebrow">3e onglet · contrôle humain</p><h2>Factures avec corrections</h2><p className="muted">Sélectionnez une facture pour ouvrir sa preuve et voir le champ à corriger en évidence.</p></div><span className="badge badge-warning">{items.length} dossiers</span></div>
    <div className="dashboard-review-list">{items.map((item) => <button className="dashboard-review-card" key={item.id} onClick={() => onOpen(item.id)}><span className="dashboard-review-icon">!</span><span className="dashboard-review-copy"><strong>{item.vendor} · {formatCurrency(item.total)}</strong><span>{item.issue ?? "Validation administrative requise"}</span><small>{item.id} · {item.imageCount} photo{item.imageCount === 1 ? "" : "s"} · {item.correctionField === "account" ? "compte comptable" : item.correctionField === "subtotal" ? "sous-total" : "pièce justificative"}</small></span><span className="row-arrow">→</span></button>)}</div>
  </section>;
}

function TransactionsPage({ items, query, setQuery, statusFilter, setStatusFilter, onOpen }: { items: Transaction[]; query: string; setQuery: (value: string) => void; statusFilter: string; setStatusFilter: (value: string) => void; onOpen: (id: string) => void }) {
  return <><PageHeading eyebrow="Registre principal" title="Transactions" description="Toutes les dépenses, avec leur provenance et leur état de contrôle." action={<button className="primary-button"><span>⇩</span> Exporter</button>} /><div className="filter-panel"><div className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un fournisseur, une personne, un chantier…" /></div><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>Toutes</option><option>À vérifier</option><option>À valider</option><option>Validée</option></select><button className="filter-select">Période <b>⌄</b></button><button className="filter-select">Plus de filtres <b>＋</b></button></div><div className="quick-filters"><button className="quick-filter active" onClick={() => setStatusFilter("Toutes")}>Toutes <span>18</span></button><button className="quick-filter" onClick={() => setStatusFilter("À vérifier")}>À vérifier <span>3</span></button><button className="quick-filter" onClick={() => setStatusFilter("À valider")}>À valider <span>2</span></button><button className="quick-filter">Validées <span>13</span></button><button className="quick-filter">Non rapprochées <span>4</span></button></div><section className="panel transaction-panel"><div className="table-meta"><span><strong>{items.length}</strong> transactions affichées</span><span className="muted">Dernière synchronisation · il y a 2 min</span></div><TransactionTable items={items} onOpen={onOpen} /></section></>;
}

function TransactionTable({ items, compact = false, onOpen }: { items: Transaction[]; compact?: boolean; onOpen?: (id: string) => void }) {
  return <div className={`table-wrap ${compact ? "compact" : ""}`}><table><thead><tr><th>Transaction</th><th>Date</th><th>Fournisseur</th><th>Titulaire</th><th>Chantier</th><th>Montant</th><th>État</th><th /></tr></thead><tbody>{items.map((item) => { const classification = classifyTransaction(item); return <tr key={item.id} onClick={() => onOpen?.(item.id)}><td><div className="transaction-id"><span className="receipt-icon">▧</span><span><strong>{item.id}</strong><small>{item.invoiceNumber} · {item.imageCount} photo{item.imageCount > 1 ? "s" : ""}</small></span></div></td><td>{formatDate(item.date)}</td><td><strong>{item.vendor}</strong><small>{classification.code} · {classification.category}</small></td><td>{item.person}<small>Carte ···· {item.card}</small></td><td>{item.project}</td><td><strong>{formatCurrency(item.total)}</strong></td><td><span className={statusClass(item.status)}>{item.status}</span><small className="table-substatus">{item.reconciliation}</small></td><td><button className="row-menu" onClick={(event) => { event.stopPropagation(); onOpen?.(item.id); }} aria-label={`Ouvrir ${item.id}`}>→</button></td></tr>; })}</tbody></table>{items.length === 0 && <div className="empty-state"><span>⌕</span><strong>Aucune transaction trouvée</strong><p>Modifiez vos filtres pour élargir la recherche.</p></div>}</div>;
}

function ReviewPage({ items, onOpen }: { items: Transaction[]; onOpen: (id: string) => void }) {
  return <><PageHeading eyebrow="File de traitement" title="À vérifier" description="Les exceptions sont regroupées par raison pour accélérer la validation." action={<button className="secondary-button">Assigner la sélection</button>} /><div className="review-summary"><div><span className="summary-icon gold">!</span><strong>3</strong><span>exceptions actives</span></div><div><span className="summary-icon rose">◷</span><strong>1</strong><span>depuis plus de 24 h</span></div><div><span className="summary-icon blue">⌁</span><strong>2</strong><span>nécessitent une photo</span></div></div><div className="review-groups"><section className="panel"><div className="panel-header"><div><p className="eyebrow">Priorité haute</p><h2>Contrôles à résoudre</h2></div><span className="badge badge-warning">3 dossiers</span></div><div className="review-list">{items.map((item) => <button className="review-row" key={item.id} onClick={() => onOpen(item.id)}><span className="review-check" /><span className="review-icon">{item.issue?.includes("Sous-total") ? "≋" : item.category === "Divers" ? "⌁" : "!"}</span><span className="review-content"><strong>{item.issue ?? "Vérification administrative requise"}</strong><span>{item.correction ?? "Correction humaine requise avant validation."}</span><small>{item.vendor} · {formatCurrency(item.total)} · {item.id}</small></span><span className="review-date">{formatDate(item.date)}</span><span className="row-arrow">→</span></button>)}</div></section><aside className="panel review-guide"><p className="eyebrow">Règle métier</p><h2>Un seul champ en alerte à la fois.</h2><p>Les contrôles sont ciblés pour que Kim ne perde pas de temps dans une mer d’avertissements. Une correction humaine reste prioritaire sur toute nouvelle proposition IA.</p><div className="rule-list"><span>✓</span>Écart monétaire toléré: 0,01 $</div><div className="rule-list"><span>✓</span>Carte absente non bloquante si le dossier est connu</div><div className="rule-list"><span>✓</span>Doublon potentiel jamais supprimé automatiquement</div></aside></div></>;
}

function TransactionDetail({ transaction, onBack, onNotify }: { transaction: Transaction; onBack: () => void; onNotify: (message: string) => void }) {
  const [activePage, setActivePage] = useState(1);
  const [saved, setSaved] = useState(false);
  const [draftCategory, setDraftCategory] = useState(transaction.category);
  const [draftSubtotal, setDraftSubtotal] = useState("160.35");
  const [attachmentAdded, setAttachmentAdded] = useState(false);
  const classification = classifyTransaction({ category: draftCategory, sku: transaction.sku });
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
        <div className="form-section"><div className="section-heading"><span>02</span><div><p className="eyebrow">Facture</p><h2>Données principales</h2></div></div><div className="field-grid"><Field label="Fournisseur" value={transaction.vendor} /><Field label="No facture" value={transaction.invoiceNumber} /><Field label="Date de facture" value={formatDate(transaction.date)} /><Field label="Chantier" value={transaction.project} /><Field label="Catégorie" value={draftCategory} /><Field label="Compte comptable" value={`${classification.code} · ${classification.category}`} invalid={transaction.correctionField === "account"} wide /></div>{transaction.correctionField === "account" && <label className="correction-editor correction-editor-danger"><span>Corriger la classification proposée par le SKU {transaction.sku}</span><select value={draftCategory} onChange={(event) => setDraftCategory(event.target.value)}>{accountCategories.map((account) => <option value={account.label} key={account.code}>{account.code} · {account.label}</option>)}</select></label>}</div>
        {transaction.issue && <div className="detail-alert"><div className="detail-alert-icon">!</div><div><p className="eyebrow">Action requise avant validation</p><strong>{transaction.issue}</strong><span>{transaction.correction ?? "Correction humaine requise avant validation."}</span></div></div>}
        <div className="form-section"><div className="section-heading"><span>03</span><div><p className="eyebrow">Montants</p><h2>Contrôle comptable</h2></div><span className="control-ok">✓ Contrôles 4/4</span></div><div className="amount-card"><div className={transaction.correctionField === "subtotal" ? "amount-invalid" : ""}><span>Sous-total</span>{transaction.correctionField === "subtotal" ? <input className="amount-input" type="number" step="0.01" value={draftSubtotal} onChange={(event) => setDraftSubtotal(event.target.value)} /> : <strong>160,35 $</strong>}</div><div><span>TPS</span><strong>8,02 $</strong></div><div><span>TVQ</span><strong>16,00 $</strong></div><div className="amount-total"><span>Total</span><strong>{formatCurrency(transaction.total)}</strong></div></div></div>
        <div className="form-section"><div className="section-heading"><span>04</span><div><p className="eyebrow">Articles</p><h2>Lignes extraites</h2></div><button className="text-button">＋ Ajouter</button></div><div className="line-items"><div className="line-item"><span>01</span><div><strong>Matériaux / pièce</strong><small>Description originale conservée</small></div><strong>120,00 $</strong></div><div className="line-item warning-line"><span>02</span><div><strong>Article à confirmer</strong><small>Information absente de la page analysée</small></div><strong>—</strong></div></div><div className="field-note">{transaction.note}</div>{transaction.correctionField === "attachment" && <div className="correction-editor correction-editor-danger"><strong>Bon de livraison requis</strong><span>Cette correction doit être jointe à la facture avant la validation.</span><button className="secondary-button" onClick={() => setAttachmentAdded(true)}>{attachmentAdded ? "Pièce ajoutée ✓" : "Ajouter la pièce justificative"}</button></div>}</div>
        <div className="audit-footer">{saved ? "Dernière correction enregistrée à l’instant" : "Dernière analyse IA · il y a 8 min"}<button className="text-button">Voir l’audit →</button></div>
      </aside>
    </div>
  </>;
}

function Field({ label, value, hint, tone, wide = false, invalid = false }: { label: string; value: string; hint?: string; tone?: string; wide?: boolean; invalid?: boolean }) {
  return <label className={`field ${wide ? "wide" : ""} ${invalid ? "field-invalid" : ""}`}><span>{label}{invalid && <b> · correction requise</b>}</span><div className="field-value">{value}<span className="field-edit">✎</span></div>{hint && <small className={tone === "success" ? "hint-success" : ""}>{hint}</small>}</label>;
}

function ReconciliationPage({ period, onPeriodChange }: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void }) {
  return <><PageHeading eyebrow="Contrôle des relevés" title="Rapprochement" description="Chaque relevé est comparé aux factures reçues pour la même période et la même carte." action={<button className="primary-button"><span>↑</span> Importer un relevé</button>} /><div className="reconciliation-toolbar"><PeriodSelector period={period} onChange={onPeriodChange} /><div className="period-card"><span className="card-icon teal">▤</span><div><span>Cartes incluses</span><strong>{creditCards.filter((card) => card.status === "Actif").length} cartes actives · titulaires associés</strong></div><button className="icon-button">⌄</button></div></div><div className="card-roster">{creditCards.filter((card) => card.status === "Actif").map((card) => <span className="card-chip" key={card.id}><b>•••• {card.lastFour}</b><span>{card.holder}</span></span>)}</div><div className="reconciliation-stats"><StatTile label="Lignes du relevé" value="24" /><StatTile label="Rapprochées" value="20" tone="success" /><StatTile label="À vérifier" value="2" tone="warning" /><StatTile label="Factures manquantes" value="2" tone="danger" /></div><section className="panel reconciliation-panel"><div className="panel-header"><div><p className="eyebrow">{period.statementLabel} · {period.label}</p><h2>Correspondances et exceptions</h2></div><button className="secondary-button">Exporter les exceptions</button></div><div className="reconciliation-explainer"><span className="summary-icon rose">!</span><div><strong>La facture manquante est expliquée ici, pas seulement signalée.</strong><span>Kim voit immédiatement la carte, le titulaire, le montant et l’action à entreprendre.</span></div></div><div className="statement-list"><StatementRow date="12 juil. 2026" vendor="Canadian Tire" amount="184,37 $" card="2481" holder="Keven Tremblay" status="FACTURE MANQUANTE" tone="danger" reason="Aucune facture reçue pour la carte 2481 dans cette période." action="Demander la facture au titulaire Keven Tremblay; vérifier aussi le dépôt mobile." /><StatementRow date="10 juil. 2026" vendor="Esso" amount="91,52 $" card="7184" holder="Stéphane Deschêsne" status="RAPPROCHÉE · TX-2026-0046" tone="success" reason="Facture trouvée et montant concordant." action="Aucune action — conserver la preuve." /><StatementRow date="08 juil. 2026" vendor="Béton Montréal" amount="721,80 $" card="9294" holder="Martial Tremblay" status="RAPPROCHÉE · TX-2026-0044" tone="success" reason="Facture trouvée; compte 33518 · Maçonnerie identifié." action="Aucune action — prêt pour la comptabilité." /><StatementRow date="07 juil. 2026" vendor="Location Équipement Plus" amount="438,00 $" card="0383" holder="Olivier Simard" status="ÉCART DE DATE" tone="warning" reason="Facture reçue, mais la date ne correspond pas à la ligne du relevé." action="Confirmer la date de facture et le bon de livraison avant rapprochement." /></div></section></>;
}

function StatTile({ label, value, tone = "" }: { label: string; value: string; tone?: string }) { return <div className={`stat-tile ${tone}`}><span>{label}</span><strong>{value}</strong></div>; }
function StatementRow({ date, vendor, amount, card, holder, status, tone, reason, action }: { date: string; vendor: string; amount: string; card: string; holder: string; status: string; tone: string; reason: string; action: string }) { return <div className="statement-row"><span className="statement-date">{date}</span><span className="statement-vendor"><strong>{vendor}</strong><small>Carte •••• {card} · {holder}</small></span><strong className="statement-amount">{amount}</strong><span className={`statement-status ${tone}`}><span className="status-dot" />{status}</span><div className="statement-resolution"><strong>Pourquoi</strong><span>{reason}</span><strong>À faire</strong><span>{action}</span></div><button className="row-menu">→</button></div>; }

function ReportsPage(props: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void }) {
  return <KimAccountingReport {...props} />;
}

function KimAccountingReport({ period, onPeriodChange, embedded = false }: { period: CardPeriod; onPeriodChange: (period: CardPeriod) => void; embedded?: boolean }) {
  void DemoReportsPage;
  const [selectedPerson, setSelectedPerson] = useState("TOUS");
  const people = Array.from(new Set(creditCards.map((card) => card.holder)));
  const visibleTransactions = useMemo(() => transactions.filter((transaction) => {
    const matchesPerson = selectedPerson === "TOUS" || transaction.person === selectedPerson;
    const isIncludedStatus = transaction.status === "Validée" || transaction.status === "À valider";
    return matchesPerson && isIncludedStatus;
  }), [selectedPerson]);
  const visibleTotals = useMemo(() => {
    const totals = new Map<string, number>();
    visibleTransactions.forEach((transaction) => {
      const accountCode = classifyTransaction(transaction).code;
      totals.set(accountCode, (totals.get(accountCode) ?? 0) + transaction.total);
    });
    return totals;
  }, [visibleTransactions]);
  const visibleTotal = Array.from(visibleTotals.values()).reduce((sum, amount) => sum + amount, 0);
  return <>
    {!embedded && <PageHeading eyebrow="Analyse" title="Rapports" description="Le tableau compact utilisé par Kim pour reporter les dépenses dans la comptabilité." action={<button className="primary-button"><span>⇩</span> Exporter en Excel</button>} />}
    <div className="kim-report-toolbar">
      {!embedded && <PeriodSelector period={period} onChange={onPeriodChange} />}
      <label><span>Titulaire de carte</span><select aria-label="Filtrer par titulaire de carte" value={selectedPerson} onChange={(event) => setSelectedPerson(event.target.value)}><option value="TOUS">Tous les titulaires</option>{people.map((person) => <option value={person} key={person}>{person}</option>)}</select></label>
      <div className="kim-report-context"><span className="status-dot" /><span>{period.label}</span><small>{visibleTransactions.length} transactions incluses</small></div>
    </div>
    <section className="panel kim-report-table">
      <div className="panel-header"><div><p className="eyebrow">Tableau de Kim</p><h2>Résumé par catégorie comptable</h2></div><span className="badge badge-neutral">Avant taxes</span></div>
      <div className="kim-report-head"><span>Compte</span><span>Catégorie</span><span>Total avant taxes</span></div>
      <div className="kim-report-rows">{accountCategories.map((account) => <div key={account.code}><span><b>{account.code}</b></span><span>{account.label}</span><strong>{formatCurrency(visibleTotals.get(account.code) ?? 0)}</strong></div>)}</div>
      <div className="account-report-total"><strong>TOTAL CATÉGORIES</strong><strong>{formatCurrency(visibleTotal)}</strong></div>
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
    <div className="report-local-note"><strong>Prévisualisation locale.</strong><span>Les filtres titulaire, chantier et état calculent maintenant les montants à partir des transactions de démonstration. La source SQL Connect remplacera ces données sans modifier le tableau.</span></div>
    <div className="report-layout">
      <section className="panel report-total"><p className="eyebrow">Résumé de période</p><h2>{formatCurrency(visibleTotal)}</h2><p className="muted">{visibleTransactions.length} transaction{visibleTransactions.length === 1 ? "" : "s"} dans cette vue</p><div className="report-breakdown"><div><span>Avant taxes</span><strong>{formatCurrency(visibleTotal)}</strong></div><div><span>TPS</span><strong>—</strong></div><div><span>TVQ</span><strong>—</strong></div></div></section>
      <section className="panel report-table"><div className="panel-header"><div><p className="eyebrow">Résumé par titulaire et carte</p><h2>Qui dépense quoi</h2></div><button className="text-button">Détails →</button></div><div className="mini-table card-total-list">{visibleCards.map((card) => <div key={card.id}><span><b>•••• {card.lastFour}</b> {card.holder}</span><strong>{formatCurrency(visibleCardTotals.get(card.lastFour) ?? 0)}</strong></div>)}</div></section>
    </div>
    <section className="panel report-table full-width"><div className="panel-header"><div><p className="eyebrow">Résumé par catégorie comptable</p><h2>Répartition avant taxes · compte utilisé par Kim</h2></div><button className="secondary-button">Enregistrer ce rapport</button></div><div className="account-report-head"><span>Compte</span><span>Catégorie</span><span>Total avant taxes</span></div><div className="category-report">{accountCategories.map((account) => <div key={account.code}><span><b>{account.code}</b></span><span>{account.label}</span><strong>{formatCurrency(visibleTotals.get(account.code) ?? 0)}</strong></div>)}</div><div className="account-report-total"><strong>TOTAL CATÉGORIES</strong><strong>{formatCurrency(visibleTotal)}</strong></div></section>
  </>;
}

function ArchivesPage({ onNotify }: { onNotify: (message: string) => void }) {
  return <><PageHeading eyebrow="Conservation" title="Archives" description="Les données structurées restent accessibles; seules les photos admissibles peuvent être purgées." action={<button className="secondary-button" onClick={() => onNotify("La préparation d’archive sera disponible après la connexion Firebase.")}>Préparer un export</button>} /><div className="archive-banner"><span className="archive-icon large">◷</span><div><p className="eyebrow">Archivage recommandé</p><h2>842 photos de factures validées peuvent être archivées.</h2><p>Période: 1er juin au 31 août 2026 · aucune suppression automatique activée</p></div><button className="primary-button" onClick={() => onNotify("Rappel reporté de 30 jours.")}>Reporter</button></div><section className="archive-grid"><div className="panel archive-card"><div className="archive-card-icon">✓</div><p className="eyebrow">Photos admissibles</p><strong>842</strong><span>après contrôles d’intégrité</span><div className="progress"><span style={{ width: "72%" }} /></div><small>72% de la période est prête</small></div><div className="panel archive-card"><div className="archive-card-icon blue">▣</div><p className="eyebrow">Dernier export vérifié</p><strong>31 mai 2026</strong><span>Factures_2026-03_2026-05</span><button className="text-button">Ouvrir le manifeste →</button></div><div className="panel archive-card"><div className="archive-card-icon gold">⌁</div><p className="eyebrow">Politique</p><strong>Mode manuel</strong><span>La purge automatique est désactivée.</span><button className="text-button">Modifier dans Configuration →</button></div></section></>;
}

function SaferSettingsPage() {
  void CompactSettingsPage;
  const [selectedSection, setSelectedSection] = useState("cards");
  const [cards, setCards] = useState(creditCards);
  const [accounts, setAccounts] = useState(accountCategories);
  const [projects, setProjects] = useState(projectReferences);
  const [editingCards, setEditingCards] = useState(false);
  const [pendingDeleteCard, setPendingDeleteCard] = useState("");
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
      {selectedSection === "cards" && <div className="settings-editor-list settings-card-list">
        <div className="settings-card-toolbar"><span>{editingCards ? "Mode édition activé · les actions sensibles sont visibles." : "Lecture seule · activez Modifier pour changer ou retirer une carte."}</span><button className="secondary-button" type="button" onClick={() => { setEditingCards((current) => !current); setPendingDeleteCard(""); }}>{editingCards ? "Terminer" : "Modifier"}</button></div>
        {cards.map((card) => <div className="settings-card-row" key={card.id}><span><b>•••• {card.lastFour}</b><small>{card.status} · {card.function}</small></span><input disabled={!editingCards} value={card.holder} onChange={(event) => updateCardHolder(card.id, event.target.value)} aria-label="Titulaire de la carte" />{editingCards && <button className="settings-edit-button" type="button" onClick={() => setPendingDeleteCard(card.id)} aria-label="Préparer le retrait de cette carte">Retirer</button>}{editingCards && pendingDeleteCard === card.id && <div className="settings-delete-confirm"><span>Retirer la carte •••• {card.lastFour}?</span><button className="danger-button" type="button" onClick={() => { removeCard(card.id); setPendingDeleteCard(""); }}>Confirmer le retrait</button><button className="text-button" type="button" onClick={() => setPendingDeleteCard("")}>Annuler</button></div>}</div>)}
        {editingCards && <form className="settings-add-row settings-add-card" onSubmit={(event) => { event.preventDefault(); addCard(); }}><input inputMode="numeric" maxLength={4} value={newCardLastFour} onChange={(event) => setNewCardLastFour(event.target.value)} placeholder="4 derniers chiffres" aria-label="Quatre derniers chiffres de la carte" /><input value={newCardHolder} onChange={(event) => setNewCardHolder(event.target.value)} placeholder="Titulaire" aria-label="Nouveau titulaire" /><button className="secondary-button" type="submit">＋ Ajouter la carte</button></form>}
      </div>}
      {selectedSection === "accounts" && <div className="settings-editor-list">{accounts.map((account) => <div className="settings-inline-row" key={account.code}><input value={account.code} onChange={(event) => setAccounts((current) => current.map((item) => item.code === account.code ? { ...item, code: event.target.value } : item))} aria-label="Code comptable" /><input value={account.label} onChange={(event) => setAccounts((current) => current.map((item) => item.code === account.code ? { ...item, label: event.target.value } : item))} aria-label="Catégorie comptable" /></div>)}</div>}
      {selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={project + "-" + index}><input value={project} onChange={(event) => setProjects((current) => current.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} aria-label={"Projet " + (index + 1)} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; setProjects((current) => [...current, newProject.trim()]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}
      {selectedSection === "sku" && <div className="settings-editor-list">{skuReferences.map((reference) => <div className="sku-reference-row" key={reference.merchant + "-" + reference.sku}><div><strong>{reference.merchant} · SKU {reference.sku}</strong><span>{reference.label} · {reference.accountCode} · {reference.category}</span></div><span className="badge badge-warning">{reference.status}</span><small>Recherche externe à lancer lorsque la fiche est nécessaire.</small></div>)}</div>}
      {!["cards", "accounts", "projects", "sku"].includes(selectedSection) && <div className="settings-placeholder"><strong>Référentiel prêt à connecter</strong><p>Cette section est préparée pour les règles Firebase et les permissions administrateur.</p></div>}
    </section>
    <div className="config-note"><span>i</span><p><strong>Protection des actions sensibles.</strong> Le retrait d’une carte passe par le mode Modifier, puis par une confirmation explicite.</p></div>
  </>;
}

function CompactSettingsPage() {
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
      {selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={project + "-" + index}><input value={project} onChange={(event) => setProjects((current) => current.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} aria-label={"Projet " + (index + 1)} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; setProjects((current) => [...current, newProject.trim()]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}
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
  const updateProject = (index: number, value: string) => setProjects((current) => current.map((project, projectIndex) => projectIndex === index ? value : project));
  void removeCard;
  void addCard;

  return <><PageHeading eyebrow="Administration" title="Configuration" description="Les cartes, titulaires, comptes, projets et références SKU sont regroupés dans une source de vérité administrable." action={<button className="primary-button" onClick={() => setNotice("Les changements sont prêts à être persistés après l’approbation du schéma Firebase.")}>Enregistrer les changements</button>} /><section className="settings-list">{sections.map((section, index) => <button className={`settings-row ${selectedSection === section.id ? "selected" : ""}`} key={section.id} onClick={() => setSelectedSection(section.id)}><span className={`settings-number n${(index % 6) + 1}`}>0{index + 1}</span><span className="settings-copy"><strong>{section.title}</strong><span>{section.description}</span></span><span className="settings-meta">{section.meta}</span><span className="row-arrow">→</span></button>)}</section><section className="panel settings-editor"><div className="panel-header"><div><p className="eyebrow">Éditeur de référentiel</p><h2>{selectedTitle}</h2></div><span className="badge badge-neutral">Mode local</span></div>{selectedSection === "cards" && <div className="settings-editor-grid">{cards.map((card) => <label className="settings-input-card" key={card.id}><span>Carte ···· {card.lastFour} · {card.status}</span><input value={card.holder} onChange={(event) => updateCardHolder(card.id, event.target.value)} aria-label={`Titulaire de la carte ${card.lastFour}`} /><small>{card.function} · active depuis {formatDate(card.startDate)}</small></label>)}</div>}{selectedSection === "accounts" && <div className="settings-editor-list">{accounts.map((account) => <div className="settings-inline-row" key={account.code}><input value={account.code} onChange={(event) => updateAccount(account.code, "code", event.target.value)} aria-label="Code comptable" /><input value={account.label} onChange={(event) => updateAccount(account.code, "label", event.target.value)} aria-label="Catégorie comptable" /></div>)}</div>}{selectedSection === "projects" && <div className="settings-editor-list">{projects.map((project, index) => <div className="settings-inline-row" key={`${project}-${index}`}><input value={project} onChange={(event) => updateProject(index, event.target.value)} aria-label={`Projet ${index + 1}`} /></div>)}<form className="settings-add-row" onSubmit={(event) => { event.preventDefault(); if (!newProject.trim()) return; setProjects((current) => [...current, newProject.trim()]); setNewProject(""); }}><input value={newProject} onChange={(event) => setNewProject(event.target.value)} placeholder="Ajouter un projet" /><button className="secondary-button" type="submit">＋ Ajouter</button></form></div>}{selectedSection === "sku" && <div className="settings-editor-list">{skus.map((reference) => <div className="sku-reference-row" key={`${reference.merchant}-${reference.sku}`}><div><strong>{reference.merchant} · SKU {reference.sku}</strong><span>{reference.label} · {reference.accountCode} · {reference.category}</span></div><span className="badge badge-warning">{reference.status}</span><small>Recherche externe à lancer lorsque la fiche est nécessaire.</small></div>)}</div>}{!["cards", "accounts", "projects", "sku"].includes(selectedSection) && <div className="settings-placeholder"><strong>Référentiel prêt à connecter</strong><p>Cette section est préparée pour les règles Firebase et les permissions administrateur. Aucune mutation distante n’est envoyée dans cette étape.</p></div>}</section>{notice && <div className="config-note"><span>✓</span><p>{notice}</p></div>}<div className="config-note"><span>i</span><p><strong>Classification automatique.</strong> Les transactions sont classées par catégorie et code comptable; les SKU connus peuvent remplacer la catégorie locale. Les SKU inconnus restent « À confirmer » pour éviter une écriture comptable automatique non vérifiée.</p></div></>;
}
