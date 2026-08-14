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

The connector currently exposes read-only operations protected by Firebase Auth
(`@auth(level: USER)`). This is intentional: client-side correction mutations
will not be opened until the role model, audit trail, and Kim/admin permissions
are reviewed. The local preview continues to use its demonstration data until
the generated SDK is installed and the Firebase environment is explicitly
enabled.

Next integration steps:

1. Generate the typed web SDK with `firebase dataconnect:sdk:generate`.
2. Run the SQL Connect emulator locally and validate the generated operations.
3. Add a small repository adapter so the dashboard can read cards, periods, and
   transactions from SQL Connect while retaining a safe demo fallback.
4. Review the SQL diff and authorization rules, then deploy only after approval
   with `firebase deploy --only dataconnect`.
