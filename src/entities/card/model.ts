import { createEffect, createEvent, createStore, sample } from "effector";

import { fetchCardList } from "./api";

export type Card = {
  id: number;
  front: string;
  back: string;
  deck_id: number;
};

export const $cardList = createStore<Card[]>([]);

export const startFetchCardList = createEvent<string>();

export const fetchCardListFx = createEffect(async (deckId: string) => {
  const res = await fetchCardList(deckId);
  return res;
});

export const $fetchCardListError = createStore(false);

sample({
  clock: startFetchCardList,
  target: fetchCardListFx,
});

sample({
  clock: fetchCardListFx.doneData,
  target: $cardList,
});

sample({
  clock: fetchCardListFx.fail,
  fn: () => true,
  target: $fetchCardListError,
});
