import { Button, Group, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { deleteDeckMutation } from "@/entities/deck";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal } from "./model";

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
      <Text mb="lg">Are you sure you want to delete this deck?</Text>

      <Group position="right">
        <Button size="xs" onClick={closeModalFn}>
          Cancel
        </Button>
        <Button size="xs" color="red" onClick={deleteDeck}>
          Yes
        </Button>
      </Group>
    </ModalWithLoading>
  );
};
