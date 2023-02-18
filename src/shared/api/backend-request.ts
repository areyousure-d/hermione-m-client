import { attach, createEffect } from "effector";

import { $token } from "../auth/token";
import { API_URL } from "./api-url";

type RequestParams = {
  path: string;
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  body?: Record<string, unknown> | null;
  token?: string | null;
};

const backendRequest = async ({ path, method, ...options }: RequestParams) => {
  const headers = new Headers();
  headers.set("content-type", "application/json; charset=utf-8");

  if (options.token) {
    headers.set("authorization", `Bearer ${options.token}`);
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

type MapParamsCallback<T> = (
  params: T
) => Pick<RequestParams, "path" | "method" | "body">;

export const createRequestEffect = <T = void>(
  mapParams: MapParamsCallback<T>
) => {
  return attach({
    effect: authorizedRequestFx,
    mapParams,
  });
};
