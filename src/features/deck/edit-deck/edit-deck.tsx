import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";

import { Deck, DeckEditForm, editDeckMutation } from "@/entities/deck";
import { Button } from "@/shared/ui/button";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

type Props = {
  deckname: string;
};

export const EditDeck = ({ deckname }: Props) => {
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);
  const { deckId } = useParams() as { deckId: string };
  const { start: startEditDeck, pending } = useUnit(editDeckMutation);

  const submit = (deckname: Deck["deckname"]) => {
    startEditDeck({ id: Number(deckId), deckname });
  };

  return (
    <>
      <Button onClick={openModalFn} color="green">
        Edit
      </Button>

      <ModalWithLoading
        title="Edit deck"
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
      >
        <DeckEditForm initialDeckname={deckname} submit={submit} />
      </ModalWithLoading>
    </>
  );
};
