import { createRequest } from "@/shared/api";

import { Card } from "./model";

export const fetchCardList = (deckId: string) =>
  createRequest({ path: `/deck/${deckId}`, method: "GET", withToken: true });

export const createCard = (body: Omit<Card, "id">) =>
  createRequest({ path: `/deck/card`, method: "POST", body, withToken: true });
