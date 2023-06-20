import { Group, Stack, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";

import { deleteCardMutation } from "@/entities/card";
import { Button } from "@/shared/ui/button";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal } from "./model";

type Props = {
  cardId: string;
};

export const DeleteCard = ({ cardId }: Props) => {
  const { deckId } = useParams() as { deckId: string };
  const { start: deleteCardFn, pending } = useUnit(deleteCardMutation);
  const [modalOpened, closeModalFn] = useUnit([$modalOpened, closeModal]);

  const deleteCard = () =>
    deleteCardFn({ deckId: Number(deckId), cardId: Number(cardId) });

  return (
    <ModalWithLoading
      title="Delete card"
      opened={modalOpened}
      onClose={closeModalFn}
      loading={pending}
    >
      <Stack>
        <Text>Are you sure you want to delete this card?</Text>

        <Group position="right">
          <Button size="xs" onClick={closeModalFn}>
            Cancel
          </Button>
          <Button size="xs" onClick={deleteCard}>
            Yes
          </Button>
        </Group>
      </Stack>
    </ModalWithLoading>
  );
};
