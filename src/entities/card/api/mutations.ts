import { createMutation } from "@farfetched/core";

import { createRequestEffect } from "@/shared/api";

import { Card } from "../model";

const learnCardFx = createRequestEffect(
  ({ cardId, rating }: { cardId: number; rating: string }) => ({
    path: "/learn-card",
    method: "POST",
    body: { cardId, rating },
  })
);

const createCardFx = createRequestEffect((card: Omit<Card, "id">) => ({
  path: `/deck/card`,
  method: "POST",
  body: card,
}));

export const createCardMutation = createMutation({
  effect: createCardFx,
});

export const deleteCardMutation = createMutation({
  effect: createRequestEffect((card: Pick<Card, "id">) => ({
    path: `/card`,
    method: "DELETE",
    body: card,
  })),
});

export const learnCardMutation = createMutation({
  effect: learnCardFx,
});

export const updateCardMutation = createMutation({
  effect: createRequestEffect((card: Card) => ({
    path: `/card`,
    method: "PATCH",
    body: card,
  })),
});
