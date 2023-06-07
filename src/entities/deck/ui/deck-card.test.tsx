import { render } from "@testing-library/react";

import { renderWithRouter } from "@/tests/helpers";

import { DeckCard } from ".";

const deck = {
  id: 1,
  deckname: "test deck",
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  userId: 1,
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
});
