import { createEffect, createEvent, createStore, sample } from "effector";

import { submitted, User } from "@/entities/user";
import { postRequest } from "@/shared/api";

export const signUpFx = createEffect(async (params: User) => {
  const res = await postRequest("/user", params);
  return res;
});

export const $isSuccess = createStore(false);
export const $isError = createStore(false);

export const openForm = createEvent();
export const closeForm = createEvent();
export const $isFormOpened = createStore(false);

$isFormOpened.on(openForm, () => true);
$isFormOpened.on(closeForm, () => false);

sample({
  clock: submitted,
  target: signUpFx,
});

sample({
  clock: signUpFx.doneData,
  fn: () => true,
  target: [$isSuccess, closeForm],
});

sample({
  clock: signUpFx.fail,
  fn: () => true,
  target: $isError,
});
