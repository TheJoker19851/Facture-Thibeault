import {
  INVOICE_CLIENT_VERSION,
  clientUpdateRequiredResponse,
  isCurrentInvoiceClientVersion,
} from "../../../lib/invoice-client-version.mjs";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const receivedVersion = new URL(request.url).searchParams.get("invoiceClientVersion");
  if (!isCurrentInvoiceClientVersion(receivedVersion)) return clientUpdateRequiredResponse();

  return Response.json({
    ok: true,
    invoiceClientVersion: INVOICE_CLIENT_VERSION,
  }, {
    headers: {
      "cache-control": "no-store, max-age=0",
      pragma: "no-cache",
    },
  });
}
