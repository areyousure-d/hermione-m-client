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
