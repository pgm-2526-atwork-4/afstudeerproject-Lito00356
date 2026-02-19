import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [session, setSettion] = useState(undefined);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
