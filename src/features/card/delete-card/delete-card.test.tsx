import { act, render } from "@testing-library/react";
import { allSettled, fork } from "effector";

import { DeleteCard } from ".";
import { openModal } from "./model";

describe("DeleteCard", () => {
  test("should not render modal when it closed", () => {
    const { queryByRole } = render(<DeleteCard cardId="1" />);

    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("should open modal", async () => {
    const scope = fork();
    const { queryByText } = render(<DeleteCard cardId="1" />);

    act(() => {
      allSettled(openModal, { scope });
    });

    expect(
      queryByText(/are you sure you want to delete this card/i)
    ).toBeInTheDocument();
  });
});
