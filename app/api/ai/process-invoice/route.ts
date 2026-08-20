import { generateText, Output } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import { materializeInvoiceIntake, readInvoiceIntakeStoragePhotos } from "../../../../firebase/invoice-intake-commit.server";
import { inferApplicationEnvironment } from "../../../../lib/environment.mjs";
import { isTransientGeminiCapacityRetry, transientGeminiErrorCode } from "../../../../lib/gemini-retry.mjs";
import { clientUpdateRequiredResponse, isCurrentInvoiceClientVersion } from "../../../../lib/invoice-client-version.mjs";
import { classifyInvoice, validateInvoiceExtraction } from "../../../../lib/invoice-processing.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import {
  DEFAULT_INVOICE_AI_MIN_CONFIDENCE,
  decideInvoice,
  findPotentialDuplicates,
  resolveUploaderCards,
  serializeDecisionChecks,
  serializeDecisionExceptions,
} from "../../../../lib/invoice-decision-engine.mjs";

export const runtime = "nodejs";
export const maxDuration = 120;

const ALLOWED_ROLES = new Set(["WORKER", "KIM", "ADMIN"]);

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
  category: z.string().nullable(),
  projectId: z.string().nullable(),
  confidence: z.number().min(0).max(1),
  notes: z.string(),
});

type AuthenticatedIdentity = {
  uid: string;
  role: "WORKER" | "KIM" | "ADMIN";
};

type IntakeData = {
  invoiceIntakes: Array<{
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    processingStatus?: string | null;
    accountingStatus?: string | null;
    lastError?: string | null;
    aiErrorCode?: string | null;
    aiModel?: string | null;
    decisionExceptions?: string | null;
  }>;
};

type IntakeMutationData = {
  invoiceIntake_updateMany: number;
};

type ReferenceData = {
  skuReferences: Array<{
    merchant: string;
    sku: string;
    categoryLabel?: string | null;
    verificationStatus: string;
    expenseAccount?: { code: string } | null;
  }>;
};

type CardData = {
  creditCards: Array<{
    id: string;
    lastFour: string;
    status: string;
    holder: { id: string; displayName: string };
  }>;
};

type UserData = {
  userProfiles: Array<{ id: string; firebaseUid: string; displayName: string }>;
};

type ProjectData = {
  projects: Array<{ id: string; name: string; status: string }>;
};

type PeriodData = {
  cardStatementPeriods: Array<{ id: string; startDate: string; endDate: string; status: string }>;
};

type TransactionData = {
  expenseTransactions: Array<{
    id: string;
    transactionDate: string;
    vendor: string;
    invoiceNumber?: string | null;
    totalCents: string | number;
    card?: { id: string } | null;
  }>;
};

type AccountData = {
  expenseAccounts: Array<{ code: string; label: string }>;
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
  projectId: string | null;
};

async function authenticate(request: Request): Promise<AuthenticatedIdentity | null> {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    if (typeof decoded.role !== "string" || !ALLOWED_ROLES.has(decoded.role)) return null;
    return { uid: decoded.uid, role: decoded.role as AuthenticatedIdentity["role"] };
  } catch {
    return null;
  }
}

const instructions = `You are the production invoice intake agent for Maçonnerie Thibeault.
Read all supplied photos as pages of one invoice. Extract only information visible in the document.
Never invent a value: use null for a missing invoice number, date, SKU, project or category.
Return monetary values as integer Canadian cents. Use ISO date YYYY-MM-DD when the date is readable.
The subtotal plus TPS plus TVQ must equal the total; if a value is unclear, lower confidence and explain it in notes.
Use category only as a suggestion. Do not invent an accounting account or approve the invoice.
Keep vendor names and invoice numbers faithful to the document, including accents and punctuation.`;

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
    category: "Matériaux Démo",
    projectId: "DEMO-PROJET-001",
    confidence: 0.75,
    notes: "Résultat IA simulé pour le projet Firebase demo-* local.",
  };
}

