import { createRequest } from "@/shared/api";

export const fetchCardList = (deckId: string) =>
  createRequest({
    path: `/deck/${deckId}/card`,
    method: "GET",
    withToken: true,
  });
