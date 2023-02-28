import { Route, Routes } from "react-router-dom";

import { CreateCardPage } from "./create-card";
import { DeckPage } from "./deck";
import { HomePage } from "./home";
import { LearnCardPage } from "./learn-card";
import { NotFoundPage } from "./not-found";
import { UserAuth } from "./user-auth";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="deck/:deckId"
        element={
          <UserAuth>
            <DeckPage />
          </UserAuth>
        }
      />
      <Route
        path="deck/:deckId/create-card"
        element={
          <UserAuth>
            <CreateCardPage />
          </UserAuth>
        }
      />
      <Route
        path="learn/:deckId"
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
