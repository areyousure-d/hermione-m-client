import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { useUnit } from "effector-react";
import { Link } from "react-router-dom";

import { tokenErased } from "@/shared/auth/token";
import { Icon } from "@/shared/ui/icon";

export const UserAvatar = () => {
  const [tokenErasedFn] = useUnit([tokenErased]);
  const theme = useMantineTheme();

  return (
    <Menu
      shadow="md"
      width={200}
      offset={12}
      position="bottom-end"
      withArrow
      arrowPosition="center"
    >
      <Menu.Target>
        <ActionIcon
          size="lg"
          variant="light"
          color="blue"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.black,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.blue[4]
                : theme.colors.blue[6],
          })}
        >
          <Icon type="common" name="user-circle" width={24} height={24} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          to="/profile"
          icon={
            <Icon
              type="common"
              name="user"
              width={18}
              height={18}
              color={theme.colors.blue[8]}
            />
          }
        >
          My profile
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={tokenErasedFn}
          icon={
            <Icon
              type="common"
              name="logout"
              width={18}
              height={18}
              color={theme.colors.red[8]}
            />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
