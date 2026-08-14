# Connexion Firebase — Factures Thibeault

## Services retenus

- Firebase Authentication pour les sessions et les futurs rôles `WORKER`,
  `KIM`, `ADMIN` et `SUPER_ADMIN`.
- Firebase SQL Connect pour les opérations typées vers PostgreSQL.
- Cloud SQL for PostgreSQL, en `northamerica-northeast1` (Montreal).
- Firebase Storage privé pour les images sous
  `receipts/{year}/{month}/{receiptId}/original-01.jpg`.

Firestore n'est pas utilisé comme base applicative. Le dossier `dataconnect/`
ne contient volontairement pas encore de tables ni d'opérations : le schéma
métier doit être approuvé avant toute migration.

## Variables d'environnement

Copier `.env.example` vers `.env.local`. Les six variables
`NEXT_PUBLIC_FIREBASE_*` viennent de Firebase Console → Project settings →
Your apps → Web app. Elles ne remplacent pas un mot de passe PostgreSQL.

`NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID` devra être le nom du connecteur créé par
SQL Connect, visible dans Firebase Console → SQL Connect, ou dans son
`connector.yaml`. Il est laissé vide tant que le connecteur et ses opérations
ne sont pas approuvés.

Ne jamais ajouter de clé de service, mot de passe PostgreSQL, jeton Google ou
clé Gemini à `.env.example`, au navigateur, à Git ou à GitHub.

## Développement local

```bash
npm install
npx firebase-tools emulators:start --only auth,storage,dataconnect
npm run dev
```

Pour éviter toute écriture dans un projet partagé, utiliser
`NEXT_PUBLIC_FIREBASE_USE_EMULATORS=true` dans `.env.local` lorsque les
émulateurs sont lancés. Pour staging et production, laisser cette variable à
`false` et utiliser des projets Firebase distincts ou des alias `.firebaserc`
locaux non suivis par Git.

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
de `storage.rules`. Le déploiement SQL Connect doit être précédé d'une revue
du diff et d'un test de l'émulateur.

## État du test de connexion

Le dépôt initialise les SDK Firebase Auth et Storage lorsque la configuration
web est fournie et prépare le client SQL Connect sans exposer de credential
PostgreSQL. Une requête SQL Connect réelle ne peut pas encore être exécutée :
aucun connecteur/opération n'est présent et le dépôt n'a pas de session Firebase
ou Google Cloud. Cette étape est donc explicitement non déclarée « connectée ».
