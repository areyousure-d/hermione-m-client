import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { deckSchema } from "../deck.schema";

const fetchDeckListFx = createRequestEffect(() => ({
  path: "decks",
  method: "GET",
}));

const deckContract = zodContract(deckSchema.array());

export const deckListQuery = createQuery({
  effect: fetchDeckListFx,
  contract: deckContract,
});
