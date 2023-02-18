import { createQuery } from "@farfetched/core";

import { createRequestEffect } from "@/shared/api";

const fetchCardListFx = createRequestEffect((deckId: string) => ({
  path: `/deck/${deckId}/card`,
  method: "GET",
}));

export const cardListQuery = createQuery({
  effect: fetchCardListFx,
});
