import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { $decks } from "../data/deck";
import { verifyToken } from "../lib/verify-token";

export const fetchDeckList: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  // eslint-disable-next-line effector/no-getState
  const decks = $decks.getState();

  const result = verifyToken(req);

  if (result.type === "err") {
    return res(
      ctx.delay(2000), //
      ctx.status(401)
    );
  }

  const user = result.data;
  const userDecks = decks.filter((deck) => deck.created_by === user.id);

  return res(
    ctx.delay(2000), //
    ctx.status(200),
    ctx.json(userDecks)
  );
};
