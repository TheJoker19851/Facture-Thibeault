import assert from "node:assert/strict";
import test from "node:test";
import { collectPagedRows } from "../lib/pagination.mjs";

test("collectPagedRows conserve toutes les lignes au-delà de 250", async () => {
  const sourceRows = Array.from({ length: 251 }, (_, index) => ({ id: `row-${index + 1}` }));
  const calls = [];
  const rows = await collectPagedRows(async ({ limit, offset }) => {
    calls.push({ limit, offset });
    return sourceRows.slice(offset, offset + limit);
  });

  assert.equal(rows.length, 251);
  assert.deepEqual(rows, sourceRows);
  assert.deepEqual(calls, [
    { limit: 200, offset: 0 },
    { limit: 200, offset: 200 },
  ]);
});
