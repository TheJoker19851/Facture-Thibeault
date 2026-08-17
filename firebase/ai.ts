import { firebaseAuth } from "./client";
import {
  markInvoiceIntakeAiError as markInvoiceIntakeAiErrorMutation,
  updateInvoiceIntakeAiResult,
} from "../generated/data-connect/esm/index.esm.js";
import { firebaseDataConnect, sqlConnectConfigured } from "./data-connect";

export type InvoiceAiResult = {
  ok: true;
  receiptId: string;
  model: string;
  extraction: {
    vendor: string;
    invoiceNumber: string | null;
    invoiceDate: string | null;
    subtotalCents: number;
    tpsCents: number;
    tvqCents: number;
    totalCents: number;
    currency: string;
    sku: string | null;
    category: string | null;
    projectId: string | null;
    confidence: number;
    notes: string;
  };
};

export type InvoiceClassification = {
  accountCode: string | null;
  category: string;
  source: string;
  confidence: number;
  status: string;
  note: string;
};

export async function processInvoicePhotosWithGemini(receiptId: string, files: File[]) {
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour l'analyse IA.");

  const token = await user.getIdToken();
  const formData = new FormData();
  formData.append("receiptId", receiptId);
  for (const file of files) formData.append("photos", file, file.name);

  const response = await fetch("/api/ai/process-invoice", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const payload = (await response.json().catch(() => null)) as Partial<InvoiceAiResult> & { error?: string } | null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || "Le traitement IA a échoué.");
  }
  return payload as InvoiceAiResult;
}

export async function persistInvoiceAiResult(
  receiptId: string,
  result: InvoiceAiResult,
  classification: InvoiceClassification,
) {
  if (!firebaseDataConnect || !sqlConnectConfigured) {
    throw new Error("SQL Connect est requis pour enregistrer le résultat IA.");
  }

  await updateInvoiceIntakeAiResult(firebaseDataConnect, {
    receiptId,
    status: "AI_REVIEW",
    aiModel: result.model,
    aiConfidence: result.extraction.confidence,
    extractedVendor: result.extraction.vendor,
    extractedInvoiceNumber: result.extraction.invoiceNumber,
    extractedInvoiceDate: result.extraction.invoiceDate,
    extractedSubtotalCents: String(result.extraction.subtotalCents),
    extractedTpsCents: String(result.extraction.tpsCents),
    extractedTvqCents: String(result.extraction.tvqCents),
    extractedTotalCents: String(result.extraction.totalCents),
    extractedCurrency: result.extraction.currency,
    extractedSku: result.extraction.sku,
    extractedCategory: result.extraction.category,
    extractedProjectId: result.extraction.projectId,
    classificationAccountCode: classification.accountCode,
    classificationCategory: classification.category,
    classificationSource: classification.source,
    classificationConfidence: classification.confidence,
    classificationStatus: classification.status,
    aiNotes: `${result.extraction.notes} ${classification.note}`.trim(),
  });
}

export async function markInvoiceIntakeAiError(receiptId: string) {
  if (!firebaseDataConnect || !sqlConnectConfigured) return;
  await markInvoiceIntakeAiErrorMutation(firebaseDataConnect, {
    receiptId,
    error: "Le traitement Gemini a échoué; la facture doit être vérifiée manuellement.",
  });
}
