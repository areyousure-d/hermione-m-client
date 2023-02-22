import { allSettled, fork } from "effector";

import { createListCRUD } from "./create-list-crud";

type FooItem = {
  id: number;
  foo: string;
};

const { $list, createItem, updateItem, deleteItem } = createListCRUD<FooItem>(
  []
);

describe("createListCrud", () => {
  test("creates new list element for empty list", async () => {
    const scope = fork({
      values: new Map([[$list, []]]),
    });

    await allSettled(createItem, { scope, params: { foo: "foo" } });

    const list = scope.getState($list);
    expect(list.length).toBe(1);
    expect(list).toEqual([{ id: 1, foo: "foo" }]);
  });
  test("creates new list element for nonempty list", async () => {
    const scope = fork({
      values: new Map([[$list, []]]),
    });

    await allSettled(createItem, { scope, params: { foo: "foo1" } });
    await allSettled(createItem, { scope, params: { foo: "foo2" } });
    await allSettled(createItem, { scope, params: { foo: "foo3" } });

    const list = scope.getState($list);
    expect(list.length).toBe(3);
    expect(list).toEqual([
      { id: 1, foo: "foo1" },
      { id: 2, foo: "foo2" },
      { id: 3, foo: "foo3" },
    ]);
  });

  test("updates list element", async () => {
    const scope = fork({
      values: new Map([
        [
          $list,
          [
            { id: 1, foo: "foo1" },
            { id: 2, foo: "foo2" },
            { id: 3, foo: "foo3" },
          ],
        ],
      ]),
    });

    await allSettled(updateItem, {
      scope,
      params: { id: 1, foo: "foo1 updated" },
    });

    const list = scope.getState($list);
    expect(list.length).toBe(3);
    expect(list).toEqual([
      { id: 1, foo: "foo1 updated" },
      { id: 2, foo: "foo2" },
      { id: 3, foo: "foo3" },
    ]);
  });

  test("doesn't update item if it's not in the list", async () => {
    const scope = fork({
      values: new Map([
        [
          $list,
          [
            { id: 1, foo: "foo1" },
            { id: 2, foo: "foo2" },
            { id: 3, foo: "foo3" },
          ],
        ],
      ]),
    });

    await allSettled(updateItem, {
      scope,
      params: { id: 4, foo: "not included" },
    });

    const list = scope.getState($list);
    expect(list.length).toBe(3);
    expect(list).toEqual([
      { id: 1, foo: "foo1" },
      { id: 2, foo: "foo2" },
      { id: 3, foo: "foo3" },
    ]);
  });

  test("deletes list element", async () => {
    const scope = fork({
      values: new Map([
        [
          $list,
          [
            { id: 1, foo: "foo1" },
            { id: 2, foo: "foo2" },
            { id: 3, foo: "foo3" },
          ],
        ],
      ]),
    });

    await allSettled(deleteItem, { scope, params: { id: 2 } });

    const list = scope.getState($list);
    expect(list.length).toBe(2);
    expect(list).toEqual([
      { id: 1, foo: "foo1" },
      { id: 3, foo: "foo3" },
    ]);
  });

  test("doesn't delete item if it's not in the list", async () => {
    const scope = fork({
      values: new Map([
        [
          $list,
          [
            { id: 1, foo: "foo1" },
            { id: 2, foo: "foo2" },
            { id: 3, foo: "foo3" },
          ],
        ],
      ]),
    });

    await allSettled(deleteItem, { scope, params: { id: 4 } });

    const list = scope.getState($list);
    expect(list.length).toBe(3);
    expect(list).toEqual([
      { id: 1, foo: "foo1" },
      { id: 2, foo: "foo2" },
      { id: 3, foo: "foo3" },
    ]);
  });
});
