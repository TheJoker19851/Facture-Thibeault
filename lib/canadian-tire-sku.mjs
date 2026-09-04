const CANADIAN_TIRE_MERCHANT = "Canadian Tire";
const VALIDATED_REFERENCE_STATUSES = new Set(["VALIDE", "VALIDATED", "AUTO_VERIFIED"]);

function normalizedWords(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

function normalizedReferenceStatus(value) {
  return normalizedWords(value).replace(/\s+/g, "_").toUpperCase();
}

function accountCodeOf(reference) {
  return reference?.accountCode ?? reference?.expenseAccount?.number ?? null;
}

export function isCanadianTireMerchant(value) {
  const merchant = normalizedWords(value);
  return /(^| )(canadian|cdn) tire( |$)/.test(merchant);
}

/**
 * Canadian Tire exposes a seven-digit item number in product URLs and often
 * adds an eighth check digit in the displayed number. Both forms identify the
 * same product, so the cache uses the stable seven-digit item number.
 */
export function normalizeCanadianTireSku(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.length === 8 ? digits.slice(0, 7) : digits;
}

export function isCanadianTireSku(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.length === 7 || digits.length === 8;
}

export function canadianTireSkusMatch(left, right) {
  if (!isCanadianTireSku(left) || !isCanadianTireSku(right)) return false;
  return normalizeCanadianTireSku(left) === normalizeCanadianTireSku(right);
}

export function isOfficialCanadianTireUrl(value) {
  try {
    const url = new URL(String(value ?? ""));
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" && (host === "canadiantire.ca" || host.endsWith(".canadiantire.ca"));
  } catch {
    return false;
  }
}

export function hasResolvedCanadianTireReference(sku, references = []) {
  return references.some((reference) =>
    isCanadianTireMerchant(reference?.merchant) &&
    canadianTireSkusMatch(sku, reference?.sku) &&
    Boolean(accountCodeOf(reference)) &&
    VALIDATED_REFERENCE_STATUSES.has(normalizedReferenceStatus(reference?.status ?? reference?.verificationStatus)),
  );
}

export function collectUnknownCanadianTireSkus({ vendor, sku, lineItems = [], skuReferences = [], limit = 12 } = {}) {
  if (!isCanadianTireMerchant(vendor)) return [];
  const candidates = [sku, ...lineItems.map((item) => item?.sku)]
    .filter(isCanadianTireSku)
    .map(normalizeCanadianTireSku);
  return [...new Set(candidates)]
    .filter((candidate) => !hasResolvedCanadianTireReference(candidate, skuReferences))
    .slice(0, limit);
}

export function buildCanadianTireLookupPrompt({ skus, accountLabels }) {
  return `Utilise obligatoirement Google Search pour rechercher uniquement sur le site officiel canadiantire.ca les numéros d'article Canadian Tire suivants: ${skus.join(", ")}.
Chaque numéro doit correspondre exactement au numéro d'article affiché par Canadian Tire; le huitième chiffre de contrôle peut être présent ou absent.
Pour chaque numéro, trouve le nom exact du produit et l'URL officielle de sa page Canadian Tire.
Choisis ensuite la catégorie comptable la plus précise parmi cette liste seulement: ${accountLabels.join(" | ")}.
Si le produit, le numéro exact, la page officielle ou la catégorie ne peut pas être confirmé, indique found=false. N'invente aucune donnée.
Réponds uniquement avec un objet JSON valide, sans Markdown, sous cette forme:
{"results":[{"queriedSku":"0287932","found":true,"matchedSku":"028-7932-6","productLabel":"Nom exact","category":"Catégorie exacte de la liste","sourceUrl":"https://www.canadiantire.ca/...","evidence":"Courte preuve"}]}`;
}

function parseJsonObject(text) {
  const value = String(text ?? "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const first = value.indexOf("{");
  const last = value.lastIndexOf("}");
  if (first < 0 || last <= first) return null;
  try {
    const parsed = JSON.parse(value.slice(first, last + 1));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function validateCanadianTireLookupResponse({ text, sourceUrls = [], requestedSkus = [], accountLabels = [] } = {}) {
  const requested = new Set(requestedSkus.map(normalizeCanadianTireSku).filter(Boolean));
  const officialSources = sourceUrls.filter(isOfficialCanadianTireUrl);
  const accountLabelByKey = new Map(accountLabels.map((label) => [normalizedWords(label), label]));
  const payload = parseJsonObject(text);
  const rawResults = Array.isArray(payload?.results) ? payload.results : [];
  const bySku = new Map(rawResults.map((result) => [normalizeCanadianTireSku(result?.queriedSku), result]));

  return [...requested].map((requestedSku) => {
    const result = bySku.get(requestedSku);
    if (!result || result.found !== true) {
      return { requestedSku, sku: requestedSku, status: "NOT_FOUND", reason: "PRODUCT_NOT_CONFIRMED" };
    }

    const sourceUrl = String(result.sourceUrl ?? "").trim();
    const productLabel = String(result.productLabel ?? "").trim();
    const category = accountLabelByKey.get(normalizedWords(result.category));
    const exactSku = canadianTireSkusMatch(requestedSku, result.matchedSku);
    const sourceContainsSku = officialSources.some((url) => {
      try {
        return new URL(url).pathname.replace(/\D/g, "").includes(requestedSku);
      } catch {
        return false;
      }
    });
    const outputSourceContainsSku = isOfficialCanadianTireUrl(sourceUrl) && new URL(sourceUrl).pathname.replace(/\D/g, "").includes(requestedSku);

    if (!exactSku || !productLabel || !category || !outputSourceContainsSku || !sourceContainsSku) {
      return { requestedSku, sku: requestedSku, status: "REJECTED", reason: "UNVERIFIED_SEARCH_RESULT" };
    }

    return {
      requestedSku,
      sku: requestedSku,
      matchedSku: String(result.matchedSku),
      status: "RESOLVED",
      productLabel,
      category,
      sourceUrl,
      evidence: String(result.evidence ?? "").trim(),
    };
  });
}

export function enrichCanadianTireExtraction(extraction, results = []) {
  const resolved = results.filter((result) => result?.status === "RESOLVED");
  const lookupBySku = new Map(resolved.map((result) => [normalizeCanadianTireSku(result.sku), result]));
  const resolvedCategories = [...new Set(resolved.map((result) => String(result.category ?? "").trim()).filter(Boolean))];
  const soleLookup = lookupBySku.size === 1 ? lookupBySku.values().next().value : null;
  const headerLookup = lookupBySku.get(normalizeCanadianTireSku(extraction?.sku)) ?? soleLookup;

  return {
    ...extraction,
    sku: extraction?.sku ?? (soleLookup ? String(soleLookup.sku) : null),
    category: headerLookup
      ? String(headerLookup.category)
      : resolvedCategories.length === 1
        ? resolvedCategories[0]
        : extraction?.category,
    lineItems: Array.isArray(extraction?.lineItems)
      ? extraction.lineItems.map((item) => {
        const lookup = lookupBySku.get(normalizeCanadianTireSku(item?.sku));
        if (!lookup) return item;
        const description = String(item?.description ?? "");
        const descriptionWithoutGenericWords = description.replace(/\b(sku|article|item|code|produit)\b/gi, "");
        const descriptionIsSkuOnly = normalizeCanadianTireSku(description) === String(lookup.sku) && !/[a-z]/i.test(descriptionWithoutGenericWords);
        return {
          ...item,
          description: descriptionIsSkuOnly ? String(lookup.productLabel) : description,
          category: String(lookup.category),
        };
      })
      : [],
  };
}

/**
 * @param {{
 *   vendor?: unknown,
 *   sku?: unknown,
 *   lineItems?: Array<{sku?: unknown}>,
 *   skuReferences?: Array<Record<string, any>>,
 *   accountLabels?: string[],
 *   search?: (input: {skus: string[], prompt: string}) => Promise<{text?: string, sourceUrls?: string[]}>
 * }} options
 */
export async function lookupCanadianTireProducts({ vendor, sku, lineItems = [], skuReferences = [], accountLabels = [], search } = {}) {
  const skus = collectUnknownCanadianTireSkus({ vendor, sku, lineItems, skuReferences });
  if (!isCanadianTireMerchant(vendor) || !skus.length) {
    return { triggered: false, merchant: isCanadianTireMerchant(vendor) ? CANADIAN_TIRE_MERCHANT : null, results: [] };
  }
  if (typeof search !== "function") throw new Error("Le service de recherche Canadian Tire n'est pas configuré.");

  const response = await search({
    skus,
    prompt: buildCanadianTireLookupPrompt({ skus, accountLabels }),
  });
  return {
    triggered: true,
    merchant: CANADIAN_TIRE_MERCHANT,
    results: validateCanadianTireLookupResponse({
      text: response?.text,
      sourceUrls: response?.sourceUrls,
      requestedSkus: skus,
      accountLabels,
    }),
  };
}

export { CANADIAN_TIRE_MERCHANT };
