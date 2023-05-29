import { ReactNode } from "react";

import { MantineProvider } from "./mantine-provider";
import { RouterProvider } from "./router-provider";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <MantineProvider>
      <RouterProvider>{children}</RouterProvider>
    </MantineProvider>
  );
};
