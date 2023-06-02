import { update } from "@farfetched/core";
import { sample } from "effector";

import { deckListQuery, updateDeckMutation } from "@/entity/deck";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";
import { createModalModel } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModalModel();

sample({
  clock: updateDeckMutation.finished.finally,
  target: closeModal,
});

/**
 * Updating the deck list when a deck is updated
 */
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

updateDeckMutation.start.watch(() => {
  showLoadingNotification({ id: "update-deck", message: "Updating a deck" });
});

updateDeckMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "update-deck",
    message: "Deck updated!",
  });
});

updateDeckMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "update-deck",
    message: "Failed to update a deck",
  });
});
