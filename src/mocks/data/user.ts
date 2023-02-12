import { createEvent, createStore, sample } from "effector";

export type User = {
  id: number;
  username: string;
  password: string;
};

const initialUsers = [
  {
    id: 1,
    username: "testuser",
    password: "password",
  },
];

export const $userId = createStore(2);
export const $users = createStore<User[]>(initialUsers);

export const createUser = createEvent<Omit<User, "id">>();

sample({
  clock: createUser,
  source: [$users, $userId] as const,
  fn: ([users, userId], userData) => {
    const newUser = { ...userData, id: userId };
    return [...users, newUser];
  },
  target: $users,
});

sample({
  clock: createUser,
  source: $userId,
  fn: (userId) => userId + 1,
  target: $userId,
});
