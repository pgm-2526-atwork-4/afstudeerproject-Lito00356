import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/reset.css";
import "./style/index.css";
import App from "./App.jsx";
import AuthProvider from "./app/components/functional/auth/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./app/pages/LandingPage/LandingPage.jsx";
import Register from "./app/pages/Register/register.jsx";
import Login from "./app/pages/Login/Login.jsx";
import Profile from "./app/pages/Profile/Profile.jsx";
import Collection from "./app/pages/Collection/Collection.jsx";
import Perspective from "./app/pages/Perspective/Perspective.jsx";
import NavLayout from "@functional/layout/NavLayout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route element={<NavLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              <Route path="profile" element={<Profile />} />
              <Route path="collection" element={<Collection />} />
              <Route path="perspective" element={<Perspective />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
