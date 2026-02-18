import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/reset.css";
import "./style/index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./app/pages/Home/Home.jsx";
import Profile from "./app/pages/Profile/Profile.jsx";
import Collection from "./app/pages/Collection/Collection.jsx";
import { Canvas } from "@react-three/fiber";
import Perspective from "./app/pages/Perspective/Perspective.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Canvas>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collection" element={<Collection />} />
            <Route path="perspective" element={<Perspective />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Canvas>
  </StrictMode>,
);
