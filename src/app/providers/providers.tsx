import { ReactNode } from "react";

import { RouterProvider } from "./router-provider";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return <RouterProvider>{children}</RouterProvider>;
};
