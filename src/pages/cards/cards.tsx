import { Button, Container, SimpleGrid, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardListQuery } from "@/entity/card";
import { CardPreview } from "@/entity/card/ui";
import { DeleteCard } from "@/features/card/delete-card";

export const Cards = () => {
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

  return (
    <Container>
      <Title order={1} mb="lg">
        Cards
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
        {cardList?.map((card) => {
          return (
            <CardPreview key={card.id} card={card}>
              <DeleteCard cardId={card.id} />
              <Button size="xs">Update</Button>
            </CardPreview>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};
