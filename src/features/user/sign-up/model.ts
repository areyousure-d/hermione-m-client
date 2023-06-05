import { signUpMutation } from "@/entities/user";
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from "@/shared/lib/notification-helpers";

signUpMutation.start.watch(() => {
  showLoadingNotification({ id: "sign-up", message: "Creating an account" });
});

signUpMutation.finished.success.watch(() => {
  showSuccessNotification({
    id: "sign-up",
    message: "Account created!",
  });
});

signUpMutation.finished.failure.watch(() => {
  showErrorNotification({
    id: "sign-up",
    message: "Failed to create an account",
  });
});

export { signUpMutation };
