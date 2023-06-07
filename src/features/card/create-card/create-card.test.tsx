import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { allSettled, fork } from "effector";
import { act } from "react-dom/test-utils";

import { renderWithNotifications } from "@/tests/helpers";

import { CreateCard } from ".";
import { createCardMutation } from "./model";

describe("CreateCard", () => {
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
