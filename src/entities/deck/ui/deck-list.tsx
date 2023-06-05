import { SimpleGrid } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const DeckList = ({ children }: Props) => {
  return (
    <SimpleGrid
      cols={3}
      spacing="md"
      verticalSpacing="lg"
      breakpoints={[
        { maxWidth: "sm", cols: 2, spacing: "sm" },
        { maxWidth: "xs", cols: 1, spacing: "xs" },
      ]}
    >
      {children}
    </SimpleGrid>
  );
};
