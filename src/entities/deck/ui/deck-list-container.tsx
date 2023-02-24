import { SimpleGrid, Text } from "@mantine/core";

import { Deck } from "../model";
import { DeckCard } from "./deck-card";

type Props = {
  deckList: Deck[] | null;
};

export const DeckListContainer = ({ deckList }: Props) => {
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
      {!deckList ? (
        <Text>Decklist is empty</Text>
      ) : (
        deckList.map((deck) => <DeckCard key={deck.id} deck={deck} />)
      )}
    </SimpleGrid>
  );
};
