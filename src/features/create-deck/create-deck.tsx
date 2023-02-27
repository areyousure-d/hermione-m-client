import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { createDeckMutation, decknameSchema } from "@/entities/deck";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

export const CreateDeck = () => {
  const [openModalFn, closeModalFn, modalOpened, createDeckMutationFailed] =
    useUnit([openModal, closeModal, $modalOpened, createDeckMutation.$failed]);

  const { start, pending } = useUnit(createDeckMutation);

  const [deckname, setDeckname] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
    setValidationError(null);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationResult = decknameSchema.safeParse(deckname);

    if (validationResult.success) {
      start({ deckname });
      setDeckname("");
      return;
    }

    const errorMessage = validationResult.error.issues[0]?.message;
    setValidationError(errorMessage || null);
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
              error={validationError}
            />

            <Button type="submit">Create deck</Button>
          </Stack>
        </form>
      </ModalWithLoading>
    </>
  );
};
