import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { useUnit } from "effector-react";

import { DeleteDeck, openDeleteDeckModal } from "@/features/deck/delete-deck";
import { EditDeck, openEditDeckModal } from "@/features/deck/edit-deck";
import { Icon } from "@/shared/ui/icon";

type Props = {
  deckname: string;
};

export const DeckSettingsMenu = ({ deckname }: Props) => {
  const [openEditDeckModalFn, openDeleteDeckModalFn] = useUnit([
    openEditDeckModal,
    openDeleteDeckModal,
  ]);
  const theme = useMantineTheme();

  return (
    <>
      <Menu
        shadow="md"
        width={200}
        offset={12}
        position="bottom-end"
        withArrow
        arrowPosition="center"
      >
        <Menu.Target>
          <ActionIcon variant="light" color="blue">
            <Icon type="common" name="settings" width={24} height={24} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label fz="sm">Settings</Menu.Label>

          <Menu.Item
            onClick={openEditDeckModalFn}
            icon={
              <Icon
                type="common"
                name="edit"
                width={20}
                height={20}
                color={theme.colors.blue[8]}
              />
            }
          >
            Edit
          </Menu.Item>
          <Menu.Item
            onClick={openDeleteDeckModalFn}
            icon={
              <Icon
                type="common"
                name="trash"
                width={20}
                height={20}
                color={theme.colors.red[8]}
              />
            }
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <EditDeck deckname={deckname} />
      <DeleteDeck />
    </>
  );
};
