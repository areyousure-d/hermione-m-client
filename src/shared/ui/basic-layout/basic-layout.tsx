import { AppShell } from "@mantine/core";
import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
  header: ReactElement;
}

export const BasicLayout = ({ children, header }: Props) => {
  return <AppShell header={header}>{children}</AppShell>;
};
