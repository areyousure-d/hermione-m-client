export const createMockCard = (cardId: number) => {
  return {
    id: cardId,
    front: `mocked front ${cardId}`,
    back: `mocked back ${cardId}`,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    deckId: 1,
    answeredAt: null,
    easeFactor: 2.5,
    interval: 60 * 1000 * 10,
    phase: "learn",
    steps: 0,
  } as const;
};
