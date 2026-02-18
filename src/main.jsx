import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import App from "./App.jsx";
import { BrowserRouter, Route } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="profile" element={"/profile"} />
          <Route path="collection" element={"/collection"} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
