import { update } from "@farfetched/core";
import { sample } from "effector";

import { deckListQuery, updateDeckMutation } from "@/entities/deck";
import { createModal } from "@/shared/ui/modal-with-loading";

export const { $modalOpened, openModal, closeModal } = createModal();

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

sample({
  clock: [updateDeckMutation.finished.finally],
  target: closeModal,
});

export { updateDeckMutation };
