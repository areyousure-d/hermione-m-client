import { zodContract } from "@farfetched/zod";
import { z } from "zod";

const cardSchema = z.object({
  id: z.number(),
  front: z.string(),
  back: z.string(),
  deck_id: z.number(),
});

export type Card = z.infer<typeof cardSchema>;

const cardListSchema = z.array(cardSchema);

export const cardContract = zodContract(cardSchema);
export const cardListContract = zodContract(cardListSchema);
