import { render } from "@testing-library/react";

import { HomePage } from "./home";

describe("home page", () => {
  test("renders text", () => {
    const { queryAllByText } = render(<HomePage />);
    expect(queryAllByText(/hermione-m/i)).not.toBeNull();
  });
});
