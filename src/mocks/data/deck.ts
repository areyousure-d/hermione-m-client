import { createListCRUD } from "../lib/create-list-crud";

export type Deck = {
  id: number;
  deckname: string;
  created_by: number;
};

const initialDecks: Deck[] = [
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

export const {
  $list: $decks,
  createItem: createDeckEvent,
  updateItem: updateDeckEvent,
  deleteItem: deleteDeckEvent,
} = createListCRUD(initialDecks);
