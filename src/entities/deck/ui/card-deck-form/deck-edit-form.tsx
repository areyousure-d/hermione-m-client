import { Group, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/shared/ui/button";

type Props = {
  initialDeckname?: string;
  submit: (deckname: string) => void;
};

export const DeckEditForm = ({ initialDeckname = "", submit }: Props) => {
  const [deckname, setDeckname] = useState(initialDeckname);
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckname(event.target.value);
    setError(null);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (deckname.length === 0) {
      setError("Deckname cannot be empty");
      return;
    }

    submit(deckname);
  };

  const onReset = () => {
    setDeckname(initialDeckname);
  };

  const submitButtonText =
    initialDeckname === "" ? "Create deck" : "Update deck";

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
          <Button onClick={onReset} size="xs">
            Reset
          </Button>
          <Button type="submit" size="xs">
            {submitButtonText}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
