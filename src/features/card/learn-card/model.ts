import { createStore, sample } from "effector";

import { Card, cardsToLearnQuery } from "@/entities/card";

export const $cardToLearn = createStore<Card | null>(null);

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
