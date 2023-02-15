import { createMutation } from "@farfetched/core";
import { sample } from "effector";

import { createUnAuthorizedRequestFx } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const signUpMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "/user", method: "POST" }),
});

export const $signUpMutationFailed = signUpMutation.$failed;

export const {
  $modalOpened,
  open: openModal,
  close: closeModal,
} = createModal();

sample({
  clock: [signUpMutation.finished.success, signUpMutation.finished.failure],
  target: closeModal,
});

// signUpMutation.finished.success.watch((s) =>
//   console.log("signUpMutation success", s)
// );

// signUpMutation.finished.failure.watch((s) =>
//   console.log("signUpMutation failure", s)
// );
