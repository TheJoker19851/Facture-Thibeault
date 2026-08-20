export function normalizeCardRoster(value, { expectedCount = 10 } = {}) {
  if (!Array.isArray(value)) throw new Error("CARD_ROSTER_JSON doit être un tableau JSON.");
  if (value.length !== expectedCount) throw new Error(`Le registre doit contenir exactement ${expectedCount} cartes.`);

  const roster = value.map((entry, index) => {
    const lastFour = String(entry?.lastFour ?? "").trim();
    const displayName = String(entry?.displayName ?? entry?.holder ?? "").trim();
    if (!/^\d{4}$/.test(lastFour)) throw new Error(`La carte #${index + 1} doit avoir exactement quatre chiffres.`);
    if (!displayName) throw new Error(`La carte •••• ${lastFour} doit avoir un titulaire.`);
    return { lastFour, displayName };
  });

  const duplicates = roster.filter((entry, index) => roster.findIndex((candidate) => candidate.lastFour === entry.lastFour) !== index);
  if (duplicates.length) throw new Error(`Cartes dupliquées dans le registre : ${[...new Set(duplicates.map((entry) => entry.lastFour))].join(", ")}.`);
  return roster;
}
