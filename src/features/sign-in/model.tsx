import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
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

// eslint-disable-next-line effector/no-watch
signInMutation.start.watch(() => {
  showNotification({
    id: "sign-in",
    title: "Loading",
    message: "Signing in",
    loading: true,
  });
});

// eslint-disable-next-line effector/no-watch
signInMutation.finished.success.watch(() => {
  updateNotification({
    id: "sign-in",
    title: "Success",
    message: "You successfully signed in",
    color: "green",
    icon: <IconCheck />,
    loading: false,
  });
});

// eslint-disable-next-line effector/no-watch
signInMutation.finished.failure.watch(() => {
  updateNotification({
    id: "sign-in",
    title: "Fail",
    message: "Sign in error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});
