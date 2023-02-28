import { createQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";
import { z } from "zod";

import { createRequestEffect } from "@/shared/api";

import { deckSchema, deckSchemaWithCardsInfo } from "../model";

const deckListWithCardsInfoContract = zodContract(
  z.array(deckSchemaWithCardsInfo)
);
const deckContract = zodContract(deckSchema);

const fetchDeckListFx = createRequestEffect(() => ({
  path: `/decklist`,
  method: "GET",
}));

const getDeckByIdFx = createRequestEffect((deckId: number) => ({
  path: `/deck/${deckId}`,
  method: "GET",
}));

export const deckListQuery = createQuery({
  effect: fetchDeckListFx,
  contract: deckListWithCardsInfoContract,
});

export const deckByIdQuery = createQuery({
  effect: getDeckByIdFx,
  contract: deckContract,
});
