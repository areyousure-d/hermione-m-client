import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { createDeckMutation } from "@/entities/deck";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

export const CreateDeck = () => {
  const [deckname, setDeckname] = useState("");
  const [decknameError, setDecknameError] = useState<string | null>(null);

  const { start: createDeck, pending } = useUnit(createDeckMutation);
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (deckname.length === 0) {
      setDecknameError("Deck name cannot be empty");
      return;
    }

    createDeck({ deckname });
  };

  return (
    <>
      <Button onClick={openModalFn}>Create Deck</Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        title="Create deck"
        loading={pending}
      >
        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              type="text"
              name="deckname"
              label="Deckname"
              placeholder="deckname"
              value={deckname}
              onChange={onChange}
              error={decknameError}
            />

            <Group position="right">
              <Button type="reset" size="xs">
                Reset
              </Button>
              <Button type="submit" size="xs">
                Create
              </Button>
            </Group>
          </Stack>
        </form>
      </ModalWithLoading>
    </>
  );
};
