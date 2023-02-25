import { sample } from "effector";

import { signInMutation } from "@/entities/user";
import { tokenReceived } from "@/shared/auth/token";
import { createModal } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: [signInMutation.finished.success, signInMutation.finished.failure],
  target: closeModal,
});

sample({
  clock: signInMutation.finished.success,
  fn: (successData) => successData.result,
  target: tokenReceived,
});
