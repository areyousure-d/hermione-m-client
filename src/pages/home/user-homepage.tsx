import { Container, Group, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";

import { DeckCard, DeckList, deckListQuery } from "@/entities/deck";
import { CreateDeck } from "@/features/deck/create-deck";
import { Alert } from "@/shared/ui/alert";
import { CardSkeleton } from "@/shared/ui/card-skeleton";

export const UserHomepage = () => {
  const [deckListQueryFailed] = useUnit([deckListQuery.$failed]);
  const {
    start: fetchDeckList,
    data: deckList,
    pending,
  } = useUnit(deckListQuery);

  useEffect(() => {
    fetchDeckList();
  }, [fetchDeckList]);

  if (deckListQueryFailed) {
    return (
      <Container>
        <Alert variant="error" title="Error">
          Error fetching decks, try again later
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Group position="apart" mb="lg">
        <Title order={2} fw="500">
          Decks
        </Title>
        <CreateDeck />
      </Group>

      <DeckList>
        {pending ? (
          <CardSkeleton cardsNumber={3} />
        ) : (
          deckList?.map((deck) => <DeckCard key={deck.id} deck={deck} />)
        )}
      </DeckList>
    </Container>
  );
};
