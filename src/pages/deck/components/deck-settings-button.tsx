import { Skeleton } from "@mantine/core";

import { Deck } from "@/entities/deck";

import { DeckSettings } from "./deck-settings";

type Props = {
  deck: Deck | null;
};

export const DeckSettingsButton = ({ deck }: Props) => {
  if (!deck) {
    return <Skeleton height={24} circle />;
  }

  return <DeckSettings deck={deck} />;
};
