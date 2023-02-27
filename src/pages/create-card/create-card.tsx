import { Button, Container, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deckByIdQuery } from "@/entities/deck";
import { CreateCard } from "@/features/create-card";
import { $isAuthorized } from "@/shared/auth/token";

export const CreateCardPage = () => {
  const { deckId } = useParams() as { deckId: string };
  const [isAuthorized] = useUnit([$isAuthorized]);
  const { start: getDeckById, data: deck } = useUnit(deckByIdQuery);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (deckId) {
      getDeckById(Number(deckId));
    }
  }, [deckId, getDeckById]);

  if (!isAuthorized) {
    return <Container>access denied</Container>;
  }

  if (!deck) {
    return <Container>Error. Failed to load deck with id {deckId}</Container>;
  }

  return (
    <Container>
      <Button onClick={goBack} mb="sm">
        Back
      </Button>

      <Title order={2} mb="md">
        Create card for {deck.deckname}
      </Title>

      <CreateCard deckId={deckId} />
    </Container>
  );
};
