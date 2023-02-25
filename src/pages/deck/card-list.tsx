import { SimpleGrid, Text } from "@mantine/core";

import { Card, CardPreview } from "@/entities/card";
import { DeleteCard } from "@/features/delete-card";
import { UpdateCard } from "@/features/update-card";
import { CardSkeleton } from "@/shared/ui/card-skeleton";

type Props = {
  cardList: Card[] | null;
};

export const CardList = ({ cardList }: Props) => {
  if (cardList && cardList.length === 0) {
    return <Text>Card list is empty</Text>;
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
      {cardList ? (
        cardList.map((card) => (
          <CardPreview key={card.id} card={card}>
            <UpdateCard card={card} />
            <DeleteCard cardId={card.id} />
          </CardPreview>
        ))
      ) : (
        <CardSkeleton cardNumber={3} />
      )}
    </SimpleGrid>
  );
};
