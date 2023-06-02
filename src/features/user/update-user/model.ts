import { updateUserMutation } from "@/entity/user";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";
import { createModalModel } from "@/shared/ui/modal-with-loading";
import { sample } from "effector";

export const { $modalOpened, openModal, closeModal } = createModalModel();

sample({
  clock: updateUserMutation.start,
  target: closeModal,
});

updateUserMutation.start.watch(() => {
  showLoadingNotification({
    id: "update-user",
    message: "Updating an account",
  });
});

updateUserMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "update-user",
    message: "Account updated!",
  });
});

updateUserMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "update-user",
    message: "Failed to update an account",
  });
});
