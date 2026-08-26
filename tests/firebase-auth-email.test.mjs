import assert from "node:assert/strict";
import test from "node:test";
import { sendFirebasePasswordSetupEmail } from "../lib/firebase-auth-email.mjs";

function preserveEnvironment(names) {
  const previous = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  return () => {
    for (const name of names) {
      if (previous[name] === undefined) delete process.env[name];
      else process.env[name] = previous[name];
    }
  };
}

test("le mode mock local n’appelle pas Firebase", async () => {
  const restore = preserveEnvironment(["APP_ENV", "EMAIL_DELIVERY_MODE"]);
  process.env.APP_ENV = "local";
  process.env.EMAIL_DELIVERY_MODE = "mock";
  try {
    const result = await sendFirebasePasswordSetupEmail({
      to: "alice@example.test",
      continueUrl: "http://127.0.0.1:3000/installer",
      idempotencyKey: "test-mock",
      fetchImpl: async () => { throw new Error("Le réseau ne doit pas être appelé en mode mock."); },
    });
    assert.equal(result.id, "mock-test-mock");
  } finally {
    restore();
  }
});

test("envoie un email de définition de mot de passe via Identity Toolkit", async () => {
  const restore = preserveEnvironment(["APP_ENV", "EMAIL_DELIVERY_MODE"]);
  process.env.APP_ENV = "production";
  delete process.env.EMAIL_DELIVERY_MODE;
  try {
    let request;
    const result = await sendFirebasePasswordSetupEmail({
      to: "alice@example.test",
      continueUrl: "https://facture.example.test/installer",
      apiKey: "test-api-key",
      fetchImpl: async (url, options) => {
        request = { url, options };
        return { ok: true, status: 200, json: async () => ({ email: "alice@example.test" }) };
      },
    });
    assert.equal(result.id, "alice@example.test");
    assert.match(request.url, /accounts:sendOobCode\?key=test-api-key$/);
    assert.equal(request.options.method, "POST");
    assert.equal(request.options.headers["x-firebase-locale"], "fr");
    assert.deepEqual(JSON.parse(request.options.body), {
      requestType: "PASSWORD_RESET",
      email: "alice@example.test",
      continueUrl: "https://facture.example.test/installer",
      canHandleCodeInApp: false,
    });
  } finally {
    restore();
  }
});

test("signale une configuration ou un refus Firebase sans exposer la réponse fournisseur", async () => {
  const restore = preserveEnvironment(["APP_ENV", "EMAIL_DELIVERY_MODE"]);
  process.env.APP_ENV = "production";
  delete process.env.EMAIL_DELIVERY_MODE;
  try {
    await assert.rejects(
      () => sendFirebasePasswordSetupEmail({ to: "alice@example.test", continueUrl: "https://facture.example.test/installer", apiKey: "" }),
      (error) => error.code === "EMAIL_NOT_CONFIGURED",
    );
    await assert.rejects(
      () => sendFirebasePasswordSetupEmail({
        to: "alice@example.test",
        continueUrl: "https://facture.example.test/installer",
        apiKey: "test-api-key",
        fetchImpl: async () => ({ ok: false, status: 400, json: async () => ({ error: { message: "EMAIL_NOT_FOUND" } }) }),
      }),
      (error) => error.code === "EMAIL_PROVIDER_REJECTED" && /HTTP 400/.test(error.message) && !/EMAIL_NOT_FOUND/.test(error.message),
    );
  } finally {
    restore();
  }
});
