import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { sample } from "effector";

import { deckListQuery, deleteDeckMutation } from "@/entities/deck";
import { createModal } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: deleteDeckMutation.finished.success,
  target: deckListQuery.start,
});

sample({
  clock: [
    deleteDeckMutation.finished.success,
    deleteDeckMutation.finished.failure,
  ],
  target: closeModal,
});

// eslint-disable-next-line effector/no-watch
deleteDeckMutation.start.watch(() => {
  showNotification({
    id: "delete-deck",
    title: "Loading",
    message: "Deleting deck",
    loading: true,
  });
});

// eslint-disable-next-line effector/no-watch
deleteDeckMutation.finished.success.watch(() => {
  updateNotification({
    id: "delete-deck",
    title: "Success",
    message: "Deck successfully deleted",
    color: "green",
    icon: <IconCheck />,
    loading: false,
  });
});

// eslint-disable-next-line effector/no-watch
deleteDeckMutation.finished.failure.watch(() => {
  updateNotification({
    id: "delete-deck",
    title: "Fail",
    message: "Delete deck error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});
