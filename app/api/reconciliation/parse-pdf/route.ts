import { createHash, randomUUID } from "node:crypto";
import { createGoogle } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect, getFirebaseAdminStorage } from "../../../../firebase/admin";
import { clientUpdateRequiredResponse, isCurrentInvoiceClientVersion } from "../../../../lib/invoice-client-version.mjs";
import { transientGeminiErrorCode } from "../../../../lib/gemini-retry.mjs";
import { splitStatementPdfExtractionByCard, statementSourceFromPdfExtraction, validateStatementPdfExtraction } from "../../../../lib/reconciliation.mjs";
import { reconciliationServerAvailable } from "../../../../lib/reconciliation-access.mjs";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_PDF_BYTES = 20 * 1024 * 1024;
const PROMPT_VERSION = "statement-pdf-v3-account-vs-card";
const MODEL_TIMEOUT_MS = 55_000;

const statementPdfExtractionSchema = z.object({
  cardLastFour: z.string().nullable(),
  holderName: z.string().nullable(),
  periodStart: z.string(),
  periodEnd: z.string(),
  confidence: z.number().min(0).max(1),
  notes: z.string(),
  lines: z.array(z.object({
    sequence: z.number().int().positive(),
    cardLastFour: z.string().nullable(),
    holderName: z.string().nullable(),
    transactionDate: z.string(),
    postedDate: z.string().nullable(),
    merchantRaw: z.string(),
    amountCents: z.number().int(),
    externalReference: z.string().nullable(),
  })).min(1).max(2_000),
});

type Identity = { uid: string; role: "KIM" | "ADMIN" };

async function authenticate(request: Request): Promise<Identity | null> {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "KIM" || decoded.role === "ADMIN" ? { uid: decoded.uid, role: decoded.role } : null;
  } catch {
    return null;
  }
}

function isStoragePreconditionConflict(error: unknown) {
  const candidate = error as { code?: number | string; statusCode?: number } | null;
  return candidate?.code === 409 || candidate?.code === 412 || candidate?.code === "409" || candidate?.code === "412" || candidate?.statusCode === 409 || candidate?.statusCode === 412;
}

