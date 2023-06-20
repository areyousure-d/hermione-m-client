import { z } from "zod";

export const cardSchema = z.object({
  id: z.number(),
  front: z.string(),
  back: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deckId: z.number(),
  answeredAt: z.union([z.null(), z.string()]),
  easeFactor: z.number(),
  interval: z.number(),
  phase: z.union([z.literal("learn"), z.literal("review")]),
  steps: z.number(),
});

export type Card = z.infer<typeof cardSchema>;
