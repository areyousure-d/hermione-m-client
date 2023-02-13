import { sample } from "effector";

import { createDeck, startFetchDeckList } from "@/entities/deck";
import { createModalForm } from "@/shared/ui/modal-form";

export const {
  submitted,
  apiCallFx: createDeckFx,
  $isSuccess,
  $isError,
  openModal,
  closeModal,
  $isModalOpened,
} = createModalForm(createDeck);

sample({
  clock: createDeckFx.doneData,
  target: startFetchDeckList,
});
