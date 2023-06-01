import { update } from "@farfetched/core";
import { sample } from "effector";

import { deckListQuery, deleteDeckMutation } from "@/entity/deck";
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
