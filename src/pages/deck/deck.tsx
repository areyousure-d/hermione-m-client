import { Container, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { deckByIdQuery } from "@/entity/deck";
import { Alert } from "@/shared/ui/alert";

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

  if (deckByIdQueryFailed) {
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
      <Title order={2}>{deck?.deckname}</Title>
    </Container>
  );
};
