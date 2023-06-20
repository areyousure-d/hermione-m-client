import { render } from "@testing-library/react";

import { createMockCard } from "@/tests/helpers";

import { CardPreview } from "..";

const card = createMockCard(1);

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
