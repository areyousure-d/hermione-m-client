import { Box, createStyles, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { Deck } from "../model";

type Props = {
  deck: Deck;
};

const useStyles = createStyles((theme) => ({
  card: {
    height: "200px",
    width: "300px",
    border: "1px solid transparent",
    borderRadius: "10px",
    backgroundColor: theme.colors.blue[1],
  },
}));

export const DeckCard = ({ deck }: Props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.card} p="md">
      <Text>{deck.deckname}</Text>
      <Link to={`/deck/${deck.id}`}>inspect</Link>
    </Box>
  );
};
