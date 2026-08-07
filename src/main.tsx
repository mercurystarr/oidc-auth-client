import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { OidcProvider } from "./auth/OidcProvider";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <OidcProvider>
        <App />
      </OidcProvider>
    </BrowserRouter>
  </StrictMode>,
);