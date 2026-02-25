import React from "react";
import "@style/theme.css";
import "./MenuProfile.css";
import useAuth from "@functional/auth/useAuth";
import { ExtractFirstLetter } from "@core/modules/profiles/ExtractFirstLetter";

const MenuProfile = () => {
  const { auth } = useAuth();
  const user = auth.user;

  return <div className="menu">{ExtractFirstLetter(user)}</div>;
};

export default MenuProfile;
