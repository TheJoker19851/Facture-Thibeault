import { generateText, Output } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminDataConnect, verifyFirebaseIdToken } from "../../../../firebase/admin";
import { materializeInvoiceIntake, readInvoiceIntakeStoragePhotos } from "../../../../firebase/invoice-intake-commit.server";
import {
  listAllCreditCards,
  listAllExpenseAccounts,
  listAllExpenseTransactions,
  listAllInvoiceIntakes,
  listAllProjects,
  listAllSkuReferences,
  listAllUserProfiles,
} from "../../../../firebase/accounting-pagination.server";
import { inferApplicationEnvironment } from "../../../../lib/environment.mjs";
import {
  AI_MAX_ATTEMPTS_REACHED,
  decisionChecksAtMaxAttempts,
  decisionExceptionsAtMaxAttempts,
  hasReachedInvoiceAiMaxAttempts,
  invoiceAiMaxAttempts,
  isTransientGeminiCapacityRetry,
  transientGeminiErrorCode,
} from "../../../../lib/gemini-retry.mjs";
import { clientUpdateRequiredResponse, isCurrentInvoiceClientVersion } from "../../../../lib/invoice-client-version.mjs";
import { applyCardholderRestaurantPolicy, classifyInvoice, classifyInvoiceLineItems, validateInvoiceExtraction } from "../../../../lib/invoice-processing.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import {
  buildInvoiceBusinessFingerprint,
  buildInvoiceSourceHash,
  exactDuplicateDecision,
  findDefiniteTransactionDuplicate,
} from "../../../../lib/invoice-duplicates.mjs";
import {
  DEFAULT_INVOICE_AI_MIN_CONFIDENCE,
  decideInvoice,
  findPotentialDuplicates,
  resolveUploaderCards,
  serializeDecisionChecks,
  serializeDecisionExceptions,
} from "../../../../lib/invoice-decision-engine.mjs";
import { canAdminReprocessInvoiceIntake, isAutomaticPostingSettled, isRetryableUnextractedAiFailure } from "../../../../lib/invoice-queue.mjs";

export const runtime = "nodejs";
export const maxDuration = 120;
const GEMINI_TIMEOUT_MS = 90_000;

const ALLOWED_ROLES = new Set(["WORKER", "KIM", "ADMIN"]);
const AI_PROCESSING_ERROR_MESSAGE = "Le traitement IA a échoué; la facture doit être vérifiée manuellement.";

const invoiceLineItemSchema = z.object({
  description: z.string().trim().min(1),
  quantity: z.number().positive(),
  // A coupon, rebate, credit or return is represented as a signed line.
  unitPriceCents: z.number().int().nullable(),
  amountCents: z.number().int(),
  sku: z.string().trim().nullable(),
  category: z.string().trim().nullable(),
});

const invoiceExtractionSchema = z.object({
  vendor: z.string(),
  invoiceNumber: z.string().nullable(),
  invoiceDate: z.string().nullable(),
  subtotalCents: z.number().int().nonnegative(),
  tpsCents: z.number().int().nonnegative(),
  tvqCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
  currency: z.string(),
  sku: z.string().nullable(),
  isRestaurant: z.boolean(),
  category: z.string().nullable(),
  projectId: z.string().nullable(),
  lineItems: z.array(invoiceLineItemSchema).max(100).default([]),
  confidence: z.number().min(0).max(1),
  notes: z.string(),
});

type AuthenticatedIdentity = {
  uid: string;
  role: "WORKER" | "KIM" | "ADMIN";
  internal?: boolean;
};

type IntakeData = {
  invoiceIntakes: Array<{
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    processingStatus?: string | null;
    processingState?: string | null;
    processingAttempts?: number | null;
    lastAttemptAt?: string | null;
    accountingStatus?: string | null;
    lastError?: string | null;
    aiErrorCode?: string | null;
    aiModel?: string | null;
    decisionExceptions?: string | null;
    decisionChecks?: string | null;
    sourceHash?: string | null;
    duplicateFingerprint?: string | null;
    duplicateOfReceiptId?: string | null;
    duplicateReason?: string | null;
  }>;
};

type IntakeMutationData = {
  invoiceIntake_updateMany: number;
};

type NormalizedExtraction = {
  vendor: string;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  subtotalCents: number;
  tpsCents: number;
  tvqCents: number;
  totalCents: number;
  currency: string;
  sku: string | null;
  isRestaurant: boolean;
  projectId: string | null;
  lineItems: Array<Record<string, unknown>>;
  lineItemsSubtotalCents: number;
  lineItemsMatchSubtotal: boolean;
};

async function authenticate(request: Request): Promise<AuthenticatedIdentity | null> {
  const workerSecret = request.headers.get("x-invoice-worker-secret");
  const configuredWorkerSecret = process.env.INVOICE_WORKER_SECRET || process.env.CRON_SECRET;
  if (workerSecret && configuredWorkerSecret && workerSecret === configuredWorkerSecret) {
    return { uid: "invoice-worker", role: "ADMIN", internal: true };
  }
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await verifyFirebaseIdToken(token, "invoice_process");
    if (!decoded) return null;
    if (typeof decoded.role !== "string" || !ALLOWED_ROLES.has(decoded.role)) return null;
    return { uid: decoded.uid, role: decoded.role as AuthenticatedIdentity["role"] };
  } catch {
    return null;
  }
}

