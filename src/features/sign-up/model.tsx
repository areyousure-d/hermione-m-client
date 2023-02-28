import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { sample } from "effector";

import { signUpMutation } from "@/entities/user";
import { createModal } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: [signUpMutation.finished.success, signUpMutation.finished.failure],
  target: closeModal,
});

// eslint-disable-next-line effector/no-watch
signUpMutation.start.watch(() => {
  showNotification({
    id: "sign-up",
    title: "Loading",
    message: "Creating an account",
    loading: true,
  });
});

// eslint-disable-next-line effector/no-watch
signUpMutation.finished.success.watch(() => {
  updateNotification({
    id: "sign-up",
    title: "Success",
    message: "Your account successfully created!",
    color: "green",
    icon: <IconCheck />,
    loading: false,
  });
});

// eslint-disable-next-line effector/no-watch
signUpMutation.finished.failure.watch(() => {
  updateNotification({
    id: "sign-up",
    title: "Fail",
    message: "Sign up error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});
