import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { UpdateDeckForm } from "./update-deck-form";

describe("UpdateDeckForm", () => {
  test("should validate deckname input", async () => {
    const updateDeck = vi.fn();
    const { getByText, getByLabelText } = render(
      <UpdateDeckForm initialDeckname="test deck" updateDeck={updateDeck} />
    );

    await userEvent.type(getByLabelText(/deckname/i), "{backspace}", {
      initialSelectionStart: 0,
      initialSelectionEnd: 9,
    });
    await userEvent.click(getByText(/update/i));

    expect(getByText(/deckname cannot be empty/i)).toBeInTheDocument();
  });

  test("should remove validation error message for deckname after typing", async () => {
    const updateDeck = vi.fn();
    const { getByText, getByLabelText, queryByText } = render(
      <UpdateDeckForm initialDeckname="test deck" updateDeck={updateDeck} />
    );

    expect(queryByText(/deckname cannot be empty/i)).not.toBeInTheDocument();
    await userEvent.type(getByLabelText(/deckname/i), "{backspace}", {
      initialSelectionStart: 0,
      initialSelectionEnd: 9,
    });
    await userEvent.click(getByText(/update/i));
    expect(queryByText(/deckname cannot be empty/i)).toBeInTheDocument();
    await userEvent.type(getByLabelText(/deckname/i), "test deck");

    expect(queryByText(/deckname cannot be empty/i)).not.toBeInTheDocument();
  });
});
