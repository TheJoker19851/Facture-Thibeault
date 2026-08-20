/**
 * Données de référence entièrement fictives pour les aperçus locaux.
 * Le seed exécutable et ses garde-fous vivent dans scripts/seed-demo.mjs.
 */
export const initialPeople = [
  ["DEMO-USER-WORKER", "Alice Démo", "Travailleuse démo", "ACTIVE"],
  ["DEMO-USER-KIM", "Benoît Démo", "Comptabilité démo", "ACTIVE"],
  ["DEMO-USER-ADMIN", "Chloé Démo", "Administration démo", "ACTIVE"],
] as const;

export const initialCards = [
  ["DEMO-CARD-001", "9001", "DEMO-USER-WORKER", "ACTIVE"],
  ["DEMO-CARD-002", "9002", "DEMO-USER-KIM", "ACTIVE"],
] as const;

export const initialExpenseAccounts = [
  ["DEMO-90001", "Matériaux Démo"],
  ["DEMO-90002", "Carburant Démo"],
  ["DEMO-90003", "Équipement Démo"],
] as const;

export const initialProjects = [
  ["DEMO-PROJET-001", "Chantier Démo A"],
  ["DEMO-PROJET-002", "Chantier Démo B"],
  ["DEMO-ADMIN", "Administration Démo"],
] as const;
