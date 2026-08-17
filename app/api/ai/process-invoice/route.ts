import { generateText, Output } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { z } from "zod";
import { validateInvoiceExtraction } from "../../../../lib/invoice-processing.mjs";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 12 * 1024 * 1024;
const MAX_TOTAL_BYTES = 40 * 1024 * 1024;
const ALLOWED_ROLES = new Set(["WORKER", "KIM", "ADMIN", "SUPER_ADMIN"]);
const ALLOWED_MEDIA_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const invoiceExtractionSchema = z.object({
  vendor: z.string(),
  invoiceNumber: z.string().nullable(),
  invoiceDate: z.string().nullable(),
  subtotalCents: z.number().int().nonnegative(),
  tpsCents: z.number().int().nonnegative(),
  tvqCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
  currency: z.string(),
  sku: z.string().nullable(),
  category: z.string().nullable(),
  projectId: z.string().nullable(),
  confidence: z.number().min(0).max(1),
  notes: z.string(),
});

type FirebaseTokenPayload = {
  aud?: string;
  iss?: string;
  role?: unknown;
  sub?: string;
};

type FirebaseLookupResponse = {
  users?: Array<{ localId?: string }>;
};

function decodeTokenPayload(token: string): FirebaseTokenPayload | null {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;
    const paddedPayload = encodedPayload.padEnd(Math.ceil(encodedPayload.length / 4) * 4, "=");
    return JSON.parse(Buffer.from(paddedPayload, "base64url").toString("utf8")) as FirebaseTokenPayload;
  } catch {
    return null;
  }
}

async function authenticate(request: Request): Promise<boolean> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!token || !apiKey || !projectId) return false;

  const lookupResponse = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken: token }),
      cache: "no-store",
    },
  );
  if (!lookupResponse.ok) return false;

  const lookup = (await lookupResponse.json()) as FirebaseLookupResponse;
  const payload = decodeTokenPayload(token);
  const firebaseIssuer = `https://securetoken.google.com/${projectId}`;
  const user = lookup.users?.[0];
  return Boolean(
    user?.localId &&
      payload?.sub === user.localId &&
      payload.aud === projectId &&
      payload.iss === firebaseIssuer &&
      typeof payload.role === "string" &&
      ALLOWED_ROLES.has(payload.role),
  );
}

const instructions = `You are the production invoice intake agent for Maçonnerie Thibeault.
Read all supplied photos as pages of one invoice. Extract only information visible in the document.
Never invent a value: use null for a missing invoice number, date, SKU, project or category.
Return monetary values as integer Canadian cents. Use ISO date YYYY-MM-DD when the date is readable.
The subtotal plus TPS plus TVQ must equal the total; if a value is unclear, lower confidence and explain it in notes.
Use category only as a suggestion. Do not invent an accounting account or approve the invoice.
Keep vendor names and invoice numbers faithful to the document, including accents and punctuation.`;

export async function POST(request: Request) {
  const receiptIdForLog = "unknown";
  try {
    if (!(await authenticate(request))) {
      return Response.json({ error: "Authentification Firebase requise." }, { status: 401 });
    }

    const formData = await request.formData();
    const receiptId = formData.get("receiptId");
    const files = formData.getAll("photos").filter((value): value is File => value instanceof File);
    if (typeof receiptId !== "string" || !/^[a-zA-Z0-9_-]{8,128}$/.test(receiptId)) {
      return Response.json({ error: "Identifiant de facture invalide." }, { status: 400 });
    }
    if (!files.length || files.length > MAX_PHOTOS) {
      return Response.json({ error: `Une facture doit contenir entre 1 et ${MAX_PHOTOS} photos.` }, { status: 400 });
    }

    let totalBytes = 0;
    for (const file of files) {
      if (!ALLOWED_MEDIA_TYPES.has(file.type)) {
        return Response.json({ error: "L'analyse IA accepte les images JPEG, PNG ou WebP." }, { status: 400 });
      }
      if (!file.size || file.size > MAX_PHOTO_BYTES) {
        return Response.json({ error: "Chaque photo doit faire au maximum 12 Mo." }, { status: 400 });
      }
      totalBytes += file.size;
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      return Response.json({ error: "La facture complète doit faire au maximum 40 Mo." }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("[invoice-ai] GOOGLE_GENERATIVE_AI_API_KEY is missing");
      return Response.json({ error: "Le service IA n'est pas encore configure." }, { status: 503 });
    }

    const modelId = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const google = createGoogle({ apiKey });
    const imageParts = await Promise.all(
      files.map(async (file) => ({
        type: "file" as const,
        data: Buffer.from(await file.arrayBuffer()),
        mediaType: file.type,
      })),
    );

    const result = await generateText({
      model: google(modelId),
      instructions,
      output: Output.object({
        name: "invoice_extraction",
        description: "Structured OCR result for one Canadian invoice.",
        schema: invoiceExtractionSchema,
      }),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Receipt ID ${receiptId}. These are ${files.length} page(s) of the same invoice. Extract the invoice now.`,
            },
            ...imageParts,
          ],
        },
      ],
    });

    const extraction = result.output;
    const validation = validateInvoiceExtraction(extraction);
    if (!validation.ok) {
      return Response.json(
        { error: "La lecture IA doit être vérifiée manuellement.", code: "AI_OUTPUT_REQUIRES_REVIEW" },
        { status: 422 },
      );
    }

    return Response.json({
      ok: true,
      receiptId,
      model: modelId,
      extraction: {
        ...validation.value,
        confidence: extraction.confidence,
        notes: extraction.notes,
        category: extraction.category,
        projectId: extraction.projectId,
        sku: extraction.sku,
      },
    });
  } catch (error) {
    console.error("[invoice-ai] request failed", {
      receiptId: receiptIdForLog,
      message: error instanceof Error ? error.message : "unknown error",
    });
    return Response.json({ error: "Le traitement IA a échoué; la facture reste reçue." }, { status: 500 });
  }
}
