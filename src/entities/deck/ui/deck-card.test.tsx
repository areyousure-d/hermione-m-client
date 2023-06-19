import { render } from "@testing-library/react";

import { renderWithRouter } from "@/tests/helpers";

import { DeckWithCardsInfo } from "..";
import { DeckCard } from ".";

const deck: DeckWithCardsInfo = {
  id: 1,
  deckname: "test deck",
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  userId: 1,
  cardsInfo: {
    newCards: 1,
    learnPhase: 2,
    reviewPhase: 3,
    allCards: 6,
  },
};

describe("DeckCard", () => {
  test("should render deckname", () => {
    const { getByText } = render(
      renderWithRouter({
        component: <DeckCard deck={deck} />,
        initialRoute: "/",
      })
    );

    expect(getByText(deck.deckname)).toBeInTheDocument();
  });

  test("should render deck info", () => {
    const { getByText } = render(
      renderWithRouter({
        component: <DeckCard deck={deck} />,
        initialRoute: "/",
      })
    );

    expect(getByText(deck.cardsInfo.newCards)).toBeInTheDocument();
    expect(getByText(deck.cardsInfo.learnPhase)).toBeInTheDocument();
    expect(getByText(deck.cardsInfo.reviewPhase)).toBeInTheDocument();
  });
});
