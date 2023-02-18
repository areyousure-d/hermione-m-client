import { z } from "zod";

export type Card = {
  id: number;
  front: string;
  back: string;
  deck_id: number;
};

export const card = z.object({
  id: z.number(),
  front: z.string(),
  back: z.string(),
  deck_id: z.number(),
});

export const cardList = z.array(card);
