import { sample } from "effector";

import { authFactory, signIn } from "@/entities/user";
import { tokenReceived } from "@/shared/auth/token";

export const {
  submitted,
  apiCallFx: signInFx,
  $isSuccess,
  $isError,
  openForm,
  closeForm,
  $isFormOpened,
} = authFactory(signIn);

sample({
  clock: signInFx.doneData,
  fn: (token) => {
    if (typeof token === "string") {
      return token;
    }
    return "";
  },
  target: tokenReceived,
});
