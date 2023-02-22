import { Card } from "./types";

const shouldRepeat = (card: Card) => {
  const now = Date.now();
  if (card.answered_at + card.interval > now) {
    return false;
  }

  return true;
};

export const getCardsToRepeat = (cards: Card[]) => {
  const cardsToRepeat = cards.filter(
    (card) => shouldRepeat(card) || card.phase === "learn"
  );
  return cardsToRepeat;
};
