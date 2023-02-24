import {
  ActionIcon,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";

export const ToggleTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const theme = useMantineTheme();

  const onClick = () => toggleColorScheme();

  return (
    <Group position="center">
      <ActionIcon
        onClick={onClick}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[1],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.dark[6],
        })}
      >
        {isDarkTheme ? (
          <IconSun size={18} fill={theme.colors.yellow[4]} />
        ) : (
          <IconMoon size={18} fill={theme.colors.dark[4]} />
        )}
      </ActionIcon>
    </Group>
  );
};
