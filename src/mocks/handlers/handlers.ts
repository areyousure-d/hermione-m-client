import { rest } from "msw";

import { fetchDeckList } from "./fetch-deck-list";
import { signInHandler } from "./sign-in-handler";
import { signUpHandler } from "./sign-up-handler";

export const handlers = [
  rest.post("/user", signUpHandler), //

  rest.post("/auth", signInHandler), //

  rest.get("/decklist", fetchDeckList),
];
