import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { reconciliationServerAvailable } from "../lib/reconciliation-access.mjs";
import { buildPersistedReconciliation, importStatementBatch } from "../lib/reconciliation-server.mjs";

const componentPath = new URL("../app/components/ThibeaultApp.tsx", import.meta.url);
const serverPath = new URL("../lib/reconciliation-server.mjs", import.meta.url);
const mutationsPath = new URL("../dataconnect/accounting/mutations.gql", import.meta.url);
const queriesPath = new URL("../dataconnect/accounting/queries.gql", import.meta.url);

const productionEnvironment = {
  APP_ENV: "production",
  NEXT_PUBLIC_APP_ENV: "production",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "facture-thibeault",
  FIREBASE_ADMIN_PROJECT_ID: "facture-thibeault",
  NEXT_PUBLIC_FIREBASE_USE_EMULATORS: "false",
  NEXT_PUBLIC_FIREBASE_PREVIEW_MODE: "false",
};

test("le serveur de rapprochement accepte seulement l'émulateur isolé ou la Production exacte", () => {
  assert.equal(reconciliationServerAvailable(productionEnvironment), true);
  assert.equal(reconciliationServerAvailable({ ...productionEnvironment, NEXT_PUBLIC_FIREBASE_PREVIEW_MODE: "true" }), false);
  assert.equal(reconciliationServerAvailable({ ...productionEnvironment, FIREBASE_ADMIN_PROJECT_ID: "autre-projet" }), false);
  assert.equal(reconciliationServerAvailable({
    APP_ENV: "local",
    NEXT_PUBLIC_APP_ENV: "local",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "demo-facture-thibeault",
    FIREBASE_ADMIN_PROJECT_ID: "demo-facture-thibeault",
    NEXT_PUBLIC_FIREBASE_USE_EMULATORS: "true",
    FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
    DATA_CONNECT_EMULATOR_HOST: "127.0.0.1:9399",
    FIREBASE_STORAGE_EMULATOR_HOST: "127.0.0.1:9199",
  }), true);
});

test("la navigation expose le rapprochement sans rediriger vers les factures à vérifier", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /\{ id: "reconciliation", label: "Rapprochement"/);
  assert.match(source, /view === "reconciliation".*<ReconciliationPage/);
  assert.doesNotMatch(source, /nextView === "dashboard" \|\| nextView === "reconciliation"/);
  assert.match(source, /isProductionDataSource \|\| isLocalEmulatorMode/);
  assert.match(source, /accept="\.pdf,\.json,\.csv/);
  assert.match(source, /\/api\/reconciliation\/parse-pdf/);
  assert.match(source, /Aperçu avant écriture/);
  assert.match(source, /Enregistrer le relevé/);
});

test("l'import serveur conserve la preuve puis finalise le relevé sans toucher au workflow IA", async () => {
  const operations = [];
  const evidenceWrites = [];
  const dataConnect = {
    async executeMutation(operation, variables) {
      operations.push({ operation, variables });
      return { data: {} };
    },
  };
  const sourceText = JSON.stringify({
    lines: [
      { transactionDate: "2026-08-11", merchantRaw: "Marchand A", amountCents: 1000 },
      { transactionDate: "2026-08-12", merchantRaw: "Marchand B", amountCents: 2000 },
    ],
  });
  const context = {
    statements: [],
    aliases: [],
    aliasRules: [],
    histories: [{ id: "HISTORY-1", card: { id: "CARD-1" }, holder: { id: "PROFILE-1", displayName: "Kim" }, validFrom: "2026-01-01", validTo: null, status: "ACTIVE" }],
    profiles: [{ id: "PROFILE-1", firebaseUid: "UID-1" }],
  };
  const trustedPdfHash = "a".repeat(64);
  const result = await importStatementBatch({
    dataConnect,
    context,
    identity: { uid: "UID-1", role: "KIM" },
    imports: [{ sourceText, originalFilename: "releve.pdf", cardId: "CARD-1", periodStart: "2026-08-01", periodEnd: "2026-08-31", trustedStatementHash: trustedPdfHash }],
    evidenceWriter: async (input) => {
      evidenceWrites.push(input);
      return `statements/${input.statementHash}.json`;
    },
  });

  assert.equal(result.imported, 1);
  assert.equal(evidenceWrites.length, 1);
  assert.equal(evidenceWrites[0].statementHash, trustedPdfHash);
  assert.deepEqual(operations.map(({ operation }) => operation), [
    "UpsertCreditCardStatement",
    "UpsertCreditCardStatementLine",
    "UpsertCreditCardStatementLine",
    "FinalizeCreditCardStatementImport",
  ]);
  assert.equal(operations[0].variables.status, "IMPORTING");
  assert.equal(operations[0].variables.statementHash, trustedPdfHash);
  assert.match(operations[0].variables.originalStoragePath, /^statements\//);
  assert.equal(operations.some(({ operation }) => /InvoiceIntake|Ai/i.test(operation)), false);
});

test("un jumelage déjà utilisé ailleurs n'est jamais reproposé et un statut manuel sans transaction survit", () => {
  const statement = {
    id: "STATEMENT-1",
    cardId: "CARD-1",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-31",
    lines: [{ id: "LINE-1", sequence: 1, transactionDate: "2026-08-11", merchantRaw: "Marchand", amountCents: 1000 }],
  };
  const transaction = { id: "TX-1", cardId: "CARD-1", transactionDate: "2026-08-11", vendor: "Marchand", totalCents: 1000 };
  const blocked = buildPersistedReconciliation({
    statements: [statement],
    transactions: [transaction],
    aliases: [],
    aliasRules: [],
    outsideControls: [],
    matches: [{ id: "MATCH-OTHER", status: "MATCHED", statementLine: { id: "OTHER-LINE" }, expenseTransaction: { id: "TX-1" } }],
  }, statement.id);
  assert.equal(blocked.lineResults[0].status, "MISSING_INVOICE");

  const ignored = buildPersistedReconciliation({
    statements: [statement],
    transactions: [transaction],
    aliases: [],
    aliasRules: [],
    outsideControls: [],
    matches: [{ id: "MATCH-LINE-1", status: "IGNORED", reason: "Ignorée", statementLine: { id: "LINE-1" }, expenseTransaction: null }],
  }, statement.id);
  assert.equal(ignored.lineResults[0].status, "IGNORED");
  assert.equal(ignored.lineResults[0].match, null);
});

test("les mutations libèrent l'ancien jumelage et les lectures conservent les statuts manuels", async () => {
  const [server, mutations, queries] = await Promise.all([readFile(serverPath, "utf8"), readFile(mutationsPath, "utf8"), readFile(queriesPath, "utf8")]);
  assert.match(server, /async function clearReconciliationAssociation/);
  assert.match(server, /executeMutation\("ClearReconciliationMatch"/);
  assert.match(server, /suffix: "before-change"/);
  assert.match(server, /suffix: "before-status"/);
  const clearStart = mutations.indexOf("mutation ClearReconciliationMatch(");
  const clearEnd = mutations.indexOf("\nmutation ", clearStart + 1);
  const clearMutation = mutations.slice(clearStart, clearEnd);
  assert.match(clearMutation, /reconciliationStatus: "UNMATCHED"/);
  assert.match(mutations, /expectedExpenseTransactionId == null.*status == vars\.expectedMatchStatus/);
  const queryStart = queries.indexOf("query ListReconciliationMatchesPage(");
  const queryEnd = queries.indexOf("\nquery ", queryStart + 1);
  const query = queries.slice(queryStart, queryEnd);
  assert.doesNotMatch(query, /where:\s*\{\s*expenseTransaction:/);
});
