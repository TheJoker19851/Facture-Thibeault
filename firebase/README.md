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

## Émulateur local

Le dépôt contient aussi `seed-emulator.sql`, une fixture locale reproductible
pour remplir la base PostgreSQL démarrée par l'émulateur Data Connect. Elle
contient uniquement des identifiants et données de démonstration.

Après le démarrage des émulateurs, le port PostgreSQL est généralement `5433`
si le port `5432` est déjà utilisé :

```bash
psql -h 127.0.0.1 -p 5433 -U postgres \
  -d facture-thibeault-database -f firebase/seed-emulator.sql
```

Les utilisateurs Firebase de démonstration sont créés dans l'émulateur Auth,
pas dans ce fichier SQL. Aucun secret ou identifiant de production ne doit être
ajouté à cette fixture.
