import { Container, Skeleton, Spoiler, Text, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cardQuery } from "@/entities/card";

import { CardInfo } from "./card-info";

export const CardPage = () => {
  const { deckId, cardId } = useParams() as { deckId: string; cardId: string };
  const { start: startCardQuery, data: card, pending } = useUnit(cardQuery);

  useEffect(() => {
    startCardQuery({ deckId, cardId });
  }, [startCardQuery, deckId, cardId]);

  return (
    <Container>
      <Title order={1} mb="md">
        Card
      </Title>

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
