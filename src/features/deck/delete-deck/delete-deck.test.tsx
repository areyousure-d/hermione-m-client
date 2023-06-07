import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/tests/helpers";

import { DeleteDeck } from ".";

describe("DeleteDeck", () => {
  test("should render delete deck button", () => {
    const { getByText } = render(
      renderWithRouter({ component: <DeleteDeck />, initialRoute: "/decks/1" })
    );

    expect(getByText(/delete deck/i)).toBeInTheDocument();
  });

  test("should not render modal at start", () => {
    const { queryByText } = render(
      renderWithRouter({ component: <DeleteDeck />, initialRoute: "/decks/1" })
    );

    expect(
      queryByText(/Are you sure you want to delete this deck/i)
    ).not.toBeInTheDocument();
  });

  test("should open delete deck modal", async () => {
    const { getByText, queryByText } = render(
      renderWithRouter({
        component: <DeleteDeck />,
        initialRoute: "/decks/1",
      })
    );

    await userEvent.click(getByText(/delete deck/i));

    expect(
      queryByText(/Are you sure you want to delete this deck/i)
    ).toBeInTheDocument();
  });
});
