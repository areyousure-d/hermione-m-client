import { createMutation } from "@farfetched/core";
import { createEvent, createStore, sample } from "effector";

import { createUnAuthorizedRequestFx } from "@/shared/api";
import { tokenReceived } from "@/shared/auth/token";

export const signInMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "/auth", method: "POST" }),
});

export const $signInMutationFailed = signInMutation.$failed;

export const $modalOpened = createStore(false);
export const openModal = createEvent();
export const closeModal = createEvent();

$modalOpened.on(openModal, () => true);
$modalOpened.on(closeModal, () => false);

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
