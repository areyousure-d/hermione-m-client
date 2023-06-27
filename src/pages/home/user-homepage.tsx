import { Container, Group, Title } from "@mantine/core";

import { CreateDeck } from "@/features/deck/create-deck";

import { DeckList } from "./deck-list";

export const UserHomepage = () => {
  return (
    <Container>
      <Group position="apart" mb="lg">
        <Title order={2} fw="500">
          Decks
        </Title>
        <CreateDeck />
      </Group>

      <DeckList />
    </Container>
  );
};
