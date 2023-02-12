import { rest } from "msw";

import { signInHandler } from "./sign-in-handler";
import { signUpHandler } from "./sign-up-handler";

export const handlers = [
  rest.post("/user", signUpHandler), //

  rest.post("/auth", signInHandler), //
];
