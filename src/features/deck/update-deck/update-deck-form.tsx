import { Button, Group, LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { updateDeckMutation } from "@/entity/deck";

type Props = {
  initialDeckname: string;
};

export const UpdateDeckForm = ({ initialDeckname }: Props) => {
  const [deckname, setDeckname] = useState(initialDeckname);
  const [error, setError] = useState<string | null>(null);

  const { deckId } = useParams() as { deckId: string };
  const { start: updateDeck, pending } = useUnit(updateDeckMutation);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
    setError(null);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (deckname.length === 0) {
      setError("Deck name cannot be empty");
    }

    updateDeck({ deckname, id: Number(deckId) });
  };

  const onReset = () => {
    setDeckname(initialDeckname);
  };

  return (
    <form onSubmit={onSubmit}>
      <LoadingOverlay visible={pending} overlayBlur={3} />

      <Stack>
        <TextInput
          type="text"
          name="deckname"
          label="Deckname"
          placeholder="deckname"
          onChange={onChange}
          value={deckname}
          error={error}
        />

        <Group position="right">
          <Button onClick={onReset}>Reset</Button>
          <Button type="submit">Update</Button>
        </Group>
      </Stack>
    </form>
  );
};
