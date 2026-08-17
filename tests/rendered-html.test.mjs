import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Thibeault administration shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Thibeault · Factures et dépenses<\/title>/i);

  if (/Vérification des permissions/.test(html)) {
    assert.match(html, /Le rôle Firebase du compte est vérifié/);
    assert.doesNotMatch(html, /Keven Tremblay|Données de démonstration/);
    assert.match(html, /manifest\.webmanifest/);
    return;
  }

  if (/Chargement des données comptables/.test(html)) {
    assert.match(html, /Firebase SQL Connect/);
    assert.match(html, /Les données de démonstration ne sont pas affichées en production/);
    assert.match(html, /manifest\.webmanifest/);
    return;
  }

  assert.match(html, /Tableau de bord/);
  assert.match(html, /Données de démonstration|Connexion Firebase…/);
  assert.match(html, /À vérifier/);
  assert.match(html, /1 · Titulaires/);
  assert.match(html, /2 · Transactions par personne/);
  assert.match(html, /3 · Factures à corriger/);
  assert.match(html, /4 · Tableau comptable/);
  assert.match(html, /Keven Tremblay/);
  assert.match(html, /Période des cartes/);
  assert.match(html, /manifest\.webmanifest/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/);
});

test("exposes a direct mobile capture route and PWA manifest", async () => {
  const response = await render("/capture");
  assert.equal(response.status, 200);
  const html = await response.text();
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
