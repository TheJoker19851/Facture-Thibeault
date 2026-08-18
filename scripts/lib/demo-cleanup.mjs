import { createHash } from "node:crypto";

export const DEMO_CLEANUP_DELETION_ORDER = [
  "InvoicePhoto",
  "Invoice",
  "ExpenseTransaction",
  "InvoiceIntake",
  "CreditCard",
  "SkuReference",
  "Project",
  "ExpenseAccount",
  "TaxAccount",
  "StatementPeriod",
  "UserProfile",
  "FirebaseAuth",
  "Storage",
];

const DATA_CONNECT_RESOURCE_TYPES = [
  "UserProfile",
  "CreditCard",
  "StatementPeriod",
  "ExpenseAccount",
  "TaxAccount",
  "Project",
  "SkuReference",
  "ExpenseTransaction",
  "InvoiceIntake",
  "Invoice",
];

const RESOURCE_KEYS = {
  UserProfile: "id",
  CreditCard: "id",
  StatementPeriod: "id",
  ExpenseAccount: "code",
  TaxAccount: "code",
  Project: "id",
  ExpenseTransaction: "id",
  InvoiceIntake: "receiptId",
  Invoice: "id",
};

function asString(value) {
  return value == null ? "" : String(value);
}

function startsWithDemo(value) {
  return asString(value).startsWith("DEMO-");
}

function unique(values) {
  return [...new Set(values.filter(Boolean).map(asString))];
}

function rowIdentifier(type, row) {
  if (type === "SkuReference") return `${asString(row.merchant)}::${asString(row.sku)}`;
  return asString(row[RESOURCE_KEYS[type]]);
}

function rowEvidenceValues(type, row) {
  if (type === "SkuReference") return [row.merchant, row.sku];
  return [row[RESOURCE_KEYS[type]]];
}

function setFor(rows, mapper = (row) => row) {
  return new Set(rows.map(mapper).filter(Boolean).map(asString));
}

export function buildFixtureIndex({ demoUsers, demoProjects, demoPeriods, demoExpenseAccounts, demoTaxAccounts, fixture }) {
  return {
    UserProfile: setFor(demoUsers, (row) => row.id),
    CreditCard: setFor(fixture.cards, (row) => row.id),
    StatementPeriod: setFor(demoPeriods, (row) => row.id),
    ExpenseAccount: setFor(demoExpenseAccounts, (row) => row.code),
    TaxAccount: setFor(demoTaxAccounts, (row) => row.code),
    Project: setFor(demoProjects, (row) => row.id),
    SkuReference: setFor(fixture.skuReferences, (row) => `${row.merchant}::${row.sku}`),
    ExpenseTransaction: setFor(fixture.transactions, (row) => row.id),
    InvoiceIntake: setFor(fixture.invoiceIntakes, (row) => row.receiptId),
    Invoice: setFor(fixture.invoices, (row) => row.id),
    InvoicePhoto: setFor(fixture.invoicePhotos, (row) => row.id),
    invoiceIds: setFor(fixture.invoices, (row) => row.id),
    invoiceFolders: unique(fixture.invoices.map((row) => row.storageFolder)),
    intakeFolders: unique(fixture.invoiceIntakes.map((row) => row.storageFolder)),
    storagePaths: setFor(fixture.invoicePhotos, (row) => row.storagePath),
    demoEmails: new Set(demoUsers.map((row) => asString(row.email).toLowerCase())),
  };
}

function classification(classification, identifier, reason, relations = []) {
  return { classification, identifier, reason, relations: unique(relations) };
}

export function classifyDataConnectResource(type, row, fixtureIndex) {
  const identifier = rowIdentifier(type, row);
  const evidenceValues = rowEvidenceValues(type, row);
  if (!identifier) return classification("AMBIGUOUS", identifier, "Identifiant absent; impossible de prouver l’appartenance DEMO.");
  if (fixtureIndex[type]?.has(identifier)) {
    const relations = [row.holder?.id, row.statementPeriod?.id, row.project?.id, row.expenseAccount?.code, row.transaction?.id, row.createdBy?.id].filter(Boolean);
    return classification("SAFE_DEMO", identifier, "Identifiant présent dans les fixtures DEMO connues.", relations);
  }
  if (evidenceValues.some(startsWithDemo)) {
    return classification("AMBIGUOUS", identifier, "Ressource marquée DEMO mais absente des fixtures connues.");
  }
  return classification("NON_DEMO", identifier, "Aucune preuve DEMO; cette ressource doit être conservée.");
}

