# Connexion Firebase : deux environnements

Facture Thibeault ne crée pas de projet Firebase séparé pour le moment.

## LOCAL (sans ressources partagées)

- Projet Firebase Emulator : `demo-facture-thibeault`.
- `APP_ENV=local`, `NEXT_PUBLIC_APP_ENV=local`, `INVOICE_AI_MODE=mock`.
- Auth, Storage et Data Connect passent par les émulateurs (`9099`, `9199`, `9399`).
- Copiez `.env.emulator.example` vers `.env.local`; le fichier `.env.local` est ignoré par Git.
- Utilisez `npm run dev:emulator`, `npm run seed:local` et `npm run test:emulator`.

## PRODUCTION (validation contrôlée)

- Projet exact : `facture-thibeault`, région Data Connect/Storage : `northamerica-northeast1`.
- `APP_ENV=production`, `NEXT_PUBLIC_APP_ENV=production`, `INVOICE_AI_MODE=live`.
- Aucun hôte d’émulateur n’est accepté en production. Un projet différent est refusé.
- Les credentials Admin et Gemini restent dans `.env.local`/Vercel, jamais dans Git.
- La commande générale `seed:local` ne peut pas viser la production.
- La seule écriture de fixtures prévue avant l’import réel est `npm run seed:demo:production`, qui exige `CONFIRM_DEMO_PRODUCTION=facture-thibeault` et `CONFIRM_DEMO_SEED_EXECUTE=SEED_DEMO_ONLY`, crée uniquement des comptes et données `DEMO-*`, et refuse tout compte Auth existant non marqué `demo=true`.
- Le registre réel des dix cartes est une opération séparée et explicitement limitée aux profils titulaires et cartes : `scripts/configure-production-card-roster.mjs` exige `CONFIRM_PRODUCTION_CARD_ROSTER=APPLY_REAL_CARD_ROSTER`; il ne crée aucun compte Auth, facture, transaction, relevé ou rapprochement.
- `npm run cleanup:demo:production` exige deux confirmations et ne supprime que les fixtures `DEMO-*` vérifiées, l’intake E2E reconnue par ses marqueurs exacts, les comptes Auth DEMO et les fichiers Storage reliés à ces fixtures; les ressources non-DEMO sont conservées.

## Schéma Data Connect

Générez toujours un plan avant une migration : `npm run firebase:plan:production`. Vérifiez que la sortie cible uniquement `facture-thibeault`. Aucun déploiement de schéma n’est exécuté dans la validation locale actuelle; `firebase:deploy:production` exige des confirmations distinctes.

## Vercel

Les variables Production peuvent contenir les credentials production. Les variables Preview ne doivent pas les réutiliser : définissez `NEXT_PUBLIC_FIREBASE_PREVIEW_MODE=true`, ne fournissez aucun credential Admin/Gemini/Data Connect privé et laissez les opérations d’écriture désactivées. Le dépôt n’est pas lié automatiquement à Vercel.
