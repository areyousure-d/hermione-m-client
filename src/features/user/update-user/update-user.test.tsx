import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UpdateUser } from ".";

describe("UpdateUser", () => {
  test("should not render modal", () => {
    const { queryByRole } = render(<UpdateUser username="test username" />);

    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("should open modal", async () => {
    const { getByText, getByRole } = render(
      <UpdateUser username="test username" />
    );

    await userEvent.click(getByText(/edit profile/i));

    expect(getByRole("dialog")).toBeInTheDocument();
  });

  test("should render passed username", () => {
    const { getByLabelText } = render(<UpdateUser username="test username" />);

    expect(getByLabelText(/username/i)).toHaveValue("test username");
  });
});