export function classifyInvoicePhoto(row, fixtureIndex) {
  const identifier = asString(row.id);
  const invoiceId = asString(row.invoice?.id ?? row.invoiceId);
  const storagePath = asString(row.storagePath);
  const knownPhotoId = fixtureIndex.InvoicePhoto.has(identifier);
  const knownInvoice = fixtureIndex.invoiceIds.has(invoiceId);
  const knownStoragePath = fixtureIndex.storagePaths.has(storagePath);
  const knownInvoiceFolder = fixtureIndex.invoiceFolders.some((folder) => folder && (storagePath === folder || storagePath.startsWith(`${folder}/`)));
  const demoId = startsWithDemo(identifier);
  const demoInvoiceId = startsWithDemo(invoiceId);
  const demoPath = startsWithDemo(storagePath) || storagePath.includes("/DEMO-") || storagePath.includes("DEMO/");

  if ((knownPhotoId || knownInvoice || knownStoragePath || knownInvoiceFolder) && (!invoiceId || knownInvoice || knownPhotoId)) {
    const evidence = [
      knownPhotoId ? "ID présent dans les InvoicePhoto fixtures" : null,
      knownInvoice ? `relation invoice=${invoiceId}` : null,
      knownStoragePath ? "storagePath présent dans les fixtures" : null,
      knownInvoiceFolder ? "storagePath cohérent avec un dossier Invoice DEMO" : null,
    ].filter(Boolean);
    return classification("SAFE_DEMO", identifier, evidence.join("; "), [invoiceId, storagePath]);
  }

  if (knownPhotoId && invoiceId && !knownInvoice) {
    return classification("AMBIGUOUS", identifier, `ID photo DEMO connu mais relation Invoice inattendue (${invoiceId}).`, [invoiceId, storagePath]);
  }
  if (demoId || demoInvoiceId || demoPath) {
    return classification("AMBIGUOUS", identifier, "Indice DEMO présent sans preuve suffisante par fixture ou relation connue.", [invoiceId, storagePath]);
  }
  return classification("NON_DEMO", identifier, "Aucune preuve que cette photo appartient aux fixtures DEMO.", [invoiceId, storagePath]);
}

function storageMetadataDemo(file) {
  const metadata = file.metadata?.metadata ?? file.metadata ?? {};
  return metadata.demo === true || metadata.demo === "true";
}

function knownStorageFolder(storagePath, fixtureIndex) {
  return [...fixtureIndex.invoiceFolders, ...fixtureIndex.intakeFolders].some((folder) => folder && (storagePath === folder || storagePath.startsWith(`${folder}/`)));
}

export function classifyStorageFile(file, fixtureIndex) {
  const path = asString(file.name ?? file.path);
  const hasDemoMetadata = storageMetadataDemo(file);
  const hasKnownLink = fixtureIndex.storagePaths.has(path) || knownStorageFolder(path, fixtureIndex);
  const pathLooksDemo = path.includes("DEMO-") || path.includes("/DEMO/");

  if (hasDemoMetadata && hasKnownLink) {
    return classification("SAFE_DEMO", path, "metadata.demo=true et lien Storage cohérent avec une fixture DEMO.");
  }
  if (hasDemoMetadata || hasKnownLink || pathLooksDemo) {
    return classification("AMBIGUOUS", path, "Indice DEMO présent mais la preuve metadata + lien fixture n’est pas complète.");
  }
  return classification("NON_DEMO", path, "Aucune preuve DEMO; fichier à conserver.");
}

function makeResourceInventory(type, rows, fixtureIndex) {
  return rows.map((row) => ({ type, row, ...classifyDataConnectResource(type, row, fixtureIndex) }));
}

function authIdentifier(record) {
  return asString(record.uid);
}

