import { render } from "@testing-library/react";

import { renderWithRouter } from "@/tests/helpers";

import { HomePage } from "./home";

describe("home page", () => {
  test("renders text", () => {
    const { queryAllByText } = render(
      renderWithRouter({ component: <HomePage />, initialRoute: "/" })
    );

    expect(queryAllByText(/home page/i)).not.toBeNull();
  });
});
