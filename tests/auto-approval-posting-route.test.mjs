import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routePath = new URL("../app/api/ai/process-invoice/route.ts", import.meta.url);

test("le chemin AUTO_APPROVED ne dépend pas du projet", async () => {
  const source = await readFile(routePath, "utf8");
  const branchStart = source.indexOf('if (decision.decision === "AUTO_APPROVED")');
  const branchEnd = source.indexOf("\n    return Response.json({", branchStart);

  assert.ok(branchStart >= 0, "Le chemin AUTO_APPROVED doit exister.");
  assert.ok(branchEnd > branchStart, "La fin du chemin AUTO_APPROVED doit exister.");

  const branch = source.slice(branchStart, branchEnd);
  assert.match(branch, /const \{ accountCode, cardId \} = decision\.resolutions;/);
  assert.match(branch, /statementPeriodId: null,\s+projectId: null,/);
});
