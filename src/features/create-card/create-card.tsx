import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { createCardMutation } from "@/entities/card";

import { createCardFormSchema } from "./create-card-form-schema";

type CreateCardFormErrors = {
  front: string | null;
  back: string | null;
};

const initialFormValues = {
  front: "",
  back: "",
};

const initialFormErrors: CreateCardFormErrors = {
  front: null,
  back: null,
};

type Props = {
  deckId: string;
};

export const CreateCard = ({ deckId }: Props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const { start } = useUnit(createCardMutation);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const onClear = () => {
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationResult = createCardFormSchema.safeParse(formValues);

    if (validationResult.success) {
      start({ ...formValues, deck_id: Number(deckId) });
      setFormValues(initialFormValues);
      return;
    }

    const errors = { ...initialFormErrors };
    validationResult.error.issues.forEach((issue) => {
      const name = issue.path[0];
      const message = issue.message;

      if (name && name in errors) {
        errors[name as keyof CreateCardFormErrors] = message;
      }
    });

    setFormErrors(errors);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Textarea
          placeholder="Question"
          label="Question"
          name="front"
          autosize
          minRows={5}
          value={formValues.front}
          onChange={onChange}
          error={formErrors.front}
        />

        <Textarea
          placeholder="Answer"
          label="Answer"
          name="back"
          autosize
          minRows={5}
          value={formValues.back}
          onChange={onChange}
          error={formErrors.back}
        />

        <Group position="right">
          <Button type="button" onClick={onClear}>
            Clear
          </Button>
          <Button type="submit">Create card</Button>
        </Group>
      </Stack>
    </form>
  );
};
