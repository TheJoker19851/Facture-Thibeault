import { firebaseAuth } from "./client";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";

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
  classification: {
    accountCode: string | null;
    category: string;
    source: string;
    confidence: number;
    status: string;
    note: string;
  };
};

export async function processInvoiceIntakeWithGemini(receiptId: string) {
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour l'analyse IA.");

  const token = await user.getIdToken();
  const formData = new FormData();
  formData.append("receiptId", receiptId);

  const response = await fetch("/api/ai/process-invoice", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-invoice-client-version": INVOICE_CLIENT_VERSION,
    },
    body: formData,
  });
  const payload = (await response.json().catch(() => null)) as Partial<InvoiceAiResult> & { error?: string } | null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || "Le traitement IA a échoué.");
  }
  return payload as InvoiceAiResult;
}
