import { Card } from "./types";

const shouldLearn = (card: Card) => {
  const now = Date.now();
  if (card.answered_at + card.interval > now) {
    return false;
  }

  return true;
};

export const getCardsToLearn = (cards: Card[]) => {
  const cardsToRepeat = cards.filter(
    (card) => shouldLearn(card) || card.phase === "learn"
  );
  return cardsToRepeat;
};
