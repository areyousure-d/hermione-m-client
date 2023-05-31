import { Container } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";

import { DeckCard, DeckList, deckListQuery } from "@/entity/deck";

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
      <DeckList>
        {deckList?.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </DeckList>
    </Container>
  );
};
