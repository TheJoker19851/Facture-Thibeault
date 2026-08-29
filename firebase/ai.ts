import { firebaseAuth } from "./client";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";

export type InvoiceIntakeStatus = {
  ok: true;
  receiptId: string;
  state: {
    processingStatus: string;
    processingState: string;
    processingAttempts: number;
    lastAttemptAt: string | null;
    accountingStatus: string;
    lastError: string | null;
    aiErrorCode: string | null;
  };
};

export type InvoiceIntakeRetryResponse = {
  ok: boolean;
  receiptId: string;
  idempotent?: boolean;
  code?: string;
  error?: string;
};

/** Le navigateur consulte l'état; le traitement IA appartient au worker serveur. */
export async function getInvoiceIntakeStatus(receiptId: string): Promise<InvoiceIntakeStatus> {
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour consulter l'état de l'analyse.");

  const response = await fetch(`/api/invoices/intake-status?receiptId=${encodeURIComponent(receiptId)}`, {
    headers: {
      Authorization: `Bearer ${await user.getIdToken()}`,
      "x-invoice-client-version": INVOICE_CLIENT_VERSION,
    },
  });
  const payload = (await response.json().catch(() => null)) as Partial<InvoiceIntakeStatus> & { error?: string } | null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || "L'état de l'analyse n'a pas pu être chargé.");
  }
  return payload as InvoiceIntakeStatus;
}

/** Relance une erreur IA sans extraction, uniquement pour KIM/ADMIN côté serveur. */
export async function retryInvoiceIntakeAi(receiptId: string): Promise<InvoiceIntakeRetryResponse> {
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour relancer l'analyse.");

  const form = new FormData();
  form.append("receiptId", receiptId);
  const response = await fetch("/api/ai/process-invoice", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await user.getIdToken()}`,
      "x-invoice-client-version": INVOICE_CLIENT_VERSION,
    },
    body: form,
  });
  const payload = (await response.json().catch(() => null)) as InvoiceIntakeRetryResponse | { error?: string } | null;
  if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
    throw new Error(payload?.error || "La nouvelle analyse n'a pas pu être lancée.");
  }
  return payload as InvoiceIntakeRetryResponse;
}
