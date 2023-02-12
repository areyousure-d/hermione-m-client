import { createDeck } from "@/entities/deck";
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
