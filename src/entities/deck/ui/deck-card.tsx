import { Card, createStyles, Group, Title } from "@mantine/core";

import { ButtonLink } from "@/shared/ui/button-link";

import { Deck } from "../deck.schema";

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

  return (
    <Card p="sm" shadow="md" className={classes.card} radius="md" withBorder>
      <Card.Section p="xs" color="gray" withBorder>
        <Title order={3} align="center" truncate weight={500}>
          {deck.deckname}
        </Title>
      </Card.Section>

      <Group position="right">
        <ButtonLink to={`/learn/${deck.id}`} variant="outline">
          Learn
        </ButtonLink>
        <ButtonLink to={`/decks/${deck.id}`} variant="outline">
          Open
        </ButtonLink>
      </Group>
    </Card>
  );
};