function confidenceThreshold() {
  const configured = Number(process.env.INVOICE_AI_MIN_CONFIDENCE ?? DEFAULT_INVOICE_AI_MIN_CONFIDENCE);
  return Number.isFinite(configured) ? Math.min(1, Math.max(0, configured)) : DEFAULT_INVOICE_AI_MIN_CONFIDENCE;
}

function matchingStatementPeriod(invoiceDate: string | null, periods: PeriodData["cardStatementPeriods"]) {
  if (!invoiceDate) return null;
  const matches = periods.filter((period) =>
    period.status === "OPEN" && period.startDate <= invoiceDate && invoiceDate <= period.endDate,
  );
  return matches.length === 1 ? matches[0] : null;
}

function stateOf(intake: IntakeData["invoiceIntakes"][number]) {
  return {
    processingStatus: intake.processingStatus ?? "PROCESSING",
    accountingStatus: intake.accountingStatus ?? "NOT_POSTED",
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

async function extractInvoice(receiptId: string, files: File[]) {
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
  const modelId = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const google = createGoogle({ apiKey });
  const imageParts = await Promise.all(files.map(async (file) => ({
    type: "file" as const,
    data: Buffer.from(await file.arrayBuffer()),
    mediaType: file.type,
  })));
  const result = await generateText({
    model: google(modelId),
    instructions,
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
  });
  return { model: modelId, extraction: result.output };
}

export async function POST(request: Request) {
  let receiptIdForLog = "unknown";
  let ownedIntake = false;
  let autoCommitAttempted = false;
  let transientGeminiFailure = false;
  let identityForAudit: AuthenticatedIdentity | null = null;
  let dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>> | null = null;
  try {
    if (!isCurrentInvoiceClientVersion(request.headers.get("x-invoice-client-version"))) {
      return clientUpdateRequiredResponse();
    }
    const identity = await authenticate(request);
    if (!identity) return Response.json({ error: "Authentification Firebase requise." }, { status: 401 });
    identityForAudit = identity;
    if (!firebaseAdminConfigured()) {
      return Response.json({ error: "Firebase Admin n'est pas configuré pour cet environnement." }, { status: 503 });
    }

    const formData = await request.formData();
    const receiptId = formData.get("receiptId");
    if (typeof receiptId !== "string" || !/^[a-zA-Z0-9_-]{8,128}$/.test(receiptId)) {
      return Response.json({ error: "Identifiant de facture invalide." }, { status: 400 });
    }
    receiptIdForLog = receiptId;

    dataConnect = await getFirebaseAdminDataConnect();
    const readIntake = async () => {
      const response = await dataConnect!.executeQuery<IntakeData>("ListInvoiceIntakes");
      return response.data.invoiceIntakes.find((item) => item.receiptId === receiptId) ?? null;
    };
    const intake = await readIntake();
    if (!intake) return Response.json({ error: "Le dépôt de facture n'existe pas." }, { status: 404 });
    if (intake.uploaderUid !== identity.uid) {
      return Response.json({ error: "Ce dépôt appartient à un autre utilisateur." }, { status: 403 });
    }
    ownedIntake = true;

    // A posted/validated/reviewed intake is already owned by the existing
    // result. Only a verified transient Gemini error or POSTING_ERROR can be
    // deliberately reopened, and each reopen is a database compare-and-set.
    const transientGeminiRetry = isTransientGeminiCapacityRetry(intake);
    if (isStableIntakeState(intake) && !transientGeminiRetry) return existingIntakeResponse(receiptId, intake);
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
        // Another request may already have claimed the controlled retry.
        // Never convert that winner into a new AI error.
        if (latest) return existingIntakeResponse(receiptId, latest);
        throw error;
      }
      if (retry.data.invoiceIntake_updateMany !== 1) {
        const latest = await readIntake();
        if (latest) return existingIntakeResponse(receiptId, latest);
        throw new Error("Le dépôt de facture n'existe plus pendant le retry.");
      }
    }

    const storedPhotos = await readInvoiceIntakeStoragePhotos(intake);
    const [{ model, extraction }, skuResponse, accountResponse, cardResponse, userResponse, projectResponse, periodResponse, transactionResponse] = await Promise.all([
      extractInvoice(receiptId, storedPhotos.map((photo) => photo.file)).catch((error) => {
        transientGeminiFailure = transientGeminiErrorCode("GEMINI", error) === "GEMINI_TRANSIENT";
        throw error;
      }),
      dataConnect.executeQuery<ReferenceData>("ListSkuReferences"),
      dataConnect.executeQuery<AccountData>("ListExpenseAccounts"),
      dataConnect.executeQuery<CardData>("ListCreditCards"),
      dataConnect.executeQuery<UserData>("ListUserProfiles"),
      dataConnect.executeQuery<ProjectData>("ListProjects"),
      dataConnect.executeQuery<PeriodData>("ListCardStatementPeriods"),
      dataConnect.executeQuery<TransactionData>("ListExpenseTransactions"),
    ]);
    const validation = validateInvoiceExtraction(extraction);
    const classification = classifyInvoice({
      vendor: extraction?.vendor,
      sku: extraction?.sku ?? undefined,
      category: extraction?.category ?? undefined,
    }, skuResponse.data.skuReferences.map((reference) => ({
      merchant: reference.merchant,
      sku: reference.sku,
      category: reference.categoryLabel ?? undefined,
      accountCode: reference.expenseAccount?.code,
      status: reference.verificationStatus,
    })), accountResponse.data.expenseAccounts);

    const uploader = userResponse.data.userProfiles.find((user) => user.firebaseUid === identity.uid);
    const cards = cardResponse.data.creditCards.map((card) => ({
      id: card.id,
      lastFour: card.lastFour,
      status: card.status,
      holderId: card.holder.id,
    }));
    const cardResolution = resolveUploaderCards({
      cards,
      uploaderUid: identity.uid,
      uploaderUserId: uploader?.id,
    });
    const statementPeriod = matchingStatementPeriod(
      typeof extraction?.invoiceDate === "string" ? extraction.invoiceDate : null,
      periodResponse.data.cardStatementPeriods,
    );
    const decision = decideInvoice({
      extraction,
      extractionValidation: validation,
      classification,
      confidenceThreshold: confidenceThreshold(),
      duplicateCandidates: findPotentialDuplicates(
        extraction,
        transactionResponse.data.expenseTransactions,
        cardResolution.card?.id ?? null,
      ),
      context: {
        uploaderUid: identity.uid,
        uploaderUserId: uploader?.id,
        cards,
        cardResolution,
        projects: projectResponse.data.projects,
        statementPeriodId: statementPeriod?.id ?? null,
        requireStatementPeriod: true,
        allowMissingProject: false,
      },
    });

    if (!validation.ok) {
      const error = "La lecture IA doit être vérifiée manuellement.";
      await dataConnect.executeMutation("MarkInvoiceIntakeAiError", {
        receiptId,
        error,
        aiErrorCode: null,
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
      classificationAccountCode: classification.accountCode,
      classificationCategory: classification.category,
      classificationSource: classification.source,
      classificationConfidence: classification.confidence,
      classificationStatus: classification.resolution,
      aiNotes: `${extraction.notes} ${classification.note}`.trim(),
      processingStatus: decision.decision,
      decisionExceptions: serializeDecisionExceptions(decision.exceptions),
      decisionChecks: serializeDecisionChecks(decision.checks),
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
      }),
    });

    if (aiResult.data.invoiceIntake_updateMany !== 1) {
      const latest = await readIntake();
      if (latest) return existingIntakeResponse(receiptId, latest);
      throw new Error("La transition IA idempotente n’a modifié aucun intake.");
    }

    if (decision.decision === "AUTO_APPROVED") {
      const { accountCode, cardId, statementPeriodId, projectId } = decision.resolutions;
      if (!accountCode || !cardId || !statementPeriodId || !projectId || !normalized.invoiceDate) {
        throw new Error("La décision automatique ne contient pas toutes les références comptables requises.");
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
          category: classification.category,
          accountCode,
          cardId,
          statementPeriodId,
          projectId,
          classificationNote: `${extraction.notes} ${classification.note}`.trim(),
          actorUid: identity.uid,
          actorRole: identity.role,
        }, "AUTO");
      } catch (error) {
        const latest = await readIntake();
        if (latest && isStableIntakeState(latest)) return existingIntakeResponse(receiptId, latest);
        throw error;
      }
    }

    return Response.json({
      ok: true,
      receiptId,
      model,
      extraction: { ...normalized, confidence: extraction.confidence, notes: extraction.notes, category: extraction.category, projectId: extraction.projectId, sku: extraction.sku },
      classification,
      decision,
    });
  } catch (error) {
    if (ownedIntake && dataConnect && receiptIdForLog !== "unknown") {
      const latest = await dataConnect.executeQuery<IntakeData>("ListInvoiceIntakes").catch(() => null);
      const current = latest?.data.invoiceIntakes.find((item) => item.receiptId === receiptIdForLog);
      // A competing request has already produced a decision or posting
      // outcome. Its state must win over this stale error path.
      if (current && (
        current.accountingStatus === "POSTED" ||
        current.accountingStatus === "POSTING_ERROR" ||
        (!autoCommitAttempted && current.processingStatus !== "PROCESSING") ||
        (autoCommitAttempted && current.processingStatus !== "AUTO_APPROVED")
      )) return existingIntakeResponse(receiptIdForLog, current);

      const decisionExceptions = serializeDecisionExceptions([{
        code: autoCommitAttempted ? "ACCOUNTING_POSTING_ERROR" : "AI_PROCESSING_ERROR",
        fieldName: null,
        message: autoCommitAttempted ? "La création de l’écriture comptable a échoué." : error instanceof Error ? error.message : "Erreur technique inconnue.",
        aiValue: null,
        suggestedValue: null,
        status: "OPEN",
      }]);
      const decisionChecks = serializeDecisionChecks([{ code: "AI_PROCESSING", passed: false, message: "Le traitement serveur a échoué." }]);
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
          error: "Le traitement IA a échoué; la facture doit être vérifiée manuellement.",
          aiErrorCode: transientGeminiFailure ? "GEMINI_TRANSIENT" : null,
          decisionExceptions,
          decisionChecks,
          actorUid: identityForAudit?.uid ?? "unknown",
          actorRole: identityForAudit?.role ?? "UNKNOWN",
          writeAudit: true,
          auditEventId: auditEventId(receiptIdForLog, AUDIT_ACTIONS.AI_PROCESSING_FAILED),
          auditDetails: auditDetails({
            reason: "AI_PROCESSING_ERROR",
            aiErrorCode: transientGeminiFailure ? "GEMINI_TRANSIENT" : null,
          }),
        }).catch(() => undefined);
      }

      const afterError = await dataConnect.executeQuery<IntakeData>("ListInvoiceIntakes").catch(() => null);
      const afterErrorIntake = afterError?.data.invoiceIntakes.find((item) => item.receiptId === receiptIdForLog);
      if (afterErrorIntake && isStableIntakeState(afterErrorIntake)) return existingIntakeResponse(receiptIdForLog, afterErrorIntake);
    }
    console.error("[invoice-ai] request failed", {
      receiptId: receiptIdForLog,
      message: error instanceof Error ? error.message : "unknown error",
    });
    return Response.json({ error: "Le traitement IA a échoué; la facture reste reçue." }, { status: 500 });
  }
}
