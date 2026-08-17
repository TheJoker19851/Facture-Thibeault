# Validation E2E Facture Thibeault

Le parcours est exécuté dans deux modes seulement : LOCAL avec les émulateurs et PRODUCTION avec des données `DEMO-*`. Une validation production doit afficher `TARGET PROJECT: facture-thibeault`, `ENVIRONMENT: PRODUCTION` et `DATA MODE: DEMO VALIDATION ONLY` avant toute écriture.

La décision automatique est déterministe après l’extraction IA. `INVOICE_AI_MIN_CONFIDENCE` configure le seuil de confiance (valeur V1 par défaut : `0.95`); il doit être calibré sur des résultats annotés avant toute réduction. Une facture `AUTO_APPROVED` doit satisfaire tous les contrôles et reçoit immédiatement `POSTED`; toute exception reste `NEEDS_REVIEW` pour KIM.

## Préparation

1. Vérifier `.env.local` (`APP_ENV=production`, `NEXT_PUBLIC_APP_ENV=production`, `INVOICE_AI_MODE=live`, aucun hôte d’émulateur).
2. Générer et relire `npm run firebase:plan:production`; ne pas appliquer la migration pendant cette validation.
3. Exécuter le seed DEMO uniquement après décision explicite et avec `CONFIRM_DEMO_PRODUCTION=facture-thibeault`.

## Parcours réel

Avec les trois rôles `WORKER`, `KIM` et `ADMIN` :

1. ADMIN se connecte, crée un WORKER et lui associe une carte.
2. WORKER se connecte, ouvre `/capture`, dépose une image fictive et vérifie l’upload Storage.
3. Le serveur crée l’intake, appelle Gemini live une seule fois ou sur quelques factures, puis persiste fournisseur, date, totaux, taxes, articles et carte.
4. Vérifier qu’une facture sans exception devient `AUTO_APPROVED` et qu’une facture avec `LOW_CONFIDENCE`, `UNKNOWN_SKU`, `AMBIGUOUS_CARD`, `UNKNOWN_PROJECT`, `POSSIBLE_DUPLICATE` ou incohérence de total reste `NEEDS_REVIEW`.
5. KIM corrige une facture `NEEDS_REVIEW`, la valide et déclenche l’enregistrement comptable.
5. Vérifier rapports, filtres personne/période/compte et rapprochement avec une transaction DEMO.

## Permissions à prouver

- WORKER ne lit pas l’administration, les factures arbitraires ou un résultat IA écrit directement.
- KIM lit les factures nécessaires, corrige et valide les données autorisées.
- ADMIN gère les utilisateurs et les référentiels.
- Un appel anonyme est refusé; chaque route serveur vérifie le token, le rôle et le propriétaire requis.
- Preview Vercel ne possède aucun credential d’écriture production.

## Nettoyage

Après conservation des preuves, exécuter seulement `npm run cleanup:demo:production` avec `CONFIRM_DEMO_CLEANUP=facture-thibeault` et `CONFIRM_DEMO_CLEANUP_EXECUTE=DELETE_DEMO_ONLY`. Ne jamais utiliser de reset générique.

## Preuves

Conserver le Project ID, les rôles, chemins Storage, IDs `DEMO-*`, réponse Gemini, résultats des règles et journaux des commandes. Ne pas inclure de secret dans Git, les captures ou les rapports.
