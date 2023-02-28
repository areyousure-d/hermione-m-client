import { Container, Flex } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardListQuery } from "@/entities/card";
import { $isAuthorized } from "@/shared/auth/token";
import { Alert } from "@/shared/ui/alert";
import { ButtonLink } from "@/shared/ui/button-link";

import { CardList, DecknameTitle, DeckSettingsButton } from "./components";
import { deckByIdQuery } from "./model";

export const DeckPage = () => {
  const { deckId } = useParams() as { deckId: string };

  const [isAuthorized, deckByIdQueryFailed] = useUnit([
    $isAuthorized,
    deckByIdQuery.$failed,
  ]);
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

  if (deckByIdQueryFailed) {
    return (
      <Container>
        <Alert variant="error" title="Error">
          Error when fetching a deck with id {deckId}
        </Alert>
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
