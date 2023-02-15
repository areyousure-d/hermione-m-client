import { createMutation } from "@farfetched/core";
import { sample } from "effector";

import { createUnAuthorizedRequestFx } from "@/shared/api";
import { tokenReceived } from "@/shared/auth/token";
import { createModal } from "@/shared/ui/modal-with-loading";

export const signInMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "/auth", method: "POST" }),
});

export const $signInMutationFailed = signInMutation.$failed;

export const {
  $modalOpened,
  open: openModal,
  close: closeModal,
} = createModal();

sample({
  clock: [signInMutation.finished.success, signInMutation.finished.failure],
  target: closeModal,
});

sample({
  clock: signInMutation.finished.success,
  fn: (successData) => successData.result,
  target: tokenReceived,
});

// signInMutation.finished.success.watch((s) =>
//   console.log("signUpMutation success", s)
// );

// signInMutation.finished.failure.watch((s) =>
//   console.log("signUpMutation failure", s)
// );
