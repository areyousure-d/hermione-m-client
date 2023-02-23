import { createQuery } from "@farfetched/core";

import { createRequestEffect } from "@/shared/api";

import { cardListContract } from "./model";

const fetchCardListFx = createRequestEffect((deckId: string) => ({
  path: `/deck/${deckId}/card`,
  method: "GET",
}));

export const cardListQuery = createQuery({
  effect: fetchCardListFx,
  contract: cardListContract,
});
