import { Route, Routes } from "react-router-dom";

import { Cards } from "./cards";
import { CreateCardPage } from "./create-card";
import { DeckPage } from "./deck";
import { HomePage } from "./home";
import { LearnCardPage } from "./learn-card";
import { LoginPage } from "./login";
import { NotFoundPage } from "./not-found";
import { ProfilePage } from "./profile";
import { SignUpPage } from "./sign-up";
import { UpdateCardPage } from "./update-card";
import { UserAuth } from "./user-auth";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/decks/:deckId"
        element={
          <UserAuth>
            <DeckPage />
          </UserAuth>
        }
      />
      <Route
        path="/decks/:deckId/cards"
        element={
          <UserAuth>
            <Cards />
          </UserAuth>
        }
      />
      <Route
        path="/decks/:deckId/create-card"
        element={
          <UserAuth>
            <CreateCardPage />
          </UserAuth>
        }
      />
      <Route
        path="/decks/:deckId/update-card/:cardId"
        element={
          <UserAuth>
            <UpdateCardPage />
          </UserAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <UserAuth>
            <ProfilePage />
          </UserAuth>
        }
      />
      <Route
        path="/learn/:deckId"
        element={
          <UserAuth>
            <LearnCardPage />
          </UserAuth>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
