import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect, getFirebaseAdminStorage } from "../../../../firebase/admin";
import { inferApplicationEnvironment } from "../../../../lib/environment.mjs";
import { INVOICE_CLIENT_VERSION } from "../../../../lib/invoice-client-version.mjs";

export const runtime = "nodejs";

async function authenticateAdmin(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "ADMIN" ? decoded : null;
  } catch {
    return null;
  }
}

function newestTimestamp(rows: Array<{ updatedAt?: string | null; createdAt?: string | null }>) {
  const values = rows.flatMap((row) => [row.updatedAt, row.createdAt]).filter((value): value is string => Boolean(value));
  return values.sort().at(-1) ?? null;
}

function newestError(rows: Array<{ updatedAt?: string | null; lastError?: string | null }>) {
  return rows
    .filter((row) => row.lastError)
    .sort((left, right) => String(right.updatedAt ?? "").localeCompare(String(left.updatedAt ?? "")))
    .at(0) ?? null;
}

export async function GET(request: Request) {
  if (!await authenticateAdmin(request)) {
    return Response.json({ error: "Le rôle ADMIN est requis." }, { status: 403 });
  }

  const environment = inferApplicationEnvironment({
    appEnvironment: process.env.APP_ENV ?? process.env.NEXT_PUBLIC_APP_ENV,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    useEmulators: process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS,
  });
  const base = {
    environment: environment === "production" ? "Production" : environment === "local" ? "Local" : "Non disponible",
    deployedCommit: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "Non disponible",
    clientVersion: INVOICE_CLIENT_VERSION,
    minimumClientVersion: INVOICE_CLIENT_VERSION,
    firebase: firebaseAdminConfigured() ? "Configuré" : "Non disponible",
    storage: "Non disponible",
    gemini: process.env.INVOICE_AI_MODE === "live" && Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY && process.env.GEMINI_MODEL) ? "Configuré" : "Non disponible",
    transactionCount: "Non disponible" as number | string,
    reviewInvoiceCount: "Non disponible" as number | string,
    processingDepositCount: "Non disponible" as number | string,
    failedProcessingCount: "Non disponible" as number | string,
    lastProcessingAt: null as string | null,
    lastApplicationError: null as { message: string; at: string | null } | null,
  };

  try {
    const dataConnect = await getFirebaseAdminDataConnect();
    const [transactions, invoices, intakes] = await Promise.all([
      dataConnect.executeQuery<{ expenseTransactions: Array<{ updatedAt?: string | null; createdAt?: string | null }> }>("ListExpenseTransactions"),
      dataConnect.executeQuery<{ invoices: Array<{ updatedAt?: string | null; createdAt?: string | null }> }>("ListInvoicesToReview"),
      dataConnect.executeQuery<{ invoiceIntakes: Array<{ processingStatus?: string | null; accountingStatus?: string | null; lastError?: string | null; updatedAt?: string | null; createdAt?: string | null }> }>("ListInvoiceIntakes"),
    ]);
    const transactionRows = transactions.data.expenseTransactions ?? [];
    const invoiceRows = invoices.data.invoices ?? [];
    const intakeRows = intakes.data.invoiceIntakes ?? [];
    const latestError = newestError(intakeRows);
    base.transactionCount = transactionRows.length;
    base.reviewInvoiceCount = invoiceRows.length;
    base.processingDepositCount = intakeRows.filter((row) => (row.processingStatus ?? "PROCESSING") === "PROCESSING").length;
    base.failedProcessingCount = intakeRows.filter((row) => Boolean(row.lastError) || row.accountingStatus === "POSTING_ERROR").length;
    base.lastProcessingAt = newestTimestamp(intakeRows);
    base.lastApplicationError = latestError ? { message: latestError.lastError ?? "Non disponible", at: latestError.updatedAt ?? null } : null;
  } catch {
    // The response deliberately keeps unavailable values explicit instead of
    // replacing a failed read with a fabricated zero.
  }

  try {
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (bucketName) {
      await (await getFirebaseAdminStorage()).bucket(bucketName).getFiles({ prefix: "receipts/", maxResults: 1 });
      base.storage = "Opérationnel";
    }
  } catch {
    base.storage = "Erreur";
  }

  return Response.json(base, { headers: { "cache-control": "no-store" } });
}
