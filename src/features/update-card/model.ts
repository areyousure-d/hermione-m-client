import { createMutation } from "@farfetched/core";

import { createRequestFx } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const updateCardMutation = createMutation({
  effect: createRequestFx({ path: `/deck/card`, method: "POST" }),
});

export const $updateCardMutationFailed = updateCardMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();
