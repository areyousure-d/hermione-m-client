import { createMutation } from "@farfetched/core";
import { sample } from "effector";

import { Deck, deckListQuery } from "@/entities/deck";
import { createRequestEffect } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const updateDeckMutation = createMutation({
  effect: createRequestEffect((deck: Deck) => ({
    path: "/deck",
    method: "PATCH",
    body: deck,
  })),
});

export const $updateDeckMutationFailed = updateDeckMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: updateDeckMutation.finished.success,
  target: deckListQuery.start,
});

sample({
  clock: [
    updateDeckMutation.finished.success,
    updateDeckMutation.finished.failure,
  ],
  target: closeModal,
});
