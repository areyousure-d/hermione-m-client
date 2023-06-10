import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { DeckEditForm } from "./deck-edit-form";

describe("UpdateDeckForm", () => {
  test("should validate deckname input", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, getByLabelText } = render(
      <DeckEditForm initialDeckname="test deck" submit={mockedSubmit} />
    );

    await userEvent.type(getByLabelText(/deckname/i), "{backspace}", {
      initialSelectionStart: 0,
      initialSelectionEnd: 9,
    });
    await userEvent.click(getByText(/update/i));

    expect(getByText(/deckname cannot be empty/i)).toBeInTheDocument();
  });

  test("should remove validation error message for deckname after typing", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, getByLabelText, queryByText } = render(
      <DeckEditForm initialDeckname="test deck" submit={mockedSubmit} />
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

  test("should render initial deckname in input", async () => {
    const mockedSubmit = vi.fn();
    const { getByLabelText } = render(
      <DeckEditForm initialDeckname="test deck" submit={mockedSubmit} />
    );

    expect(getByLabelText(/deckname/i)).toHaveValue("test deck");
  });

  test("should reset deckname", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, getByLabelText } = render(
      <DeckEditForm submit={mockedSubmit} />
    );

    await userEvent.type(getByLabelText(/deckname/i), "test deck");
    await userEvent.click(getByText(/reset/i));

    expect(getByLabelText(/deckname/i)).toHaveValue("");
  });

  test("should reset deckname with initial value", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, getByLabelText } = render(
      <DeckEditForm initialDeckname="test deck" submit={mockedSubmit} />
    );

    await userEvent.type(getByLabelText(/deckname/i), " update");
    await userEvent.click(getByText(/reset/i));

    expect(getByLabelText(/deckname/i)).toHaveValue("test deck");
  });
});
