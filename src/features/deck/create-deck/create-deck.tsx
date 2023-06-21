import { useUnit } from "effector-react";

import { createDeckMutation, Deck, DeckEditForm } from "@/entities/deck";
import { Button } from "@/shared/ui/button";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

export const CreateDeck = () => {
  const { start: createDeck, pending } = useUnit(createDeckMutation);
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);

  const submit = (deckname: Deck["deckname"]) => {
    createDeck({ deckname });
  };

  return (
    <>
      <Button onClick={openModalFn} variant="light">
        Create Deck
      </Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        title="Create new deck"
        loading={pending}
      >
        <DeckEditForm submit={submit} />
      </ModalWithLoading>
    </>
  );
};
