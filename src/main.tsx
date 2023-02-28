import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app";
import { worker } from "./mocks/browser";

const render = async () => {
  await worker.start({
    serviceWorker: {
      url: "/hermione-m-client/mockServiceWorker.js",
    },
  });

  ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

render();
