import { Container, Flex, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardListQuery } from "@/entities/card";
import { deckByIdQuery } from "@/entities/deck";
import { DeleteCard } from "@/features/delete-card";
import { UpdateCard } from "@/features/update-card";
import { $isAuthorized } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

import { DeckSettings } from "./deck-settings";

export const DeckPage = () => {
  const { deckId } = useParams() as { deckId: string };

  const [isAuthorized] = useUnit([$isAuthorized]);
  const { data: cardList, start: startFetchCardList } = useUnit(cardListQuery);
  const {
    data: deck,
    start: startFetchDeckById,
    pending: deckByIdPending,
  } = useUnit(deckByIdQuery);

  useEffect(() => {
    if (deckId && isAuthorized) {
      startFetchCardList(deckId);
      startFetchDeckById(Number(deckId));
    }
  }, [deckId, startFetchCardList, isAuthorized, startFetchDeckById]);

  if (!isAuthorized) {
    return <Text>access denied</Text>;
  }

  if (deckByIdPending) {
    return <Text>loading</Text>;
  }

  if (!deck) {
    return <Text>there is no such deck</Text>;
  }

  return (
    <Container>
      <Flex justify="space-between" mb="lg">
        <Flex align="center">
          <Title order={2}>{deck.deckname}</Title>
          <DeckSettings deck={deck} />
        </Flex>
        <ButtonLink to={`/deck/${deckId}/create-card`}>Add Card</ButtonLink>
      </Flex>

      <div>
        {!cardList || cardList.length === 0 ? (
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
    </Container>
  );
};
