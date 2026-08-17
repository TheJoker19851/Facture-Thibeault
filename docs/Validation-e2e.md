# Validation de bout en bout — Factures Thibeault

## Parcours staging

Exécuter avec les quatre comptes `*.demo@example.test` seulement.

1. Se connecter avec ADMIN.
2. Créer un nouveau compte WORKER de test et lui attribuer le rôle.
3. Associer une carte fictive au travailleur.
4. Se déconnecter puis se connecter avec WORKER.
5. Ouvrir `/capture`.
6. Déposer une image de facture fictive sans donnée personnelle.
7. Confirmer l'upload dans Storage staging.
8. Confirmer la création de l'intake SQL Connect.
9. Confirmer l'extraction Gemini : fournisseur, date, montants, taxes, carte,
   articles et catégorie proposée.
10. Vérifier qu'une confiance faible produit `TO_VERIFY`.
11. Se connecter avec KIM.
12. Corriger manuellement la facture.
13. Valider la facture et créer l'écriture comptable.
14. Vérifier les rapports par personne, période et compte.
15. Importer une transaction de carte fictive et effectuer le rapprochement.
16. Vérifier l'audit, les statuts et l'absence de données production.

## Matrice d'autorisation attendue

| Action | WORKER | KIM | ADMIN | SUPER_ADMIN |
|---|---:|---:|---:|---:|
| Déposer une facture | oui | oui | oui | oui |
| Lire les images de facture | non | oui | oui | oui |
| Lire les vues comptables globales | non | oui | oui | oui |
| Corriger/valider | non | oui | oui | oui |
| Gérer cartes | non | oui | oui | oui |
| Créer/désactiver utilisateurs | non | non | oui | oui |
| Diagnostic | non | non | oui | oui |
| Écrire directement un résultat IA | non | non | non | non |

La dernière ligne est volontaire : la persistance IA appartient uniquement à
la route serveur Firebase Admin.

## Preuves à conserver

- captures de l'interface pour chaque rôle;
- journaux de requêtes API sans secret ni image réelle;
- résultat `npm run test:emulator`;
- diff SQL staging revu;
- captures des règles Auth/Storage/App Check staging;
- rapports affichant uniquement des identifiants `DEMO-*`;
- preuve que les variables Vercel Preview ciblent le projet staging.

## Critères d'arrêt

Arrêter immédiatement si un identifiant de projet, bucket, service account ou
URL correspond à `facture-thibeault` pendant un seed, un reset ou un test
destructif. Ne pas contourner un refus avec une commande Firebase directe.
