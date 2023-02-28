import { Flex, Skeleton } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchCardsToLearnQuery } from "@/entities/card";
import { Alert } from "@/shared/ui/alert";

import { Buttons } from "./buttons";
import { CardView } from "./card-view";
import { $cardToLearn, learnCardsFetchedStarted } from "./model";

export const LearnCard = () => {
  const [answerVisible, setAnswerVisible] = useState(false);

  const { deckId } = useParams();

  const { start: startFetchCardsToLearn, pending: fetchCardsToLearnPending } =
    useUnit(fetchCardsToLearnQuery);
  const [cardToLearn, learnCardsFetchStartedFn] = useUnit([
    $cardToLearn,
    learnCardsFetchedStarted,
  ]);

  const flipCard = (isCardVisible: boolean) => setAnswerVisible(isCardVisible);

  useEffect(() => {
    if (deckId) {
      startFetchCardsToLearn(deckId);
    }
  }, [startFetchCardsToLearn, deckId]);

  if (!cardToLearn && !fetchCardsToLearnPending) {
    return (
      <Alert variant="info" title="No card">
        No card to learn
      </Alert>
    );
  }

  return (
    <Flex direction="column" justify="space-between" h="100%">
      {fetchCardsToLearnPending ? (
        <Skeleton height={300} />
      ) : (
        <CardView showAnswer={answerVisible} card={cardToLearn} />
      )}

      <Buttons
        answerIsVisible={answerVisible}
        flipCard={flipCard}
        learnCardsFetchStart={learnCardsFetchStartedFn}
        cardToLearn={cardToLearn}
      />
    </Flex>
  );
};