const baseInstructions = `You are the production invoice intake agent for Maçonnerie Thibeault.
Read all supplied photos as pages of one invoice. Extract only information visible in the document.
Inspect each photo at its original resolution. Mentally rotate or straighten it when needed, then re-check the merchant header, invoice date and printed totals before returning the result.
Never invent a value: use null for a missing invoice number, date, SKU or project.
Return monetary values as integer Canadian cents. Use ISO date YYYY-MM-DD when the date is readable.
The subtotal plus TPS plus TVQ must equal the total; if a value is unclear, lower confidence and explain it in notes.
Read every visible line item. Return its description, quantity, unit price when visible, amount before tax, SKU/code when visible, and a category suggestion only when the document supports it. If the receipt only prints a tax-included line amount or unit price but also prints a coherent subtotal and taxes, allocate amountCents before tax and return null for unitPriceCents unless a pre-tax unit price is explicitly shown.
Represent discounts, coupons, rebates, credits and returns as visible lines with negative unitPriceCents and amountCents; never omit them or turn them into positive amounts. The signed line amounts must add up to the net invoice subtotal after those adjustments. If no line detail is visible, return an empty lineItems array and explain that limitation in notes.
Use category only as a suggestion. Do not invent an accounting account or approve the invoice.
Set isRestaurant to true only when the visible merchant or receipt evidence identifies a restaurant, fast-food counter, cafe or meal service. Otherwise set it to false.
Keep vendor names and invoice numbers faithful to the document, including accents and punctuation.`;

function invoiceInstructions(accountLabels: string[]) {
  const labels = [...new Set(accountLabels.map((label) => label.trim()).filter(Boolean))];
  if (!labels.length) return baseInstructions;
  return `${baseInstructions}
Choose the category from this active expense-account label list when a label is supported by the visible items: ${labels.join(" | ")}.
If the receipt is a miscellaneous retail purchase and no more specific label is justified, use "Divers" when it is present in the list.
For restaurant, fast-food, cafe or meal receipts, use "Voyage et pension" when it is present in the list. The server applies the final cardholder-specific restaurant policy.
Return category null only when no useful item or category evidence is visible.`;
}

function localMockExtraction(receiptId: string) {
  return {
    vendor: "Fournisseur Démo",
    invoiceNumber: `DEMO-${receiptId.slice(0, 8).toUpperCase()}`,
    invoiceDate: "2026-08-17",
    subtotalCents: 10000,
    tpsCents: 500,
    tvqCents: 998,
    totalCents: 11498,
    currency: "CAD",
    sku: "DEMO-SKU-001",
    isRestaurant: false,
    category: "Matériaux Démo",
    projectId: "DEMO-PROJET-001",
    lineItems: [{ description: "Article de démonstration", quantity: 1, unitPriceCents: 10000, amountCents: 10000, sku: "DEMO-SKU-001", category: "Matériaux Démo" }],
    confidence: 0.75,
    notes: "Résultat IA simulé pour le projet Firebase demo-* local.",
  };
}

function confidenceThreshold() {
  const configured = Number(process.env.INVOICE_AI_MIN_CONFIDENCE ?? DEFAULT_INVOICE_AI_MIN_CONFIDENCE);
  return Number.isFinite(configured) ? Math.min(1, Math.max(0, configured)) : DEFAULT_INVOICE_AI_MIN_CONFIDENCE;
}

function stateOf(intake: IntakeData["invoiceIntakes"][number]) {
  return {
    processingStatus: intake.processingStatus ?? "PROCESSING",
    processingState: intake.processingState ?? "QUEUED",
    processingAttempts: intake.processingAttempts ?? 0,
    lastAttemptAt: intake.lastAttemptAt ?? null,
    accountingStatus: intake.accountingStatus ?? "NOT_POSTED",
    ...(intake.aiErrorCode ? { aiErrorCode: intake.aiErrorCode } : {}),
    ...(intake.lastError ? { lastError: intake.lastError } : {}),
  };
}

function existingIntakeResponse(receiptId: string, intake: IntakeData["invoiceIntakes"][number]) {
  return Response.json({
    ok: true,
    idempotent: true,
    receiptId,
    state: stateOf(intake),
  });
}

function isStableIntakeState(intake: IntakeData["invoiceIntakes"][number]) {
  return intake.accountingStatus === "POSTED" || (
    intake.processingStatus &&
    intake.processingStatus !== "PROCESSING" &&
    intake.accountingStatus !== "POSTING_ERROR"
  );
}

function activeDuplicateOwner(
  intakes: IntakeData["invoiceIntakes"],
  receiptId: string,
  field: "sourceHash" | "duplicateFingerprint",
  value: string,
) {
  return intakes.find((candidate) => (
    candidate.receiptId !== receiptId &&
    candidate[field] === value &&
    candidate.processingStatus !== "DELETED" &&
    candidate.processingStatus !== "DUPLICATE"
  )) ?? null;
}

async function markExactDuplicate(
  dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>>,
  identity: AuthenticatedIdentity,
  receiptId: string,
  duplicateOfReceiptId: string,
  duplicateReason: "SOURCE_HASH" | "BUSINESS_FINGERPRINT" | "POSTED_TRANSACTION",
) {
  const decision = exactDuplicateDecision(duplicateOfReceiptId, duplicateReason);
  const message = decision.exceptions[0].message;
  const result = await dataConnect.executeMutation<IntakeMutationData, Record<string, unknown>>("MarkInvoiceIntakeDuplicate", {
    receiptId,
    duplicateOfReceiptId,
    duplicateReason,
    message,
    decisionExceptions: serializeDecisionExceptions(decision.exceptions),
    decisionChecks: serializeDecisionChecks(decision.checks),
    actorUid: identity.uid,
    actorRole: identity.role,
    auditEventId: auditEventId(receiptId, AUDIT_ACTIONS.INVOICE_DUPLICATE_REJECTED),
    auditDetails: auditDetails({ duplicateOfReceiptId, duplicateReason }),
  });
  if (result.data.invoiceIntake_updateMany !== 1) throw new Error("Le doublon exact n’a pas pu être écarté.");
  console.info("[invoice-ai] phase=duplicate_rejected", { duplicateReason });
  return Response.json({
    ok: true,
    receiptId,
    duplicate: true,
    decision,
    state: {
      processingStatus: "DUPLICATE",
      processingState: "COMPLETED",
      accountingStatus: "NOT_POSTED",
      lastError: message,
    },
  });
}

