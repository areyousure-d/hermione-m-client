import { $token } from "../auth/token";
import { API_URL } from "./api-url";

type RequestOptions = {
  method: "POST" | "GET" | "DELETE" | "UPDATE";
  headers: {
    "content-type": string;
    authorization?: string;
  };
  body: string;
};

const postRequestOptions = (body: any): RequestOptions => ({
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(body),
});

export const postRequest = async (
  url: string,
  body: any,
  withToken = false
) => {
  const options = postRequestOptions(body);

  if (withToken) {
    // eslint-disable-next-line effector/no-getState
    options.headers.authorization = `Bearer ${$token.getState()}`;
  }

  const res = await fetch(`${API_URL}${url}`, options);

  if (!res.ok || res.status !== 200) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return res.json();
};
