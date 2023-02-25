import { sample } from "effector";

import { signUpMutation } from "@/entities/user";
import { createModal } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: [signUpMutation.finished.success, signUpMutation.finished.failure],
  target: closeModal,
});
