import { postRequest } from "@/shared/api";

import { User } from "./model";

export const signUp = (body: User) => postRequest("/user", body);
export const signIn = (body: User) => postRequest("/auth", body);
