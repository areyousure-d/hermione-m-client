import { ReactNode } from "react";

import { MantineProvider } from "./mantine-provider";
import { NotificationsProvider } from "./notifications-provider";
import { RouterProvider } from "./router-provider";

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <RouterProvider>{children}</RouterProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};
