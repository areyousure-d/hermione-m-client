import { Card, createStyles, Group, Text, Title } from "@mantine/core";

import { ButtonLink } from "@/shared/ui/button-link";

import { Deck } from "../model";

type Props = {
  deck: Deck;
};

const useStyles = createStyles((_theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "200px",
  },
}));

export const DeckCard = ({ deck }: Props) => {
  const { classes } = useStyles();

  const learnButtonDisabled = deck.numberOfCardsToLearn === 0;

  return (
    <Card p="sm" shadow="md" className={classes.card} radius="md" withBorder>
      <Card.Section p="xs" color="gray" withBorder>
        <Title order={3} align="center" truncate weight={500}>
          {deck.deckname}
        </Title>
      </Card.Section>

      <Text align="center">Cards to learn: {deck.numberOfCardsToLearn}</Text>

      <Group position="center">
        <ButtonLink to={`/deck/${deck.id}`} variant="outline" size="xs">
          Open
        </ButtonLink>

        <ButtonLink
          to={`/learn/${deck.id}`}
          color="green"
          size="xs"
          disabled={learnButtonDisabled}
        >
          Learn
        </ButtonLink>
      </Group>
    </Card>
  );
};
