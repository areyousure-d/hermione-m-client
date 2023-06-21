import { Container, Group, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { deckByIdQuery } from "@/entities/deck";
import { Alert } from "@/shared/ui/alert";
import { ButtonLink } from "@/shared/ui/button-link";
import { Icon } from "@/shared/ui/icon";
import { PageLoader } from "@/shared/ui/page-loader";

import { CardList } from "./card-list";
import { DeckInfo } from "./deck-info";
import { DeckSettingsMenu } from "./deck-settings-menu";

export const DeckPage = () => {
  const { deckId } = useParams() as { deckId: string };

  const [deckByIdQueryFailed] = useUnit([deckByIdQuery.$failed]);
  const { start: fetchDeckById, data: deck, pending } = useUnit(deckByIdQuery);

  useEffect(() => {
    fetchDeckById(deckId);
  }, [fetchDeckById, deckId]);

  if (pending) {
    return <PageLoader />;
  }

  if (deckByIdQueryFailed || !deck) {
    return (
      <Container>
        <ButtonLink
          to="/"
          variant="light"
          leftIcon={
            <Icon type="common" name="arrow-left" width={20} height={20} />
          }
        >
          Back to home
        </ButtonLink>

        <Alert variant="error" title="Error">
          Error fetching deck with id {deckId}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <ButtonLink
        to="/"
        variant="light"
        mb="lg"
        leftIcon={
          <Icon type="common" name="arrow-left" width={20} height={20} />
        }
      >
        Back to home
      </ButtonLink>

      <Group position="apart" mb="lg">
        <Title order={1}>{deck.deckname}</Title>

        <Group>
          <ButtonLink to={`/learn/${deck.id}`} variant="light">
            Learn
          </ButtonLink>
          <ButtonLink to={`/decks/${deckId}/create-card`} variant="light">
            Add Card
          </ButtonLink>
          <DeckSettingsMenu deckname={deck.deckname} />
        </Group>
      </Group>

      <DeckInfo deck={deck} />

      <Title order={2} mb="lg">
        cards
      </Title>

      <CardList />
    </Container>
  );
};
