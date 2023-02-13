import { createRequest } from "@/shared/api";

import { User } from "./model";

export const signUp = (body: User) =>
  createRequest({ path: "/user", method: "POST", body });

export const signIn = (body: User) =>
  createRequest({ path: "/auth", method: "POST", body });
