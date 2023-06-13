import { Group, Stack, Textarea } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/shared/ui/button";

import { Card } from "../..";
import { cardEditSchema } from "./card-edit.schema";

type CreateCardFormErrors = { front: string | null; back: string | null };
const initialFormErrors: CreateCardFormErrors = { front: null, back: null };

type Props = {
  submit: (formValues: { front: string; back: string }) => void;
  card?: Pick<Card, "front" | "back"> | null;
};

export const CardEditForm = ({ submit, card }: Props) => {
  const initialValues = { front: card?.front ?? "", back: card?.back ?? "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] =
    useState<CreateCardFormErrors>(initialFormErrors);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationResult = cardEditSchema.safeParse(formValues);

    if (validationResult.success) {
      submit(formValues);
      setFormValues(initialValues);
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

  const resetForm = () => setFormValues(initialValues);

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
          <Button type="submit">{card ? "Update card" : "Create card"}</Button>
        </Group>
      </Stack>
    </form>
  );
};
