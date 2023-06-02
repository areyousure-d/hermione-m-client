import { Button } from "@mantine/core";
import { useUnit } from "effector-react";

import { $isAuthorized, tokenErased } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

export const LoginButton = () => {
  const [isAuthorized, tokenErasedFn] = useUnit([$isAuthorized, tokenErased]);

  if (isAuthorized) {
    return <Button onClick={tokenErasedFn}>Logout</Button>;
  }

  return (
    <>
      <ButtonLink to="/login">Login</ButtonLink>
    </>
  );
};
