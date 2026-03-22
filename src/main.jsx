import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/reset.css";
import "./style/index.css";
import App from "./App.jsx";
import AuthProvider from "./app/components/functional/auth/AuthProvider";
import LandingPage from "@pages/LandingPage/LandingPage.jsx";
import Register from "@pages/Register/Register.jsx";
import Login from "@pages/Login/Login.jsx";
import Collection from "@pages/Collection/Collection.jsx";
import Perspective from "@pages/Perspective/Perspective.jsx";
import NavLayout from "@functional/layout/NavLayout.jsx";
import Blueprint from "@pages/Blueprint/Blueprint.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@functional/Toast/ToastProvider";

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route element={<NavLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              <Route path="collection" element={<Collection />} />
              <Route path="blueprint/:projectId" element={<Blueprint />} />
              <Route path="perspective/:projectId" element={<Perspective />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  </QueryClientProvider>,
);
