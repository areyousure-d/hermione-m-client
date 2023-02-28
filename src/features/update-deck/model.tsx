import { update } from "@farfetched/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { sample } from "effector";

import { deckListQuery, updateDeckMutation } from "@/entities/deck";
import { createModal } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModal();

update(deckListQuery, {
  on: updateDeckMutation,
  by: {
    success: ({ mutation: _mutation, query: _query }) => {
      return {
        error: new Error(
          "Error: refetch deck list query on update deck mutation"
        ),
        refetch: true,
      };
    },
  },
});

sample({
  clock: [updateDeckMutation.finished.finally],
  target: closeModal,
});

// eslint-disable-next-line effector/no-watch
updateDeckMutation.start.watch(() => {
  showNotification({
    id: "update-deck",
    title: "Loading",
    message: "Updating deck",
    loading: true,
  });
});

// eslint-disable-next-line effector/no-watch
updateDeckMutation.finished.success.watch(() => {
  updateNotification({
    id: "update-deck",
    title: "Success",
    message: "Deck successfully updated!",
    color: "green",
    icon: <IconCheck />,
    loading: false,
  });
});

// eslint-disable-next-line effector/no-watch
updateDeckMutation.finished.failure.watch(() => {
  updateNotification({
    id: "update-deck",
    title: "Fail",
    message: "Update deck error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});

export { updateDeckMutation };
