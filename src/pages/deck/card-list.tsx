import { Box, SimpleGrid, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardListQuery } from "@/entities/card";
import { CardPreview } from "@/entities/card/ui";
import { DeleteCard } from "@/features/card/delete-card";
import { ButtonLink } from "@/shared/ui/button-link";

export const CardList = () => {
  const { deckId } = useParams() as { deckId: string };

  const {
    start: startFetchCardList,
    data: cardList,
    pending,
  } = useUnit(cardListQuery);

  useEffect(() => {
    startFetchCardList(deckId);
  }, [startFetchCardList, deckId]);

  if (pending) {
    return <div>loading</div>;
  }

  const cardListIsEmpty = !cardList || cardList.length === 0;

  return (
    <Box>
      <Title order={2} mb="lg">
        cards
      </Title>

      <SimpleGrid
        cols={3}
        spacing="md"
        verticalSpacing="lg"
        breakpoints={[
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "xs" },
        ]}
      >
        {cardListIsEmpty ? (
          <Text>deck is empty</Text>
        ) : (
          cardList.map((card) => {
            return (
              <CardPreview key={card.id} card={card}>
                <DeleteCard cardId={card.id} />
                <ButtonLink
                  to={`/decks/${deckId}/update-card/${card.id}`}
                  size="xs"
                >
                  Update
                </ButtonLink>
              </CardPreview>
            );
          })
        )}
      </SimpleGrid>
    </Box>
  );
};
