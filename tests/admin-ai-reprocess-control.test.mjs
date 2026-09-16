import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL("../app/components/ThibeaultApp.tsx", import.meta.url);
const mutationPath = new URL("../dataconnect/accounting/mutations.gql", import.meta.url);
const routePath = new URL("../app/api/ai/process-invoice/route.ts", import.meta.url);

test("le contrôle de relance IA est toujours rendu pour ADMIN et jamais offert à KIM", async () => {
  const source = await readFile(componentPath, "utf8");
  const controlStart = source.indexOf('{identity.role === "ADMIN" && <div className="detail-alert">');
  const controlEnd = source.indexOf("{visibleReviewMessages.length", controlStart);

  assert.ok(controlStart >= 0, "Le contrôle ADMIN doit être rendu dans la revue de facture.");
  assert.ok(controlEnd > controlStart, "La fin du contrôle ADMIN doit être détectable.");
  const control = source.slice(controlStart, controlEnd);
  assert.match(control, /Relancer l’IA/);
  assert.match(control, /disabled=\{!canAdminReanalyze \|\| retryState === "saving"\}/);
  assert.doesNotMatch(control, /KIM/);
});

test("une relance ADMIN remet le compteur IA à zéro avant la nouvelle prise en charge", async () => {
  const [mutationSource, routeSource] = await Promise.all([
    readFile(mutationPath, "utf8"),
    readFile(routePath, "utf8"),
  ]);
  const mutationStart = mutationSource.indexOf("mutation AdminReprocessInvoiceIntakeAi(");
  const mutationEnd = mutationSource.indexOf("# One server-only materialization path", mutationStart);

  assert.ok(mutationStart >= 0, "La mutation ADMIN doit exister.");
  assert.ok(mutationEnd > mutationStart, "La fin de la mutation ADMIN doit être détectable.");
  const mutation = mutationSource.slice(mutationStart, mutationEnd);
  assert.match(mutation, /processingState: "RETRY"\s+processingAttempts: 0/);
  assert.match(mutation, /aiConfidence: null\s+duplicateFingerprint: null\s+extractedVendor: null/);
  assert.match(routeSource, /intake = await readIntake\(\);\s+if \(!intake\) throw new Error\("Le dépôt de facture n'existe plus après la réanalyse ADMIN\."\);/);
});

test("la reprise technique efface aussi l'ancienne empreinte de doublon", async () => {
  const mutationSource = await readFile(mutationPath, "utf8");
  const mutationStart = mutationSource.indexOf("mutation RetryInvoiceIntakeAiReviewV2(");
  const mutationEnd = mutationSource.indexOf("# An ADMIN may deliberately", mutationStart);

  assert.ok(mutationStart >= 0, "La mutation de reprise technique doit exister.");
  assert.ok(mutationEnd > mutationStart, "La fin de la mutation de reprise doit être détectable.");
  const mutation = mutationSource.slice(mutationStart, mutationEnd);
  assert.match(mutation, /aiErrorCode: null\s+duplicateFingerprint: null\s+decisionExceptions:/);
});
