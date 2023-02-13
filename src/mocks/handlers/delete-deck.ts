import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { $cards, deleteCardEvent } from "../data/card";
import { deleteDeckEvent } from "../data/deck";
import { verifyToken } from "../lib/verify-token";

export const deleteDeck: ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = async (req, res, ctx) => {
  const result = verifyToken(req);

  if (result.type === "err") {
    return res(ctx.delay(2000), ctx.status(401), ctx.json("not authorized"));
  }

  const { deckId } = await req.json();
  // eslint-disable-next-line effector/no-getState
  const cards = $cards.getState();

  cards.forEach((card) => {
    if (card.deck_id === Number(deckId)) {
      deleteCardEvent({ id: card.id });
    }
  });

  deleteDeckEvent({ id: Number(deckId) });

  return res(
    ctx.delay(2000),
    ctx.status(200),
    ctx.json("deck successfully deleted")
  );
};
