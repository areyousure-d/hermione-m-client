import { createEffect, createEvent, createStore, sample } from "effector";

import { startFetchCardList } from "@/entities/card";
import { Deck, getDeckById } from "@/entities/deck";

export const $deck = createStore<Deck | null>(null);

export const startFetchDeck = createEvent<number>();

export const fetchDeckFx = createEffect(async (deckId: number) => {
  const response = await getDeckById(deckId);
  return response;
});

sample({
  clock: startFetchDeck,
  target: fetchDeckFx,
});

sample({
  clock: fetchDeckFx.doneData,
  target: $deck,
});

sample({
  clock: fetchDeckFx.doneData,
  source: startFetchDeck,
  fn: (deckId) => deckId.toString(),
  target: startFetchCardList,
});
