import test from "node:test";
import assert from "node:assert/strict";
import {
  buildProjectImportPlan,
  parseProjectImportJson,
  PROJECT_IMPORT_MAX_BYTES,
} from "../lib/project-import.mjs";

test("le format JSON de projets est validé et normalisé", () => {
  const result = parseProjectImportJson(JSON.stringify({
    projects: [{ number: " 26015 ", name: "Réfection usine", status: "active" }],
  }));
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.rows, [{ number: "26015", name: "Réfection usine", status: "ACTIVE" }]);
  assert.equal(PROJECT_IMPORT_MAX_BYTES, 2_000_000);
});

test("les erreurs de structure, statut, DEMO et doublon sont signalées", () => {
  const result = parseProjectImportJson(JSON.stringify({
    projects: [
      { number: "26015", name: "Projet A" },
      { number: "26015", name: "Projet B" },
      { number: "DEMO-01", name: "Projet démo" },
      { number: "26016", name: "Projet C", status: "ARCHIVED" },
    ],
  }));
  assert.equal(result.rows.length, 2, "les lignes invalides ne sont pas incluses dans le plan");
  assert.match(result.errors.join(" "), /présent.*lignes/i);
  assert.match(result.errors.join(" "), /identifiant DEMO/i);
  assert.match(result.errors.join(" "), /ACTIVE ou INACTIVE/i);
  assert.match(parseProjectImportJson("[]").errors[0], /objet/i);
});

test("le plan est non destructif et conserve les identifiants existants", () => {
  const existing = [
    { id: "legacy-26015", number: "26015", name: "Ancien nom", status: "ACTIVE" },
    { id: "legacy-26016", number: "26016", name: "Projet absent du fichier", status: "ACTIVE" },
  ];
  const parsed = parseProjectImportJson(JSON.stringify({
    projects: [
      { number: "26015", name: "Nom corrigé", status: "INACTIVE" },
      { number: "26017", name: "Nouveau projet" },
    ],
  }));
  const plan = buildProjectImportPlan(existing, parsed);

  assert.deepEqual(plan.errors, []);
  assert.deepEqual(plan.conflicts, []);
  assert.equal(plan.additions.length, 1);
  assert.equal(plan.updates.length, 1);
  assert.equal(plan.unchanged.length, 0);
  assert.equal(plan.rows.find((row) => row.number === "26015").id, "legacy-26015");
  assert.equal(plan.rows.find((row) => row.number === "26017").id, "PROJECT-26017");
  assert.equal(existing.length, 2, "le plan ne supprime pas les projets absents");
});

test("un conflit d’identifiant interne bloque le nouveau projet", () => {
  const plan = buildProjectImportPlan(
    [{ id: "PROJECT-26017", number: "autre-numero", name: "Autre projet", status: "ACTIVE" }],
    { rows: [{ number: "26017", name: "Nouveau projet", status: "ACTIVE" }], errors: [] },
  );
  assert.equal(plan.rows.length, 0);
  assert.match(plan.conflicts[0], /déjà associé/i);
});
