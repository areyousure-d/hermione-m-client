import { createMutation } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { createRequestEffect } from "@/shared/api";

import { Deck, deckSchema } from "../deck.schema";

const deckContract = zodContract(deckSchema);

export const updateDeckMutation = createMutation({
  effect: createRequestEffect((deck: Pick<Deck, "id" | "deckname">) => ({
    path: `/decks/${deck.id}`,
    method: "PATCH",
    body: deck,
  })),
  contract: deckContract,
});
