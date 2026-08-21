const PROJECT_NUMBER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;
const PROJECT_STATUSES = new Set(["ACTIVE", "INACTIVE"]);
export const PROJECT_IMPORT_MAX_BYTES = 2_000_000;

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function projectImportId(number) {
  return `PROJECT-${number}`;
}

function normalizeProjectRow(value, index) {
  const path = `projects[${index}]`;
  if (!isObject(value)) return { row: null, errors: [`${path} doit être un objet.`] };

  const number = String(value.number ?? "").trim();
  const name = String(value.name ?? "").trim();
  const status = String(value.status ?? "ACTIVE").trim().toUpperCase();
  const errors = [];

  if (!number) errors.push(`${path}.number est requis.`);
  else if (!PROJECT_NUMBER_PATTERN.test(number)) errors.push(`${path}.number doit respecter le format des numéros de projet existants.`);
  if (/^DEMO[-_]/i.test(number)) errors.push(`${path}.number ne peut pas utiliser un identifiant DEMO.`);
  if (!name) errors.push(`${path}.name est requis.`);
  else if (name.length > 160) errors.push(`${path}.name ne peut pas dépasser 160 caractères.`);
  if (!PROJECT_STATUSES.has(status)) errors.push(`${path}.status doit être ACTIVE ou INACTIVE.`);

  return {
    row: errors.length > 0 ? null : { number, name, status },
    errors,
  };
}

/**
 * Parses the supported import envelope:
 * { "projects": [{ "number": "26015", "name": "...", "status": "ACTIVE" }] }
 */
export function parseProjectImportJson(value) {
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return { rows: [], errors: ["Le fichier n’est pas un JSON valide."] };
    }
  }

  if (!isObject(parsed)) return { rows: [], errors: ["Le JSON doit contenir un objet avec une propriété projects."] };
  if (!Array.isArray(parsed.projects)) return { rows: [], errors: ["La propriété projects doit être un tableau."] };
  if (parsed.projects.length === 0) return { rows: [], errors: ["Le fichier doit contenir au moins un projet."] };

  const rows = [];
  const errors = [];
  const seenNumbers = new Map();
  parsed.projects.forEach((value, index) => {
    const result = normalizeProjectRow(value, index);
    errors.push(...result.errors);
    if (!result.row) return;
    const previousIndex = seenNumbers.get(result.row.number);
    if (previousIndex != null) {
      errors.push(`Le numéro de projet ${result.row.number} est présent aux lignes ${previousIndex + 1} et ${index + 1}.`);
    } else {
      seenNumbers.set(result.row.number, index);
    }
    rows.push(result.row);
  });

  return { rows, errors };
}

function sameProject(left, right) {
  return left.number === right.number
    && left.name === right.name
    && (left.status ?? "ACTIVE") === right.status;
}

/**
 * Builds a non-destructive plan. Existing IDs are preserved when a project
 * number already exists; missing numbers are never turned into deletions.
 * @param {Array<any>} existingProjects
 * @param {any} parsedImport
 */
export function buildProjectImportPlan(existingProjects = [], parsedImport = { rows: [], errors: [] }) {
  const importRows = Array.isArray(parsedImport) ? parsedImport : parsedImport.rows ?? [];
  const errors = Array.isArray(parsedImport) ? [] : [...(parsedImport.errors ?? [])];
  const conflicts = [];
  const additions = [];
  const updates = [];
  const unchanged = [];
  const rows = [];
  const byNumber = new Map();
  const byId = new Map();

  for (const existing of existingProjects) {
    const number = String(existing.number ?? "").trim();
    if (!number) continue;
    if (byNumber.has(number)) {
      conflicts.push(`Le référentiel contient déjà plusieurs projets avec le numéro ${number}.`);
    } else {
      byNumber.set(number, existing);
    }
    if (existing.id) byId.set(existing.id, existing);
  }

  const seenImportNumbers = new Set();
  for (const importRow of importRows) {
    const number = String(importRow.number ?? "").trim();
    if (seenImportNumbers.has(number)) continue;
    seenImportNumbers.add(number);

    const existing = byNumber.get(number);
    const id = existing?.id ?? projectImportId(number);
    const idOwner = byId.get(id);
    if (idOwner && idOwner.number !== number) {
      conflicts.push(`L’identifiant interne ${id} est déjà associé au projet ${idOwner.number}.`);
      continue;
    }

    const next = { id, number, name: String(importRow.name ?? "").trim(), status: String(importRow.status ?? "ACTIVE").trim().toUpperCase() };
    rows.push(next);
    if (!existing) additions.push(next);
    else if (sameProject(existing, next)) unchanged.push(next);
    else updates.push({ before: existing, after: next });
  }

  return { rows, additions, updates, unchanged, conflicts, errors };
}
