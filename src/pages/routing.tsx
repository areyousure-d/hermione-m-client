import { Route, Routes } from "react-router-dom";

import { CardPage } from "./card";
import { CreateCardPage } from "./create-card";
import { DeckPage } from "./deck";
import { HomePage } from "./home";
import { LearnCardPage } from "./learn-card";
import { NotFoundPage } from "./not-found";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="deck/:deckId" element={<DeckPage />} />
      <Route path="deck/:deckId/create-card" element={<CreateCardPage />} />
      <Route path="card" element={<CardPage />} />
      <Route path="learn/:deckId" element={<LearnCardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
