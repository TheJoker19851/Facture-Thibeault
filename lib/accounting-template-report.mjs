import { transactionAccountAllocations } from "./accounting-report.mjs";
import { manualAdjustmentsTotalCents, normalizeManualAdjustmentRows } from "./manual-adjustments.mjs";

export { MANUAL_ADJUSTMENT_ROW_COUNT } from "./manual-adjustments.mjs";

/**
 * Fixed column order from Kim's workbook. Spacer columns are intentional and
 * keep the exported report compatible with her existing accounting workflow.
 */
export const ACCOUNTING_TEMPLATE_COLUMNS = Object.freeze([
  { key: "33544", code: "33544", label: "Essence ", width: 14.140625 },
  { key: "33556", code: "33556", label: "Entretien Roulant", width: 16.28515625 },
  { key: "33557-reparation", code: "33557", label: "Réparation équipement", width: 11.7109375 },
  { key: "43400", code: "43400", label: "CCQ", width: 12.85546875 },
  { key: "33500", code: "33500", label: "Matériaux divers", width: 12.7109375 },
  { key: "42112", code: "42112", label: "Frais bureau", width: 12.7109375 },
  { key: "33552", code: "33552", label: "Frais de soumission", width: 10.7109375 },
  { key: "42104", code: "42104", label: "Penalité amende", width: 11.42578125 },
  { key: "33537", code: "33537", label: "Chauffage des travaux", width: 10.7109375 },
  { key: "33539", code: "33539", label: "Rebus", width: 13.140625 },
  { key: "33526", code: "33526", label: "Divers", width: 14.7109375 },
  { key: "34019", code: "34019", label: "Équip de sécurité", width: 11.7109375 },
  { key: "42102", code: "42102", label: "Taxes licence permis", width: 10.42578125 },
  { key: "34016", code: "34016", label: "voyage et pension", width: 10.85546875 },
  { key: "33557-entretien", code: "33557", label: "entretien équipement", width: 1.140625, hidden: true },
  { key: "11155", code: "11155", label: "Avance à l'administrateur", width: 13.140625 },
  { key: "45670", code: "45670", label: "Promotion", width: 11.42578125 },
  { key: "33558", code: "33558", label: "Immatriculation", width: 20.28515625 },
  { key: "33536", code: "33536", label: "Location équip", width: 18 },
  { key: "33555", code: "33555", label: "Ent camion lourd", width: 17.5703125 },
  { key: "33554", code: "33554", label: "Loc camion", width: 11.42578125 },
  { key: "34014", code: "34014", label: "Formation", width: 11.42578125 },
  { key: "33540", code: "33540", label: "Transport matériel", width: 11.42578125 },
  { key: "spacer-1", spacer: true, width: 11.42578125 },
  { key: "33518", code: "33518", label: "Maconnerie", width: 11.42578125 },
  { key: "15250", code: "15250", label: "Mise de fonds achat tracteur", width: 11.42578125 },
  { key: "spacer-2", spacer: true, width: 14.85546875 },
  { key: "11160", code: "11160", label: "Dépôt garantie", width: 11.42578125 },
  { key: "spacer-3", spacer: true, width: 11.42578125 },
]);

const TAX_COLUMNS = Object.freeze([
  { key: "tps", code: "21340", label: "TPS", header: "21340" },
  { key: "tvq", code: "21370", label: "TVQ", header: "21370" },
]);

function toCents(value, centsValue) {
  if (centsValue != null && Number.isFinite(Number(centsValue))) return Math.round(Number(centsValue));
  return Math.round(Number(value ?? 0) * 100);
}

function emptyTotals() {
  return { totalCents: 0, tpsCents: 0, tvqCents: 0, subtotalCents: 0 };
}

function addTotals(current, next) {
  return {
    totalCents: current.totalCents + next.totalCents,
    tpsCents: current.tpsCents + next.tpsCents,
    tvqCents: current.tvqCents + next.tvqCents,
    subtotalCents: current.subtotalCents + next.subtotalCents,
  };
}

