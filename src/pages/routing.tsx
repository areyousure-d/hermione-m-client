import { Route, Routes } from "react-router-dom";

import { HomePage } from "./home";
import { NotFoundPage } from "./not-found";
import { TestPage } from "./test";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
