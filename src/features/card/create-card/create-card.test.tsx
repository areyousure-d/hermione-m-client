import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { allSettled, fork } from "effector";
import { act } from "react-dom/test-utils";

import { renderWithNotifications } from "@/tests/helpers";

import { CreateCard } from ".";
import { createCardMutation } from "./model";

describe("CreateCard", () => {
  test("should validate question textarea", async () => {
    const { getByText, queryByText } = render(<CreateCard />);

    expect(queryByText(/question is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/create card/i));

    expect(getByText(/question is required/i)).toBeInTheDocument();
  });

  test("should validate answer textarea", async () => {
    const { getByText, queryByText } = render(<CreateCard />);

    expect(queryByText(/answer is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/create card/i));

    expect(getByText(/answer is required/i)).toBeInTheDocument();
  });

  test("should remove validation error message for question after typing", async () => {
    const { getByText, queryByText, getByLabelText } = render(<CreateCard />);

    expect(queryByText(/question is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/create card/i));
    expect(queryByText(/question is required/i)).toBeInTheDocument();
    await userEvent.type(getByLabelText(/question/i), "test question");

    expect(queryByText(/question is required/i)).not.toBeInTheDocument();
  });

  test("should remove validation error message for answer after typing", async () => {
    const { getByText, queryByText, getByLabelText } = render(<CreateCard />);

    expect(queryByText(/answer is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/create card/i));
    expect(queryByText(/answer is required/i)).toBeInTheDocument();
    await userEvent.type(getByLabelText(/answer/i), "test answer");

    expect(queryByText(/answer is required/i)).not.toBeInTheDocument();
  });

  test("should clear form after reset button is clicked", async () => {
    const { getByText, queryByText, getByLabelText } = render(<CreateCard />);

    await userEvent.type(getByLabelText(/question/i), "test question");
    await userEvent.type(getByLabelText(/answer/i), "test answer");
    await userEvent.click(getByText(/reset/i));

    expect(queryByText(/test question/i)).not.toBeInTheDocument();
    expect(queryByText(/test answer/i)).not.toBeInTheDocument();
  });

  test("should render notification", async () => {
    const cardBody = {
      front: "front",
      back: "back",
    };
    const mockedCard = {
      id: 1,
      front: "mocked front",
      back: "mocked back",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      deckId: 1,
    };

    const scope = fork({
      handlers: new Map([[createCardMutation.__.executeFx, () => mockedCard]]),
    });
    const { queryByText, getByText, getByLabelText } = render(
      renderWithNotifications(<CreateCard />)
    );
    await userEvent.type(getByLabelText(/question/i), "test question");
    await userEvent.type(getByLabelText(/answer/i), "test answer");
    act(() => {
      userEvent.click(getByText(/create card/i));
    });
    await allSettled(createCardMutation.start, {
      scope,
      params: { body: cardBody, deckId: 1 },
    });

    expect(queryByText(/card created!/i)).toBeInTheDocument();
  });
});
