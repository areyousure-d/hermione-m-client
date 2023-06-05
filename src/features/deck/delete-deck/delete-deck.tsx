import { Button, Group, Stack, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteDeckMutation } from "@/entities/deck";
import { Icon } from "@/shared/ui/icon";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

export const DeleteDeck = () => {
  const navigate = useNavigate();
  const { deckId } = useParams() as { deckId: string };
  const { start: deleteDeckFn, pending } = useUnit(deleteDeckMutation);
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);

  const deleteDeck = () => {
    deleteDeckFn({ id: Number(deckId) });
    navigate("/");
  };

  return (
    <>
      <Button
        onClick={openModalFn}
        color="red"
        leftIcon={<Icon type="common" name="trash" width={18} height={18} />}
      >
        Delete deck
      </Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
        title="Delete deck"
      >
        <Stack>
          <Text mb="lg">Are you sure you want to delete this deck?</Text>

          <Group position="right">
            <Button size="xs" onClick={closeModalFn}>
              Cancel
            </Button>
            <Button size="xs" onClick={deleteDeck}>
              Yes
            </Button>
          </Group>
        </Stack>
      </ModalWithLoading>
    </>
  );
};
