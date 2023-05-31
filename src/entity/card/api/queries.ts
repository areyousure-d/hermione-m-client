import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { cardSchema } from "../card.schema";

const cardListContract = zodContract(cardSchema.array());

const fetchCardListFx = createRequestEffect((deckId: string) => ({
  path: `decks/${deckId}/cards`,
  method: "GET",
}));

export const cardListQuery = createQuery({
  effect: fetchCardListFx,
  contract: cardListContract,
});
