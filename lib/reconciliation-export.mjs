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

function amountDollars(cents) {
  return Number(cents ?? 0) / 100;
}

/** @param {any} input */
export function buildReconciliationExcelXml({ statement, lineResults = [], outsideTransactions = [], transactions = [] }) {
  const byId = new Map(transactions.map((transaction) => [transaction.id, transaction]));
  const reconciliationRows = lineResults.map((result) => {
    const transaction = result.match ? byId.get(result.match.expenseTransactionId) : null;
    return [
      result.line.sequence,
      result.line.transactionDate,
      result.line.merchantRaw,
      amountDollars(result.line.amountCents),
      result.status,
      transaction?.invoiceNumber ?? "—",
      transaction?.projectName ?? transaction?.projectNumber ?? "—",
      transaction?.accountNumber ?? transaction?.accountLabel ?? "—",
      transaction?.person ?? "—",
      transaction?.card ?? "—",
      result.reason,
    ];
  });
  const missingRows = lineResults.filter((result) => result.status === "MISSING_INVOICE").map((result) => [result.line.sequence, result.line.transactionDate, result.line.merchantRaw, amountDollars(result.line.amountCents), result.reason]);
  const outsideRows = outsideTransactions.map(({ transaction, reason }) => [transaction.date ?? transaction.transactionDate, transaction.vendor, amountDollars(transaction.totalCents ?? Math.round(Number(transaction.total ?? 0) * 100)), transaction.projectName ?? transaction.projectNumber ?? "—", reason]);
  const matched = lineResults.filter((result) => result.status === "MATCHED").length;
  const review = lineResults.filter((result) => result.status === "REVIEW" || result.status === "DUPLICATE").length;
  const missing = missingRows.length;
  const totalCents = lineResults.reduce((sum, result) => sum + Number(result.line.amountCents ?? 0), 0);
  const summaryRows = [
    ["Relevé", statement.originalFilename ?? statement.id],
    ["Carte", statement.cardId],
    ["Période", `${statement.periodStart} → ${statement.periodEnd}`],
    ["Lignes", lineResults.length],
    ["Jumelées", matched],
    ["À vérifier", review],
    ["Factures manquantes", missing],
    ["Hors relevé", outsideTransactions.length],
    ["Total relevé", amountDollars(totalCents)],
  ];
  return `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles><Style ss:ID="Header"><Font ss:Bold="1"/><Interior ss:Color="#E7F3F0" ss:Pattern="Solid"/></Style><Style ss:ID="Currency"><NumberFormat ss:Format="&quot;$&quot;#,##0.00"/></Style></Styles>
${worksheet("RAPPROCHEMENT", ["# relevé", "Date", "Marchand relevé", "Montant relevé", "Statut", "No facture", "Projet", "Compte", "Titulaire", "Carte", "Motif"], reconciliationRows)}
${worksheet("SOMMAIRE", ["Indicateur", "Valeur"], summaryRows)}
${worksheet("FACTURES_MANQUANTES", ["# relevé", "Date", "Marchand", "Montant", "Motif"], missingRows)}
${worksheet("HORS_RELEVE", ["Date", "Fournisseur", "Montant", "Projet", "Motif"], outsideRows)}
</Workbook>`;
}

export function reconciliationExportFileName(statement) {
  return `Rapprochement-${statement.cardId}-${statement.periodStart}-${statement.periodEnd}.xls`.replace(/[^A-Za-z0-9._-]/g, "-");
}
