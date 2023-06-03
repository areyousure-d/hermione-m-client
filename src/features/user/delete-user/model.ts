import { sample } from "effector";

import { deleteUserMutation } from "@/entity/user";
import { tokenErased } from "@/shared/auth/token";
import { createModalModel } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModalModel();

sample({
  clock: deleteUserMutation.finished.finally,
  target: closeModal,
});

sample({
  clock: deleteUserMutation.finished.success,
  target: tokenErased,
});
