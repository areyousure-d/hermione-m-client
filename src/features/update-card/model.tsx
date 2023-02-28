import { update } from "@farfetched/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

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

// eslint-disable-next-line effector/no-watch
updateCardMutation.start.watch(() => {
  showNotification({
    id: "update-card",
    title: "Loading",
    message: "Updating card",
    loading: true,
  });
});

// eslint-disable-next-line effector/no-watch
updateCardMutation.finished.success.watch(() => {
  updateNotification({
    id: "update-card",
    title: "Success",
    message: "Card successfully updated!",
    color: "green",
    icon: <IconCheck />,
    loading: false,
  });
});

// eslint-disable-next-line effector/no-watch
updateCardMutation.finished.failure.watch(() => {
  updateNotification({
    id: "update-card",
    title: "Fail",
    message: "Update card error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});

export { updateCardMutation };
