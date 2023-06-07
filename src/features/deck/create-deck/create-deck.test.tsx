import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreateDeck } from ".";

describe("CreateDeck", () => {
  test("should render create deck button", () => {
    const { getByText } = render(<CreateDeck />);

    expect(getByText(/create deck/i)).toBeInTheDocument();
  });

  test("should open create deck modal", async () => {
    const { getByText, getByRole, getByLabelText } = render(<CreateDeck />);

    await userEvent.click(getByText(/create deck/i));

    expect(getByRole("dialog")).toBeInTheDocument();
    expect(getByLabelText(/deckname/i)).toBeInTheDocument();
  });

  test("should validate deckname input", async () => {
    const { getByText } = render(<CreateDeck />);

    await userEvent.click(getByText("Create"));

    expect(getByText(/deck name cannot be empty/i)).toBeInTheDocument();
  });

  test("should reset deckname", async () => {
    const { getByText, getByLabelText } = render(<CreateDeck />);

    await userEvent.click(getByText(/create deck/i));
    await userEvent.type(getByLabelText(/deckname/i), "test deck");
    expect(getByLabelText(/deckname/i)).toHaveValue("test deck");
    await userEvent.click(getByText(/reset/i));

    expect(getByLabelText(/deckname/i)).toHaveValue("");
  });
});
