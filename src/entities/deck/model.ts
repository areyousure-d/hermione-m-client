import { z } from "zod";

export const deckSchema = z.object({
  id: z.number(),
  deckname: z.string(),
  created_by: z.number(),
});

export const deckSchemaWithCardsInfo = deckSchema.extend({
  numberOfCardsToLearn: z.number(),
});

export const deckListSchema = z.array(deckSchema);

export const decknameSchema = z
  .string()
  .min(1, { message: "Deckname is required" })
  .max(30, { message: "Deckname must be 30 or fewer characters long" });

export type Deck = z.infer<typeof deckSchema>;
export type DeckWithCardsInfo = z.infer<typeof deckSchemaWithCardsInfo>;
