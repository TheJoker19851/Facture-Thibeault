const IDENTITIES = Object.freeze({
  ADMIN: Object.freeze({ initial: "A", label: "Admin", description: "Administration" }),
  KIM: Object.freeze({ initial: "K", label: "Kim", description: "Contrôle comptable" }),
});

export function accountRoleIdentity(role) {
  return IDENTITIES[role] ?? Object.freeze({ initial: "", label: "Compte", description: "Accès limité" });
}
