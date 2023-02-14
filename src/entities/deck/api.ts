import { createRequest } from "@/shared/api";

import { Deck } from "./model";

export const fetchDeckList = () =>
  createRequest({ path: "/decklist", method: "GET", withToken: true });

export const createDeck = (body: Pick<Deck, "deckname">) =>
  createRequest({ path: "/decklist", method: "POST", body, withToken: true });

export const deleteDeck = (deckId: string) =>
  createRequest({
    path: "/deck",
    method: "DELETE",
    body: { deckId },
    withToken: true,
  });

export const updateDeck = (deck: Deck) =>
  createRequest({
    path: "/deck",
    method: "PATCH",
    body: deck,
    withToken: true,
  });

export const getDeckById = (deckId: Pick<Deck, "id">) =>
  createRequest({
    path: `/deck/${deckId}`,
    method: "GET",
    withToken: true,
  });
