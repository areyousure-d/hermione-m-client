import { getRequest, postRequest } from "@/shared/api";

import { Deck } from "./model";

export const fetchDeckList = () => getRequest("/decklist");

export const createDeck = (body: Pick<Deck, "deckname">) =>
  postRequest("/decklist", body, true);
