import { createMutation } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { Deck, deckSchema } from "../deck.schema";

const deckContract = zodContract(deckSchema);

export const updateDeckMutation = createMutation({
  effect: createRequestEffect((deck: Pick<Deck, "id" | "deckname">) => ({
    path: `/decks/${deck.id}`,
    method: "PATCH",
    body: deck,
  })),
  contract: deckContract,
});

export const deleteDeckMutation = createMutation({
  effect: createRequestEffect((deck: Pick<Deck, "id">) => ({
    path: `/decks/${deck.id}`,
    method: "DELETE",
  })),
  contract: deckContract,
});
