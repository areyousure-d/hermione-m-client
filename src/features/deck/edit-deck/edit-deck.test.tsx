import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/tests/helpers";

import { EditDeck } from ".";

describe("EditDeck", () => {
  test("should render deck button", () => {
    const { getByText } = render(
      renderWithRouter({
        component: <EditDeck deckname="test deck" />,
        initialRoute: "/decks/1",
      })
    );

    expect(getByText(/edit/i)).toBeInTheDocument();
  });

  test("should not render modal at start", () => {
    const { queryByRole } = render(
      renderWithRouter({
        component: <EditDeck deckname="test deck" />,
        initialRoute: "/decks/1",
      })
    );

    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("should open edit deck modal", async () => {
    const { getByText, queryByRole } = render(
      renderWithRouter({
        component: <EditDeck deckname="test deck" />,
        initialRoute: "/decks/1",
      })
    );

    await userEvent.click(getByText(/edit/i));

    expect(queryByRole("dialog")).toBeInTheDocument();
  });
});
