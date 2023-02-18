import { createMutation } from "@farfetched/core";

import { Card } from "@/entities/card";
import { createRequestEffect } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const updateCardMutation = createMutation({
  effect: createRequestEffect((card: Card) => ({
    path: `/deck/card`,
    method: "POST",
    body: card,
  })),
});

export const $updateCardMutationFailed = updateCardMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();
