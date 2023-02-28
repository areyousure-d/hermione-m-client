import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { $cards, getCardsToLearn } from "../data/card";
import { $decks } from "../data/deck";
import { verifyToken } from "../lib/verify-token";

export const fetchDeckList: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(
      ctx.delay(2000), //
      ctx.status(401)
    );
  }

  // eslint-disable-next-line effector/no-getState
  const decks = $decks.getState();
  // eslint-disable-next-line effector/no-getState
  const cards = $cards.getState();

  const user = result.data;
  const userDecks = decks
    .filter((deck) => deck.created_by === user.id)
    .map((deck) => ({ ...deck, numberOfCardsToLearn: 0 }));

  userDecks.forEach((deck) => {
    const deckCards = cards.filter((card) => card.deck_id === deck.id);
    const cardsToLearn = getCardsToLearn(deckCards);
    deck.numberOfCardsToLearn = cardsToLearn.length;
  });

  return res(
    ctx.delay(2000), //
    ctx.status(200),
    ctx.json(userDecks)
  );
};
