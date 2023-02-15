import { createRequest } from "@/shared/api";

export const fetchDeckList = () =>
  createRequest({ path: "/decklist", method: "GET", withToken: true });

export const getDeckById = (deckId: number) =>
  createRequest({
    path: `/deck/${deckId}`,
    method: "GET",
    withToken: true,
  });
