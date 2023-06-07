import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DeleteCard } from ".";

describe("DeleteCard", () => {
  test("should render delete card button", () => {
    const { getByText } = render(<DeleteCard cardId={1} />);

    expect(getByText(/delete card/i)).toBeInTheDocument();
  });

  test("should not render modal when it closed", () => {
    const { queryByRole } = render(<DeleteCard cardId={1} />);

    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("should open modal", async () => {
    const { getByText, queryByText } = render(<DeleteCard cardId={1} />);

    await userEvent.click(getByText(/delete card/i));

    expect(
      queryByText(/are you sure you want to delete this card/i)
    ).toBeInTheDocument();
  });
});
