import { Button } from "@mantine/core";
import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";

import { Deck, DeckEditForm, updateDeckMutation } from "@/entities/deck";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

type Props = {
  deckname: string;
};

export const UpdateDeck = ({ deckname }: Props) => {
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);
  const { deckId } = useParams() as { deckId: string };
  const { start: startUpdateDeck, pending } = useUnit(updateDeckMutation);

  const submit = (deckname: Deck["deckname"]) => {
    startUpdateDeck({ id: Number(deckId), deckname });
  };

  return (
    <>
      <Button onClick={openModalFn} color="green">
        Update
      </Button>

      <ModalWithLoading
        title="Update deck"
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
      >
        <DeckEditForm initialDeckname={deckname} submit={submit} />
      </ModalWithLoading>
    </>
  );
};
