import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";

import { $cards, scheduleCard, updateCardEvent } from "../data/card";
import { verifyToken } from "../lib/verify-token";

export const learnCard: ResponseResolver<
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
  const cardId = body.cardId;
  const rating = body.rating;

  // eslint-disable-next-line effector/no-getState
  const cards = $cards.getState();
  const card = cards.find((card) => card.id === cardId);

  if (!card) {
    return res(ctx.delay(2000), ctx.status(400), ctx.json("something wrong"));
  }

  const scheduledCard = scheduleCard({ card, rating });
  updateCardEvent(scheduledCard);

  return res(ctx.delay(2000), ctx.status(200), ctx.json("ok"));
};
