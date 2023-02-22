import { createListCRUD } from "../../lib/create-list-crud";
import { Card } from "./types";

const initialCards: Card[] = [
  {
    id: 1,
    front: "question",
    back: "answer",
    deck_id: 1,
    created_at: Date.now(),
    ease_factor: 2.5,
    interval: 0,
    answered_at: 0,
    phase: "learn",
    steps: 0,
  },
  {
    id: 2,
    front: "question 2",
    back: "answer 2",
    deck_id: 1,
    created_at: Date.now(),
    ease_factor: 2.5,
    interval: 0,
    answered_at: 0,
    phase: "learn",
    steps: 0,
  },
  {
    id: 3,
    front: "question 2",
    back: "answer 2",
    deck_id: 1,
    created_at: Date.now(),
    ease_factor: 2.5,
    interval: 0,
    answered_at: 0,
    phase: "learn",
    steps: 0,
  },
];

export const {
  $list: $cards,
  createItem: createCardEvent,
  updateItem: updateCardEvent,
  deleteItem: deleteCardEvent,
} = createListCRUD(initialCards);
