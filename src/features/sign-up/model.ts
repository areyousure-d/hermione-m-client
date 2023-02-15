import { createMutation } from "@farfetched/core";
import { createEvent, createStore, sample } from "effector";

import { createUnAuthorizedRequestFx } from "@/shared/api";

export const signUpMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "/user", method: "POST" }),
});

export const $signUpMutationFailed = signUpMutation.$failed;

export const $modalOpened = createStore(false);
export const openModal = createEvent();
export const closeModal = createEvent();

$modalOpened.on(openModal, () => true);
$modalOpened.on(closeModal, () => false);

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
