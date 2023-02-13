import { sample } from "effector";

import { createCard, startFetchCardList } from "@/entities/card";
import { createModalForm } from "@/shared/ui/modal-form";

export const {
  submitted,
  apiCallFx: createCardFx,
  $isSuccess,
  $isError,
  openModal,
  closeModal,
  $isModalOpened,
} = createModalForm(createCard);

// refetch card list on create card
sample({
  clock: createCardFx.doneData,
  source: submitted,
  fn: (card) => card.deck_id.toString(),
  target: startFetchCardList,
});
