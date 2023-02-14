import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { $decks } from "../data/deck";
import { verifyToken } from "../lib/verify-token";

export const getDeckById: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(ctx.delay(2000), ctx.status(200), ctx.json("not authorized"));
  }

  const { deckId } = req.params;
  // eslint-disable-next-line effector/no-getState
  const decks = $decks.getState();
  const deck = decks.find((d) => d.id === Number(deckId));

  if (!deck) {
    return res(
      ctx.delay(2000),
      ctx.status(400),
      ctx.json(`no deck with id ${deckId}`)
    );
  }

  return res(ctx.delay(2000), ctx.status(200), ctx.json(deck));
};
