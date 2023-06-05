import { createEvent, createStore, sample } from "effector";

import { Card, cardsToLearnQuery } from "@/entities/card";

export const fetchCardsToLearn = createEvent<string>();

export const $cardToLearn = createStore<Card | null>(null);

sample({
  clock: fetchCardsToLearn,
  target: cardsToLearnQuery.start,
});

sample({
  clock: cardsToLearnQuery.finished.success,
  fn: (success) => {
    const cards = success.result;
    const card = getRandomCard(cards);
    return card;
  },
  target: $cardToLearn,
});

const getRandomCard = (cards: Card[]) => {
  const index = Math.floor(Math.random() * cards.length);
  const card = cards[index];

  return card ? card : null;
};
