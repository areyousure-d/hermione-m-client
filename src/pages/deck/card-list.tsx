import { SimpleGrid, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardListQuery } from "@/entities/card";
import { CardPreview } from "@/entities/card/ui";
import { Alert } from "@/shared/ui/alert";
import { ButtonLink } from "@/shared/ui/button-link";
import { CardSkeleton } from "@/shared/ui/card-skeleton";

export const CardList = () => {
  const { deckId } = useParams() as { deckId: string };

  const [cardListQueryFailed] = useUnit([cardListQuery.$failed]);
  const {
    start: startFetchCardList,
    data: cardList,
    pending,
  } = useUnit(cardListQuery);

  useEffect(() => {
    startFetchCardList(deckId);
  }, [startFetchCardList, deckId]);

  if (cardListQueryFailed) {
    return (
      <Alert variant="error" title="Error">
        error fetching cards
      </Alert>
    );
  }

  const cardListIsEmpty = !cardList || cardList.length === 0;

  if (cardListIsEmpty) {
    return <Text>deck is empty</Text>;
  }

  return (
    <SimpleGrid
      cols={3}
      spacing="md"
      verticalSpacing="lg"
      breakpoints={[
        { maxWidth: "sm", cols: 2, spacing: "sm" },
        { maxWidth: "xs", cols: 1, spacing: "xs" },
      ]}
    >
      {pending ? (
        <CardSkeleton cardsNumber={3} />
      ) : (
        cardList.map((card) => {
          return (
            <CardPreview key={card.id} card={card}>
              <ButtonLink
                to={`/decks/${deckId}/cards/${card.id}`}
                variant="light"
              >
                Open
              </ButtonLink>
            </CardPreview>
          );
        })
      )}
    </SimpleGrid>
  );
};
