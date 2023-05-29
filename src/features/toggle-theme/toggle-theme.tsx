import { Button, useMantineColorScheme } from "@mantine/core";

export const ToggleTheme = () => {
  const { toggleColorScheme } = useMantineColorScheme();

  const onClick = () => toggleColorScheme();

  return <Button onClick={onClick}>toggle theme</Button>;
};
