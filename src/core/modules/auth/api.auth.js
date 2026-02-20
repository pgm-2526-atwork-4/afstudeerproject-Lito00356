import { API } from "@core/network/supabase/api";

export const registerUser = (user) => {
  const { email, password, ...rest } = user;
  return API.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...rest,
      },
    },
  });
};

export const getCurrenAuth = async () => {
  const {
    data: { session },
  } = await API.auth.getSession();

  if (!session || !session.user) {
    return null;
  }

  const { user } = session;

  return {
    user: {
      email: user.email ?? "",
    },
    session,
  };
};

export const login = async ({ email, password }) => {
  const { data, error } = await API.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  if (!data || !data.user) {
    throw new Error("User not found after login");
  }

  const auth = await getCurrenAuth();

  if (!auth) {
    throw new Error("Failed to retrieve auth after login");
  }

  return auth;
};

export const logout = async () => {
  return API.auth.signOut();
};
