import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { userSchema } from "../user.schema";

const fetchUserFx = createRequestEffect(() => ({
  path: "/user",
  method: "GET",
}));

const userContract = zodContract(userSchema);

export const userQuery = createQuery({
  effect: fetchUserFx,
  contract: userContract,
});
