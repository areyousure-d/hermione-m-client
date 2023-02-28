import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

import { deleteCardMutation } from "@/entities/card";

// eslint-disable-next-line effector/no-watch
deleteCardMutation.start.watch(() => {
  showNotification({
    id: "delete-card",
    title: "Loading",
    message: "Deleting card",
    loading: true,
  });
});

// eslint-disable-next-line effector/no-watch
deleteCardMutation.finished.success.watch(() => {
  updateNotification({
    id: "delete-card",
    title: "Success",
    message: "Card successfully deleted",
    color: "green",
    icon: <IconCheck />,
    loading: false,
  });
});

// eslint-disable-next-line effector/no-watch
deleteCardMutation.finished.failure.watch(() => {
  updateNotification({
    id: "delete-card",
    title: "Fail",
    message: "Delete card error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});

export { deleteCardMutation };
