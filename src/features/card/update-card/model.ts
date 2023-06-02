import { update } from "@farfetched/core";

import { cardListQuery, updateCardMutation } from "@/entity/card";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";

update(cardListQuery, {
  on: updateCardMutation,
  by: {
    success: ({ mutation, query: _query }) => {
      return {
        params: mutation.params.deckId,
        error: new Error(
          "Error: refetch card list query on update card mutation"
        ),
        refetch: true,
      };
    },
  },
});

updateCardMutation.start.watch(() => {
  showLoadingNotification({ id: "update-card", message: "Updating a card" });
});

updateCardMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "update-card",
    message: "Card updated!",
  });
});

updateCardMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "update-card",
    message: "Failed to update a card",
  });
});

export { updateCardMutation };
