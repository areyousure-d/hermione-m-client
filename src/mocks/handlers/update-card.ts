import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { updateCardEvent } from "../data/card";
import { verifyToken } from "../lib/verify-token";

export const updateCard: ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(ctx.delay(2000), ctx.status(401), ctx.json("not authorized"));
  }

  const card = await req.json();
  updateCardEvent(card);

  return res(
    ctx.delay(2000),
    ctx.status(200),
    ctx.json("card successfully deleted")
  );
};
