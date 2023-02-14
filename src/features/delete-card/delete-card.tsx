import { Button, Flex, Group, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useState } from "react";

import { ModalForm } from "@/shared/ui/modal-form";

import { deleteCardFx, submitted } from "./model";

type Props = {
  cardId: number;
  deckId: string;
};

export const DeleteCard = ({ cardId, deckId }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  const closeModal = () => setModalOpened(false);
  const openModal = () => setModalOpened(true);

  const [submit, loading] = useUnit([submitted, deleteCardFx.pending]);

  const deleteCard = () => submit({ id: cardId, deck_id: Number(deckId) });

  return (
    <>
      <Button onClick={openModal}>Delete card</Button>

      <ModalForm
        isModalOpened={modalOpened}
        closeModal={closeModal}
        loading={loading}
        title="Delete card"
      >
        <Text>Are you sure you want to delete this card?</Text>

        <Flex align="flex-end" w="100%">
          <Group>
            <Button onClick={deleteCard}>Yes</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </Group>
        </Flex>
      </ModalForm>
    </>
  );
};
