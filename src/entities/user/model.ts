import { createEvent } from "effector";

export type User = {
  username: string;
  password: string;
};

export const submitted = createEvent<User>();
