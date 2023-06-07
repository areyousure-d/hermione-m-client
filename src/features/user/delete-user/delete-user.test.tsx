import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/tests/helpers";

import { DeleteUser } from ".";

describe("DeleteUser", () => {
  test("should render delete user button", () => {
    const { getByText } = render(
      renderWithRouter({ component: <DeleteUser />, initialRoute: "/" })
    );

    expect(getByText(/delete account/i)).toBeInTheDocument();
  });

  test("should not render modal", () => {
    const { queryByText } = render(
      renderWithRouter({ component: <DeleteUser />, initialRoute: "/" })
    );

    expect(
      queryByText(/Are you sure you want to delete your account/i)
    ).not.toBeInTheDocument();
  });

  test("should open delete user modal", async () => {
    const { getByText, queryByText } = render(
      renderWithRouter({ component: <DeleteUser />, initialRoute: "/" })
    );

    await userEvent.click(getByText(/delete account/i));

    expect(
      queryByText(/Are you sure you want to delete your account/i)
    ).toBeInTheDocument();
  });
});
