import assert from "node:assert/strict";
import test from "node:test";
import {
  canadianTireSkusMatch,
  collectUnknownCanadianTireSkus,
  enrichCanadianTireExtraction,
  isCanadianTireMerchant,
  lookupCanadianTireProducts,
  normalizeCanadianTireSku,
} from "../lib/canadian-tire-sku.mjs";

const sourceUrl = "https://www.canadiantire.ca/en/pdp/shell-rotella-t4-0287932p.html";

test("détecte uniquement les variantes explicites de Canadian Tire", () => {
  assert.equal(isCanadianTireMerchant("CANADIAN TIRE #174"), true);
  assert.equal(isCanadianTireMerchant("CDN TIRE STORE 174"), true);
  assert.equal(isCanadianTireMerchant("Centre du pneu canadien"), false);
  assert.equal(isCanadianTireMerchant("Dollarama"), false);
});

test("rapproche le SKU à sept chiffres et son chiffre de contrôle", () => {
  assert.equal(normalizeCanadianTireSku("028-7932-6"), "0287932");
  assert.equal(canadianTireSkusMatch("0287932", "028-7932-6"), true);
  assert.equal(canadianTireSkusMatch("0287932", "028-7933-4"), false);
});

test("ne recherche que les SKU Canadian Tire inconnus", () => {
  const known = [{ merchant: "Canadian Tire", sku: "028-7932-6", accountCode: "33500", status: "VALIDATED" }];
  assert.deepEqual(collectUnknownCanadianTireSkus({ vendor: "Dollarama", sku: "0287932", skuReferences: [] }), []);
  assert.deepEqual(collectUnknownCanadianTireSkus({ vendor: "CDN TIRE STORE 174", sku: "0287932", skuReferences: known }), []);
  assert.deepEqual(collectUnknownCanadianTireSkus({
    vendor: "CDN TIRE STORE 174",
    sku: null,
    lineItems: [{ sku: "0287932" }, { sku: "038-0769-4" }],
    skuReferences: known,
  }), ["0380769"]);
});

test("déclenche Google Search pour un SKU inconnu et accepte seulement la source officielle exacte", async () => {
  let calls = 0;
  const result = await lookupCanadianTireProducts({
    vendor: "CDN TIRE STORE 174",
    sku: "0287932",
    accountLabels: ["Matériaux divers", "Entretien roulant"],
    search: async ({ skus, prompt }) => {
      calls += 1;
      assert.deepEqual(skus, ["0287932"]);
      assert.match(prompt, /uniquement sur le site officiel canadiantire\.ca/i);
      return {
        text: JSON.stringify({ results: [{
          queriedSku: "0287932",
          found: true,
          matchedSku: "028-7932-6",
          productLabel: "Huile à moteur diesel Shell Rotella T4, 18,9 L",
          category: "Entretien roulant",
          sourceUrl,
          evidence: "Le numéro d’article est affiché sur la page officielle.",
        }] }),
        sourceUrls: [sourceUrl],
      };
    },
  });

  assert.equal(calls, 1);
  assert.equal(result.triggered, true);
  assert.equal(result.results[0].status, "RESOLVED");
  assert.equal(result.results[0].category, "Entretien roulant");
});

test("refuse un résultat sans page Canadian Tire officiellement sourcée", async () => {
  const result = await lookupCanadianTireProducts({
    vendor: "Canadian Tire Chicoutimi",
    sku: "0287932",
    accountLabels: ["Entretien roulant"],
    search: async () => ({
      text: JSON.stringify({ results: [{
        queriedSku: "0287932",
        found: true,
        matchedSku: "028-7932-6",
        productLabel: "Huile moteur",
        category: "Entretien roulant",
        sourceUrl: "https://example.com/0287932",
      }] }),
      sourceUrls: ["https://example.com/0287932"],
    }),
  });
  assert.equal(result.results[0].status, "REJECTED");
  assert.equal(result.results[0].reason, "UNVERIFIED_SEARCH_RESULT");
});

test("ne contacte pas Internet pour un autre fournisseur ou une référence déjà validée", async () => {
  const search = async () => { throw new Error("La recherche ne devait pas être appelée."); };
  const otherMerchant = await lookupCanadianTireProducts({ vendor: "Home Depot", sku: "0287932", search });
  assert.equal(otherMerchant.triggered, false);

  const knownSku = await lookupCanadianTireProducts({
    vendor: "Canadian Tire",
    sku: "0287932",
    skuReferences: [{ merchant: "Canadian Tire", sku: "028-7932-6", accountCode: "33500", status: "VALIDATED" }],
    search,
  });
  assert.equal(knownSku.triggered, false);
});

test("propage un SKU de ligne résolu vers la classification globale", () => {
  const enriched = enrichCanadianTireExtraction({
    vendor: "CDN TIRE STORE 174",
    sku: null,
    category: null,
    lineItems: [{ description: "SKU 0287932", sku: "0287932", amountCents: 1000 }],
  }, [{
    sku: "0287932",
    status: "RESOLVED",
    productLabel: "Huile à moteur diesel Shell Rotella T4, 18,9 L",
    category: "Entretien roulant",
    sourceUrl,
  }]);

  assert.equal(enriched.sku, "0287932");
  assert.equal(enriched.category, "Entretien roulant");
  assert.equal(enriched.lineItems[0].description, "Huile à moteur diesel Shell Rotella T4, 18,9 L");
});

test("propage la catégorie commune de plusieurs SKU sans inventer un SKU global", () => {
  const enriched = enrichCanadianTireExtraction({
    vendor: "Canadian Tire",
    sku: null,
    category: null,
    lineItems: [
      { description: "0287932", sku: "0287932" },
      { description: "0380769", sku: "0380769" },
    ],
  }, [
    { sku: "0287932", status: "RESOLVED", productLabel: "Produit A", category: "Entretien roulant" },
    { sku: "0380769", status: "RESOLVED", productLabel: "Produit B", category: "Entretien roulant" },
  ]);

  assert.equal(enriched.sku, null);
  assert.equal(enriched.category, "Entretien roulant");
});
