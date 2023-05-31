import { Button, Group, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { deleteCardMutation } from "@/entity/card";

export const DeleteCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const onClose = () => setModalOpened(false);
  const onOpen = () => setModalOpened(true);

  const { deckId, cardId } = useParams() as { deckId: string; cardId: string };
  const { start: deleteCardFn, pending } = useUnit(deleteCardMutation);

  const deleteCard = () =>
    deleteCardFn({ deckId: Number(deckId), cardId: Number(cardId) });

  return (
    <>
      <Button onClick={onOpen} color="red" size="xs">
        Delete card
      </Button>

      <Modal opened={modalOpened} onClose={onClose} title="Delete card">
        <LoadingOverlay visible={pending} overlayBlur={3} />

        <Text mb="lg">Are you sure you want to delete this card?</Text>

        <Group position="right">
          <Button size="xs" onClick={onClose}>
            Cancel
          </Button>
          <Button size="xs" onClick={deleteCard}>
            Yes
          </Button>
        </Group>
      </Modal>
    </>
  );
};
