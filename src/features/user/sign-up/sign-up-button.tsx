import { useUnit } from "effector-react";

import { $isAuthorized } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

type Props = {
  closeDrawer?: () => void;
};

export const SignUpButton = ({ closeDrawer }: Props) => {
  const [isAuthorized] = useUnit([$isAuthorized]);

  if (isAuthorized) {
    return null;
  }

  return (
    <ButtonLink to="/sign-up" onClick={closeDrawer}>
      Sign Up
    </ButtonLink>
  );
};
