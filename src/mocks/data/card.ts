import { createListCRUD } from "../lib/create-list-crud";

export type Card = {
  id: number;
  front: string;
  back: string;
  deck_id: number;
};

const initialCards: Card[] = [
  {
    id: 1,
    front: "question",
    back: "answer",
    deck_id: 1,
  },
  {
    id: 2,
    front: "question 2",
    back: "answer 2",
    deck_id: 1,
  },
  {
    id: 3,
    front: "question 2",
    back: "answer 2",
    deck_id: 1,
  },
];

export const {
  $list: $cards,
  createItem: createCardEvent,
  updateItem: updateCardEvent,
  deleteItem: deleteCardEvent,
} = createListCRUD(initialCards);
