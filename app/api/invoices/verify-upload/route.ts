import { z } from "zod";
import { firebaseAdminConfigured, getFirebaseAdminStorage, verifyFirebaseIdToken } from "../../../../firebase/admin";
import { clientUpdateRequiredResponse, isCurrentInvoiceClientVersion } from "../../../../lib/invoice-client-version.mjs";
import { verifyStoredCapturePhoto } from "../../../../lib/capture-upload-recovery.server.mjs";

export const runtime = "nodejs";
const inputSchema = z.object({
  receiptId: z.string().regex(/^[a-zA-Z0-9_-]{8,128}$/),
  storageFolder: z.string().regex(/^receipts\/\d{4}\/\d{2}\/[a-zA-Z0-9_-]{8,128}$/),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
});

/** Read-only proof for a lost upload acknowledgement; no accounting writes. */
export async function POST(request: Request) {
  if (!isCurrentInvoiceClientVersion(request.headers.get("x-invoice-client-version"))) return clientUpdateRequiredResponse();
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  const identity = token ? await verifyFirebaseIdToken(token, "invoice_upload_recovery").catch(() => null) : null;
  if (!identity || !["WORKER", "KIM", "ADMIN"].includes(String(identity.role))) return Response.json({ error: "Une session Firebase valide est requise." }, { status: 403 });
  if (!firebaseAdminConfigured()) return Response.json({ error: "La vérification serveur est indisponible." }, { status: 503 });
  const input = inputSchema.safeParse(await request.json().catch(() => null));
  if (!input.success || !input.data.storageFolder.endsWith(`/${input.data.receiptId}`)) return Response.json({ error: "Dépôt invalide." }, { status: 400 });
  try {
    const storage = await getFirebaseAdminStorage();
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!bucketName) return Response.json({ error: "Le stockage serveur est indisponible." }, { status: 503 });
    await verifyStoredCapturePhoto(storage.bucket(bucketName), { ...input.data, uploaderUid: identity.uid }, input.data.sha256);
    return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
  } catch {
    return Response.json({ error: "La photo reçue n’a pas pu être confirmée. L’original du brouillon est conservé." }, { status: 409 });
  }
}
