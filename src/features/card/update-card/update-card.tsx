import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { cardListQuery } from "@/entities/card";

import { updateCardMutation } from "./model";
import { updateCardFormSchema } from "./update-card.schema";

type UpdateCardFormErrors = { front: string | null; back: string | null };
const initialFormErrors: UpdateCardFormErrors = { front: null, back: null };

export const UpdateCard = () => {
  const [formValues, setFormValues] = useState({ front: "", back: "" });
  const [formErrors, setFormErrors] =
    useState<UpdateCardFormErrors>(initialFormErrors);

  const navigate = useNavigate();
  const { deckId, cardId } = useParams() as { deckId: string; cardId: string };
  const { start: updateCard } = useUnit(updateCardMutation);
  const [cardList] = useUnit([cardListQuery.$data]);

  useEffect(() => {
    if (cardList) {
      const card = cardList.find((card) => card.id === Number(cardId));

      if (card) {
        setFormValues({ front: card.front, back: card.back });
      }
    }
  }, [cardList, cardId]);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationResult = updateCardFormSchema.safeParse(formValues);

    if (validationResult.success) {
      updateCard({
        body: { ...formValues },
        deckId: Number(deckId),
        cardId: Number(cardId),
      });
      setFormValues({ front: "", back: "" });
      navigate(`/decks/${deckId}/cards`);
      return;
    }

    const errors = { ...initialFormErrors };
    validationResult.error.issues.forEach((issue) => {
      const name = issue.path[0];
      const message = issue.message;

      if (name && name in errors) {
        errors[name as keyof UpdateCardFormErrors] = message;
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
          <Button type="reset">Reset</Button>
          <Button type="submit">Update card</Button>
        </Group>
      </Stack>
    </form>
  );
};
