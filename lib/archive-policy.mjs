export const ARCHIVE_RECOMMENDATION_STATUS = Object.freeze({
  NONE: "NONE",
  PLAN: "PLAN",
  REVIEW: "REVIEW",
});

export const ARCHIVE_STORAGE_TARGET_BYTES = 4 * 1024 * 1024 * 1024;
export const ARCHIVE_CAPACITY_STATUS = Object.freeze({
  NORMAL: "NORMAL",
  PLAN: "PLAN",
  RECOMMENDED: "RECOMMENDED",
  PRIORITY: "PRIORITY",
});

export const ARCHIVE_CAPACITY_BANDS = Object.freeze([
  { status: ARCHIVE_CAPACITY_STATUS.NORMAL, fromRatio: 0, toRatio: 0.5, label: "Normal", description: "Aucune urgence d’archivage." },
  { status: ARCHIVE_CAPACITY_STATUS.PLAN, fromRatio: 0.5, toRatio: 0.75, label: "À planifier", description: "Prévoir un export manuel." },
  { status: ARCHIVE_CAPACITY_STATUS.RECOMMENDED, fromRatio: 0.75, toRatio: 0.9, label: "Recommandé", description: "Effectuer l’archivage prochainement." },
  { status: ARCHIVE_CAPACITY_STATUS.PRIORITY, fromRatio: 0.9, toRatio: Number.POSITIVE_INFINITY, label: "Prioritaire", description: "Traiter l’archivage dès que possible." },
]);

function nonNegativeCount(value) {
  const count = Number(value);
  return Number.isSafeInteger(count) && count >= 0 ? count : 0;
}

export function archiveCapacityBand(storageBytes, targetBytes = ARCHIVE_STORAGE_TARGET_BYTES) {
  const usedBytes = Math.max(0, Number(storageBytes) || 0);
  const safeTargetBytes = Math.max(1, Number(targetBytes) || ARCHIVE_STORAGE_TARGET_BYTES);
  const ratio = usedBytes / safeTargetBytes;
  const band = ARCHIVE_CAPACITY_BANDS.find((candidate) => ratio >= candidate.fromRatio && ratio < candidate.toRatio) ?? ARCHIVE_CAPACITY_BANDS.at(-1);
  return {
    status: band.status,
    label: band.label,
    description: band.description,
    usedBytes,
    targetBytes: safeTargetBytes,
    ratio,
    percentage: Math.round(ratio * 100),
  };
}

/**
 * Gives the operator a manual archive signal without ever scheduling or
 * deleting anything. Any eligible photo means an archive can be planned;
 * linked-data anomalies are surfaced before the operator exports or purges.
 */
export function buildArchiveRecommendation(summary = {}) {
  const eligiblePhotos = nonNegativeCount(summary.eligiblePhotos);
  const eligibleBytes = nonNegativeCount(summary.eligibleBytes);
  const unlinkedStorageObjects = nonNegativeCount(summary.unlinkedStorageObjects);
  const missingLinkedPhotos = nonNegativeCount(summary.missingLinkedPhotos);
  const duplicateLinkedPaths = nonNegativeCount(summary.duplicateLinkedPaths);
  const verificationItems = unlinkedStorageObjects + missingLinkedPhotos + duplicateLinkedPaths;

  if (verificationItems > 0) {
    return {
      status: ARCHIVE_RECOMMENDATION_STATUS.REVIEW,
      eligiblePhotos,
      eligibleBytes,
      verificationItems,
      title: "Vérification requise avant archivage",
      description: "Des objets Storage ou des liens de preuves doivent être vérifiés avant l’export.",
    };
  }

  if (eligiblePhotos === 0) {
    return {
      status: ARCHIVE_RECOMMENDATION_STATUS.NONE,
      eligiblePhotos,
      eligibleBytes,
      verificationItems,
      title: "Aucune archive à planifier",
      description: "Aucune photo de facture comptabilisée n’est actuellement admissible.",
    };
  }

  return {
    status: ARCHIVE_RECOMMENDATION_STATUS.PLAN,
    eligiblePhotos,
    eligibleBytes,
    verificationItems,
    title: "Archivage à planifier",
    description: "Des photos comptabilisées sont prêtes pour un export manuel lorsque le volume le justifie.",
  };
}
