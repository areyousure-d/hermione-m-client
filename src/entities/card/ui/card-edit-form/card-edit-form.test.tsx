import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { CardEditForm } from ".";

describe("CardEditForm", () => {
  test("should validate question textarea", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, queryByText } = render(
      <CardEditForm submit={mockedSubmit} />
    );

    expect(queryByText(/question is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/create/i));

    expect(getByText(/question is required/i)).toBeInTheDocument();
  });

  test("should validate answer textarea", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, queryByText } = render(
      <CardEditForm submit={mockedSubmit} />
    );

    expect(queryByText(/answer is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/create/i));

    expect(getByText(/answer is required/i)).toBeInTheDocument();
  });

  test("should remove validation error message for question after typing", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, queryByText, getByLabelText } = render(
      <CardEditForm submit={mockedSubmit} />
    );

    expect(queryByText(/question is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/create/i));
    expect(queryByText(/question is required/i)).toBeInTheDocument();
    await userEvent.type(getByLabelText(/question/i), "test question");

    expect(queryByText(/question is required/i)).not.toBeInTheDocument();
  });

  test("should remove validation error message for answer after typing", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, queryByText, getByLabelText } = render(
      <CardEditForm submit={mockedSubmit} />
    );

    expect(queryByText(/answer is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/create/i));
    expect(queryByText(/answer is required/i)).toBeInTheDocument();
    await userEvent.type(getByLabelText(/answer/i), "test answer");

    expect(queryByText(/answer is required/i)).not.toBeInTheDocument();
  });

  test("should clear form after reset button is clicked", async () => {
    const mockedSubmit = vi.fn();
    const { getByText, queryByText, getByLabelText } = render(
      <CardEditForm submit={mockedSubmit} />
    );

    await userEvent.type(getByLabelText(/question/i), "test question");
    await userEvent.type(getByLabelText(/answer/i), "test answer");
    await userEvent.click(getByText(/reset/i));

    expect(queryByText(/test question/i)).not.toBeInTheDocument();
    expect(queryByText(/test answer/i)).not.toBeInTheDocument();
  });

  test("should render 'create' button when no card is given", async () => {
    const mockedSubmit = vi.fn();
    const { getByText } = render(<CardEditForm submit={mockedSubmit} />);

    expect(getByText(/create/i)).toBeInTheDocument();
  });

  test("should render 'save' button when card is given", async () => {
    const mockedCard = {
      front: "test question",
      back: "test answer",
    };
    const mockedSubmit = vi.fn();
    const { getByText } = render(
      <CardEditForm submit={mockedSubmit} card={mockedCard} />
    );

    expect(getByText(/save/i)).toBeInTheDocument();
  });

  test("should fill inputs by given card data", async () => {
    const mockedCard = {
      front: "test question",
      back: "test answer",
    };
    const mockedSubmit = vi.fn();
    const { getByLabelText } = render(
      <CardEditForm submit={mockedSubmit} card={mockedCard} />
    );

    expect(getByLabelText(/question/i)).toHaveValue(mockedCard.front);
    expect(getByLabelText(/answer/i)).toHaveValue(mockedCard.back);
  });
});
