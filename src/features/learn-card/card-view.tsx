import { Box, Divider, Text } from "@mantine/core";

import { Card } from "@/entities/card";

type Props = {
  showAnswer: boolean;
  card: Card;
};

export const CardView = ({ showAnswer, card }: Props) => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: "300px",
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
        padding: `${theme.spacing.md} 0`,
        marginBottom: theme.spacing.md,
        overflowY: "auto",
      })}
    >
      <Divider size="lg" />
      <Box p="sm">
        <Text align="center">question {card.front}</Text>
      </Box>

      <Divider size="lg" />

      {showAnswer ? (
        <Box p="sm">
          <Text align="center">answer {card.back}</Text>
        </Box>
      ) : null}
    </Box>
  );
};
