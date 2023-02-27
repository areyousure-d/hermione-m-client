import { z } from "zod";

export type Deck = {
  id: number;
  deckname: string;
  created_by: number;
};

export const deckSchema = z.object({
  id: z.number(),
  deckname: z.string(),
  created_by: z.number(),
});

export const deckListSchema = z.array(deckSchema);

export const decknameSchema = z
  .string()
  .min(1, { message: "Deckname is required" })
  .max(30, { message: "Deckname must be 30 or fewer characters long" });
