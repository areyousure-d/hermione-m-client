import {
  Badge,
  Card,
  createStyles,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { ButtonLink } from "@/shared/ui/button-link";

import { DeckWithCardsInfo } from "../deck.schema";

type Props = {
  deck: DeckWithCardsInfo;
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

      <Group position="center">
        <Stack spacing="xs">
          <Badge color="blue">new</Badge>
          <Text align="center">{deck.cardsInfo.newCards}</Text>
        </Stack>
        <Stack spacing="xs">
          <Badge color="red">learn</Badge>
          <Text align="center">{deck.cardsInfo.learnPhase}</Text>
        </Stack>
        <Stack spacing="xs">
          <Badge color="teal">review</Badge>
          <Text align="center">{deck.cardsInfo.reviewPhase}</Text>
        </Stack>
      </Group>

      <Group position="center">
        <ButtonLink to={`/decks/${deck.id}`} variant="light">
          Open
        </ButtonLink>
        <ButtonLink to={`/learn/${deck.id}`} variant="light">
          Learn
        </ButtonLink>
      </Group>
    </Card>
  );
};
