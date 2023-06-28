import { createEvent, createStore } from "effector";

export const tokenReceived = createEvent<string>();
export const tokenErased = createEvent();

export const $token = createStore<string | null>(null);

export const $isAuthorized = $token.map(Boolean);

$token.on(tokenReceived, (_, token) => token).reset(tokenErased);

const tokenKey = "hermione-m-token";

tokenReceived.watch((token) => {
  localStorage.setItem(tokenKey, token);
});

tokenErased.watch(() => {
  localStorage.removeItem(tokenKey);
});

const tokenReceivedFromLs = createEvent<string>();

$token.on(tokenReceivedFromLs, (_, token) => token);

export const checkTokenInLs = () => {
  const token = localStorage.getItem(tokenKey);

  if (token) {
    tokenReceivedFromLs(token);
  }
};
