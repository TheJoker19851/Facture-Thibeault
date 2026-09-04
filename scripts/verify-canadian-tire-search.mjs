import { createGoogle } from "@ai-sdk/google";
import { generateText } from "ai";
import { lookupCanadianTireProducts } from "../lib/canadian-tire-sku.mjs";
import { PRODUCTION_FIREBASE_PROJECT_ID, validateFirebaseEnvironment } from "../lib/environment.mjs";
import { ACCOUNT_TYPES, PRODUCTION_ACCOUNT_DEFINITIONS } from "../lib/accounting-references.mjs";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY est absent.");
const sku = process.argv[2] || process.env.VERIFY_CANADIAN_TIRE_SKU;
if (!sku) {
  throw new Error(
    "Usage : node scripts/verify-canadian-tire-search.mjs <SKU Canadian Tire> " +
    "ou définir VERIFY_CANADIAN_TIRE_SKU.",
  );
}

const validation = validateFirebaseEnvironment({
  appEnvironment: process.env.APP_ENV,
  publicAppEnvironment: process.env.NEXT_PUBLIC_APP_ENV,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  adminProjectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  useEmulators: process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
  authEmulatorHost: process.env.FIREBASE_AUTH_EMULATOR_HOST,
  dataConnectEmulatorHost: process.env.DATA_CONNECT_EMULATOR_HOST,
  storageEmulatorHost: process.env.FIREBASE_STORAGE_EMULATOR_HOST,
  previewMode: process.env.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE,
  requireExplicit: true,
});
if (!validation.ok || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== PRODUCTION_FIREBASE_PROJECT_ID) {
  throw new Error("Le test exige la configuration Production exacte, sans émulateur.");
}

const accountLabels = PRODUCTION_ACCOUNT_DEFINITIONS
  .filter((account) => account.type === ACCOUNT_TYPES.EXPENSE)
  .map((account) => account.label);

const modelId = process.env.GEMINI_SEARCH_MODEL || process.env.GEMINI_MODEL || "gemini-3.6-flash";
const google = createGoogle({ apiKey });
const lookup = await lookupCanadianTireProducts({
  vendor: "CDN TIRE STORE 174",
  sku,
  accountLabels,
  search: async ({ prompt }) => {
    const result = await generateText({
      model: google(modelId),
      tools: { google_search: google.tools.googleSearch({}) },
      prompt,
      abortSignal: AbortSignal.timeout(30_000),
    });
    return {
      text: result.text,
      sourceUrls: result.sources.map((source) => "url" in source ? source.url : "").filter(Boolean),
    };
  },
});

const resolved = lookup.results.find((result) => result.status === "RESOLVED");
console.log(JSON.stringify({
  model: modelId,
  mode: "READ_ONLY_NO_CACHE",
  triggered: lookup.triggered,
  status: lookup.results[0]?.status ?? "NO_RESULT",
  sku: resolved?.sku ?? null,
  productLabel: resolved?.productLabel ?? null,
  category: resolved?.category ?? null,
  sourceUrl: resolved?.sourceUrl ?? null,
}, null, 2));

if (!resolved) process.exitCode = 1;
