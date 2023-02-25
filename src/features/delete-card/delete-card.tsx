import { Button, Group, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useState } from "react";

import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { deleteCardMutation } from "./model";

type Props = {
  cardId: number;
  deckId: string;
};

export const DeleteCard = ({ cardId, deckId }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  const { start, pending } = useUnit(deleteCardMutation);

  const deleteCard = () => start({ id: cardId, deck_id: Number(deckId) });

  return (
    <>
      <Button color="red" variant="light" size="xs" onClick={openModal}>
        Delete card
      </Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModal}
        loading={pending}
        title="Delete deck"
      >
        <Text mb="lg">Are you sure you want to delete this card?</Text>

        <Group position="right">
          <Button size="xs" onClick={closeModal}>
            Cancel
          </Button>
          <Button size="xs" color="red" onClick={deleteCard}>
            Yes
          </Button>
        </Group>
      </ModalWithLoading>
    </>
  );
};
