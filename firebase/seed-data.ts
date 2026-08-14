/**
 * Reference data to import into Firestore after the Firebase project is
 * created. This file is input for a controlled seed/import command, not a
 * client-side source of truth.
 */
export const initialPeople = [
  ["PERSON-KEVEN-TREMBLAY", "Keven Tremblay", "Propriétaire", "ACTIVE"],
  ["PERSON-PATRICE-SAVARD", "Patrice Savard", "Contremaître", "ACTIVE"],
  ["PERSON-STEPHANE-DESCHESNE", "Stéphane Deschêsne", "Contremaître", "ACTIVE"],
  ["PERSON-OLIVIER-SIMARD", "Olivier Simard", "Contremaître", "ACTIVE"],
  ["PERSON-MARTIAL-TREMBLAY", "Martial Tremblay", "Contremaître", "ACTIVE"],
  ["PERSON-KEVEN-LAVOIE", "Keven Lavoie", "Contremaître", "ACTIVE"],
  ["PERSON-SIMON-MURRAY", "Simon Murray", "Contremaître", "ACTIVE"],
  ["PERSON-MICHEL-FORTIER", "Michel Fortier", "Contremaître", "ACTIVE"],
  ["PERSON-MICHEL-SIMARD", "Michel Simard", "Contremaître", "ACTIVE"],
  ["PERSON-DAVE-EMOND", "Dave Émond", "Contremaître", "ACTIVE"],
  ["PERSON-REAL-SAVARD", "Réal Savard", "Contremaître", "INACTIVE"],
] as const;

export const initialCards = [
  ["CARD-01", "2481", "PERSON-KEVEN-TREMBLAY", "ACTIVE"],
  ["CARD-02", "2286", "PERSON-PATRICE-SAVARD", "ACTIVE"],
  ["CARD-03", "7184", "PERSON-STEPHANE-DESCHESNE", "ACTIVE"],
  ["CARD-05", "0383", "PERSON-OLIVIER-SIMARD", "ACTIVE"],
  ["CARD-06", "9294", "PERSON-MARTIAL-TREMBLAY", "ACTIVE"],
  ["CARD-07", "9295", "PERSON-KEVEN-LAVOIE", "ACTIVE"],
  ["CARD-08", "9309", "PERSON-SIMON-MURRAY", "ACTIVE"],
  ["CARD-09", "2250", "PERSON-MICHEL-FORTIER", "ACTIVE"],
  ["CARD-10", "9291", "PERSON-MICHEL-SIMARD", "ACTIVE"],
  ["CARD-11", "9298", "PERSON-DAVE-EMOND", "ACTIVE"],
  ["CARD-04", "2141", "PERSON-REAL-SAVARD", "INACTIVE"],
] as const;

export const initialExpenseAccounts = [
  ["33544", "Essence"],
  ["33556", "Entretien roulant"],
  ["33557", "Réparation équipement"],
  ["43400", "CCQ"],
  ["33500", "Matériaux divers"],
  ["42112", "Frais bureau"],
  ["33552", "Frais de soumission"],
  ["42104", "Pénalité/amende"],
  ["33537", "Chauffage des travaux"],
  ["33539", "Rebus"],
  ["33526", "Divers"],
  ["34019", "Équipement de sécurité"],
  ["42102", "Taxes licence permis"],
  ["34016", "Voyage et pension"],
  ["11155", "Avance à l'administrateur"],
  ["45670", "Promotion"],
  ["33558", "Immatriculation"],
  ["33536", "Location équipement"],
  ["33555", "Entretien camion lourd"],
  ["33554", "Location camion"],
  ["34014", "Formation"],
  ["33540", "Transport matériel"],
  ["33518", "Maçonnerie"],
  ["15250", "Mise de fonds achat tracteur"],
  ["11160", "Dépôt garantie"],
] as const;

export const initialTaxAccounts = [
  ["21340", "TPS"],
  ["21370", "TVQ"],
] as const;

export const initialProjects = [
  ["21", "À CONFIGURER"],
  ["125", "À CONFIGURER"],
  ["133", "À CONFIGURER"],
  ["135", "À CONFIGURER"],
  ["138", "À CONFIGURER"],
  ["ADMIN", "Administration / non chantier"],
] as const;
