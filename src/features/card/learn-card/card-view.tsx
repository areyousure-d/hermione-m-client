import { Box, Divider, Text } from "@mantine/core";

import { Card } from "@/entity/card";

type Props = {
  answerIsVisible: boolean;
  card: Card | null;
};

export const CardView = ({ answerIsVisible, card }: Props) => {
  if (!card) {
    return null;
  }

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
      <Box p="sm">
        <Text align="center">{card.front}</Text>
      </Box>

      <Divider size="lg" />

      {answerIsVisible && (
        <Box p="sm">
          <Text align="center">{card.back}</Text>
        </Box>
      )}
    </Box>
  );
};
