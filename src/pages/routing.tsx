import { Route, Routes } from "react-router-dom";

import { HomePage } from "./home";
import { LoginPage } from "./login";
import { NotFoundPage } from "./not-found";
import { SignUpPage } from "./sign-up";
import { TestPage } from "./test";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
