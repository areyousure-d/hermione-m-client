import { createMutation } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { Deck } from "@/entities/deck";
import { createRequestEffect } from "@/shared/api";

import { Card, cardSchema } from "../card.schema";
import { Rating } from "../types";

const cardContract = zodContract(cardSchema);

export const deleteCardMutation = createMutation({
  effect: createRequestEffect(
    ({ cardId, deckId }: { cardId: Card["id"]; deckId: Deck["id"] }) => ({
      path: `/decks/${deckId}/cards/${cardId}`,
      method: "DELETE",
    })
  ),
  contract: cardContract,
});

type CreateCardMutationParams = {
  deckId: Deck["id"];
  body: Pick<Card, "front" | "back">;
};

export const createCardMutation = createMutation({
  effect: createRequestEffect(({ deckId, body }: CreateCardMutationParams) => ({
    path: `/decks/${deckId}/cards`,
    method: "POST",
    body,
  })),
  contract: cardContract,
});

type UpdateCardMutationParams = {
  cardId: Card["id"];
  deckId: Deck["id"];
  body: Pick<Card, "front" | "back">;
};

export const editCardMutation = createMutation({
  effect: createRequestEffect(
    ({ cardId, deckId, body }: UpdateCardMutationParams) => ({
      path: `/decks/${deckId}/cards/${cardId}`,
      method: "PATCH",
      body,
    })
  ),
  contract: cardContract,
});

export const learnCardMutation = createMutation({
  effect: createRequestEffect(
    ({
      cardId,
      deckId,
      rating,
    }: {
      cardId: Card["id"];
      deckId: Deck["id"];
      rating: Rating;
    }) => ({
      path: `/learn/${deckId}/learn-card/${cardId}`,
      method: "POST",
      body: { rating },
    })
  ),
  contract: cardContract,
});
