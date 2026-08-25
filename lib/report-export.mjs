import { buildAccountingTemplateReport, MANUAL_ADJUSTMENT_ROW_COUNT, templateRowAccountValues, templateTotalsAccountValues } from "./accounting-template-report.mjs";

const TEMPLATE_DEFAULT_COLUMN_WIDTH = 11.42578125;
const TEMPLATE_FIXED_COLUMNS = Object.freeze([
  19.5703125, 26.7109375, 6.140625, 8.28515625, 14.7109375, 14, 13.28515625, 15,
]);
const ACCOUNTING_NUMBER_FORMAT = '_ * #,##0.00_)\\ &quot;$&quot;_ ;_ * \\(#,##0.00\\)\\ &quot;$&quot;_ ;_ * &quot;-&quot;??_)\\ &quot;$&quot;_ ;_ @_ ';
const DATE_LONG_FORMAT = '[$-F800]dddd\\,\\ mmmm\\ dd\\,\\ yyyy';
const DATE_SHORT_FORMAT = 'm/d/yy';
const EXCEL_EPOCH_UTC = Date.UTC(1899, 11, 30);

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function dollars(cents) {
  return Number(cents ?? 0) / 100;
}

function excelSerial(value) {
  const text = String(value ?? "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const date = Date.parse(`${text}T00:00:00Z`);
  return Number.isFinite(date) ? Math.round((date - EXCEL_EPOCH_UTC) / 86400000) : null;
}

function numericProject(value) {
  const text = String(value ?? "").trim();
  return /^\d+$/.test(text) ? Number(text) : (text || null);
}

function cell(value, { style = "", type, formula = "" } = {}) {
  const attributes = [];
  if (style) attributes.push(`ss:StyleID="${style}"`);
  if (formula) attributes.push(`ss:Formula="${escapeXml(formula)}"`);
  const attributesText = attributes.length ? ` ${attributes.join(" ")}` : "";
  if (value == null || value === "") return `<Cell${attributesText}/>`;
  const cellType = type ?? (typeof value === "number" ? "Number" : "String");
  return `<Cell${attributesText}><Data ss:Type="${cellType}">${escapeXml(value)}</Data></Cell>`;
}

function row(values, { styles = {}, formulas = {}, types = {} } = {}) {
  return `<Row>${values.map((value, index) => cell(value, { style: styles[index] ?? "", formula: formulas[index] ?? "", type: types[index] })).join("")}</Row>`;
}

function blankRow() {
  return "<Row ss:AutoFitHeight=\"0\"><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></Row>";
}

function accountCells(values) {
  return values.map((value) => value == null ? null : dollars(value));
}

function accountTotalCells(values, columns) {
  return values.map((value, index) => columns[index]?.spacer ? null : dollars(value ?? 0));
}

function templateRows(report) {
  const rows = [];
  const accountHeaders = report.accountColumns.map((column) => column.spacer ? null : numericProject(column.code));
  const accountLabels = report.accountColumns.map((column) => column.spacer ? null : column.label);
  rows.push({ values: ["Date du relevé:", excelSerial(report.period.start), ...Array(35).fill(null)], styles: { 0: "MetaLabel", 1: "MetaDate" }, types: { 1: "Number" } });
  rows.push({ values: [null, ",", ...Array(35).fill(null)] });
  rows.push({
    values: ["Date", "Description", "PJ", "# Projet", "Total", Number(report.taxColumns?.[0]?.code ?? 21340), Number(report.taxColumns?.[1]?.code ?? 21370), "Avant taxes", ...accountHeaders],
    styles: { 0: "Header", 1: "Header", 2: "Header", 3: "Header", 4: "Header", 5: "Header", 6: "Header", 7: "Header", ...Object.fromEntries(accountHeaders.map((_, index) => [index + 8, "HeaderAccount"])) },
    types: { 5: "Number", 6: "Number", ...Object.fromEntries(accountHeaders.map((value, index) => value == null ? [] : [index + 8, "Number"])) },
  });
  rows.push({ values: [null, null, null, null, null, "TPS", "TVQ", null, ...accountLabels], styles: { 5: "Header", 6: "Header", ...Object.fromEntries(accountLabels.map((value, index) => value == null ? [] : [index + 8, "HeaderAccountLabel"])) } });

  for (const section of report.sections) {
    rows.push({ values: [section.person, section.card, ...Array(35).fill(null)], styles: { 0: "Holder", 1: "Holder" } });
    rows.push(blankRow());
    rows.push(blankRow());
    for (const transaction of section.rows) {
      const accountValues = templateRowAccountValues(transaction, report.accountColumns);
      rows.push({
        values: [excelSerial(transaction.date), transaction.description, transaction.attachment, numericProject(transaction.project), dollars(transaction.totalCents), dollars(transaction.tpsCents), dollars(transaction.tvqCents), dollars(transaction.subtotalCents), ...accountCells(accountValues)],
        styles: { 0: "DateShort", 2: "BodyBlue", 3: "BodyBlue", 4: "Money", 5: "Money", 6: "Money", 7: "Money", ...Object.fromEntries(report.accountColumns.map((column, index) => column.spacer ? [] : [index + 8, "Money"])) },
        types: { 0: "Number", 3: transaction.project && /^\d+$/.test(String(transaction.project).trim()) ? "Number" : undefined },
      });
    }
    rows.push(blankRow());
    rows.push(blankRow());
    rows.push({
      values: [null, null, null, null, dollars(section.totals.totalCents), dollars(section.totals.tpsCents), dollars(section.totals.tvqCents), dollars(section.totals.subtotalCents), ...accountTotalCells(templateTotalsAccountValues(section.rows, report.accountColumns), report.accountColumns)],
      styles: { 4: "TotalMoney", 5: "TotalMoney", 6: "TotalMoney", 7: "TotalMoney", ...Object.fromEntries(report.accountColumns.map((column, index) => column.spacer ? [] : [index + 8, "TotalMoney"])) },
    });
    rows.push(blankRow());
    rows.push(blankRow());
  }

  rows.push({
    values: [null, "GRAND TOTAL", null, null, dollars(report.totals.totalCents), dollars(report.totals.tpsCents), dollars(report.totals.tvqCents), dollars(report.totals.subtotalCents), ...accountTotalCells(templateTotalsAccountValues(report.sections.flatMap((section) => section.rows), report.accountColumns), report.accountColumns)],
    styles: { 1: "TotalLabel", 4: "TotalMoney", 5: "TotalMoney", 6: "TotalMoney", 7: "TotalMoney", ...Object.fromEntries(report.accountColumns.map((column, index) => column.spacer ? [] : [index + 8, "TotalMoney"])) },
  });
  rows.push(blankRow());
  rows.push(blankRow());
  rows.push(blankRow());
  const amountToPayRow = rows.length + 1;
  rows.push({ values: [null, "Montant à payer", null, null, dollars(report.totals.totalCents), ...Array(32).fill(null)], styles: { 1: "PayableLabel", 4: "PayableMoney" } });
  rows.push(blankRow());
  const adjustmentRows = [];
  for (let index = 0; index < MANUAL_ADJUSTMENT_ROW_COUNT; index += 1) {
    const adjustment = report.manualAdjustmentRows[index] ?? { description: "", amountCents: null };
    adjustmentRows.push(rows.length + 1);
    rows.push({ values: [null, adjustment.description || null, null, null, adjustment.amountCents == null ? null : dollars(adjustment.amountCents), ...Array(32).fill(null)], styles: { 0: "DateShort", 1: "ManualLabel", 4: "ManualInput" } });
  }
  rows.push(blankRow());
  rows.push(blankRow());
  rows.push(blankRow());
  const finalRow = rows.length + 1;
  rows.push({
    values: [null, "Montant à payer", null, null, dollars(report.payableAfterAdjustmentsCents), ...Array(32).fill(null)],
    styles: { 1: "PayableLabel", 4: "PayableMoney" },
    formulas: { 4: `=R[${amountToPayRow - finalRow}]C+SUM(R[${adjustmentRows[0] - finalRow}]C:R[${adjustmentRows.at(-1) - finalRow}]C)` },
  });
  return rows;
}

/**
 * Exports the report in Excel 2003 XML format so the workbook can be opened and
 * edited by Kim while preserving the supplied single-sheet layout.
 * @param {{period?: any, transactions?: any[], accounts?: any[], cards?: any[], selectedPerson?: string, manualAdjustmentRows?: any[]}} input
 */
export function buildAccountingReportExcelXml(input = {}) {
  const report = buildAccountingTemplateReport(input);
  const rows = templateRows(report);
  const worksheetRows = rows.map((entry) => typeof entry === "string" ? entry : row(entry.values, { styles: entry.styles, formulas: entry.formulas, types: entry.types })).join("");
  const columns = [...TEMPLATE_FIXED_COLUMNS, ...report.accountColumns.map((column) => column.width ?? TEMPLATE_DEFAULT_COLUMN_WIDTH)];
  const columnXml = columns.map((width, index) => {
    const accountColumn = report.accountColumns[index - TEMPLATE_FIXED_COLUMNS.length];
    const hidden = accountColumn?.hidden ? ' ss:Hidden="1"' : "";
    return `<Column ss:Width="${width}"${hidden}/>`;
  }).join("");
  return `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles>
  <Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Center"/><Font ss:FontName="Calibri" ss:Size="11"/></Style>
  <Style ss:ID="MetaLabel"><Font ss:Bold="1" ss:Size="11"/></Style>
  <Style ss:ID="MetaDate"><Font ss:Bold="1" ss:Size="11"/><NumberFormat ss:Format="${DATE_LONG_FORMAT}"/></Style>
  <Style ss:ID="DateShort"><NumberFormat ss:Format="${DATE_SHORT_FORMAT}"/></Style>
  <Style ss:ID="Header"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Font ss:Bold="1" ss:Color="#0000FF" ss:Size="11"/></Style>
  <Style ss:ID="HeaderAccount"><Alignment ss:Horizontal="Center" ss:Vertical="Center"/><Font ss:Bold="1" ss:Color="#0000FF" ss:Size="11"/></Style>
  <Style ss:ID="HeaderAccountLabel"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Font ss:Bold="1" ss:Color="#0000FF" ss:Size="11"/></Style>
  <Style ss:ID="Holder"><Font ss:Bold="1" ss:Color="#6600CC" ss:Size="11"/></Style>
  <Style ss:ID="BodyBlue"><Alignment ss:Horizontal="Center"/><Font ss:Bold="1" ss:Color="#0000FF" ss:Size="11"/></Style>
  <Style ss:ID="Money"><NumberFormat ss:Format="${ACCOUNTING_NUMBER_FORMAT}"/></Style>
  <Style ss:ID="TotalLabel"><Font ss:Bold="1" ss:Color="#000000" ss:Size="11"/><Borders><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#8EAADB"/><Border ss:Position="Bottom" ss:LineStyle="Double" ss:Weight="2" ss:Color="#8EAADB"/></Borders></Style>
  <Style ss:ID="TotalMoney"><Font ss:Bold="1" ss:Color="#000000" ss:Size="11"/><NumberFormat ss:Format="${ACCOUNTING_NUMBER_FORMAT}"/><Borders><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#8EAADB"/><Border ss:Position="Bottom" ss:LineStyle="Double" ss:Weight="2" ss:Color="#8EAADB"/></Borders></Style>
  <Style ss:ID="PayableLabel"><Alignment ss:Horizontal="Left"/><Font ss:Bold="1" ss:Color="#000000" ss:Size="11"/></Style>
  <Style ss:ID="PayableMoney"><Font ss:Bold="1" ss:Color="#000000" ss:Size="11"/><NumberFormat ss:Format="${ACCOUNTING_NUMBER_FORMAT}"/></Style>
  <Style ss:ID="ManualLabel"><Font ss:Size="11"/></Style>
  <Style ss:ID="ManualInput"><NumberFormat ss:Format="${ACCOUNTING_NUMBER_FORMAT}"/></Style>
</Styles>
<Worksheet ss:Name="${escapeXml(report.period.label || "Rapport")}"><Table>${columnXml}${worksheetRows}</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>4</SplitHorizontal><TopRowBottomPane>4</TopRowBottomPane><ActivePane>2</ActivePane><ProtectContents>False</ProtectContents></WorksheetOptions></Worksheet>
</Workbook>`;
}

const XLSX_STYLE_IDS = Object.freeze({
  Default: 0,
  MetaLabel: 1,
  MetaDate: 2,
  DateShort: 3,
  Header: 4,
  HeaderAccount: 5,
  HeaderAccountLabel: 6,
  Holder: 7,
  BodyBlue: 8,
  Money: 9,
  TotalLabel: 10,
  TotalMoney: 11,
  PayableLabel: 12,
  PayableMoney: 13,
  ManualLabel: 14,
  ManualInput: 15,
});

function xlsxColumnName(index) {
  let value = index + 1;
  let name = "";
  while (value > 0) {
    const remainder = (value - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    value = Math.floor((value - 1) / 26);
  }
  return name;
}

function xlsxUtf8(value) {
  return new TextEncoder().encode(value);
}

function xlsxU16(value) {
  return new Uint8Array([value & 0xff, (value >>> 8) & 0xff]);
}

function xlsxU32(value) {
  return new Uint8Array([value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff]);
}

function xlsxConcat(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function xlsxCrc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function xlsxZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const entry of entries) {
    const name = xlsxUtf8(entry.name);
    const data = xlsxUtf8(entry.content);
    const crc = xlsxCrc32(data);
    const local = xlsxConcat([
      new Uint8Array([0x50, 0x4b, 0x03, 0x04]),
      xlsxU16(20), xlsxU16(0), xlsxU16(0), xlsxU16(0), xlsxU16(0),
      xlsxU32(crc), xlsxU32(data.length), xlsxU32(data.length), xlsxU16(name.length), xlsxU16(0), name, data,
    ]);
    localParts.push(local);
    const central = xlsxConcat([
      new Uint8Array([0x50, 0x4b, 0x01, 0x02]),
      xlsxU16(20), xlsxU16(20), xlsxU16(0), xlsxU16(0), xlsxU16(0), xlsxU16(0),
      xlsxU32(crc), xlsxU32(data.length), xlsxU32(data.length), xlsxU16(name.length), xlsxU16(0), xlsxU16(0), xlsxU16(0), xlsxU16(0), xlsxU32(0), xlsxU32(offset), name,
    ]);
    centralParts.push(central);
    offset += local.length;
  }
  const centralDirectory = xlsxConcat(centralParts);
  const localDirectory = xlsxConcat(localParts);
  const end = xlsxConcat([
    new Uint8Array([0x50, 0x4b, 0x05, 0x06]),
    xlsxU16(0), xlsxU16(0), xlsxU16(entries.length), xlsxU16(entries.length),
    xlsxU32(centralDirectory.length), xlsxU32(localDirectory.length), xlsxU16(0),
  ]);
  return xlsxConcat([localDirectory, centralDirectory, end]);
}

function xlsxFormulaFromR1C1(formula, rowNumber, columnName) {
  return formula.replace(/R(?:\[(-?\d+)\])?C/g, (_match, relativeRow) => columnName + (rowNumber + Number(relativeRow ?? 0)));
}

function xlsxCell(value, rowNumber, columnIndex, styleName, type, formula) {
  const reference = xlsxColumnName(columnIndex) + rowNumber;
  const styleId = XLSX_STYLE_IDS[styleName] ?? 0;
  const style = styleId ? ' s="' + styleId + '"' : "";
  if (formula) {
    const formulaText = xlsxFormulaFromR1C1(formula.replace(/^=/, ""), rowNumber, xlsxColumnName(columnIndex));
    return '<c r="' + reference + '"' + style + '><f>' + escapeXml(formulaText) + '</f><v>' + Number(value ?? 0) + '</v></c>';
  }
  if (value == null || value === "") return '<c r="' + reference + '"' + style + '/>';
  if (type === "Number" || typeof value === "number") return '<c r="' + reference + '"' + style + '><v>' + Number(value) + '</v></c>';
  return '<c r="' + reference + '"' + style + ' t="inlineStr"><is><t xml:space="preserve">' + escapeXml(value) + '</t></is></c>';
}

function xlsxStylesXml() {
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="3"><numFmt numFmtId="164" formatCode="yyyy-mm-dd"/><numFmt numFmtId="165" formatCode="m/d/yy"/><numFmt numFmtId="166" formatCode="&quot;$&quot;#,##0.00;[Red]-&quot;$&quot;#,##0.00;-"/></numFmts><fonts count="4"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FF0000FF"/><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FF6600CC"/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="2"><border/><border><top style="thin"><color rgb="FF8EAADB"/></top><bottom style="double"><color rgb="FF8EAADB"/></bottom></border></borders><cellXfs count="16"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0"/><xf numFmtId="164" fontId="1" fillId="0" borderId="0"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="3" fillId="0" borderId="0"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="166" fontId="0" fillId="0" borderId="0"/><xf numFmtId="166" fontId="1" fillId="0" borderId="1"/><xf numFmtId="166" fontId="1" fillId="0" borderId="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0"/><xf numFmtId="166" fontId="1" fillId="0" borderId="0"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0"/></cellXfs></styleSheet>';
}

function xlsxWorksheetXml(report) {
  const columns = [...TEMPLATE_FIXED_COLUMNS, ...report.accountColumns.map((column) => column.width ?? TEMPLATE_DEFAULT_COLUMN_WIDTH)];
  const columnXml = columns.map((width, index) => {
    const accountColumn = report.accountColumns[index - TEMPLATE_FIXED_COLUMNS.length];
    const hidden = accountColumn?.hidden ? ' hidden="1"' : "";
    return '<col min="' + (index + 1) + '" max="' + (index + 1) + '" width="' + width + '" customWidth="1"' + hidden + '/>';
  }).join("");
  const worksheetRows = templateRows(report).map((entry, index) => {
    const rowNumber = index + 1;
    if (typeof entry === "string") {
      return '<row r="' + rowNumber + '">' + Array.from({ length: 37 }, (_, columnIndex) => xlsxCell(null, rowNumber, columnIndex, "")) .join("") + '</row>';
    }
    const values = Array.from({ length: 37 }, (_, columnIndex) => entry.values[columnIndex] ?? null);
    const cells = values.map((value, columnIndex) => xlsxCell(value, rowNumber, columnIndex, entry.styles?.[columnIndex], entry.types?.[columnIndex], entry.formulas?.[columnIndex])).join("");
    return '<row r="' + rowNumber + '">' + cells + '</row>';
  }).join("");
  const lastRow = templateRows(report).length;
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:AK' + lastRow + '"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="4" topLeftCell="A5" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A5" sqref="A5"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols>' + columnXml + '</cols><sheetData>' + worksheetRows + '</sheetData><autoFilter ref="A3:AK3"/><pageMargins left="0.25" right="0.25" top="0.5" bottom="0.5" header="0.3" footer="0.3"/></worksheet>';
}

/**
 * Exports a real OOXML workbook. The ZIP writer intentionally uses the ZIP
 * store method so the generated file stays dependency-free in the browser.
 * The single worksheet keeps the 37-column Kim layout, typed dates/money,
 * formulas, frozen headers, filters, and hidden account columns.
 * @param {{period?: any, transactions?: any[], accounts?: any[], cards?: any[], selectedPerson?: string, manualAdjustmentRows?: any[]}} input
 */
export function buildAccountingReportXlsx(input = {}) {
  const report = buildAccountingTemplateReport(input);
  const workbookName = String(report.period.label || "Rapport").replace(/[&<>"']/g, "");
  const contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>';
  const rootRelationships = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>';
  const workbook = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="7" lowestEdited="7" rupBuild="1"/><workbookPr defaultThemeVersion="164011"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="18000" windowHeight="12000"/></bookViews><sheets><sheet name="' + escapeXml(workbookName.slice(0, 31) || "Rapport") + '" sheetId="1" r:id="rId1"/></sheets><calcPr calcId="191029" fullCalcOnLoad="1" forceFullCalc="1"/></workbook>';
  const workbookRelationships = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
  const core = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator>Facture Thibeault</dc:creator><cp:lastModifiedBy>Facture Thibeault</cp:lastModifiedBy><dc:title>' + escapeXml(workbookName) + '</dc:title></cp:coreProperties>';
  const app = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Facture Thibeault</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" size="1" baseType="lpstr"><vt:lpstr>' + escapeXml(workbookName.slice(0, 31) || "Rapport") + '</vt:lpstr></vt:vector></TitlesOfParts></Properties>';
  return xlsxZip([
    { name: "[Content_Types].xml", content: contentTypes },
    { name: "_rels/.rels", content: rootRelationships },
    { name: "docProps/core.xml", content: core },
    { name: "docProps/app.xml", content: app },
    { name: "xl/workbook.xml", content: workbook },
    { name: "xl/_rels/workbook.xml.rels", content: workbookRelationships },
    { name: "xl/styles.xml", content: xlsxStylesXml() },
    { name: "xl/worksheets/sheet1.xml", content: xlsxWorksheetXml(report) },
  ]);
}

export function accountingReportFileName(period) {
  return `Rapport-comptable-${period?.start ?? "debut"}-${period?.end ?? "fin"}.xlsx`.replace(/[^A-Za-z0-9._-]/g, "-");
}
