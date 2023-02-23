import { createMutation, createQuery } from "@farfetched/core";
import { createEvent, createStore, sample } from "effector";

import { Card, cardListContract } from "@/entities/card";
import { createRequestEffect } from "@/shared/api";

const fetchCardsToLearnFx = createRequestEffect((deckId: string) => ({
  path: `/learn-card/${deckId}`,
  method: "GET",
}));

const learnCardFx = createRequestEffect(
  ({ cardId, rating }: { cardId: number; rating: string }) => ({
    path: "/learn-card",
    method: "POST",
    body: { cardId, rating },
  })
);

export const fetchCardsToLearnQuery = createQuery({
  effect: fetchCardsToLearnFx,
  contract: cardListContract,
});

export const learnCardMutation = createMutation({
  effect: learnCardFx,
});

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
