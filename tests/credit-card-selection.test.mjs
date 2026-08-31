import assert from "node:assert/strict";
import test from "node:test";
import { uniqueCreditCards } from "../lib/credit-card-selection.mjs";

test("regroupe les lignes dupliquées d’une même carte et d’un même titulaire", () => {
  const cards = uniqueCreditCards([
    { id: "CARD-1", lastFour: "1807", holderId: "USER-1", status: "ACTIVE" },
    { id: "CARD-2", lastFour: "1807", holderId: "USER-1", status: "ACTIVE" },
  ]);

  assert.deepEqual(cards.map((card) => card.id), ["CARD-1"]);
});

test("conserve deux cartes ayant les mêmes chiffres si les titulaires diffèrent", () => {
  const cards = uniqueCreditCards([
    { id: "CARD-1", lastFour: "1807", holderId: "USER-1", status: "ACTIVE" },
    { id: "CARD-2", lastFour: "1807", holderId: "USER-2", status: "ACTIVE" },
  ]);

  assert.equal(cards.length, 2);
});
