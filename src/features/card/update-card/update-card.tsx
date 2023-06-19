import { useUnit } from "effector-react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, CardEditForm, cardListQuery } from "@/entities/card";

import { updateCardMutation } from "./model";

export const UpdateCard = () => {
  const navigate = useNavigate();
  const { deckId, cardId } = useParams() as { deckId: string; cardId: string };
  const { start: updateCard } = useUnit(updateCardMutation);
  const [cardList] = useUnit([cardListQuery.$data]);

  const submit = (formValues: Pick<Card, "front" | "back">) => {
    updateCard({
      body: { ...formValues },
      deckId: Number(deckId),
      cardId: Number(cardId),
    });

    navigate(`/decks/${deckId}/cards`);
  };

  const card = cardList
    ? cardList.find((card) => card.id === Number(cardId))
    : null;

  return <CardEditForm submit={submit} card={card} />;
};
