import { Box, Center, Flex, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";

import { DeckCard, DeckListContainer, deckListQuery } from "@/entities/deck";
import { CreateDeck } from "@/features/create-deck";

export const UserHomepage = () => {
  const { start: startFetch, data: deckList } = useUnit(deckListQuery);

  useEffect(() => {
    startFetch();
  }, [startFetch]);

  return (
    <Center w="80%" m="0 auto">
      <Box>
        <Flex justify="space-between" mb="lg">
          <Title order={2}>Decklist</Title>
          <CreateDeck />
        </Flex>

        <DeckListContainer>
          {!deckList ? (
            <Text>Decklist is empty</Text>
          ) : (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            deckList.map((deck) => <DeckCard key={deck.id} deck={deck} />)
          )}
        </DeckListContainer>
      </Box>
    </Center>
  );
};
