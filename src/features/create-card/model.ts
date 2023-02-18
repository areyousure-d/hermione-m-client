import { createMutation } from "@farfetched/core";

import { createRequestFx } from "@/shared/api";

export const createCardMutation = createMutation({
  effect: createRequestFx({ path: `/deck/card`, method: "POST" }),
});

export const $createCardMutationFailed = createCardMutation.$failed;
