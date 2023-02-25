import { Button, Stack, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { createCardMutation } from "@/entities/card";

const initialFormValues = {
  front: "",
  back: "",
};

type Props = {
  deckId: string;
};

export const CreateCard = ({ deckId }: Props) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const { start } = useUnit(createCardMutation);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    start({ ...formValues, deck_id: Number(deckId) });
    setFormValues(initialFormValues);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Textarea
          placeholder="Question"
          label="Question"
          name="front"
          autosize
          minRows={3}
          value={formValues.front}
          onChange={onChange}
        />

        <Textarea
          placeholder="Answer"
          label="Answer"
          name="back"
          autosize
          minRows={3}
          value={formValues.back}
          onChange={onChange}
        />

        <Button type="submit">Create card</Button>
      </Stack>
    </form>
  );
};
