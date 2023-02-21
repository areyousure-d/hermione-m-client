import { z } from "zod";

export const signInFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be 5 or more characters long" })
    .max(22, { message: "Username must be 22 or fewer characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" })
    .max(22, { message: "Password must be 22 or fewer characters long" }),
});
