import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";
import { loadReconciliationContext, upsertHolderHistory, upsertMerchantAlias } from "../../../../lib/reconciliation-server.mjs";

export const runtime = "nodejs";

const configSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("HOLDER_HISTORY"), id: z.string().min(1), cardId: z.string().min(1), holderId: z.string().min(1), validFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), validTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(), isCurrent: z.boolean(), status: z.string().min(1) }),
  z.object({ kind: z.literal("MERCHANT_ALIAS"), id: z.string().min(1), merchantRawKey: z.string().trim().min(1), merchantNormalized: z.string().trim().optional(), merchantCanonical: z.string().trim().min(1), active: z.boolean(), status: z.string().min(1), source: z.string().min(1), confidence: z.number().min(0).max(1).nullable().optional(), method: z.string().trim().nullable().optional() }),
]);

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

export async function GET(request: Request) {
  if (!localOnly() || !firebaseAdminConfigured()) return Response.json({ error: "Configuration verrouillée hors de l’émulateur local." }, { status: 503 });
  const identity = await authenticate(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  const context = await loadReconciliationContext(await getFirebaseAdminDataConnect(), identity);
  return Response.json({ aliases: context.aliases, histories: context.histories });
}

export async function POST(request: Request) {
  if (!localOnly() || !firebaseAdminConfigured()) return Response.json({ error: "Configuration verrouillée hors de l’émulateur local." }, { status: 503 });
  const identity = await authenticate(request);
  if (!identity || identity.role !== "ADMIN") return Response.json({ error: "Le rôle ADMIN est requis." }, { status: 403 });
  const parsed = configSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Configuration de rapprochement invalide." }, { status: 400 });
  try {
    const dataConnect = await getFirebaseAdminDataConnect();
    const context = await loadReconciliationContext(dataConnect, identity);
    const configInput = Object.fromEntries(Object.entries(parsed.data).filter(([key]) => key !== "kind"));
    if (parsed.data.kind === "HOLDER_HISTORY") {
      await upsertHolderHistory({ dataConnect, identity, context, input: { ...configInput, validTo: parsed.data.validTo ?? null } });
    } else {
      await upsertMerchantAlias({ dataConnect, identity, context, input: { ...configInput, merchantNormalized: parsed.data.merchantNormalized || parsed.data.merchantCanonical, confidence: parsed.data.confidence ?? null, method: parsed.data.method ?? null } });
    }
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Configuration refusée." }, { status: 422 });
  }
}
