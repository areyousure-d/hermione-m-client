import { Flex } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const DeckListContainer = ({ children }: Props) => {
  return (
    <Flex gap="md" wrap="wrap">
      {children}
    </Flex>
  );
};
