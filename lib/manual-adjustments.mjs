export const MANUAL_ADJUSTMENT_ROW_COUNT = 5;
export const MANUAL_ADJUSTMENT_DESCRIPTION_MAX_LENGTH = 160;

function normalizedAmountCents(value) {
  if (value == null || value === "") return null;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return null;
  return Math.round(amount);
}

export function normalizeManualAdjustmentRows(rows) {
  const source = Array.isArray(rows) ? rows : [];
  return Array.from({ length: MANUAL_ADJUSTMENT_ROW_COUNT }, (_, index) => {
    const row = source[index] ?? {};
    return {
      index: index + 1,
      description: String(row.description ?? "").trim().slice(0, MANUAL_ADJUSTMENT_DESCRIPTION_MAX_LENGTH),
      amountCents: normalizedAmountCents(row.amountCents),
    };
  });
}

export function parseManualAdjustmentRows(value) {
  if (!value) return normalizeManualAdjustmentRows([]);
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    return normalizeManualAdjustmentRows(parsed);
  } catch {
    return normalizeManualAdjustmentRows([]);
  }
}

export function serializeManualAdjustmentRows(rows) {
  return JSON.stringify(normalizeManualAdjustmentRows(rows).map(({ index, description, amountCents }) => ({ index, description, amountCents })));
}

export function manualAdjustmentsTotalCents(rows) {
  return normalizeManualAdjustmentRows(rows).reduce((total, row) => total + Number(row.amountCents ?? 0), 0);
}
