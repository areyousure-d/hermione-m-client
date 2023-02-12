import { getRequest } from "@/shared/api";

export const fetchCardList = (deckId: string) => getRequest(`/deck/${deckId}`);
