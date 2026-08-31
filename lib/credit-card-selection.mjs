function cardIdentity(card) {
  const holderId = String(card?.holderId ?? card?.holder?.id ?? card?.holderFirebaseUid ?? "").trim();
  const lastFour = String(card?.lastFour ?? "").trim();
  if (!holderId || !lastFour) return null;
  return `${holderId}\u0000${lastFour}`;
}

/**
 * Collapse duplicate database rows only when they represent the same
 * last-four value for the same holder. Cards shared by different holders are
 * intentionally kept, even when their last four digits match.
 */
export function uniqueCreditCards(cards = []) {
  const seen = new Set();
  return cards.filter((card) => {
    const identity = cardIdentity(card);
    if (!identity) return true;
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
}
