import { act, render } from "@testing-library/react";
import { allSettled, fork } from "effector";

import { renderWithRouter } from "@/tests/helpers";

import { DeleteDeck } from ".";
import { openModal } from "./model";

describe("DeleteDeck", () => {
  test("should not render modal at start", () => {
    const { queryByText } = render(
      renderWithRouter({ component: <DeleteDeck />, initialRoute: "/decks/1" })
    );

    expect(
      queryByText(/Are you sure you want to delete this deck/i)
    ).not.toBeInTheDocument();
  });

  test("should open delete deck modal", async () => {
    const scope = fork();
    const { queryByText } = render(
      renderWithRouter({
        component: <DeleteDeck />,
        initialRoute: "/decks/1",
      })
    );

    act(() => {
      allSettled(openModal, { scope });
    });

    expect(
      queryByText(/Are you sure you want to delete this deck/i)
    ).toBeInTheDocument();
  });
});
