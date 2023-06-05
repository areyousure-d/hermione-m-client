import { update } from "@farfetched/core";
import { sample } from "effector";

import { deckListQuery, deleteDeckMutation } from "@/entities/deck";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";
import { createModalModel } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModalModel();

sample({
  clock: deleteDeckMutation.finished.finally,
  target: closeModal,
});

/**
 * Updating the deck list when a deck is deleted
 */
update(deckListQuery, {
  on: deleteDeckMutation,
  by: {
    success: ({ mutation: _mutation, query: _query }) => {
      return {
        error: new Error(
          "Error: refetch deck list query on delete deck mutation"
        ),
        refetch: true,
      };
    },
  },
});

deleteDeckMutation.start.watch(() => {
  showLoadingNotification({ id: "delete-deck", message: "Deleting a deck" });
});

deleteDeckMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "delete-deck",
    message: "Deck deleted!",
  });
});

deleteDeckMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "delete-deck",
    message: "Failed to delete a deck",
  });
});
