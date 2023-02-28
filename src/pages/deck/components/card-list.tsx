import { SimpleGrid } from "@mantine/core";

import { Card, CardPreview } from "@/entities/card";
import { DeleteCard } from "@/features/delete-card";
import { UpdateCard } from "@/features/update-card";
import { Alert } from "@/shared/ui/alert";
import { CardSkeleton } from "@/shared/ui/card-skeleton";

type Props = {
  cardList: Card[] | null;
  cardListIsLoading: boolean;
};

export const CardList = ({ cardList, cardListIsLoading }: Props) => {
  if (cardList && cardList.length === 0) {
    return (
      <Alert variant="info" title="Empty">
        Card list is empty
      </Alert>
    );
  }

  const shouldShowCard = cardList && !cardListIsLoading;

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
      {shouldShowCard ? (
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
