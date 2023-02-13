import { sample } from "effector";

import { deleteDeck, startFetchDeckList } from "@/entities/deck";
import { createModalForm } from "@/shared/ui/modal-form";

export const {
  submitted,
  apiCallFx: deleteDeckFx,
  $isSuccess,
  $isError,
  openModal,
  closeModal,
  $isModalOpened,
} = createModalForm(deleteDeck);

sample({
  clock: deleteDeckFx.doneData,
  target: startFetchDeckList,
});
