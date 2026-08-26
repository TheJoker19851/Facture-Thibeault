export class TransactionalEmailError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "TransactionalEmailError";
    this.code = code;
  }
}

function configuredValue(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export function emailDeliveryConfiguration() {
  const apiKey = configuredValue("RESEND_API_KEY");
  const from = configuredValue("RESEND_FROM_EMAIL");
  return {
    provider: apiKey && from ? "resend" : "unconfigured",
    configured: Boolean(apiKey && from),
  };
}

export async function sendTransactionalEmail({ to, subject, html, text, idempotencyKey, fetchImpl = globalThis.fetch }) {
  if (configuredValue("EMAIL_DELIVERY_MODE") === "mock" && configuredValue("APP_ENV") !== "production") {
    return { id: `mock-${idempotencyKey ?? "email"}` };
  }

  const apiKey = configuredValue("RESEND_API_KEY");
  const from = configuredValue("RESEND_FROM_EMAIL");
  if (!apiKey || !from) {
    throw new TransactionalEmailError(
      "EMAIL_NOT_CONFIGURED",
      "L’envoi d’email n’est pas configuré. Ajoutez RESEND_API_KEY et RESEND_FROM_EMAIL côté serveur.",
    );
  }
  if (typeof fetchImpl !== "function") {
    throw new TransactionalEmailError("EMAIL_TRANSPORT_UNAVAILABLE", "Le transport email n’est pas disponible côté serveur.");
  }

  let response;
  try {
    response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        ...(idempotencyKey ? { "idempotency-key": idempotencyKey } : {}),
      },
      body: JSON.stringify({ from, to: [to], subject, html, text }),
    });
  } catch {
    throw new TransactionalEmailError("EMAIL_TRANSPORT_FAILED", "Le fournisseur email n’a pas pu être joint.");
  }

  let body = {};
  try {
    body = await response.json();
  } catch {
    // The provider response is deliberately not returned to the browser.
  }
  if (!response.ok || !body.id) {
    throw new TransactionalEmailError(
      "EMAIL_PROVIDER_REJECTED",
      `Le fournisseur email a refusé l’envoi (HTTP ${response.status}).`,
    );
  }
  return { id: String(body.id) };
}
