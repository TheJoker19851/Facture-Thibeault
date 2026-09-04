# Firebase SQL Connect

This directory records the SQL Connect infrastructure supplied for Factures
Thibeault:

- service: `facture-thibeault-service`
- location: `northamerica-northeast1` (Montreal)
- PostgreSQL database: `facture-thibeault-database`
- Cloud SQL instance: `facture-thibeault-instance`

The first version of the application schema now lives in
`schema/accounting.gql`, and the read-only `accounting` connector is declared in
`accounting/`. It covers the current product boundary:

- users, cards, and configurable statement periods;
- expense accounts, tax amounts, and CAD-cent accounting values;
- transactions with card holder, a manually entered project number, account
  classification, SKU, and reconciliation state; legacy project relations are
  retained for historical rows;
- invoices, private invoice photos, corrections, and audit events;
- merchant/SKU references for Canadian Tire and other SKU-only suppliers.

New invoice processing does not read, recognize, validate, or require project
references. During review, a project number may be entered manually and is
preserved in the transaction table and Excel export. The `Project` relation is
kept only for historical data and controlled seed/migration operations.

The connector exposes accounting reads to `KIM` and `ADMIN`.
`WORKER` accounts cannot read global accounting data; they may create and list
only their own intake records. AI result mutations and seed mutations are
`NO_ACCESS`: trusted server code authenticates the caller, checks ownership and
uses Firebase Admin. Storage rules independently restrict invoice evidence.

Next integration steps:

1. Run `npm run test:emulator` and review every role assertion.
2. Keep LOCAL on the Firebase Emulator and validate production only with
   explicitly marked `DEMO-*` data.
3. Run `npm run firebase:plan:production` and review the SQL diff before any
   production schema deployment.
4. Production deployment requires two separate confirmations and is never
   performed by the local test suite.
