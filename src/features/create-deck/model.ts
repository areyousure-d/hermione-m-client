import { createMutation } from "@farfetched/core";
import { sample } from "effector";

import { startFetchDeckList } from "@/entities/deck";
import { createRequestFx } from "@/shared/api";
import { createModal } from "@/shared/ui/modal-with-loading";

export const createDeckMutation = createMutation({
  effect: createRequestFx({ path: "/decklist", method: "POST" }),
});

export const $createDeckMutationFailed = createDeckMutation.$failed;

export const { $modalOpened, openModal, closeModal } = createModal();

sample({
  clock: createDeckMutation.finished.success,
  target: startFetchDeckList,
});
