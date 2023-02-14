import { sample } from "effector";

import { startFetchCardList, updateCard } from "@/entities/card";
import { createModalForm } from "@/shared/ui/modal-form";

export const {
  submitted,
  apiCallFx: updateCardFx,
  $isSuccess,
  $isError,
  openModal,
  closeModal,
  $isModalOpened,
} = createModalForm(updateCard);

sample({
  clock: updateCardFx.doneData,
  source: submitted,
  fn: (card) => card.deck_id.toString(),
  target: startFetchCardList,
});
