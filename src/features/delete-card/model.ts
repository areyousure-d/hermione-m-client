import { sample } from "effector";

import { deleteCard, startFetchCardList } from "@/entities/card";
import { createModalForm } from "@/shared/ui/modal-form";

export const {
  submitted,
  apiCallFx: deleteCardFx,
  $isSuccess,
  $isError,
  openModal,
  closeModal,
  $isModalOpened,
} = createModalForm(deleteCard);

sample({
  clock: deleteCardFx.doneData,
  source: submitted,
  fn: (card) => card.deck_id.toString(),
  target: startFetchCardList,
});
