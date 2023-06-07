import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { createCardFormSchema } from "./create-card.schema";
import { createCardMutation } from "./model";

type CreateCardFormErrors = { front: string | null; back: string | null };

const initialFormErrors: CreateCardFormErrors = { front: null, back: null };
const initialFormValues = { front: "", back: "" };

export const CreateCard = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] =
    useState<CreateCardFormErrors>(initialFormErrors);

  const { deckId } = useParams() as { deckId: string };
  const { start: createCard } = useUnit(createCardMutation);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationResult = createCardFormSchema.safeParse(formValues);

    if (validationResult.success) {
      createCard({ body: { ...formValues }, deckId: Number(deckId) });
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

  const resetForm = () => setFormValues(initialFormValues);

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
          <Button onClick={resetForm}>Reset</Button>
          <Button type="submit">Create card</Button>
        </Group>
      </Stack>
    </form>
  );
};
