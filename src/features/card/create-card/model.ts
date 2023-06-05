import { createCardMutation } from "@/entities/card";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";

createCardMutation.start.watch(() => {
  showLoadingNotification({ id: "create-card", message: "Creating a card" });
});

createCardMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "create-card",
    message: "Card created!",
  });
});

createCardMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "create-card",
    message: "Failed to create a card",
  });
});

export { createCardMutation };
