import { createMutation } from "@farfetched/core";

import { Card } from "@/entities/card";
import { createRequestEffect } from "@/shared/api";

export const deleteCardMutation = createMutation({
  effect: createRequestEffect((card: Pick<Card, "id" | "deck_id">) => ({
    path: `/deck/card`,
    method: "POST",
    body: card,
  })),
});
