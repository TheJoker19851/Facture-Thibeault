import { firebaseAdminConfigured, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import { listAllInvoiceIntakes } from "../../../../firebase/accounting-pagination.server";
import { INVOICE_CLIENT_VERSION } from "../../../../lib/invoice-client-version.mjs";
import { invoiceAiMaxAttempts } from "../../../../lib/gemini-retry.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import {
  INVOICE_CRON_STALE_AFTER_MS,
  selectInvoiceIntakesForAutomaticProcessing,
  selectStaleInvoiceIntakes,
} from "../../../../lib/invoice-queue.mjs";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * Durable queue consumer for invoice OCR. Vercel supplies CRON_SECRET to the
 * scheduled request; the individual processing requests stay server-to-server
 * and never depend on the browser remaining open after Storage upload.
 */
export async function GET(request: Request) {
  console.info("[invoice-worker] phase=cron_start");
  const expected = process.env.CRON_SECRET;
  const workerSecret = process.env.INVOICE_WORKER_SECRET || expected;
  const authorization = request.headers.get("authorization");
  if (!expected || authorization !== `Bearer ${expected}`) {
    return Response.json({ error: "Cron non autorisé." }, { status: 401 });
  }
  if (!firebaseAdminConfigured()) {
    return Response.json({ error: "Firebase Admin n'est pas configuré." }, { status: 503 });
  }

  const dataConnect = await getFirebaseAdminDataConnect();
  const allIntakes = await listAllInvoiceIntakes(dataConnect);
  const staleBefore = new Date(Date.now() - INVOICE_CRON_STALE_AFTER_MS).toISOString();
  const stale = selectStaleInvoiceIntakes(allIntakes, Date.now(), INVOICE_CRON_STALE_AFTER_MS, invoiceAiMaxAttempts());
  let requeued = 0;
  for (const intake of stale) {
    const maxAttempts = invoiceAiMaxAttempts();
    const result = await dataConnect.executeMutation<{ invoiceIntake_updateMany: number }, {
      receiptId: string;
      staleBefore: string;
      maxAttempts: number;
      actorUid: string;
      actorRole: string;
      auditEventId: string;
      auditDetails: string;
    }>("RequeueStaleInvoiceIntake", {
      receiptId: intake.receiptId,
      staleBefore,
      maxAttempts,
      actorUid: "invoice-worker",
      actorRole: "ADMIN",
      auditEventId: auditEventId(intake.receiptId, AUDIT_ACTIONS.AI_PROCESSING_FAILED, "stale-requeue"),
      auditDetails: auditDetails({ reason: "STALE_WORKER_REQUEUED", staleAfterMs: INVOICE_CRON_STALE_AFTER_MS }),
    }).catch(() => null);
    if (result?.data.invoiceIntake_updateMany === 1) requeued += 1;
  }
  const queued = selectInvoiceIntakesForAutomaticProcessing(await listAllInvoiceIntakes(dataConnect));
  console.info("[invoice-worker] phase=queue_selected", { count: queued.length, requeued });
  const results: Array<{ receiptId: string; status: number; body: unknown }> = [];
  for (const intake of queued) {
    console.info("[invoice-worker] phase=intake_start");
    const formData = new FormData();
    formData.append("receiptId", intake.receiptId);
    const response = await POST_PROCESSING(new Request(new URL("/api/ai/process-invoice", request.url), {
      method: "POST",
      headers: {
        "x-invoice-worker-secret": workerSecret ?? "",
        "x-invoice-client-version": INVOICE_CLIENT_VERSION,
      },
      body: formData,
    }));
    results.push({ receiptId: intake.receiptId, status: response.status, body: await response.json().catch(() => null) });
    console.info("[invoice-worker] phase=intake_finished", { status: response.status });
  }
  console.info("[invoice-worker] phase=cron_finished", { count: results.length });
  return Response.json({ ok: true, queued: queued.length, results });
}

// Keep the route import boundary explicit so the cron consumer uses the same
// server-side transaction, AI validation, and retry logic as a manual call.
import { POST as POST_PROCESSING } from "../../ai/process-invoice/route";
