import { SimpleGrid, Text } from "@mantine/core";

import { CardSkeleton } from "@/shared/ui/card-skeleton";

import { DeckWithCardsInfo } from "../model";
import { DeckCard } from "./deck-card";

type Props = {
  deckList: DeckWithCardsInfo[] | null;
  deckListQueryPending: boolean;
};

export const DeckListContainer = ({
  deckList,
  deckListQueryPending,
}: Props) => {
  if (deckList && deckList.length === 0) {
    return <Text>Decklist is empty</Text>;
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
      {!deckListQueryPending ? (
        deckList ? (
          deckList.map((deck) => <DeckCard key={deck.id} deck={deck} />)
        ) : (
          <Text>Decklist is empty</Text>
        )
      ) : (
        <CardSkeleton cardNumber={3} />
      )}
    </SimpleGrid>
  );
};
