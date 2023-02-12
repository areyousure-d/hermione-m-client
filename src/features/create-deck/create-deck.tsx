import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { ModalForm } from "@/shared/ui/modal-form";

import {
  $isError,
  $isModalOpened,
  closeModal,
  createDeckFx,
  openModal,
  submitted,
} from "./model";

export const CreateDeck = () => {
  const [submit, loading, isError, openModalFn, closeModalFn, isModalOpened] =
    useUnit([
      submitted,
      createDeckFx.pending,
      $isError,
      openModal,
      closeModal,
      $isModalOpened,
    ]);

  const [deckname, setDeckname] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit({ deckname });
    setDeckname("");
  };

  return (
    <>
      <Button onClick={openModalFn}>Create deck</Button>

      <ModalForm
        title="Create deck"
        isModalOpened={isModalOpened}
        closeModal={closeModalFn}
        loading={loading}
      >
        {isError && (
          <Text fz="md" color="red.7">
            Create deck error
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

            <Button type="submit">Create deck</Button>
          </Stack>
        </form>
      </ModalForm>
    </>
  );
};
