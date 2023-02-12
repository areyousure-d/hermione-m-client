import { $token } from "../auth/token";
import { API_URL } from "./api-url";

const getRequestOptions = () => ({
  method: "GET",
  headers: {
    "content-type": "application/json",
    // eslint-disable-next-line effector/no-getState
    authorization: `Bearer ${$token.getState()}`,
  },
});

export const getRequest = async (url: string) => {
  const res = await fetch(`${API_URL}${url}`, getRequestOptions());

  if (!res.ok || res.status !== 200) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return res.json();
};
