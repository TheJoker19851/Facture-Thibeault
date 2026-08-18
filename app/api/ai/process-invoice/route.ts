import { generateText, Output } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import { inferApplicationEnvironment } from "../../../../lib/environment.mjs";
import { classifyInvoice, validateInvoiceExtraction } from "../../../../lib/invoice-processing.mjs";
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

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 12 * 1024 * 1024;
const MAX_TOTAL_BYTES = 40 * 1024 * 1024;
const ALLOWED_ROLES = new Set(["WORKER", "KIM", "ADMIN"]);
const ALLOWED_MEDIA_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

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
  invoiceIntakes: Array<{ receiptId: string; uploaderUid: string; storageFolder: string }>;
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
  let dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>> | null = null;
  try {
    const identity = await authenticate(request);
    if (!identity) return Response.json({ error: "Authentification Firebase requise." }, { status: 401 });
    if (!firebaseAdminConfigured()) {
      return Response.json({ error: "Firebase Admin n'est pas configuré pour cet environnement." }, { status: 503 });
    }

    const formData = await request.formData();
    const receiptId = formData.get("receiptId");
    const files = formData.getAll("photos").filter((value): value is File => value instanceof File);
    if (typeof receiptId !== "string" || !/^[a-zA-Z0-9_-]{8,128}$/.test(receiptId)) {
      return Response.json({ error: "Identifiant de facture invalide." }, { status: 400 });
    }
    receiptIdForLog = receiptId;
    if (!files.length || files.length > MAX_PHOTOS) {
      return Response.json({ error: `Une facture doit contenir entre 1 et ${MAX_PHOTOS} photos.` }, { status: 400 });
    }

    let totalBytes = 0;
    for (const file of files) {
      if (!ALLOWED_MEDIA_TYPES.has(file.type)) {
        return Response.json({ error: "L'analyse IA accepte les images JPEG, PNG ou WebP." }, { status: 400 });
      }
      if (!file.size || file.size > MAX_PHOTO_BYTES) {
        return Response.json({ error: "Chaque photo doit faire au maximum 12 Mo." }, { status: 400 });
      }
      totalBytes += file.size;
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      return Response.json({ error: "La facture complète doit faire au maximum 40 Mo." }, { status: 400 });
    }

    dataConnect = await getFirebaseAdminDataConnect();
    const intakeResponse = await dataConnect.executeQuery<IntakeData>("ListInvoiceIntakes");
    const intake = intakeResponse.data.invoiceIntakes.find((item) => item.receiptId === receiptId);
    if (!intake) return Response.json({ error: "Le dépôt de facture n'existe pas." }, { status: 404 });
    if (intake.uploaderUid !== identity.uid) {
      return Response.json({ error: "Ce dépôt appartient à un autre utilisateur." }, { status: 403 });
    }
    ownedIntake = true;

    const [{ model, extraction }, skuResponse, accountResponse, cardResponse, userResponse, projectResponse, periodResponse, transactionResponse] = await Promise.all([
      extractInvoice(receiptId, files),
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
        accountingStatus: "NOT_POSTED",
        decisionExceptions: serializeDecisionExceptions(decision.exceptions),
        decisionChecks: serializeDecisionChecks(decision.checks),
      });
      return Response.json({ error, code: "AI_OUTPUT_REQUIRES_REVIEW", decision }, { status: 422 });
    }
    const normalized = validation.value as NormalizedExtraction;

    await dataConnect.executeMutation("UpdateInvoiceIntakeAiResult", {
      receiptId,
      status: decision.decision,
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
      accountingStatus: "NOT_POSTED",
      decisionExceptions: serializeDecisionExceptions(decision.exceptions),
      decisionChecks: serializeDecisionChecks(decision.checks),
    });

    if (decision.decision === "AUTO_APPROVED") {
      const { accountCode, cardId, statementPeriodId, projectId } = decision.resolutions;
      if (!accountCode || !cardId || !statementPeriodId || !projectId) {
        throw new Error("La décision automatique ne contient pas toutes les références comptables requises.");
      }
      autoCommitAttempted = true;
      await dataConnect.executeMutation("AutoCommitInvoiceIntake", {
        receiptId,
        transactionId: `TX-${receiptId}`,
        invoiceId: `INV-${receiptId}`,
        vendor: normalized.vendor,
        invoiceNumber: normalized.invoiceNumber,
        invoiceDate: normalized.invoiceDate,
        subtotalCents: String(normalized.subtotalCents),
        tpsCents: String(normalized.tpsCents),
        tvqCents: String(normalized.tvqCents),
        totalCents: String(normalized.totalCents),
        currency: normalized.currency,
        sku: normalized.sku,
        category: classification.category,
        accountCode,
        cardId,
        statementPeriodId,
        projectId,
        storageFolder: intake.storageFolder,
        classificationNote: `${extraction.notes} ${classification.note}`.trim(),
      });
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
      await dataConnect.executeMutation("MarkInvoiceIntakeAiError", {
        receiptId: receiptIdForLog,
        error: "Le traitement IA a échoué; la facture doit être vérifiée manuellement.",
        accountingStatus: autoCommitAttempted ? "POSTING_ERROR" : "NOT_POSTED",
        decisionExceptions: serializeDecisionExceptions([{
          code: autoCommitAttempted ? "ACCOUNTING_POSTING_ERROR" : "AI_PROCESSING_ERROR",
          fieldName: null,
          message: autoCommitAttempted ? "La création de l’écriture comptable a échoué." : error instanceof Error ? error.message : "Erreur technique inconnue.",
          aiValue: null,
          suggestedValue: null,
          status: "OPEN",
        }]),
        decisionChecks: serializeDecisionChecks([{ code: "AI_PROCESSING", passed: false, message: "Le traitement serveur a échoué." }]),
      }).catch(() => undefined);
    }
    console.error("[invoice-ai] request failed", {
      receiptId: receiptIdForLog,
      message: error instanceof Error ? error.message : "unknown error",
    });
    return Response.json({ error: "Le traitement IA a échoué; la facture reste reçue." }, { status: 500 });
  }
}
