import { Box, createStyles, Skeleton, Text, Title } from "@mantine/core";

import { Card } from "@/entities/card";
import { Deck } from "@/entities/deck";
import { formatDate } from "@/shared/lib/format-date";
import { formatDuration } from "@/shared/lib/format-interval";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100wh",
    display: "grid",
    gridTemplateColumns: "max-content fit-content(50%)",
    gridGap: `${theme.spacing.xs} ${theme.spacing.md}`,
    alignItems: "center",
    paddingLeft: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  text: {
    paddingTop: "2px",
  },
}));

type Props = {
  card: (Card & { deck: Deck }) | null;
  pending: boolean;
};

export const CardInfo = ({ card, pending }: Props) => {
  const { classes } = useStyles();

  if (card === null) {
    return null;
  }

  return (
    <Box className={classes.container}>
      <Title order={4}>deck</Title>
      {pending ? (
        <Skeleton height={14} width="80px" />
      ) : (
        <Text className={classes.text}>{card.deck.deckname}</Text>
      )}

      <Title order={4}>created at</Title>
      {pending ? (
        <Skeleton height={14} width="100px" />
      ) : (
        <Text className={classes.text}>{formatDate(card.createdAt)}</Text>
      )}

      <Title order={4}>updated at</Title>
      {pending ? (
        <Skeleton height={14} width="100px" />
      ) : (
        <Text className={classes.text}>{formatDate(card.updatedAt)}</Text>
      )}

      <Title order={4}>answered at</Title>
      {pending ? (
        <Skeleton height={14} width="100px" />
      ) : (
        <Text className={classes.text}>
          {card.answeredAt ? formatDate(card.answeredAt) : "\u2014"}
        </Text>
      )}

      <Title order={4}>interval</Title>
      {pending ? (
        <Skeleton height={14} width="50px" />
      ) : (
        <Text className={classes.text}>{formatDuration(card.interval)}</Text>
      )}

      <Title order={4}>phase</Title>
      {pending ? (
        <Skeleton height={14} width="60px" />
      ) : (
        <Text className={classes.text}>{card.phase}</Text>
      )}

      <Title order={4}>steps</Title>
      {pending ? (
        <Skeleton height={14} width="10px" />
      ) : (
        <Text className={classes.text}>{card.steps}</Text>
      )}
    </Box>
  );
};
