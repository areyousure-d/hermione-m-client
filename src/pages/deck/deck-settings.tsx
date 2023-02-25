import { ActionIcon, Menu } from "@mantine/core";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons";
import { useUnit } from "effector-react";

import { Deck } from "@/entities/deck";
import { DeleteDeck, openDeleteDeckModal } from "@/features/delete-deck";
import { openUpdateDeckModal, UpdateDeck } from "@/features/update-deck";

type Props = {
  deck: Deck;
};

export const DeckSettings = ({ deck }: Props) => {
  const [openUpdateDeckModalFn, openDeleteDeckModalFn] = useUnit([
    openUpdateDeckModal,
    openDeleteDeckModal,
  ]);

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon>
            <IconSettings size={24} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label fz="md">Settings</Menu.Label>

          <Menu.Item
            onClick={openUpdateDeckModalFn}
            icon={<IconEdit size={24} />}
          >
            Update deck
          </Menu.Item>

          <Menu.Item
            onClick={openDeleteDeckModalFn}
            color="red"
            icon={<IconTrash size={24} />}
          >
            Delete deck
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <UpdateDeck deck={deck} />
      <DeleteDeck deckId={deck.id} />
    </>
  );
};
