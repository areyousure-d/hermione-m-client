import { createEffect, createEvent, createStore, sample } from "effector";

import { fetchDeckList } from "./api";

export type Deck = {
  id: number;
  deckname: string;
  created_by: number;
};

export const $deckList = createStore<Deck[]>([]);

export const startFetchDeckList = createEvent();

export const fetchDeckListFx = createEffect(async () => {
  const decks = await fetchDeckList();
  return decks;
});

export const $fetchDeckListError = createStore(false);

sample({
  clock: startFetchDeckList,
  target: fetchDeckListFx,
});

sample({
  clock: fetchDeckListFx.doneData,
  target: $deckList,
});

sample({
  clock: fetchDeckListFx.fail,
  fn: () => true,
  target: $fetchDeckListError,
});
