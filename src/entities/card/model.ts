import { createStore } from "effector";

export type Card = {
  id: number;
  front: string;
  back: string;
  deck_id: number;
};

export const $cardList = createStore<Card[]>([]);
