import { Box, Text } from "@mantine/core";

import { Deck } from "@/entities/deck";
import { formatDate } from "@/shared/lib/format-date";

type Props = {
  deck: Deck;
};

export const DeckInfo = ({ deck }: Props) => {
  return (
    <Box mb="lg">
      <Text>Created at: {formatDate(deck.createdAt)}</Text>
      <Text>Updated at: {formatDate(deck.updatedAt)}</Text>
    </Box>
  );
};
