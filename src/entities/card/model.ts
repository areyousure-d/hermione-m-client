import { zodContract } from "@farfetched/zod";
import { z } from "zod";

export type Card = {
  id: number;
  front: string;
  back: string;
  deck_id: number;
};

const cardSchema = z.object({
  id: z.number(),
  front: z.string(),
  back: z.string(),
  deck_id: z.number(),
});

const cardListSchema = z.array(cardSchema);

export const cardContract = zodContract(cardSchema);
export const cardListContract = zodContract(cardListSchema);
