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
});
