import { MantineProvider as Provider } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const MantineProvider = ({ children }: Props) => {
  return (
    <Provider withGlobalStyles withNormalizeCSS>
      {children}
    </Provider>
  );
};
