import { Card, createStyles, Group, Text } from "@mantine/core";
import { ReactNode } from "react";

import { Card as CardType } from "../model";

const useStyles = createStyles((_theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "200px",
  },
}));

type Props = {
  card: CardType;
  children: ReactNode;
};

export const CardPreview = ({ card, children }: Props) => {
  const { classes } = useStyles();

  return (
    <Card shadow="md" className={classes.card}>
      <Text lineClamp={4}>{card.front}</Text>

      <Group position="right">{children}</Group>
    </Card>
  );
};
