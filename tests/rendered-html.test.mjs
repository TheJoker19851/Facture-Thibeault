import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../.vercel/output/functions/__server.func/index.mjs", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      waitUntil() {},
    },
  );
}

test("server-renders the Thibeault administration shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Thibeault · Factures et dépenses<\/title>/i);

  if (/Vérification de la version/.test(html)) {
    assert.match(html, /Mise à jour sécurisée/);
    assert.match(html, /avant d’autoriser un dépôt/);
    assert.match(html, /manifest\.webmanifest/);
    assert.doesNotMatch(html, /Alice Démo|Données de démonstration/);
    return;
  }

  if (/Vérification des permissions/.test(html)) {
    assert.match(html, /Le rôle Firebase du compte est vérifié/);
    assert.doesNotMatch(html, /Alice Démo|Données de démonstration/);
    assert.match(html, /manifest\.webmanifest/);
    return;
  }

  if (/Chargement des données comptables/.test(html)) {
    assert.match(html, /Firebase SQL Connect/);
    assert.match(html, /Les données de démonstration ne sont pas affichées en production/);
    assert.match(html, /manifest\.webmanifest/);
    return;
  }

  assert.doesNotMatch(html, /Tableau de bord/);
  assert.match(html, /Données de démonstration|Connexion Firebase…/);
  assert.match(html, /Factures à vérifier/);
  assert.match(html, /File de traitement/);
  assert.match(html, /Tableau de Kim/);
  assert.match(html, /Montant à payer/);
  assert.match(html, /Les lignes libres/);
  assert.doesNotMatch(html, /Exceptions IA/);
  assert.doesNotMatch(html, /1 · Titulaires|4 · Tableau comptable/);
  assert.match(html, /Alice Démo/);
  assert.match(html, /Période des cartes/);
  assert.match(html, /manifest\.webmanifest/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/);
});

test("exposes a direct mobile capture route and PWA manifest", async () => {
  const response = await render("/capture");
  assert.equal(response.status, 200);
  const html = await response.text();
  if (/Vérification de la version/.test(html)) {
    assert.match(html, /Mise à jour sécurisée/);
    assert.doesNotMatch(html, /Prendre la première photo/);
    const manifest = await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8");
    assert.match(manifest, /"start_url":\s*"\/capture"/);
    return;
  }
  if (/Vérification des permissions/.test(html)) {
    assert.match(html, /Accès sécurisé/);
    assert.doesNotMatch(html, /Prendre une photo/);
    return;
  }
  assert.match(html, /Photographier, envoyer\./);
  assert.match(html, /Prendre la première photo/);
  assert.match(html, /En ligne/);

  const manifest = await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8");
  assert.match(manifest, /"start_url":\s*"\/capture"/);
  assert.match(manifest, /"display":\s*"standalone"/);
  assert.match(manifest, /"icons"/);
});

test("does not retain the starter preview skeleton", async () => {
  let previewFiles = [];
  try {
    previewFiles = await readdir(new URL("../app/_sites-preview", import.meta.url));
  } catch (error) {
    assert.equal(error?.code, "ENOENT");
  }
  assert.deepEqual(previewFiles, []);
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("rejects unauthenticated direct access to privileged API routes", async () => {
  const workerUrl = new URL("../.vercel/output/functions/__server.func/index.mjs", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-api`);
  const { default: worker } = await import(workerUrl.href);
  const context = { waitUntil() {} };

  const adminResponse = await worker.fetch(new Request("http://localhost/api/admin/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  }), context);
  assert.equal(adminResponse.status, 403);

  const archiveResponse = await worker.fetch(new Request("http://localhost/api/admin/archive"), context);
  assert.equal(archiveResponse.status, 403);

  const archivePurgeResponse = await worker.fetch(new Request("http://localhost/api/admin/archive", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ confirmation: "ARCHIVE_PURGE" }),
  }), context);
  assert.equal(archivePurgeResponse.status, 403);

  const aiResponse = await worker.fetch(new Request("http://localhost/api/ai/process-invoice", {
    method: "POST",
    headers: { "x-invoice-client-version": "invoice-photo-v2" },
  }), context);
  assert.equal(aiResponse.status, 401);

  const intakeStatusResponse = await worker.fetch(new Request("http://localhost/api/invoices/intake-status?receiptId=receipt-12345678", {
    method: "GET",
    headers: { "x-invoice-client-version": "invoice-photo-v2" },
  }), context);
  assert.equal(intakeStatusResponse.status, 403);

  const discardResponse = await worker.fetch(new Request("http://localhost/api/invoices/discard-intake", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-invoice-client-version": "invoice-photo-v2",
    },
    body: JSON.stringify({ receiptId: "receipt-12345678", reason: "Facture personnelle envoyée par erreur." }),
  }), context);
  assert.equal(discardResponse.status, 403);

  const cronResponse = await worker.fetch(new Request("http://localhost/api/cron/process-invoice-intakes", {
    method: "GET",
  }), context);
  assert.equal(cronResponse.status, 401);
});

test("fails closed for an obsolete invoice client and exposes the current version", async () => {
  const workerUrl = new URL("../.vercel/output/functions/__server.func/index.mjs", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-version`);
  const { default: worker } = await import(workerUrl.href);
  const context = { waitUntil() {} };

  const obsolete = await worker.fetch(new Request("http://localhost/api/client-version?invoiceClientVersion=invoice-photo-v1"), context);
  assert.equal(obsolete.status, 426);
  assert.equal((await obsolete.json()).code, "CLIENT_UPDATE_REQUIRED");

  const current = await worker.fetch(new Request("http://localhost/api/client-version?invoiceClientVersion=invoice-photo-v2"), context);
  assert.equal(current.status, 200);
  assert.equal(current.headers.get("cache-control"), "no-store, max-age=0");
  assert.equal((await current.json()).invoiceClientVersion, "invoice-photo-v2");
});
