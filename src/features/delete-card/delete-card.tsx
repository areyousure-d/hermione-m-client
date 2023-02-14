import { Button, Flex, Group, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { ModalForm } from "@/shared/ui/modal-form";

import {
  $isModalOpened,
  closeModal,
  deleteCardFx,
  openModal,
  submitted,
} from "./model";

type Props = {
  cardId: number;
  deckId: string;
};

export const DeleteCard = ({ cardId, deckId }: Props) => {
  const [submit, loading, openModalFn, closeModalFn, isModalOpened] = useUnit([
    submitted,
    deleteCardFx.pending,
    openModal,
    closeModal,
    $isModalOpened,
  ]);

  const deleteCard = () => submit({ id: cardId, deck_id: Number(deckId) });

  return (
    <>
      <Button onClick={openModalFn}>Delete card</Button>

      <ModalForm
        isModalOpened={isModalOpened}
        closeModal={closeModalFn}
        loading={loading}
        title="Delete card"
      >
        <Text>Are you sure you want to delete this card?</Text>

        <Flex align="flex-end" w="100%">
          <Group>
            <Button onClick={deleteCard}>Yes</Button>
            <Button onClick={closeModalFn}>Cancel</Button>
          </Group>
        </Flex>
      </ModalForm>
    </>
  );
};