function classifyAuthRecord(record, fixtureIndex, userProfiles) {
  const email = asString(record.email).toLowerCase();
  const demoProfile = userProfiles.find((profile) => profile.row.firebaseUid === record.uid);
  const claimsDemo = record.customClaims?.demo === true;
  const expectedDemoEmail = fixtureIndex.demoEmails.has(email);
  const expectedDemoProfile = Boolean(demoProfile?.classification === "SAFE_DEMO");
  if (expectedDemoEmail || expectedDemoProfile || claimsDemo) {
    if (claimsDemo && (expectedDemoEmail || expectedDemoProfile)) {
      return { type: "FirebaseAuth", row: record, ...classification("SAFE_DEMO", authIdentifier(record), "Compte Auth DEMO connu par courriel/profil et customClaims.demo=true.", [email]) };
    }
    return { type: "FirebaseAuth", row: record, ...classification("AMBIGUOUS", authIdentifier(record), "Compte Auth associé à DEMO mais customClaims.demo=true ou la fixture correspondante manque.", [email]) };
  }
  return { type: "FirebaseAuth", row: record, ...classification("NON_DEMO", authIdentifier(record), "Compte Auth non-DEMO à conserver.", [email]) };
}

export function maskEmail(value) {
  const [local, domain] = asString(value).split("@");
  if (!domain) return "(email non affiché)";
  return `${local ? `${local[0]}***` : "***"}@${domain}`;
}

export function hashIdentifier(value) {
  return createHash("sha256").update(asString(value)).digest("hex").slice(0, 12);
}

export function buildPreflightReport({ rowsByType, invoicePhotos, authRecords, storageFiles, fixtureIndex, queryErrors = [] }) {
  const resources = Object.fromEntries(DATA_CONNECT_RESOURCE_TYPES.map((type) => [type, makeResourceInventory(type, rowsByType[type] ?? [], fixtureIndex)]));
  const userProfiles = resources.UserProfile;
  const auth = (authRecords ?? []).map((record) => classifyAuthRecord(record, fixtureIndex, userProfiles));
  const photos = (invoicePhotos ?? []).map((row) => ({ type: "InvoicePhoto", row, ...classifyInvoicePhoto(row, fixtureIndex) }));
  const storage = (storageFiles ?? []).map((file) => ({ type: "Storage", row: file, ...classifyStorageFile(file, fixtureIndex) }));
  return { resources, invoicePhotos: photos, auth, storage, fixtureIndex, queryErrors };
}

export function preflightBlockingReasons(report) {
  const reasons = [];
  for (const error of report.queryErrors ?? []) reasons.push(`Lecture ${error.type || error.operation} indisponible: ${error.message}`);
  for (const entries of Object.values(report.resources)) {
    for (const entry of entries) {
      if (entry.classification !== "SAFE_DEMO") reasons.push(`${entry.type} ${entry.identifier || "(sans ID)"}: ${entry.classification} — ${entry.reason}`);
    }
  }
  for (const entry of report.invoicePhotos) {
    if (entry.classification !== "SAFE_DEMO") reasons.push(`${entry.type} ${entry.identifier || "(sans ID)"}: ${entry.classification} — ${entry.reason}`);
  }
  for (const entry of report.storage) {
    if (entry.classification === "AMBIGUOUS") reasons.push(`${entry.type} ${entry.identifier || "(sans chemin)"}: AMBIGUOUS — ${entry.reason}`);
  }
  for (const entry of report.auth) {
    if (entry.classification === "AMBIGUOUS") reasons.push(`${entry.type} ${hashIdentifier(entry.identifier)}: AMBIGUOUS — ${entry.reason}`);
  }
  const nonDemoAuth = report.auth.filter((entry) => entry.classification === "NON_DEMO");
  if (nonDemoAuth.length !== 1) reasons.push(`Firebase Auth: ${nonDemoAuth.length} compte(s) non-DEMO observé(s); exactement 1 est attendu.`);
  return reasons;
}

export function assertPreflightSafe(report) {
  const reasons = preflightBlockingReasons(report);
  if (reasons.length) throw new Error(`PRE-FLIGHT BLOQUÉ:\n- ${reasons.join("\n- ")}`);
  return report;
}

export function buildDeletionPlan(report) {
  assertPreflightSafe(report);
  const safe = (entries) => entries.filter((entry) => entry.classification === "SAFE_DEMO");
  return {
    InvoicePhoto: safe(report.invoicePhotos),
    Invoice: safe(report.resources.Invoice),
    ExpenseTransaction: safe(report.resources.ExpenseTransaction),
    InvoiceIntake: safe(report.resources.InvoiceIntake),
    CreditCard: safe(report.resources.CreditCard),
    SkuReference: safe(report.resources.SkuReference),
    Project: safe(report.resources.Project),
    ExpenseAccount: safe(report.resources.ExpenseAccount),
    TaxAccount: safe(report.resources.TaxAccount),
    StatementPeriod: safe(report.resources.StatementPeriod),
    UserProfile: safe(report.resources.UserProfile),
    FirebaseAuth: safe(report.auth),
    Storage: safe(report.storage),
  };
}

