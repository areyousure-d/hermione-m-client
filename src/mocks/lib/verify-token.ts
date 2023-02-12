import base64 from "base-64";
import { RestRequest } from "msw";

import { Err, Ok } from "@/shared/lib/result";

import { $users } from "../data/user";

export const verifyToken = (req: RestRequest) => {
  // eslint-disable-next-line effector/no-getState
  const users = $users.getState();
  const authorization = req.headers.get("Authorization");
  const token = authorization?.split(" ")[1];

  if (!token || token === "null") {
    return Err(false);
  }

  const decoded = base64.decode(token);
  const parsedUser = JSON.parse(decoded);
  const user = users.find((user) => user.id === parsedUser.id);

  if (!user) {
    return Err(false);
  }

  return Ok(user);
};
