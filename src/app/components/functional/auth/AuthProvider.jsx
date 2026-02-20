import { useCallback, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getCurrenAuth, login } from "@core/modules/auth/api.auth";
import { API } from "@core/network/supabase/api";

const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [auth, setAuth] = useState(null);

  const fetchAuth = useCallback(async () => {
    try {
      const auth = await getCurrenAuth();
      setAuth(auth);
    } catch {
      setAuth(null);
    }
  }, []);

  useEffect(() => {
    // Initialization: fetch auth inline so setState is called in a callback, not in the effect body
    getCurrenAuth()
      .then((auth) => setAuth(auth))
      .catch(() => setAuth(null))
      .finally(() => setIsInitialized(true));

    // Subscribe to auth state changes and clean up on unmount
    const {
      data: { subscription },
    } = API.auth.onAuthStateChange((event) => {
      switch (event) {
        case "USER_UPDATED":
        case "TOKEN_REFRESHED":
          fetchAuth();
          break;
        case "SIGNED_OUT":
          setAuth(null);
          break;
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchAuth]);

  const handleLogin = async (data) => {
    const auth = await login(data);
    setAuth(auth);
    return auth;
  };

  return (
    <AuthContext.Provider
      value={{
        isInitialized: true,
        isLoggedIn: !!auth,
        auth,
        login: handleLogin,
      }}
    >
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
