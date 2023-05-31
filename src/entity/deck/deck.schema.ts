import { z } from "zod";

export const deckSchema = z.object({
  id: z.number(),
  deckname: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.number(),
});

export type Deck = z.infer<typeof deckSchema>;
