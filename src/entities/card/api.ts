import { createQuery } from "@farfetched/core";

import { createRequestWithParams } from "@/shared/api";

const fetchCardListFx = createRequestWithParams((deckId: string) => ({
  path: `/deck/${deckId}/card`,
  method: "GET",
}));

export const cardListQuery = createQuery({
  effect: fetchCardListFx,
});
