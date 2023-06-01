import { update } from "@farfetched/core";
import { sample } from "effector";

import { createDeckMutation, deckListQuery } from "@/entity/deck";
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
