import { createEvent, createStore } from "effector";

export const createListCRUD = <T extends { id: number }>(initial: T[]) => {
  const $nextItemId = createStore(initial.length + 1);
  const $list = createStore(initial);

  const createItem = createEvent<Omit<T, "id">>();
  const updateItem = createEvent<T>();
  const deleteItem = createEvent<Pick<T, "id">>();

  $nextItemId.on(createItem, (nextItemId) => nextItemId + 1);

  $list.on(createItem, (list, item) => {
    // eslint-disable-next-line effector/no-getState
    const newItem = { ...item, id: $nextItemId.getState() } as T;
    return [...list, newItem];
  });

  $list.on(updateItem, (list, updatedItem) => {
    const index = list.findIndex((item) => item.id === updatedItem.id);

    if (index !== -1) {
      const newList = [...list];
      newList.splice(index, 1, updatedItem);
      return newList;
    }

    return list;
  });

  $list.on(deleteItem, (list, { id }) => {
    const index = list.findIndex((item) => item.id === id);

    if (index !== -1) {
      const newList = [...list];
      newList.splice(index, 1);
      return newList;
    }

    return list;
  });

  return {
    $list,
    createItem,
    updateItem,
    deleteItem,
  };
};
