import { Button, Group, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { deleteDeckMutation } from "@/entity/deck";

export const DeleteDeck = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const onClose = () => setModalOpened(false);
  const onOpen = () => setModalOpened(true);

  const { deckId } = useParams() as { deckId: string };
  const { start: deleteDeckFn, pending } = useUnit(deleteDeckMutation);

  const deleteDeck = () => deleteDeckFn({ id: Number(deckId) });

  return (
    <>
      <Button onClick={onOpen} color="red">
        Delete deck
      </Button>

      <Modal opened={modalOpened} onClose={onClose} title="Delete deck">
        <LoadingOverlay visible={pending} overlayBlur={3} />

        <Text mb="lg">Are you sure you want to delete this deck?</Text>

        <Group position="right">
          <Button size="xs" onClick={onClose}>
            Cancel
          </Button>
          <Button size="xs" onClick={deleteDeck}>
            Yes
          </Button>
        </Group>
      </Modal>
    </>
  );
};