function hash(value: Buffer | string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeFilename(value: string) {
  const printable = Array.from(value.trim(), (character) => character.charCodeAt(0) < 32 ? "-" : character).join("");
  return printable.replace(/[\\/]/g, "-").slice(0, 255) || "releve.pdf";
}

function identityOptions(identity: Identity) {
  return { impersonate: { authClaims: { sub: identity.uid, uid: identity.uid, role: identity.role } } };
}

async function activeCards(identity: Identity) {
  type Card = { id: string; lastFour?: string | null; status?: string | null; holder?: { displayName?: string | null } | null };
  const result = await (await getFirebaseAdminDataConnect()).executeQuery<{ creditCards: Card[] }, Record<string, never>>(
    "ListCreditCards",
    {},
    identityOptions(identity),
  );
  return (result.data?.creditCards ?? []).filter((card) => card.status === "Actif" || card.status === "ACTIVE");
}

function modelInstructions(cards: Array<{ id: string; lastFour?: string | null; holder?: { displayName?: string | null } | null }>) {
  const roster = cards.map((card) => `${card.id} | •••• ${card.lastFour ?? "inconnu"} | ${card.holder?.displayName ?? "titulaire inconnu"}`).join("\n");
  return `You extract a Canadian business credit-card statement for Maçonnerie Thibeault. A PDF can be a consolidated master statement containing several employee-card sections.
Read the complete PDF and return only transactions that belong in invoice reconciliation: purchases, merchant credits/refunds, interest and card fees. Exclude payments, balance summaries, rewards summaries and carried balances.
Preserve the exact source order with sequence starting at 1. Use ISO dates YYYY-MM-DD. Return signed integer Canadian cents: purchases and fees are positive, merchant credits/refunds are negative.
For every transaction, cardLastFour and holderName must come from the nearest employee-card section or cardholder heading that governs that transaction. Repeat them on every line. cardLastFour must contain exactly the four digits printed beside a masked card number, for example **** **** ****2481 means 2481.
ACCOUNT NO., ACCOUNT NUMBER, NUMÉRO DE COMPTE and NO DE COMPTE identify the master account, not a credit card. Never turn a complete account number such as 5258 819200 339290 into cardLastFour=9290. If no masked employee-card suffix is visible for a line, return null for cardLastFour and preserve the visible holderName; never guess.
The top-level cardLastFour is null for a consolidated/master statement unless its heading explicitly prints a masked credit-card suffix. A master account number must never appear in cardLastFour at either level.
Never invent a date, merchant, amount, card number or holder. Extract the statement period exactly as printed.
The server will match each transaction against this active-card roster; use it only to disambiguate visible evidence, never to guess:
${roster}
Set confidence below 0.7 and explain the uncertainty in notes when the card, holder, period or any transaction is unclear.`;
}

async function saveJson(file: { save(data: Buffer, options: Record<string, unknown>): Promise<unknown> }, value: unknown) {
  await file.save(Buffer.from(JSON.stringify(value), "utf8"), {
    resumable: false,
    validation: "crc32c",
    metadata: { contentType: "application/json; charset=utf-8", cacheControl: "private, no-store" },
  });
}

export async function POST(request: Request) {
  if (!isCurrentInvoiceClientVersion(request.headers.get("x-invoice-client-version"))) return clientUpdateRequiredResponse();
  if (!reconciliationServerAvailable() || !firebaseAdminConfigured()) return Response.json({ error: "Le service de rapprochement n’est pas configuré pour cet environnement." }, { status: 503 });
  const identity = await authenticate(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });

  const generationId = randomUUID();
  let generationFile: { save(data: Buffer, options: Record<string, unknown>): Promise<unknown> } | null = null;
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "Ajoutez un relevé PDF." }, { status: 400 });
    const originalFilename = safeFilename(file.name);
    if (file.size <= 0 || file.size > MAX_PDF_BYTES) return Response.json({ error: "Le relevé PDF doit faire entre 1 octet et 20 Mo." }, { status: 413 });
    if (file.type !== "application/pdf" && !/\.pdf$/i.test(originalFilename)) return Response.json({ error: "Seuls les relevés PDF sont acceptés par l’analyse IA." }, { status: 415 });
    const pdfBytes = Buffer.from(await file.arrayBuffer());
    if (pdfBytes.subarray(0, 5).toString("ascii") !== "%PDF-") return Response.json({ error: "Le fichier sélectionné n’est pas un PDF valide." }, { status: 415 });

    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!bucketName) throw new Error("Le bucket Storage des relevés n’est pas configuré.");
    const bucket = (await getFirebaseAdminStorage()).bucket(bucketName);
    const fileHash = hash(pdfBytes);
    const originalStoragePath = `statements/original/${fileHash.slice(0, 2)}/${fileHash}.pdf`;
    try {
      await bucket.file(originalStoragePath).save(pdfBytes, {
        resumable: false,
        validation: "crc32c",
        preconditionOpts: { ifGenerationMatch: 0 },
        metadata: {
          contentType: "application/pdf",
          cacheControl: "private, no-store",
          metadata: { ownerUid: identity.uid, statementHash: fileHash, originalFilename },
        },
      });
    } catch (error) {
      if (!isStoragePreconditionConflict(error)) throw error;
    }

    const cards = await activeCards(identity);
    if (!cards.length) return Response.json({ error: "Aucune carte active n’est configurée pour analyser le relevé." }, { status: 422 });
    const rosterSignature = cards.map((card: { id: string; lastFour?: string | null; holder?: { displayName?: string | null } | null }) => `${card.id}:${card.lastFour ?? ""}:${card.holder?.displayName ?? ""}`).sort().join("|");
    const primaryModelId = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const fallbackModelId = process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite";
    const analysisId = hash(`${PROMPT_VERSION}|${primaryModelId}|${fileHash}|${rosterSignature}`);
    const cachePath = `statement-analysis-cache/${analysisId.slice(0, 2)}/${analysisId}.json`;
    const cacheFile = bucket.file(cachePath);
    try {
      const [cachedBytes] = await cacheFile.download();
      const cached = JSON.parse(cachedBytes.toString("utf8"));
      if (cached?.status === "COMPLETE" && cached.fileHash === fileHash && Array.isArray(cached.analyses) && cached.analyses.length > 0) {
        console.info("[statement-pdf] phase=cache_hit", { analysisId, fileHash });
        return Response.json({ ...cached, cached: true });
      }
    } catch {
      // A missing or invalid cache entry simply triggers a fresh generation.
    }

    generationFile = bucket.file(`statement-analysis-generations/${generationId}.json`);
    await saveJson(generationFile, { generationId, analysisId, fileHash, model: primaryModelId, status: "PENDING", createdAt: new Date().toISOString(), ownerUid: identity.uid });
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY est absent.");
    const google = createGoogle({ apiKey });
    const modelIds = Array.from(new Set([primaryModelId, fallbackModelId].filter(Boolean)));
    let lastError: unknown = new Error("Aucun modèle Gemini n’est configuré.");
    console.info("[statement-pdf] phase=start", { generationId, analysisId, fileHash, size: file.size });

    for (const [index, modelId] of modelIds.entries()) {
      try {
        const result = await generateText({
          model: google(modelId),
          instructions: modelInstructions(cards),
          output: Output.object({
            name: "credit_card_statement_extraction",
            description: "Structured transaction rows, including the governing card for every row, extracted from a Canadian consolidated credit-card statement PDF.",
            schema: statementPdfExtractionSchema,
          }),
          messages: [{
            role: "user",
            content: [
              { type: "text", text: `Analyze the attached statement ${originalFilename}. Return every reconcilable transaction in printed order.` },
              { type: "file", data: pdfBytes, mediaType: "application/pdf", filename: originalFilename },
            ],
          }],
          abortSignal: AbortSignal.timeout(MODEL_TIMEOUT_MS),
        });
        const validated = validateStatementPdfExtraction(result.output);
        if (validated.errors.length || !validated.extraction) {
          const validationError = new Error(validated.errors.join(" ") || "L’analyse structurée du PDF est invalide.");
          Object.assign(validationError, { retryWithFallbackModel: true });
          throw validationError;
        }
        if (validated.extraction.confidence < 0.7) throw new Error(`La confiance de l’analyse PDF est trop faible (${Math.round(validated.extraction.confidence * 100)} %). ${validated.extraction.notes}`.trim());
        const split = splitStatementPdfExtractionByCard(validated.extraction, cards);
        if (split.errors.length || !split.statements.length) {
          const cardMatchError = new Error(split.errors.join(" ") || "Aucune carte active n’a pu être associée aux transactions du relevé.");
          Object.assign(cardMatchError, { retryWithFallbackModel: true });
          throw cardMatchError;
        }
        const analyses = split.statements.map(({ cardId, extraction }) => {
          const partAnalysisId = hash(`${analysisId}|${cardId}`);
          return {
            analysisId: partAnalysisId,
            fileHash,
            statementHash: hash(`${fileHash}|${cardId}`),
            status: "COMPLETE",
            originalFilename,
            originalStoragePath,
            cardId,
            periodStart: extraction.periodStart,
            periodEnd: extraction.periodEnd,
            sourceText: statementSourceFromPdfExtraction(extraction, { cardId }),
            extraction,
          };
        });
        const completed = {
          generationId,
          analysisId,
          fileHash,
          model: modelId,
          status: "COMPLETE",
          originalFilename,
          originalStoragePath,
          periodStart: validated.extraction.periodStart,
          periodEnd: validated.extraction.periodEnd,
          extraction: validated.extraction,
          analyses,
          usage: result.usage,
          createdAt: new Date().toISOString(),
        };
        await Promise.all([
          saveJson(generationFile, completed),
          saveJson(cacheFile, completed),
          ...analyses.map((analysis) => saveJson(bucket.file(`statement-analysis-cache/${analysis.analysisId.slice(0, 2)}/${analysis.analysisId}.json`), {
            ...analysis,
            generationId,
            model: modelId,
            createdAt: completed.createdAt,
          })),
        ]);
        console.info("[statement-pdf] phase=complete", { generationId, analysisId, modelId, lineCount: validated.extraction.lines.length, cardCount: analyses.length });
        return Response.json({ ...completed, cached: false });
      } catch (error) {
        let normalizedError: unknown = error;
        if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
          const timeoutError = new Error(`Gemini n’a pas répondu dans le délai de ${MODEL_TIMEOUT_MS / 1000} secondes.`);
          Object.assign(timeoutError, { isRetryable: true });
          normalizedError = timeoutError;
        }
        lastError = normalizedError;
        const transient = transientGeminiErrorCode("GEMINI", normalizedError) === "GEMINI_TRANSIENT";
        const retryWithFallbackModel = Boolean((normalizedError as { retryWithFallbackModel?: boolean } | null)?.retryWithFallbackModel);
        console.error("[statement-pdf] phase=model_failed", { generationId, analysisId, modelId, transient, retryWithFallbackModel, message: normalizedError instanceof Error ? normalizedError.message : "unknown" });
        if ((!transient && !retryWithFallbackModel) || index === modelIds.length - 1) throw normalizedError;
      }
    }
    throw lastError;
  } catch (error) {
    const message = error instanceof Error ? error.message : "L’analyse PDF a échoué.";
    if (generationFile) await saveJson(generationFile, { generationId, status: "ERROR", error: message, updatedAt: new Date().toISOString() }).catch(() => undefined);
    console.error("[statement-pdf] phase=failed", { generationId, message });
    return Response.json({ error: message, generationId }, { status: 422 });
  }
}
