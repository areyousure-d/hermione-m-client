import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { deckSchema } from "@/entities/deck/deck.schema";
import { createRequestEffect } from "@/shared/api";

import { cardSchema } from "../card.schema";

const cardListContract = zodContract(cardSchema.array());
const cardQueryContract = zodContract(cardSchema.extend({ deck: deckSchema }));

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

type CardQueryParams = {
  deckId: string | number;
  cardId: string | number;
};

export const cardQuery = createQuery({
  effect: createRequestEffect(({ deckId, cardId }: CardQueryParams) => ({
    path: `/decks/${deckId}/cards/${cardId}`,
    method: "GET",
  })),
  contract: cardQueryContract,
});
