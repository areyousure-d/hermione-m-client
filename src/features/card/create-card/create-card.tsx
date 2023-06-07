import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";

import { CardEditForm } from "@/entities/card";

import { createCardMutation } from "./model";

export const CreateCard = () => {
  const { deckId } = useParams() as { deckId: string };
  const { start: createCard } = useUnit(createCardMutation);

  const submit = (formValues: { front: string; back: string }) => {
    createCard({ body: { ...formValues }, deckId: Number(deckId) });
  };

  return <CardEditForm submit={submit} />;
};
