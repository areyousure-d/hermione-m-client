import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, CardEditForm, cardListQuery } from "@/entities/card";

import { updateCardMutation } from "./model";

export const UpdateCard = () => {
  const [card, setCard] = useState<Card | null>(null);

  const navigate = useNavigate();
  const { deckId, cardId } = useParams() as { deckId: string; cardId: string };
  const { start: updateCard } = useUnit(updateCardMutation);
  const [cardList] = useUnit([cardListQuery.$data]);

  useEffect(() => {
    if (cardList) {
      const card = cardList.find((card) => card.id === Number(cardId));

      if (card) {
        setCard(card);
      }
    }
  }, [cardList, cardId]);

  const submit = (formValues: Pick<Card, "front" | "back">) => {
    updateCard({
      body: { ...formValues },
      deckId: Number(deckId),
      cardId: Number(cardId),
    });

    navigate(`/decks/${deckId}/cards`);
  };

  return <CardEditForm submit={submit} card={card} />;
};
