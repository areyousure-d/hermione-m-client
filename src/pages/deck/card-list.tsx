import { SimpleGrid } from "@mantine/core";

import { Card, CardPreview } from "@/entities/card";
import { DeleteCard } from "@/features/delete-card";
import { UpdateCard } from "@/features/update-card";

type Props = {
  cardList: Card[];
  deckId: string;
};

export const CardList = ({ cardList, deckId }: Props) => {
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
          <DeleteCard deckId={deckId} cardId={card.id} />
        </CardPreview>
      ))}
    </SimpleGrid>
  );
};
