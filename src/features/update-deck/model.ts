import { createMutation } from "@farfetched/core";
import { sample } from "effector";

import { startFetchDeckList } from "@/entities/deck";
import { createRequestFx } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const updateDeckMutation = createMutation({
  effect: createRequestFx({ path: "/deck", method: "PATCH" }),
});

export const $updateDeckMutationFailed = updateDeckMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: updateDeckMutation.finished.success,
  target: startFetchDeckList,
});

sample({
  clock: [
    updateDeckMutation.finished.success,
    updateDeckMutation.finished.failure,
  ],
  target: closeModal,
});
