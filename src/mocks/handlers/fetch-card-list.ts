import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { $cards } from "../data/card";
import { verifyToken } from "../lib/verify-token";

export const fetchCardList: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  const { deckId } = req.params;
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(
      ctx.delay(2000), //
      ctx.status(401)
    );
  }

  if (typeof deckId !== "string") {
    return res(
      ctx.delay(2000), //
      ctx.status(400)
    );
  }

  // eslint-disable-next-line effector/no-getState
  const cards = $cards.getState();
  const deckCards = cards.filter((card) => card.deck_id === Number(deckId));

  return res(
    ctx.delay(2000), //
    ctx.status(200), //
    ctx.json(deckCards)
  );
};
