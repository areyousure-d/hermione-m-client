import { act, render } from "@testing-library/react";
import { allSettled, fork } from "effector";

import { renderWithRouter } from "@/tests/helpers";

import { EditDeck } from ".";
import { openModal } from "./model";

describe("EditDeck", () => {
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
    const scope = fork();
    const { queryByRole } = render(
      renderWithRouter({
        component: <EditDeck deckname="test deck" />,
        initialRoute: "/decks/1",
      })
    );

    act(() => {
      allSettled(openModal, { scope });
    });

    expect(queryByRole("dialog")).toBeInTheDocument();
  });
});
