import { useUnit } from "effector-react";
import { useEffect } from "react";

import { DeckCard, DeckListContainer, deckListQuery } from "@/entities/deck";
import { Alert } from "@/shared/ui/alert";
import { CardSkeleton } from "@/shared/ui/card-skeleton";

export const DeckList = () => {
  const [deckListQueryFailed] = useUnit([deckListQuery.$failed]);
  const {
    start: fetchDeckList,
    data: deckList,
    pending,
  } = useUnit(deckListQuery);

  useEffect(() => {
    fetchDeckList();
  }, [fetchDeckList]);

  if (deckListQueryFailed) {
    return (
      <Alert variant="error" title="Error">
        Error fetching decks, try again later
      </Alert>
    );
  }

  const deckListIsEmpty = !deckList || deckList.length === 0;

  if (deckListIsEmpty) {
    return (
      <Alert variant="info" title="Deck is empty">
        There are no cards in the deck
      </Alert>
    );
  }

  return (
    <DeckListContainer>
      {pending ? (
        <CardSkeleton cardsNumber={3} />
      ) : (
        deckList.map((deck) => <DeckCard key={deck.id} deck={deck} />)
      )}
    </DeckListContainer>
  );
};
