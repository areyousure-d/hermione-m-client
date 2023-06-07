import { render } from "@testing-library/react";

import { Card } from "..";
import { CardPreview } from ".";

const card: Card = {
  id: 1,
  front: "front",
  back: "back",
  deckId: 1,
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
};

describe("CardPreview", () => {
  test("should render card front", () => {
    const { getByText } = render(
      <CardPreview card={card}>
        <div>test children</div>
      </CardPreview>
    );

    expect(getByText(card.front)).toBeInTheDocument();
  });

  test("should render children", () => {
    const { getByText } = render(
      <CardPreview card={card}>
        <div>test children</div>
      </CardPreview>
    );

    expect(getByText("test children")).toBeInTheDocument();
  });
});
