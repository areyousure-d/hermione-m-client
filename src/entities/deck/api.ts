import { createQuery } from "@farfetched/core";

import { createRequestEffect } from "@/shared/api";

const fetchDeckListFx = createRequestEffect(() => ({
  path: `/decklist`,
  method: "GET",
}));

const getDeckByIdFx = createRequestEffect((deckId: number) => ({
  path: `/deck/${deckId}`,
  method: "GET",
}));

export const deckListQuery = createQuery({
  effect: fetchDeckListFx,
});

export const deckByIdQuery = createQuery({
  effect: getDeckByIdFx,
});
