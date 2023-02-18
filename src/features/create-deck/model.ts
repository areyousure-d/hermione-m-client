import { createMutation } from "@farfetched/core";
import { sample } from "effector";

import { Deck, deckListQuery } from "@/entities/deck";
import { createRequestEffect } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const createDeckMutation = createMutation({
  effect: createRequestEffect((deck: Pick<Deck, "deckname">) => ({
    path: "/decklist",
    method: "POST",
    body: deck,
  })),
});

export const $createDeckMutationFailed = createDeckMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: createDeckMutation.finished.success,
  target: [deckListQuery.start, closeModal],
});
