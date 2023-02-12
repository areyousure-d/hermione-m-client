import base64 from "base-64";
import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { $users } from "../data/user";

export const signInHandler: ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const userData = (await req.json()) as { username: string; password: string };

  // eslint-disable-next-line effector/no-getState
  const users = $users.getState();
  const user = users.find(({ username }) => username === userData.username);

  if (user !== undefined && user.password === userData.password) {
    const token = base64.encode(JSON.stringify(user));

    return res(
      ctx.delay(2000), //
      ctx.status(200), //
      ctx.json(token)
    );
  }

  return res(
    ctx.delay(2000), //
    ctx.status(401), //
    ctx.json("not authorized")
  );
};
