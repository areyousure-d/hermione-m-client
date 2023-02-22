import {
  EASE_FACTOR_PENALTY,
  LEARNING_PHASE_STEPS_LIMIT,
  ONE_DAY_IN_MS,
} from "@/mocks/lib/constants";

import { Card, Rating } from "./types";

export const scheduleCard = ({
  card,
  rating,
}: {
  card: Card;
  rating: keyof typeof Rating;
}): Card => {
  if (card.phase === "learn") {
    if (card.steps < LEARNING_PHASE_STEPS_LIMIT) {
      if (rating === "again" || rating === "hard") {
        return {
          ...card,
          steps: 0,
        };
      }

      return {
        ...card,
        steps: card.steps + 1,
      };
    }

    if (card.steps >= LEARNING_PHASE_STEPS_LIMIT) {
      if (rating === "again" || rating === "hard") {
        return {
          ...card,
          steps: 0,
        };
      }

      return {
        ...card,
        phase: "review",
        interval: ONE_DAY_IN_MS,
        steps: 0,
      };
    }
  }

  // phase === "review"
  if (rating === "again") {
    return {
      ...card,
      phase: "learn",
      interval: ONE_DAY_IN_MS,
      ease_factor: card.ease_factor - EASE_FACTOR_PENALTY,
      steps: 0,
    };
  }

  if (rating === "hard") {
    return {
      ...card,
      interval: card.interval * 1.2,
      ease_factor: card.ease_factor - 0.15,
      steps: 0,
    };
  }

  if (rating === "good") {
    return {
      ...card,
      interval: card.interval * card.ease_factor,
      steps: 0,
    };
  }

  // rating === "easy"
  return {
    ...card,
    interval: card.interval * card.ease_factor * 1.3,
    ease_factor: card.ease_factor + 0.15,
    steps: 0,
  };
};
