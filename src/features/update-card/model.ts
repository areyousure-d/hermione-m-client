import { update } from "@farfetched/core";

import { cardListQuery, updateCardMutation } from "@/entities/card";

update(cardListQuery, {
  on: updateCardMutation,
  by: {
    success: ({ mutation, query: _query }) => {
      return {
        params: mutation.params.deck_id,
        error: new Error(
          "Error: refetch card list query on update card mutation"
        ),
        refetch: true,
      };
    },
  },
});

export { updateCardMutation };
