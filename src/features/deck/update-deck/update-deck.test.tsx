import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/tests/helpers";

import { UpdateDeck } from ".";

describe("UpdateDeck", () => {
  test("should render update deck button", () => {
    const { getByText } = render(
      renderWithRouter({
        component: <UpdateDeck deckname="test deck" />,
        initialRoute: "/decks/1",
      })
    );

    expect(getByText(/update/i)).toBeInTheDocument();
  });

  test("should not render modal at start", () => {
    const { queryByRole } = render(
      renderWithRouter({
        component: <UpdateDeck deckname="test deck" />,
        initialRoute: "/decks/1",
      })
    );

    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("should open update deck modal", async () => {
    const { getByText, queryByRole } = render(
      renderWithRouter({
        component: <UpdateDeck deckname="test deck" />,
        initialRoute: "/decks/1",
      })
    );

    await userEvent.click(getByText(/update/i));

    expect(queryByRole("dialog")).toBeInTheDocument();
  });
});
