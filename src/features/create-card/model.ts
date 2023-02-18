import { createMutation } from "@farfetched/core";

import { Card } from "@/entities/card";
import { createRequestEffect } from "@/shared/api";

const createCardFx = createRequestEffect((card: Omit<Card, "id">) => ({
  path: `/deck/card`,
  method: "POST",
  body: card,
}));

export const createCardMutation = createMutation({
  effect: createCardFx,
});

export const $createCardMutationFailed = createCardMutation.$failed;
