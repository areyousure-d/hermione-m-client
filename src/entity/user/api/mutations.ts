import { createMutation } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect, createUnAuthorizedRequestFx } from "@/shared/api";

import { UserLoginDto } from "..";
import { userSchema } from "../user.schema";

const userContract = zodContract(userSchema);
const updateUserEffect = createRequestEffect((userLoginDto: UserLoginDto) => ({
  path: "/user",
  method: "PATCH",
  body: userLoginDto,
}));
export const updateUserMutation = createMutation({
  effect: updateUserEffect,
  contract: userContract,
});

export const deleteUserMutation = createMutation({
  effect: createRequestEffect(() => ({
    path: "/user",
    method: "DELETE",
  })),
  contract: userContract,
});

export const signUpMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "/auth/signup", method: "POST" }),
});

export const loginMutation = createMutation({
  effect: createUnAuthorizedRequestFx({ path: "/auth/login", method: "POST" }),
});
