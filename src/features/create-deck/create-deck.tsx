import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import {
  $createDeckMutationFailed,
  $modalOpened,
  closeModal,
  createDeckMutation,
  openModal,
} from "./model";

export const CreateDeck = () => {
  const [openModalFn, closeModalFn, modalOpened, createDeckMutationFailed] =
    useUnit([openModal, closeModal, $modalOpened, $createDeckMutationFailed]);

  const { start, pending } = useUnit(createDeckMutation);

  const [deckname, setDeckname] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    start({ body: { deckname } });
    setDeckname("");
  };

  return (
    <>
      <Button onClick={openModalFn}>Create deck</Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
        title="Create deck"
      >
        {createDeckMutationFailed && (
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
      </ModalWithLoading>
    </>
  );
};
