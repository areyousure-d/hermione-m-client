import { update } from "@farfetched/core";

import { cardListQuery, updateCardMutation } from "@/entity/card";

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

export { updateCardMutation };
