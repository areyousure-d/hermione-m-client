import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

import { createCardMutation } from "@/entities/card";

// eslint-disable-next-line effector/no-watch
createCardMutation.start.watch(() => {
  showNotification({
    id: "create-card",
    title: "Loading",
    message: "Creating card",
    loading: true,
  });
});

// eslint-disable-next-line effector/no-watch
createCardMutation.finished.success.watch(() => {
  updateNotification({
    id: "create-card",
    title: "Success",
    message: "Card successfully created",
    color: "green",
    icon: <IconCheck />,
    loading: false,
  });
});

// eslint-disable-next-line effector/no-watch
createCardMutation.finished.failure.watch(() => {
  updateNotification({
    id: "create-card",
    title: "Fail",
    message: "Create card error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});

export { createCardMutation };
