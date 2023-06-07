import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/tests/helpers";

import { UpdateCard } from ".";

describe("UpdateCard", () => {
  test("should validate card front textarea", async () => {
    const { getByText, queryByText } = render(
      renderWithRouter({
        component: <UpdateCard />,
        initialRoute: "/decks/1/cards/1",
      })
    );

    expect(queryByText(/question is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/update card/i));

    expect(queryByText(/question is required/i)).toBeInTheDocument();
  });

  test("should validate card back textarea", async () => {
    const { getByText, queryByText } = render(
      renderWithRouter({
        component: <UpdateCard />,
        initialRoute: "/decks/1/cards/1",
      })
    );

    expect(queryByText(/answer is required/i)).not.toBeInTheDocument();
    await userEvent.click(getByText(/update card/i));

    expect(queryByText(/answer is required/i)).toBeInTheDocument();
  });

  test("should remove validation error message for question after typing", async () => {
    const { getByText, queryByText, getByLabelText } = render(
      renderWithRouter({
        component: <UpdateCard />,
        initialRoute: "/decks/1/cards/1",
      })
    );

    await userEvent.click(getByText(/update card/i));
    await userEvent.type(getByLabelText(/question/i), "test question");

    expect(queryByText(/question is required/i)).not.toBeInTheDocument();
  });

  test("should remove validation error message for answer after typing", async () => {
    const { getByText, queryByText, getByLabelText } = render(
      renderWithRouter({
        component: <UpdateCard />,
        initialRoute: "/decks/1/cards/1",
      })
    );

    await userEvent.click(getByText(/update card/i));
    await userEvent.type(getByLabelText(/answer/i), "test answer");

    expect(queryByText(/answer is required/i)).not.toBeInTheDocument();
  });
});
