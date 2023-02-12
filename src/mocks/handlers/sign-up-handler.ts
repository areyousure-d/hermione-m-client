import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { createUser } from "../data/user";

export const signUpHandler: ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const user = await req.json();

  createUser(user);

  return res(ctx.delay(2000), ctx.status(200), ctx.json(true));
};
