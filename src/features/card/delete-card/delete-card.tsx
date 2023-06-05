import { Button, Group, Stack, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";

import { deleteCardMutation } from "@/entities/card";
import { Icon } from "@/shared/ui/icon";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

type Props = {
  cardId: number;
};

export const DeleteCard = ({ cardId }: Props) => {
  const { deckId } = useParams() as { deckId: string };
  const { start: deleteCardFn, pending } = useUnit(deleteCardMutation);
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);

  const deleteCard = () => deleteCardFn({ deckId: Number(deckId), cardId });

  return (
    <>
      <Button
        onClick={openModalFn}
        color="red"
        size="xs"
        leftIcon={<Icon type="common" name="trash" width={18} height={18} />}
      >
        Delete card
      </Button>

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
    </>
  );
};
