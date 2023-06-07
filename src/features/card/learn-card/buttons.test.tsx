import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Buttons } from "./buttons";

describe("Buttons", () => {
  test("should render 'show answer' button when answer is not visible", () => {
    const { getByText } = render(
      <Buttons
        cardToLearn={null}
        answerIsVisible={false}
        setIsAnswerVisible={() => {}}
        fetchCardsToLearn={() => {}}
      />
    );

    expect(getByText(/show answer/i)).toBeInTheDocument();
  });

  test("should not render 'show answer' button when answer is visible", () => {
    const { queryByText } = render(
      <Buttons
        cardToLearn={null}
        answerIsVisible
        setIsAnswerVisible={() => {}}
        fetchCardsToLearn={() => {}}
      />
    );

    expect(queryByText(/show answer/i)).not.toBeInTheDocument();
  });

  test("should render rating buttons when answer is visible", () => {
    const { queryByText } = render(
      <Buttons
        cardToLearn={null}
        answerIsVisible
        setIsAnswerVisible={() => {}}
        fetchCardsToLearn={() => {}}
      />
    );

    expect(queryByText(/again/i)).toBeInTheDocument();
    expect(queryByText(/hard/i)).toBeInTheDocument();
    expect(queryByText(/good/i)).toBeInTheDocument();
    expect(queryByText(/easy/i)).toBeInTheDocument();
  });

  test("should not render rating buttons when answer is not visible", () => {
    const { queryByText } = render(
      <Buttons
        cardToLearn={null}
        answerIsVisible={false}
        setIsAnswerVisible={() => {}}
        fetchCardsToLearn={() => {}}
      />
    );

    expect(queryByText(/again/i)).not.toBeInTheDocument();
    expect(queryByText(/hard/i)).not.toBeInTheDocument();
    expect(queryByText(/good/i)).not.toBeInTheDocument();
    expect(queryByText(/easy/i)).not.toBeInTheDocument();
  });

  test("should call setIsAnswerVisible function", async () => {
    const mockFn = vi.fn();
    const { getByText } = render(
      <Buttons
        cardToLearn={null}
        answerIsVisible={false}
        setIsAnswerVisible={mockFn}
        fetchCardsToLearn={() => {}}
      />
    );

    await userEvent.click(getByText(/show answer/i));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("should call fetchCardsToLearn function", async () => {
    const card = {
      id: 1,
      front: "test question",
      back: "test answer",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      deckId: 1,
    };
    const mockFn = vi.fn();
    const { getByText } = render(
      <Buttons
        cardToLearn={card}
        answerIsVisible={true}
        setIsAnswerVisible={() => {}}
        fetchCardsToLearn={mockFn}
      />
    );

    await userEvent.click(getByText(/again/i));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("should call setIsAnswerVisible function after rating button clicked", async () => {
    const card = {
      id: 1,
      front: "test question",
      back: "test answer",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      deckId: 1,
    };
    const mockFn = vi.fn();
    const { getByText } = render(
      <Buttons
        cardToLearn={card}
        answerIsVisible={true}
        setIsAnswerVisible={mockFn}
        fetchCardsToLearn={() => {}}
      />
    );

    await userEvent.click(getByText(/again/i));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