export function postCleanupBlockingReasons(report, expectedNonDemoAuthCount = 1) {
  const reasons = [];
  for (const error of report.queryErrors ?? []) reasons.push(`Validation ${error.type || error.operation} indisponible: ${error.message}`);
  for (const [type, entries] of Object.entries(report.resources)) {
    if (entries.length) reasons.push(`${type}: ${entries.length} ressource(s) SQL reste(nt) présente(s).`);
  }
  if (report.invoicePhotos.length) reasons.push(`InvoicePhoto: ${report.invoicePhotos.length} photo(s) reste(nt) présente(s).`);
  if (report.storage.some((entry) => entry.classification !== "NON_DEMO")) reasons.push("Storage: un fichier DEMO ou ambigu reste présent.");
  if (report.auth.filter((entry) => entry.classification === "SAFE_DEMO").length) reasons.push("Firebase Auth: un compte DEMO reste présent.");
  if (report.auth.filter((entry) => entry.classification === "NON_DEMO").length !== expectedNonDemoAuthCount) reasons.push("Firebase Auth: le compte non-DEMO attendu n’est pas conservé exactement.");
  return reasons;
}

export function assertPostCleanupClean(report, expectedNonDemoAuthCount = 1) {
  const reasons = postCleanupBlockingReasons(report, expectedNonDemoAuthCount);
  if (reasons.length) throw new Error(`VALIDATION POST-CLEANUP ÉCHOUÉE:\n- ${reasons.join("\n- ")}`);
  return report;
}

export function formatPreflightReport(report) {
  const lines = ["PRE-FLIGHT DEMO PRODUCTION — LECTURE SEULE", ""];
  if (report.queryErrors?.length) {
    lines.push("LECTURES INCOMPLÈTES :");
    for (const error of report.queryErrors) lines.push(`  - ${error.type || error.operation}: ${error.message}`);
    lines.push("");
  }
  for (const type of DATA_CONNECT_RESOURCE_TYPES) {
    const entries = report.resources[type] ?? [];
    if (report.queryErrors?.some((error) => error.type === type)) {
      lines.push(`${type}: INDISPONIBLE — lecture non certifiée`);
      continue;
    }
    lines.push(`${type}: ${entries.length}`);
    for (const entry of entries) lines.push(`  - ${entry.classification} ${entry.identifier || "(sans ID)"} — ${entry.reason}`);
  }
  if (report.queryErrors?.some((error) => error.type === "InvoicePhoto")) lines.push("InvoicePhoto: INDISPONIBLE — lecture non certifiée");
  else lines.push(`InvoicePhoto: ${report.invoicePhotos.length}`);
  for (const entry of report.invoicePhotos) lines.push(`  - ${entry.classification} ${entry.identifier || "(sans ID)"} — ${entry.reason}`);
  lines.push(`Storage receipts/: ${report.storage.length}`);
  for (const entry of report.storage) lines.push(`  - ${entry.classification} ${entry.identifier || "(sans chemin)"} — ${entry.reason}`);
  lines.push(`Firebase Auth: ${report.auth.length}`);
  for (const entry of report.auth) {
    const email = entry.relations[0];
    const identifier = entry.classification === "NON_DEMO" ? `${maskEmail(email)} (UID ${hashIdentifier(entry.identifier)})` : maskEmail(email);
    lines.push(`  - ${entry.classification} ${identifier} — ${entry.reason}`);
  }
  const blocking = preflightBlockingReasons(report);
  lines.push("");
  lines.push(blocking.length ? `RÉSULTAT: BLOQUÉ (${blocking.length} raison(s))` : "RÉSULTAT: AUTORISABLE SOUS RÉSERVE DES CONFIRMATIONS DESTRUCTIVES");
  return lines.join("\n");
}

export function resourceRowsFromResults(queryResults) {
  const rowsByType = {};
  for (const [type, result] of Object.entries(queryResults)) {
    const rows = Object.values(result?.data ?? {}).find(Array.isArray) ?? [];
    rowsByType[type] = rows;
  }
  return rowsByType;
}
