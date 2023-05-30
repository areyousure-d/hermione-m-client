import { attach, createEffect } from "effector";

import { API_URL } from "./api-url";

type RequestParams = {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
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

  if (!response.ok) {
    throw new Error(`Could not fetch ${path}, received ${response.status}`);
  }

  return response.json();
};

const backendRequestFx = createEffect(backendRequest);

export const createUnAuthorizedRequestFx = ({
  path,
  method,
}: Pick<RequestParams, "path" | "method">) => {
  return attach({
    effect: backendRequestFx,
    mapParams: (
      requestParams: Omit<RequestParams, "path" | "method" | "token">
    ) => ({
      ...requestParams,
      path,
      method,
    }),
  });
};
