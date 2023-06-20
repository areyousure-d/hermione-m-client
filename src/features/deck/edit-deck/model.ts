import { update } from "@farfetched/core";
import { sample } from "effector";

import { deckListQuery, editDeckMutation } from "@/entities/deck";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";
import { createModalModel } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModalModel();

sample({
  clock: editDeckMutation.finished.finally,
  target: closeModal,
});

/**
 * Updating the deck list when a deck is updated
 */
update(deckListQuery, {
  on: editDeckMutation,
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

editDeckMutation.start.watch(() => {
  showLoadingNotification({ id: "update-deck", message: "Updating a deck" });
});

editDeckMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "update-deck",
    message: "Deck updated!",
  });
});

editDeckMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "update-deck",
    message: "Failed to update a deck",
  });
});
