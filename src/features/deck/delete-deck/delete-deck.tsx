import { Group, Stack, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteDeckMutation } from "@/entities/deck";
import { Button } from "@/shared/ui/button";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal } from "./model";

export const DeleteDeck = () => {
  const navigate = useNavigate();
  const { deckId } = useParams() as { deckId: string };
  const { start: deleteDeckFn, pending } = useUnit(deleteDeckMutation);
  const [modalOpened, closeModalFn] = useUnit([$modalOpened, closeModal]);

  const deleteDeck = () => {
    deleteDeckFn({ id: Number(deckId) });
    navigate("/");
  };

  return (
    <ModalWithLoading
      opened={modalOpened}
      onClose={closeModalFn}
      loading={pending}
      title="Delete deck"
    >
      <Stack>
        <Text mb="lg">Are you sure you want to delete this deck?</Text>

        <Group position="right">
          <Button onClick={closeModalFn} variant="light">
            Cancel
          </Button>
          <Button onClick={deleteDeck} variant="light">
            Yes
          </Button>
        </Group>
      </Stack>
    </ModalWithLoading>
  );
};
