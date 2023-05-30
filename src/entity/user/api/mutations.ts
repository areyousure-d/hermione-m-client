import { createMutation } from "@farfetched/core";

import { createUnAuthorizedRequestFx } from "@/shared/api";

export const signUpMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "auth/signup", method: "POST" }),
});

export const loginMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "auth/login", method: "POST" }),
});
