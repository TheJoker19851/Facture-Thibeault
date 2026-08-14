/**
 * Initial reference data only.
 *
 * These values are migration input for Convex and must not be treated as the
 * application's runtime source of truth. Once imported, queries must read the
 * corresponding Convex tables.
 */

export const initialPeople = [
  { legacyKey: "PERSON-KEVEN-TREMBLAY", fullName: "Keven Tremblay", function: "Propriétaire", status: "ACTIVE" as const },
  { legacyKey: "PERSON-PATRICE-SAVARD", fullName: "Patrice Savard", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-STEPHANE-DESCHESNE", fullName: "Stéphane Deschêsne", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-OLIVIER-SIMARD", fullName: "Olivier Simard", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-MARTIAL-TREMBLAY", fullName: "Martial Tremblay", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-KEVEN-LAVOIE", fullName: "Keven Lavoie", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-SIMON-MURRAY", fullName: "Simon Murray", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-MICHEL-FORTIER", fullName: "Michel Fortier", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-MICHEL-SIMARD", fullName: "Michel Simard", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-DAVE-EMOND", fullName: "Dave Émond", function: "Contremaître", status: "ACTIVE" as const },
  { legacyKey: "PERSON-REAL-SAVARD", fullName: "Réal Savard", function: "Contremaître", status: "INACTIVE" as const },
] as const;

export const initialCards = [
  { legacyKey: "CARD-01", lastFour: "2481", holderLegacyKey: "PERSON-KEVEN-TREMBLAY", status: "ACTIVE" as const },
  { legacyKey: "CARD-02", lastFour: "2286", holderLegacyKey: "PERSON-PATRICE-SAVARD", status: "ACTIVE" as const },
  { legacyKey: "CARD-03", lastFour: "7184", holderLegacyKey: "PERSON-STEPHANE-DESCHESNE", status: "ACTIVE" as const },
  { legacyKey: "CARD-05", lastFour: "0383", holderLegacyKey: "PERSON-OLIVIER-SIMARD", status: "ACTIVE" as const },
  { legacyKey: "CARD-06", lastFour: "9294", holderLegacyKey: "PERSON-MARTIAL-TREMBLAY", status: "ACTIVE" as const },
  { legacyKey: "CARD-07", lastFour: "9295", holderLegacyKey: "PERSON-KEVEN-LAVOIE", status: "ACTIVE" as const },
  { legacyKey: "CARD-08", lastFour: "9309", holderLegacyKey: "PERSON-SIMON-MURRAY", status: "ACTIVE" as const },
  { legacyKey: "CARD-09", lastFour: "2250", holderLegacyKey: "PERSON-MICHEL-FORTIER", status: "ACTIVE" as const },
  { legacyKey: "CARD-10", lastFour: "9291", holderLegacyKey: "PERSON-MICHEL-SIMARD", status: "ACTIVE" as const },
  { legacyKey: "CARD-11", lastFour: "9298", holderLegacyKey: "PERSON-DAVE-EMOND", status: "ACTIVE" as const },
  { legacyKey: "CARD-04", lastFour: "2141", holderLegacyKey: "PERSON-REAL-SAVARD", status: "INACTIVE" as const },
] as const;

/** The official order shown in Kim's accounting summary image. */
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

/** Tax accounts remain configured separately from Kim's expense summary. */
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
