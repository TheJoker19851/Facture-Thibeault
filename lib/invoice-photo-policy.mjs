/** One accounting intake must describe one photographed document. */
export function requiresSinglePhotoReview(photoCount) {
  return !Number.isInteger(photoCount) || photoCount !== 1;
}

export const MULTI_PHOTO_REVIEW_MESSAGE =
  "Plusieurs photos ont été déposées ensemble. Séparez les factures et relancez chaque photo individuellement; aucune écriture automatique n’a été créée.";
