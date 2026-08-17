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

`seed-data.ts` is a deprecated, fictitious UI compatibility fixture. The
authoritative demo fixture is `scripts/fixtures/demo-data.mjs`; it is not a
runtime source of truth and is never deployed automatically.

## Émulateur local

Le seed reproductible crée trois comptes fictifs (`WORKER`, `KIM` et `ADMIN`) ainsi que leurs cartes, projets, fournisseurs et factures de
démonstration. Il passe par Firebase Admin et par des opérations Data Connect
`NO_ACCESS`, donc aucune opération de seed n'est exposée au client.

```bash
npm run seed:local
npm run test:emulator
```

`npm run seed:demo:production` exige le projet exact `facture-thibeault` et
`CONFIRM_DEMO_PRODUCTION=facture-thibeault`; il ne crée que des données
`DEMO-*`. Le seed générique local rejette toujours la production.
