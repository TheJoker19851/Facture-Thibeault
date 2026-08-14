# Firebase SQL Connect

This directory records the SQL Connect infrastructure supplied for Factures
Thibeault:

- service: `facture-thibeault-service`
- location: `northamerica-northeast1` (Montreal)
- PostgreSQL database: `facture-thibeault-database`
- Cloud SQL instance: `facture-thibeault-instance`

No application tables, schema, operations, connector, or seed data are deployed
yet. `connectorDirs: []` is deliberate until the business schema and the
connector ID are approved. Do not run `firebase deploy --only dataconnect` until
those files exist and the SQL diff has been reviewed.

The future model will likely cover users, cards, projects, accounts,
categories, receipts, receipt images/items, card statements/transactions,
matches, periods, manual corrections, audit logs, and Canadian Tire SKUs. This
is a proposal list only, not a database migration.

Once the schema and operations are approved:

1. Add `dataconnect/<connector>/connector.yaml` and the GraphQL schema and
   operations.
2. Generate the typed web SDK with `firebase dataconnect:sdk:generate`.
3. Run the SQL Connect emulator locally and validate the generated operations.
4. Review the SQL diff, then deploy with `firebase deploy --only dataconnect`.
