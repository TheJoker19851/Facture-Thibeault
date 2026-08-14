# Firebase foundation

Firebase Authentication identifies users, SQL Connect exposes approved typed
operations to the PostgreSQL database, and Cloud Storage keeps invoice
evidence private. Privileged workflows such as Gemini analysis,
reconciliation, exports and audit writes will run server-side after their
schema and privacy review.

The chosen technical region is `northamerica-northeast1` (Montréal). SQL
Connect and its Cloud SQL PostgreSQL instance must remain in the same region.
This is a technical residency choice, not a complete legal-compliance
determination. Before real personal information is imported, complete the
Québec EFVP and supplier/data-transfer review in `docs/EFVP-Quebec.md`.

`seed-data.ts` is only a controlled reference-data input from the prototype. It
is not a runtime source of truth and is not deployed.
