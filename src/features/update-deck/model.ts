import { sample } from "effector";

import { deckListQuery, updateDeckMutation } from "@/entities/deck";
import { createModal } from "@/shared/ui/modal-with-loading";

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
