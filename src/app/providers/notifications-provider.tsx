import { NotificationsProvider as MantineNotificationsProvider } from "@mantine/notifications";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const NotificationsProvider = ({ children }: Props) => {
  return (
    <MantineNotificationsProvider>{children}</MantineNotificationsProvider>
  );
};
