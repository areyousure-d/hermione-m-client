import { sample } from "effector";

import { createDeckMutation, deckListQuery } from "@/entities/deck";
import { createModal } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: createDeckMutation.finished.success,
  target: [deckListQuery.start, closeModal],
});
