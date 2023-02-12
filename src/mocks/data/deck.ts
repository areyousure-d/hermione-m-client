import { createEvent, createStore } from "effector";

export type Deck = {
  id: number;
  deckname: string;
  created_by: number;
};

const initialDecks = [
  {
    id: 1,
    deckname: "test deck",
    created_by: 1,
  },
  {
    id: 2,
    deckname: "test deck 2",
    created_by: 1,
  },
];

export const $nextDeckId = createStore(3);
export const $decks = createStore<Deck[]>(initialDecks);

export const createDeckEvent = createEvent<Omit<Deck, "id">>();
export const updateDeckEvent = createEvent<Deck>();
export const deleteDeckEvent = createEvent<Pick<Deck, "id">>();

$nextDeckId.on(createDeckEvent, (nextDeckId) => nextDeckId + 1);

$decks.on(createDeckEvent, (decks, deck) => {
  // eslint-disable-next-line effector/no-getState
  const newDeck = { ...deck, id: $nextDeckId.getState() };
  return [...decks, newDeck];
});

$decks.on(updateDeckEvent, (decks, updatedDeck) => {
  const index = decks.findIndex((deck) => deck.id === updatedDeck.id);

  if (index !== -1) {
    const newDecks = [...decks];
    newDecks.splice(index, 1);
    return newDecks;
  }

  return decks;
});
