import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { updateDeckEvent } from "../data/deck";
import { verifyToken } from "../lib/verify-token";

export const updateDeck: ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(ctx.delay(2000), ctx.status(401), ctx.json("not authorized"));
  }

  const deck = await req.json();
  updateDeckEvent(deck);

  return res(
    ctx.delay(2000),
    ctx.status(200),
    ctx.json("deck successfully deleted")
  );
};
