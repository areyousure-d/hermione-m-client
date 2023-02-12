import { Route, Routes } from "react-router-dom";

import { CardPage } from "./card";
import { DeckPage } from "./deck";
import { HomePage } from "./home";
import { NotFoundPage } from "./not-found";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="deck/:deckId" element={<DeckPage />} />
      <Route path="card" element={<CardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
