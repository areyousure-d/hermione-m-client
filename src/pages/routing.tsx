import { Route, Routes } from "react-router-dom";

import { Cards } from "./cards";
import { CreateCardPage } from "./create-card";
import { DeckPage } from "./deck";
import { HomePage } from "./home";
import { LoginPage } from "./login";
import { NotFoundPage } from "./not-found";
import { SignUpPage } from "./sign-up";
import { UpdateCardPage } from "./update-card";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/decks/:deckId" element={<DeckPage />} />
      <Route path="/decks/:deckId/cards" element={<Cards />} />
      <Route path="/decks/:deckId/create-card" element={<CreateCardPage />} />
      <Route
        path="/decks/:deckId/update-card/:cardId"
        element={<UpdateCardPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
