import { Box, Button, Group, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  $cardToLearn,
  fetchCardsToLearnQuery,
  learnCardMutation,
  learnCardMutationFetched,
} from "./model";

export const LearnCard = () => {
  const [showBack, setShowBack] = useState(false);

  const { deckId } = useParams();

  const { start: startFetchCardsToLearn } = useUnit(fetchCardsToLearnQuery);
  const { start: learnCard } = useUnit(learnCardMutation);
  const [cardToLearn, learnCardMutationFetchedFn] = useUnit([
    $cardToLearn,
    learnCardMutationFetched,
  ]);

  const createOnClickFn = (rating: string) => () => {
    if (cardToLearn) {
      learnCard({ cardId: cardToLearn.id, rating });
      learnCardMutationFetchedFn(cardToLearn.deck_id.toString());
      setShowBack(false);
    }
  };

  const flipCard = () => {
    setShowBack(true);
  };

  useEffect(() => {
    if (deckId) {
      startFetchCardsToLearn(deckId);
    }
  }, [startFetchCardsToLearn, deckId]);

  if (!cardToLearn) {
    return <div>no card to learn</div>;
  }

  if (showBack) {
    return (
      <div>
        <Box>
          <Text>question {cardToLearn.back}</Text>
        </Box>

        <Group>
          <Button onClick={createOnClickFn("again")}>Again</Button>
          <Button onClick={createOnClickFn("hard")}>Hard</Button>
          <Button onClick={createOnClickFn("good")}>Good</Button>
          <Button onClick={createOnClickFn("easy")}>Easy</Button>
        </Group>
      </div>
    );
  }

  return (
    <div>
      <Box>answer {cardToLearn.front}</Box>
      <Button onClick={flipCard}>Show answer</Button>
    </div>
  );
};
