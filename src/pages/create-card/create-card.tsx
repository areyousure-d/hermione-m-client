import { Container, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

import { CreateCard } from "@/features/card/create-card";
import { ButtonLink } from "@/shared/ui/button-link";
import { Icon } from "@/shared/ui/icon";

export const CreateCardPage = () => {
  const { deckId } = useParams() as { deckId: string };

  return (
    <Container>
      <ButtonLink
        to={`/decks/${deckId}`}
        mb="lg"
        leftIcon={
          <Icon type="common" name="arrow-left" width={20} height={20} />
        }
      >
        Back to deck
      </ButtonLink>

      <Title order={2} mb="lg">
        Create Card
      </Title>

      <CreateCard />
    </Container>
  );
};
