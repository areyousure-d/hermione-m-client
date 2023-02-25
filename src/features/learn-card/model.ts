import { createEvent, createStore, sample } from "effector";

import { Card, fetchCardsToLearnQuery } from "@/entities/card";

export const learnCardMutationFetched = createEvent<string>();

export const $cardToLearn = createStore<Card | null>(null);

sample({
  clock: learnCardMutationFetched,
  target: fetchCardsToLearnQuery.start,
});

sample({
  clock: fetchCardsToLearnQuery.finished.success,
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
