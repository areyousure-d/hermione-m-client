import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { sample } from "effector";

import { createDeckMutation, deckListQuery } from "@/entities/deck";
import { createModal } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: createDeckMutation.finished.success,
  target: [deckListQuery.start, closeModal],
});

// eslint-disable-next-line effector/no-watch
createDeckMutation.start.watch(() => {
  showNotification({
    id: "create-deck",
    title: "Loading",
    message: "Creating deck",
    loading: true,
  });
});

// eslint-disable-next-line effector/no-watch
createDeckMutation.finished.success.watch(() => {
  updateNotification({
    id: "create-deck",
    title: "Success",
    message: "Deck successfully created",
    color: "green",
    icon: <IconCheck />,
    loading: false,
  });
});

// eslint-disable-next-line effector/no-watch
createDeckMutation.finished.failure.watch(() => {
  updateNotification({
    id: "create-deck",
    title: "Fail",
    message: "Create deck error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});
