import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { deleteCardEvent } from "../data/card";
import { verifyToken } from "../lib/verify-token";

export const deleteCard: ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(ctx.delay(2000), ctx.status(401), ctx.json("not authorized"));
  }

  const { id } = await req.json();
  deleteCardEvent({ id });

  return res(
    ctx.delay(2000),
    ctx.status(200),
    ctx.json("card successfully deleted")
  );
};
