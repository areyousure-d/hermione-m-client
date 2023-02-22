import { ONE_DAY_IN_MS } from "@/mocks/lib/constants";

import { getCardsToRepeat } from "./get-cards-to-repeat";
import { Card } from "./types";

describe("getCardsToRepeat", () => {
  const cards: Card[] = [
    {
      id: 1,
      front: "question",
      back: "answer",
      deck_id: 1,
      created_at: 0,
      ease_factor: 2.5,
      interval: 1000000,
      answered_at: 1677063948012,
      phase: "learn",
      steps: 0,
    },
    {
      id: 2,
      front: "question 2",
      back: "answer 2",
      deck_id: 1,
      created_at: 0,
      ease_factor: 2.5,
      interval: 1000000,
      answered_at: 1677063948012,
      phase: "learn",
      steps: 0,
    },
    {
      id: 3,
      front: "question 3",
      back: "answer 3",
      deck_id: 1,
      created_at: 0,
      ease_factor: 2.5,
      interval: 1000000,
      answered_at: 1677063948012,
      phase: "learn",
      steps: 0,
    },
    {
      id: 4,
      front: "question 4",
      back: "answer 4",
      deck_id: 1,
      created_at: 0,
      ease_factor: 2.5,
      interval: ONE_DAY_IN_MS,
      answered_at: Date.now(),
      phase: "review",
      steps: 0,
    },
    {
      id: 5,
      front: "question 5",
      back: "answer 5",
      deck_id: 1,
      created_at: 0,
      ease_factor: 2.5,
      interval: 0,
      answered_at: Date.now(),
      phase: "review",
      steps: 0,
    },
  ];

  test("filters cards", () => {
    const filtered = getCardsToRepeat(cards);
    const filteredIds = filtered.reduce((acc, curr) => {
      return [...acc, curr.id];
    }, [] as number[]);

    filteredIds.sort((a, b) => a - b);

    expect(filtered.length).toBe(4);
    expect(filteredIds).toEqual([1, 2, 3, 5]);
  });
});
