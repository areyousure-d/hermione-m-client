import { update } from "@farfetched/core";

import { cardListQuery, editCardMutation } from "@/entities/card";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";

update(cardListQuery, {
  on: editCardMutation,
  by: {
    success: ({ mutation, query: _query }) => {
      return {
        params: mutation.params.deckId,
        error: new Error(
          "Error: refetch card list query on edit card mutation"
        ),
        refetch: true,
      };
    },
  },
});

editCardMutation.start.watch(() => {
  showLoadingNotification({ id: "edit-card", message: "Updating a card" });
});

editCardMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "edit-card",
    message: "Card updated!",
  });
});

editCardMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "edit-card",
    message: "Failed to update a card",
  });
});

export { editCardMutation };
