import { firebaseAdminConfigured, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import {
  listAllCreditCards,
  listAllInvoiceIntakes,
  listAllUserProfiles,
} from "../../../../firebase/accounting-pagination.server";
import { readInvoiceIntakeStoragePhotos } from "../../../../firebase/invoice-intake-commit.server";
import { INVOICE_CLIENT_VERSION } from "../../../../lib/invoice-client-version.mjs";
import {
  buildInvoiceBusinessFingerprint,
  buildInvoiceSourceHash,
  exactDuplicateDecision,
} from "../../../../lib/invoice-duplicates.mjs";
import { invoiceAiMaxAttempts } from "../../../../lib/gemini-retry.mjs";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import { resolveUploaderCards, serializeDecisionChecks, serializeDecisionExceptions } from "../../../../lib/invoice-decision-engine.mjs";
import {
  INVOICE_CRON_STALE_AFTER_MS,
  selectInvoiceIntakesForAutomaticProcessing,
  selectStaleInvoiceIntakes,
} from "../../../../lib/invoice-queue.mjs";

export const runtime = "nodejs";
export const maxDuration = 300;

const DEDUPLICATION_STATUSES = new Set(["PROCESSING", "NEEDS_REVIEW", "VALIDATED", "AUTO_APPROVED", "POSTING_ERROR"]);

function activeDuplicateOwner(intakes: Array<Record<string, unknown>>, receiptId: string, field: "sourceHash" | "duplicateFingerprint", value: string) {
  return intakes.find((candidate) => (
    candidate.receiptId !== receiptId &&
    candidate[field] === value &&
    candidate.processingStatus !== "DELETED" &&
    candidate.processingStatus !== "DUPLICATE"
  )) ?? null;
}

function parsedLineItems(value: unknown) {
  if (typeof value !== "string" || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function markDuplicate(
  dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>>,
  intake: Record<string, unknown>,
  owner: Record<string, unknown>,
  duplicateReason: "SOURCE_HASH" | "BUSINESS_FINGERPRINT",
) {
  const receiptId = String(intake.receiptId);
  const duplicateOfReceiptId = String(owner.receiptId);
  const decision = exactDuplicateDecision(duplicateOfReceiptId, duplicateReason);
  const result = await dataConnect.executeMutation<{ invoiceIntake_updateMany: number }, Record<string, unknown>>("MarkInvoiceIntakeDuplicate", {
    receiptId,
    duplicateOfReceiptId,
    duplicateReason,
    message: decision.exceptions[0].message,
    decisionExceptions: serializeDecisionExceptions(decision.exceptions),
    decisionChecks: serializeDecisionChecks(decision.checks),
    actorUid: "invoice-worker",
    actorRole: "ADMIN",
    auditEventId: auditEventId(receiptId, AUDIT_ACTIONS.INVOICE_DUPLICATE_REJECTED),
    auditDetails: auditDetails({ duplicateOfReceiptId, duplicateReason, source: "DAILY_DEDUPLICATION" }),
  });
  if (result.data.invoiceIntake_updateMany !== 1) throw new Error("Le doublon historique n’a pas pu être écarté.");
  intake.processingStatus = "DUPLICATE";
  intake.sourceHash = null;
  intake.duplicateFingerprint = null;
}

async function deduplicateExistingIntakes(
  dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>>,
  intakes: Array<Record<string, unknown>>,
) {
  const [creditCards, userProfiles] = await Promise.all([
    listAllCreditCards(dataConnect),
    listAllUserProfiles(dataConnect),
  ]);
  const candidates = intakes
    .filter((intake) => intake.accountingStatus === "NOT_POSTED" && DEDUPLICATION_STATUSES.has(String(intake.processingStatus)))
    .sort((left, right) => String(left.createdAt ?? "").localeCompare(String(right.createdAt ?? "")) || String(left.receiptId).localeCompare(String(right.receiptId)));
  let duplicates = 0;

  for (const intake of candidates) {
    const receiptId = String(intake.receiptId);
    let owner: Record<string, unknown> | null = null;
    let duplicateReason: "SOURCE_HASH" | "BUSINESS_FINGERPRINT" | null = null;

    if (!intake.sourceHash && Number(intake.photoCount) > 0) {
      try {
        const photos = await readInvoiceIntakeStoragePhotos({
          receiptId,
          uploaderUid: String(intake.uploaderUid),
          storageFolder: String(intake.storageFolder),
          photoCount: Number(intake.photoCount),
        });
        const sourceHash = await buildInvoiceSourceHash(photos.map((photo) => photo.file));
        owner = activeDuplicateOwner(candidates, receiptId, "sourceHash", sourceHash);
        if (!owner) {
          try {
            const claim = await dataConnect.executeMutation<{ invoiceIntake_updateMany: number }, { receiptId: string; sourceHash: string }>(
              "ClaimInvoiceIntakeSourceHash",
              { receiptId, sourceHash },
            );
            if (claim.data.invoiceIntake_updateMany !== 1) throw new Error("Empreinte source non réclamée.");
            intake.sourceHash = sourceHash;
          } catch (error) {
            const refreshed = await listAllInvoiceIntakes(dataConnect);
            owner = activeDuplicateOwner(refreshed, receiptId, "sourceHash", sourceHash) as Record<string, unknown> | null;
            if (!owner) throw error;
          }
        }
        if (owner) duplicateReason = "SOURCE_HASH";
      } catch (error) {
        console.warn("[invoice-worker] phase=dedup_source_skipped", {
          receiptId,
          message: error instanceof Error ? error.message : "unknown",
        });
      }
    }

    if (!owner && !intake.duplicateFingerprint) {
      const uploader = userProfiles.find((user) => user.firebaseUid === intake.uploaderUid);
      const cards = creditCards.map((card) => ({
        id: card.id,
        lastFour: card.lastFour,
        status: card.status,
        holderId: card.holder.id,
        holderStatus: card.holder.status,
      }));
      const cardResolution = resolveUploaderCards({
        cards,
        uploaderUid: String(intake.uploaderUid ?? ""),
        uploaderUserId: uploader?.id,
      });
      const duplicateFingerprint = buildInvoiceBusinessFingerprint({
        vendor: intake.extractedVendor,
        invoiceNumber: intake.extractedInvoiceNumber,
        invoiceDate: intake.extractedInvoiceDate,
        totalCents: intake.extractedTotalCents,
        lineItems: parsedLineItems(intake.extractedLineItems),
      }, cardResolution.card?.id ?? null);
      if (duplicateFingerprint) {
        owner = activeDuplicateOwner(candidates, receiptId, "duplicateFingerprint", duplicateFingerprint);
        if (!owner) {
          try {
            const claim = await dataConnect.executeMutation<{ invoiceIntake_updateMany: number }, { receiptId: string; duplicateFingerprint: string }>(
              "ClaimInvoiceIntakeBusinessFingerprint",
              { receiptId, duplicateFingerprint },
            );
            if (claim.data.invoiceIntake_updateMany !== 1) throw new Error("Empreinte commerciale non réclamée.");
            intake.duplicateFingerprint = duplicateFingerprint;
          } catch (error) {
            const refreshed = await listAllInvoiceIntakes(dataConnect);
            owner = activeDuplicateOwner(refreshed, receiptId, "duplicateFingerprint", duplicateFingerprint) as Record<string, unknown> | null;
            if (!owner) throw error;
          }
        }
        if (owner) duplicateReason = "BUSINESS_FINGERPRINT";
      }
    }

    if (owner && duplicateReason) {
      await markDuplicate(dataConnect, intake, owner, duplicateReason);
      duplicates += 1;
    }
  }
  return duplicates;
}

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
    const duplicates = await deduplicateExistingIntakes(dataConnect, allIntakes).catch((error) => {
      console.error("[invoice-worker] phase=deduplication_failed", {
        message: error instanceof Error ? error.message : "unknown",
      });
      return 0;
    });
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
    console.info("[invoice-worker] phase=queue_selected", { count: queued.length, requeued, duplicates });
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
    console.info("[invoice-worker] phase=cron_finished", { count: results.length, failed: failedResults.length, duplicates });
    return Response.json(
      { ok: failedResults.length === 0, queued: queued.length, duplicates, results },
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
