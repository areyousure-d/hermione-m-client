import { createRequest } from "@/shared/api";

import { Card } from "./model";

export const fetchCardList = (deckId: string) =>
  createRequest({
    path: `/deck/${deckId}`,
    method: "GET",
    withToken: true,
  });

export const createCard = (body: Omit<Card, "id">) =>
  createRequest({
    path: `/deck/card`,
    method: "POST",
    body,
    withToken: true,
  });

export const updateCard = (body: Card) =>
  createRequest({
    path: "/card",
    method: "PATCH",
    body,
    withToken: true,
  });

export const deleteCard = (cardId: Pick<Card, "id" | "deck_id">) =>
  createRequest({
    path: "/card",
    method: "DELETE",
    body: cardId,
    withToken: true,
  });
