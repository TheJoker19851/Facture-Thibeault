# Connexion Firebase — Factures Thibeault

## État vérifié le 17 août 2026

Le compte Firebase accessible contient le projet de production
`facture-thibeault`, une application Web active, un bucket Storage et le
service SQL Connect `facture-thibeault-service` en
`northamerica-northeast1`. Le connecteur `accounting`, la base
`facture-thibeault-database` et l'instance
`facture-thibeault-instance` y existent.

Aucun projet Firebase staging consacré à Factures Thibeault n'existe encore.
Le projet `qr-logistics-tracker-staging` appartient à une autre application et
ne doit jamais être réutilisé. Le poste local n'est pas connecté à Vercel et le
dépôt n'a pas de fichier `.vercel/project.json`.

Le fichier local `.env.local` cible la production :

- projet et Firebase Admin : `facture-thibeault`;
- Auth domain : `facture-thibeault.firebaseapp.com`;
- bucket : `facture-thibeault.firebasestorage.app`;
- SQL Connect : service `facture-thibeault-service`, connecteur `accounting`;
- émulateurs : désactivés;
- Gemini : configuré côté serveur.

Les valeurs de clé, jeton, compte de service et clé privée ne doivent jamais
être affichées, copiées dans la documentation ou ajoutées à Git.

## Les trois environnements

| Environnement | Projet Firebase | Services | Données permises |
|---|---|---|---|
| LOCAL | `demo-facture-thibeault` | Auth, Storage et SQL Connect Emulator; IA simulée | `DEMO-*` seulement |
| STAGING | projet réel distinct à créer, recommandé `facture-thibeault-staging` | vrais Auth, Storage, SQL Connect/Cloud SQL et Gemini | données fictives seulement |
| PRODUCTION | `facture-thibeault` | infrastructure officielle | données réelles, après validation staging |

`lib/environment.mjs` applique ces invariants. Le projet local doit commencer
par `demo-` et être exactement `demo-facture-thibeault`. Le staging refuse le
projet de production et les projets `demo-*`. La production accepte seulement
`facture-thibeault` et refuse les émulateurs.

## Fichiers d'environnement

- `.env.local` : configuration locale actuelle de production, ignorée par Git;
- `.env.emulator.example` : configuration publique de référence pour les
  émulateurs; `npm run dev:emulator` injecte ces valeurs automatiquement;
- `.env.staging.example` : copier vers `.env.staging.local`, puis remplir avec
  le futur projet staging;
- `.env.production.example` : inventaire sans secret des variables Vercel
  Production;
- `.env.example` : inventaire générique.

Ajouter à l'actuel `.env.local` lors de la prochaine mise à jour manuelle :

```dotenv
APP_ENV=production
NEXT_PUBLIC_APP_ENV=production
INVOICE_AI_MODE=live
```

Les variables `NEXT_PUBLIC_*` sont intégrées au navigateur et ne doivent jamais
contenir de secret. `FIREBASE_ADMIN_PRIVATE_KEY` et
`GOOGLE_GENERATIVE_AI_API_KEY` sont strictement serveur.

Vérifier une configuration sans révéler de secret :

```bash
npm run env:check
npm run env:check:staging
```

## Développement local avec Emulator

Prérequis : Node.js 22.13 ou plus et Java 11 ou plus. Le poste vérifié utilise
Node 22 et Java 21.

```bash
npm install
npm run dev:emulator
```

Cette commande :

1. force le projet `demo-facture-thibeault`;
2. démarre Auth sur `9099`, Storage sur `9199`, SQL Connect sur `9399` et
   l'interface Emulator sur `4000`;
3. compile le schéma Data Connect local;
4. crée quatre comptes fictifs et leurs custom claims;
5. charge les données métier `DEMO-*` de manière idempotente;
6. démarre l'application;
7. utilise une extraction IA simulée et neutralise les credentials production.

Comptes locaux :

| Rôle | Courriel |
|---|---|
| WORKER | `worker.demo@example.test` |
| KIM | `kim.demo@example.test` |
| ADMIN | `admin.demo@example.test` |
| SUPER_ADMIN | `super-admin.demo@example.test` |

Mot de passe local, public et inutilisable hors émulateur :
`Demo-Facture-2026!`.

Chaque nouvelle exécution de `dev:emulator` remet les enregistrements `DEMO-*`
à leur valeur connue. Pour recharger le seed pendant que les émulateurs tournent :

```bash
npm run seed:local
```

