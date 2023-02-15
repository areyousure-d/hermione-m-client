import { createQuery } from "@farfetched/core";
import { createStore } from "effector";

import { fetchCardList } from "./api";

export type Card = {
  id: number;
  front: string;
  back: string;
  deck_id: number;
};

export const $cardList = createStore<Card[]>([]);

export const cardListQuery = createQuery({
  handler: fetchCardList,
});
