import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    return Promise.resolve().then(() => setIsLoggedIn(true));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: handleLogin,
      }}
    >
      {children};
    </AuthContext.Provider>
  );
};

export default AuthProvider;