function hasManualAiRetryableError(intake: IntakeData["invoiceIntakes"][number], maxAttempts: number) {
  if (
    intake.processingStatus !== "NEEDS_REVIEW" ||
    intake.processingState !== "FAILED" ||
    intake.accountingStatus !== "NOT_POSTED" ||
    intake.lastError !== AI_PROCESSING_ERROR_MESSAGE ||
    intake.aiModel ||
    Number(intake.processingAttempts ?? 0) >= maxAttempts
  ) return false;
  try {
    const exceptions = JSON.parse(intake.decisionExceptions ?? "[]");
    return Array.isArray(exceptions) && exceptions.some((exception) => exception?.code === "AI_PROCESSING_ERROR");
  } catch {
    return false;
  }
}

async function extractInvoice(receiptId: string, files: File[], accountLabels: string[] = []) {
  const environment = inferApplicationEnvironment({
    appEnvironment: process.env.APP_ENV ?? process.env.NEXT_PUBLIC_APP_ENV,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    useEmulators: process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
  });
  const aiMode = process.env.INVOICE_AI_MODE ?? (environment === "local" ? "mock" : "live");
  if (aiMode === "mock") {
    if (environment !== "local") throw new Error("Le mode IA simulé est interdit hors de l'émulateur local.");
    return { model: "demo-mock", extraction: localMockExtraction(receiptId) };
  }

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY est absent.");
  const primaryModelId = process.env.GEMINI_MODEL || "gemini-3.6-flash";
  const fallbackModelId = process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite";
  const modelIds = Array.from(new Set([primaryModelId, fallbackModelId].filter(Boolean)));
  const perModelTimeoutMs = modelIds.length > 1 ? 55_000 : GEMINI_TIMEOUT_MS;
  const google = createGoogle({ apiKey });
  const imageParts = await Promise.all(files.map(async (file) => ({
    type: "file" as const,
    data: Buffer.from(await file.arrayBuffer()),
    mediaType: file.type,
  })));
  let lastError: unknown = new Error("Aucun modèle Gemini n'est configuré.");
  for (const [index, modelId] of modelIds.entries()) {
    try {
      const result = await generateText({
        model: google(modelId),
        instructions: invoiceInstructions(accountLabels),
        output: Output.object({
          name: "invoice_extraction",
          description: "Structured OCR result for one Canadian invoice.",
          schema: invoiceExtractionSchema,
        }),
        messages: [{
          role: "user",
          content: [{
            type: "text",
            text: `Receipt ID ${receiptId}. These are ${files.length} page(s) of the same invoice. Extract the invoice now.`,
          }, ...imageParts],
        }],
        abortSignal: AbortSignal.timeout(perModelTimeoutMs),
      });
      const candidateValidation = validateInvoiceExtraction(result.output);
      if (!candidateValidation.ok) {
        console.warn("[invoice-ai] phase=model_output_invalid", {
          receiptId,
          modelId,
          errors: candidateValidation.errors.slice(0, 10),
        });
        if (index < modelIds.length - 1) {
          console.warn("[invoice-ai] phase=model_fallback", {
            receiptId,
            fromModelId: modelId,
            toModelId: modelIds[index + 1],
            reason: "INVALID_OUTPUT",
          });
          continue;
        }
      }
      return { model: modelId, extraction: result.output };
    } catch (error) {
      let normalizedError: unknown = error;
      if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
        const timeoutError = new Error(`Gemini n’a pas répondu dans le délai de ${perModelTimeoutMs / 1000} secondes.`);
        Object.assign(timeoutError, { isRetryable: true });
        normalizedError = timeoutError;
      }
      lastError = normalizedError;
      const transient = transientGeminiErrorCode("GEMINI", normalizedError) === "GEMINI_TRANSIENT";
      console.error("[invoice-ai] phase=model_failed", {
        receiptId,
        modelId,
        transient,
        message: normalizedError instanceof Error ? normalizedError.message : "unknown",
      });
      if (!transient || index === modelIds.length - 1) throw normalizedError;
      console.warn("[invoice-ai] phase=model_fallback", {
        receiptId,
        fromModelId: modelId,
        toModelId: modelIds[index + 1],
      });
    }
  }
  throw lastError;
}

