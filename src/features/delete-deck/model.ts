import { createMutation } from "@farfetched/core";
import { sample } from "effector";

import { Deck, deckListQuery } from "@/entities/deck";
import { createRequestEffect } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const deleteDeckMutation = createMutation({
  effect: createRequestEffect((deckId: Pick<Deck, "id">) => ({
    path: "/deck",
    method: "DELETE",
    body: deckId,
  })),
});

export const $deleteDeckMutationFailed = deleteDeckMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: deleteDeckMutation.finished.success,
  target: deckListQuery.start,
});

sample({
  clock: [
    deleteDeckMutation.finished.success,
    deleteDeckMutation.finished.failure,
  ],
  target: closeModal,
});
