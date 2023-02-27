import { Container, Flex, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardListQuery } from "@/entities/card";
import { $isAuthorized } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

import { CardList, DecknameTitle, DeckSettingsButton } from "./components";
import { deckByIdQuery } from "./model";

export const DeckPage = () => {
  const { deckId } = useParams() as { deckId: string };

  const [isAuthorized] = useUnit([$isAuthorized]);
  const {
    data: cardList,
    start: startFetchCardList,
    pending: cardListIsLoading,
  } = useUnit(cardListQuery);
  const {
    data: deck,
    start: startFetchDeckById,
    pending: deckByIdIsLoading,
  } = useUnit(deckByIdQuery);

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
      <Flex justify="space-between" mb="lg" wrap="wrap">
        <Flex align="center">
          <DecknameTitle deck={deck} deckByIdIsLoading={deckByIdIsLoading} />
          <DeckSettingsButton deck={deck} />
        </Flex>

        <ButtonLink to={`/deck/${deckId}/create-card`} ml="xs">
          Add Card
        </ButtonLink>
      </Flex>

      <CardList cardList={cardList} cardListIsLoading={cardListIsLoading} />
    </Container>
  );
};
