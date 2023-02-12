import { render, screen } from "@testing-library/react";

import { HomePage } from "./home";

describe("home page", () => {
  test("renders text", () => {
    const { getByText } = render(<HomePage />);
    expect(getByText(/home page/i)).toBeInTheDocument();
    screen.debug();
  });
});
