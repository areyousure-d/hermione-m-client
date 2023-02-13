import { Flex, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { $cardList, startFetchCardList } from "@/entities/card/model";
import { CreateCard } from "@/features/create-card";
import { $isAuthorized } from "@/shared/auth/token";

export const DeckPage = () => {
  const { deckId } = useParams();

  const [startFetch, cardList, isAuthorized] = useUnit([
    startFetchCardList,
    $cardList,
    $isAuthorized,
  ]);

  useEffect(() => {
    if (deckId && isAuthorized) {
      startFetch(deckId);
    }
  }, [deckId, startFetch, isAuthorized]);

  if (!isAuthorized) {
    return <Text>access denied</Text>;
  }

  return (
    <div>
      <Flex justify="space-between" mb="lg">
        <Title order={2}>Deck page</Title>
        <CreateCard />
      </Flex>
      <div>
        {cardList.length === 0 ? (
          <Text>no card</Text>
        ) : (
          <ul>
            {cardList.map((card) => (
              <li key={card.id}>{card.front}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
