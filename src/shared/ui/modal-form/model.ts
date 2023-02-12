import { createEffect, createEvent, createStore, sample } from "effector";

export const createModalForm = <T>(
  apiCall: (params: T) => Promise<unknown>
) => {
  const submitted = createEvent<T>();

  const apiCallFx = createEffect(async (params: T) => {
    const res = await apiCall(params);
    return res;
  });

  const $isSuccess = createStore(false);
  const $isError = createStore(false);

  const openModal = createEvent();
  const closeModal = createEvent();
  const $isModalOpened = createStore(false);

  $isModalOpened.on(openModal, () => true);
  $isModalOpened.on(closeModal, () => false);

  sample({
    clock: submitted,
    target: apiCallFx,
  });

  sample({
    clock: apiCallFx.doneData,
    fn: () => true,
    target: [$isSuccess, closeModal],
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
    openModal,
    closeModal,
    $isModalOpened,
  };
};
