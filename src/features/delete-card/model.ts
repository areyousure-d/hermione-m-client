import { createMutation } from "@farfetched/core";

import { Card } from "@/entities/card";
import { createRequestEffect } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const deleteCardMutation = createMutation({
  effect: createRequestEffect((card: Pick<Card, "id" | "deck_id">) => ({
    path: `/deck/card`,
    method: "POST",
    body: card,
  })),
});

export const $deleteCardMutationFailed = deleteCardMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();
