import { Button } from "@mantine/core";
import { useState } from "react";

import { Modal } from "./modal";
import { UpdateDeckForm } from "./update-deck-form";

export const UpdateDeck = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const onClose = () => setModalOpened(false);
  const onOpen = () => setModalOpened(true);

  return (
    <>
      <Button onClick={onOpen} color="green">
        Update
      </Button>

      <Modal opened={modalOpened} onClose={onClose}>
        <UpdateDeckForm />
      </Modal>
    </>
  );
};
