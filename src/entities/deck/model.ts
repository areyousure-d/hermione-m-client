import { z } from "zod";

export type Deck = {
  id: number;
  deckname: string;
  created_by: number;
};

export const deck = z.object({
  id: z.number(),
  deckname: z.string(),
  created_by: z.number(),
});

export const deckList = z.array(deck);
