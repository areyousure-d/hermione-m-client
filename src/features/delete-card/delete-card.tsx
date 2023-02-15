import { Button, Flex, Group, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import {
  $modalOpened,
  closeModal,
  deleteCardMutation,
  openModal,
} from "./model";

type Props = {
  cardId: number;
  deckId: string;
};

export const DeleteCard = ({ cardId, deckId }: Props) => {
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);

  const { start, pending } = useUnit(deleteCardMutation);

  const deleteCard = () =>
    start({ body: { id: cardId, deck_id: Number(deckId) } });

  return (
    <>
      <Button onClick={openModalFn}>Delete card</Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
        title="Delete deck"
      >
        <Text>Are you sure you want to delete this card?</Text>

        <Flex align="flex-end" w="100%">
          <Group>
            <Button onClick={deleteCard}>Yes</Button>
            <Button onClick={closeModalFn}>Cancel</Button>
          </Group>
        </Flex>
      </ModalWithLoading>
    </>
  );
};
