export class FirebaseAuthEmailError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "FirebaseAuthEmailError";
    this.code = code;
  }
}

function configuredValue(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function identityToolkitApiKey() {
  return configuredValue("IDENTITY_TOOLKIT_API_KEY") || configuredValue("NEXT_PUBLIC_FIREBASE_API_KEY");
}

export function firebaseAuthEmailConfiguration() {
  return {
    provider: identityToolkitApiKey() ? "firebase-auth" : "unconfigured",
    configured: Boolean(identityToolkitApiKey()),
  };
}

function mockEmail(idempotencyKey) {
  return configuredValue("EMAIL_DELIVERY_MODE") === "mock" && configuredValue("APP_ENV") !== "production"
    ? { id: `mock-${idempotencyKey ?? "firebase-email"}` }
    : null;
}

export async function sendFirebasePasswordSetupEmail({
  to,
  continueUrl,
  idempotencyKey,
  fetchImpl = globalThis.fetch,
  apiKey = identityToolkitApiKey(),
}) {
  const mock = mockEmail(idempotencyKey);
  if (mock) return mock;

  if (!apiKey) {
    throw new FirebaseAuthEmailError(
      "EMAIL_NOT_CONFIGURED",
      "L’envoi Firebase n’est pas configuré. Ajoutez IDENTITY_TOOLKIT_API_KEY côté serveur.",
    );
  }
  if (typeof fetchImpl !== "function") {
    throw new FirebaseAuthEmailError("EMAIL_TRANSPORT_UNAVAILABLE", "Le transport Firebase n’est pas disponible côté serveur.");
  }

  let response;
  try {
    response = await fetchImpl(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json", "x-firebase-locale": "fr" },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: to,
          continueUrl,
          canHandleCodeInApp: false,
        }),
      },
    );
  } catch {
    throw new FirebaseAuthEmailError("EMAIL_TRANSPORT_FAILED", "Firebase Authentication n’a pas pu être joint.");
  }

  let body = {};
  try {
    body = await response.json();
  } catch {
    // The provider response is deliberately not returned to the browser.
  }
  if (!response.ok) {
    throw new FirebaseAuthEmailError(
      "EMAIL_PROVIDER_REJECTED",
      `Firebase Authentication a refusé l’envoi (HTTP ${response.status}).`,
    );
  }
  return { id: String(body.email ?? to) };
}
