import { sample } from "effector";

import { loginMutation } from "@/entity/user";
import { tokenReceived } from "@/shared/auth/token";

sample({
  clock: loginMutation.finished.success,
  fn: (successData) => successData.result.accessToken,
  target: tokenReceived,
});

export { loginMutation };
