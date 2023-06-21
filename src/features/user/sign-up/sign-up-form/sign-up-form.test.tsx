import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { SignUpForm } from ".";

describe("SignUpForm", () => {
  test("should validate username input", async () => {
    const mockFn = vi.fn();
    const { getByText } = render(<SignUpForm submit={mockFn} />);

    await userEvent.click(getByText(/sign up/i));

    expect(
      getByText(/Username must be 1 or more characters long/i)
    ).toBeInTheDocument();
  });

  test("should remove validation error message for username after typing", async () => {
    const mockFn = vi.fn();
    const { getByText, getByLabelText, queryByText } = render(
      <SignUpForm submit={mockFn} />
    );

    await userEvent.click(getByText(/sign up/i));
    expect(
      queryByText(/Username must be 1 or more characters long/i)
    ).toBeInTheDocument();
    await userEvent.type(getByLabelText(/username/i), "username");

    expect(
      queryByText(/Username must be 1 or more characters long/i)
    ).not.toBeInTheDocument();
  });

  test("should validate password input", async () => {
    const mockFn = vi.fn();
    const { getByText } = render(<SignUpForm submit={mockFn} />);

    await userEvent.click(getByText(/sign up/i));

    expect(
      getByText(/Password must be 8 or more characters long/i)
    ).toBeInTheDocument();
  });

  test("should remove validation error message for password after typing", async () => {
    const mockFn = vi.fn();
    const { getByText, getByLabelText, queryByText } = render(
      <SignUpForm submit={mockFn} />
    );

    await userEvent.click(getByText(/sign up/i));
    expect(
      queryByText(/Password must be 8 or more characters long/i)
    ).toBeInTheDocument();
    await userEvent.type(getByLabelText(/^password\s*\*?/i), "password");

    expect(
      queryByText(/Password must be 8 or more characters long/i)
    ).not.toBeInTheDocument();
  });

  test("should validate confirm password", async () => {
    const mockFn = vi.fn();
    const { getByText, getByLabelText } = render(
      <SignUpForm submit={mockFn} />
    );

    await userEvent.type(getByLabelText(/^password\s*\*?/i), "password");
    await userEvent.type(
      getByLabelText(/confirm password/i),
      "another password"
    );
    await userEvent.click(getByText(/sign up/i));

    expect(
      getByText(/Your password and confirmation password must match/i)
    ).toBeInTheDocument();
  });

  test("should reset form", async () => {
    const mockFn = vi.fn();
    const { getByText, getByLabelText } = render(
      <SignUpForm submit={mockFn} />
    );

    await userEvent.type(getByLabelText(/username/i), "username");
    await userEvent.type(getByLabelText(/^password\s*\*?/i), "password");
    await userEvent.type(getByLabelText(/confirm password/i), "password");
    await userEvent.click(getByText(/reset/i));

    expect(getByLabelText(/username/i)).toHaveValue("");
    expect(getByLabelText(/^password\s*\*?/i)).toHaveValue("");
    expect(getByLabelText(/confirm password/i)).toHaveValue("");
  });
});
