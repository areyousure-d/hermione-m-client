import { Skeleton, Title } from "@mantine/core";

import { Deck } from "@/entities/deck";

type Props = {
  deck: Deck | null;
  deckByIdIsLoading: boolean;
};

export const DecknameTitle = ({ deck, deckByIdIsLoading }: Props) => {
  if (deckByIdIsLoading || !deck) {
    return <Skeleton height={26} width="150px" mr="xs" />;
  }

  return (
    <Title order={2} mr="xs" maw={230} truncate>
      {deck.deckname}
    </Title>
  );
};
