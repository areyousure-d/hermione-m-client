import { z } from "zod";

export type User = {
  username: string;
  password: string;
};

export const user = z.object({
  username: z.string(),
  password: z.string(),
});
