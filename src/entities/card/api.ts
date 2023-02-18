import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { cardList } from "./model";

const cardListContract = zodContract(cardList);

const fetchCardListFx = createRequestEffect((deckId: string) => ({
  path: `/deck/${deckId}/card`,
  method: "GET",
}));

export const cardListQuery = createQuery({
  effect: fetchCardListFx,
  contract: cardListContract,
});
