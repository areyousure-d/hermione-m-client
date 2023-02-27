import { Box, Button, Group } from "@mantine/core";
import { useUnit } from "effector-react";

import { Card, learnCardMutation } from "@/entities/card";

type Props = {
  flipCard: (isCardVisible: boolean) => void;
  answerIsVisible: boolean;
  learnCardsFetchStart: (payload: string) => string;
  cardToLearn: Card | null;
};

export const Buttons = ({
  flipCard,
  answerIsVisible,
  cardToLearn,
  learnCardsFetchStart,
}: Props) => {
  const { start: learnCard } = useUnit(learnCardMutation);

  const createOnClickFn = (rating: string) => () => {
    if (cardToLearn) {
      learnCard({ cardId: cardToLearn.id, rating });
      learnCardsFetchStart(cardToLearn.deck_id.toString());
      flipCard(false);
    }
  };
  return (
    <Box>
      {answerIsVisible ? (
        <Group position="center">
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
        </Group>
      ) : (
        <Group position="center">
          <Button onClick={() => flipCard(true)}>Show answer</Button>
        </Group>
      )}
    </Box>
  );
};
