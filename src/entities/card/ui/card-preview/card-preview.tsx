import { Card as MantineCard, createStyles, Group, Text } from "@mantine/core";
import { ReactNode } from "react";

import { Card } from "../../card.schema";

const useStyles = createStyles((_theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "200px",
  },
}));

type Props = {
  card: Card;
  children: ReactNode;
};

export const CardPreview = ({ card, children }: Props) => {
  const { classes } = useStyles();

  return (
    <MantineCard shadow="md" className={classes.card}>
      <Text lineClamp={4}>{card.front}</Text>

      <Group position="center">{children}</Group>
    </MantineCard>
  );
};
