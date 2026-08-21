import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import {
  buildPersistedReconciliation,
  loadReconciliationContext,
  persistLineStatus,
  persistManualMatch,
  persistOutsideControls,
  resolveOutsideControl,
} from "../../../../lib/reconciliation-server.mjs";
import { reconcileStatement, RECONCILIATION_STATUSES } from "../../../../lib/reconciliation.mjs";
import { AUDIT_ACTIONS } from "../../../../lib/audit-events.mjs";

export const runtime = "nodejs";

const actionSchema = z.object({
  action: z.enum(["AUTO_MATCH", "CONFIRM_MATCH", "CHANGE_MATCH", "UNLINK", "SET_STATUS", "RESOLVE_OUTSIDE"]),
  statementId: z.string().min(1),
  lineId: z.string().optional(),
  transactionId: z.string().optional(),
  invoiceId: z.string().nullable().optional(),
  status: z.string().optional(),
  controlId: z.string().optional(),
  resolutionNote: z.string().trim().max(1000).optional(),
});

async function authenticate(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "KIM" || decoded.role === "ADMIN" ? decoded : null;
  } catch {
    return null;
  }
}

function localOnly() {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "demo-facture-thibeault" && process.env.APP_ENV === "local" && process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true";
}

export async function POST(request: Request) {
  if (!localOnly() || !firebaseAdminConfigured()) return Response.json({ error: "Les actions sont verrouillées hors de l’émulateur local." }, { status: 503 });
  const identity = await authenticate(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  const parsed = actionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Action de rapprochement invalide." }, { status: 400 });
  const input = parsed.data;
  try {
    const dataConnect = await getFirebaseAdminDataConnect();
    const context = await loadReconciliationContext(dataConnect, identity);
    const statement = context.statements.find((candidate: { id: string }) => candidate.id === input.statementId);
    if (!statement) return Response.json({ error: "Relevé introuvable." }, { status: 404 });
    const persisted = buildPersistedReconciliation(context, input.statementId);

    if (input.action === "AUTO_MATCH") {
      const base = reconcileStatement(statement, context.transactions, context.aliasRules) as { lineResults: Array<{ line: { id: string }; status: string; match: { expenseTransactionId: string; invoiceId?: string | null; matchScore: number } | null; reason: string }> };
      const saved = [];
      for (const result of base.lineResults) {
        if (result.status !== RECONCILIATION_STATUSES.MATCHED || !result.match) continue;
        const matchedExpenseTransactionId = result.match.expenseTransactionId;
        const existing = context.matches.find((match: { statementLine?: { id: string }; expenseTransaction?: { id: string }; status?: string; id: string }) => match.statementLine?.id === result.line.id);
        if (existing?.expenseTransaction?.id === matchedExpenseTransactionId && existing.status === RECONCILIATION_STATUSES.MATCHED) {
          saved.push(existing.id);
          continue;
        }
        const transaction = context.transactions.find((candidate: { id: string }) => candidate.id === matchedExpenseTransactionId);
        if (!transaction) continue;
        await persistManualMatch({
          dataConnect,
          identity,
          context,
          statementId: input.statementId,
          lineId: result.line.id,
          transactionId: transaction.id,
          invoiceId: result.match.invoiceId,
          previousMatch: existing,
          action: AUDIT_ACTIONS.RECONCILIATION_AUTO_MATCHED as never,
          matchScore: result.match.matchScore,
          matchMethod: "AUTO",
          reason: result.reason,
        });
        saved.push(`MATCH-${result.line.id}`);
      }
      const refreshed = buildPersistedReconciliation(await loadReconciliationContext(dataConnect, identity), input.statementId);
      const outside = await persistOutsideControls({ dataConnect, identity, reconciliation: refreshed });
      return Response.json({ ok: true, action: input.action, saved, outside, reconciliation: refreshed });
    }

    if (input.action === "RESOLVE_OUTSIDE") {
      if (!input.controlId) return Response.json({ error: "controlId requis." }, { status: 400 });
      const result = await resolveOutsideControl({ dataConnect, identity, context, controlId: input.controlId, resolutionNote: input.resolutionNote });
      return Response.json({ ok: true, action: input.action, result });
    }

    if (!input.lineId) return Response.json({ error: "lineId requis." }, { status: 400 });
    const lineResult = (persisted as { lineResults: Array<{ line: { id: string }; candidates: Array<{ transaction: { id: string; invoiceId?: string | null }; score: { score: number; reasons: string[] } }>; status: string; match: unknown }> }).lineResults.find((candidate) => candidate.line.id === input.lineId);
    if (!lineResult) return Response.json({ error: "Ligne de relevé introuvable." }, { status: 404 });
    const existing = context.matches.find((match: { statementLine?: { id: string }; expenseTransaction?: { id: string }; status?: string; id: string }) => match.statementLine?.id === input.lineId);

    if (input.action === "UNLINK") {
      if (!existing?.expenseTransaction?.id) return Response.json({ error: "Aucun jumelage actif à dissocier." }, { status: 409 });
      await dataConnect.executeMutation("ClearReconciliationMatch", {
        id: existing.id,
        statementLineId: input.lineId,
        previousExpenseTransactionId: existing.expenseTransaction.id,
        lineStatus: RECONCILIATION_STATUSES.REVIEW,
        auditEventId: `AUDIT-${input.lineId}-${AUDIT_ACTIONS.STATEMENT_MATCH_UNLINKED}`.slice(0, 128),
        actorUid: identity.uid,
        actorRole: identity.role,
        auditAction: AUDIT_ACTIONS.STATEMENT_MATCH_UNLINKED,
        auditDetails: JSON.stringify({ before: existing, after: { status: RECONCILIATION_STATUSES.REVIEW, expenseTransactionId: null, invoiceId: null } }),
      });
      return Response.json({ ok: true, action: input.action, lineId: input.lineId });
    }

    if (input.action === "SET_STATUS") {
      if (!input.status) return Response.json({ error: "status requis." }, { status: 400 });
      const result = await persistLineStatus({ dataConnect, identity, statementId: input.statementId, lineId: input.lineId, status: input.status, previousResult: lineResult });
      return Response.json({ ok: true, action: input.action, result });
    }

    if (!input.transactionId) return Response.json({ error: "transactionId requis." }, { status: 400 });
    const candidate = lineResult.candidates.find((item) => item.transaction.id === input.transactionId);
    if (!candidate) return Response.json({ error: "La transaction choisie n’est pas une candidate valide pour cette ligne." }, { status: 422 });
    const action = (input.action === "CHANGE_MATCH" ? AUDIT_ACTIONS.STATEMENT_MATCH_CHANGED : AUDIT_ACTIONS.STATEMENT_MATCH_CONFIRMED) as never;
    const result = await persistManualMatch({
      dataConnect,
      identity,
      context,
      statementId: input.statementId,
      lineId: input.lineId,
      transactionId: input.transactionId,
      invoiceId: input.invoiceId ?? candidate.transaction.invoiceId ?? null,
      previousMatch: existing,
      action,
      matchScore: candidate.score.score,
      matchMethod: "MANUAL",
      reason: `Jumelage manuel confirmé · ${candidate.score.reasons.join(" · ")}`,
    });
    return Response.json({ ok: true, action: input.action, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "L’action de rapprochement a échoué.";
    const status = /unique|jumelé|chevauche|concurr/i.test(message) ? 409 : 422;
    return Response.json({ error: message }, { status });
  }
}
