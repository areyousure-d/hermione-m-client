import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { deck, deckList } from "./model";

const deckListContract = zodContract(deckList);
const deckContract = zodContract(deck);

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
