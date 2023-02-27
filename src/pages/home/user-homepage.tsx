import { Container, Flex, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";

import { DeckListContainer, deckListQuery } from "@/entities/deck";
import { CreateDeck } from "@/features/create-deck";

export const UserHomepage = () => {
  const {
    start: startFetch,
    data: deckList,
    pending: deckListQueryPending,
  } = useUnit(deckListQuery);

  useEffect(() => {
    startFetch();
  }, [startFetch]);

  return (
    <Container>
      <Flex justify="space-between" mb="lg">
        <Title order={2}>Decklist</Title>
        <CreateDeck />
      </Flex>

      <DeckListContainer
        deckList={deckList}
        deckListQueryPending={deckListQueryPending}
      />
    </Container>
  );
};
