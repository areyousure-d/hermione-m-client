import { createEffect, createEvent, createStore, sample } from "effector";

export type User = {
  username: string;
  password: string;
};

export const authFactory = (apiCall: (params: User) => Promise<unknown>) => {
  const submitted = createEvent<User>();

  const apiCallFx = createEffect(async (params: User) => {
    const res = await apiCall(params);
    return res;
  });

  const $isSuccess = createStore(false);
  const $isError = createStore(false);

  const openForm = createEvent();
  const closeForm = createEvent();
  const $isFormOpened = createStore(false);

  $isFormOpened.on(openForm, () => true);
  $isFormOpened.on(closeForm, () => false);

  sample({
    clock: submitted,
    target: apiCallFx,
  });

  sample({
    clock: apiCallFx.doneData,
    fn: () => true,
    target: [$isSuccess, closeForm],
  });

  sample({
    clock: apiCallFx.fail,
    fn: () => true,
    target: $isError,
  });

  return {
    submitted,
    apiCallFx,
    $isSuccess,
    $isError,
    openForm,
    closeForm,
    $isFormOpened,
  };
};
