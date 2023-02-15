import { createMutation } from "@farfetched/core";
import { sample } from "effector";

import { startFetchDeckList } from "@/entities/deck";
import { createRequestFx } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const deleteDeckMutation = createMutation({
  effect: createRequestFx({ path: "/deck", method: "DELETE" }),
});

export const $deleteDeckMutationFailed = deleteDeckMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: deleteDeckMutation.finished.success,
  target: startFetchDeckList,
});

sample({
  clock: [
    deleteDeckMutation.finished.success,
    deleteDeckMutation.finished.failure,
  ],
  target: closeModal,
});
