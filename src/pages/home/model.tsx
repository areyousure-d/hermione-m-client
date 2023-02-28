import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

import { deckListQuery } from "@/entities/deck";

// eslint-disable-next-line effector/no-watch
deckListQuery.finished.failure.watch(() => {
  showNotification({
    title: "Fail",
    message: "Fetching deck list error",
    color: "red",
    icon: <IconX />,
    loading: false,
  });
});

export { deckListQuery };
