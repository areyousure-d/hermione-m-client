import { update } from "@farfetched/core";
import { sample } from "effector";

import { createDeckMutation, deckListQuery } from "@/entities/deck";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";
import { createModalModel } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModalModel();

sample({
  clock: [createDeckMutation.finished.finally],
  target: closeModal,
});

/**
 * Updating the deck list when creating a deck
 */
update(deckListQuery, {
  on: createDeckMutation,
  by: {
    success: ({ mutation: _mutation, query: _query }) => {
      return {
        error: new Error(
          "Error: refetch deck list query on create deck mutation"
        ),
        refetch: true,
      };
    },
  },
});

createDeckMutation.start.watch(() => {
  showLoadingNotification({ id: "create-deck", message: "Creating a deck" });
});

createDeckMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "create-deck",
    message: "Deck created!",
  });
});

createDeckMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "create-deck",
    message: "Failed to create a deck",
  });
});
