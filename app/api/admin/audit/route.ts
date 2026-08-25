import { getFirebaseAdminAuth, getFirebaseAdminDataConnect } from "../../../../firebase/admin";

export const runtime = "nodejs";

async function authenticatePrivileged(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    return decoded.role === "ADMIN" || decoded.role === "KIM" ? decoded : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  if (!await authenticatePrivileged(request)) {
    return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  }
  const params = new URL(request.url).searchParams;
  const entityType = params.get("entityType");
  const entityId = params.get("entityId");
  if (!entityType || !entityId || entityType.length > 80 || entityId.length > 128) {
    return Response.json({ error: "L’entité auditée est invalide." }, { status: 400 });
  }
  try {
    const dataConnect = await getFirebaseAdminDataConnect();
    const auditEvents: unknown[] = [];
    for (let offset = 0; ; offset += 200) {
      const result = await dataConnect.executeQuery("ListAuditEvents", { entityType, entityId, limit: 200, offset });
      const page = (result.data as { auditEvents?: unknown[] }).auditEvents ?? [];
      auditEvents.push(...page);
      if (page.length < 200) break;
    }
    return Response.json({ events: auditEvents }, { headers: { "cache-control": "no-store" } });
  } catch {
    return Response.json({ error: "La piste d’audit n’est pas disponible." }, { status: 503 });
  }
}
