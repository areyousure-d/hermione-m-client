import { useUnit } from "effector-react";

import { $isAuthorized } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

export const SignUpButton = () => {
  const [isAuthorized] = useUnit([$isAuthorized]);

  if (isAuthorized) {
    return null;
  }

  return <ButtonLink to="/sign-up">Sign Up</ButtonLink>;
};
