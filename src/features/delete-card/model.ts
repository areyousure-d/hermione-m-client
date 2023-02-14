import { createEffect, createEvent, sample } from "effector";

import { Card, deleteCard, startFetchCardList } from "@/entities/card";

export const deleteCardFx = createEffect(
  async (card: Pick<Card, "id" | "deck_id">) => {
    const response = await deleteCard(card);
    return response;
  }
);

export const submitted = createEvent<Pick<Card, "id" | "deck_id">>();

sample({
  clock: submitted,
  target: deleteCardFx,
});

sample({
  clock: deleteCardFx.doneData,
  source: submitted,
  fn: (card) => card.deck_id.toString(),
  target: startFetchCardList,
});
