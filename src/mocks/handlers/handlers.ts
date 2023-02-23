import { rest } from "msw";

import { createCard } from "./create-card";
import { createDeck } from "./create-deck";
import { deleteCard } from "./delete-card";
import { deleteDeck } from "./delete-deck";
import { fetchCardList } from "./fetch-card-list";
import { fetchCardsToLearn } from "./fetch-cards-to-learn";
import { fetchDeckList } from "./fetch-deck-list";
import { getDeckById } from "./get-deck-by-id";
import { learnCard } from "./learn-card";
import { signInHandler } from "./sign-in-handler";
import { signUpHandler } from "./sign-up-handler";
import { updateCard } from "./update-card";
import { updateDeck } from "./update-deck";

export const handlers = [
  rest.post("/user", signUpHandler), //

  rest.post("/auth", signInHandler), //

  rest.get("/decklist", fetchDeckList),

  rest.post("/decklist", createDeck),

  rest.get("/deck/:deckId/card", fetchCardList),

  rest.post("/deck/card", createCard),

  rest.delete("/deck", deleteDeck),

  rest.patch("/deck", updateDeck),

  rest.patch("/card", updateCard),

  rest.delete("/card", deleteCard),

  rest.get("/deck/:deckId", getDeckById),

  rest.get("/learn-card/:deckId", fetchCardsToLearn),

  rest.post("/learn-card", learnCard),
];
