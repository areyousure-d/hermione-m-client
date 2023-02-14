import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { Deck } from "@/entities/deck";
import { ModalForm } from "@/shared/ui/modal-form";

import {
  $isError,
  $isModalOpened,
  closeModal,
  openModal,
  submitted,
  updateDeckFx,
} from "./model";

type Props = {
  deck: Deck;
};

export const UpdateDeck = ({ deck }: Props) => {
  const [submit, loading, isError, openModalFn, closeModalFn, isModalOpened] =
    useUnit([
      submitted,
      updateDeckFx.pending,
      $isError,
      openModal,
      closeModal,
      $isModalOpened,
    ]);

  const [deckname, setDeckname] = useState(deck.deckname);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit({ ...deck, deckname });
    setDeckname(deck.deckname);
  };

  return (
    <>
      <Button onClick={openModalFn}>Update deck</Button>

      <ModalForm
        title="Update deck"
        isModalOpened={isModalOpened}
        closeModal={closeModalFn}
        loading={loading}
      >
        {isError && (
          <Text fz="md" color="red.7">
            Update deck error
          </Text>
        )}

        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              label="deckname"
              name="deckname"
              type="text"
              onChange={onChange}
              placeholder="deckname"
              value={deckname}
            />

            <Button type="submit">Update deck</Button>
          </Stack>
        </form>
      </ModalForm>
    </>
  );
};
