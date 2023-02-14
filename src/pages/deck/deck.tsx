import { Flex, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { $cardList, startFetchCardList } from "@/entities/card/model";
import { $deckList } from "@/entities/deck";
import { CreateCard } from "@/features/create-card";
import { DeleteCard } from "@/features/delete-card";
import { DeleteDeck } from "@/features/delete-deck";
import { UpdateCard } from "@/features/update-card";
import { UpdateDeck } from "@/features/update-deck";
import { $isAuthorized } from "@/shared/auth/token";

export const DeckPage = () => {
  const { deckId } = useParams() as { deckId: string };

  const [startFetch, cardList, isAuthorized, deckList] = useUnit([
    startFetchCardList,
    $cardList,
    $isAuthorized,
    $deckList,
  ]);

  useEffect(() => {
    if (deckId && isAuthorized) {
      startFetch(deckId);
    }
  }, [deckId, startFetch, isAuthorized]);

  if (!isAuthorized) {
    return <Text>access denied</Text>;
  }

  const deck = deckList.find((d) => d.id === Number(deckId));

  if (!deck) {
    return <Text>there is no such deck</Text>;
  }

  return (
    <div>
      <Flex justify="space-between" mb="lg">
        <Title order={2}>{deck.deckname}</Title>
        <CreateCard />
      </Flex>

      <div>
        <DeleteDeck deckId={deckId} />
        <UpdateDeck deck={deck} />
      </div>

      <div>
        {cardList.length === 0 ? (
          <Text>no card</Text>
        ) : (
          <ul>
            {cardList.map((card) => (
              <li key={card.id}>
                <div>{card.front}</div>
                <UpdateCard card={card} />
                <DeleteCard deckId={deckId} cardId={card.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
