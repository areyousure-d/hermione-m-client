import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { useUnit } from "effector-react";
import { Link } from "react-router-dom";

import { DeleteCard, openDeleteCardModal } from "@/features/card/delete-card";
import { Icon } from "@/shared/ui/icon";

type Props = {
  deckId: string;
  cardId: string;
};

export const CardSettingsMenu = ({ deckId, cardId }: Props) => {
  const [openDeleteCardModalFn] = useUnit([openDeleteCardModal]);
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
          <ActionIcon variant="light" color="blue" size="lg">
            <Icon type="common" name="settings" width={24} height={24} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label fz="sm">Settings</Menu.Label>

          <Menu.Item
            component={Link}
            to={`/decks/${deckId}/update-card/${cardId}`}
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
            onClick={openDeleteCardModalFn}
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

      <DeleteCard cardId={cardId} />
    </>
  );
};
