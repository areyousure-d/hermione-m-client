import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { deckSchema } from "../deck.schema";

const fetchDeckListFx = createRequestEffect(() => ({
  path: "/decks",
  method: "GET",
}));

const deckListContract = zodContract(deckSchema.array());

export const deckListQuery = createQuery({
  effect: fetchDeckListFx,
  contract: deckListContract,
});

const fetchDeckByIdFx = createRequestEffect((deckId: string) => ({
  path: `/decks/${deckId}`,
  method: "GET",
}));

const deckByIdContract = zodContract(deckSchema);

export const deckByIdQuery = createQuery({
  effect: fetchDeckByIdFx,
  contract: deckByIdContract,
});
