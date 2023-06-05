import { Box, Button, Group } from "@mantine/core";
import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";

import { Card, learnCardMutation, Rating } from "@/entities/card";

type Props = {
  setIsAnswerVisible: (isCardVisible: boolean) => void;
  answerIsVisible: boolean;
  cardToLearn: Card | null;
  fetchCardsToLearn: (deckId: string) => void;
};

export const Buttons = ({
  setIsAnswerVisible,
  answerIsVisible,
  cardToLearn,
  fetchCardsToLearn,
}: Props) => {
  const { deckId } = useParams() as { deckId: string };
  const { start: learnCard } = useUnit(learnCardMutation);

  const createOnClickFn = (rating: Rating) => () => {
    if (cardToLearn) {
      learnCard({ cardId: cardToLearn.id, deckId: Number(deckId), rating });
      setIsAnswerVisible(false);
      fetchCardsToLearn(deckId);
    }
  };

  const showAnswer = () => setIsAnswerVisible(true);

  return (
    <Box>
      <Group position="center">
        {answerIsVisible ? (
          <>
            <Button onClick={createOnClickFn("again")} color="red">
              Again
            </Button>
            <Button onClick={createOnClickFn("hard")} color="yellow">
              Hard
            </Button>
            <Button onClick={createOnClickFn("good")}>Good</Button>
            <Button onClick={createOnClickFn("easy")} color="green">
              Easy
            </Button>
          </>
        ) : (
          <Button onClick={showAnswer}>Show answer</Button>
        )}
      </Group>
    </Box>
  );
};
