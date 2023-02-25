import { Button, Flex, Group, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, deleteDeckMutation } from "./model";

type Props = {
  deckId: number;
};

export const DeleteDeck = ({ deckId }: Props) => {
  const [closeModalFn, modalOpened] = useUnit([closeModal, $modalOpened]);

  const { start, pending } = useUnit(deleteDeckMutation);

  const deleteDeck = () => start({ id: deckId });

  return (
    <ModalWithLoading
      opened={modalOpened}
      onClose={closeModalFn}
      loading={pending}
      title="Delete deck"
    >
      <Text>Are you sure you want to delete this deck?</Text>

      <Flex align="flex-end" w="100%">
        <Group>
          <Button onClick={deleteDeck}>Yes</Button>
          <Button onClick={closeModalFn}>Cancel</Button>
        </Group>
      </Flex>
    </ModalWithLoading>
  );
};
