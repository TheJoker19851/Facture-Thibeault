# Connexion Firebase — Factures Thibeault

## Services retenus

- Firebase Authentication pour les sessions et les rôles `WORKER`, `KIM`,
  `ADMIN` et `SUPER_ADMIN`.
- Firebase SQL Connect pour les opérations typées vers PostgreSQL.
- Cloud SQL for PostgreSQL, en `northamerica-northeast1` (Montreal).
- Firebase Storage privé pour les images sous
  `receipts/{year}/{month}/{receiptId}/original-01.jpg`.
- Le schéma SQL Connect et le connecteur de lecture `accounting` sont déclarés
  dans `dataconnect/`; le service, le schéma et le connecteur de production sont
  maintenant déployés.

Firestore n'est pas utilisé comme base applicative. Le schéma métier proposé
se trouve dans `dataconnect/schema/accounting.gql` et ses opérations de lecture
dans `dataconnect/accounting/queries.gql`. Aucune table ni donnée réelle n'est
considérée comme déployée tant que l'émulateur, les règles d'accès et le diff
SQL n'ont pas été validés.

## Modèle d'accès production

Le rôle ne doit pas être déduit d'une valeur envoyée par le navigateur. Il doit
être ajouté comme custom claim Firebase Admin, par exemple :

```js
await getAuth().setCustomUserClaims(uid, { role: "KIM" });
```

Valeurs acceptées :

- `KIM` : contrôle comptable complet;
- `ADMIN` ou `SUPER_ADMIN` : contrôle complet et diagnostic;
- `WORKER` : dépôt de photos de factures uniquement.

Après l'attribution ou la modification d'un rôle, l'utilisateur doit fermer sa
session et se reconnecter (ou rafraîchir son jeton) pour recevoir le claim.
Les requêtes SQL vérifient le claim côté serveur; masquer un avertissement avec
`insecureReason` ou déployer avec `--force` n'est pas une alternative de
sécurité.

## Variables d'environnement

Les six variables
`NEXT_PUBLIC_FIREBASE_*` viennent de Firebase Console → Project settings →
Your apps → Web app. Elles ne remplacent pas un mot de passe PostgreSQL.

`NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID` devra être le nom du connecteur créé par
SQL Connect, visible dans Firebase Console → SQL Connect, ou dans son
`connector.yaml`. Le dépôt déclare actuellement `accounting`; il ne devient
utilisable en production qu’après le déploiement des opérations.

Ne jamais ajouter de clé de service, mot de passe PostgreSQL, jeton Google ou
clé Gemini à `.env.example`, au navigateur, à Git ou à GitHub.

## Développement local

```bash
npm install
npx firebase-tools emulators:start --only auth,storage,dataconnect
npm run dev
```

Le fichier `.env.local` et l'alias `.firebaserc` de production sont créés
localement et restent ignorés par Git. La configuration actuelle pointe vers
`facture-thibeault` avec `NEXT_PUBLIC_FIREBASE_USE_EMULATORS=false`; ne lance
donc pas les émulateurs avec ce fichier. Pour une session locale, utiliser une
copie non suivie de `.env.local` avec un projet d'émulateur et
`NEXT_PUBLIC_FIREBASE_USE_EMULATORS=true`. Après le démarrage, charger la
fixture SQL locale :

```bash
psql -h 127.0.0.1 -p 5433 -U postgres \
  -d facture-thibeault-database -f firebase/seed-emulator.sql
```

Le port `5433` est celui utilisé sur cette machine parce que le port PostgreSQL
`5432` était déjà occupé. Il faut confirmer le port indiqué dans
`firebase-debug.log` avant de lancer `psql`. Si le terminal utilise Java 8 par
défaut, Firebase CLI exige Java 11 ou plus; définir `JAVA_HOME` vers un JDK
compatible et placer son dossier `bin` en tête de `PATH`.

Pour éviter toute écriture dans un projet partagé, utiliser uniquement cette
configuration émulateur avec les émulateurs lancés. Pour staging et production,
laisser `NEXT_PUBLIC_FIREBASE_USE_EMULATORS=false`.

## Déploiements contrôlés

L'authentification se configure dans la console Firebase; aucun utilisateur de
production n'est créé par le dépôt. Après approbation du schéma et des
opérations seulement :

```bash
firebase dataconnect:sdk:generate
firebase deploy --only dataconnect
firebase deploy --only storage
```

La commande Storage ne publie pas le bucket; elle déploie les règles privées
de `storage.rules`. Le schéma et le connecteur `accounting` ont été déployés
après migration initiale de la base; toute évolution future doit être précédée
d'une revue du diff et d'un test de l'émulateur.

## État du test de connexion

Le dépôt initialise les SDK Firebase Auth et Storage lorsque la configuration
web est fournie. En production, l'interface n'affiche plus de données de
démonstration si SQL Connect échoue : elle affiche un état de connexion et une
action de reconnexion. Une requête de production exige une session Firebase
portant le claim de rôle approprié et un jeu de données chargé dans PostgreSQL.
Le schéma est prêt, mais la base de production ne contient encore aucune
donnée métier initiale.
