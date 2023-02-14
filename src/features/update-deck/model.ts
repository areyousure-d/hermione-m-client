import { sample } from "effector";

import { startFetchDeckList, updateDeck } from "@/entities/deck";
import { createModalForm } from "@/shared/ui/modal-form";

export const {
  submitted,
  apiCallFx: updateDeckFx,
  $isSuccess,
  $isError,
  openModal,
  closeModal,
  $isModalOpened,
} = createModalForm(updateDeck);

sample({
  clock: updateDeckFx.doneData,
  target: startFetchDeckList,
});
