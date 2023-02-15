import { attach, createEffect } from "effector";

import { $token } from "../auth/token";
import { API_URL } from "./api-url";

type RequestParams = {
  path: string;
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  body?: Record<string, unknown> | null;
  withToken?: boolean;
  token?: string | null;
};

export const backendRequest = async ({
  path,
  method,
  ...options
}: RequestParams) => {
  const headers = new Headers();
  headers.set("content-type", "application/json; charset=utf-8");

  if (options.withToken) {
    // eslint-disable-next-line effector/no-getState
    headers.set("authorization", `Bearer ${$token.getState()}`);
    //headers.set("authorization", `Bearer ${options.token}`);
  }

  const body = JSON.stringify(options.body);

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body,
  });

  if (!response.ok || response.status !== 200) {
    throw new Error(`Could not fetch ${path}, received ${response.status}`);
  }

  return response.json();
};

const backendRequestFx = createEffect(backendRequest);

const authorizedRequestFx = attach({
  effect: backendRequestFx,
  source: $token,
  mapParams: (requestParams: Omit<RequestParams, "token">, token) => ({
    ...requestParams,
    token,
  }),
});

export const createUnAuthorizedRequestFx = ({
  path,
  method,
}: Pick<RequestParams, "path" | "method">) =>
  attach({
    effect: backendRequestFx,
    mapParams: (
      requestParams: Omit<RequestParams, "path" | "method" | "token">
    ) => ({
      ...requestParams,
      path,
      method,
    }),
  });

export const createGetRequestFx = () =>
  attach({
    effect: authorizedRequestFx,
    mapParams: (path: string) => {
      return {
        path,
        method: "GET" as const,
      };
    },
  });

export const createRequestFx = ({
  path,
  method,
}: Pick<RequestParams, "path" | "method">) =>
  attach({
    effect: authorizedRequestFx,
    mapParams: (data: Pick<RequestParams, "body">) => {
      return {
        ...data,
        path,
        method,
      };
    },
  });
