import { createMutation } from "@farfetched/core";

import { createUnAuthorizedRequestFx } from "@/shared/api";

export const signUpMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "/user", method: "POST" }),
});

export const signInMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "/auth", method: "POST" }),
});
