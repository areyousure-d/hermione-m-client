export const createMockCard = (cardId: number) => {
  return {
    id: cardId,
    front: `mocked front ${cardId}`,
    back: `mocked back ${cardId}`,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    deckId: 1,
  };
};
