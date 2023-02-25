import { createMutation } from "@farfetched/core";

import { Card } from "@/entities/card";
import { createRequestEffect } from "@/shared/api";

export const updateCardMutation = createMutation({
  effect: createRequestEffect((card: Card) => ({
    path: `/deck/card`,
    method: "POST",
    body: card,
  })),
});

export const $updateCardMutationFailed = updateCardMutation.$failed;
