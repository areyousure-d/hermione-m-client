import { useUnit } from "effector-react";

import { $isAuthorized } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

import { UserAvatar } from "./user-avatar";

export const LoginButton = () => {
  const [isAuthorized] = useUnit([$isAuthorized]);

  if (isAuthorized) {
    return <UserAvatar />;
  }

  return <ButtonLink to="/login">Login</ButtonLink>;
};
