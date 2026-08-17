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
- projects, expense accounts, tax amounts, and CAD-cent accounting values;
- transactions with card holder, project, account classification, SKU, and
  reconciliation state;
- invoices, private invoice photos, corrections, and audit events;
- merchant/SKU references for Canadian Tire and other SKU-only suppliers.

The connector exposes accounting reads to `KIM`, `ADMIN` and `SUPER_ADMIN`.
`WORKER` accounts cannot read global accounting data; they may create and list
only their own intake records. AI result mutations and seed mutations are
`NO_ACCESS`: trusted server code authenticates the caller, checks ownership and
uses Firebase Admin. Storage rules independently restrict invoice evidence.

Next integration steps:

1. Run `npm run test:emulator` and review every role assertion.
2. Create the dedicated staging project documented in
   `docs/Firebase-connection.md` (the project does not currently exist).
3. Run `npm run firebase:plan:staging` and review the SQL diff.
4. Deploy staging only through `npm run firebase:deploy:staging` with its exact
   confirmation value. Production requires two separate confirmations.
