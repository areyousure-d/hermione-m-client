import { update } from "@farfetched/core";
import { sample } from "effector";

import { cardListQuery, deleteCardMutation } from "@/entity/card";
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
