import { Container, Group, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { deckByIdQuery } from "@/entities/deck";
import { DeleteDeck } from "@/features/deck/delete-deck";
import { UpdateDeck } from "@/features/deck/update-deck";
import { Alert } from "@/shared/ui/alert";
import { ButtonLink } from "@/shared/ui/button-link";

import { CardList } from "./card-list";
import { DeckInfo } from "./deck-info";

export const DeckPage = () => {
  const { deckId } = useParams() as { deckId: string };

  const [deckByIdQueryFailed] = useUnit([deckByIdQuery.$failed]);
  const { start: fetchDeckById, data: deck, pending } = useUnit(deckByIdQuery);

  useEffect(() => {
    fetchDeckById(deckId);
  }, [fetchDeckById, deckId]);

  if (pending) {
    return <div>loading</div>;
  }

  if (deckByIdQueryFailed || !deck) {
    return (
      <Container>
        <Alert variant="error" title="Error">
          Error when fetching deck with id {deckId}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Group position="apart" mb="lg">
        <Title order={1}>{deck.deckname}</Title>

        <Group>
          <ButtonLink to={`/learn/${deck.id}`}>Learn</ButtonLink>
          <ButtonLink to={`/decks/${deckId}/create-card`}>Add Card</ButtonLink>
          <DeleteDeck />
          <UpdateDeck deckname={deck.deckname} />
        </Group>
      </Group>

      <DeckInfo deck={deck} />

      <CardList />
    </Container>
  );
};
