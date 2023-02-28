import { ReactNode } from "react";
import { HashRouter } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const RouterProvider = ({ children }: Props) => {
  return <HashRouter>{children}</HashRouter>;
};
