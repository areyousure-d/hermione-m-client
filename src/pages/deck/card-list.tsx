import { SimpleGrid } from "@mantine/core";

import { Card, CardPreview } from "@/entities/card";
import { DeleteCard } from "@/features/delete-card";
import { UpdateCard } from "@/features/update-card";

type Props = {
  cardList: Card[];
};

export const CardList = ({ cardList }: Props) => {
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
      {cardList.map((card) => (
        <CardPreview key={card.id} card={card}>
          <UpdateCard card={card} />
          <DeleteCard cardId={card.id} />
        </CardPreview>
      ))}
    </SimpleGrid>
  );
};
