import { Container, Flex, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardListQuery } from "@/entities/card";
import { deckByIdQuery } from "@/entities/deck";
import { DeleteCard } from "@/features/delete-card";
import { DeleteDeck } from "@/features/delete-deck";
import { UpdateCard } from "@/features/update-card";
import { UpdateDeck } from "@/features/update-deck";
import { $isAuthorized } from "@/shared/auth/token";
import { ButtonLink } from "@/shared/ui/button-link";

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

  if (!deck) {
    return <Text>there is no such deck</Text>;
  }

  if (deckByIdPending) {
    return <Text>loading</Text>;
  }

  return (
    <Container>
      <Flex justify="space-between" mb="lg">
        <Title order={2}>{deck.deckname}</Title>
        <ButtonLink to={`/deck/${deckId}/create-card`}>Create Card</ButtonLink>
      </Flex>

      <div>
        <DeleteDeck deckId={deckId} />
        <UpdateDeck deck={deck} />
      </div>

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
