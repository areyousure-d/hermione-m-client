import { Route, Routes } from "react-router-dom";

import { CardPage } from "./card";
import { CreateCardPage } from "./create-card";
import { DeckPage } from "./deck";
import { EditCardPage } from "./edit-card";
import { HomePage } from "./home";
import { LearnCardPage } from "./learn-card";
import { LoginPage } from "./login";
import { NotFoundPage } from "./not-found";
import { ProfilePage } from "./profile";
import { SignUpPage } from "./sign-up";
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
            <EditCardPage />
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
      <Route
        path="/decks/:deckId/cards/:cardId"
        element={
          <UserAuth>
            <CardPage />
          </UserAuth>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
