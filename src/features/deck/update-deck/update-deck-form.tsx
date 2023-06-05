import { Button, Group, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";

import { Deck } from "@/entities/deck";

type Props = {
  initialDeckname: string;
  updateDeck: (params: Pick<Deck, "deckname">) => void;
};

export const UpdateDeckForm = ({ initialDeckname, updateDeck }: Props) => {
  const [deckname, setDeckname] = useState(initialDeckname);
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
    setError(null);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (deckname.length === 0) {
      setError("Deck name cannot be empty");
    }

    updateDeck({ deckname });
  };

  const onReset = () => {
    setDeckname(initialDeckname);
  };

  return (
    <form onSubmit={onSubmit}>
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
