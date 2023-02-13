import { getRequest, postRequest } from "@/shared/api";

import { Card } from "./model";

export const fetchCardList = (deckId: string) => getRequest(`/deck/${deckId}`);

export const createCard = (body: Omit<Card, "id">) =>
  postRequest(`/deck/card`, body, true);
