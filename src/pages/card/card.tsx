import {
  Container,
  Group,
  Skeleton,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardQuery } from "@/entities/card";
import { ButtonLink } from "@/shared/ui/button-link";
import { Icon } from "@/shared/ui/icon";

import { CardInfo } from "./card-info";
import { CardSettingsMenu } from "./card-settings-menu";

export const CardPage = () => {
  const { deckId, cardId } = useParams() as { deckId: string; cardId: string };
  const { start: startCardQuery, data: card, pending } = useUnit(cardQuery);

  useEffect(() => {
    startCardQuery({ deckId, cardId });
  }, [startCardQuery, deckId, cardId]);

  return (
    <Container>
      <ButtonLink
        to={`/decks/${deckId}`}
        variant="light"
        leftIcon={
          <Icon type="common" name="arrow-left" width={20} height={20} />
        }
        mb="lg"
      >
        Back to deck
      </ButtonLink>
      <Group position="apart">
        <Title order={1} mb="md">
          Card
        </Title>

        <CardSettingsMenu deckId={deckId} cardId={cardId} />
      </Group>

      <CardInfo card={card} pending={pending} />

      <Title order={2} mb="md">
        Question
      </Title>
      {pending ? (
        <>
          <Skeleton height={14} />
          <Skeleton height={14} mt={12} />
          <Skeleton height={14} mt={12} width="70%" />
        </>
      ) : (
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          <Text pl="md" mb="lg">
            {card?.front}
          </Text>
        </Spoiler>
      )}

      <Title order={2} mb="md">
        Answer
      </Title>
      {pending ? (
        <>
          <Skeleton height={14} />
          <Skeleton height={14} mt={12} />
          <Skeleton height={14} mt={12} />
          <Skeleton height={14} mt={12} />
          <Skeleton height={14} mt={12} width="70%" />
        </>
      ) : (
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          <Text pl="md">{card?.back}</Text>
        </Spoiler>
      )}
    </Container>
  );
};
