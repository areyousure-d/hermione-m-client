import { $token } from "../auth/token";
import { API_URL } from "./api-url";

type RequestMethod = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

type Request = {
  path: string;
  method: RequestMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | null;
  withToken?: boolean;
};

export const createRequest = async ({ path, method, ...options }: Request) => {
  const headers = new Headers(options.headers);
  headers.set("content-type", "application/json; charset=utf-8");

  if (options.withToken) {
    // eslint-disable-next-line effector/no-getState
    headers.set("authorization", `Bearer ${$token.getState()}`);
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
