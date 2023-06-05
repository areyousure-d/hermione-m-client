import { Button } from "@mantine/core";
import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";

import { Deck, updateDeckMutation } from "@/entities/deck";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";
import { UpdateDeckForm } from "./update-deck-form";

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

  const updateDeck = ({ deckname }: Pick<Deck, "deckname">) => {
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
        <UpdateDeckForm initialDeckname={deckname} updateDeck={updateDeck} />
      </ModalWithLoading>
    </>
  );
};
