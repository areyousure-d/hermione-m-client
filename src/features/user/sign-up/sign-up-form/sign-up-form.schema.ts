import { z } from "zod";

export const signUpFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be 1 or more characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" }),
});
