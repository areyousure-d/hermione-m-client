import { Flex, Skeleton } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { cardsToLearnQuery } from "@/entities/card";
import { Alert } from "@/shared/ui/alert";

import { Buttons } from "./buttons";
import { CardView } from "./card-view";
import { $cardToLearn, fetchCardsToLearn } from "./model";

export const LearnCard = () => {
  const [answerIsVisible, setAnswerIsVisible] = useState(false);

  const { deckId } = useParams() as { deckId: string };
  const { pending: cardsToLearnLoading } = useUnit(cardsToLearnQuery);
  const [cardToLearn, fetchCardsToLearnFn] = useUnit([
    $cardToLearn,
    fetchCardsToLearn,
  ]);

  useEffect(() => {
    if (deckId) {
      fetchCardsToLearnFn(deckId);
    }
  }, [deckId, fetchCardsToLearnFn]);

  if (!cardToLearn && !cardsToLearnLoading) {
    return (
      <Alert variant="info" title="No card">
        No card to learn
      </Alert>
    );
  }

  return (
    <Flex direction="column" justify="space-between" h="100%">
      {cardsToLearnLoading ? (
        <Skeleton height={300} />
      ) : (
        <CardView card={cardToLearn} answerIsVisible={answerIsVisible} />
      )}

      <Buttons
        setIsAnswerVisible={setAnswerIsVisible}
        answerIsVisible={answerIsVisible}
        cardToLearn={cardToLearn}
        fetchCardsToLearn={fetchCardsToLearnFn}
      />
    </Flex>
  );
};
