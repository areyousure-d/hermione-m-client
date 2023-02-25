import { createMutation } from "@farfetched/core";

import { createRequestEffect } from "@/shared/api";

import { Deck } from "../model";

export const createDeckMutation = createMutation({
  effect: createRequestEffect((deck: Pick<Deck, "deckname">) => ({
    path: "/decklist",
    method: "POST",
    body: deck,
  })),
});

export const deleteDeckMutation = createMutation({
  effect: createRequestEffect((deckId: Pick<Deck, "id">) => ({
    path: "/deck",
    method: "DELETE",
    body: deckId,
  })),
});

export const updateDeckMutation = createMutation({
  effect: createRequestEffect((deck: Deck) => ({
    path: "/deck",
    method: "PATCH",
    body: deck,
  })),
});