Le seed staging exige quant à lui la confirmation exacte
`CONFIRM_STAGING_SEED=SEED_FACTURE_THIBEAULT_STAGING_DEMO_ONLY`. Le code refuse
toujours la production, quelle que soit la confirmation fournie.

## Tests de permissions Emulator

```bash
npm run test:emulator
```

Le test utilise directement les émulateurs, pas seulement l'interface :

- un `WORKER` peut créer une image de facture;
- le même `WORKER` et un visiteur anonyme ne peuvent pas lire l'image;
- `KIM` peut lire et supprimer l'image;
- un `WORKER` ne peut pas lire les vues comptables SQL Connect;
- `KIM` peut lire les comptes;
- un `WORKER` peut créer son intake avec `auth.uid` imposé par le serveur;
- un `WORKER` ne peut pas modifier les profils utilisateurs.

Les écritures de résultat IA et d'erreur IA sont `NO_ACCESS` dans Data Connect.
Elles sont exécutées uniquement par la route serveur après validation du jeton
Firebase et de la propriété du dépôt.

## Création manuelle du staging réel

Cette étape peut créer de la facturation Cloud SQL. Elle doit être effectuée
manuellement après approbation :

1. créer le projet Firebase `facture-thibeault-staging` ou un identifiant
   équivalent clairement distinct;
2. associer un compte de facturation approuvé;
3. choisir Montréal `northamerica-northeast1` pour SQL Connect/Cloud SQL;
4. créer une application Web staging;
5. activer Auth courriel/mot de passe et Google, avec les domaines staging;
6. créer le bucket Storage staging et garder les règles privées;
7. créer SQL Connect avec les mêmes noms logiques que production : service
   `facture-thibeault-service`, base `facture-thibeault-database`, instance
   `facture-thibeault-instance`, mais dans le projet staging;
8. créer un compte de service staging dédié et limité; ne jamais réutiliser la
   clé production;
9. copier `.env.staging.example` vers `.env.staging.local` et remplir toutes
   les valeurs;
10. copier `.firebaserc.example` vers `.firebaserc` et remplacer l'alias
    `staging`;
11. exécuter le plan en lecture seule, revoir intégralement le diff SQL;
12. seulement après approbation, fournir la confirmation de déploiement et
    lancer le déploiement staging.

```bash
npm run firebase:plan:staging
# Revoir le diff, puis définir dans .env.staging.local :
# CONFIRM_STAGING_DEPLOY=DEPLOY_FACTURE_THIBEAULT_STAGING
npm run firebase:deploy:staging
```

Après le déploiement et la configuration des secrets staging :

```bash
# Ajouter un mot de passe fictif fort et la confirmation de seed au fichier local.
npm run seed:staging
npm run dev:staging
```

Le seed staging contient seulement Alice, Benoît, Chloé et David Démo, deux
cartes `9001/9002`, trois projets/comptes fictifs et quelques factures et
transactions `DEMO-*`.

## Vercel staging et production

Lier d'abord le dépôt au bon projet Vercel. Ne pas exécuter
`vercel env pull .env.local --yes` sans sauvegarde : cette commande remplace le
fichier complet.

Configurer les variables dans Vercel ainsi :

- Preview, branche `staging` : toutes les valeurs du projet Firebase staging,
  `APP_ENV=staging`, `NEXT_PUBLIC_APP_ENV=staging`, `INVOICE_AI_MODE=live`;
- Production, branche `main` : projet `facture-thibeault`,
  `APP_ENV=production`, `NEXT_PUBLIC_APP_ENV=production`,
  `INVOICE_AI_MODE=live`;
- ne jamais partager `FIREBASE_ADMIN_*` ou la clé Gemini entre staging et
  production;
- garder App Check sans enforcement jusqu'à la validation du parcours, puis
  l'activer progressivement en staging avant production.

## Déploiement production

Cette étape ne doit pas être exécutée pendant la préparation staging. Le script
de production exige simultanément :

```dotenv
CONFIRM_PRODUCTION_DEPLOY=DEPLOY_FACTURE_THIBEAULT_PRODUCTION
CONFIRM_PRODUCTION_SCHEMA_MIGRATION=REVIEWED_PRODUCTION_SQL_DIFF
```

Même avec ces valeurs, aucun seed production n'existe. Le déploiement exécute
d'abord la compilation et le diff SQL. Les règles Storage locales écrasent les
règles de console lors d'un déploiement; leur test Emulator est donc obligatoire.

## Scénario de validation

Le scénario manuel complet et la matrice des rôles se trouvent dans
`docs/Validation-e2e.md`. Ne charger aucune carte, facture ou transaction réelle
avant que toutes les cases staging soient validées.
