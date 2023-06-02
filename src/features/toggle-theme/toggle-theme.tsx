import {
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import { Icon } from "@/shared/ui/icon";

export const ToggleTheme = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const theme = useMantineTheme();

  const onClick = () => toggleColorScheme();

  return (
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
        <Icon
          type="common"
          name="sun-high"
          width={18}
          height={18}
          fill={theme.colors.yellow[4]}
        />
      ) : (
        <Icon
          type="common"
          name="moon"
          width={18}
          height={18}
          fill={theme.colors.dark[4]}
        />
      )}
    </ActionIcon>
  );
};
