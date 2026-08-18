export const INVOICE_CLIENT_VERSION = "invoice-photo-v2";

export function isCurrentInvoiceClientVersion(value) {
  return value === INVOICE_CLIENT_VERSION;
}

export function clientUpdateRequiredResponse() {
  return Response.json({
    error: "Cette version de l’application est obsolète. Actualisez avant d’envoyer une facture.",
    code: "CLIENT_UPDATE_REQUIRED",
    minimumInvoiceClientVersion: INVOICE_CLIENT_VERSION,
  }, {
    status: 426,
    headers: {
      "cache-control": "no-store, max-age=0",
      pragma: "no-cache",
    },
  });
}
