import { update } from "@farfetched/core";
import { sample } from "effector";

import { cardListQuery, deleteCardMutation } from "@/entities/card";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";
import { createModalModel } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModalModel();

sample({
  clock: deleteCardMutation.finished.finally,
  target: closeModal,
});

/**
 * Updating the card list when a card is deleted
 */
update(cardListQuery, {
  on: deleteCardMutation,
  by: {
    success: ({ mutation: _mutation, query: _query }) => {
      return {
        error: new Error(
          "Error: refetch card list query on delete card mutation"
        ),
        refetch: true,
      };
    },
  },
});

deleteCardMutation.start.watch(() => {
  showLoadingNotification({ id: "delete-card", message: "Deleting a card" });
});

deleteCardMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "delete-card",
    message: "Card deleted!",
  });
});

deleteCardMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "delete-card",
    message: "Failed to delete a card",
  });
});
