import { z } from "zod";

export const deckSchema = z.object({
  id: z.number(),
  deckname: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.number(),
});

export const cardsInfoSchema = z.object({
  newCards: z.number(),
  allCards: z.number(),
  learnPhase: z.number(),
  reviewPhase: z.number(),
});

export const deckWithCardsInfoSchema = deckSchema.extend({
  cardsInfo: cardsInfoSchema,
});

export type Deck = z.infer<typeof deckSchema>;
export type DeckWithCardsInfo = z.infer<typeof deckWithCardsInfoSchema>;
