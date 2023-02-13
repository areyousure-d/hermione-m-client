import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { createCardEvent } from "../data/card";
import { $decks } from "../data/deck";
import { verifyToken } from "../lib/verify-token";

export const createCard: ResponseResolver<
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

  const body = await req.json();
  const deckId = body.deck_id;

  if (typeof deckId !== "number") {
    return res(
      ctx.delay(2000), //
      ctx.status(400)
    );
  }

  // eslint-disable-next-line effector/no-getState
  const decks = $decks.getState();
  const deck = decks.find((deck) => deck.id === Number(deckId));

  if (!deck) {
    return res(
      ctx.delay(2000), //
      ctx.status(400)
    );
  }

  createCardEvent(body);

  return res(
    ctx.delay(2000), //
    ctx.status(200), //
    ctx.json("new card created")
  );
};
