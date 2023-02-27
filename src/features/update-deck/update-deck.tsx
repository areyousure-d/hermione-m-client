import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { Deck } from "@/entities/deck";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, updateDeckMutation } from "./model";

type Props = {
  deck: Deck;
};

export const UpdateDeck = ({ deck }: Props) => {
  const [closeModalFn, modalOpened, createDeckMutationFailed] = useUnit([
    closeModal,
    $modalOpened,
    updateDeckMutation.$failed,
  ]);

  const { start, pending } = useUnit(updateDeckMutation);

  const [deckname, setDeckname] = useState(deck.deckname);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    start({ ...deck, deckname });
    setDeckname(deck.deckname);
  };

  return (
    <ModalWithLoading
      opened={modalOpened}
      onClose={closeModalFn}
      loading={pending}
      title="Update deck"
    >
      {createDeckMutationFailed && (
        <Text fz="md" color="red.7">
          Update deck error
        </Text>
      )}

      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label="Deckname"
            name="deckname"
            type="text"
            onChange={onChange}
            placeholder="deckname"
            value={deckname}
          />

          <Group position="right">
            <Button size="xs" type="submit">
              Update deck
            </Button>
          </Group>
        </Stack>
      </form>
    </ModalWithLoading>
  );
};
