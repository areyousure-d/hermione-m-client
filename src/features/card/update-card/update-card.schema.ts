import { z } from "zod";

export const updateCardFormSchema = z.object({
  front: z.string().min(1, { message: "Question is required" }),
  back: z.string().min(1, { message: "Answer is required" }),
});
