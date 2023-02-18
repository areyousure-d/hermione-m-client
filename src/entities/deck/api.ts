import { createQuery } from "@farfetched/core";

import { createRequest, createRequestWithParams } from "@/shared/api";

export const fetchDeckList = () =>
  createRequest({ path: "/decklist", method: "GET", withToken: true });

export const getDeckById = (deckId: number) =>
  createRequest({
    path: `/deck/${deckId}`,
    method: "GET",
    withToken: true,
  });

const fetchDeckListFx = createRequestWithParams((deckId: string) => ({
  path: `/deck/${deckId}`,
  method: "GET",
}));

export const deckListQuery = createQuery({
  effect: fetchDeckListFx,
});
