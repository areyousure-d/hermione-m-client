import { Flex, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { $cardList } from "@/entities/card/model";
import { CreateCard } from "@/features/create-card";
import { DeleteCard } from "@/features/delete-card";
import { DeleteDeck } from "@/features/delete-deck";
import { UpdateCard } from "@/features/update-card";
import { UpdateDeck } from "@/features/update-deck";
import { $isAuthorized } from "@/shared/auth/token";

import { $deck, fetchDeckFx, startFetchDeck } from "./model";

export const DeckPage = () => {
  const { deckId } = useParams() as { deckId: string };

  const [cardList, isAuthorized, deck, startFetchDeckFn, fetchDeckLoading] =
    useUnit([
      $cardList,
      $isAuthorized,
      $deck,
      startFetchDeck,
      fetchDeckFx.pending,
    ]);

  useEffect(() => {
    if (deckId && isAuthorized) {
      startFetchDeckFn(Number(deckId));
    }
  }, [deckId, isAuthorized, startFetchDeckFn]);

  if (!isAuthorized) {
    return <Text>access denied</Text>;
  }

  if (!deck) {
    return <Text>there is no such deck</Text>;
  }

  if (fetchDeckLoading) {
    return <Text>loading</Text>;
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
