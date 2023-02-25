import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { deckListSchema, deckSchema } from "../model";

const deckListContract = zodContract(deckListSchema);
const deckContract = zodContract(deckSchema);

const fetchDeckListFx = createRequestEffect(() => ({
  path: `/decklist`,
  method: "GET",
}));

const getDeckByIdFx = createRequestEffect((deckId: number) => ({
  path: `/deck/${deckId}`,
  method: "GET",
}));

export const deckListQuery = createQuery({
  effect: fetchDeckListFx,
  contract: deckListContract,
});

export const deckByIdQuery = createQuery({
  effect: getDeckByIdFx,
  contract: deckContract,
});
