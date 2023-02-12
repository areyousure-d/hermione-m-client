import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { createDeckEvent } from "../data/deck";
import { verifyToken } from "../lib/verify-token";

export const createDeck: ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(
      ctx.delay(2000), //
      ctx.status(401), //
      ctx.json("not authorized")
    );
  }

  const user = result.data;
  const body = await req.json();
  createDeckEvent({ deckname: body.deckname, created_by: user.id });

  return res(
    ctx.delay(2000), //
    ctx.status(200), //
    ctx.json("new deck created")
  );
};
