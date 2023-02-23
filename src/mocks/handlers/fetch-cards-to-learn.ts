import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { $cards, getCardsToLearn } from "../data/card";
import { verifyToken } from "../lib/verify-token";

export const fetchCardsToLearn: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(ctx.delay(2000), ctx.status(401));
  }

  const { deckId } = req.params;

  // eslint-disable-next-line effector/no-getState
  const cards = $cards.getState();
  const deckCards = cards.filter((card) => card.deck_id === Number(deckId));
  const cardsToLearn = getCardsToLearn(deckCards);

  return res(ctx.delay(2000), ctx.status(200), ctx.json(cardsToLearn));
};
