import { Notifications } from "@mantine/notifications";
import { ReactNode } from "react";

export const renderWithNotifications = (component: ReactNode) => {
  return (
    <>
      <Notifications />

      {component}
    </>
  );
};
