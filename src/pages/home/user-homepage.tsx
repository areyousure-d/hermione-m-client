import { Container, Group } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";

import { DeckCard, DeckList, deckListQuery } from "@/entity/deck";
import { CreateDeck } from "@/features/deck/create-deck";

export const UserHomepage = () => {
  const {
    start: fetchDeckList,
    data: deckList,
    pending,
  } = useUnit(deckListQuery);

  useEffect(() => {
    fetchDeckList();
  }, [fetchDeckList]);

  if (pending) {
    return <div>loading</div>;
  }

  return (
    <Container>
      <Group position="right">
        <CreateDeck />
      </Group>

      <DeckList>
        {deckList?.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </DeckList>
    </Container>
  );
};
