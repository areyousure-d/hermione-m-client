import { sample } from "effector";

import { loginMutation } from "@/entity/user";
import { tokenReceived } from "@/shared/auth/token";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";

sample({
  clock: loginMutation.finished.success,
  fn: (successData) => successData.result.accessToken,
  target: tokenReceived,
});

loginMutation.start.watch(() => {
  showLoadingNotification({ id: "login", message: "Logging in" });
});

loginMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "login",
    message: "Logged in!",
  });
});

loginMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "login",
    message: "Failed to log in",
  });
});

export { loginMutation };
