import { createEvent, createStore } from "effector";

export const createModal = () => {
  const $modalOpened = createStore(false);
  const openModal = createEvent();
  const closeModal = createEvent();

  $modalOpened.on(openModal, () => true);
  $modalOpened.on(closeModal, () => false);

  return {
    $modalOpened,
    openModal,
    closeModal,
  };
};
