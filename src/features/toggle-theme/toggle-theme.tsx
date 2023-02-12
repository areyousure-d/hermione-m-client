import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";

export const ToggleTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === "dark";

  const onClick = () => toggleColorScheme();

  return (
    <ActionIcon variant="light" onClick={onClick}>
      {isDarkTheme ? <IconSun /> : <IconMoon />}
    </ActionIcon>
  );
};
