import { createEvent, createStore } from "effector";

export const tokenReceived = createEvent<string>();
export const tokenErased = createEvent();

export const $token = createStore<string | null>(null);

export const $isAuthorized = $token.map(Boolean);

$token.on(tokenReceived, (_, token) => token).reset(tokenErased);
