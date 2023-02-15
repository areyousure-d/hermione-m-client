import { createEvent, createStore } from "effector";

export const createModal = () => {
  const $modalOpened = createStore(false);
  const open = createEvent();
  const close = createEvent();

  $modalOpened.on(open, () => true);
  $modalOpened.on(close, () => false);

  return {
    $modalOpened,
    open,
    close,
  };
};
