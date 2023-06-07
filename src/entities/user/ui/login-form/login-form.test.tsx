import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

import { LoginForm } from ".";

describe("LoginForm", () => {
  test("should validate username input", async () => {
    const mockFn = vi.fn();
    const { getByText, queryByText } = render(<LoginForm submit={mockFn} />);

    expect(queryByText(/username is required/)).not.toBeInTheDocument();

    await userEvent.click(getByText(/login/i));
    expect(queryByText(/username is required/i)).toBeInTheDocument();
  });

  test("should validate password input", async () => {
    const mockFn = vi.fn();
    const { getByText, queryByText } = render(<LoginForm submit={mockFn} />);

    expect(queryByText(/password is required/)).not.toBeInTheDocument();

    await userEvent.click(getByText(/login/i));
    expect(queryByText(/password is required/i)).toBeInTheDocument();
  });

  test("should render update text in button", () => {
    const mockFn = vi.fn();
    const { getByText } = render(
      <LoginForm submit={mockFn} isUpdate username="test username" />
    );

    expect(getByText(/update/i)).toBeInTheDocument();
  });

  test("should render username text in input", () => {
    const mockFn = vi.fn();
    const { getByLabelText } = render(
      <LoginForm submit={mockFn} isUpdate username="test username" />
    );

    expect(getByLabelText(/username/i)).toHaveValue("test username");
  });

  test("should call submit function", async () => {
    const mockFn = vi.fn();
    const { getByText, getByLabelText } = render(
      <LoginForm submit={mockFn} isUpdate username="test username" />
    );

    await userEvent.type(getByLabelText(/username/i), "test username");
    await userEvent.type(getByLabelText(/password/i), "test password");
    await userEvent.click(getByText(/update/i));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("should reset form in update mode", async () => {
    const mockFn = vi.fn();
    const { getByText, getByLabelText } = render(
      <LoginForm submit={mockFn} isUpdate username="test username" />
    );

    await userEvent.type(getByLabelText(/username/i), " updated");
    await userEvent.type(getByLabelText(/password/i), "test password");
    await userEvent.click(getByText(/reset/i));

    expect(getByLabelText(/username/i)).toHaveValue("test username");
    expect(getByLabelText(/password/i)).toHaveValue("");
  });

  test("should reset form in create mode", async () => {
    const mockFn = vi.fn();
    const { getByText, getByLabelText } = render(<LoginForm submit={mockFn} />);

    await userEvent.type(getByLabelText(/username/i), "test username");
    await userEvent.type(getByLabelText(/password/i), "test password");
    await userEvent.click(getByText(/reset/i));

    expect(getByLabelText(/username/i)).toHaveValue("");
    expect(getByLabelText(/password/i)).toHaveValue("");
  });
});
