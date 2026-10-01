import { firebaseAuth } from "./client";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";
import { createCaptureProcessor } from "../lib/invoice-capture-batch.mjs";

export type InvoiceIntakeStatus = {
  ok: true;
  receiptId: string;
  photoCount?: number;
  storageFolder?: string;
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

/** Le navigateur consulte l'état; le traitement IA appartient au serveur. */
export async function getInvoiceIntakeStatus(receiptId: string): Promise<InvoiceIntakeStatus> {
  const status = await findInvoiceIntakeStatus(receiptId);
  if (!status) throw new Error("Le dépôt de facture n'existe pas.");
  return status;
}

export async function findInvoiceIntakeStatus(receiptId: string): Promise<InvoiceIntakeStatus | null> {
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour consulter l'état de l'analyse.");

  const response = await fetch(`/api/invoices/intake-status?receiptId=${encodeURIComponent(receiptId)}`, {
    headers: {
      Authorization: `Bearer ${await user.getIdToken()}`,
      "x-invoice-client-version": INVOICE_CLIENT_VERSION,
    },
  });
  const payload = (await response.json().catch(() => null)) as Partial<InvoiceIntakeStatus> & { error?: string } | null;
  if (response.status === 404) return null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || "L'état de l'analyse n'a pas pu être chargé.");
  }
  return payload as InvoiceIntakeStatus;
}

async function postInvoiceProcessing(receiptId: string, options: { forceReprocess?: boolean } = {}): Promise<InvoiceIntakeRetryResponse> {
  const user = firebaseAuth?.currentUser;
  if (!user) throw new Error("Une session Firebase Authentication est requise pour relancer l'analyse.");

  const form = new FormData();
  form.append("receiptId", receiptId);
  if (options.forceReprocess) form.append("forceReprocess", "ADMIN_TEST");
  const response = await fetch("/api/ai/process-invoice", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await user.getIdToken(true)}`,
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

/** Démarre l'analyse dès la confirmation Storage; le cron reste le filet de sécurité. */
export function startInvoiceIntakeProcessing(receiptId: string) {
  return postInvoiceProcessing(receiptId);
}

export const processCapturedInvoices = createCaptureProcessor(async (receiptId: string) => {
  await startInvoiceIntakeProcessing(receiptId);
  // Another worker may already hold the claim. Wait for that one to finish
  // before asking the server to start the next photo from this batch.
  for (;;) {
    const status = await getInvoiceIntakeStatus(receiptId);
    if (status.state.processingState !== "RUNNING") return status;
    const attemptAt = Date.parse(status.state.lastAttemptAt ?? "");
    if (!Number.isFinite(attemptAt) || Date.now() - attemptAt > 7 * 60_000) return status;
    await new Promise((resolve) => window.setTimeout(resolve, 5000));
  }
});

/** Relance une analyse IA; le mode forcé est réservé au test ADMIN côté serveur. */
export function retryInvoiceIntakeAi(receiptId: string, options: { forceReprocess?: boolean } = {}) {
  return postInvoiceProcessing(receiptId, options);
}
