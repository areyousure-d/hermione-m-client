import { authFactory, signUp } from "@/entities/user";

export const {
  submitted,
  apiCallFx: signUpFx,
  $isSuccess,
  $isError,
  openForm,
  closeForm,
  $isFormOpened,
} = authFactory(signUp);
