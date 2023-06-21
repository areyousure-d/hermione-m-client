import { ActionIcon, useMantineColorScheme } from "@mantine/core";

import { Icon } from "@/shared/ui/icon";

export const ToggleTheme = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === "dark";

  const onClick = () => toggleColorScheme();

  return (
    <ActionIcon
      onClick={onClick}
      size="lg"
      variant="light"
      color="blue"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.white,
        color:
          theme.colorScheme === "dark"
            ? theme.colors.yellow[4]
            : theme.colors.yellow[8],
      })}
    >
      {isDarkTheme ? (
        <Icon type="common" name="sun-high" width={18} height={18} />
      ) : (
        <Icon type="common" name="moon" width={18} height={18} />
      )}
    </ActionIcon>
  );
};
