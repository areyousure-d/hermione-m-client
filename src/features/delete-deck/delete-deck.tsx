import { Button, Flex, Group, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { ModalForm } from "@/shared/ui/modal-form";

import {
  $isModalOpened,
  closeModal,
  deleteDeckFx,
  openModal,
  submitted,
} from "./model";

type Props = {
  deckId: string;
};

export const DeleteDeck = ({ deckId }: Props) => {
  const [submit, loading, openModalFn, closeModalFn, isModalOpened] = useUnit([
    submitted,
    deleteDeckFx.pending,
    openModal,
    closeModal,
    $isModalOpened,
  ]);

  const deleteDeck = () => submit(deckId);

  return (
    <>
      <Button onClick={openModalFn}>Delete deck</Button>

      <ModalForm
        isModalOpened={isModalOpened}
        closeModal={closeModalFn}
        loading={loading}
        title="Delete deck"
      >
        <Text>Are you sure you want to delete this deck?</Text>

        <Flex align="flex-end" w="100%">
          <Group>
            <Button onClick={deleteDeck}>Yes</Button>
            <Button onClick={closeModalFn}>Cancel</Button>
          </Group>
        </Flex>
      </ModalForm>
    </>
  );
};
