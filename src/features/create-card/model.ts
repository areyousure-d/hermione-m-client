import { createMutation } from "@farfetched/core";

import { createRequestFx } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const createCardMutation = createMutation({
  effect: createRequestFx({ path: `/deck/card`, method: "POST" }),
});

export const $createCardMutationFailed = createCardMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();
