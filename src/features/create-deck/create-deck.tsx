import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { createDeckMutation } from "@/entity/deck";

export const CreateDeck = () => {
  const [deckname, setDeckname] = useState("");
  const [decknameError, setDecknameError] = useState<string | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const { start: createDeck, pending } = useUnit(createDeckMutation);

  const onClose = () => setModalOpened(false);
  const onOpen = () => setModalOpened(true);

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
      <Button onClick={onOpen}>Create Deck</Button>

      <Modal opened={modalOpened} onClose={onClose} title="Create deck">
        <LoadingOverlay visible={pending} overlayBlur={3} />

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
      </Modal>
    </>
  );
};
