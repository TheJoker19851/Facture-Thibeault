import assert from "node:assert/strict";
import test from "node:test";
import { accountRoleIdentity } from "../lib/account-role-identity.mjs";

test("identifie le compte administrateur sans référence à Kim", () => {
  assert.deepEqual(accountRoleIdentity("ADMIN"), {
    initial: "A",
    label: "Admin",
    description: "Administration",
  });
});

test("identifie le compte Kim sans référence à l’administration", () => {
  assert.deepEqual(accountRoleIdentity("KIM"), {
    initial: "K",
    label: "Kim",
    description: "Contrôle comptable",
  });
});

test("ne mélange jamais les deux identités", () => {
  for (const role of ["ADMIN", "KIM"]) {
    const identity = accountRoleIdentity(role);
    assert.doesNotMatch(`${identity.label} ${identity.description}`, /Kim\s*\/\s*Administration/i);
  }
});
