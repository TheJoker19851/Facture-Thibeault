function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cell(value, type = "String", style = "") {
  const styleAttribute = style ? ` ss:StyleID="${style}"` : "";
  return `<Cell${styleAttribute}><Data ss:Type="${type}">${escapeXml(value)}</Data></Cell>`;
}

function row(values, header = false) {
  return `<Row>${values.map((value) => cell(value, header ? "String" : typeof value === "number" ? "Number" : "String", header ? "Header" : "")).join("")}</Row>`;
}

function worksheet(name, headers, rows) {
  return `<Worksheet ss:Name="${escapeXml(name)}"><Table>${row(headers, true)}${rows.map((values) => row(values)).join("")}</Table></Worksheet>`;
}

function toCents(value, centsValue) {
  if (centsValue != null && Number.isFinite(Number(centsValue))) return Math.round(Number(centsValue));
  return Math.round(Number(value ?? 0) * 100);
}

function dollars(cents) {
  return Number(cents ?? 0) / 100;
}

function addTotals(map, key, transaction) {
  const current = map.get(key) ?? { subtotal: 0, tps: 0, tvq: 0, total: 0 };
  map.set(key, {
    subtotal: current.subtotal + toCents(transaction.subtotal, transaction.subtotalCents),
    tps: current.tps + toCents(transaction.tps, transaction.tpsCents),
    tvq: current.tvq + toCents(transaction.tvq, transaction.tvqCents),
    total: current.total + toCents(transaction.total, transaction.totalCents),
  });
}

/** @param {any} input */
export function buildAccountingReportExcelXml({ period, transactions = [], accounts = [] }) {
  const rows = transactions.map((transaction, index) => [
    index + 1,
    transaction.transactionDate ?? transaction.date ?? "",
    transaction.vendor ?? "",
    dollars(toCents(transaction.subtotal, transaction.subtotalCents)),
    dollars(toCents(transaction.tps, transaction.tpsCents)),
    dollars(toCents(transaction.tvq, transaction.tvqCents)),
    dollars(toCents(transaction.total, transaction.totalCents)),
    transaction.projectNumber ?? transaction.projectId ?? transaction.project ?? "—",
    transaction.accountNumber ?? transaction.accountCode ?? "—",
    transaction.person ?? "—",
    transaction.card ?? transaction.cardLastFour ?? "—",
    transaction.reconciliationStatus ?? "UNMATCHED",
    transaction.invoiceNumber ?? "—",
  ]);
  const accountTotals = new Map();
  const projectTotals = new Map();
  const personTotals = new Map();
  const cardTotals = new Map();
  for (const transaction of transactions) {
    addTotals(accountTotals, transaction.accountNumber ?? transaction.accountCode ?? "—", transaction);
    addTotals(projectTotals, transaction.projectNumber ?? transaction.projectId ?? transaction.project ?? "—", transaction);
    addTotals(personTotals, transaction.person ?? "—", transaction);
    addTotals(cardTotals, transaction.card ?? transaction.cardLastFour ?? "—", transaction);
  }
  const summaryRows = [
    ["Période", period?.label ?? `${period?.start ?? ""} → ${period?.end ?? ""}`],
    ["Du", period?.start ?? ""],
    ["Au", period?.end ?? ""],
    ["Transactions", transactions.length],
    ["Avant taxes", dollars(transactions.reduce((sum, transaction) => sum + toCents(transaction.subtotal, transaction.subtotalCents), 0))],
    ["TPS", dollars(transactions.reduce((sum, transaction) => sum + toCents(transaction.tps, transaction.tpsCents), 0))],
    ["TVQ", dollars(transactions.reduce((sum, transaction) => sum + toCents(transaction.tvq, transaction.tvqCents), 0))],
    ["Total", dollars(transactions.reduce((sum, transaction) => sum + toCents(transaction.total, transaction.totalCents), 0))],
  ];
  const groupRows = (totals) => Array.from(totals.entries()).map(([key, value]) => [key, dollars(value.subtotal), dollars(value.tps), dollars(value.tvq), dollars(value.tps + value.tvq), dollars(value.total)]);
  const accountRows = Array.from(new Map(accounts.map((account) => [account.number ?? account.code, account])).entries()).map(([key, account]) => {
    const totals = accountTotals.get(key) ?? { subtotal: 0, tps: 0, tvq: 0, total: 0 };
    return [key, account.label ?? "", dollars(totals.subtotal), dollars(totals.tps), dollars(totals.tvq), dollars(totals.total)];
  });
  for (const [key, totals] of accountTotals) {
    if (!accountRows.some((rowValues) => rowValues[0] === key)) accountRows.push([key, "Compte non référencé", dollars(totals.subtotal), dollars(totals.tps), dollars(totals.tvq), dollars(totals.total)]);
  }
  return `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles><Style ss:ID="Header"><Font ss:Bold="1"/><Interior ss:Color="#E7F3F0" ss:Pattern="Solid"/></Style></Styles>
${worksheet("TABLEAU_COMPTABLE", ["Ordre", "Date", "Fournisseur", "Avant taxes", "TPS", "TVQ", "Total", "Projet", "Compte", "Titulaire", "Carte", "Rapprochement", "No facture"], rows)}
${worksheet("SOMMAIRE", ["Indicateur", "Valeur"], summaryRows)}
${worksheet("PAR_COMPTE", ["Compte", "Avant taxes", "TPS", "TVQ", "Taxes cumulées", "Total"], accountRows.map((values) => [values[0], values[2], values[3], values[4], values[3] + values[4], values[5]]))}
${worksheet("PAR_PROJET", ["Projet", "Avant taxes", "TPS", "TVQ", "Taxes cumulées", "Total"], groupRows(projectTotals))}
${worksheet("PAR_PERSONNE", ["Titulaire", "Avant taxes", "TPS", "TVQ", "Taxes cumulées", "Total"], groupRows(personTotals))}
${worksheet("PAR_CARTE", ["Carte", "Avant taxes", "TPS", "TVQ", "Taxes cumulées", "Total"], groupRows(cardTotals))}
</Workbook>`;
}

export function accountingReportFileName(period) {
  return `Rapport-comptable-${period?.start ?? "debut"}-${period?.end ?? "fin"}.xls`.replace(/[^A-Za-z0-9._-]/g, "-");
}