export async function POST(request: Request) {
  let receiptIdForLog = "unknown";
  let ownedIntake = false;
  let autoCommitAttempted = false;
  let processingClaimed = false;
  let transientGeminiFailure = false;
  let identityForAudit: AuthenticatedIdentity | null = null;
  let dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>> | null = null;
  try {
    if (!isCurrentInvoiceClientVersion(request.headers.get("x-invoice-client-version"))) {
      return clientUpdateRequiredResponse();
    }
    const hasWorkerSecret = Boolean(request.headers.get("x-invoice-worker-secret"));
    const hasBearerToken = Boolean(request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1]);
    if (!hasWorkerSecret && !hasBearerToken) {
      return Response.json({ error: "Authentification Firebase requise." }, { status: 401 });
    }
    if (!firebaseAdminConfigured()) {
      console.error("[invoice-ai] phase=configuration_failed reason=FIREBASE_ADMIN_MISSING");
      return Response.json({ error: "Firebase Admin n'est pas configuré pour cet environnement." }, { status: 503 });
    }
    const identity = await authenticate(request);
    if (!identity) return Response.json({ error: "Authentification Firebase requise." }, { status: 401 });
    identityForAudit = identity;

    const formData = await request.formData();
    const receiptId = formData.get("receiptId");
    const forceReprocess = formData.get("forceReprocess") === "ADMIN_TEST";
    if (typeof receiptId !== "string" || !/^[a-zA-Z0-9_-]{8,128}$/.test(receiptId)) {
      return Response.json({ error: "Identifiant de facture invalide." }, { status: 400 });
    }
    receiptIdForLog = receiptId;

    dataConnect = await getFirebaseAdminDataConnect();
    console.info("[invoice-ai] phase=data_connect_ready");
    const readIntake = async () => {
      const intakes = await listAllInvoiceIntakes(dataConnect!);
      return intakes.find((item) => item.receiptId === receiptId) ?? null;
    };
    let intake = await readIntake();
    console.info("[invoice-ai] phase=intake_read", { found: Boolean(intake) });
    if (!intake) return Response.json({ error: "Le dépôt de facture n'existe pas." }, { status: 404 });
    const canReview = identity.role === "KIM" || identity.role === "ADMIN";
    if (forceReprocess && (identity.internal || identity.role !== "ADMIN")) {
      return Response.json({ error: "La réanalyse forcée est réservée à un administrateur authentifié." }, { status: 403 });
    }
    if (!identity.internal && !canReview && intake.uploaderUid !== identity.uid) {
      return Response.json({ error: "Ce dépôt appartient à un autre utilisateur." }, { status: 403 });
    }
    ownedIntake = true;
    const maxAttempts = invoiceAiMaxAttempts();

    if (forceReprocess) {
      if (!canAdminReprocessInvoiceIntake(intake)) {
        return Response.json({ error: "Cette facture ne peut pas être relancée pendant un traitement actif, après comptabilisation ou après suppression." }, { status: 409 });
      }
      let reprocess: { data: IntakeMutationData };
      try {
        reprocess = await dataConnect.executeMutation<IntakeMutationData, {
          receiptId: string;
          currentProcessingStatus: string;
          currentProcessingState: string;
          currentProcessingAttempts: number;
          actorUid: string;
          actorRole: string;
          auditEventId: string;
          auditDetails: string;
        }>(
          "AdminReprocessInvoiceIntakeAi",
          {
            receiptId,
            currentProcessingStatus: intake.processingStatus ?? "NEEDS_REVIEW",
            currentProcessingState: intake.processingState ?? "COMPLETED",
            currentProcessingAttempts: Number(intake.processingAttempts ?? 0),
            actorUid: identity.uid,
            actorRole: identity.role,
            auditEventId: auditEventId(receiptId, AUDIT_ACTIONS.AI_REANALYSIS_REQUESTED, String(Date.now())),
            auditDetails: auditDetails({ source: "ADMIN_TEST", previousProcessingStatus: intake.processingStatus ?? null, previousProcessingState: intake.processingState ?? null }),
          },
        );
      } catch (error) {
        const latest = await readIntake();
        console.error("[invoice-ai] phase=admin_reprocess_failed", {
          receiptId,
          message: error instanceof Error ? error.message : "unknown",
        });
        if (latest && (latest.processingState === "RETRY" || latest.processingState === "RUNNING" || latest.accountingStatus === "POSTED")) {
          return existingIntakeResponse(receiptId, latest);
        }
        throw error;
      }
      if (reprocess.data.invoiceIntake_updateMany !== 1) {
        const latest = await readIntake();
        if (latest && (latest.processingState === "RETRY" || latest.processingState === "RUNNING" || latest.accountingStatus === "POSTED")) {
          return existingIntakeResponse(receiptId, latest);
        }
        throw new Error("Le dépôt de facture n'existe plus pendant la réanalyse ADMIN.");
      }
      intake = await readIntake();
      if (!intake) throw new Error("Le dépôt de facture n'existe plus après la réanalyse ADMIN.");
    }

    // A posted/validated/reviewed intake is already owned by the existing
    // result. Only a verified transient Gemini error or POSTING_ERROR can be
    // deliberately reopened, and each reopen is a database compare-and-set.
    const transientGeminiRetry = !forceReprocess && isTransientGeminiCapacityRetry(intake);
    const manualAiRetry = !forceReprocess && !identity.internal && canReview && hasManualAiRetryableError(intake, maxAttempts);
    const automaticTechnicalRetry = !forceReprocess && identity.internal && !transientGeminiRetry && isRetryableUnextractedAiFailure(intake, maxAttempts);
    if (!forceReprocess && isStableIntakeState(intake) && !transientGeminiRetry && !manualAiRetry && !automaticTechnicalRetry) return existingIntakeResponse(receiptId, intake);
    if (transientGeminiRetry && hasReachedInvoiceAiMaxAttempts(intake, maxAttempts)) {
      const currentAttempts = Number(intake.processingAttempts ?? 0);
      const decisionExceptions = decisionExceptionsAtMaxAttempts(intake.decisionExceptions, maxAttempts);
      const decisionChecks = decisionChecksAtMaxAttempts(intake.decisionChecks, maxAttempts);
      try {
        const maxAttemptsResult = await dataConnect.executeMutation<IntakeMutationData, Record<string, unknown>>(
          "MarkInvoiceIntakeAiMaxAttempts",
          {
            receiptId,
            currentAttempts,
            decisionExceptions,
            decisionChecks,
            actorUid: identity.uid,
            actorRole: identity.role,
            writeAudit: true,
            auditEventId: auditEventId(receiptId, AUDIT_ACTIONS.AI_MAX_ATTEMPTS_REACHED),
            auditDetails: auditDetails({
              reason: AI_MAX_ATTEMPTS_REACHED,
              maxAttempts,
              processingAttempts: currentAttempts,
              lastError: intake.lastError ?? null,
            }),
          },
        );
        if (maxAttemptsResult.data.invoiceIntake_updateMany !== 1) throw new Error("La limite de tentatives n’a pas été enregistrée.");
      } catch (error) {
        const latest = await readIntake();
        if (latest) return existingIntakeResponse(receiptId, latest);
        throw error;
      }
      const finalized = await readIntake();
      return Response.json({
        ok: false,
        receiptId,
        code: AI_MAX_ATTEMPTS_REACHED,
        error: "Le traitement IA a atteint sa limite de tentatives; une intervention humaine est requise.",
        maxAttempts,
        state: stateOf(finalized ?? intake),
      }, { status: 422 });
    }
    if (manualAiRetry || automaticTechnicalRetry) {
      let retry: { data: IntakeMutationData };
      try {
        retry = await dataConnect.executeMutation<IntakeMutationData, {
          receiptId: string;
          currentAttempts: number;
          maxAttempts: number;
        }>(
          "RetryInvoiceIntakeAiReviewV2",
          {
            receiptId,
            currentAttempts: Number(intake.processingAttempts ?? 0),
            maxAttempts,
          },
        );
      } catch (error) {
        const latest = await readIntake();
        console.error("[invoice-ai] phase=technical_retry_failed", {
          receiptId,
          message: error instanceof Error ? error.message : "unknown",
        });
        if (latest && (latest.processingState === "RETRY" || latest.processingState === "RUNNING" || latest.accountingStatus === "POSTED")) {
          return existingIntakeResponse(receiptId, latest);
        }
        throw error;
      }
      if (retry.data.invoiceIntake_updateMany !== 1) {
        const latest = await readIntake();
        if (latest && (latest.processingState === "RETRY" || latest.processingState === "RUNNING" || latest.accountingStatus === "POSTED")) {
          return existingIntakeResponse(receiptId, latest);
        }
        throw new Error("Le dépôt de facture n'existe plus pendant le retry technique.");
      }
    }
    if (transientGeminiRetry || intake.accountingStatus === "POSTING_ERROR") {
      let retry: { data: IntakeMutationData };
      try {
        retry = transientGeminiRetry
          ? await dataConnect.executeMutation<IntakeMutationData, { receiptId: string; invoiceId: string; storageFolder: string }>(
            "RetryInvoiceIntakeAiTransientV2",
            { receiptId, invoiceId: `INV-${receiptId}`, storageFolder: intake.storageFolder },
          )
          : await dataConnect.executeMutation<IntakeMutationData, { receiptId: string }>("RetryInvoiceIntakeAi", { receiptId });
      } catch (error) {
        const latest = await readIntake();
        console.error("[invoice-ai] phase=controlled_retry_failed", {
          receiptId,
          message: error instanceof Error ? error.message : "unknown",
        });
        // Another request may already have claimed the controlled retry.
        // Never convert that winner into a new AI error.
        if (latest && (latest.processingStatus === "PROCESSING" || latest.accountingStatus === "POSTED")) {
          return existingIntakeResponse(receiptId, latest);
        }
        throw error;
      }
      if (retry.data.invoiceIntake_updateMany !== 1) {
        const latest = await readIntake();
        if (latest && (latest.processingStatus === "PROCESSING" || latest.accountingStatus === "POSTED")) {
          return existingIntakeResponse(receiptId, latest);
        }
        throw new Error("Le dépôt de facture n'existe plus pendant le retry.");
      }
    }

    let claim: { data: IntakeMutationData } | null;
    try {
      claim = await dataConnect.executeMutation<IntakeMutationData, { receiptId: string; processingAttempts: number; maxAttempts: number }>(
        "ClaimInvoiceIntakeProcessing",
        { receiptId, processingAttempts: Number(intake.processingAttempts ?? 0) + 1, maxAttempts },
      );
    } catch (error) {
      console.error("[invoice-ai] phase=claim_failed", {
        receiptId,
        message: error instanceof Error ? error.message : "unknown",
      });
      claim = null;
    }
    console.info("[invoice-ai] phase=claim_finished", { claimed: Boolean(claim?.data.invoiceIntake_updateMany === 1) });
    if (!claim || claim.data.invoiceIntake_updateMany !== 1) {
      const latest = await readIntake();
      if (latest && (latest.processingState === "RETRY" || latest.processingState === "RUNNING" || latest.accountingStatus === "POSTED")) {
        return existingIntakeResponse(receiptId, latest);
      }
      throw new Error("Le traitement serveur n’a pas pu prendre en charge l’intake.");
    }
    processingClaimed = true;

    const [storedPhotos, [skuReferences, expenseAccounts, creditCards, userProfiles, projects, transactionResponse]] = await Promise.all([
      readInvoiceIntakeStoragePhotos(intake),
      Promise.all([
        listAllSkuReferences(dataConnect),
        listAllExpenseAccounts(dataConnect),
        listAllCreditCards(dataConnect),
        listAllUserProfiles(dataConnect),
        listAllProjects(dataConnect),
        listAllExpenseTransactions(dataConnect),
      ]),
    ]);
    console.info("[invoice-ai] phase=references_and_storage_ready", { photoCount: storedPhotos.length });
    const sourceHash = await buildInvoiceSourceHash(storedPhotos.map((photo) => photo.file));
    if (intake.sourceHash && intake.sourceHash !== sourceHash) {
      throw new Error("L’empreinte des photos ne correspond plus au dépôt déjà enregistré.");
    }
    if (!intake.sourceHash) {
      try {
        const sourceClaim = await dataConnect.executeMutation<IntakeMutationData, { receiptId: string; sourceHash: string }>(
          "ClaimInvoiceIntakeSourceHash",
          { receiptId, sourceHash },
        );
        if (sourceClaim.data.invoiceIntake_updateMany !== 1) throw new Error("L’empreinte source n’a pas été réclamée.");
      } catch (error) {
        const owner = activeDuplicateOwner(await listAllInvoiceIntakes(dataConnect), receiptId, "sourceHash", sourceHash);
        if (owner) return markExactDuplicate(dataConnect, identity, receiptId, owner.receiptId, "SOURCE_HASH");
        throw error;
      }
    }
    console.info("[invoice-ai] phase=source_hash_claimed");
    const accountLabels = expenseAccounts
      .filter((account) => account.type === "EXPENSE" && account.status === "ACTIVE")
      .map((account) => account.label);
    const { model, extraction } = await extractInvoice(receiptId, storedPhotos.map((photo) => photo.file), accountLabels).catch((error) => {
      transientGeminiFailure = transientGeminiErrorCode("GEMINI", error) === "GEMINI_TRANSIENT";
      throw error;
    });
    console.info("[invoice-ai] phase=gemini_finished");
    const validation = validateInvoiceExtraction(extraction);
    const uploaderUid = intake.uploaderUid;
    const uploader = userProfiles.find((user) => user.firebaseUid === uploaderUid);
    const classificationReferences = skuReferences.map((reference) => ({
      merchant: reference.merchant,
      sku: reference.sku,
      category: reference.categoryLabel ?? undefined,
      accountCode: reference.expenseAccount?.number,
      status: reference.verificationStatus,
    }));
    const baseClassification = classifyInvoice({
      vendor: extraction?.vendor,
      sku: extraction?.sku ?? undefined,
      category: extraction?.category ?? undefined,
    }, classificationReferences, expenseAccounts);
    const classifiedLineItems = classifyInvoiceLineItems({
      vendor: extraction?.vendor,
      lineItems: validation.ok ? (validation.value as NormalizedExtraction).lineItems : extraction?.lineItems,
      skuReferences: classificationReferences,
      accounts: expenseAccounts,
    });
    const restaurantPolicy = applyCardholderRestaurantPolicy({
      holderName: uploader?.displayName,
      isRestaurant: validation.ok ? (validation.value as NormalizedExtraction).isRestaurant : extraction?.isRestaurant,
      invoiceCategory: extraction?.category,
      lineItems: classifiedLineItems,
      accounts: expenseAccounts,
    });
    const lineItems = restaurantPolicy.lineItems;
    const classification = restaurantPolicy.applied
      ? {
          ...baseClassification,
          accountCode: restaurantPolicy.accountCode,
          category: restaurantPolicy.category,
          source: "CARDHOLDER_RESTAURANT_POLICY",
          confidence: 1,
          status: "TO_VALIDATE" as const,
          note: restaurantPolicy.note,
          resolution: "RESOLVED" as const,
          skuState: "POLICY_OVERRIDDEN" as const,
          candidates: [restaurantPolicy.accountCode],
        }
      : baseClassification;
    const extractionWithLineItems = { ...extraction, lineItems };

    // The cron worker authenticates with a technical identity. Card ownership
    // must always be resolved from the intake uploader, not from that worker.
    const cards = creditCards.map((card) => ({
      id: card.id,
      lastFour: card.lastFour,
      status: card.status,
      holderId: card.holder.id,
      holderStatus: card.holder.status,
    }));
    const cardResolution = resolveUploaderCards({
      cards,
      uploaderUid,
      uploaderUserId: uploader?.id,
    });
    const postedDuplicate = findDefiniteTransactionDuplicate(
      extractionWithLineItems,
      transactionResponse,
      cardResolution.card?.id ?? null,
    );
    const duplicateFingerprint = validation.ok
      ? buildInvoiceBusinessFingerprint({ ...(validation.value as NormalizedExtraction), lineItems }, cardResolution.card?.id ?? null)
      : null;
    let exactDuplicateOwner: IntakeData["invoiceIntakes"][number] | null = null;
    if (duplicateFingerprint && !postedDuplicate) {
      if (intake.duplicateFingerprint && intake.duplicateFingerprint !== duplicateFingerprint) {
        throw new Error("L’empreinte commerciale ne correspond plus au dépôt déjà enregistré.");
      }
      if (!intake.duplicateFingerprint) {
        try {
          const businessClaim = await dataConnect.executeMutation<IntakeMutationData, { receiptId: string; duplicateFingerprint: string }>(
            "ClaimInvoiceIntakeBusinessFingerprint",
            { receiptId, duplicateFingerprint },
          );
          if (businessClaim.data.invoiceIntake_updateMany !== 1) throw new Error("L’empreinte commerciale n’a pas été réclamée.");
        } catch (error) {
          exactDuplicateOwner = activeDuplicateOwner(
            await listAllInvoiceIntakes(dataConnect),
            receiptId,
            "duplicateFingerprint",
            duplicateFingerprint,
          );
          if (!exactDuplicateOwner) throw error;
        }
      }
    }
    const duplicateOfReceiptId = exactDuplicateOwner?.receiptId ?? (
      postedDuplicate?.id?.startsWith("TX-") ? postedDuplicate.id.slice(3) : postedDuplicate?.id ?? null
    );
    const duplicateReason = exactDuplicateOwner
      ? "BUSINESS_FINGERPRINT"
      : postedDuplicate
        ? "POSTED_TRANSACTION"
        : null;
    const deterministicDecision = decideInvoice({
      extraction: extractionWithLineItems,
      extractionValidation: validation,
      classification,
      lineItemClassifications: lineItems,
      confidenceThreshold: confidenceThreshold(),
      duplicateCandidates: findPotentialDuplicates(
        extraction,
        transactionResponse,
        cardResolution.card?.id ?? null,
      ),
      context: {
        uploaderUid,
        uploaderUserId: uploader?.id,
        cards,
        cardResolution,
        projects,
        requireProject: false,
      },
    });
    const decision = duplicateOfReceiptId && duplicateReason
      ? exactDuplicateDecision(duplicateOfReceiptId, duplicateReason)
      : deterministicDecision;

    if (!validation.ok) {
      const error = "La lecture IA doit être vérifiée manuellement.";
      console.warn("[invoice-ai] phase=extraction_validation_failed", {
        receiptId,
        model,
        errors: validation.errors.slice(0, 10),
      });
      await dataConnect.executeMutation("MarkInvoiceIntakeAiError", {
        receiptId,
        error,
        aiErrorCode: "AI_OUTPUT_REQUIRES_REVIEW",
        accountingStatus: "NOT_POSTED",
        decisionExceptions: serializeDecisionExceptions(decision.exceptions),
        decisionChecks: serializeDecisionChecks(decision.checks),
        actorUid: identity.uid,
        actorRole: identity.role,
        writeAudit: true,
        auditEventId: auditEventId(receiptId, AUDIT_ACTIONS.AI_PROCESSING_FAILED, "validation"),
        auditDetails: auditDetails({ reason: error, code: "AI_OUTPUT_REQUIRES_REVIEW" }),
      });
      return Response.json({ error, code: "AI_OUTPUT_REQUIRES_REVIEW", decision }, { status: 422 });
    }
    const normalized = validation.value as NormalizedExtraction;

    const aiResult = await dataConnect.executeMutation<IntakeMutationData, Record<string, unknown>>("UpdateInvoiceIntakeAiResult", {
      receiptId,
      aiModel: model,
      aiConfidence: extraction.confidence,
      extractedVendor: normalized.vendor,
      extractedInvoiceNumber: normalized.invoiceNumber,
      extractedInvoiceDate: normalized.invoiceDate,
      extractedSubtotalCents: String(normalized.subtotalCents),
      extractedTpsCents: String(normalized.tpsCents),
      extractedTvqCents: String(normalized.tvqCents),
      extractedTotalCents: String(normalized.totalCents),
      extractedCurrency: normalized.currency,
      extractedSku: extraction.sku,
      extractedCategory: extraction.category,
      extractedProjectId: extraction.projectId,
      extractedLineItems: JSON.stringify(lineItems),
      classificationAccountCode: classification.accountCode,
      classificationCategory: classification.category,
      classificationSource: classification.source,
      classificationConfidence: classification.confidence,
      classificationStatus: classification.resolution,
      aiNotes: `${extraction.notes} ${classification.note}`.trim(),
      processingStatus: decision.decision,
      decisionExceptions: serializeDecisionExceptions(decision.exceptions),
      decisionChecks: serializeDecisionChecks(decision.checks),
      duplicateOfReceiptId,
      duplicateReason,
      lastError: duplicateReason ? decision.exceptions[0].message : null,
      actorUid: identity.uid,
      actorRole: identity.role,
      writeAudit: true,
      auditEventId: auditEventId(receiptId, AUDIT_ACTIONS.AI_EXTRACTION_COMPLETED),
      auditDetails: auditDetails({
        model,
        confidence: extraction.confidence,
        vendor: normalized.vendor,
        invoiceNumber: normalized.invoiceNumber,
        invoiceDate: normalized.invoiceDate,
        totalCents: normalized.totalCents,
        decision: decision.decision,
        exceptionCodes: decision.exceptions.map((exception) => exception.code),
        duplicateOfReceiptId,
        duplicateReason,
      }),
    });

    if (aiResult.data.invoiceIntake_updateMany !== 1) {
      const latest = await readIntake();
      if (latest) return existingIntakeResponse(receiptId, latest);
      throw new Error("La transition IA idempotente n’a modifié aucun intake.");
    }

    if (duplicateOfReceiptId && duplicateReason) {
      return markExactDuplicate(dataConnect, identity, receiptId, duplicateOfReceiptId, duplicateReason);
    }

    if (decision.decision === "AUTO_APPROVED") {
      const { accountCode, cardId } = decision.resolutions;
      if (!cardId || !normalized.invoiceDate) {
        throw new Error("La décision automatique ne contient pas toutes les références comptables requises.");
      }
      const activeExpenseAccounts = new Map(
        expenseAccounts
          .filter((candidate) => candidate.type === "EXPENSE" && candidate.status === "ACTIVE")
          .map((candidate) => [candidate.number, candidate]),
      );
      const lineAccountCodes = [...new Set(lineItems.map((item) => item.accountCode).filter((value): value is string => Boolean(value)))];
      if (lineItems.some((item) => !item.accountCode || !activeExpenseAccounts.has(item.accountCode))) {
        throw new Error("Chaque ligne doit utiliser un compte de dépense actif.");
      }
      const account = accountCode ? activeExpenseAccounts.get(accountCode) ?? null : null;
      if (accountCode && !account) throw new Error("Le compte comptable résolu n'existe plus ou est inactif.");
      if (!account && lineAccountCodes.length < 2) {
        throw new Error("La ventilation automatique ne contient aucun compte résumé ni ventilation multicomptes valide.");
      }
      autoCommitAttempted = true;
      try {
        await materializeInvoiceIntake(dataConnect, intake, storedPhotos, {
          vendor: normalized.vendor,
          invoiceNumber: normalized.invoiceNumber,
          invoiceDate: normalized.invoiceDate,
          subtotalCents: normalized.subtotalCents,
          tpsCents: normalized.tpsCents,
          tvqCents: normalized.tvqCents,
          totalCents: normalized.totalCents,
          currency: normalized.currency,
          sku: normalized.sku,
          category: account ? classification.category ?? account.label : "Ventilation multi-comptes",
          accountId: account?.id ?? null,
          cardId,
          statementPeriodId: null,
          // A project inferred from invoice text is not a trusted accounting
          // reference. Keep automatic posting independent from project data;
          // a reviewer can associate the project afterwards when needed.
          projectId: null,
          lineItems: JSON.stringify(lineItems),
          classificationNote: `${extraction.notes} ${classification.note}`.trim(),
          actorUid: identity.uid,
          actorRole: identity.role,
        }, "AUTO");
      } catch (error) {
        const latest = await readIntake();
        if (latest && isAutomaticPostingSettled(latest)) return existingIntakeResponse(receiptId, latest);
        console.error("[invoice-ai] phase=auto_post_failed", {
          receiptId,
          message: error instanceof Error ? error.message : "unknown",
        });
        throw error;
      }
    }

    return Response.json({
      ok: true,
      receiptId,
      model,
      extraction: { ...normalized, lineItems, confidence: extraction.confidence, notes: extraction.notes, category: extraction.category, projectId: extraction.projectId, sku: extraction.sku },
      classification,
      decision,
    });
  } catch (error) {
    if (ownedIntake && dataConnect && receiptIdForLog !== "unknown") {
      const latest = await listAllInvoiceIntakes(dataConnect).catch(() => null);
      const current = latest?.find((item) => item.receiptId === receiptIdForLog);
      // A competing request has already produced a decision or posting
      // outcome. Its state must win over this stale error path.
      if (current && (
        current.accountingStatus === "POSTED" ||
        current.accountingStatus === "POSTING_ERROR" ||
        (!processingClaimed && (current.processingState === "RETRY" || current.processingState === "RUNNING")) ||
        (processingClaimed && current.processingStatus !== "PROCESSING")
      )) return existingIntakeResponse(receiptIdForLog, current);

      if (!processingClaimed) {
        console.error("[invoice-ai] phase=processing_not_started", {
          receiptId: receiptIdForLog,
          message: error instanceof Error ? error.message : "unknown",
        });
        return Response.json({
          error: "La réanalyse n'a pas pu être lancée; la facture n'a pas été modifiée.",
          code: "AI_RETRY_NOT_STARTED",
        }, { status: 502 });
      }

      console.error("[invoice-ai] phase=processing_failed", {
        receiptId: receiptIdForLog,
        aiErrorCode: transientGeminiFailure ? "GEMINI_TRANSIENT" : null,
        message: error instanceof Error ? error.message : "unknown",
      });

      const decisionExceptions = serializeDecisionExceptions([{
        code: autoCommitAttempted ? "ACCOUNTING_POSTING_ERROR" : "AI_PROCESSING_ERROR",
        fieldName: null,
        message: autoCommitAttempted ? "La création de l’écriture comptable a échoué." : error instanceof Error ? error.message : "Erreur technique inconnue.",
        aiValue: null,
        suggestedValue: null,
        status: "OPEN",
      }]);
      const decisionChecks = serializeDecisionChecks([{ code: "AI_PROCESSING", passed: false, message: "Le traitement serveur a échoué." }]);
      const maxAttemptsReached = Boolean(
        !autoCommitAttempted &&
        transientGeminiFailure &&
        current &&
        hasReachedInvoiceAiMaxAttempts(current, invoiceAiMaxAttempts()),
      );
      const persistedDecisionExceptions = maxAttemptsReached
        ? decisionExceptionsAtMaxAttempts(decisionExceptions, invoiceAiMaxAttempts())
        : decisionExceptions;
      const persistedDecisionChecks = maxAttemptsReached
        ? decisionChecksAtMaxAttempts(decisionChecks, invoiceAiMaxAttempts())
        : decisionChecks;
      if (autoCommitAttempted) {
        await dataConnect.executeMutation("MarkInvoiceIntakeAutoPostingError", {
          receiptId: receiptIdForLog,
          error: "La création de l’écriture comptable a échoué.",
          decisionExceptions,
          decisionChecks,
          actorUid: identityForAudit?.uid ?? "unknown",
          actorRole: identityForAudit?.role ?? "UNKNOWN",
          writeAudit: true,
          auditEventId: auditEventId(receiptIdForLog, AUDIT_ACTIONS.AI_PROCESSING_FAILED, "posting"),
          auditDetails: auditDetails({ reason: "ACCOUNTING_POSTING_ERROR", autoCommitAttempted: true }),
        }).catch(() => undefined);
      } else {
        await dataConnect.executeMutation("MarkInvoiceIntakeAiError", {
          receiptId: receiptIdForLog,
          error: AI_PROCESSING_ERROR_MESSAGE,
          aiErrorCode: maxAttemptsReached ? AI_MAX_ATTEMPTS_REACHED : transientGeminiFailure ? "GEMINI_TRANSIENT" : null,
          decisionExceptions: persistedDecisionExceptions,
          decisionChecks: persistedDecisionChecks,
          actorUid: identityForAudit?.uid ?? "unknown",
          actorRole: identityForAudit?.role ?? "UNKNOWN",
          writeAudit: true,
          auditEventId: auditEventId(receiptIdForLog, maxAttemptsReached ? AUDIT_ACTIONS.AI_MAX_ATTEMPTS_REACHED : AUDIT_ACTIONS.AI_PROCESSING_FAILED),
          auditDetails: auditDetails({
            reason: maxAttemptsReached ? AI_MAX_ATTEMPTS_REACHED : "AI_PROCESSING_ERROR",
            aiErrorCode: maxAttemptsReached ? AI_MAX_ATTEMPTS_REACHED : transientGeminiFailure ? "GEMINI_TRANSIENT" : null,
            maxAttempts: maxAttemptsReached ? invoiceAiMaxAttempts() : undefined,
          }),
        }).catch(() => undefined);
      }

      const afterError = await listAllInvoiceIntakes(dataConnect).catch(() => null);
      const afterErrorIntake = afterError?.find((item) => item.receiptId === receiptIdForLog);
      if (afterErrorIntake && isStableIntakeState(afterErrorIntake)) return existingIntakeResponse(receiptIdForLog, afterErrorIntake);
    }
    console.error("[invoice-ai] request failed", {
      receiptId: receiptIdForLog,
      message: error instanceof Error ? error.message : "unknown error",
    });
    return Response.json({ error: "Le traitement IA a échoué; la facture reste reçue." }, { status: 500 });
  }
}
