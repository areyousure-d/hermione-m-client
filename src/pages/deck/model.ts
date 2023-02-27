import { update } from "@farfetched/core";

import { deckByIdQuery, updateDeckMutation } from "@/entities/deck";

update(deckByIdQuery, {
  on: updateDeckMutation,
  by: {
    success: ({ mutation, query: _query }) => {
      return {
        params: mutation.params.id,
        error: new Error(
          "Error: refetch deck by id query on update deck mutation"
        ),
        refetch: true,
      };
    },
  },
});

export { deckByIdQuery };
