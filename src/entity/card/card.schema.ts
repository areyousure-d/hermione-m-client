import { z } from "zod";

export const cardSchema = z.object({
  id: z.number(),
  front: z.string(),
  back: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deckId: z.number(),
});

export type Card = z.infer<typeof cardSchema>;
