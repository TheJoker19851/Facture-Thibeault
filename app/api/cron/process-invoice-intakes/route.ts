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
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return Response.json({ error: "Cron non autorisé." }, { status: 401 });
  }
  if (!expected) {
    console.error("[invoice-worker] phase=configuration_failed reason=CRON_SECRET_MISSING");
    return Response.json({ error: "CRON_SECRET n'est pas configuré pour le worker." }, { status: 503 });
  }
  if (authorization !== `Bearer ${expected}`) {
    return Response.json({ error: "Cron non autorisé." }, { status: 401 });
  }
  if (!firebaseAdminConfigured()) {
    console.error("[invoice-worker] phase=configuration_failed reason=FIREBASE_ADMIN_MISSING");
    return Response.json({ error: "Firebase Admin n'est pas configuré." }, { status: 503 });
  }
  const workerSecret = process.env.INVOICE_WORKER_SECRET || expected || "";

  try {
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
      }).catch((error) => {
        console.error("[invoice-worker] phase=stale_requeue_failed", {
          message: error instanceof Error ? error.message : "unknown",
        });
        return null;
      });
      if (result?.data.invoiceIntake_updateMany === 1) requeued += 1;
    }
    const queued = selectInvoiceIntakesForAutomaticProcessing(
      await listAllInvoiceIntakes(dataConnect),
      undefined,
      invoiceAiMaxAttempts(),
    );
    console.info("[invoice-worker] phase=queue_selected", { count: queued.length, requeued });
    const results: Array<{ receiptId: string; status: number; body: unknown }> = [];
    for (const intake of queued) {
      console.info("[invoice-worker] phase=intake_start", { receiptId: intake.receiptId });
      const formData = new FormData();
      formData.append("receiptId", intake.receiptId);
      const response = await POST_PROCESSING(new Request(new URL("/api/ai/process-invoice", request.url), {
        method: "POST",
        headers: {
          "x-invoice-worker-secret": workerSecret,
          "x-invoice-client-version": INVOICE_CLIENT_VERSION,
        },
        body: formData,
      }));
      results.push({ receiptId: intake.receiptId, status: response.status, body: await response.json().catch(() => null) });
      console.info("[invoice-worker] phase=intake_finished", { receiptId: intake.receiptId, status: response.status });
    }
    const failedResults = results.filter((result) => result.status >= 500 || result.status === 401 || result.status === 403);
    console.info("[invoice-worker] phase=cron_finished", { count: results.length, failed: failedResults.length });
    return Response.json(
      { ok: failedResults.length === 0, queued: queued.length, results },
      { status: failedResults.length === 0 ? 200 : 500 },
    );
  } catch (error) {
    console.error("[invoice-worker] phase=cron_failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return Response.json({ error: "Le worker de factures a échoué." }, { status: 500 });
  }
}

// Keep the route import boundary explicit so the cron consumer uses the same
// server-side transaction, AI validation, and retry logic as a manual call.
import { POST as POST_PROCESSING } from "../../ai/process-invoice/route";
