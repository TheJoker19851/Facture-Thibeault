# Cadre de confidentialité — Québec / Montréal

Ce document est une checklist de développement. Il ne remplace pas l’avis du
responsable de la protection des renseignements personnels ni une validation
juridique.

## Données visées

L’application peut traiter des noms d’employés, adresses ou coordonnées sur des
factures, quatre derniers chiffres de cartes, images de factures, fournisseurs,
chantiers, montants, journaux d’audit et sorties d’analyse Gemini. Ces données
doivent être considérées comme des renseignements personnels jusqu’à preuve du
contraire.

## Configuration technique prévue

- Cloud Firestore : `northamerica-northeast1` (Montréal).
- Cloud Storage : bucket régional `northamerica-northeast1` (Montréal).
- Cloud Functions : `northamerica-northeast1` (Montréal).
- Firestore Web : cache persistant désactivé par défaut; l’activer seulement
  sur des appareils gérés et fiables lorsque l’usage hors ligne est requis.
- Security Rules : refus par défaut; accès conditionné par l’authentification
  Firebase et les rôles `WORKER`, `ACCOUNTING`, `ADMIN`.
- App Check : à activer après enregistrement de l’application et validation
  des flux locaux et de production.

## Actions obligatoires avant de charger de vraies factures

1. Désigner et documenter le responsable de la protection des renseignements
   personnels.
2. Réaliser une EFVP pour le développement/refonte du système et pour les
   transferts ou traitements effectués hors Québec.
3. Documenter les fournisseurs, sous-traitants, régions de traitement,
   contrôles d’accès, sauvegardes, suppression et procédures d’incident.
4. Publier une politique de confidentialité claire et recueillir les
   consentements nécessaires, lorsque requis.
5. Préparer un registre d’incidents de confidentialité et le processus d’avis
   en cas de risque de préjudice sérieux.
6. Valider avec le responsable et le conseiller juridique la conservation des
   factures, la gestion des demandes d’accès/correction et les exports.
7. Ne jamais envoyer une image ou un texte de facture à Gemini depuis le
   navigateur avec une clé secrète. Le traitement IA doit passer par une
   fonction serveur authentifiée, journalisée et soumise à l’EFVP.

## Point particulier Gemini

La région Montréal doit être demandée explicitement lorsque le modèle et le
produit la prennent en charge. Certains modèles récents ou fonctions de
Firebase AI Logic peuvent imposer une région globale ou une autre contrainte.
Dans ce cas, l’envoi de renseignements personnels est bloqué par défaut dans
notre conception jusqu’à l’EFVP, l’entente écrite et la validation du niveau de
protection applicable.