function totalsForRows(rows) {
  const totals = rows.reduce((sum, row) => addTotals(sum, row), emptyTotals());
  const accountCents = {};
  for (const row of rows) {
    for (const [key, value] of Object.entries(row.accountCents ?? {})) {
      accountCents[key] = (accountCents[key] ?? 0) + Number(value ?? 0);
    }
  }
  return { ...totals, accountCents };
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function transactionDateValue(transaction) {
  const value = String(transaction?.date ?? transaction?.transactionDate ?? "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

function projectValue(transaction) {
  const value = transaction?.projectNumber ?? transaction?.project ?? "";
  if (!value || value === "—" || value === "-") return "";
  const text = String(value);
  const match = text.match(/^\s*(\d+)\s*(?:[·-]|$)/);
  return match?.[1] ?? text;
}

function hasAttachment(transaction) {
  return Number(transaction?.imageCount ?? 0) > 0 ||
    (Array.isArray(transaction?.photoPaths) && transaction.photoPaths.length > 0);
}

function accountColumnForAllocation(allocation) {
  const code = String(allocation?.accountNumber ?? allocation?.accountCode ?? "").trim();
  const label = normalize(allocation?.accountLabel ?? allocation?.category ?? "");
  if (code === "33557" && label.includes("entretien equipement")) return "33557-entretien";
  if (code === "33557") return "33557-reparation";
  return ACCOUNTING_TEMPLATE_COLUMNS.find((column) => !column.spacer && column.code === code)?.key ?? null;
}

function buildTransactionRow(transaction) {
  const allocations = transactionAccountAllocations(transaction);
  const accountCents = {};
  for (const allocation of allocations) {
    const key = accountColumnForAllocation(allocation);
    if (!key) continue;
    const allocationSubtotalCents = allocation.subtotalCents != null
      ? Number(allocation.subtotalCents)
      : toCents(allocation.subtotal, allocation.subtotalCents);
    accountCents[key] = (accountCents[key] ?? 0) + allocationSubtotalCents;
  }
  return {
    transactionId: transaction.id,
    date: transactionDateValue(transaction),
    description: String(transaction.vendor ?? ""),
    attachment: hasAttachment(transaction) ? "O" : "N",
    project: projectValue(transaction),
    totalCents: toCents(transaction.total, transaction.totalCents),
    tpsCents: toCents(transaction.tps, transaction.tpsCents),
    tvqCents: toCents(transaction.tvq, transaction.tvqCents),
    subtotalCents: toCents(transaction.subtotal, transaction.subtotalCents),
    accountCents,
  };
}

function compareRows(left, right) {
  const dateOrder = left.date.localeCompare(right.date);
  if (dateOrder !== 0) return dateOrder;
  return left.transactionId.localeCompare(right.transactionId);
}

function cardKey(card, index) {
  return `configured:${String(card?.id ?? card?.lastFour ?? card?.holder ?? index)}`;
}

function cardValue(value) {
  return String(value ?? "").replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function transactionCard(transaction, cards) {
  const transactionCardValue = cardValue(transaction?.card);
  if (transactionCardValue) {
    const matchingCard = cards.find((card) => {
      const lastFour = cardValue(card.lastFour);
      const id = cardValue(card.id);
      return (lastFour && (transactionCardValue === lastFour || transactionCardValue.endsWith(lastFour))) || (id && transactionCardValue === id);
    });
    if (matchingCard) return matchingCard;
  }
  const person = String(transaction?.person ?? "").trim();
  const personCards = cards.filter((card) => card.holder === person);
  return personCards.length === 1 ? personCards[0] : null;
}

function cardLabel(card, person, fallbackCard = "") {
  const lastFour = card?.lastFour ?? fallbackCard;
  return lastFour ? `**${lastFour} ${person}` : person;
}

/**
 * Builds the data model shared by the web preview and the Excel export.
 * @param {{period?: any, transactions?: any[], cards?: any[], selectedPerson?: string, manualAdjustmentRows?: any[]}} input
 */
export function buildAccountingTemplateReport({ period, transactions = [], cards = [], selectedPerson = "TOUS", manualAdjustmentRows = [] } = {}) {
  const selectedCards = cards.filter((card) => selectedPerson === "TOUS" || card.holder === selectedPerson);
  const periodTransactions = transactions
    .filter((transaction) => selectedPerson === "TOUS" || transaction.person === selectedPerson)
    .map((transaction) => {
      const matchedCard = transactionCard(transaction, selectedCards);
      const person = String(transaction.person ?? "Titulaire non identifié");
      return { transaction, row: buildTransactionRow(transaction), matchedCard, person };
    });

  const configuredSections = selectedCards.map((card, index) => ({
    key: cardKey(card, index),
    person: String(card.holder ?? "Titulaire non identifié"),
    card,
    fallbackCard: "",
  }));
  const unknownSections = [];
  for (const entry of periodTransactions) {
    if (entry.matchedCard) continue;
    const fallbackCard = String(entry.transaction.card ?? "").trim();
    const key = fallbackCard ? `unknown-card:${fallbackCard}` : `person:${entry.person}`;
    if (!unknownSections.some((section) => section.key === key)) unknownSections.push({ key, person: entry.person, card: null, fallbackCard });
  }
  const sections = [...configuredSections, ...unknownSections].map((spec) => {
    const entries = periodTransactions
      .filter(({ matchedCard, person, transaction }) => spec.card ? matchedCard === spec.card : (String(transaction.card ?? "").trim() === spec.fallbackCard && person === spec.person))
      .map(({ transaction, row }) => ({ ...row, card: String(transaction.card ?? "") }))
      .sort(compareRows);
    const totals = totalsForRows(entries);
    return {
      person: spec.person,
      card: cardLabel(spec.card, spec.person, spec.fallbackCard),
      cardLastFour: spec.card?.lastFour ?? spec.fallbackCard,
      cardKey: spec.key,
      rows: entries,
      totals,
    };
  });

  const totals = totalsForRows(sections.flatMap((section) => section.rows));
  const normalizedManualAdjustments = normalizeManualAdjustmentRows(manualAdjustmentRows);
  const manualAdjustmentsTotal = manualAdjustmentsTotalCents(normalizedManualAdjustments);
  return {
    period: {
      label: period?.label ?? "",
      start: period?.start ?? "",
      end: period?.end ?? "",
    },
    taxColumns: TAX_COLUMNS,
    accountColumns: ACCOUNTING_TEMPLATE_COLUMNS,
    sections,
    totals,
    cardTotals: sections.map((section) => ({ cardKey: section.cardKey, person: section.person, card: section.card, accountCents: section.totals.accountCents })),
    manualAdjustmentRows: normalizedManualAdjustments,
    manualAdjustmentsTotalCents: manualAdjustmentsTotal,
    payableBeforeAdjustmentsCents: totals.totalCents,
    payableAfterAdjustmentsCents: totals.totalCents + manualAdjustmentsTotal,
  };
}

export function templateRowAccountValues(row, columns = ACCOUNTING_TEMPLATE_COLUMNS) {
  return columns.map((column) => column.spacer ? null : Number(row.accountCents?.[column.key] ?? 0) || null);
}

export function templateTotalsAccountValues(rows, columns = ACCOUNTING_TEMPLATE_COLUMNS) {
  const totals = {};
  for (const row of rows) {
    for (const column of columns) {
      if (!column.spacer && row.accountCents?.[column.key] != null) {
        totals[column.key] = (totals[column.key] ?? 0) + Number(row.accountCents[column.key]);
      }
    }
  }
  return columns.map((column) => column.spacer ? null : Number(totals[column.key] ?? 0) || null);
}
