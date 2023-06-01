import { createMutation } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { Deck } from "@/entity/deck";
import { createRequestEffect } from "@/shared/api";

import { Card, cardSchema } from "../card.schema";

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

export const updateCardMutation = createMutation({
  effect: createRequestEffect(
    ({ cardId, deckId, body }: UpdateCardMutationParams) => ({
      path: `/decks/${deckId}/cards/${cardId}`,
      method: "PATCH",
      body,
    })
  ),
  contract: cardContract,
});
