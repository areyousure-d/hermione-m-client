import { Route, Routes } from "react-router-dom";

import { Cards } from "./cards";
import { DeckPage } from "./deck";
import { HomePage } from "./home";
import { LoginPage } from "./login";
import { NotFoundPage } from "./not-found";
import { SignUpPage } from "./sign-up";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/deck/:deckId" element={<DeckPage />} />
      <Route path="/deck/:deckId/cards" element={<Cards />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
