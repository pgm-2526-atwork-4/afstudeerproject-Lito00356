import React, { useState } from "react";
import "@style/theme.css";
import "./MenuProfile.css";
import useAuth from "@functional/auth/useAuth";
import { ExtractFirstLetter } from "@core/modules/profiles/ExtractFirstLetter";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { logout } from "@core/modules/auth/api.auth";
import useToast from "@functional/Toast/useToast";

const MenuProfile = ({ colorClass, handleScreenshot }) => {
  const { auth } = useAuth();
  const user = auth.user;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogout = async () => {
    await logout();
    addToast("Logged out successfully!", "info");
    navigate("/login");
  };

  return (
    <div className={`menu-profile ${colorClass ?? ""} ${open ? "menu-profile--open" : ""}`} data-onboarding="menu-profile">
      <div className="menu-profile__header">
        <button className="menu-profile__trigger" onClick={() => setOpen(true)} aria-label="Profiel menu openen">
          {ExtractFirstLetter(user)}
        </button>

        <span className="menu-profile__email">{user.email}</span>

        <button className="menu-profile__close" onClick={() => setOpen(false)} aria-label="Profiel menu sluiten">
          <X size={18} />
        </button>
      </div>

      <div className="menu-profile__dropdown">
        <Link className="menu-profile__dropdown-item" to="/collection" onClick={() => setOpen(false)}>
          Collection
        </Link>
        <button className="menu-profile__dropdown-item" onClick={handleScreenshot}>
          Render
        </button>
        <button className="menu-profile__dropdown-item logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MenuProfile;
