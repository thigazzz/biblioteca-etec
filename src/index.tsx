import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages";
import { GlobalStyles } from "./styles/GlobalStyles";

import mirageJs from "./api/mirageJs";


mirageJs()

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
