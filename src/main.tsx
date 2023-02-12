import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app";
import { worker } from "./mocks/browser";

worker.start();

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
