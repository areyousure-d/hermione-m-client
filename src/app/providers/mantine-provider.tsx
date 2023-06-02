import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider as Provider,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

export const MantineProvider = ({ children }: Props) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <Provider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Notifications />

        {children}
      </Provider>
    </ColorSchemeProvider>
  );
};
