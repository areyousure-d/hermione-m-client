import { Container, Flex, Skeleton, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardListQuery } from "@/entities/card";
import { deckByIdQuery } from "@/entities/deck";
import { $isAuthorized } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

import { CardList } from "./card-list";
import { DeckSettings } from "./deck-settings";

export const DeckPage = () => {
  const { deckId } = useParams() as { deckId: string };

  const [isAuthorized] = useUnit([$isAuthorized]);
  const { data: cardList, start: startFetchCardList } = useUnit(cardListQuery);
  const { data: deck, start: startFetchDeckById } = useUnit(deckByIdQuery);

  useEffect(() => {
    if (deckId && isAuthorized) {
      startFetchCardList(deckId);
      startFetchDeckById(Number(deckId));
    }
  }, [deckId, startFetchCardList, isAuthorized, startFetchDeckById]);

  if (!isAuthorized) {
    return (
      <Container>
        <Text>access denied</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Flex justify="space-between" mb="lg">
        <Flex align="center">
          {deck ? (
            <Title order={2} mr="lg">
              {deck.deckname}
            </Title>
          ) : (
            <Skeleton height={26} width="150px" mr="lg" />
          )}
          {deck ? (
            <DeckSettings deck={deck} />
          ) : (
            <Skeleton height={24} circle />
          )}
        </Flex>
        <ButtonLink to={`/deck/${deckId}/create-card`}>Add Card</ButtonLink>
      </Flex>

      <CardList cardList={cardList} />
    </Container>
  );
};
