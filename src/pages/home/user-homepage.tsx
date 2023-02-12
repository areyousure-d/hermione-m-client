import { Box, Center, Flex, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";

import {
  $deckList,
  DeckCard,
  DeckListContainer,
  startFetchDeckList,
} from "@/entities/deck";
import { CreateDeck } from "@/features/create-deck";

export const UserHomepage = () => {
  const [startFetch, deckList] = useUnit([startFetchDeckList, $deckList]);

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
          {deckList.length === 0 ? (
            <Text>Decklist is empty</Text>
          ) : (
            deckList.map((deck) => <DeckCard key={deck.id} deck={deck} />)
          )}
        </DeckListContainer>
      </Box>
    </Center>
  );
};
