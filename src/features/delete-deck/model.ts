import { sample } from "effector";

import { deckListQuery, deleteDeckMutation } from "@/entities/deck";
import { createModal } from "@/shared/ui/modal-with-loading";

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
