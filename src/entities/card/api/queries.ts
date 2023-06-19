import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { cardSchema } from "../card.schema";

const cardListContract = zodContract(cardSchema.array());

const fetchCardListFx = createRequestEffect((deckId: string | number) => ({
  path: `/decks/${deckId}/cards`,
  method: "GET",
}));

export const cardListQuery = createQuery({
  effect: fetchCardListFx,
  contract: cardListContract,
});

export const cardsToLearnQuery = createQuery({
  effect: createRequestEffect((deckId: string | number) => ({
    path: `/learn/${deckId}/cards`,
    method: "GET",
  })),
  contract: cardListContract,
});
