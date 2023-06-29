import { useUnit } from "effector-react";

import { $isAuthorized } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

import { UserAvatar } from "./user-avatar";

type Props = {
  closeDrawer?: () => void;
};

export const LoginButton = ({ closeDrawer }: Props) => {
  const [isAuthorized] = useUnit([$isAuthorized]);

  if (isAuthorized) {
    return <UserAvatar />;
  }

  return (
    <ButtonLink to="/login" onClick={closeDrawer}>
      Log in
    </ButtonLink>
  );
};
