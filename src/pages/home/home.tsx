import { useUnit } from "effector-react";

import { $isAuthorized } from "@/shared/auth/token";

import { GuestHomepage } from "./quest-homepage";
import { UserHomepage } from "./user-homepage";

export const HomePage = () => {
  const isAuthorized = useUnit($isAuthorized);

  if (isAuthorized) {
    return <UserHomepage />;
  }

  return <GuestHomepage />;
};
